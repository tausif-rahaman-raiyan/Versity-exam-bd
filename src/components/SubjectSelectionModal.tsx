import React, { useMemo, useState, useEffect } from "react";
import { ExamSession, sessionSupportsLanguageToggle } from "../data/questionBank";
import { ExamLanguage } from "../utils/examTranslator";

type Subject = {
  id: string;
  name: string;
  nameBn: string;
  icon: string;
};

const MANDATORY_SUBJECTS: Subject[] = [
  { id: "Physics", name: "Physics", nameBn: "পদার্থবিজ্ঞান", icon: "⚛️" },
  { id: "Chemistry", name: "Chemistry", nameBn: "রসায়ন", icon: "🧪" },
];

const OPTIONAL_SUBJECTS: Subject[] = [
  { id: "Biology", name: "Biology", nameBn: "জীববিজ্ঞান", icon: "🧬" },
  { id: "Mathematics", name: "Mathematics", nameBn: "গণিত", icon: "📐" },
  { id: "English", name: "English", nameBn: "ইংরেজি", icon: "📖" },
  { id: "Bangla", name: "Bangla", nameBn: "বাংলা", icon: "✍️" },
];

export type SubjectSelectionModalProps = {
  isOpen: boolean;
  session?: ExamSession | null;
  initialSubjects?: string[];
  initialLanguage?: ExamLanguage;
  onClose: () => void;
  onStart?: (subjects: string[], language: "bn" | "en") => void;
  onConfirmStartExam?: (
    session: ExamSession,
    selectedSubjects: string[],
    language: ExamLanguage
  ) => void;
};

