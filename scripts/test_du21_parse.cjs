const fs = require('fs');

const raw = fs.readFileSync('public/assets/aistudio/Paste_November_11__2026_-_8_18PM_db71e917', 'utf8');
const du21Block = raw.split(/(?=DU\s+\d{2}-\d{2}\s+MCQ-)/).find(b => b.includes('DU 21-22 MCQ-'));

console.log("Found block, length:", du21Block.length);
