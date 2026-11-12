import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Search,
  Sparkles,
  Play,
  Languages,
  AlertCircle,
  Key,
  X,
} from 'lucide-react';
import { ExamSession, Question, sessionSupportsLanguageToggle } from '../data/questionBank';
import { loadQuestionsForSession, ImportedQuestion } from '../data/sessionQuestionLoader';
import {
  MathMarkdownRenderer,
  deduplicateImageUrls,
  extractInlineImageKeys,
  normalizeImageKey,
} from './MathMarkdownRenderer';
import { InlineAiTutor } from './InlineAiTutor';
import { UiSettings } from '../utils/uiSettings';
import { getSubjectCardStyle } from '../utils/subjectColors';
import {
  ExamLanguage,
  getLocalizedQuestion,
  getSubjectLabelForLang,
  toBengaliNumber,
  getOptionLabelForLang,
} from '../utils/examTranslator';

interface QuestionBankViewProps {
  session: ExamSession;
  onBack: () => void;
  onStartExam: (sessionId: string) => void;
  customApiKey: string;
  onOpenApiKeyModal: () => void;
  uiSettings: UiSettings;
  examLanguage: ExamLanguage;
  onChangeExamLanguage: (lang: ExamLanguage) => void;
}

const BANGLA_OPTION_LABELS = ['ক', 'খ', 'গ', 'ঘ', 'ঙ'];

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  session,
  onBack,
  onStartExam,
  customApiKey,
  onOpenApiKeyModal,
  uiSettings,
  examLanguage,
  onChangeExamLanguage,
}) => {
  const [rawQuestions, setRawQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeAiQuestionIds, setActiveAiQuestionIds] = useState<Set<string>>(new Set());
  const [showApiKeyToast, setShowApiKeyToast] = useState<boolean>(false);

  const supportsLanguageToggle = sessionSupportsLanguageToggle(session);
  const effectiveLanguage: ExamLanguage = supportsLanguageToggle ? examLanguage : 'bn';

  const toggleAiTutor = (questionId: string) => {
    setActiveAiQuestionIds((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
        return next;
      }
      if (!customApiKey || customApiKey.trim().length <= 10) {
        setShowApiKeyToast(true);
        return prev;
      }
      next.add(questionId);
      return next;
    });
  };

  useEffect(() => {
    if (!showApiKeyToast) return;
    const t = setTimeout(() => setShowApiKeyToast(false), 6000);
    return () => clearTimeout(t);
  }, [showApiKeyToast]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setSelectedSubject('ALL');
    loadQuestionsForSession(session).then((data) => {
      if (mounted) {
        setRawQuestions(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [session]);

  const questions = useMemo(() => {
    return rawQuestions.map((q) =>
      getLocalizedQuestion(q, effectiveLanguage)
    );
  }, [rawQuestions, effectiveLanguage]);

  const subjects = useMemo(() => {
    const subs = new Set<string>();
    questions.forEach((q) => subs.add(q.subject));
    return ['ALL', ...Array.from(subs)];
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesSubject = selectedSubject === 'ALL' || q.subject === selectedSubject;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        (q.question || '').toLowerCase().includes(query) ||
        (q.explanation || '').toLowerCase().includes(query) ||
        (q.subject || '').toLowerCase().includes(query) ||
        q.options.some((opt) => (opt || '').toLowerCase().includes(query));
      return matchesSubject && matchesSearch;
    });
  }, [questions, selectedSubject, searchQuery]);

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Top Session Header */}
      <div className="bg-white dark:bg-[#0B1120] rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#111A2E] px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>সকল সেশনে ফিরে যান</span>
          </button>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Language Switcher Pill - ONLY shown when session supports bilingual toggle */}
            {supportsLanguageToggle && (
              <div
                className="flex items-center bg-slate-100 dark:bg-[#111A2E] p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold"
                title="প্রশ্নের ভাষা নির্বাচন করুন"
              >
                <Languages className="w-3.5 h-3.5 text-indigo-600 dark:text-sky-400 ml-1.5 mr-1 hidden sm:inline" />
                <button
                  type="button"
                  onClick={() => onChangeExamLanguage('bn')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    examLanguage === 'bn'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  বাংলা (BN)
                </button>
                <button
                  type="button"
                  onClick={() => onChangeExamLanguage('en')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    examLanguage === 'en'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  English (EN)
                </button>
              </div>
            )}

            <button
              onClick={() => onStartExam(session.id)}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Start Strict Exam</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-indigo-600 text-white">
                {session.university}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                Session {session.session}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                Question Bank &amp; Solution
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              {session.title}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              মোট {loading ? '...' : questions.length} টি প্রশ্ন • সঠিক উত্তর ও ব্যাখ্যাসহ সরাসরি{' '}
              <strong className="text-indigo-600 dark:text-sky-400">AI Tutor</strong> প্রশ্নোত্তর
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="প্রশ্ন বা অধ্যায় খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070C18] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-sky-500 text-xs"
            />
          </div>
        </div>

        {/* Subject Pills */}
        {!loading && questions.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-4 border-t border-slate-200 dark:border-slate-800/80 no-scrollbar">
            {subjects.map((sub) => {
              const style = getSubjectCardStyle(sub);
              const isSelected = selectedSubject === sub;
              const subLabel =
                sub === 'ALL'
                  ? effectiveLanguage === 'bn'
                    ? 'সকল বিষয় (ALL)'
                    : 'ALL Subjects'
                  : getSubjectLabelForLang(sub, effectiveLanguage);
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border whitespace-nowrap transition-all ${
                    isSelected ? style.filterActive : style.filterInactive
                  }`}
                >
                  {subLabel}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Questions List */}
      {loading ? (
        <div className="bg-white dark:bg-[#0B1120] rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full border-3 border-indigo-600 dark:border-sky-500 border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-600 dark:text-slate-400">
            প্রশ্ন ব্যাংক লোড হচ্ছে...
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q, index) => {
            const imported = q as ImportedQuestion;
            const isWritten = q.questionType === 'Written' || q.options.length === 0;
            const isUnverified = !isWritten && (q.answerVerified === false || q.correctAnswer < 0);
            const qText = q.question || 'চিত্রটি লক্ষ্য কর:';
            const qExplanation = q.explanation;
            const rawOptionImages = imported.optionImageUrls || [];
            const allOptionImgKeys = new Set<string>(
              rawOptionImages.flat().map((u) => normalizeImageKey(u)).filter(Boolean)
            );
            const qInlineImgKeys = extractInlineImageKeys(qText);
            allOptionImgKeys.forEach((k) => qInlineImgKeys.add(k));
            const questionImages = deduplicateImageUrls(
              imported.questionImageUrls || [],
              qInlineImgKeys
            );
            const optionImages = rawOptionImages;
            const explanationImages = deduplicateImageUrls(
              imported.explanationImageUrls || [],
              extractInlineImageKeys(qExplanation)
            );
            const isAiOpen = activeAiQuestionIds.has(q.id);
            const subStyle = getSubjectCardStyle(q.subject);

            const getOptLabel = (optIdx: number) =>
              imported.optionLabels?.[optIdx] ||
              q.optionLabels?.[optIdx] ||
              getOptionLabelForLang(optIdx, effectiveLanguage) ||
              BANGLA_OPTION_LABELS[optIdx];

            return (
              <div
                key={q.id}
                className={`rounded-2xl p-4 sm:p-5 transition-colors ${subStyle.bgClass} ${subStyle.borderClass}`}
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center flex-wrap gap-2">
                    <span
                      className={`inline-flex items-center justify-center px-2.5 h-6 rounded-md font-extrabold text-xs border ${subStyle.numBadge}`}
                    >
                      প্রশ্ন{' '}
                      {effectiveLanguage === 'bn'
                        ? toBengaliNumber(q.number ?? index + 1)
                        : q.number ?? index + 1}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold ${subStyle.badgeBg}`}>
                      {getSubjectLabelForLang(q.subject, effectiveLanguage)}
                    </span>
                    {isWritten ? (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30">
                        লিখিত প্রশ্ন
                      </span>
                    ) : isUnverified ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                        <HelpCircle className="w-3 h-3" />
                        <span>অযাচাইকৃত</span>
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Question Stem */}
                <div
                  style={{ fontSize: `${uiSettings.questionFontPx}px` }}
                  className="font-semibold text-slate-900 dark:text-slate-100 mb-3.5 leading-relaxed"
                >
                  <MathMarkdownRenderer content={qText} />
                  {questionImages.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-2.5">
                      {questionImages.map((imgUrl, iIdx) => (
                        <img
                          key={imgUrl + iIdx}
                          src={imgUrl}
                          alt={`প্রশ্ন ${index + 1}`}
                          className="max-h-56 w-auto rounded-xl border border-slate-200 dark:border-slate-700 object-contain bg-white p-1.5"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Options Grid */}
                {!isWritten && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                    {q.options.map((optText, optIdx) => {
                      const isCorrect = !isUnverified && q.correctAnswer === optIdx;
                      const optImgs = deduplicateImageUrls(
                        optionImages[optIdx] || [],
                        extractInlineImageKeys(optText)
                      );
                      const optLbl = getOptLabel(optIdx);

                      return (
                        <div
                          key={optIdx}
                          className={`flex items-center p-3 rounded-xl border ${
                            isCorrect
                              ? 'border-emerald-500/70 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-100 font-semibold ring-1 ring-emerald-500/30'
                              : 'border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-[#070C18] text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span
                            className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-extrabold mr-2.5 ${
                              isCorrect
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 dark:bg-[#111A2E] text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                            }`}
                          >
                            {optLbl}
                          </span>
                          <div
                            style={{ fontSize: `${uiSettings.optionFontPx}px` }}
                            className="flex-grow"
                          >
                            {optText && <MathMarkdownRenderer content={optText} />}
                            {optImgs.length > 0 && (
                              <div className="mt-1.5 flex flex-wrap gap-2">
                                {optImgs.map((u, uIdx) => (
                                  <img
                                    key={u + uIdx}
                                    src={u}
                                    alt={`অপশন ${optLbl}`}
                                    className="max-h-28 w-auto rounded-lg border border-slate-200 dark:border-slate-700 object-contain bg-white p-1"
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                          {isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 ml-2" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Solution Box + AI Tutor Button Below ব্যাখ্যা ও সমাধান */}
                <div className="mt-3 space-y-3">
                  {(qExplanation || explanationImages.length > 0) && (
                    <div className="p-3.5 rounded-xl bg-white/90 dark:bg-[#070C18] border border-slate-200 dark:border-slate-800/90 text-xs">
                      <div className="flex items-center space-x-2 font-black text-indigo-800 dark:text-sky-300 text-base sm:text-lg mb-2.5 tracking-wide">
                        <BookOpen className="w-5 h-5 text-indigo-600 dark:text-sky-400 shrink-0 stroke-[2.5]" />
                        <span className="font-black text-indigo-800 dark:text-sky-300 text-base sm:text-lg">ব্যাখ্যা ও সমাধান:</span>
                      </div>
                      <div
                        style={{ fontSize: `${uiSettings.explanationFontPx}px` }}
                        className="text-slate-700 dark:text-slate-300 leading-relaxed"
                      >
                        {qExplanation && <MathMarkdownRenderer content={qExplanation} />}
                        {explanationImages.length > 0 && (
                          <div className="mt-2.5 flex flex-wrap gap-2.5">
                            {explanationImages.map((imgUrl, iIdx) => (
                              <img
                                key={imgUrl + iIdx}
                                src={imgUrl}
                                alt="সমাধান চিত্র"
                                className="max-h-60 w-auto rounded-xl border border-slate-200 dark:border-slate-700 object-contain bg-white p-1.5"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* AI Tutor Button Placed Below ব্যাখ্যা ও সমাধান */}
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => toggleAiTutor(q.id)}
                      className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
                        isAiOpen
                          ? 'bg-sky-500 text-slate-950'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isAiOpen ? 'AI Tutor বন্ধ করুন' : 'AI Tutor'}</span>
                    </button>
                  </div>

                  {/* Inline Accordion AI Tutor */}
                  {isAiOpen && (
                    <InlineAiTutor
                      question={q}
                      university={session.university}
                      session={session.session}
                      customApiKey={customApiKey}
                      explanationFontPx={uiSettings.explanationFontPx}
                      onOpenApiKeyModal={onOpenApiKeyModal}
                      onClose={() => toggleAiTutor(q.id)}
                    />
                  )}
                </div>
              </div>
            );
          })}

          {filteredQuestions.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-[#0B1120] rounded-2xl border border-slate-200 dark:border-slate-800">
              <BookOpen className="mx-auto h-10 w-10 text-slate-400 mb-2" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                কোনো প্রশ্ন পাওয়া যায়নি
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                অন্য কোনো বিষয় বা কীওয়ার্ড দিয়ে অনুসন্ধান করুন।
              </p>
            </div>
          )}
        </div>
      )}

      {/* Floating Notification Toast when AI Tutor is clicked without an API Key */}
      {showApiKeyToast && (
        <div className="fixed bottom-5 right-4 left-4 sm:left-auto sm:w-[420px] z-[90] bg-slate-900 dark:bg-[#0D162B] text-white rounded-2xl p-4 shadow-2xl border border-amber-500/50 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-extrabold text-white">
                API Key প্রয়োজন (API Key Required)
              </p>
              <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5 leading-snug">
                AI Tutor ব্যবহার করতে প্রথমে আপনার Gemini API Key যুক্ত করুন।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                setShowApiKeyToast(false);
                onOpenApiKeyModal();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-colors cursor-pointer"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Add API Key</span>
            </button>
            <button
              type="button"
              onClick={() => setShowApiKeyToast(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
