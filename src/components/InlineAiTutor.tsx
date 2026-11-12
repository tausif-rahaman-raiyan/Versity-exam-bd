import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Question } from '../data/questionBank';
import { ImportedQuestion } from '../data/sessionQuestionLoader';
import {
  Sparkles,
  Send,
  CheckCircle,
  AlertCircle,
  Copy,
  ChevronUp,
  Zap,
  Image as ImageIcon,
  Key,
} from 'lucide-react';
import { MathMarkdownRenderer, MathInlineRenderer } from './MathMarkdownRenderer';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

interface InlineAiTutorProps {
  question: Question;
  university?: string;
  session?: string;
  customApiKey: string;
  explanationFontPx?: number;
  onOpenApiKeyModal?: () => void;
  onClose: () => void;
}

const BANGLA_OPTION_LABELS = ['ক', 'খ', 'গ', 'ঘ', 'ঙ'];

const CLIENT_SYSTEM_INSTRUCTION =
  'You are an elite, fast, and accurate Bangladeshi varsity admission coach (AI Tutor Admission Coach). Independently solve every question and verify which option is right—never blindly trust a pre-selected answer. Write concisely in clear Bengali (Bangla) mixed with standard English scientific terms. Always format mathematical formulas, fractions (\\frac{a}{b}), and variables in LaTeX enclosed in dollar signs ($...$ for inline and $$...$$ for standalone equations). Always begin your initial solution with the exact first line: ✅ **সঠিক উত্তর:** followed by the AI-determined answer, then the 3 numbered sections (১. 🎯, ২. 📐, ৩. ⚡).';

