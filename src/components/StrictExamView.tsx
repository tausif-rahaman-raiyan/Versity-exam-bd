import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Award,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  Lock,
  Sparkles,
  HelpCircle,
  Key,
  X,
} from 'lucide-react';
import { ExamSession, Question, requiresSubjectSelection, sessionSupportsLanguageToggle } from '../data/questionBank';
import { loadQuestionsForSession, ImportedQuestion } from '../data/sessionQuestionLoader';
import {
  MathMarkdownRenderer,
  deduplicateImageUrls,
  extractInlineImageKeys,
  normalizeImageKey,
} from './MathMarkdownRenderer';
import { InlineAiTutor } from './InlineAiTutor';
import { saveExamAttempt } from '../utils/examHistory';
import { UiSettings } from '../utils/uiSettings';
import { getSubjectCardStyle } from '../utils/subjectColors';
import { SettingsDropdown } from './SettingsDropdown';
import {
  ExamLanguage,
  getLocalizedQuestion,
  getSubjectLabelForLang,
  toBengaliNumber,
  getOptionLabelForLang,
} from '../utils/examTranslator';

interface StrictExamViewProps {
  examSession: ExamSession;
  onBack: () => void;
  customApiKey: string;
  setCustomApiKey: (key: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onOpenApiKeyModal: () => void;
  uiSettings: UiSettings;
  onUpdateSettings: (next: UiSettings) => void;
  selectedExamSubjects?: string[];
  onChangeSubjects?: () => void;
  examLanguage: ExamLanguage;
  onChangeExamLanguage: (lang: ExamLanguage) => void;
}

const BANGLA_OPTION_LABELS = ['ক', 'খ', 'গ', 'ঘ', 'ঙ'];

export const StrictExamView: React.FC<StrictExamViewProps> = ({
  examSession,
  onBack,
  customApiKey,
  darkMode,
  setDarkMode,
  onOpenApiKeyModal,
  uiSettings,
  onUpdateSettings,
  selectedExamSubjects,
  examLanguage,
}) => {
  const [rawQuestions, setRawQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [lockedQuestions, setLockedQuestions] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState<number>(examSession.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [activeAiQuestionIds, setActiveAiQuestionIds] = useState<Set<string>>(new Set());
  const [showApiKeyToast, setShowApiKeyToast] = useState<boolean>(false);

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
    loadQuestionsForSession(examSession).then((data) => {
      if (mounted) {
        setRawQuestions(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [examSession]);

  const supportsLanguageToggle = sessionSupportsLanguageToggle(examSession);
  const effectiveLanguage: ExamLanguage = supportsLanguageToggle ? examLanguage : 'bn';

  // Filter questions to the 4 chosen subjects when this is a DU 4-of-6 MCQ session
  const isDu4Of6 = requiresSubjectSelection(examSession);
  const active4Subjects = useMemo(() => {
    if (!isDu4Of6) return null;
    if (selectedExamSubjects && selectedExamSubjects.length === 4) {
      return selectedExamSubjects;
    }
    return ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
  }, [isDu4Of6, selectedExamSubjects]);

  const questions = useMemo(() => {
    const filteredBySubject = active4Subjects
      ? rawQuestions.filter((q) => active4Subjects.includes(q.subject))
      : rawQuestions;

    return filteredBySubject.map((q) =>
      getLocalizedQuestion(q, effectiveLanguage)
    );
  }, [rawQuestions, active4Subjects, effectiveLanguage]);

  const subjects = useMemo(() => {
    const subs = new Set<string>();
    questions.forEach((q) => subs.add(q.subject));
    return ['ALL', ...Array.from(subs)];
  }, [questions]);

  const subjectCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: questions.length };
    questions.forEach((q) => {
      counts[q.subject] = (counts[q.subject] || 0) + 1;
    });
    return counts;
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    if (selectedSubject === 'ALL') return questions;
    return questions.filter((q) => q.subject === selectedSubject);
  }, [questions, selectedSubject]);

  const negativePenalty = examSession.university === 'JU' ? 0.2 : 0.25;

  const mcqQuestionCount = useMemo(() => {
    return questions.filter((q) => q.questionType !== 'Written' && q.options.length > 0).length;
  }, [questions]);

  const sessionTotalMarks = useMemo(() => {
    if (isDu4Of6 && mcqQuestionCount > 0) {
      return mcqQuestionCount;
    }
    return examSession.totalMarks;
  }, [isDu4Of6, mcqQuestionCount, examSession.totalMarks]);

  const markPerQuestion =
    mcqQuestionCount > 0 ? sessionTotalMarks / mcqQuestionCount : 1;

  // Countdown Timer
  useEffect(() => {
    if (isSubmitted || loading) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, loading]);

  // Strict Auto-Lock Option Selection
  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    if (lockedQuestions.has(questionId)) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));

    setLockedQuestions((prev) => {
      const next = new Set(prev);
      next.add(questionId);
      return next;
    });
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const results = useMemo(() => {
    if (!isSubmitted) return null;

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    let unverifiedCount = 0;

    questions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      const isWritten = q.questionType === 'Written' || q.options.length === 0;
      const isUnverified = !isWritten && (q.answerVerified === false || q.correctAnswer < 0);

      if (isWritten) return;
      if (isUnverified) {
        unverifiedCount++;
        return;
      }

      if (selected === undefined) {
        unattemptedCount++;
      } else if (selected === q.correctAnswer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const totalMarksEarned = Math.max(
      0,
      correctCount * markPerQuestion - incorrectCount * negativePenalty * markPerQuestion
    );
    const accuracy =
      correctCount + incorrectCount > 0
        ? (correctCount / (correctCount + incorrectCount)) * 100
        : 0;

    return {
      correctCount,
      incorrectCount,
      unattemptedCount,
      unverifiedCount,
      totalMarksEarned: Number(totalMarksEarned.toFixed(2)),
      accuracy: Number(accuracy.toFixed(1)),
    };
  }, [isSubmitted, questions, selectedAnswers, markPerQuestion, negativePenalty]);

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isSubmitted && results) {
      const timeSpent = Math.max(0, examSession.durationMinutes * 60 - timeLeft);
      saveExamAttempt({
        sessionId: examSession.id,
        title: examSession.title,
        university: examSession.university,
        session: examSession.session,
        questionType: examSession.questionType,
        score: results.totalMarksEarned,
        totalMarks: sessionTotalMarks,
        totalQuestions: questions.length,
        correctCount: results.correctCount,
        incorrectCount: results.incorrectCount,
        unattemptedCount: results.unattemptedCount,
        timeTakenSeconds: timeSpent,
      });
    }
  }, [isSubmitted]);

  const handleRetake = () => {
    setSelectedAnswers({});
    setLockedQuestions(new Set());
    setTimeLeft(examSession.durationMinutes * 60);
    setIsSubmitted(false);
    setActiveAiQuestionIds(new Set());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* Full-Width Flush Sticky Exam Bar + Sticky Color-Coded Subject Filter Tabs (Zero Top Gap) */}
      <div className="sticky top-0 left-0 right-0 z-50 w-full bg-white/95 dark:bg-[#070B14]/95 backdrop-blur-md border-b border-slate-200 dark:border-indigo-950/90 shadow-lg transition-all">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 space-y-2.5 sm:space-y-3">
          {/* Row 1: Single Clean Line of Exam Controls */}
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                onClick={onBack}
                className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-[#0E1628] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#1E293B] border border-slate-200 dark:border-slate-800 transition-colors shrink-0 cursor-pointer"
                title="Back to Home"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <h1 className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900 dark:text-white truncate tracking-tight">
                {examSession.title}
              </h1>
            </div>

            {/* Right Controls: Progress (0/60), Timer (44:15), Submit & Settings */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <div className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-slate-100 dark:bg-[#0E1628] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm md:text-base font-extrabold text-indigo-600 dark:text-sky-400 tabular-nums">
                <span>
                  {lockedQuestions.size}/{questions.length}
                </span>
              </div>

              <div
                className={`flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono text-xs sm:text-base md:text-lg font-extrabold tabular-nums border ${
                  timeLeft < 300 && !isSubmitted
                    ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-700 animate-pulse'
                    : 'bg-slate-100 dark:bg-[#0E1628] text-slate-900 dark:text-white border-slate-200 dark:border-indigo-900/60'
                }`}
              >
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-indigo-600 dark:text-sky-400 shrink-0" />
                <span>{formatTime(timeLeft)}</span>
              </div>

              {!isSubmitted ? (
                <button
                  onClick={handleSubmitExam}
                  className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-xl font-extrabold text-xs sm:text-sm md:text-base text-white bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 shadow-sm transition-all cursor-pointer"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={handleRetake}
                  className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl font-extrabold text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-[#0E1628] hover:bg-slate-200 dark:hover:bg-[#1E293B] border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Retake</span>
                </button>
              )}

              <SettingsDropdown
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                uiSettings={uiSettings}
                onUpdateSettings={onUpdateSettings}
                onOpenApiKeyModal={onOpenApiKeyModal}
                hasCustomKey={Boolean(customApiKey)}
                compact
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Exam Content Container Below Sticky Bar */}
      <div className="max-w-5xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6 space-y-5">
      {/* Results Dashboard Banner */}
      {isSubmitted && results && (
        <div className="bg-white dark:bg-[#0C1324] rounded-2xl p-5 border border-indigo-200 dark:border-indigo-500/40 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-sky-400 border border-indigo-500/30">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  চূড়ান্ত ফলাফল ও বিশ্লেষণ (Evaluation Report)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  ভুল উত্তরের জন্য নেগেটিভ মার্কিং (-{negativePenalty}) কর্তন করা হয়েছে। নিচে প্রতিটি প্রশ্নের ব্যাখ্যা ও সমাধানের নিচে{' '}
                  <strong className="text-indigo-600 dark:text-sky-400">AI Tutor</strong> বাটনে ক্লিক করে বিস্তারিত বুঝে নিন।
                </p>
              </div>
            </div>
          </div>

          {mcqQuestionCount === 0 ? (
            <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/50 text-sky-900 dark:text-sky-200 text-xs">
              এটি একটি লিখিত (Written) পরীক্ষার সেশন। নিচের সমাধান ও AI Tutor দেখে নিজের খাতা মূল্যায়ন করুন।
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60">
                <div className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 mb-0.5">
                  প্রাপ্ত নম্বর (Score)
                </div>
                <div className="text-xl font-black text-slate-900 dark:text-white">
                  {results.totalMarksEarned}{' '}
                  <span className="text-xs font-normal text-indigo-600 dark:text-indigo-300">
                    / {sessionTotalMarks}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50">
                <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 mb-0.5">
                  সঠিক উত্তর (Correct)
                </div>
                <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                  {results.correctCount}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50">
                <div className="text-[11px] font-semibold text-rose-700 dark:text-rose-300 mb-0.5">
                  ভুল উত্তর (Wrong)
                </div>
                <div className="text-xl font-black text-rose-600 dark:text-rose-400">
                  {results.incorrectCount}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#080D1A] border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                  উত্তর দেননি (Skipped)
                </div>
                <div className="text-xl font-black text-slate-800 dark:text-slate-200">
                  {results.unattemptedCount}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/50">
                <div className="text-[11px] font-semibold text-sky-700 dark:text-sky-300 mb-0.5">
                  সঠিকতার হার (Accuracy)
                </div>
                <div className="text-xl font-black text-sky-600 dark:text-sky-400">
                  {results.accuracy}%
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50">
                <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 mb-0.5">
                  অযাচাইকৃত প্রশ্ন
                </div>
                <div className="text-xl font-black text-amber-600 dark:text-amber-400">
                  {results.unverifiedCount}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading Indicator */}
      {loading ? (
        <div className="bg-white dark:bg-[#0B1120] rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full border-3 border-indigo-600 dark:border-sky-500 border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-600 dark:text-slate-400">
            প্রশ্নপত্র লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Subject Filter Options (Rendered separately before questions start) */}
          {questions.length > 0 && (
            <div className="bg-white dark:bg-[#0C1324] rounded-2xl p-3 sm:p-3.5 border border-slate-200 dark:border-slate-800/80 shadow-sm">
              <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar">
                {subjects.map((sub) => {
                  const style = getSubjectCardStyle(sub);
                  const isSelected = selectedSubject === sub;
                  const count = subjectCounts[sub] || 0;
                  const displayCount =
                    effectiveLanguage === 'bn' ? toBengaliNumber(count) : String(count);
                  const subLabel =
                    sub === 'ALL'
                      ? effectiveLanguage === 'bn'
                        ? 'সকল'
                        : 'ALL'
                      : getSubjectLabelForLang(sub, effectiveLanguage);
                  return (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => setSelectedSubject(sub)}
                      className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm md:text-[15px] font-bold border whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                        isSelected ? style.filterActive : style.filterInactive
                      }`}
                    >
                      {subLabel} ({displayCount})
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {filteredQuestions.map((q, index) => {
            const imported = q as ImportedQuestion;
            const isLocked = lockedQuestions.has(q.id);
            const selectedOpt = selectedAnswers[q.id];
            const isWritten = q.questionType === 'Written' || q.options.length === 0;
            const isUnverified = !isWritten && (q.answerVerified === false || q.correctAnswer < 0);
            const qText = q.question || 'চিত্রটি লক্ষ্য কর এবং সঠিক উত্তর নির্বাচন কর:';
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
                className={`rounded-2xl p-4 sm:p-5 transition-all ${subStyle.bgClass} ${subStyle.borderClass}`}
              >
                {/* Question Card Top Header */}
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
                    {!isSubmitted && isLocked && (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                        <Lock className="w-2.5 h-2.5" />
                        <span>Locked</span>
                      </span>
                    )}
                  </div>

                  {/* Right Side: Evaluation Status Only (AI Tutor moved below ব্যাখ্যা ও সমাধান) */}
                  {isSubmitted && (
                    <div className="flex items-center gap-2">
                      {isWritten ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30">
                          <BookOpen className="w-3 h-3" />
                          <span>লিখিত</span>
                        </span>
                      ) : isUnverified ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                          <HelpCircle className="w-3 h-3" />
                          <span>অযাচাইকৃত</span>
                        </span>
                      ) : selectedOpt === undefined ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          <AlertCircle className="w-3 h-3" />
                          <span>উত্তর দেননি</span>
                        </span>
                      ) : selectedOpt === q.correctAnswer ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>সঠিক (+{Number(markPerQuestion.toFixed(2))})</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                          <XCircle className="w-3 h-3" />
                          <span>ভুল (-{Number((negativePenalty * markPerQuestion).toFixed(2))})</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Question Text & Images */}
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
                          alt={`প্রশ্ন ${index + 1} চিত্র`}
                          className="max-h-56 w-auto rounded-xl border border-slate-200 dark:border-slate-700 object-contain bg-white p-1.5"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Options Grid */}
                {isWritten ? (
                  <div className="p-3 rounded-xl bg-white/80 dark:bg-[#070C18] border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                    লিখিত প্রশ্ন — খাতায় সমাধান করুন এবং পরীক্ষা শেষে সমাধান ও AI Tutor এর সাথে মিলিয়ে নিন।
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((optText, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      const isCorrect = !isUnverified && q.correctAnswer === optIdx;
                      const optImgs = deduplicateImageUrls(
                        optionImages[optIdx] || [],
                        extractInlineImageKeys(optText)
                      );
                      const optLbl = getOptLabel(optIdx);

                      let optionStyle =
                        'border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-[#070C18] hover:border-indigo-400 dark:hover:border-indigo-500/50 text-slate-800 dark:text-slate-200 cursor-pointer';
                      let badgeStyle =
                        'bg-slate-100 dark:bg-[#111A2E] text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700';

                      if (!isSubmitted) {
                        if (isSelected) {
                          optionStyle =
                            'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-950 dark:text-white font-semibold ring-1 ring-indigo-500/40 cursor-not-allowed';
                          badgeStyle = 'bg-indigo-600 text-white border-indigo-500';
                        } else if (isLocked) {
                          optionStyle =
                            'border-slate-200 dark:border-slate-800/60 bg-slate-50/60 dark:bg-[#060A14] text-slate-400 dark:text-slate-500 opacity-60 cursor-not-allowed';
                          badgeStyle = 'bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600';
                        }
                      } else {
                        if (isUnverified) {
                          if (isSelected) {
                            optionStyle =
                              'border-amber-500/60 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100 font-semibold';
                            badgeStyle = 'bg-amber-600 text-white';
                          } else {
                            optionStyle =
                              'border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#070C18] text-slate-500 dark:text-slate-400 opacity-75';
                          }
                        } else if (isCorrect) {
                          optionStyle =
                            'border-emerald-500/70 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-100 font-semibold ring-1 ring-emerald-500/30';
                          badgeStyle = 'bg-emerald-600 text-white border-emerald-500';
                        } else if (isSelected && !isCorrect) {
                          optionStyle =
                            'border-rose-500/70 bg-rose-50 dark:bg-rose-950/50 text-rose-950 dark:text-rose-100 font-semibold ring-1 ring-rose-500/30';
                          badgeStyle = 'bg-rose-600 text-white border-rose-500';
                        } else {
                          optionStyle =
                            'border-slate-200 dark:border-slate-800/70 bg-white/80 dark:bg-[#070C18] text-slate-500 dark:text-slate-400 opacity-75';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={isSubmitted || isLocked}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`flex items-center text-left p-3 rounded-xl border transition-all ${optionStyle}`}
                        >
                          <span
                            className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-extrabold mr-2.5 ${badgeStyle}`}
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
                          {isSubmitted && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 ml-2" />
                          )}
                          {isSubmitted && isSelected && !isCorrect && !isUnverified && (
                            <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Post-Submit Solution & AI Tutor Button Below ব্যাখ্যা ও সমাধান */}
                {isSubmitted && (
                  <div className="mt-4 space-y-3">
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

                    {/* Inline Accordion AI Tutor right below the button */}
                    {isAiOpen && (
                      <InlineAiTutor
                        question={q}
                        university={examSession.university}
                        session={examSession.session}
                        customApiKey={customApiKey}
                        explanationFontPx={uiSettings.explanationFontPx}
                        onOpenApiKeyModal={onOpenApiKeyModal}
                        onClose={() => toggleAiTutor(q.id)}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      </div>

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
