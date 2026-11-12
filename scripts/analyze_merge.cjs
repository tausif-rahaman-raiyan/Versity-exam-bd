const fs = require('fs');

const raw = fs.readFileSync('public/assets/aistudio/Paste_November_11__2026_-_8_18PM_db71e917', 'utf8');

// Split into DU 21-22, DU 20-21, DU 19-20
const sessionBlocks = raw.split(/(?=DU\s+\d{2}-\d{2}\s+MCQ-)/);

function parseBlock(blockText) {
  const lines = blockText.split('\n');
  const questions = [];
  let currentQ = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(/^\[([^\]]+)\]\s*(\d+)\.\s*(.*)/);
    if (m) {
      if (currentQ) questions.push(currentQ);
      currentQ = {
        subjectRaw: m[1],
        num: parseInt(m[2]),
        rawText: m[3],
        lines: [m[3]],
        rawOptions: null
      };
    } else if (currentQ) {
      if (/^A:\s*/.test(line)) {
        currentQ.rawOptions = line;
      } else if (!currentQ.rawOptions) {
        currentQ.lines.push(line);
      }
    }
  }
  if (currentQ) questions.push(currentQ);
  return questions;
}

const mapSession = {
  '21-22': 'Question/DU/DU_21-22_MCQ.json',
  '20-21': 'Question/DU/DU_20-21_MCQ.json',
  '19-20': 'Question/DU/DU_19-20_MCQ.json'
};

sessionBlocks.forEach(sb => {
  const hm = sb.match(/DU\s+(\d{2}-\d{2})\s+MCQ-/);
  if (!hm) return;
  const yr = hm[1];
  const pastedQs = parseBlock(sb);
  const existingFile = mapSession[yr];
  const existingData = JSON.parse(fs.readFileSync(existingFile, 'utf8'));
  const existingQs = existingData.questions || existingData;
  console.log(`\n=== DU ${yr} ===`);
  console.log(`Pasted Qs: ${pastedQs.length}, Existing Qs in JSON: ${existingQs.length}`);
  
  // Print comparison of first 3 questions
  for (let i = 0; i < Math.min(3, pastedQs.length); i++) {
    console.log(`\n[${i+1}] Pasted: ${pastedQs[i].subjectRaw} #${pastedQs[i].num}: ${pastedQs[i].lines.join(' ').slice(0, 70)}`);
    console.log(`    Opts: ${pastedQs[i].rawOptions ? pastedQs[i].rawOptions.slice(0, 70) : 'NO_OPTS'}`);
    console.log(`    Existing: ${existingQs[i].subject} #${existingQs[i].number}: ${existingQs[i].question.slice(0, 70)}`);
  }
});
