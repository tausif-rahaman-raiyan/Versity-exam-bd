import type { Question } from '../data/questionBank';
import { resolveAssetUrl } from '../components/MathMarkdownRenderer';

// Global in-memory cache of preloaded Image objects so browser retains decoded bitmaps
const preloadedImagesCache = new Map<string, HTMLImageElement>();

/**
 * Extracts all image URLs referenced in a question's fields or inline markdown/HTML.
 */
export function extractQuestionImageUrls(question: Question): string[] {
  const urls = new Set<string>();

  const addUrl = (raw?: string) => {
    if (!raw || typeof raw !== 'string') return;
    const trimmed = raw.trim();
    if (!trimmed || /explanation_icon\.svg/i.test(trimmed)) return;
    const resolved = resolveAssetUrl(trimmed);
    if (resolved) {
      urls.add(resolved);
    }
  };

  // 1. Explicit image arrays
  question.questionImageUrls?.forEach(addUrl);
  question.optionImageUrls?.forEach((group) => group?.forEach(addUrl));
  question.explanationImageUrls?.forEach(addUrl);

  // 2. Inline markdown images ![alt](url) or HTML <img src="url">
  const scanTextForImages = (text?: string) => {
    if (!text) return;
    const mdRegex = /!\[[^\]]*\]\(([^)]+)\)/g;
    let match: RegExpExecArray | null;
    while ((match = mdRegex.exec(text)) !== null) {
      addUrl(match[1]);
    }
    const htmlRegex = /<img\b[^>]*\bsrc\s*=\s*(['"])(.*?)\1/gi;
    while ((match = htmlRegex.exec(text)) !== null) {
      addUrl(match[2]);
    }
  };

  scanTextForImages(question.question);
  scanTextForImages(question.questionHtml);
  question.options?.forEach(scanTextForImages);
  question.optionHtmls?.forEach(scanTextForImages);
  scanTextForImages(question.explanation);
  scanTextForImages(question.explanationHtml);

  return Array.from(urls);
}

/**
 * Eagerly preloads and decodes a single image URL into memory.
 */
export function preloadImageUrl(url: string): Promise<void> {
  if (typeof window === 'undefined' || !url) {
    return Promise.resolve();
  }

  const existing = preloadedImagesCache.get(url);
  if (existing && existing.complete) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'sync';
    img.loading = 'eager';
    img.referrerPolicy = 'no-referrer';

    const finish = () => {
      resolve();
    };

    img.onload = () => {
      if (typeof img.decode === 'function') {
        img.decode().then(finish).catch(finish);
      } else {
        finish();
      }
    };
    img.onerror = finish;

    preloadedImagesCache.set(url, img);
    img.src = url;
  });
}

/**
 * Eagerly preloads all question, option, and explanation images for a list of questions.
 * Prioritizes question & option images first so the exam paper renders immediately,
 * then preloads explanation images right after.
 */
export async function preloadQuestionsImages(questions: Question[]): Promise<void> {
  if (typeof window === 'undefined' || !questions || questions.length === 0) {
    return;
  }

  const primaryUrls = new Set<string>();
  const secondaryUrls = new Set<string>();

  for (const q of questions) {
    q.questionImageUrls?.forEach((u) => {
      const r = resolveAssetUrl(u);
      if (r) primaryUrls.add(r);
    });
    q.optionImageUrls?.forEach((arr) =>
      arr?.forEach((u) => {
        const r = resolveAssetUrl(u);
        if (r) primaryUrls.add(r);
      })
    );

    const all = extractQuestionImageUrls(q);
    for (const u of all) {
      if (!primaryUrls.has(u)) {
        secondaryUrls.add(u);
      }
    }
  }

  // Trigger all primary (question + option) images immediately in parallel
  const primaryPromises = Array.from(primaryUrls).map(preloadImageUrl);
  // Also start secondary (explanation) images right away
  const secondaryPromises = Array.from(secondaryUrls).map(preloadImageUrl);

  await Promise.allSettled(primaryPromises);
  void Promise.allSettled(secondaryPromises);
}
