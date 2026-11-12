# Dhaka University & Varsity Admission Question Bank Applet

A comprehensive, interactive Question Bank and Exam Practice Platform for Dhaka University (DU A-Unit) and major public university admission tests in Bangladesh (RU, JU, CU, GST).

---

## 🌟 Key Features & Implementation Architecture

### 1. Bilingual Support Scope (Bengali / English Toggle)
- **Supported Sessions**:
  - `DU 25-26 MCQ` (`du-25-26`)
  - `DU 24-25 MCQ` (`du-24-25`)
  - `DU 23-24 MCQ` (`du-23-24`)
  - `DU 22-23 MCQ` (`du-22-23`)
- **Strict Logic**: The Bengali (BN) / English (EN) toggle is **only enabled** for these 4 sessions (`sessionSupportsLanguageToggle`). All other sessions (DU 21-22, DU 20-21, DU 19-20, DU Written, RU, JU, CU, GST) strictly hide the language toggle and render in Bengali.
- **Zero API Dependency for Translations**: All bilingual text (`"বাংলা (English)"`) is parsed and extracted locally via `splitBilingualText` in `examTranslator.ts`. External background API calls (`/api/gemini/translate-batch`) have been removed for instant, offline-capable language switching.

---

### 2. Complete Question Datasets & Solutions

#### **DU A-Unit MCQ Sessions (Full 90 Questions / 6 Subjects Each)**
- **DU 25-26 MCQ** (90 questions: Bangla 15, English 15, Physics 15, Chemistry 15, Mathematics 15, Biology 15)
- **DU 24-25 MCQ** (90 questions: Physics 15, Chemistry 15, Mathematics 15, Biology 15, Bangla 15, English 15)
- **DU 23-24 MCQ** (90 questions: Bangla 15, Physics 15, Biology 15, Chemistry 15, English 15, Mathematics 15)
- **DU 22-23 MCQ** (90 questions: Physics 15, Chemistry 15, Mathematics 15, Biology 15, Bangla 15, English 15)
- **DU 21-22 MCQ** (90 questions: Bangla 15, Mathematics 15, Biology 15, Chemistry 15, English 15, Physics 15)
- **DU 20-21 MCQ** (90 questions: Physics 15, Chemistry 15, Mathematics 15, Biology 15, Bangla 15, English 15)
- **DU 19-20 MCQ** (90 questions: Physics 15, Chemistry 15, Mathematics 15, Biology 15, Bangla 15, English 15 — including reading passage)
- **DU 18-19 MCQ** (176 questions across 6 subjects)
- **DU 17-18 MCQ** (171 questions across 5 subjects)
- **DU 16-17 MCQ** (167 questions across 5 subjects)
- **DU 15-16 MCQ** (165 questions across 6 subjects: Biology, English, Bangla, Physics, Chemistry, Higher Mathematics)
- **DU 14-15 MCQ** (164 questions across 6 subjects: Physics, Chemistry, Higher Mathematics, Biology, English, Bangla)
- **DU 13-14 MCQ** (168 questions across 6 subjects: Bangla, English, Physics, Chemistry, Higher Mathematics, Biology)
- **DU 12-13 MCQ** (168 questions across 6 subjects: Physics, English, Biology, Chemistry, Bangla, Higher Mathematics)
- **DU 10-11 MCQ** (173 questions across 6 subjects: Higher Mathematics, Bangla, Physics, Biology, English, Chemistry)

#### **LaTeX Formatting & Visual Styling**:
- **Math & Chemical Reactions**: Formatted with KaTeX LaTeX (`$...$`). Chemical reaction equations (e.g. `TiO_{2(s)} + 2CO_{(g)} \rightarrow Ti_{(s)} + 2CO_{2(g)}`) automatically wrap into LaTeX and feature bold styling, clean subscript states, and explicit reaction arrow spacing (`\rightarrow`, `\rightleftharpoons`).
- **Diagrams & Assets**: SVG & PNG diagrams embedded locally with runtime `SmartImage` error fallback (e.g. `/assets/imported/du_18_19_phy_q23_a.svg`).
- **Explanation Headings**: Styled with **bold, enlarged typography** (`font-black text-base sm:text-lg text-indigo-800 dark:text-sky-300`) for clean readability across Question Bank and Exam modes.
tausif Raiyan
---

### 3. Navigation & Scroll Restoration
- **Home View Scroll Memory**: Entering an exam or Question Bank session records `window.scrollY` in `homeScrollYRef`.
- **Restoration on Back**: Clicking "সকল সেশনে ফিরে যান" (or navigating back to Home) smoothly restores the user's exact scroll position on the main page.

---

## 🛠️ Project Structure

```
├── public/assets/imported/     # Local diagram & image assets
├── src/
│   ├── components/             # React views (HomeView, StrictExamView, QuestionBankView, etc.)
│   ├── data/                   # Raw question sets (du_25_26, du_24_25, du_21_22, du_20_21, du_19_20, etc.)
│   ├── utils/                  # Exam translation, scoring, & UI settings
│   ├── App.tsx                 # Core app state & navigation router
│   └── main.tsx                # Entry point
└── README.md                   # System documentation
```

---

## 🚀 Development & Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Build for production
npm run build
```
