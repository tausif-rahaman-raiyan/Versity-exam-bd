import {
  du2526McqConfig,
  getInitialSelectedSubjects,
  toggleExamSubject,
  isExamSelectionValid,
  getSelectedSubjects,
  getExamSummary,
  buildMcqExamConfig,
  ExamSelectionRule,
} from './mcqExamSelection';
import { EXAM_SESSIONS } from '../data/questionBank';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

export function runMcqExamSelectionTests() {
  const duRule = du2526McqConfig.selectionRule!;

  // 1. DU 25-26 starts with Physics and Chemistry selected
  const initialDu = getInitialSelectedSubjects(duRule);
  assert(
    initialDu.length === 2 &&
      initialDu.includes('Physics') &&
      initialDu.includes('Chemistry'),
    'DU 25-26 must initialize with Physics and Chemistry selected'
  );

  // 2. Incomplete selections cannot start the examination
  assert(
    isExamSelectionValid(initialDu, duRule) === false,
    'DU 25-26 with only 2 mandatory subjects must be invalid until 2 optional subjects are chosen'
  );

  // 3. Mandatory subjects cannot be deselected
  const afterTryingDeselectPhysics = toggleExamSubject(
    initialDu,
    'Physics',
    duRule
  );
  assert(
    afterTryingDeselectPhysics.includes('Physics') &&
      afterTryingDeselectPhysics.length === 2,
    'Mandatory subject Physics cannot be deselected'
  );

  const afterTryingDeselectChemistry = toggleExamSubject(
    initialDu,
    'Chemistry',
    duRule
  );
  assert(
    afterTryingDeselectChemistry.includes('Chemistry') &&
      afterTryingDeselectChemistry.length === 2,
    'Mandatory subject Chemistry cannot be deselected'
  );

  // 4. Optional subjects can be selected and deselected
  const withBio = toggleExamSubject(initialDu, 'Biology', duRule);
  assert(
    withBio.includes('Biology') && withBio.length === 3,
    'Optional subject Biology should be selectable'
  );
  assert(
    isExamSelectionValid(withBio, duRule) === false,
    'DU 25-26 with only 1 optional subject should still be invalid'
  );

  // 5. DU 25-26 requires exactly two additional subjects
  const withBioAndMath = toggleExamSubject(withBio, 'Mathematics', duRule);
  assert(
    withBioAndMath.includes('Mathematics') && withBioAndMath.length === 4,
    'Second optional subject Mathematics should be selectable'
  );
  assert(
    isExamSelectionValid(withBioAndMath, duRule) === true,
    'DU 25-26 with Physics, Chemistry + 2 optional subjects must be valid'
  );

  // 6. Maximum selection limits are enforced
  const afterTryingFifthSubject = toggleExamSubject(
    withBioAndMath,
    'English',
    duRule
  );
  assert(
    afterTryingFifthSubject.length === 4 &&
      !afterTryingFifthSubject.includes('English'),
    'Cannot select a 3rd optional subject when maxOptionalSelections is 2'
  );

  // 7. Deselecting one optional subject unlocks selecting another
  const afterDeselectingBio = toggleExamSubject(
    withBioAndMath,
    'Biology',
    duRule
  );
  assert(
    afterDeselectingBio.length === 3 && !afterDeselectingBio.includes('Biology'),
    'Selected optional subject Biology can be deselected'
  );
  assert(
    isExamSelectionValid(afterDeselectingBio, duRule) === false,
    'Deselecting an optional subject makes selection incomplete again'
  );

  const withMathAndEnglish = toggleExamSubject(
    afterDeselectingBio,
    'English',
    duRule
  );
  assert(
    withMathAndEnglish.length === 4 &&
      withMathAndEnglish.includes('English') &&
      isExamSelectionValid(withMathAndEnglish, duRule) === true,
    'After deselecting Biology, English can be selected to complete the 4 subjects'
  );

  // 8. Deterministic subject order and dynamic summary for DU 25-26
  const selectedObjs = getSelectedSubjects(
    withMathAndEnglish,
    du2526McqConfig.subjects
  );
  assert(
    selectedObjs.map((s) => s.id).join(',') ===
      'Physics,Chemistry,Mathematics,English',
    'getSelectedSubjects must preserve deterministic config order'
  );

  const duSummary = getExamSummary(
    withMathAndEnglish,
    du2526McqConfig.subjects,
    duRule
  );
  assert(
    duSummary.totalSubjects === 4 &&
      duSummary.totalQuestions === 60 &&
      duSummary.totalMarks === 60,
    'DU 25-26 summary must equal 4 subjects, 60 questions, 60 marks'
  );

  // 9. Exact selection counts validation on custom rule
  const oneOptionalRule: ExamSelectionRule = {
    requiredSubjectIds: ['Physics', 'Chemistry', 'Mathematics'],
    optionalSubjectIds: ['Biology', 'ICT'],
    minOptionalSelections: 1,
    maxOptionalSelections: 1,
    exactOptionalSelections: 1,
  };
  const initOneOpt = getInitialSelectedSubjects(oneOptionalRule);
  assert(
    !isExamSelectionValid(initOneOpt, oneOptionalRule),
    'Rule requiring 1 optional subject should be invalid with 0 optional selected'
  );
  const validOneOpt = toggleExamSubject(initOneOpt, 'ICT', oneOptionalRule);
  assert(
    isExamSelectionValid(validOneOpt, oneOptionalRule),
    'Rule requiring 1 optional subject should be valid with 1 optional selected'
  );

  // 10. Other universities retain their own selection rules & totals (RU, JU, CU, GST, older DU)
  const ruSession = EXAM_SESSIONS.find((s) => s.id === 'ru-24-25')!;
  const ruConfig = buildMcqExamConfig(ruSession);
  assert(
    ruConfig.selectionRule === undefined &&
      isExamSelectionValid([], ruConfig.selectionRule) === true,
    'RU 24-25 should not have DU 4-of-6 optional selection rules'
  );
  const ruSummary = getExamSummary([], ruConfig.subjects, ruConfig.selectionRule);
  assert(
    ruSummary.totalQuestions === 80 && ruSummary.totalMarks === 100,
    `RU 24-25 summary must have 80 questions and 100 marks, got ${ruSummary.totalQuestions} Qs / ${ruSummary.totalMarks} marks`
  );

  const juSession = EXAM_SESSIONS.find((s) => s.id === 'ju-24-25')!;
  const juConfig = buildMcqExamConfig(juSession);
  const juSummary = getExamSummary([], juConfig.subjects, juConfig.selectionRule);
  assert(
    juConfig.negativeMarking === 0.2 &&
      juSummary.totalQuestions === 80 &&
      juSummary.totalMarks === 80,
    'JU 24-25 must have 80 questions, 80 marks, and -0.20 negative marking'
  );

  const cuSession = EXAM_SESSIONS.find((s) => s.id === 'cu-24-25')!;
  const cuConfig = buildMcqExamConfig(cuSession);
  const cuSummary = getExamSummary([], cuConfig.subjects, cuConfig.selectionRule);
  assert(
    cuSummary.totalQuestions === 100 && cuSummary.totalMarks === 100,
    'CU 24-25 must have 100 questions and 100 marks'
  );

  const gstSession = EXAM_SESSIONS.find((s) => s.id === 'gst-24-25')!;
  const gstConfig = buildMcqExamConfig(gstSession);
  const gstSummary = getExamSummary([], gstConfig.subjects, gstConfig.selectionRule);
  assert(
    gstSummary.totalQuestions === 100 && gstSummary.totalMarks === 100,
    'GST 24-25 must have 100 questions and 100 marks'
  );

  return true;
}

// Allow running directly via `npx tsx src/utils/mcqExamSelection.test.ts`
if (typeof process !== 'undefined' && process.argv?.[1]?.includes('mcqExamSelection.test')) {
  runMcqExamSelectionTests();
  console.log('✅ All mcqExamSelection unit tests passed!');
}
