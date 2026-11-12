import {
  ExamSession,
  Question,
  MASTER_QUESTIONS,
  requiresSubjectSelection,
  sessionSupportsLanguageToggle,
} from '../data/questionBank';

export interface McqSubjectConfig {
  id: string;
  name: string;
  nameBn?: string;
  questionCount: number;
  marks: number;
}

export interface ExamSelectionRule {
  requiredSubjectIds: string[];
  optionalSubjectIds: string[];
  minOptionalSelections: number;
  maxOptionalSelections: number;
  exactOptionalSelections?: number;
}

export interface McqExamConfig {
  id: string;
  title: string;
  subtitle?: string;
  university?: 'DU' | 'RU' | 'JU' | 'CU' | 'GST';
  session?: string;
  unitLabel?: string;
  negativeMarking?: number;
  questionType?: 'MCQ' | 'Written' | 'Mixed';

  subjects: McqSubjectConfig[];

  selectionRule?: ExamSelectionRule;

  defaultLanguage?: 'bn' | 'en';
  supportedLanguages?: ('bn' | 'en')[];

  durationMinutes?: number;
}

const SUBJECT_BENGALI_NAMES: Record<string, string> = {
  physics: 'পদার্থবিজ্ঞান',
  chemistry: 'রসায়ন',
  biology: 'জীববিজ্ঞান',
  mathematics: 'গণিত',
  english: 'ইংরেজি',
  bangla: 'বাংলা',
  ict: 'আইসিটি (ICT)',
};

const CANONICAL_SUBJECT_NAMES: Record<string, string> = {
  physics: 'Physics',
  chemistry: 'Chemistry',
  biology: 'Biology',
  mathematics: 'Mathematics',
  math: 'Mathematics',
  english: 'English',
  bangla: 'Bangla',
  ict: 'ICT',
};

export function toCanonicalSubjectName(idOrName: string): string {
  const key = (idOrName || '').trim().toLowerCase();
  return CANONICAL_SUBJECT_NAMES[key] || idOrName;
}

export function getSubjectBengaliName(idOrName: string): string {
  const key = (idOrName || '').trim().toLowerCase();
  return SUBJECT_BENGALI_NAMES[key] || idOrName;
}

