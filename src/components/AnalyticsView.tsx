import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart2,
  TrendingUp,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Play,
  Calendar,
  Target,
  AlertCircle,
  AlertTriangle,
  X,
} from 'lucide-react';
import { loadExamHistory, clearExamHistory, ExamHistoryItem } from '../utils/examHistory';
import { EXAM_SESSIONS, ExamSession } from '../data/questionBank';

interface AnalyticsViewProps {
  setCurrentView: (view: 'home' | 'questionBank' | 'exam' | 'analytics') => void;
  onSelectExam?: (session: ExamSession, mode: 'exam' | 'qb') => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  setCurrentView,
  onSelectExam,
}) => {
  const [history, setHistory] = useState<ExamHistoryItem[]>([]);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState<boolean>(false);

  useEffect(() => {
    setHistory(loadExamHistory());
  }, []);

  const handleConfirmClear = () => {
    clearExamHistory();
    setHistory([]);
    setIsConfirmDeleteOpen(false);
  };

  const stats = useMemo(() => {
    if (history.length === 0) return null;
    const totalExams = history.length;
    const totalCorrect = history.reduce((sum, item) => sum + item.correctCount, 0);
    const totalWrong = history.reduce((sum, item) => sum + item.incorrectCount, 0);
    const avgPercentage =
      history.reduce(
        (sum, item) => sum + (item.totalMarks > 0 ? (item.score / item.totalMarks) * 100 : 0),
        0
      ) / totalExams;
    const overallAccuracy =
      totalCorrect + totalWrong > 0 ? (totalCorrect / (totalCorrect + totalWrong)) * 100 : 0;

    return {
      totalExams,
      totalCorrect,
      totalWrong,
      avgPercentage: Number(avgPercentage.toFixed(1)),
      overallAccuracy: Number(overallAccuracy.toFixed(1)),
    };
  }, [history]);

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('bn-BD', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0B1120] p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-indigo-600 dark:text-sky-400" />
            <span>আপনার এক্সাম পারফরম্যান্স ও অ্যানালিটিক্স</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            আপনার ব্রাউজারে (localStorage) সংরক্ষিত সকল রিয়েল টাইম এক্সামের ফলাফল ও অগ্রগতি।
          </p>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={() => setIsConfirmDeleteOpen(true)}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-950/70 border border-rose-200 dark:border-rose-800/50 transition-colors self-start sm:self-auto cursor-pointer whitespace-nowrap shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete History</span>
          </button>
        )}
      </div>

      {/* Delete History Confirmation Modal */}
      {isConfirmDeleteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setIsConfirmDeleteOpen(false)}
        >
          <div
            className="bg-white dark:bg-[#0D1528] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-rose-900/50 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                    Delete Exam History?
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    This action cannot be undone
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsConfirmDeleteOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to delete all exam history? All{' '}
              <strong className="text-slate-900 dark:text-white">{history.length}</strong> saved exam
              attempts and performance statistics will be permanently removed from your browser.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsConfirmDeleteOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                No, Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmClear}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-600/20 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {history.length === 0 ? (
        <div className="bg-white dark:bg-[#0B1120] rounded-2xl p-10 text-center border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-14 h-14 bg-indigo-500/15 border border-indigo-500/30 rounded-2xl flex items-center justify-center mx-auto text-indigo-600 dark:text-sky-400">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div className="space-y-1.5 max-w-md mx-auto">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              এখনও কোনো পরীক্ষা দেওয়া হয়নি
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              আপনি কোনো Strict Exam সম্পন্ন করলে আপনার প্রাপ্ত নম্বর, সঠিক/ভুল উত্তর এবং সময় স্বয়ংক্রিয়ভাবে এখানে সংরক্ষিত হবে।
            </p>
          </div>
          <button
            onClick={() => setCurrentView('home')}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all"
          >
            <Play className="w-3.5 h-3.5" />
            <span>প্রশ্ন ব্যাংক ও এক্সাম সেশন দেখুন</span>
          </button>
        </div>
      ) : (
        <>
          {/* Summary KPI Cards */}
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="bg-white dark:bg-[#0B1120] p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span>মোট পরীক্ষা</span>
                  <Award className="w-4 h-4 text-indigo-600 dark:text-sky-400" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {stats.totalExams}
                </div>
              </div>

              <div className="bg-white dark:bg-[#0B1120] p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span>গড় স্কোর হার</span>
                  <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                  {stats.avgPercentage}%
                </div>
              </div>

              <div className="bg-white dark:bg-[#0B1120] p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span>সঠিকতার হার (Accuracy)</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {stats.overallAccuracy}%
                </div>
              </div>

              <div className="bg-white dark:bg-[#0B1120] p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span>সঠিক / ভুল</span>
                  <AlertCircle className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                </div>
                <div className="text-xl font-black text-slate-900 dark:text-white">
                  <span className="text-emerald-600 dark:text-emerald-400">{stats.totalCorrect}</span>
                  <span className="text-slate-400 dark:text-slate-600 mx-1">/</span>
                  <span className="text-rose-600 dark:text-rose-400">{stats.totalWrong}</span>
                </div>
              </div>
            </div>
          )}

          {/* Exam History List */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              সাম্প্রতিক পরীক্ষার ফলাফল ({history.length})
            </h2>

            {history.map((item) => {
              const matchedSession = EXAM_SESSIONS.find((s) => s.id === item.sessionId);
              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-[#0B1120] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-indigo-600 text-white">
                        {item.university} {item.session}
                      </span>
                      <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                        {item.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-indigo-600 dark:text-sky-400" />
                        {formatDate(item.timestamp)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-500 dark:text-amber-400" />
                        সময়: {formatDuration(item.timeTakenSeconds)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-xs">
                      <span className="text-slate-600 dark:text-slate-400 mr-1.5">স্কোর:</span>
                      <span className="font-black text-slate-900 dark:text-white">
                        {item.score} / {item.totalMarks}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> {item.correctCount}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> {item.incorrectCount}
                      </span>
                    </div>

                    {matchedSession && onSelectExam && (
                      <button
                        onClick={() => onSelectExam(matchedSession, 'exam')}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#131D36] hover:bg-indigo-600 hover:text-white text-indigo-700 dark:text-sky-300 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-colors"
                      >
                        পুনরায় দিন
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
