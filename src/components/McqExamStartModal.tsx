import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  Lock,
  X,
  Play,
  Globe,
  Clock,
  Award,
  BookOpen,
  Layers,
  AlertCircle,
} from 'lucide-react';
import { ExamSession, Question, sessionSupportsLanguageToggle } from '../data/questionBank';
import { loadQuestionsForSession } from '../data/sessionQuestionLoader';
import { preloadQuestionsImages } from '../utils/imagePreloader';
import { ExamLanguage, toBengaliNumber } from '../utils/examTranslator';
import {
  McqExamConfig,
  buildMcqExamConfig,
  getInitialSelectedSubjects,
  toggleExamSubject,
  isExamSelectionValid,
  getExamSummary,
  toCanonicalSubjectName,
} from '../utils/mcqExamSelection';

export interface McqExamStartModalProps {
  isOpen: boolean;
  session: ExamSession | null;
  config?: McqExamConfig;
  initialSubjects?: string[];
  initialLanguage?: ExamLanguage;
  onClose: () => void;
  onConfirmStartExam: (
    session: ExamSession,
    selectedSubjects: string[],
    language: ExamLanguage
  ) => void;
}

export const McqExamStartModal: React.FC<McqExamStartModalProps> = ({
  isOpen,
  session,
  config: externalConfig,
  initialSubjects,
  initialLanguage = 'bn',
  onClose,
  onConfirmStartExam,
}) => {
  const [preloadedQuestions, setPreloadedQuestions] = useState<Question[]>([]);

  // Eagerly load session questions & preload all images in the background as soon as modal opens
  useEffect(() => {
    if (!isOpen || !session) {
      setPreloadedQuestions([]);
      return;
    }

    let cancelled = false;
    loadQuestionsForSession(session)
      .then((qs) => {
        if (!cancelled) {
          setPreloadedQuestions(qs);
          void preloadQuestionsImages(qs);
        }
      })
      .catch(() => {
        // fallback handled by loader
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, session]);

  const config: McqExamConfig | null = useMemo(() => {
    if (externalConfig) return externalConfig;
    if (!session) return null;
    return buildMcqExamConfig(
      session,
      preloadedQuestions.length > 0 ? preloadedQuestions : undefined
    );
  }, [externalConfig, session, preloadedQuestions]);

  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>(() =>
    getInitialSelectedSubjects(config?.selectionRule)
  );

  const [language, setLanguage] = useState<ExamLanguage>(
    initialLanguage || config?.defaultLanguage || 'bn'
  );

  // Reset subject selection ONLY when a new exam session opens (never when language changes)
  useEffect(() => {
    if (!isOpen || !config) return;

    const rule = config.selectionRule;
    if (!rule) {
      setSelectedSubjectIds(config.subjects.map((s) => s.id));
      return;
    }

    // If caller passed valid previously selected subjects (e.g., when changing subjects mid-exam),
    // preserve them ONLY if they already satisfy the mandatory + optional rule; otherwise start
    // with mandatory subjects (Physics & Chemistry) preselected so the user chooses 2 optional subjects.
    if (
      initialSubjects &&
      initialSubjects.length > 0 &&
      isExamSelectionValid(initialSubjects, rule)
    ) {
      setSelectedSubjectIds(initialSubjects.map(toCanonicalSubjectName));
    } else {
      setSelectedSubjectIds(getInitialSelectedSubjects(rule));
    }
  }, [isOpen, config?.id]);

  // Sync initial language when modal opens for a session
  useEffect(() => {
    if (isOpen && config) {
      const supported = config.supportedLanguages ?? ['bn', 'en'];
      if (initialLanguage && supported.includes(initialLanguage)) {
        setLanguage(initialLanguage);
      } else {
        setLanguage(config.defaultLanguage ?? 'bn');
      }
    }
  }, [isOpen, config?.id, initialLanguage]);

  // Close on Escape key & lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !session || !config) return null;

  const rule = config.selectionRule;
  const hasSelectionRule = Boolean(rule);
  const supportsLanguageToggle = sessionSupportsLanguageToggle(session.id);
  const supportedLanguages = config.supportedLanguages ?? ['bn'];
  const supportsEnglish = supportsLanguageToggle && supportedLanguages.includes('en');
  const effectiveLang: ExamLanguage = supportsEnglish ? language : 'bn';
  const isBn = effectiveLang === 'bn';

  const selectionIsValid = isExamSelectionValid(selectedSubjectIds, rule);
  const summary = getExamSummary(selectedSubjectIds, config.subjects, rule);

  const requiredIds = rule?.requiredSubjectIds ?? [];
  const optionalIds = rule?.optionalSubjectIds ?? [];
  const optionalSelectedCount = selectedSubjectIds.filter((id) =>
    optionalIds.some((optId) => optId.toLowerCase() === id.toLowerCase())
  ).length;
  const requiredOptionalCount =
    rule?.exactOptionalSelections ?? rule?.maxOptionalSelections ?? 0;
  const remainingOptionalNeeded = Math.max(
    0,
    requiredOptionalCount - optionalSelectedCount
  );
  const totalTargetSubjects = requiredIds.length + requiredOptionalCount;

  function handleSubjectToggle(subjectId: string) {
    if (!rule) return;
    setSelectedSubjectIds((current) =>
      toggleExamSubject(current, subjectId, rule)
    );
  }

  function handleStart() {
    if (!selectionIsValid || !session) return;
    const canonicalIds = (
      hasSelectionRule
        ? selectedSubjectIds
        : config!.subjects.map((s) => s.id)
    ).map(toCanonicalSubjectName);
    onConfirmStartExam(session, canonicalIds, effectiveLang);
  }

  const fmtNum = (n: number | string) => (isBn ? toBengaliNumber(n) : String(n));

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mcq-exam-modal-title"
        className="bg-white dark:bg-[#0B1222] border border-slate-200 dark:border-[#1E293B] rounded-2xl max-w-[580px] w-full shadow-2xl text-slate-900 dark:text-slate-100 my-auto max-h-[92vh] flex flex-col overflow-hidden"
      >
        {/* 1. HEADER */}
        <div className="px-4 py-3.5 sm:px-5 sm:py-4 border-b border-slate-200/80 dark:border-[#1E293B] flex items-start justify-between gap-3 shrink-0">
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white font-bold uppercase tracking-wider">
                {config.university || session.university}
              </span>
              <span>·</span>
              <span>{config.session || session.session}</span>
              {config.unitLabel && (
                <>
                  <span>·</span>
                  <span className="text-indigo-600 dark:text-sky-400 font-semibold">
                    {config.unitLabel}
                  </span>
                </>
              )}
              {hasSelectionRule && (
                <span
                  className={`ml-1 px-2 py-0.5 rounded-md font-bold tabular-nums ${
                    selectionIsValid
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30'
                      : 'bg-amber-50 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30'
                  }`}
                >
                  {isBn
                    ? `${fmtNum(selectedSubjectIds.length)}/${fmtNum(totalTargetSubjects)} বিষয় নির্বাচিত`
                    : `${selectedSubjectIds.length}/${totalTargetSubjects} Selected`}
                </span>
              )}
            </div>

            <h2
              id="mcq-exam-modal-title"
              className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white leading-snug truncate"
            >
              {config.title}
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              {hasSelectionRule
                ? isBn
                  ? 'পরীক্ষার ভাষা এবং আপনার ঐচ্ছিক বিষয় নির্বাচন করুন'
                  : 'Select your examination language and optional subjects'
                : isBn
                ? 'পরীক্ষার ভাষা নির্বাচন করে পরীক্ষা শুরু করুন'
                : 'Confirm your examination language and start'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
          {/* 2. EXAM PREFERENCES (Language Selector - ONLY FOR BILINGUAL SESSIONS) */}
          {supportsLanguageToggle && (
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#080D1A] border border-slate-200/80 dark:border-[#1E293B]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block leading-tight">
                    {isBn ? 'প্রশ্নের ভাষা (Question Language)' : 'Question Language'}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                    {isBn
                      ? 'বাংলা অথবা English ভার্সন নির্বাচন করুন'
                      : 'Choose Bengali or English version'}
                  </span>
                </div>
              </div>

              <div
                className="grid grid-cols-2 gap-1 bg-white dark:bg-[#0B1222] p-1 rounded-lg border border-slate-200 dark:border-[#1E293B] shrink-0"
                role="group"
                aria-label="Select examination language"
              >
                <button
                  type="button"
                  onClick={() => setLanguage('bn')}
                  aria-pressed={effectiveLang === 'bn'}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    effectiveLang === 'bn'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  বাংলা (BN)
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  aria-pressed={effectiveLang === 'en'}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    effectiveLang === 'en'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  English (EN)
                </button>
              </div>
            </div>
          )}

          {/* 3. SUBJECT SELECTION */}
          {hasSelectionRule ? (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {isBn
                    ? `বিষয় নির্বাচন (আবশ্যিক ${fmtNum(requiredIds.length)}টি + ঐচ্ছিক ${fmtNum(requiredOptionalCount)}টি)`
                    : `Subject Selection (${requiredIds.length} Mandatory + ${requiredOptionalCount} Optional)`}
                </span>
                <span className="text-[11px] font-semibold text-indigo-600 dark:text-sky-400 tabular-nums">
                  {isBn
                    ? `ঐচ্ছিক নির্বাচিত: ${fmtNum(optionalSelectedCount)}/${fmtNum(requiredOptionalCount)}`
                    : `Optional Selected: ${optionalSelectedCount}/${requiredOptionalCount}`}
                </span>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                {config.subjects.map((subject) => {
                  const isMandatory = requiredIds.some(
                    (id) => id.toLowerCase() === subject.id.toLowerCase()
                  );
                  const isSelected = selectedSubjectIds.some(
                    (id) => id.toLowerCase() === subject.id.toLowerCase()
                  );
                  const isOptionalLimitReached =
                    !isMandatory &&
                    !isSelected &&
                    optionalSelectedCount >= requiredOptionalCount;

                  const displayName =
                    isBn && subject.nameBn
                      ? `${subject.nameBn} (${subject.name})`
                      : subject.name;

                  return (
                    <button
                      key={subject.id}
                      type="button"
                      disabled={isMandatory || isOptionalLimitReached}
                      onClick={() => handleSubjectToggle(subject.id)}
                      aria-pressed={isSelected}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-2.5 min-h-[58px] ${
                        isMandatory
                          ? 'bg-indigo-50/60 dark:bg-indigo-950/35 border-indigo-400 dark:border-indigo-500/60 text-slate-900 dark:text-white cursor-default'
                          : isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs cursor-pointer'
                          : isOptionalLimitReached
                          ? 'bg-slate-50 dark:bg-[#080D1A]/60 border-slate-200/70 dark:border-[#1E293B] text-slate-400 dark:text-slate-500 opacity-55 cursor-not-allowed'
                          : 'bg-white dark:bg-[#080D1A] border-slate-200 dark:border-[#1E293B] hover:border-indigo-400 dark:hover:border-indigo-500 text-slate-800 dark:text-slate-200 cursor-pointer'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-bold truncate">
                            {displayName}
                          </span>
                          {isMandatory && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-indigo-600 text-white">
                              {isBn ? 'আবশ্যিক' : 'Mandatory'}
                            </span>
                          )}
                        </div>
                        <div
                          className={`text-[11px] mt-0.5 tabular-nums ${
                            isSelected && !isMandatory
                              ? 'text-indigo-100'
                              : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {fmtNum(subject.questionCount)} MCQs · {fmtNum(subject.marks)}{' '}
                          {isBn ? 'মার্কস' : 'Marks'}
                        </div>
                      </div>

                      <div className="shrink-0">
                        {isMandatory ? (
                          <div
                            className="w-6 h-6 rounded-lg bg-indigo-600/15 dark:bg-indigo-500/20 text-indigo-600 dark:text-sky-300 flex items-center justify-center"
                            title={isBn ? 'আবশ্যিক বিষয়' : 'Mandatory subject'}
                          >
                            <Lock className="w-3.5 h-3.5" />
                          </div>
                        ) : isSelected ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : (
                          <div className="w-5 h-5 rounded-md border-2 border-slate-300 dark:border-slate-700" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Fixed Syllabus Subjects Overview (for RU, JU, CU, GST, older DU) */
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {isBn ? 'অন্তর্ভুক্ত বিষয়সমূহ (Included Subjects)' : 'Included Subjects'}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isBn ? 'সকল বিষয় আবশ্যিক' : 'All subjects included'}
                </span>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                {config.subjects.map((subject) => {
                  const displayName =
                    isBn && subject.nameBn
                      ? `${subject.nameBn} (${subject.name})`
                      : subject.name;
                  return (
                    <div
                      key={subject.id}
                      className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#080D1A] border border-slate-200/80 dark:border-[#1E293B] flex items-center justify-between gap-2"
                    >
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {displayName}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tabular-nums shrink-0">
                        {fmtNum(subject.questionCount)} Qs
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. DYNAMIC EXAM SUMMARY */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
              {isBn ? 'পরীক্ষার সারসংক্ষেপ (Exam Summary)' : 'Examination Summary'}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#080D1A] border border-slate-200/80 dark:border-[#1E293B]">
                <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <Layers className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>{isBn ? 'নির্বাচিত বিষয়' : 'Subjects'}</span>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mt-0.5 tabular-nums">
                  {fmtNum(summary.totalSubjects)}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#080D1A] border border-slate-200/80 dark:border-[#1E293B]">
                <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <BookOpen className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span>{isBn ? 'মোট MCQ' : 'Total MCQs'}</span>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mt-0.5 tabular-nums">
                  {fmtNum(summary.totalQuestions)}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#080D1A] border border-slate-200/80 dark:border-[#1E293B]">
                <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <Award className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{isBn ? 'মোট মার্কস' : 'Total Marks'}</span>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mt-0.5 tabular-nums">
                  {fmtNum(summary.totalMarks)}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#080D1A] border border-slate-200/80 dark:border-[#1E293B]">
                <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{isBn ? 'সময় ও নেগেটিভ' : 'Duration'}</span>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mt-0.5 tabular-nums">
                  {fmtNum(config.durationMinutes ?? session.durationMinutes)}{' '}
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {isBn ? 'মি.' : 'min'} (-{config.negativeMarking ?? 0.25})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. FOOTER */}
        <div className="px-4 py-3.5 sm:px-5 sm:py-4 border-t border-slate-200/80 dark:border-[#1E293B] bg-slate-50/70 dark:bg-[#080D1A]/70 shrink-0 space-y-2.5 pb-[max(0.875rem,env(safe-area-inset-bottom))]">
          {!selectionIsValid && hasSelectionRule && (
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 px-3 py-2 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                {isBn
                  ? `পরীক্ষা শুরু করতে আরও ${fmtNum(remainingOptionalNeeded)}টি ঐচ্ছিক বিষয় নির্বাচন করুন।`
                  : `Select ${remainingOptionalNeeded} more optional subject${
                      remainingOptionalNeeded > 1 ? 's' : ''
                    } to start the examination.`}
              </span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-xl border border-slate-300 dark:border-[#1E293B] bg-white dark:bg-[#0E1628] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
            >
              {isBn ? 'বাতিল (Cancel)' : 'Cancel'}
            </button>

            <button
              type="button"
              disabled={!selectionIsValid}
              onClick={handleStart}
              className="h-10 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-45 disabled:cursor-not-allowed text-white font-bold text-xs shadow-sm transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isBn ? 'পরীক্ষা শুরু করুন (Start Examination)' : 'Start Examination'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
