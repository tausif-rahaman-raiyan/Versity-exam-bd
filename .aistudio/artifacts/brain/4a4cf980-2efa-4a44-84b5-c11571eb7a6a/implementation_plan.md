# AI Tutor Admission Coach Upgrade, API Key Guard, Explanation Font Sync & Written Subject Selection Fix

This update links the **Explanation Font Size** setting directly to both **ব্যাখ্যা ও সমাধান** and **AI Tutor Admission Coach**, enforces an **API Key Guard** with an interactive notification toast when **AI Tutor** is clicked without a saved API key, redesigns **AI Tutor Admission Coach** so the AI independently solves and displays the answer at the top with a compact, speedy 3-part MCQ layout (`gemini-3.8-flash` with `ThinkingLevel.LOW`), and fixes **DU Written Exam 4-of-6 Subject Selection** across the modal and exam view.

## User Review & Critical Decisions

> [!IMPORTANT]
> All preferences confirmed during Phase 1 are incorporated into this plan:

- **Confirmed Decision 1 — Missing API Key Notification Toast**: Clicking **AI Tutor** when no API key is saved will **not** open or run AI Tutor with a static fallback. Instead, a prominent notification toast appears at the top/bottom-right informing the user to add their Gemini API key first, complete with an instant **Add API Key** button that opens the API Key setup modal.
- **Confirmed Decision 2 — AI-Determined Answer & Compact 3-Part MCQ Layout**: Removed the default pre-selected answer box from the question bank inside **AI Tutor Admission Coach**. Instead, the AI independently solves the question (and any attached diagrams) using `gemini-3.8-flash` (`ThinkingLevel.LOW` for ultra-fast streaming) and immediately outputs the **AI-Found Answer** at the top, followed by 3 compact, high-yield sections: **১. 🎯 মূল সূত্র ও যুক্তি**, **২. 📐 সংক্ষিপ্ত গাণিতিক সমাধান**, and **৩. ⚡ ১০-সেকেন্ড শর্টকাট ও ট্রিকস**.
- **Confirmed Decision 3 — Unified Explanation Font Size (`Explanation Font Size = AI Tutor + ব্যাখ্যা ও সমাধান`)**: Adjusting the **Explanation Font Size** slider in Settings dynamically scales the typography of both the **ব্যাখ্যা ও সমাধান** block and the **AI Tutor Admission Coach** explanation cards and follow-up chat answers.
- **Confirmed Decision 4 — DU Written Exam 4-of-6 Subject Selection & Modal Summary**: Enabled 4-of-6 subject filtering (`Physics`, `Chemistry` + 2 optional subjects) for all DU Written exam sessions (`du-25-26-written` through `du-19-20-written`) and updated the pre-exam modal summary to display accurate question counts and marks for Written exams.

---

## 1. Overview & Core Concept

- **What It Does**:
  1. **Unified Explanation Font Scaling**: Connects `uiSettings.explanationFontPx` to `InlineAiTutor` so changing `Explanation Font Size` in Settings resizes both `ব্যাখ্যা ও সমাধান` and `AI Tutor Admission Coach` text simultaneously.
  2. **Strict API Key Requirement + Notification Toast**: Blocks AI Tutor execution when no user API key is configured, showing a clean, dismissible notification toast with a one-click **Set API Key** button.
  3. **Independent AI Answer Finder & Speedy Compact Coaching**: Stops feeding or displaying the default question bank answer inside `InlineAiTutor`. The AI analyzes the question stem, options, and images itself, outputs the **AI-Found Answer** badge at the top, and streams a concise, high-impact 3-section explanation using `gemini-3.8-flash` (`ThinkingLevel.LOW`).
  4. **Working Written Exam Subject Selection**: Registers all DU Written sessions in the 4-of-6 subject selection system so only the 4 chosen subjects appear during the Written exam, and displays the session's actual question count and marks in the subject selection modal.
