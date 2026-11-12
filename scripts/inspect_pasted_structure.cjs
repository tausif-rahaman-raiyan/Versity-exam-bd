const fs = require('fs');

const raw = fs.readFileSync('public/assets/aistudio/Paste_November_11__2026_-_8_18PM_db71e917', 'utf8');

const sessionBlocks = raw.split(/(?=DU\s+\d{2}-\d{2}\s+MCQ-)/);

sessionBlocks.forEach((block) => {
  const headerMatch = block.match(/DU\s+(\d{2}-\d{2})\s+MCQ-/);
  if (!headerMatch) return;
  const session = headerMatch[1];
  console.log(`\n================ SESSION DU ${session} ================`);
  
  // Find all lines that start with [Subject(..)]
  const lines = block.split('\n');
  const headers = [];
  lines.forEach((l, idx) => {
    const m = l.match(/^\[([^\]]+)\]\s*(\d+)\.\s*(.*)/);
    if (m) {
      headers.push({ lineIdx: idx, subject: m[1], num: parseInt(m[2]), text: m[3] });
    }
  });
  console.log(`Found ${headers.length} question headers:`);
  const bySub = {};
  headers.forEach(h => bySub[h.subject] = (bySub[h.subject] || 0) + 1);
  console.log('By subject:', bySub);
});
