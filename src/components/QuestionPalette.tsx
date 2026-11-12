import React, { useState } from 'react';
import { Flag, CheckCircle2, Circle, HelpCircle } from 'lucide-react';
import { Question } from '../data/questionBank';

interface QuestionPaletteProps {
  questions: Question[];
  currentIndex: number;
  selectedAnswers: Record<string, number>;
  flaggedQuestions: Set<string>;
  isSubmitted: boolean;
  onSelectQuestion: (index: number, questionId: string) => void;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  questions,
  currentIndex,
  selectedAnswers,
  flaggedQuestions,
  isSubmitted,
  onSelectQuestion
}) => {
  const [paletteFilter, setPaletteFilter] = useState<'ALL' | 'UNANSWERED' | 'FLAGGED'>('ALL');

  const answeredCount = questions.filter((q) => selectedAnswers[q.id] !== undefined).length;
  const unansweredCount = questions.length - answeredCount;
  const flaggedCount = questions.filter((q) => flaggedQuestions.has(q.id)).length;

  return (
    <div className="space-y-4">
      {/* Progress Overview Counters */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-500/10 border border-indigo-200/70 dark:border-indigo-500/20 text-center">
          <div className="text-base sm:text-lg font-extrabold text-indigo-700 dark:text-indigo-300 tabular-nums">
            {answeredCount}
          </div>
          <div className="text-[11px] font-medium text-indigo-600/80 dark:text-indigo-300/80">
            Answered
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-[#080D1A] border border-slate-200/80 dark:border-[#1E293B] text-center">
          <div className="text-base sm:text-lg font-extrabold text-slate-700 dark:text-slate-200 tabular-nums">
            {unansweredCount}
          </div>
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            Unanswered
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-500/10 border border-amber-200/80 dark:border-amber-500/20 text-center">
          <div className="text-base sm:text-lg font-extrabold text-amber-700 dark:text-amber-300 tabular-nums">
            {flaggedCount}
          </div>
          <div className="text-[11px] font-medium text-amber-600/90 dark:text-amber-300/80">
            Flagged
          </div>
        </div>
      </div>

      {/* Palette Filter Pills */}
      <div className="flex items-center justify-between gap-1 bg-slate-100 dark:bg-[#080D1A] p-1 rounded-lg border border-slate-200/80 dark:border-[#1E293B]">
        {(
          [
            { id: 'ALL', label: `All (${questions.length})` },
            { id: 'UNANSWERED', label: `Left (${unansweredCount})` },
            { id: 'FLAGGED', label: `Flagged (${flaggedCount})` }
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setPaletteFilter(tab.id)}
            className={`flex-1 py-1 px-2 rounded-md text-[11px] font-semibold transition-colors cursor-pointer tabular-nums ${
              paletteFilter === tab.id
                ? 'bg-white dark:bg-[#0E1628] text-indigo-600 dark:text-indigo-400 shadow-2xs border border-slate-200/60 dark:border-slate-700/80'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Numbered Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-2 max-h-64 sm:max-h-72 overflow-y-auto pr-1">
        {questions.map((q, idx) => {
          const isCurrent = idx === currentIndex;
          const isAnswered = selectedAnswers[q.id] !== undefined;
          const isFlagged = flaggedQuestions.has(q.id);
          const isWritten = q.questionType === 'Written' || q.options.length === 0;
          const isUnverified = !isWritten && (q.answerVerified === false || q.correctAnswer < 0);

          if (paletteFilter === 'UNANSWERED' && isAnswered) return null;
          if (paletteFilter === 'FLAGGED' && !isFlagged) return null;

          let btnClasses =
            'bg-slate-100 dark:bg-[#080D1A] text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-[#1E293B] hover:border-indigo-400 dark:hover:border-indigo-500';

          if (isSubmitted) {
            if (isWritten || isUnverified) {
              btnClasses =
                'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-400/50';
            } else if (!isAnswered) {
              btnClasses =
                'bg-slate-100 dark:bg-[#080D1A] text-slate-400 dark:text-slate-500 border-slate-200 dark:border-[#1E293B]';
            } else if (selectedAnswers[q.id] === q.correctAnswer) {
              btnClasses = 'bg-emerald-600 text-white border-emerald-600';
            } else {
              btnClasses = 'bg-rose-600 text-white border-rose-600';
            }
          } else {
            if (isAnswered && isFlagged) {
              btnClasses =
                'bg-indigo-600 text-white border-amber-400 ring-2 ring-amber-400/70';
            } else if (isAnswered) {
              btnClasses = 'bg-indigo-600 text-white border-indigo-600';
            } else if (isFlagged) {
              btnClasses =
                'bg-amber-50 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-400 dark:border-amber-500/50';
            }
          }

          if (isCurrent) {
            btnClasses +=
              ' ring-2 ring-offset-2 ring-indigo-500 dark:ring-sky-400 dark:ring-offset-[#0B1222]';
          }

          const formattedNum = String(idx + 1).padStart(2, '0');

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onSelectQuestion(idx, q.id)}
              aria-label={`Question ${idx + 1}${isAnswered ? ', Answered' : ', Unanswered'}${
                isFlagged ? ', Flagged for review' : ''
              }`}
              aria-current={isCurrent ? 'step' : undefined}
              className={`relative h-9 rounded-lg border text-xs font-bold tabular-nums flex items-center justify-center transition-all cursor-pointer ${btnClasses}`}
            >
              <span>{formattedNum}</span>
              {isFlagged && (
                <span
                  className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border border-white dark:border-[#0B1222] ${
                    isAnswered ? 'bg-amber-400' : 'bg-amber-500'
                  }`}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Empty Filter State */}
      {((paletteFilter === 'UNANSWERED' && unansweredCount === 0) ||
        (paletteFilter === 'FLAGGED' && flaggedCount === 0)) && (
        <div className="py-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#080D1A] rounded-xl border border-slate-200/70 dark:border-[#1E293B]">
          {paletteFilter === 'UNANSWERED'
            ? 'All questions have been answered!'
            : 'No questions are currently flagged for review.'}
        </div>
      )}

      {/* Visual State Legend */}
      <div className="pt-3 border-t border-slate-200/80 dark:border-[#1E293B] grid grid-cols-2 gap-y-2 gap-x-3 text-[11px] text-slate-600 dark:text-slate-400">
        {!isSubmitted ? (
          <>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-indigo-600 inline-block shrink-0" />
              <span>Answered (Locked)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-slate-100 dark:bg-[#080D1A] border border-slate-300 dark:border-slate-700 inline-block shrink-0" />
              <span>Unanswered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-amber-100 dark:bg-amber-500/20 border border-amber-400 inline-block shrink-0" />
              <span>Flagged Review</span>
            </div>
            <div className="flex items-center gap-2">
              <span className=" relative w-3.5 h-3.5 rounded bg-indigo-600 ring-1 ring-amber-400 inline-block shrink-0">
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
              </span>
              <span>Answered + Flagged</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-emerald-600 inline-block shrink-0" />
              <span>Correct</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-rose-600 inline-block shrink-0" />
              <span>Incorrect</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-slate-200 dark:bg-slate-800 inline-block shrink-0" />
              <span>Unattempted</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-amber-500/30 border border-amber-400 inline-block shrink-0" />
              <span>Written / Unverified</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