async function fetchBrowserImagePart(url: string, label: string): Promise<{ part?: any; svgText?: string }> {
  try {
    const res = await fetch(url);
    if (!res.ok) return {};
    const contentType = (res.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
    if (contentType.includes('svg') || url.toLowerCase().endsWith('.svg')) {
      const text = (await res.text()).slice(0, 10000);
      return { svgText: `\n[Attached SVG Diagram for ${label}]:\n\`\`\`xml\n${text}\n\`\`\`\n` };
    }
    const blob = await res.blob();
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = String(reader.result || '');
        const comma = result.indexOf(',');
        resolve(comma >= 0 ? result.slice(comma + 1) : result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    return {
      part: {
        inlineData: {
          data: base64,
          mimeType: contentType || 'image/png',
        },
      },
    };
  } catch {
    return {};
  }
}

function buildClientPrompt(params: {
  question: string;
  options: string[];
  referenceExplanation: string;
  subject: string;
  university: string;
  session: string;
  userQuestion?: string;
  hasImages: boolean;
  svgTexts: string[];
}): string {
  const {
    question,
    options,
    referenceExplanation,
    subject,
    university,
    session,
    userQuestion,
    hasImages,
    svgTexts,
  } = params;

  const isMcq = Array.isArray(options) && options.length > 0;

  let prompt = `Varsity Admission Test Question Analysis:
- Target University: ${university} (${session})
- Subject: ${subject}
- Question Type: ${isMcq ? 'MCQ' : 'Written'}
- Question Stem: ${question}
`;

  if (isMcq) {
    prompt += `- Options: ${JSON.stringify(options)}\n`;
  }
  if (referenceExplanation) {
    prompt += `- Reference Context (verify independently): ${referenceExplanation.slice(0, 900)}\n`;
  }
  if (hasImages) {
    prompt += `- Attached Images: Inspect all attached question/option images carefully.\n`;
  }
  if (svgTexts.length > 0) {
    prompt += svgTexts.join('\n');
  }
  prompt += '\n';

  if (userQuestion && userQuestion.trim()) {
    prompt += `Student's follow-up question:
"${userQuestion}"
Give a direct, compact, and super helpful answer in Bengali (Bangla) mixed with English technical terms using LaTeX ($...$).`;
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

/**
 * Splits text into separate distinct progressive cards whenever a section header
 * (e.g. ১. 🎯 মূল সূত্র, ২. 📐 সমাধান ও ব্যাখ্যা, ৩. ⚡ এডমিশন শর্টকাট)
 * or major bullet point appears, allowing Card 1 to show immediately while
 * subsequent cards stream in the background.
 */
function splitIntoCards(text: string): string[] {
  if (!text || !text.trim()) return [];
  const clean = text.trim();

  // Split at the boundary of a section header (e.g. ১., ২., ৩., 🎯, 📐, ⚡, etc.)
  const sectionSplitRegex =
    /(?=\n+\s*(?:#{1,4}\s+)?(?:\*\*)?(?:[১২৩৪1234][.)]\s*)?(?:🎯|📐|⚡|⚠️|💡|🔍|📌|👉)|(?=\n+\s*(?:#{1,4}\s+)?(?:\*\*)?[১২৩৪1234][.)]\s+))/g;

  const parts = clean
    .split(sectionSplitRegex)
    .map((s) => s.trim())
    .filter(Boolean);

  if (parts.length > 1) {
    return parts;
  }

  // If text starts with a section marker (e.g. initial streaming of section 1), keep it as 1 card
  const hasMarkerAtStart =
    /^\s*(?:#{1,4}\s+)?(?:\*\*)?(?:[১২৩৪1234][.)]\s*)?(?:🎯|📐|⚡|⚠️|💡|🔍|📌|👉)/.test(clean);
  if (hasMarkerAtStart) {
    return [clean];
  }

  // Fallback for general unformatted paragraphs
  const paragraphs = clean
    .split(/\n{2,}/g)
    .map((p) => p.trim())
    .filter(Boolean);

  return paragraphs.length > 0 ? paragraphs : [clean];
}

/**
 * Extracts the AI-determined answer line (e.g. "✅ **সঠিক উত্তর:** ...")
 * and splits the remaining explanation into compact progressive sections.
 */
function parseAiResponse(raw: string): { aiFoundAnswer: string | null; sections: string[] } {
  if (!raw || !raw.trim()) return { aiFoundAnswer: null, sections: [] };

  let body = raw.trim();
  let aiFoundAnswer: string | null = null;

  // Match first line if it starts with ✅ or সঠিক উত্তর / Answer
  const answerLineRegex =
    /^(?:✅\s*)?(?:\*\*)?(?:AI নির্ণীত সঠিক উত্তর|সঠিক উত্তর|উত্তর|Answer)(?:\*\*)?\s*[:：-]\s*(?:\*\*)?([^\n]+)/i;
  const match = body.match(answerLineRegex);
  if (match && match[1]) {
    aiFoundAnswer = match[1].replace(/^\*\*|\*\*$/g, '').trim();
    body = body.slice(match[0].length).trim();
  }

  if (!body) {
    return { aiFoundAnswer, sections: [] };
  }

  const sections = splitIntoCards(body);

  return {
    aiFoundAnswer,
    sections,
  };
}

export const InlineAiTutor: React.FC<InlineAiTutorProps> = ({
  question,
  university,
  session,
  customApiKey,
  explanationFontPx = 13,
  onOpenApiKeyModal,
  onClose,
}) => {
  const [explanation, setExplanation] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [userQuery, setUserQuery] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<
    Array<{ sender: 'user' | 'ai'; text: string; model?: string }>
  >([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const abortControllerRef = useRef<AbortController | null>(null);

  const hasValidApiKey = Boolean(customApiKey && customApiKey.trim().length > 10);

  const imported = question as ImportedQuestion;
  const questionImages = imported.questionImageUrls || [];
  const optionImages = imported.optionImageUrls || [];
  const totalImagesCount =
    questionImages.length + optionImages.reduce((acc, arr) => acc + (arr ? arr.length : 0), 0);

  const getOptionLabel = (idx: number) => {
    const rawLbl = imported.optionLabels?.[idx] || question.optionLabels?.[idx];
    if (rawLbl) return rawLbl;
    return BANGLA_OPTION_LABELS[idx] || String.fromCharCode(65 + idx);
  };

  // Direct client-side fallback when deployed on static hosting (requires customApiKey)
  const streamDirectOnStaticHost = async (
    onChunk: (fullText: string) => void,
    userFollowUp?: string,
    signal?: AbortSignal
  ) => {
    const trimmedKey = customApiKey.trim();
    if (!trimmedKey || trimmedKey.length <= 10) {
      throw new Error('NO_API_KEY');
    }

    const ai = new GoogleGenAI({ apiKey: trimmedKey });
    const imageParts: any[] = [];
    const svgTexts: string[] = [];

    for (let i = 0; i < questionImages.length; i++) {
      const resolved = await fetchBrowserImagePart(questionImages[i], `Question Image ${i + 1}`);
      if (resolved.part) imageParts.push(resolved.part);
      if (resolved.svgText) svgTexts.push(resolved.svgText);
    }

    for (let optIdx = 0; optIdx < optionImages.length; optIdx++) {
      const urls = optionImages[optIdx] || [];
      for (const u of urls) {
        const resolved = await fetchBrowserImagePart(u, `Option ${optIdx + 1} Image`);
        if (resolved.part) imageParts.push(resolved.part);
        if (resolved.svgText) svgTexts.push(resolved.svgText);
      }
    }

    const prompt = buildClientPrompt({
      question: question.question || '(See attached question image)',
      options: question.options.map((opt, idx) => `[${getOptionLabel(idx)}] ${opt}`),
      referenceExplanation: question.explanation || '',
      subject: question.subject,
      university: university || question.university,
      session: session || question.session,
      userQuestion: userFollowUp,
      hasImages: imageParts.length > 0 || svgTexts.length > 0,
      svgTexts,
    });

    const contentsPayload =
      imageParts.length > 0
        ? [{ role: 'user', parts: [...imageParts, { text: prompt }] }]
        : prompt;

    const hasAnyImages = imageParts.length > 0 || svgTexts.length > 0;
    const candidateModels = hasAnyImages
      ? ['gemini-3.8-flash', 'gemini-4-argon', 'gemini-2.5-flash']
      : userFollowUp
        ? ['gemini-4-argon', 'gemini-3.8-flash', 'gemini-2.5-pro', 'gemini-2.5-flash']
        : ['gemini-3.8-flash', 'gemini-4-argon', 'gemini-2.5-flash'];
    let stream: any = null;

    for (const modelName of candidateModels) {
      try {
        const config: any = { systemInstruction: CLIENT_SYSTEM_INSTRUCTION };
        if (modelName === 'gemini-3.8-flash' || modelName === 'gemini-4-argon') {
          config.thinkingConfig = {
            thinkingLevel: userFollowUp ? ThinkingLevel.MEDIUM : ThinkingLevel.LOW,
          };
        }
        stream = await ai.models.generateContentStream({
          model: modelName,
          contents: contentsPayload,
          config,
        });
        break;
      } catch {
        // try next model
      }
    }

    if (!stream) throw new Error('INVALID_KEY_OR_MODEL');

    let accumulated = '';
    for await (const chunk of stream) {
      if (signal?.aborted) break;
      if (chunk.text) {
        accumulated += chunk.text;
        onChunk(accumulated);
      }
    }
  };

  useEffect(() => {
    if (!hasValidApiKey) {
      setIsStreaming(false);
      setExplanation('');
      setErrorMsg('AI Tutor ব্যবহার করতে প্রথমে Settings থেকে আপনার Gemini API Key যুক্ত করুন।');
      return;
    }

    let isMounted = true;
    abortControllerRef.current?.abort();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const streamExplanation = async () => {
      setIsStreaming(true);
      setExplanation('');
      setErrorMsg('');

      try {
        const res = await fetch('/api/gemini/explain-stream', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-gemini-api-key': customApiKey.trim(),
          },
          body: JSON.stringify({
            questionId: question.id,
            question: question.question,
            options: question.options.map((opt, idx) => `[${getOptionLabel(idx)}] ${opt}`),
            referenceExplanation: question.explanation || '',
            questionImageUrls: questionImages,
            optionImageUrls: optionImages,
            subject: question.subject,
            university: university || question.university,
            session: session || question.session,
            customApiKey: customApiKey.trim(),
          }),
          signal: abortController.signal,
        });

        const contentType = res.headers.get('content-type') || '';
        if (!res.ok || !res.body || !contentType.includes('text/event-stream')) {
          await streamDirectOnStaticHost(
            (txt) => {
              if (isMounted) setExplanation(txt);
            },
            undefined,
            abortController.signal
          );
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let fullText = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('data: ')) {
              try {
                const payload = JSON.parse(trimmed.slice(6));
                if (payload.text && isMounted) {
                  fullText += payload.text;
                  setExplanation(fullText);
                }
                if (payload.error && isMounted) {
                  setErrorMsg(payload.error);
                }
              } catch {
                // Ignore parse errors on partial chunks
              }
            }
          }
        }
      } catch (err: any) {
        if (err.name === 'AbortError' || !isMounted) return;

        try {
          await streamDirectOnStaticHost(
            (txt) => {
              if (isMounted) setExplanation(txt);
            },
            undefined,
            abortController.signal
          );
          return;
        } catch {
          if (isMounted) {
            setErrorMsg(
              'আপনার Gemini API Key দিয়ে উত্তর তৈরি করা যায়নি। অনুগ্রহ করে Settings থেকে সঠিক API Key দিন।'
            );
          }
        }
      } finally {
        if (isMounted) setIsStreaming(false);
      }
    };

    streamExplanation();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [question.id, university, session, customApiKey, hasValidApiKey]);

  const handleAskFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim() || isStreaming || !hasValidApiKey) return;

    const currentQuery = userQuery.trim();
    setUserQuery('');
    const newChatIndex = chatHistory.length;
    setChatHistory((prev) => [
      ...prev,
      { sender: 'user', text: currentQuery },
      { sender: 'ai', text: '' },
    ]);
    setIsStreaming(true);

    try {
      const res = await fetch('/api/gemini/explain-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-gemini-api-key': customApiKey.trim(),
        },
        body: JSON.stringify({
          questionId: question.id,
          question: question.question,
          options: question.options.map((opt, idx) => `[${getOptionLabel(idx)}] ${opt}`),
          referenceExplanation: question.explanation || '',
          questionImageUrls: questionImages,
          optionImageUrls: optionImages,
          subject: question.subject,
          university: university || question.university,
          session: session || question.session,
          userQuestion: currentQuery,
          customApiKey: customApiKey.trim(),
        }),
      });

      const contentType = res.headers.get('content-type') || '';
      if (!res.ok || !res.body || !contentType.includes('text/event-stream')) {
        await streamDirectOnStaticHost((reply) => {
          setChatHistory((prev) => {
            const updated = [...prev];
            updated[newChatIndex + 1] = { sender: 'ai', text: reply };
            return updated;
          });
        }, currentQuery);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let reply = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            try {
              const payload = JSON.parse(trimmed.slice(6));
              if (payload.text) {
                reply += payload.text;
                const modelUsed = payload.model;
                setChatHistory((prev) => {
                  const updated = [...prev];
                  updated[newChatIndex + 1] = {
                    sender: 'ai',
                    text: reply,
                    model: modelUsed || updated[newChatIndex + 1]?.model,
                  };
                  return updated;
                });
              }
              if (payload.model) {
                setChatHistory((prev) => {
                  const updated = [...prev];
                  if (updated[newChatIndex + 1]) {
                    updated[newChatIndex + 1] = {
                      ...updated[newChatIndex + 1],
                      model: payload.model,
                    };
                  }
                  return updated;
                });
              }
              if (payload.error) {
                setChatHistory((prev) => {
                  const updated = [...prev];
                  updated[newChatIndex + 1] = { sender: 'ai', text: payload.error };
                  return updated;
                });
              }
            } catch {
              // ignore
            }
          }
        }
      }
    } catch {
      try {
        await streamDirectOnStaticHost((reply) => {
          setChatHistory((prev) => {
            const updated = [...prev];
            updated[newChatIndex + 1] = { sender: 'ai', text: reply };
            return updated;
          });
        }, currentQuery);
      } catch {
        setChatHistory((prev) => {
          const updated = [...prev];
          updated[newChatIndex + 1] = {
            sender: 'ai',
            text: 'উত্তর তৈরি করা যায়নি। অনুগ্রহ করে আপনার API Key পরীক্ষা করুন।',
          };
          return updated;
        });
      }
    } finally {
      setIsStreaming(false);
    }
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { aiFoundAnswer, sections: splitSections } = useMemo(
    () => parseAiResponse(explanation),
    [explanation]
  );

  return (
    <div className="mt-3 rounded-2xl bg-indigo-50/50 dark:bg-gradient-to-b dark:from-[#091124] dark:to-[#060B18] border border-indigo-200 dark:border-indigo-500/40 shadow-lg overflow-hidden transition-all">
      {/* Compact Header Strip */}
      <div className="bg-indigo-100/80 dark:bg-[#0B152F] px-3.5 sm:px-4 py-2.5 border-b border-indigo-200 dark:border-indigo-900/50 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-sm shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0 flex items-center gap-2 flex-wrap">
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate">
              AI Tutor Admission Coach
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-600/10 dark:bg-sky-500/20 text-indigo-700 dark:text-sky-300 border border-indigo-400/40 dark:border-sky-500/30 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500 dark:text-amber-400" /> Fast AI
            </span>
            {totalImagesCount > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-400/40 flex items-center gap-1 font-semibold">
                <ImageIcon className="w-3 h-3" /> Vision ({totalImagesCount})
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {explanation && !isStreaming && (
            <button
              onClick={() => handleCopyText(explanation)}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Copy Solution"
            >
              {copied ? (
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/80 dark:bg-slate-800/80 transition-colors flex items-center gap-1 border border-slate-300 dark:border-slate-700/60 cursor-pointer"
            title="Collapse AI Coach"
          >
            <span>বন্ধ করুন</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content Area Scaled by Explanation Font Size (explanationFontPx) */}
      <div
        style={{ fontSize: `${explanationFontPx}px` }}
        className="p-3 sm:p-4 space-y-2.5 leading-relaxed"
      >
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700/70 text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span className="font-semibold">{errorMsg}</span>
            </div>
            {onOpenApiKeyModal && (
              <button
                type="button"
                onClick={onOpenApiKeyModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-colors shrink-0 cursor-pointer"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Add API Key</span>
              </button>
            )}
          </div>
        )}

        {/* Instant AI-Found Answer Box (Shows immediately when first line is detected!) */}
        {aiFoundAnswer && (
          <div className="p-3 rounded-xl bg-white dark:bg-[#0D1A35] border-2 border-indigo-300 dark:border-indigo-600/80 text-slate-900 dark:text-slate-100 font-bold flex flex-wrap items-center gap-2 shadow-sm animate-in fade-in duration-200">
            <span className="px-2.5 py-0.5 rounded-md bg-gradient-to-r from-indigo-600 to-sky-500 text-white text-[11px] font-extrabold tracking-wide shrink-0">
              AI নির্ণীত উত্তর
            </span>
            <span className="font-extrabold text-indigo-950 dark:text-white">
              <MathInlineRenderer text={aiFoundAnswer} />
            </span>
          </div>
        )}

        {/* Smooth, Modern "AI is thinking..." Indicator */}
        {isStreaming && !explanation && !errorMsg && (
          <div className="py-2.5 px-3.5 rounded-xl bg-white/70 dark:bg-[#070D1D]/80 border border-indigo-200/60 dark:border-indigo-900/40 flex items-center gap-2.5 text-slate-700 dark:text-slate-300 shadow-xs">
            <div className="relative flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-indigo-600 dark:bg-sky-400 animate-ping opacity-75 absolute" />
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-sky-400 relative" />
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-extrabold text-xs sm:text-sm text-indigo-600 dark:text-sky-400 tracking-wide">
                AI is thinking
              </span>
              <span className="flex items-center gap-1 ml-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-sky-400 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-sky-400 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-sky-400 animate-bounce" />
              </span>
            </div>
          </div>
        )}

        {/* Progressive Section Cards (Shown separately as distinct cards) */}
        {splitSections.length > 0 && (
          <div className="space-y-2">
            {splitSections.map((sectionText, idx) => {
              const isLastSection = idx === splitSections.length - 1;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#070D1D] rounded-xl p-3 sm:p-3.5 border border-slate-200 dark:border-indigo-950/80 shadow-xs relative transition-all text-slate-800 dark:text-slate-200 animate-in fade-in-50 duration-200"
                >
                  <MathMarkdownRenderer content={sectionText} />
                  {isStreaming && isLastSection && (
                    <span className="inline-block w-2 h-4 bg-indigo-600 dark:bg-sky-400 animate-pulse ml-1 align-middle" />
                  )}
                </div>
              );
            })}

            {/* Progressive "loading more" indicator beneath currently revealed cards */}
            {isStreaming && (
              <div className="rounded-xl p-2.5 sm:p-3 bg-gradient-to-r from-indigo-50/90 via-sky-50/70 to-indigo-50/90 dark:from-[#09132A] dark:via-[#081024] dark:to-[#09132A] border border-indigo-200/80 dark:border-indigo-800/60 shadow-xs flex items-center justify-between gap-3 animate-pulse">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative flex items-center justify-center shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-sky-400 animate-ping opacity-75 absolute" />
                    <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-sky-400 relative" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-indigo-900 dark:text-sky-200 block truncate">
                      {splitSections.length === 1
                        ? '২. 📐 সমাধান ও ব্যাখ্যা প্রস্তুত হচ্ছে (চলমান)...'
                        : splitSections.length === 2
                          ? '৩. ⚡ এডমিশন শর্টকাট ও ট্রিকস তৈরি হচ্ছে...'
                          : 'পরবর্তী অংশ লোড হচ্ছে...'}
                    </span>
                    <span className="text-[10px] text-indigo-600/80 dark:text-sky-400/80">
                      ব্যাকগ্রাউন্ডে ফাস্ট এআই কাজ করছে
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-md bg-indigo-600/10 dark:bg-sky-500/20 text-indigo-700 dark:text-sky-300 text-[10px] font-mono font-bold">
                  <span>loading more</span>
                  <span className="flex items-center gap-0.5 ml-1">
                    <span className="w-1 h-1 rounded-full bg-indigo-600 dark:bg-sky-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1 h-1 rounded-full bg-indigo-600 dark:bg-sky-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1 h-1 rounded-full bg-indigo-600 dark:bg-sky-400 animate-bounce" />
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Follow-up Chat History (Each AI point shown in separate distinct cards!) */}
        {chatHistory.map((item, idx) => (
          <div key={idx} className="space-y-2 pt-1">
            {item.sender === 'user' ? (
              <div className="p-3 rounded-xl border bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-500/40 ml-4 sm:ml-6 text-slate-900 dark:text-indigo-100">
                <div className="font-bold text-[11px] mb-1 text-indigo-600 dark:text-sky-400">
                  আপনার প্রশ্ন:
                </div>
                <MathMarkdownRenderer content={item.text} />
              </div>
            ) : (
              <div className="mr-2 sm:mr-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-indigo-600 dark:text-sky-400 px-1">
                  <span>AI Coach উত্তর:</span>
                  {item.model && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-400/40">
                      ⚡ Best Model: {item.model}
                    </span>
                  )}
                </div>
                {item.text ? (
                  <div className="space-y-2">
                    {splitIntoCards(item.text).map((part, pIdx, allParts) => {
                      const isLastPart = pIdx === allParts.length - 1;
                      return (
                        <div
                          key={pIdx}
                          className="bg-white dark:bg-[#070D1D] rounded-xl p-3 sm:p-3.5 border border-slate-200 dark:border-indigo-950/80 shadow-xs relative transition-all text-slate-800 dark:text-slate-200"
                        >
                          <MathMarkdownRenderer content={part} />
                          {isStreaming && idx === chatHistory.length - 1 && isLastPart && (
                            <span className="inline-block w-2 h-4 bg-indigo-600 dark:bg-sky-400 animate-pulse ml-1 align-middle" />
                          )}
                        </div>
                      );
                    })}
                    {isStreaming && idx === chatHistory.length - 1 && (
                      <div className="rounded-xl p-2.5 bg-gradient-to-r from-indigo-50/80 to-sky-50/80 dark:from-[#09132A] dark:to-[#081024] border border-indigo-200/70 dark:border-indigo-800/50 flex items-center justify-between text-xs text-indigo-700 dark:text-sky-300 animate-pulse">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-sky-400 animate-ping" />
                          <span className="font-bold text-[11px]">পরবর্তী ব্যাখ্যা প্রস্তুত হচ্ছে...</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-600/10 dark:bg-sky-500/20">
                          loading more
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-white/70 dark:bg-[#070D1D]/80 border border-indigo-200/60 dark:border-indigo-900/40 flex items-center gap-2 text-slate-600 dark:text-slate-400 py-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-sky-400 animate-ping" />
                    <span className="font-semibold text-indigo-700 dark:text-sky-300">
                      Best Model দিয়ে উত্তর তৈরি হচ্ছে...
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Inline Follow-up Doubt Form */}
        {hasValidApiKey && !errorMsg && (
          <form onSubmit={handleAskFollowUp} className="pt-1.5 flex gap-2">
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              disabled={isStreaming}
              placeholder="এই প্রশ্নের উপর আর কোনো শর্টকাট বা প্রশ্ন আছে?"
              className="flex-1 bg-white dark:bg-[#070C1A] border border-slate-300 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 dark:focus:border-sky-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isStreaming || !userQuery.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Ask
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
