const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public/assets/aistudio');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.json'));

let totalFixedImgs = 0;
let totalFixedMath = 0;

function fixString(str) {
  if (!str || typeof str !== 'string') return str;
  let s = str;

  // 1. Replace [IMG:url] and [QIMG:url] with ![image](url)
  s = s.replace(/\[(?:Q?IMG):([^\]]+)\]/gi, (match, url) => {
    totalFixedImgs++;
    return `\n![image](${url.trim()})\n`;
  });

  // 2. Wrap naked isotopes like ^{18}_{8}O^{2-} or ^{9}_{4}Be or ^{19}_{9}F or ^{23}_{11}Na^{+}
  s = s.replace(/(^|[\s(])(\^{\d+}_{\d+}[a-zA-Z]+(?:[\^_{}\d+-]+)?)(?=[\s).,;।?!]|$)/g, (full, p, m) => {
    totalFixedMath++;
    return `${p}$${m}$`;
  });

  // 3. Wrap naked subscript chain like V_{3} > V_{1} > V_{2} or V_{1} > V_{2} > V_{3}
  s = s.replace(/(^|[\s(])([a-zA-Z]_{(?:\d+|[a-zA-Z]+)}\s*(?:[><=+\-*/]\s*[a-zA-Z]_{(?:\d+|[a-zA-Z]+)})+)(?=[\s).,;।?!]|$)/g, (full, p, m) => {
    totalFixedMath++;
    return `${p}$${m}$`;
  });

  // 4. Wrap naked unit superscripts like ms^{-1}, ms^{-2}, ms^{-}^{1}, s^{-1}, kJ mol^{-1}
  s = s.replace(/(^|[\s(])(\d+(?:\.\d+)?\s*(?:ms|kgm|kgms|mol|eV|kJ|N|J|W|A|V|Hz|km)\^?\{-?\d+\}(?:[a-zA-Z\^_{-}]*)?)(?=[\s).,;।?!]|$)/g, (full, p, m) => {
    totalFixedMath++;
    return `${p}$${m}$`;
  });

  // 5. Wrap single naked units with superscript like ms^{-1} or ms^{-2} or s^{-1}
  s = s.replace(/(^|[\s(])([a-zA-Z]{1,5}\^?\{-?\d+\}(?:[a-zA-Z\^_{-}]*)?)(?=[\s).,;।?!]|$)/g, (full, p, m) => {
    if (m.startsWith('$')) return full;
    totalFixedMath++;
    return `${p}$${m}$`;
  });

  return s;
}

function fixQuestionObj(q) {
  if (q.question) q.question = fixString(q.question);
  if (Array.isArray(q.options)) {
    q.options = q.options.map(opt => {
      if (typeof opt === 'string') return fixString(opt);
      if (opt && typeof opt === 'object') {
        if (opt.text) opt.text = fixString(opt.text);
        if (opt.html) opt.html = fixString(opt.html);
      }
      return opt;
    });
  }
  if (q.explanation) q.explanation = fixString(q.explanation);
}

for (const file of files) {
  const filePath = path.join(publicDir, file);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    const questions = Array.isArray(data) ? data : (data.questions || []);
    questions.forEach(q => fixQuestionObj(q));
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error("Error processing", file, err.message);
  }
}

console.log(`=== FIX COMPLETED ===`);
console.log(`Total [IMG:] / [QIMG:] converted to ![image](url): ${totalFixedImgs}`);
console.log(`Total Naked Math Expressions wrapped in $...$: ${totalFixedMath}`);
