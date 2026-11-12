const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public/assets/aistudio');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.json'));

let totalFixedReactions = 0;

function formatReactionString(text) {
  if (!text || typeof text !== 'string') return text;

  // Split text by existing $...$ or $$...$$ to only touch plain text segments
  const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g);

  const processed = parts.map(part => {
    if (part.startsWith('$')) return part; // already inside math $...$

    // Check if segment contains reaction arrows like → or \rightarrow or ⇌ or \rightleftharpoons or \xrightarrow
    if (/[→⇌]|\\rightarrow|\\rightleftharpoons|\\xrightarrow/.test(part)) {
      // Find expressions around reaction arrows
      return part.replace(
        /([a-zA-Z0-9_{}\(\)\+\-\.\s]*[A-Z][a-zA-Z0-9_{}\(\)\+\-\.\s]*(?:→|⇌|\\rightarrow|\\rightleftharpoons|\\xrightarrow\{[^}]*\})[a-zA-Z0-9_{}\(\)\+\-\.\s]*)/g,
        (rxnMatch) => {
          let cleaned = rxnMatch.trim();
          // Clean multiple spaces
          cleaned = cleaned.replace(/\s+/g, ' ');
          // Convert raw → to \rightarrow and ⇌ to \rightleftharpoons
          cleaned = cleaned.replace(/→/g, ' \\rightarrow ');
          cleaned = cleaned.replace(/⇌/g, ' \\rightleftharpoons ');
          
          totalFixedReactions++;
          return ` $${cleaned}$ `;
        }
      );
    }
    return part;
  });

  return processed.join('');
}

function processQuestion(q) {
  if (q.question) q.question = formatReactionString(q.question);
  if (Array.isArray(q.options)) {
    q.options = q.options.map(opt => {
      if (typeof opt === 'string') return formatReactionString(opt);
      if (opt && typeof opt === 'object') {
        if (opt.text) opt.text = formatReactionString(opt.text);
        if (opt.html) opt.html = formatReactionString(opt.html);
      }
      return opt;
    });
  }
  if (q.explanation) q.explanation = formatReactionString(q.explanation);
}

for (const file of files) {
  const filePath = path.join(publicDir, file);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    const questions = Array.isArray(data) ? data : (data.questions || []);
    
    questions.forEach(q => processQuestion(q));
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error("Error processing", file, err.message);
  }
}

console.log(`=== REACTION FIX COMPLETED ===`);
console.log(`Total Chemical Reactions Enclosed & Formatted: ${totalFixedReactions}`);
