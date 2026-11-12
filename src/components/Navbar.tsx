import React, { useState, useRef, useEffect } from 'react';
import {
  BarChart2,
  Sparkles,
  BookOpen,
  Menu,
  X,
  Settings,
  Sun,
  Moon,
  Type,
  RotateCcw,
  Minus,
  Plus,
  ChevronDown,
} from 'lucide-react';
import { SettingsDropdown } from './SettingsDropdown';
import {
  UiSettings,
  FontStyleOption,
  DEFAULT_UI_SETTINGS,
  MIN_FONT_PX,
  MAX_FONT_PX,
  clampFontPx,
} from '../utils/uiSettings';
import { resolveAssetUrl } from './MathMarkdownRenderer';

interface NavbarProps {
  currentView: 'home' | 'questionBank' | 'exam' | 'analytics';
  setCurrentView: (view: 'home' | 'questionBank' | 'exam' | 'analytics') => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  selectedExamTitle?: string;
  onOpenApiKeyModal: () => void;
  hasCustomKey: boolean;
  uiSettings: UiSettings;
  onUpdateSettings: (next: UiSettings) => void;
}

const FONT_STYLES: Array<{ id: FontStyleOption; label: string; sampleClass: string }> = [
  { id: 'sans', label: 'Sans (Default)', sampleClass: 'font-sans' },
  { id: 'serif', label: 'Serif (Book)', sampleClass: 'font-serif' },
  { id: 'mono', label: 'Mono (Code)', sampleClass: 'font-mono' },
  { id: 'bryndan', label: 'Bryndan Write ✍️', sampleClass: 'font-bryndan text-sm' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  darkMode,
  setDarkMode,
  onOpenApiKeyModal,
  hasCustomKey,
  uiSettings,
  onUpdateSettings,
}) => {
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobileSettingsExpanded, setMobileSettingsExpanded] = useState(true);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const logoSrc = resolveAssetUrl('/assets/aistudio/image_d4f71793.png');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileDropdownOpen(false);
      }
    };
    if (mobileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileDropdownOpen]);

  const adjustQuestionPx = (delta: number) => {
    const nextPx = clampFontPx(uiSettings.questionFontPx + delta, DEFAULT_UI_SETTINGS.questionFontPx);
    onUpdateSettings({ ...uiSettings, questionFontPx: nextPx });
  };

  const adjustOptionPx = (delta: number) => {
    const nextPx = clampFontPx(uiSettings.optionFontPx + delta, DEFAULT_UI_SETTINGS.optionFontPx);
    onUpdateSettings({ ...uiSettings, optionFontPx: nextPx });
  };

  const adjustExplanationPx = (delta: number) => {
    const nextPx = clampFontPx(uiSettings.explanationFontPx + delta, DEFAULT_UI_SETTINGS.explanationFontPx);
    onUpdateSettings({ ...uiSettings, explanationFontPx: nextPx });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#070B14]/95 backdrop-blur-md border-b border-slate-200 dark:border-indigo-950/80 transition-colors shadow-xs">
      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Logo with Uploaded University Crest Image */}
        <div
          onClick={() => {
            setCurrentView('home');
            setMobileDropdownOpen(false);
          }}
          className="flex items-center gap-2.5 cursor-pointer shrink-0 z-10"
        >
          <img
            src={logoSrc}
            alt="Varsity QB Logo"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover border border-indigo-300 dark:border-indigo-500/40 shadow-md"
          />
          <div>
            <span className="text-sm sm:text-lg font-extrabold tracking-tight text-slate-950 dark:text-white block leading-none">
              Varsity QB
            </span>
            <span className="text-[10px] sm:text-[11px] text-indigo-600 dark:text-sky-400 font-semibold">
              DU • RU • JU • CU • GST
            </span>
          </div>
        </div>

        {/* Center (Big Screen): Question Bank & Analytics Centered in Middle of Top Bar */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-2 bg-slate-100/90 dark:bg-[#0E1628] p-1 rounded-2xl border border-slate-200 dark:border-slate-800 absolute left-1/2 -translate-x-1/2"
        >
          <button
            type="button"
            onClick={() => setCurrentView('home')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              currentView === 'home' || currentView === 'questionBank'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-[#16223B]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Question Bank</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentView('analytics')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              currentView === 'analytics'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-[#16223B]'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Analytics</span>
          </button>
        </nav>

        {/* Right (Big Screen): Settings Dropdown */}
        <div className="hidden md:flex items-center shrink-0 z-10">
          <SettingsDropdown
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            uiSettings={uiSettings}
            onUpdateSettings={onUpdateSettings}
            onOpenApiKeyModal={onOpenApiKeyModal}
            hasCustomKey={hasCustomKey}
          />
        </div>

        {/* Mobile Unified Dropdown Menu (Question Bank, Analytics, AI Key, Settings) */}
        <div className="relative md:hidden z-10" ref={mobileMenuRef}>
          <button
            type="button"
            onClick={() => setMobileDropdownOpen((prev) => !prev)}
            aria-expanded={mobileDropdownOpen}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-[#0F172A] hover:bg-slate-200 dark:hover:bg-[#1E293B] border border-slate-300 dark:border-indigo-900/60 text-xs font-bold text-slate-900 dark:text-slate-100 transition-all shadow-xs"
          >
            {mobileDropdownOpen ? (
              <X className="w-4 h-4 text-indigo-600 dark:text-sky-400" />
            ) : (
              <Menu className="w-4 h-4 text-indigo-600 dark:text-sky-400" />
            )}
            <span>Menu</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                mobileDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {mobileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-1.5rem)] max-h-[84dvh] overflow-y-auto no-scrollbar rounded-2xl bg-white dark:bg-[#0B1325] border-2 border-indigo-200 dark:border-indigo-800 shadow-2xl p-3.5 z-50 space-y-3 text-xs text-slate-900 dark:text-slate-100">
              {/* Navigation Options: Question Bank & Analytics */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentView('home');
                    setMobileDropdownOpen(false);
                  }}
                  className={`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 border transition-all ${
                    currentView === 'home' || currentView === 'questionBank'
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                      : 'bg-slate-100 dark:bg-[#070C18] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Question Bank</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentView('analytics');
                    setMobileDropdownOpen(false);
                  }}
                  className={`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 border transition-all ${
                    currentView === 'analytics'
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                      : 'bg-slate-100 dark:bg-[#070C18] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Analytics</span>
                </button>
              </div>

              {/* AI Key Option */}
              <button
                type="button"
                onClick={() => {
                  setMobileDropdownOpen(false);
                  onOpenApiKeyModal();
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-indigo-50/90 dark:bg-[#070C18] hover:bg-indigo-100 dark:hover:bg-[#111A2E] border border-indigo-200 dark:border-indigo-900/70 text-xs font-bold text-indigo-700 dark:text-sky-300 transition-all"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-sky-400" />
                  <span>AI Key</span>
                </span>
                <span className="flex items-center gap-1.5 text-[11px]">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      hasCustomKey ? 'bg-emerald-500 ring-2 ring-emerald-500/30' : 'bg-amber-400'
                    }`}
                  />
                  <span>{hasCustomKey ? 'Custom Key' : 'Configure'}</span>
                </span>
              </button>

              {/* Settings Section Header */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setMobileSettingsExpanded((prev) => !prev)}
                    className="font-bold text-slate-950 dark:text-white flex items-center gap-1.5 text-xs"
                  >
                    <Settings className="w-3.5 h-3.5 text-indigo-600 dark:text-sky-400" />
                    <span>Settings</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateSettings(DEFAULT_UI_SETTINGS)}
                    className="text-[11px] font-semibold text-indigo-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>

                {mobileSettingsExpanded && (
                  <div className="space-y-3">
                    {/* 1. Theme Color */}
                    <div className="space-y-1">
                      <span className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        1. Theme Color
                      </span>
                      <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-[#070C18] p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                        <button
                          type="button"
                          onClick={() => setDarkMode(false)}
                          className={`py-2 px-2.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
                            darkMode
                              ? 'text-slate-600 dark:text-slate-400'
                              : 'bg-amber-500 text-white shadow-sm'
                          }`}
                        >
                          <Sun className="w-3.5 h-3.5" /> White / Light
                        </button>
                        <button
                          type="button"
                          onClick={() => setDarkMode(true)}
                          className={`py-2 px-2.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
                            darkMode
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <Moon className="w-3.5 h-3.5" /> Dark
                        </button>
                      </div>
                    </div>

                    {/* 2. Question Font Size */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                          <Type className="w-3.5 h-3.5 text-indigo-600 dark:text-sky-400" />
                          2. Question Font Size
                        </span>
                        <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-sky-400">
                          {uiSettings.questionFontPx}px
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 bg-slate-100 dark:bg-[#070C18] p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                        <button
                          type="button"
                          disabled={uiSettings.questionFontPx <= MIN_FONT_PX}
                          onClick={() => adjustQuestionPx(-1)}
                          className="w-9 h-8 rounded-lg bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold disabled:opacity-40"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono font-extrabold text-sm text-slate-950 dark:text-white tabular-nums">
                          {uiSettings.questionFontPx}px
                        </span>
                        <button
                          type="button"
                          disabled={uiSettings.questionFontPx >= MAX_FONT_PX}
                          onClick={() => adjustQuestionPx(1)}
                          className="w-9 h-8 rounded-lg bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold disabled:opacity-40"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* 3. Option Box Font Size */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                          <Type className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                          3. Option Box Font Size
                        </span>
                        <span className="text-[11px] font-mono font-bold text-purple-600 dark:text-purple-400">
                          {uiSettings.optionFontPx}px
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 bg-slate-100 dark:bg-[#070C18] p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                        <button
                          type="button"
                          disabled={uiSettings.optionFontPx <= MIN_FONT_PX}
                          onClick={() => adjustOptionPx(-1)}
                          className="w-9 h-8 rounded-lg bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold disabled:opacity-40"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono font-extrabold text-sm text-slate-950 dark:text-white tabular-nums">
                          {uiSettings.optionFontPx}px
                        </span>
                        <button
                          type="button"
                          disabled={uiSettings.optionFontPx >= MAX_FONT_PX}
                          onClick={() => adjustOptionPx(1)}
                          className="w-9 h-8 rounded-lg bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold disabled:opacity-40"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* 4. Explanation Font Size */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                          <Type className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          4. Explanation Font Size
                        </span>
                        <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {uiSettings.explanationFontPx}px
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 bg-slate-100 dark:bg-[#070C18] p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                        <button
                          type="button"
                          disabled={uiSettings.explanationFontPx <= MIN_FONT_PX}
                          onClick={() => adjustExplanationPx(-1)}
                          className="w-9 h-8 rounded-lg bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold disabled:opacity-40"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono font-extrabold text-sm text-slate-950 dark:text-white tabular-nums">
                          {uiSettings.explanationFontPx}px
                        </span>
                        <button
                          type="button"
                          disabled={uiSettings.explanationFontPx >= MAX_FONT_PX}
                          onClick={() => adjustExplanationPx(1)}
                          className="w-9 h-8 rounded-lg bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold disabled:opacity-40"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* 5. Font Style */}
                    <div className="space-y-1">
                      <span className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        5. Font Style
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 bg-slate-100 dark:bg-[#070C18] p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                        {FONT_STYLES.map((item) => {
                          const active = uiSettings.fontStyle === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => onUpdateSettings({ ...uiSettings, fontStyle: item.id })}
                              className={`py-2 px-2.5 rounded-lg font-bold text-xs transition-all ${item.sampleClass} ${
                                active
                                  ? 'bg-cyan-600 text-white shadow-xs'
                                  : 'text-slate-700 dark:text-slate-300 bg-white/60 dark:bg-slate-900/50'
                              }`}
                            >
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
