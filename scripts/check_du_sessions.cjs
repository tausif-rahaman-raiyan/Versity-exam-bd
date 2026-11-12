const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '../public/assets/aistudio');
const publicRoot = path.join(__dirname, '../public');
const sessions = [
  ['DU_20-21_MCQ_b5b23a14.json', 90],
  ['DU_19-20_MCQ_8fa34f4d.json', 85],
  ['DU_18-19_Questions_89aa927f.json', 175],
  ['DU_17-18_Questions_3ee2a139.json', 171],
  ['DU_16-17_Questions_775eead6.json', 167],
  ['DU_15-16_Questions_2d5f29a6.json', 165],
  ['DU_14-15_Questions_3ae7e60c.json', 164],
  ['DU_13-14_Questions_ab46949b.json', 168],
];

let total = 0;
let errors = 0;
let genericExplanations = 0;
let imageCount = 0;
const warnings = [];

function getQuestions(parsed) {
  return Array.isArray(parsed) ? parsed : parsed?.questions;
}
function optionText(option) {
  if (typeof option === 'string') return option.trim();
  return String(option?.text ?? option?.html ?? '').trim();
}
function resolveAnswerIndex(question, options) {
  const answer = question.correct_answer ?? question.correctAnswer;
  if (answer && typeof answer === 'object' && answer.label != null) {
    return options.findIndex(o => typeof o === 'object' && o.label === answer.label);
  }
  if (Number.isInteger(answer)) return answer;
  if (typeof answer === 'string') {
    const labelMatch = options.findIndex(o => typeof o === 'object' && o.label === answer);
    if (labelMatch >= 0) return labelMatch;
    return options.findIndex(o => optionText(o).trim() === answer.trim());
  }
  return -1;
}
function checkLocalImages(text, location) {
  const re = /!\[[^\]]*\]\((\/assets\/[^)]+)\)/g;
  let match;
  while ((match = re.exec(String(text || ''))) !== null) {
    imageCount++;
    const localPath = path.join(publicRoot, match[1].replace(/^\/+/, ''));
    if (!fs.existsSync(localPath)) {
      console.error(`[ERROR] ${location}: missing local image ${match[1]}`);
      errors++;
    }
  }
  if (/https?:\/\/assets\.chorcha\.net\//i.test(String(text || ''))) {
    console.error(`[ERROR] ${location}: external Chorcha image URL remains`);
    errors++;
  }
}

for (const [file, expectedCount] of sessions) {
  const filePath = path.join(root, file);
  if (!fs.existsSync(filePath)) {
    console.error(`[ERROR] Missing session file: ${file}`);
    errors++;
    continue;
  }
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`[ERROR] Invalid JSON in ${file}: ${error.message}`);
    errors++;
    continue;
  }
  const questions = getQuestions(parsed);
  if (!Array.isArray(questions)) {
    console.error(`[ERROR] ${file}: no questions array`);
    errors++;
    continue;
  }
  if (questions.length !== expectedCount) {
    console.error(`[ERROR] ${file}: expected ${expectedCount} questions, found ${questions.length}`);
    errors++;
  }
  if (!Array.isArray(parsed) && parsed.question_count !== questions.length) {
    console.error(`[ERROR] ${file}: question_count metadata mismatch`);
    errors++;
  }
  questions.forEach((question, index) => {
    total++;
    const location = `${file} Q${question.number ?? index + 1}`;
    const options = Array.isArray(question.options) ? question.options : [];
    if (options.length !== 4) {
      console.error(`[ERROR] ${location}: expected 4 options, found ${options.length}`);
      errors++;
    }
    if (options.some(option => !optionText(option) && !(option?.image_urls?.length))) {
      console.error(`[ERROR] ${location}: empty option`);
      errors++;
    }
    const answerIndex = resolveAnswerIndex(question, options);
    if (answerIndex < 0 || answerIndex >= options.length) {
      console.error(`[ERROR] ${location}: correct_answer does not resolve to an option`);
      errors++;
    } else if (!options[answerIndex]?.is_correct) {
      console.error(`[ERROR] ${location}: correct option is not flagged is_correct`);
      errors++;
    }
    if (!String(question.question ?? question.question_text ?? '').trim()) {
      console.error(`[ERROR] ${location}: missing question text`);
      errors++;
    }
    const explanation = String(question.explanation ?? '').trim();
    if (!explanation) {
      console.error(`[ERROR] ${location}: missing explanation`);
      errors++;
    }
    if (/প্রদত্ত প্রশ্নের বিষয়ভিত্তিক সঠিক মূলনীতি/.test(explanation)) {
      genericExplanations++;
      warnings.push(`generic explanation remains: ${location}`);
    }
    checkLocalImages(question.question, location);
    checkLocalImages(question.explanation, `${location} explanation`);
    options.forEach((option, optionIndex) => {
      checkLocalImages(optionText(option), `${location} option ${optionIndex + 1}`);
      (option?.image_urls || []).forEach(url => {
        const localPath = path.join(publicRoot, String(url).replace(/^\/+/, ''));
        if (!fs.existsSync(localPath)) {
          console.error(`[ERROR] ${location}: missing option image ${url}`);
          errors++;
        }
      });
    });
    (question.question_image_urls || []).forEach(url => {
      const localPath = path.join(publicRoot, String(url).replace(/^\/+/, ''));
      if (!fs.existsSync(localPath)) {
        console.error(`[ERROR] ${location}: missing question image ${url}`);
        errors++;
      }
    });
  });
}

console.log(`DU source integrity: ${total} questions scanned across ${sessions.length} sessions`);
console.log(`Local image references checked: ${imageCount}`);
console.log(`Generic explanations requiring editorial review: ${genericExplanations}`);
warnings.slice(0, 20).forEach(warning => console.warn(`[WARN] ${warning}`));
if (warnings.length > 20) console.warn(`[WARN] ${warnings.length - 20} additional warnings omitted`);
if (errors) {
  console.error(`FAILED: ${errors} blocking data-integrity error(s)`);
  process.exit(1);
}
console.log('PASSED: question, option, answer, explanation, and local-image structure is valid.');
