import { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { StrictExamView } from './components/StrictExamView';
import { QuestionBankView } from './components/QuestionBankView';
import { AnalyticsView } from './components/AnalyticsView';
import { SubjectSelectionModal } from './components/SubjectSelectionModal';
import { EXAM_SESSIONS, ExamSession } from './data/questionBank';
import {
  UiSettings,
  loadUiSettings,
  saveUiSettings,
  getFontStyleClass,
  loadThemeMode,
  saveThemeMode,
} from './utils/uiSettings';
import { ExamLanguage } from './utils/examTranslator';
import { resolveAssetUrl } from './components/MathMarkdownRenderer';
import { Key, X, Check, ExternalLink } from 'lucide-react';

const API_KEY_STORAGE = 'varsity_qb_gemini_api_key';
const DU_SUBJECTS_STORAGE = 'varsity_qb_du_selected_subjects_v1';
const EXAM_LANG_STORAGE = 'varsity_qb_exam_language_v1';

export function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => loadThemeMode());
  const [currentView, setCurrentView] = useState<'home' | 'questionBank' | 'exam' | 'analytics'>('home');
  const [selectedSession, setSelectedSession] = useState<ExamSession>(EXAM_SESSIONS[0]);
  const [uiSettings, setUiSettings] = useState<UiSettings>(() => loadUiSettings());
  const homeScrollYRef = useRef<number>(0);

  const logoSrc = resolveAssetUrl('/assets/aistudio/image_d4f71793.png');

  // Sync favicon with resolved asset path on mount
  useEffect(() => {
    const iconLinks = document.querySelectorAll<HTMLLinkElement>('link[rel*="icon"]');
    if (iconLinks.length > 0) {
      iconLinks.forEach((link) => {
        link.href = logoSrc;
      });
    } else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.href = logoSrc;
      document.head.appendChild(link);
    }
  }, [logoSrc]);

  // DU 4-of-6 Subject Selection & Language Modal state
  const [pendingExamSession, setPendingExamSession] = useState<ExamSession | null>(null);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState<boolean>(false);
  const [selectedExamSubjects, setSelectedExamSubjects] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(DU_SUBJECTS_STORAGE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 4) return parsed;
      }
    } catch {
      // ignore
    }
    return ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
  });
  const [examLanguage, setExamLanguage] = useState<ExamLanguage>(() => {
    try {
      const saved = localStorage.getItem(EXAM_LANG_STORAGE);
      if (saved === 'en' || saved === 'bn') return saved;
    } catch {
      // ignore
    }
    return 'bn';
  });

  const handleUpdateSettings = (next: UiSettings) => {
    setUiSettings(next);
    saveUiSettings(next);
  };

  // API Key Modal State
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [customApiKey, setCustomApiKey] = useState<string>(() => {
    return localStorage.getItem(API_KEY_STORAGE) || '';
  });
  const [apiKeyInput, setApiKeyInput] = useState<string>(customApiKey);

  useEffect(() => {
    saveThemeMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light-mode');
    }
  }, [darkMode]);

  const navigateToView = (nextView: 'home' | 'questionBank' | 'exam' | 'analytics') => {
    if (currentView === 'home' && nextView !== 'home') {
      homeScrollYRef.current = window.scrollY;
    }
    setCurrentView(nextView);
    if (nextView === 'home') {
      const restoredScrollY = homeScrollYRef.current;
      requestAnimationFrame(() => {
        window.scrollTo({ top: restoredScrollY, behavior: 'instant' });
      });
    } else {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
    }
  };

  const handleSelectExam = (session: ExamSession, mode: 'exam' | 'qb') => {
    if (currentView === 'home') {
      homeScrollYRef.current = window.scrollY;
    }
    setSelectedSession(session);
    if (mode === 'exam') {
      setPendingExamSession(session);
      setIsSubjectModalOpen(true);
      return;
    }
    setCurrentView('questionBank');
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  };

  const handleStartExamFromQB = (sessionId: string) => {
    const found = EXAM_SESSIONS.find((s) => s.id === sessionId);
    if (found) {
      setSelectedSession(found);
      setPendingExamSession(found);
      setIsSubjectModalOpen(true);
    }
  };

  const handleConfirmStartExam = (
    session: ExamSession,
    chosenSubjects: string[],
    language: ExamLanguage
  ) => {
    setSelectedExamSubjects(chosenSubjects);
    setExamLanguage(language);
    try {
      localStorage.setItem(DU_SUBJECTS_STORAGE, JSON.stringify(chosenSubjects));
      localStorage.setItem(EXAM_LANG_STORAGE, language);
    } catch {
      // ignore storage errors
    }
    setIsSubjectModalOpen(false);
    setSelectedSession(session);
    setCurrentView('exam');
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  };

  const handleChangeExamLanguage = (lang: ExamLanguage) => {
    setExamLanguage(lang);
    try {
      localStorage.setItem(EXAM_LANG_STORAGE, lang);
    } catch {
      // ignore
    }
  };

  const handleSaveApiKey = () => {
    const trimmed = apiKeyInput.trim();
    if (trimmed) {
      localStorage.setItem(API_KEY_STORAGE, trimmed);
      setCustomApiKey(trimmed);
      setIsApiKeyModalOpen(false);
    } else {
      handleClearApiKey();
      setIsApiKeyModalOpen(false);
    }
  };

  const handleClearApiKey = () => {
    localStorage.removeItem(API_KEY_STORAGE);
    setCustomApiKey('');
    setApiKeyInput('');
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-white dark:bg-[#060913] text-slate-900 dark:text-slate-100 transition-colors duration-200 ${getFontStyleClass(
        uiSettings.fontStyle
      )}`}
    >
      {/* Hide top global Navbar during active Exam Mode so only the single clean exam header shows */}
      {currentView !== 'exam' && (
        <Navbar
          currentView={currentView}
          setCurrentView={navigateToView}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          selectedExamTitle={selectedSession?.title}
          onOpenApiKeyModal={() => {
            setApiKeyInput(customApiKey);
            setIsApiKeyModalOpen(true);
          }}
          hasCustomKey={Boolean(customApiKey)}
          uiSettings={uiSettings}
          onUpdateSettings={handleUpdateSettings}
        />
      )}

      <main
        className={
          currentView === 'exam'
            ? 'flex-grow w-full pb-8 pt-0'
            : 'flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'
        }
      >
        {currentView === 'home' && (
          <HomeView
            onSelectExam={handleSelectExam}
            setCurrentView={navigateToView}
            onOpenApiKeyModal={() => {
              setApiKeyInput(customApiKey);
              setIsApiKeyModalOpen(true);
            }}
          />
        )}

        {currentView === 'questionBank' && (
          <QuestionBankView
            session={selectedSession}
            onBack={() => navigateToView('home')}
            onStartExam={handleStartExamFromQB}
            customApiKey={customApiKey}
            onOpenApiKeyModal={() => {
              setApiKeyInput(customApiKey);
              setIsApiKeyModalOpen(true);
            }}
            uiSettings={uiSettings}
            examLanguage={examLanguage}
            onChangeExamLanguage={handleChangeExamLanguage}
          />
        )}

        {currentView === 'exam' && (
          <StrictExamView
            examSession={selectedSession}
            onBack={() => navigateToView('home')}
            customApiKey={customApiKey}
            setCustomApiKey={setCustomApiKey}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onOpenApiKeyModal={() => {
              setApiKeyInput(customApiKey);
              setIsApiKeyModalOpen(true);
            }}
            uiSettings={uiSettings}
            onUpdateSettings={handleUpdateSettings}
            selectedExamSubjects={selectedExamSubjects}
            onChangeSubjects={() => {
              setPendingExamSession(selectedSession);
              setIsSubjectModalOpen(true);
            }}
            examLanguage={examLanguage}
            onChangeExamLanguage={handleChangeExamLanguage}
          />
        )}

        {currentView === 'analytics' && (
          <AnalyticsView
            setCurrentView={navigateToView}
            onSelectExam={handleSelectExam}
          />
        )}
      </main>

      {/* Pre-Exam Subject & Language Selection Modal */}
      <SubjectSelectionModal
        isOpen={isSubjectModalOpen}
        session={pendingExamSession}
        initialSubjects={selectedExamSubjects}
        initialLanguage={examLanguage}
        onClose={() => setIsSubjectModalOpen(false)}
        onConfirmStartExam={handleConfirmStartExam}
      />

      {/* Gemini API Key Configuration Modal */}
      {isApiKeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0D1528] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-indigo-900/60">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-indigo-500/15 rounded-xl text-indigo-600 dark:text-sky-400 border border-indigo-500/30">
                  <Key className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Gemini API Key সেটআপ
                </h3>
              </div>
              <button
                onClick={() => setIsApiKeyModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                AI Tutor দিয়ে যেকোনো প্রশ্নের সঠিক উত্তর নির্ণয়, লাইভ শর্টকাট ট্রিকস এবং ব্যাখ্যা পেতে আপনার{' '}
                <strong>Google Gemini API Key</strong> দিন (API Key ছাড়া AI Tutor কাজ করবে না)।
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  Your Gemini API Key
                </label>
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070C18] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-950/40 p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/50 text-xs text-indigo-900 dark:text-indigo-200 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-indigo-700 dark:text-sky-400">
                  <span>কীভাবে ফ্রি API Key পাবেন?</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-300">
                  <li>নিচের লিংকে ক্লিক করে Google AI Studio-তে যান।</li>
                  <li>আপনার Google অ্যাকাউন্ট দিয়ে লগইন করুন।</li>
                  <li>&ldquo;Create API Key&rdquo; বাটনে ক্লিক করে Key কপি করে এখানে পেস্ট করুন।</li>
                </ol>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 font-bold text-indigo-600 dark:text-sky-400 hover:underline pt-1"
                >
                  <span>Get Free Gemini API Key from Google AI Studio</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                {customApiKey && (
                  <button
                    onClick={handleClearApiKey}
                    className="px-3.5 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-xl transition-colors mr-auto"
                  >
                    Remove Key
                  </button>
                )}
                <button
                  onClick={() => setIsApiKeyModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveApiKey}
                  className="flex items-center space-x-1.5 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Save API Key</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-50/90 dark:bg-[#050811] border-t border-slate-200/90 dark:border-slate-800/80 mt-14 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
            {/* Brand & Overview */}
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center space-x-3">
                <img
                  src={logoSrc}
                  alt="Varsity QB Logo"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl object-cover border border-indigo-300 dark:border-indigo-500/40 shadow-sm"
                />
                <div>
                  <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white block">
                    Varsity Question Bank &amp; Exam Portal
                  </span>
                  <span className="text-[11px] font-medium text-indigo-600 dark:text-sky-400">
                    DU · RU · JU · CU · GST Science Admission Platform
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                Complete Science Unit admission preparation portal featuring real past-year question
                banks, strict OMR auto-lock exam simulation, step-by-step LaTeX solutions, and
                instant AI Tutor guidance.
              </p>
            </div>

            {/* Quick Navigation */}
            <div className="md:col-span-3 space-y-2.5">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-200 tracking-wide">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentView('home');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-indigo-600 dark:hover:text-sky-400 transition-colors cursor-pointer font-medium"
                  >
                    Home &amp; All Sessions
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentView('questionBank');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-indigo-600 dark:hover:text-sky-400 transition-colors cursor-pointer font-medium"
                  >
                    Question Bank &amp; Solutions
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentView('analytics');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-indigo-600 dark:hover:text-sky-400 transition-colors cursor-pointer font-medium"
                  >
                    Performance Analytics
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setApiKeyInput(customApiKey);
                      setIsApiKeyModalOpen(true);
                    }}
                    className="hover:text-indigo-600 dark:hover:text-sky-400 transition-colors cursor-pointer font-medium"
                  >
                    Configure AI Tutor Key
                  </button>
                </li>
              </ul>
            </div>

            {/* Developer Credit & Social Links */}
            <div className="md:col-span-4 space-y-3 md:text-right flex flex-col md:items-end justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                  Crafted &amp; Maintained for Admission Aspirants
                </span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Developed by{' '}
                  <span className="text-indigo-600 dark:text-sky-400 font-extrabold">
                    Tausif Rahaman Raiyan
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href="https://www.instagram.com/tausif_rahaman_raiyan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-[#0D1528] hover:bg-pink-50 dark:hover:bg-pink-950/30 border border-slate-200 dark:border-slate-800 hover:border-pink-500/40 text-slate-700 dark:text-slate-200 text-xs font-bold shadow-2xs transition-all"
                  title="Follow Tausif Rahaman Raiyan on Instagram"
                >
                  <svg className="w-3.5 h-3.5 text-pink-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span>Instagram</span>
                </a>

                <a
                  href="https://github.com/tausif-rahaman-raiyan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-[#0D1528] hover:bg-indigo-50 dark:hover:bg-indigo-950/60 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 text-slate-700 dark:text-slate-200 text-xs font-bold shadow-2xs transition-all"
                  title="Visit Tausif Rahaman Raiyan on GitHub"
                >
                  <svg className="w-3.5 h-3.5 text-slate-700 dark:text-slate-200 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Legal & Copyright Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-slate-400">
            <p className="text-center sm:text-left">
              &copy; {new Date().getFullYear()}{' '}
              <span className="font-bold text-slate-700 dark:text-slate-300">
                Varsity Question Bank &amp; Exam Portal
              </span>
              . All rights reserved.
            </p>
            <div className="flex items-center flex-wrap justify-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Science Unit Admission Archive</span>
              <span aria-hidden="true">&middot;</span>
              <span>Privacy-First Local Storage</span>
              <span aria-hidden="true">&middot;</span>
              <span>Educational Fair Use</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