export function SubjectSelectionModal({
  isOpen,
  session,
  initialSubjects,
  initialLanguage = "bn",
  onClose,
  onStart,
  onConfirmStartExam,
}: SubjectSelectionModalProps) {
  const supportsLanguageToggle = sessionSupportsLanguageToggle(session?.id);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [language, setLanguage] = useState<"bn" | "en">(
    supportsLanguageToggle ? initialLanguage : "bn"
  );

  const isDuWritten =
    session?.university === "DU" && session?.questionType === "Written";

  useEffect(() => {
    if (isOpen) {
      // Ensure none of the optional subjects are pre-selected by default (0/2 selected)
      setSelectedSubjects([]);
      setLanguage(supportsLanguageToggle ? initialLanguage : "bn");
    }
  }, [isOpen, session?.id, initialLanguage, supportsLanguageToggle]);

  const mandatorySubjectIds = ["Physics", "Chemistry"];

  const totalSelected = mandatorySubjectIds.length + selectedSubjects.length;
  const canStart = selectedSubjects.length === 2;

  const summaryQuestionsCount = useMemo(() => {
    if (!session) return 60;
    if (isDuWritten) {
      // Each of the 4 subjects has ~4 written questions (3 for Bangla/English in recent sessions)
      let count = 8; // Physics (4) + Chemistry (4)
      for (const subId of selectedSubjects) {
        if (
          (subId === "Bangla" || subId === "English") &&
          session.session !== "19-20" &&
          session.session !== "20-21"
        ) {
          count += 3;
        } else {
          count += 4;
        }
      }
      if (selectedSubjects.length < 2) {
        count += (2 - selectedSubjects.length) * 4;
      }
      return count;
    }
    // DU 19-20 source data contains only 10 English MCQs; selecting English
    // therefore yields 55 questions instead of the usual 60.
    if (session.session === "19-20" && selectedSubjects.includes("English")) {
      return 55;
    }
    return 60;
  }, [session, isDuWritten, selectedSubjects]);

  const summaryTotalMarks = useMemo(() => {
    if (!session) return 60;
    if (isDuWritten) {
      return session.totalMarks || 40;
    }
    // The supplied DU 19-20 source has only 10 English questions, so
    // the available exam set is 55 marks when English is selected.
    if (session.session === "19-20" && selectedSubjects.includes("English")) {
      return 55;
    }
    return 60;
  }, [session, isDuWritten, selectedSubjects]);

  const selectedSubjectNames = useMemo(
    () =>
      OPTIONAL_SUBJECTS.filter((subject) =>
        selectedSubjects.includes(subject.id)
      ),
    [selectedSubjects]
  );

  if (!isOpen) return null;

  const toggleSubject = (subjectId: string) => {
    setSelectedSubjects((current) => {
      if (current.includes(subjectId)) {
        return current.filter((id) => id !== subjectId);
      }

      if (current.length >= 2) return current;

      return [...current, subjectId];
    });
  };

  const handleStart = () => {
    if (!canStart) return;

    const finalSubjects = [...mandatorySubjectIds, ...selectedSubjects];
    const finalLang = supportsLanguageToggle ? language : "bn";

    if (onStart) {
      onStart(finalSubjects, finalLang);
    }
    if (onConfirmStartExam && session) {
      onConfirmStartExam(session, finalSubjects, finalLang);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 dark:bg-black/75 p-3 backdrop-blur-sm sm:p-5">
      <div className="relative flex max-h-[92dvh] w-full max-w-[560px] flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] text-slate-900 dark:text-white shadow-2xl transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
              {session ? `${session.title} Exam` : "DU 25–26 MCQ Exam"}
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-gray-400">
              বিষয় নির্বাচন করুন · ৪টি বিষয় প্রয়োজন {isDuWritten ? "(লিখিত পরীক্ষা)" : "(MCQ পরীক্ষা)"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
          {/* Language Selection: Only visible for sessions with bilingual toggle support */}
          {supportsLanguageToggle && (
            <section>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-gray-200">
                  Exam Language
                </h3>
                <span className="text-xs text-slate-500 dark:text-gray-500">
                  পরীক্ষার ভাষা
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 rounded-xl border border-slate-200 dark:border-transparent bg-slate-100 dark:bg-[#0b1220] p-1">
                <button
                  type="button"
                  onClick={() => setLanguage("bn")}
                  className={`rounded-lg py-2.5 text-sm font-semibold transition cursor-pointer ${
                    language === "bn"
                      ? "bg-violet-600 text-white shadow"
                      : "text-slate-600 hover:bg-white hover:text-slate-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
                  }`}
                >
                  বাংলা
                </button>

                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`rounded-lg py-2.5 text-sm font-semibold transition cursor-pointer ${
                    language === "en"
                      ? "bg-violet-600 text-white shadow"
                      : "text-slate-600 hover:bg-white hover:text-slate-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
                  }`}
                >
                  English
                </button>
              </div>
            </section>
          )}

          {/* Mandatory Subjects */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-gray-200">
                বাধ্যতামূলক বিষয়
              </h3>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                ২টি নির্বাচিত
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {MANDATORY_SUBJECTS.map((subject) => (
                <div
                  key={subject.id}
                  className="flex items-center gap-3 rounded-xl border border-emerald-300 bg-emerald-50/80 dark:border-emerald-500/30 dark:bg-emerald-500/10 p-3"
                >
                  <span className="text-2xl">{subject.icon}</span>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {subject.name}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-gray-400">
                      {subject.nameBn}
                    </p>
                  </div>

                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    ✓
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Optional Subjects */}
          <section>
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-gray-200">
                  অতিরিক্ত ২টি বিষয় নির্বাচন করুন
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-gray-500">
                  নিচের ৪টি বিষয় থেকে যেকোনো ২টি
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/15 px-3 py-1.5 text-xs font-semibold dark:text-violet-300">
                {selectedSubjects.length}/2
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {OPTIONAL_SUBJECTS.map((subject) => {
                const isSelected = selectedSubjects.includes(subject.id);
                const isDisabled =
                  !isSelected && selectedSubjects.length === 2;

                return (
                  <button
                    key={subject.id}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => toggleSubject(subject.id)}
                    className={`relative flex min-h-[76px] items-center gap-3 rounded-xl border p-3 text-left transition ${
                      isSelected
                        ? "border-violet-500 bg-violet-50/90 dark:bg-violet-500/15 ring-1 ring-violet-500/30"
                        : isDisabled
                          ? "cursor-not-allowed border-slate-200 bg-slate-100/70 opacity-45 dark:border-white/5 dark:bg-white/[0.02] dark:opacity-40"
                          : "border-slate-200 bg-slate-50/70 hover:border-violet-400 hover:bg-violet-50/40 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-violet-400/50 dark:hover:bg-white/[0.06]"
                    }`}
                  >
                    <span className="text-2xl">{subject.icon}</span>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {subject.name}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500 dark:text-gray-400">
                        {subject.nameBn}
                      </p>
                    </div>

                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs ${
                        isSelected
                          ? "border-violet-500 bg-violet-600 text-white"
                          : "border-slate-300 dark:border-gray-600 text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Exam Summary */}
          <section className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0b1220] p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-gray-200">
                Exam Summary
              </h3>
              <span
                className={`text-xs font-semibold ${
                  canStart
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-amber-600 dark:text-amber-400"
                }`}
              >
                {totalSelected}/4 Subjects
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg border border-slate-200/80 dark:border-transparent bg-white dark:bg-white/[0.04] p-3">
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {summaryQuestionsCount}
                </p>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-gray-400">
                  Questions
                </p>
              </div>

              <div className="rounded-lg border border-slate-200/80 dark:border-transparent bg-white dark:bg-white/[0.04] p-3">
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {summaryTotalMarks}
                </p>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-gray-400">
                  Total Marks
                </p>
              </div>

              <div className="rounded-lg border border-slate-200/80 dark:border-transparent bg-white dark:bg-white/[0.04] p-3">
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {totalSelected}/4
                </p>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-gray-400">
                  Subjects
                </p>
              </div>
            </div>

            <div className="mt-3 border-t border-slate-200 dark:border-white/10 pt-3">
              <p className="mb-2 text-xs text-slate-500 dark:text-gray-500">
                Selected Subjects
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 px-2.5 py-1 text-xs font-medium dark:text-emerald-300">
                  Physics
                </span>
                <span className="rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 px-2.5 py-1 text-xs font-medium dark:text-emerald-300">
                  Chemistry
                </span>

                {selectedSubjectNames.map((subject) => (
                  <span
                    key={subject.id}
                    className="rounded-full bg-violet-100 text-violet-800 dark:bg-violet-500/15 px-2.5 py-1 text-xs font-medium dark:text-violet-300"
                  >
                    {subject.name}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-2 border-t border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-[#111827] px-5 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-transparent dark:text-gray-300 dark:hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!canStart}
            onClick={handleStart}
            className={`rounded-xl px-6 py-3 text-sm font-bold transition ${
              canStart
                ? "bg-violet-600 text-white shadow-lg shadow-violet-900/20 hover:bg-violet-500"
                : "cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-gray-700 dark:text-gray-400"
            }`}
          >
            {canStart
              ? "Start Examination →"
              : `Select ${2 - selectedSubjects.length} More Subject${
                  2 - selectedSubjects.length === 1 ? "" : "s"
                }`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubjectSelectionModal;