- **Target Audience / Persona**: Bangladeshi university admission candidates (DU, RU, JU, CU, GST) practicing MCQs and Written exams on phone and desktop.
- **Key Value**: Fast, trustworthy AI verification that independently solves questions using the user's API key, unified typography controls, and accurate 4-subject filtering for both DU MCQ and DU Written exams.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Clicking AI Tutor Without API Key**:
     - User clicks the **AI Tutor** button below `ব্যাখ্যা ও সমাধান:`.
     - If no API key is saved, AI Tutor does not open; instead, a crisp notification toast slides in: *"AI Tutor ব্যবহার করতে প্রথমে আপনার Gemini API Key যুক্ত করুন"* with an **Add API Key** action button that opens the API Key setup modal.
  2. **Clicking AI Tutor With API Key**:
     - The compact **AI Tutor Admission Coach** accordion opens.
     - No default pre-selected answer is shown. As the stream starts (`gemini-3.8-flash` with `ThinkingLevel.LOW`), the AI immediately determines and renders the **AI-Found Answer** banner at the top, followed by 3 compact cards:
       - **১. 🎯 সঠিক উত্তর ও মূল সূত্র**
       - **২. 📐 সংক্ষিপ্ত সমাধান**
       - **৩. ⚡ এডমিশন শর্টকাট ও ট্রিকস**
  3. **Adjusting Explanation Font Size**:
     - Moving the `Explanation Font Size` slider in Settings (`11px`–`22px`) immediately updates the font size of both `ব্যাখ্যা ও সমাধান:` and all `AI Tutor Admission Coach` sections.
  4. **Starting a DU Written Exam**:
     - Clicking **Start Exam** on any DU Written session opens the Subject Selection Modal showing accurate Written exam question counts and total marks, and starting the exam filters the Written paper to only the 4 selected subjects (`Physics`, `Chemistry` + 2 chosen optional subjects).
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: High-contrast academic exam workspace with full Light and Dark theme parity.
  - *Typography & Hierarchy*: Dynamic `explanationFontPx` applied across both official solutions and AI Tutor cards, preserving bold KaTeX math rendering and handwritten Bengali/English font options.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1 — Strict User API Key Enforcement for AI Tutor**:
  - *Chosen Approach*: Require `customApiKey.trim()` before opening `InlineAiTutor` and in `/api/gemini/explain-stream`. Remove the static pre-canned fallback text so AI Tutor only runs with a valid API key.
  - *Why*: Ensures every AI Tutor response is genuinely computed by Gemini rather than displaying a generic template when no key is provided.
- **Decision 2 — Independent AI Answer Determination (`gemini-3.8-flash` + `ThinkingLevel.LOW`)**:
  - *Chosen Approach*: Omit the database's `correctAnswer` from the prompt and UI badge; instruct `gemini-3.8-flash` (configured with `ThinkingLevel.LOW` for sub-second time-to-first-token) to independently solve the MCQ/Written problem and output its determined answer on the first line (`✅ **AI নির্ণীত সঠিক উত্তর:** ...`) which is parsed into the top AI Answer highlight box.
  - *Why*: Gives students an independent, fast second opinion from the AI rather than parroting an unverified or pre-selected option.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

```
┌────────────────────────────────────────────────────────────────────────────┐
│                   SettingsDropdown (Explanation Font Size)                 │
│             uiSettings.explanationFontPx (11px – 22px slider)              │
└───────────────────┬────────────────────────────────────┬───────────────────┘
                    │                                    │
                    ▼                                    ▼
┌───────────────────────────────────────┐  ┌─────────────────────────────────┐
│         ব্যাখ্যা ও সমাধান Box           │  │   AI Tutor Admission Coach      │
│  style={{ fontSize: explanationPx }}  │  │  style={{ fontSize: expPx }}    │
└───────────────────────────────────────┘  └────────────────┬────────────────┘
                                                            │
      ┌─────────────────────────────────────────────────────┘
      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                        AI Tutor Button Click Guard                         │
│  • Has customApiKey?                                                       │
│    ├─ NO  ──► Show Notification Toast ("API Key যুক্ত করুন" + Open Modal)   │
│    └─ YES ──► Open InlineAiTutor ──► Stream gemini-3.8-flash (LOW thinking)│
│               ├─ Top Banner: AI-Found Answer (No default selected answer)  │
│               └─ 3 Compact Cards: মূল সূত্র • সংক্ষিপ্ত সমাধান • শর্টকাট      │
└────────────────────────────────────────────────────────────────────────────┘
```

- **Interactive Component & State Mapping**:
  - **API Key Guard & Notification Toast**: Both Exam View and Question Bank View check `Boolean(customApiKey && customApiKey.trim())` when the user clicks `AI Tutor`. If missing, a floating toast notification is triggered with a direct button calling `onOpenApiKeyModal()`.
  - **AI Tutor Compact Streaming & Answer Extraction**: `InlineAiTutor` receives `explanationFontPx` from `uiSettings`, streams from `gemini-3.8-flash` (`ThinkingLevel.LOW`), extracts the AI-determined answer line into a live top badge, and renders the 3 compact coaching sections at `explanationFontPx`.
  - **DU Written 4-of-6 Subject Filtering**: Includes all DU Written session IDs (`du-25-26-written` through `du-19-20-written`) in `requiresSubjectSelection` so `StrictExamView` filters Written questions to the 4 chosen subjects and `SubjectSelectionModal` displays accurate Written session metrics.
