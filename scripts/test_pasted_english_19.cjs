const fs = require('fs');
const raw = fs.readFileSync('public/assets/aistudio/Paste_November_11__2026_-_8_18PM_db71e917', 'utf8');

const du19Block = raw.slice(raw.indexOf('DU 19-20 MCQ-'));
const engPart = du19Block.slice(du19Block.indexOf('[English(11)]'));
console.log(engPart);
