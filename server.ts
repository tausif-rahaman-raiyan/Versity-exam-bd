import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { createHash } from 'crypto';
import { mkdir, writeFile, readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// In-memory cache for instant repeat explanations & avoiding 429 rate limits
const explanationCache = new Map<string, string>();

function isValidApiKey(key?: string): boolean {
  if (!key) return false;
  const cleaned = key.trim();
  return cleaned.length > 10 && cleaned !== 'MY_GEMINI_API_KEY' && cleaned !== 'undefined';
}

function buildSmart4SectionFallback(params: {
  question: string;
  options?: string[];
  correctAnswer?: string;
  referenceExplanation?: string;
  subject?: string;
  userQuestion?: string;
}): string {
  const { question, options, correctAnswer, referenceExplanation, subject, userQuestion } = params;
  const cleanRef = (referenceExplanation || '').trim();

  if (userQuestion && userQuestion.trim()) {
    return `১. 🎯 **আপনার প্রশ্নের উত্তর (${subject || 'Science'}):**\n\n${
      cleanRef || `প্রদত্ত প্রশ্নটির সঠিক উত্তর হলো **${correctAnswer || 'সঠিক অপশন'}**।`
    }\n\n⚡ **শর্টকাট টিপস:** প্রশ্নের প্রদত্ত মানগুলো সরাসরি মূল সূত্রে বসিয়ে একক (Unit) ঠিক রেখে তুলনা করলেই দ্রুত উত্তর বের করা যায়।`;
  }

  const optionsList =
    Array.isArray(options) && options.length > 0
      ? options.map((opt) => `- ${opt}`).join('\n')
      : '';

  return `১. 🎯 **সঠিক উত্তর ও মূল যুক্তি:**

**মূল নীতি:** ${
    cleanRef
      ? cleanRef
      : `প্রদত্ত প্রশ্ন (${question.slice(0, 140)}) বিশ্লেষণ করে দেখা যায় সঠিক উত্তর হলো **${
          correctAnswer || 'প্রদত্ত সঠিক অপশন'
        }**।`
  }

২. 📐 **ধাপে ধাপে সমাধান:**

${
  cleanRef
    ? `প্রশ্নের তথ্যের আলোকে গাণিতিক ও তাত্ত্বিক বিশ্লেষণ:\n\n${cleanRef}`
    : `প্রদত্ত অপশনগুলোর তুলনামূলক বিশ্লেষণ:\n${optionsList}\n\nএখানে মূল সূত্র ও শর্ত প্রয়োগ করলে **${
        correctAnswer || 'সঠিক অপশনটি'
      }** সরাসরি সিদ্ধ হয়।`
}

৩. ⚡ **এডমিশন ৩০-সেকেন্ড শর্টকাট:**

ক্যালকুলেটর ছাড়া দ্রুত সমাধানের কৌশল:
- প্রশ্নের প্রদত্ত রাশিগুলোর অনুপাত বা ঘাত (Power/Exponent) সরাসরি তুলনা করুন।
- যে অপশনগুলোর একক বা মাত্রা (Dimension) প্রদত্ত রাশির সাথে মেলে না সেগুলো শুরুতেই বাদ (Eliminate) দিন।
- ফলে সহজেই **${correctAnswer || 'সঠিক উত্তর'}** চিহ্নিত করা যায়।

৪. ⚠️ **পরীক্ষার সতর্কতা:**

- **একক বিভ্রাট:** প্রশ্নে দেওয়া একক (যেমন SI বা CGS একক) খেয়াল না করে মান বসালে ভুল উত্তর আসার সম্ভাবনা থাকে।
- **চিহ্ন ও ঘাত সতর্কতা:** ধনাত্মক/ঋণাত্মক চিহ্ন এবং $10^n$ ঘাত দ্রুত পড়ার সময় বিশেষ সতর্ক থাকুন।`;
}

async function resolveImageToGeminiPart(
  rawUrl: string,
  label: string
): Promise<{ part?: any; textFallback?: string }> {
  try {
    if (!rawUrl || typeof rawUrl !== 'string') return {};
    const trimmed = rawUrl.trim().replace(/^\.\//, '/');
    let bytes: Buffer | null = null;
    let ext = '';

    if (trimmed.startsWith('/')) {
      const safeRelative = trimmed.replace(/^\/+/, '').replace(/\.\./g, '');
      const fullPath = path.join(__dirname, 'public', safeRelative);
      bytes = await readFile(fullPath);
      ext = path.extname(fullPath).toLowerCase().replace('.', '');
    } else if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      const response = await fetch(trimmed, { signal: AbortSignal.timeout(8000) });
      if (!response.ok) return {};
      const contentType = (response.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
      bytes = Buffer.from(await response.arrayBuffer());
      if (contentType.includes('png')) ext = 'png';
      else if (contentType.includes('jpeg') || contentType.includes('jpg')) ext = 'jpg';
      else if (contentType.includes('webp')) ext = 'webp';
      else if (contentType.includes('gif')) ext = 'gif';
      else if (contentType.includes('svg')) ext = 'svg';
    }

    if (!bytes || bytes.length === 0 || bytes.length > 6 * 1024 * 1024) return {};

    if (ext === 'svg') {
      const svgText = bytes.toString('utf8').slice(0, 12000);
      return {
        textFallback: `\n[Attached SVG Diagram for ${label}]:\n\`\`\`xml\n${svgText}\n\`\`\`\n`,
      };
    }

    const mimeMap: Record<string, string> = {
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      webp: 'image/webp',
      gif: 'image/gif',
    };
    const mimeType = mimeMap[ext] || 'image/png';

    return {
      part: {
        inlineData: {
          data: bytes.toString('base64'),
          mimeType,
        },
      },
    };
  } catch {
    return {};
  }
}

function buildPrompt(params: {
  question: string;
  options?: string[];
  referenceExplanation?: string;
  subject?: string;
  university?: string;
  session?: string;
  userQuestion?: string;
  hasAttachedImages?: boolean;
  svgFallbacks?: string[];
}) {
  const {
    question,
    options,
    referenceExplanation,
    subject,
    university,
    session,
    userQuestion,
    hasAttachedImages,
    svgFallbacks,
  } = params;

  const isMcq = Array.isArray(options) && options.length > 0;

  let prompt = `Varsity Admission Test Question Analysis:
- Target University: ${university || 'DU'} (${session || 'Recent'})
- Subject: ${subject || 'Science'}
- Question Type: ${isMcq ? 'MCQ' : 'Written'}
- Question Stem: ${question}
`;

  if (isMcq) {
    prompt += `- Options: ${JSON.stringify(options)}\n`;
  }

  if (referenceExplanation && referenceExplanation.trim().length > 0) {
    prompt += `- Reference Context (verify independently): ${referenceExplanation.slice(0, 900)}\n`;
  }

  if (hasAttachedImages) {
    prompt += `- Attached Images: Inspect all diagrams, circuits, chemical structures, graphs, or equations in the attached images carefully.\n`;
  }

  if (svgFallbacks && svgFallbacks.length > 0) {
    prompt += svgFallbacks.join('\n');
  }

  prompt += '\n';

  if (userQuestion && userQuestion.trim().length > 0) {
    prompt += `Student's follow-up question:
"${userQuestion}"

Give a direct, compact, and super helpful answer in Bengali (Bangla) mixed with standard English scientific terms. Format all math and equations in LaTeX ($...$ for inline and $$...$$ for display).`;
  } else if (isMcq) {
    prompt += `Solve this MCQ independently step-by-step and write a compact, high-yield Bangladeshi Varsity Admission response in Bengali (Bangla) following this EXACT structure:

✅ **সঠিক উত্তর:** [Write the exact option letter/label and option text that YOU determined to be correct, e.g. [খ] $12\\text{ m/s}$]

১. 🎯 **মূল সূত্র ও যুক্তি:**
In 1–2 concise lines, state the exact scientific formula/law (in LaTeX $...$) and why this option is correct.

২. 📐 **সমাধান ও ব্যাখ্যা:**
Show the direct, compact calculation or key elimination steps using LaTeX ($...$ and \\frac{a}{b}). Keep it tight, clear, and easy to scan in seconds.

৩. ⚡ **এডমিশন শর্টকাট ও ট্রিকস:**
Give the fastest 10-second calculator-free exam hall trick (ratio, unit check, mental math, or memory cue) and 1 common trap to avoid.`;
  } else {
    prompt += `Solve this Written admission question independently and write a compact, step-by-step solution in Bengali (Bangla) following this EXACT structure:

✅ **সঠিক উত্তর:** [Write the final calculated answer or key result clearly in 1 line]

১. 🎯 **মূল সূত্র ও নীতি:**
State the governing formula or principle in 1–2 concise lines using LaTeX ($...$).

২. 📐 **সমাধান ও ব্যাখ্যা:**
Show the clean, exam-standard step-by-step derivation and calculation in LaTeX ($...$ and $$...$$).

৩. ⚡ **পরীক্ষার টিপস ও সতর্কতা:**
Highlight the key marking points and 1 common mistake to avoid in the written exam script.`;
  }

  return prompt;
}

const SYSTEM_INSTRUCTION =
  'You are an elite, fast, and accurate Bangladeshi varsity admission coach (AI Tutor Admission Coach). Independently solve every question and verify which option is right—never blindly trust a pre-selected answer. Write concisely in clear Bengali (Bangla) mixed with standard English scientific terms. Always format mathematical formulas, fractions (\\frac{a}{b}), and variables in LaTeX enclosed in dollar signs ($...$ for inline and $$...$$ for standalone equations). Always begin your initial solution with the exact first line: ✅ **সঠিক উত্তর:** followed by the AI-determined answer, then the 3 numbered sections (১. 🎯, ২. 📐, ৩. ⚡).';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '4mb' }));

  // Helper function to download and cache a single image locally
  async function downloadAndCacheImage(rawUrl: string): Promise<string | null> {
    try {
      if (!rawUrl || typeof rawUrl !== 'string') return null;
      let target = new URL(rawUrl);
      const allowedHosts = new Set(['assets.chorcha.net', 'chorcha.net']);
      if (target.protocol !== 'https:' || !allowedHosts.has(target.hostname.toLowerCase())) {
        return null;
      }
      if (target.pathname.includes('explanation_icon.svg')) {
        return null;
      }

      let response: Response | null = null;
      for (let redirect = 0; redirect <= 3; redirect++) {
        response = await fetch(target, { redirect: 'manual', signal: AbortSignal.timeout(12000) });
        if ([301, 302, 303, 307, 308].includes(response.status)) {
          const location = response.headers.get('location');
          if (!location || redirect === 3) return null;
          target = new URL(location, target);
          if (target.protocol !== 'https:' || !allowedHosts.has(target.hostname.toLowerCase())) {
            return null;
          }
          continue;
        }
        break;
      }

      if (!response || !response.ok) return null;
      const mime = (response.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
      const supported = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml']);
      if (!supported.has(mime)) return null;
      const maxBytes = 8 * 1024 * 1024;

      let bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length === 0 || bytes.length > maxBytes) return null;
      const extension = mime === 'image/jpeg' ? 'jpg' : mime === 'image/svg+xml' ? 'svg' : mime.split('/')[1];
      if (mime === 'image/svg+xml') {
        let svg = bytes.toString('utf8');
        svg = svg
          .replace(/<script\b[\s\S]*?<\/script\s*>/gi, '')
          .replace(/<foreignObject\b[\s\S]*?<\/foreignObject\s*>/gi, '')
          .replace(/\s(on[a-z]+)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
          .replace(/(?:href|xlink:href)\s*=\s*(["'])\s*(?:javascript:|https?:|\/\/)[\s\S]*?\1/gi, '')
          .replace(/url\s*\(\s*(['"]?)\s*(?:https?:|\/\/)[^)]+\)/gi, 'none');
        bytes = Buffer.from(svg, 'utf8');
      }

      const digest = createHash('sha256').update(bytes).digest('hex');
      const fileName = digest + '.' + extension;
      const directory = path.join(__dirname, 'public', 'assets', 'imported');
      await mkdir(directory, { recursive: true });
      await writeFile(path.join(directory, fileName), bytes, { flag: 'wx' }).catch(async (error: any) => {
        if (error?.code !== 'EEXIST') throw error;
      });
      return '/assets/imported/' + fileName;
    } catch {
      return null;
    }
  }

  app.get('/api/media/localize', async (req, res) => {
    try {
      const rawUrl = String(req.query.url || '');
      const localUrl = await downloadAndCacheImage(rawUrl);
      if (!localUrl) {
        return res.status(400).json({ error: 'Could not localize image or host disallowed' });
      }
      return res.json({ url: localUrl, cached: true });
    } catch (error: any) {
      return res.status(502).json({ error: 'Image localization failed' });
    }
  });

  app.post('/api/media/localize-batch', async (req, res) => {
    try {
      const { urls } = req.body;
      if (!Array.isArray(urls)) {
        return res.status(400).json({ error: 'urls array is required' });
      }
      const uniqueUrls = [...new Set(urls.filter((u) => typeof u === 'string' && u.trim()))];
      const mappings: Record<string, string> = {};

      await Promise.all(
        uniqueUrls.map(async (url) => {
          const local = await downloadAndCacheImage(url);
          if (local) {
            mappings[url] = local;
          }
        })
      );

      return res.json({ mappings, totalProcessed: uniqueUrls.length, downloaded: Object.keys(mappings).length });
    } catch {
      return res.status(500).json({ error: 'Batch localization failed' });
    }
  });

  // SSE Real-Time Multimodal Streaming Endpoint for Ask AI Tutor
  app.post('/api/gemini/explain-stream', async (req, res) => {
    try {
      const {
        questionId,
        question,
        options,
        referenceExplanation,
        questionImageUrls,
        optionImageUrls,
        subject,
        university,
        session,
        userQuestion,
        customApiKey,
      } = req.body;

      if (!question && (!Array.isArray(questionImageUrls) || questionImageUrls.length === 0)) {
        return res.status(400).json({ error: 'Question text or image is required' });
      }

      // Require user-provided API key for AI Tutor
      const userKey = ((req.headers['x-gemini-api-key'] as string) || customApiKey || '').trim();
      if (!isValidApiKey(userKey)) {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
          'X-Accel-Buffering': 'no',
        });
        res.write(
          `data: ${JSON.stringify({
            error: 'AI Tutor ব্যবহার করতে প্রথমে Settings থেকে আপনার Gemini API Key যুক্ত করুন।',
            done: true,
          })}\n\n`
        );
        return res.end();
      }

      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      });

      const cacheKey = `v2::${questionId || question.slice(0, 80)}::${(userQuestion || '').trim()}`;
      if (explanationCache.has(cacheKey)) {
        const cachedText = explanationCache.get(cacheKey)!;
        res.write(`data: ${JSON.stringify({ text: cachedText, done: true, cached: true })}\n\n`);
        return res.end();
      }

      // Collect multimodal image parts in parallel for lightning-fast response
      const imagePromises: Promise<{ part?: any; textFallback?: string }>[] = [];

      if (Array.isArray(questionImageUrls)) {
        questionImageUrls.forEach((u, i) => {
          imagePromises.push(resolveImageToGeminiPart(u, `Question Stem Image ${i + 1}`));
        });
      }

      if (Array.isArray(optionImageUrls)) {
        optionImageUrls.forEach((urlsForOpt, optIdx) => {
          if (Array.isArray(urlsForOpt)) {
            urlsForOpt.forEach((u) => {
              imagePromises.push(resolveImageToGeminiPart(u, `Option ${optIdx + 1} Image`));
            });
          }
        });
      }

      const resolvedList = await Promise.all(imagePromises);
      const imageParts = resolvedList.map((r) => r.part).filter(Boolean);
      const svgFallbacks = resolvedList.map((r) => r.textFallback).filter((t): t is string => Boolean(t));

      const prompt = buildPrompt({
        question: question || '(See attached question image)',
        options,
        referenceExplanation,
        subject,
        university,
        session,
        userQuestion,
        hasAttachedImages: imageParts.length > 0 || svgFallbacks.length > 0,
        svgFallbacks,
      });

      const contentsPayload =
        imageParts.length > 0
          ? [{ role: 'user', parts: [...imageParts, { text: prompt }] }]
          : prompt;

      const isFollowUp = Boolean(userQuestion && userQuestion.trim());
      const hasImages = imageParts.length > 0 || svgFallbacks.length > 0;

      // Best model selection:
      // - For questions with Images: gemini-3.8-flash has state-of-the-art multimodal diagram & handwritten vision accuracy + fastest response
      // - For Follow-up questions & text STEM: gemini-4-argon / gemini-3.8-flash provide deep mathematical and concept reasoning
      const candidateModels = hasImages
        ? [
            'gemini-3.8-flash',
            'gemini-4-argon',
            'gemini-2.5-flash',
          ]
        : isFollowUp
          ? [
              'gemini-4-argon',
              'gemini-3.8-flash',
              'gemini-2.5-pro',
              'gemini-2.5-flash',
            ]
          : [
              'gemini-3.8-flash',
              'gemini-4-argon',
              'gemini-2.5-flash',
            ];

      let stream: any = null;
      let usedModel = '';
      let lastErrorMessage = '';

      const ai = new GoogleGenAI({
        apiKey: userKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      for (const modelName of candidateModels) {
        try {
          const config: any = {
            systemInstruction: SYSTEM_INSTRUCTION,
          };
          if (modelName === 'gemini-3.8-flash' || modelName === 'gemini-4-argon') {
            config.thinkingConfig = {
              thinkingLevel: isFollowUp ? ThinkingLevel.MEDIUM : ThinkingLevel.LOW,
            };
          }
          const s = await ai.models.generateContentStream({
            model: modelName,
            contents: contentsPayload,
            config,
          });
          stream = s;
          usedModel = modelName;
          break;
        } catch (err: any) {
          lastErrorMessage = err?.message || 'API error';
        }
      }

      if (!stream) {
        res.write(
          `data: ${JSON.stringify({
            error: `আপনার Gemini API Key দিয়ে উত্তর তৈরি করা যায়নি (${
              lastErrorMessage.includes('API_KEY') || lastErrorMessage.includes('400') || lastErrorMessage.includes('403')
                ? 'Invalid API Key'
                : 'Quota / Connection Error'
            })। অনুগ্রহ করে Settings থেকে সঠিক API Key দিন।`,
            done: true,
          })}\n\n`
        );
        return res.end();
      }

      let fullGenerated = '';
      for await (const chunk of stream) {
        if (chunk.text) {
          fullGenerated += chunk.text;
          res.write(`data: ${JSON.stringify({ text: chunk.text, model: usedModel })}\n\n`);
          if (typeof (res as any).flush === 'function') {
            (res as any).flush();
          }
        }
      }

      if (fullGenerated.trim().length > 30) {
        explanationCache.set(cacheKey, fullGenerated);
      }

      res.write(`data: ${JSON.stringify({ done: true, model: usedModel })}\n\n`);
      res.end();
    } catch {
      res.write(
        `data: ${JSON.stringify({
          error: 'AI Tutor সংযোগে ত্রুটি হয়েছে। অনুগ্রহ করে আপনার API Key ও ইন্টারনেট সংযোগ পরীক্ষা করুন।',
          done: true,
        })}\n\n`
      );
      res.end();
    }
  });

  const translationCache = new Map<string, { question: string; options: string[]; explanation: string }>();

  app.post('/api/gemini/translate-batch', async (req, res) => {
    try {
      const { items, targetLang = 'en', customApiKey } = req.body || {};
      if (!Array.isArray(items) || items.length === 0) {
        return res.json({ translations: {} });
      }

      const result: Record<string, { question: string; options: string[]; explanation: string }> = {};
      const pendingItems: Array<{
        id: string;
        subject?: string;
        question: string;
        options: string[];
        explanation?: string;
      }> = [];

      for (const item of items) {
        if (!item || !item.id) continue;
        // Keep Bangla subject questions in Bengali
        if (item.subject === 'Bangla' || item.subject === 'English') continue;
        const key = `${targetLang}::${item.id}`;
        if (translationCache.has(key)) {
          result[item.id] = translationCache.get(key)!;
        } else {
          pendingItems.push(item);
        }
      }

      if (pendingItems.length === 0) {
        return res.json({ translations: result });
      }

      const userKey = ((req.headers['x-gemini-api-key'] as string) || customApiKey || '').trim();
      const envKey = (process.env.GEMINI_API_KEY || '').trim();
      const apiKeysToTry = [...new Set([userKey, envKey].filter((k) => isValidApiKey(k)))];

      if (apiKeysToTry.length === 0) {
        return res.json({ translations: result });
      }

      const batchSlice = pendingItems.slice(0, 20);
      const prompt = `Translate the following Bangladeshi university science admission MCQ questions, options, and explanations into clear, standard academic ${
        targetLang === 'en' ? 'English' : 'Bengali'
      }.
CRITICAL RULES:
1. Preserve ALL LaTeX formulas ($...$), mathematical symbols, chemical formulas, numbers, and image markdown exactly as they are.
2. Keep the exact same number of options in the exact same order.
3. Return ONLY valid JSON matching the object map { "[questionId]": { "question": "...", "options": ["...", "..."], "explanation": "..." } }.

Input JSON:
${JSON.stringify(
  batchSlice.map((i) => ({
    id: i.id,
    subject: i.subject,
    question: i.question,
    options: i.options,
    explanation: (i.explanation || '').slice(0, 500),
  }))
)}`;

      const candidateModels = [
        'gemini-3.1-flash-lite',
        'gemini-2.5-flash-lite',
        'gemini-2.5-flash',
        'gemini-3.8-flash',
      ];

      outerTranslate: for (const activeKey of apiKeysToTry) {
        const ai = new GoogleGenAI({ apiKey: activeKey });
        for (const modelName of candidateModels) {
          try {
            const response = await ai.models.generateContent({
              model: modelName,
              contents: prompt,
              config: {
                responseMimeType: 'application/json',
              },
            });
            const rawText = (response.text || '').trim();
            if (rawText) {
              const parsed = JSON.parse(rawText);
              for (const item of batchSlice) {
                const entry = parsed[item.id];
                if (entry && typeof entry.question === 'string' && Array.isArray(entry.options)) {
                  const cleanEntry = {
                    question: entry.question,
                    options: entry.options.map((o: any) => String(o)),
                    explanation: typeof entry.explanation === 'string' ? entry.explanation : (item.explanation || ''),
                  };
                  translationCache.set(`${targetLang}::${item.id}`, cleanEntry);
                  result[item.id] = cleanEntry;
                }
              }
              break outerTranslate;
            }
          } catch {
            // Try next model
          }
        }
      }

      return res.json({ translations: result });
    } catch {
      return res.json({ translations: {} });
    }
  });

  app.get('/api/gemini/status', (_req, res) => {
    const hasEnvKey = isValidApiKey(process.env.GEMINI_API_KEY);
    res.json({
      configured: hasEnvKey,
      model: 'gemini-3.8-flash',
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
