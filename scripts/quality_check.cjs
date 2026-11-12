const fs = require('fs');
const path = require('path');
const katex = require('katex');

const publicDir = path.join(__dirname, '../public/assets/aistudio');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.json'));

let totalQuestions = 0;
let katexErrorCount = 0;
let chorchaImgCount = 0;
const errorsFound = [];

function sanitizeLatexEscapes(str) {
  if (!str) return '';
  return str
    .replace(/\x0bec/g, '\\vec')
    .replace(/\x0crac/g, '\\frac')
    .replace(/\x08eta/g, '\\beta')
    .replace(/\ttheta/g, '\\theta')
    .replace(/\ttimes/g, '\\times')
    .replace(/\ttext/g, '\\text')
    .replace(/\ttau/g, '\\tau')
    .replace(/→/g, ' \\rightarrow ')
    .replace(/⇌/g, ' \\rightleftharpoons ');
}

function testKatexString(text, location) {
  if (!text) return;
  // find all $...$ and $$...$$
  const matches = text.match(/\$\$[\s\S]*?\$\$|\$[^$\n]+?\$/g);
  if (!matches) return;

  for (const m of matches) {
    const isDisplay = m.startsWith('$$');
    const math = isDisplay ? m.slice(2, -2) : m.slice(1, -1);
    let cleaned = sanitizeLatexEscapes(math.trim()).replace(/\\frac(?![a-zA-Z])/g, '\\dfrac');
    cleaned = cleaned.replace(/\\rightarrow(?![a-zA-Z])/g, ' \\rightarrow ');
    cleaned = cleaned.replace(/[‘’]/g, "'").replace(/\\degree/g, '^\\circ');

    try {
      katex.renderToString(cleaned, {
        displayMode: isDisplay,
        throwOnError: true,
        output: 'html',
        strict: false
      });
    } catch (err) {
      katexErrorCount++;
      errorsFound.push({ location, math, error: err.message });
    }
  }
}

function scanQuestion(q, fileName, qIdx) {
  totalQuestions++;
  const loc = `${fileName} -> Q[${q.number || qIdx}]`;

  const fullText = `${q.question || ''} ${(q.options || []).map(o => typeof o === 'string' ? o : o.text || o.html || '').join(' ')} ${q.explanation || ''}`;

  testKatexString(q.question, `${loc} (stem)`);
  if (Array.isArray(q.options)) {
    q.options.forEach((opt, oIdx) => {
      const optStr = typeof opt === 'string' ? opt : opt.text || opt.html || '';
      testKatexString(optStr, `${loc} (opt ${oIdx})`);
    });
  }
  testKatexString(q.explanation, `${loc} (exp)`);

  const chorchaMatches = fullText.match(/https:\/\/assets\.chorcha\.net\/[^\s"')\]]+/g);
  if (chorchaMatches) {
    chorchaImgCount += chorchaMatches.length;
    console.log(`[Chorcha Img] ${loc}:`, chorchaMatches);
  }
}

for (const file of files) {
  const filePath = path.join(publicDir, file);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    const questions = Array.isArray(data) ? data : (data.questions || []);
    questions.forEach((q, idx) => scanQuestion(q, file, idx));
  } catch (err) {
    console.error("Error reading", file, err.message);
  }
}

console.log(`=== QUALITY CHECK RESULTS ===`);
console.log(`Total Questions Scanned: ${totalQuestions}`);
console.log(`KaTeX Compilation Errors: ${katexErrorCount}`);
console.log(`Chorcha External Image URLs Found: ${chorchaImgCount}`);
if (errorsFound.length > 0) {
  console.log(`\nFirst 10 KaTeX Errors:`);
  console.log(errorsFound.slice(0, 10));
}
