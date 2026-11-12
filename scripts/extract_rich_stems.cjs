const fs = require('fs');
const cheerio = require('cheerio');

function cleanTex(html) {
  if (!html) return "";
  const $ = cheerio.load(html);
  $("annotation[encoding=\"application/x-tex\"]").each((_, el) => {
    const tex = $(el).text().trim();
    $(el).closest(".katex").replaceWith(`$${tex}$`);
  });
  return $.text().replace(/\s+/g, " ").trim();
}

['21-22', '20-21', '19-20'].forEach(yr => {
  const file = `Question/DU/DU_${yr}_MCQ.json`;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const qs = data.questions || data;
  const cleaned = qs.map((q, idx) => {
    const stem = cleanTex(q.question_html) || q.question;
    const opts = (q.raw_options || q.options || []).map(o => cleanTex(o.html) || o.text || '');
    return {
      idx: idx + 1,
      subject: q.subject,
      stem,
      opts
    };
  });
  fs.writeFileSync(`scripts/extracted_stems_${yr}.json`, JSON.stringify(cleaned, null, 2), 'utf8');
  console.log(`Wrote scripts/extracted_stems_${yr}.json (${cleaned.length} questions)`);
});