function matchesId(a: string, b: string): boolean {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

function includesId(list: string[], targetId: string): boolean {
  return list.some((item) => matchesId(item, targetId));
}

export function getInitialSelectedSubjects(rule?: ExamSelectionRule): string[] {
  return [...(rule?.requiredSubjectIds ?? [])];
}

export function toggleExamSubject(
  currentSelectedIds: string[],
  subjectId: string,
  rule: ExamSelectionRule
): string[] {
  const requiredIds = rule.requiredSubjectIds;
  const optionalIds = rule.optionalSubjectIds;

  // Mandatory subjects cannot be deselected.
  if (includesId(requiredIds, subjectId)) {
    return currentSelectedIds;
  }

  // Ignore subjects that are not selectable.
  const matchedOptionalId = optionalIds.find((id) => matchesId(id, subjectId));
  if (!matchedOptionalId) {
    return currentSelectedIds;
  }

  const isSelected = includesId(currentSelectedIds, matchedOptionalId);

  // Allow deselection of optional subjects.
  if (isSelected) {
    return currentSelectedIds.filter((id) => !matchesId(id, matchedOptionalId));
  }

  const optionalSelectedCount = currentSelectedIds.filter((id) =>
    includesId(optionalIds, id)
  ).length;

  // Enforce the maximum optional selection limit.
  if (optionalSelectedCount >= rule.maxOptionalSelections) {
    return currentSelectedIds;
  }

  return [...currentSelectedIds, matchedOptionalId];
}

export function isExamSelectionValid(
  selectedIds: string[],
  rule?: ExamSelectionRule
): boolean {
  // Exams without subject-selection requirements follow their existing start workflow.
  if (!rule) {
    return true;
  }

  const requiredIds = rule.requiredSubjectIds;
  const optionalIds = rule.optionalSubjectIds;

  const hasAllRequiredSubjects = requiredIds.every((id) =>
    includesId(selectedIds, id)
  );

  const optionalSelectedCount = selectedIds.filter((id) =>
    includesId(optionalIds, id)
  ).length;

  if (!hasAllRequiredSubjects) {
    return false;
  }

  if (optionalSelectedCount < rule.minOptionalSelections) {
    return false;
  }

  if (optionalSelectedCount > rule.maxOptionalSelections) {
    return false;
  }

  if (
    rule.exactOptionalSelections !== undefined &&
    optionalSelectedCount !== rule.exactOptionalSelections
  ) {
    return false;
  }

  return true;
}

export function getSelectedSubjects(
  selectedIds: string[],
  subjects: McqExamConfig['subjects']
): McqSubjectConfig[] {
  // Preserve the deterministic order defined by the exam configuration.
  return subjects.filter((subject) => includesId(selectedIds, subject.id));
}

export function getExamSummary(
  selectedIds: string[],
  subjects: McqExamConfig['subjects'],
  rule?: ExamSelectionRule
) {
  const effectiveSubjects =
    !rule && selectedIds.length === 0
      ? subjects
      : getSelectedSubjects(selectedIds, subjects);

  return {
    totalSubjects: effectiveSubjects.length,
    totalQuestions: effectiveSubjects.reduce(
      (total, subject) => total + subject.questionCount,
      0
    ),
    totalMarks: Number(
      effectiveSubjects
        .reduce((total, subject) => total + subject.marks, 0)
        .toFixed(2)
    ),
  };
}

export const du2526McqConfig: McqExamConfig = {
  id: 'du-25-26',
  title: 'DU 25–26 MCQ Exam',
  subtitle: 'Select your examination preferences',
  university: 'DU',
  session: '25-26',
  unitLabel: 'A Unit (Science)',
  negativeMarking: 0.25,
  questionType: 'MCQ',
  defaultLanguage: 'bn',
  supportedLanguages: ['bn', 'en'],
  durationMinutes: 45,
  subjects: [
    {
      id: 'Physics',
      name: 'Physics',
      nameBn: 'পদার্থবিজ্ঞান',
      questionCount: 15,
      marks: 15,
    },
    {
      id: 'Chemistry',
      name: 'Chemistry',
      nameBn: 'রসায়ন',
      questionCount: 15,
      marks: 15,
    },
    {
      id: 'Biology',
      name: 'Biology',
      nameBn: 'জীববিজ্ঞান',
      questionCount: 15,
      marks: 15,
    },
    {
      id: 'Mathematics',
      name: 'Mathematics',
      nameBn: 'গণিত',
      questionCount: 15,
      marks: 15,
    },
    {
      id: 'English',
      name: 'English',
      nameBn: 'ইংরেজি',
      questionCount: 15,
      marks: 15,
    },
    {
      id: 'Bangla',
      name: 'Bangla',
      nameBn: 'বাংলা',
      questionCount: 15,
      marks: 15,
    },
  ],
  selectionRule: {
    requiredSubjectIds: ['Physics', 'Chemistry'],
    optionalSubjectIds: ['Biology', 'Mathematics', 'English', 'Bangla'],
    minOptionalSelections: 2,
    maxOptionalSelections: 2,
    exactOptionalSelections: 2,
  },
};

const UNIVERSITY_UNITS: Record<string, string> = {
  DU: 'A Unit (Science)',
  RU: 'C Unit (Science)',
  JU: 'A Unit (Math & Physics)',
  CU: 'A Unit (Science)',
  GST: 'A Unit (Science Cluster)',
};

const DETERMINISTIC_SUBJECT_ORDER = [
  'Physics',
  'Chemistry',
  'Mathematics',
  'Biology',
  'ICT',
  'English',
  'Bangla',
];

/**
 * Builds a complete, accurate McqExamConfig for any ExamSession across DU, RU, JU, CU, and GST.
 */
export function buildMcqExamConfig(
  session: ExamSession,
  loadedQuestions?: Question[]
): McqExamConfig {
  const isDuWritten =
    session.university === 'DU' && session.questionType === 'Written';
  const negativeMarking = session.university === 'JU' ? 0.2 : 0.25;
  const unitLabel = UNIVERSITY_UNITS[session.university] || 'Science Unit';

  // 1. DU 4-of-6 MCQ Sessions (du-25-26 through du-19-20)
  // Physics and Chemistry are mandatory; student selects 2 optional subjects from Biology, Mathematics, English, Bangla.
  if (requiresSubjectSelection(session)) {
    return {
      ...du2526McqConfig,
      id: session.id,
      title: session.title,
      subtitle: 'Physics & Chemistry are mandatory • Choose 2 optional subjects',
      university: session.university,
      session: session.session,
      unitLabel,
      negativeMarking,
      questionType: session.questionType,
      durationMinutes: session.durationMinutes,
    };
  }

  // 2. All other university MCQ / Written sessions (RU, JU, CU, GST, older DU 00-01 to 18-19)
  const sourceQuestions =
    loadedQuestions && loadedQuestions.length > 0
      ? loadedQuestions
      : MASTER_QUESTIONS.filter(
          (q) =>
            q.university === session.university &&
            q.session === session.session &&
            q.questionType === session.questionType
        );

  const totalQuestionsTarget =
    loadedQuestions && loadedQuestions.length > 0
      ? loadedQuestions.length
      : session.totalQuestions;
  const markPerQuestion =
    totalQuestionsTarget > 0 ? session.totalMarks / totalQuestionsTarget : 1;

  let subjects: McqSubjectConfig[] = [];

  if (sourceQuestions.length > 0) {
    const countsBySubject = new Map<string, number>();
    for (const q of sourceQuestions) {
      const canonical = toCanonicalSubjectName(q.subject || 'General');
      countsBySubject.set(canonical, (countsBySubject.get(canonical) || 0) + 1);
    }

    const scale =
      loadedQuestions && loadedQuestions.length > 0
        ? 1
        : session.totalQuestions / sourceQuestions.length;

    const sortedSubjectNames = Array.from(countsBySubject.keys()).sort((a, b) => {
      const idxA = DETERMINISTIC_SUBJECT_ORDER.indexOf(a);
      const idxB = DETERMINISTIC_SUBJECT_ORDER.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });

    let allocatedQuestions = 0;
    subjects = sortedSubjectNames.map((subName, idx) => {
      const rawCount = countsBySubject.get(subName) || 0;
      const isLast = idx === sortedSubjectNames.length - 1;
      const qCount = isLast
        ? Math.max(1, totalQuestionsTarget - allocatedQuestions)
        : Math.max(1, Math.round(rawCount * scale));
      allocatedQuestions += qCount;

      return {
        id: subName,
        name: subName,
        nameBn: getSubjectBengaliName(subName),
        questionCount: qCount,
        marks: Number((qCount * markPerQuestion).toFixed(2)),
      };
    });
  } else {
    // Default standard 4-subject science breakdown when questions are not yet in memory
    const defaultSubjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
    const baseCount = Math.floor(totalQuestionsTarget / defaultSubjects.length);
    const remainder = totalQuestionsTarget % defaultSubjects.length;

    subjects = defaultSubjects.map((subName, idx) => {
      const qCount = baseCount + (idx < remainder ? 1 : 0);
      return {
        id: subName,
        name: subName,
        nameBn: getSubjectBengaliName(subName),
        questionCount: qCount,
        marks: Number((qCount * markPerQuestion).toFixed(2)),
      };
    });
  }

  // Ensure totalMarks across subjects matches session.totalMarks accurately
  if (subjects.length > 0) {
    const sumMarks = subjects.reduce((acc, s) => acc + s.marks, 0);
    const diff = Number((session.totalMarks - sumMarks).toFixed(2));
    if (Math.abs(diff) > 0) {
      subjects[subjects.length - 1].marks = Number(
        (subjects[subjects.length - 1].marks + diff).toFixed(2)
      );
    }
  }

  return {
    id: session.id,
    title: session.title,
    subtitle: 'Review examination syllabus and select language',
    university: session.university,
    session: session.session,
    unitLabel,
    negativeMarking,
    questionType: session.questionType,
    defaultLanguage: 'bn',
    supportedLanguages: sessionSupportsLanguageToggle(session.id) ? ['bn', 'en'] : ['bn'],
    durationMinutes: session.durationMinutes,
    subjects,
    // Fixed syllabus exams have no optional subject selection requirement
    selectionRule: undefined,
  };
}
