const fs = require('fs');

const raw = fs.readFileSync('public/assets/aistudio/Paste_November_11__2026_-_8_18PM_db71e917', 'utf8');

const sessionBlocks = raw.split(/(?=DU\s+\d{2}-\d{2}\s+MCQ-)/);

sessionBlocks.forEach((block) => {
  const headerMatch = block.match(/DU\s+(\d{2}-\d{2})\s+MCQ-/);
  if (!headerMatch) return;
  const session = headerMatch[1];
  console.log(`\n================ SESSION DU ${session} ================`);
  
  // Regex to extract each question:
  // e.g. [বাংলা(15)] 1. question text... \n A: optA | B: optB | C: optC | D: optD
  const qRegex = /\[([^\]]+)\]\s*(\d+)\.\s*([\s\S]*?)\nA:\s*([\s\S]*?)\s*\|\s*B:\s*([\s\S]*?)\s*\|\s*C:\s*([\s\S]*?)\s*\|\s*D:\s*([^\n\r]*)/g;
  
  let count = 0;
  let m;
  const subjects = {};
  while ((m = qRegex.exec(block)) !== null) {
    count++;
    const sub = m[1].trim();
    subjects[sub] = (subjects[sub] || 0) + 1;
  }
  console.log(`Total questions matched: ${count}`);
  console.log('Subjects:', subjects);
});
