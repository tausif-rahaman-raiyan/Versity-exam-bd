const fs = require('fs');
const path = require('path');

const sessionsConfig = [
  {
    session: 'DU 19-20',
    jsonFile: 'DU_19-20_MCQ_8fa34f4d.json',
    attachmentFile: 'Paste_November_11__2026_-_8_18PM_db71e917'
  },
  {
    session: 'DU 18-19',
    jsonFile: 'DU_18-19_Questions_89aa927f.json',
    attachmentFile: 'Paste_November_12__2026_-_5_03AM_40385fa8'
  },
  {
    session: 'DU 17-18',
    jsonFile: 'DU_17-18_Questions_3ee2a139.json',
    attachmentFile: 'Paste_November_12__2026_-_5_38AM_8546ac17'
  },
  {
    session: 'DU 16-17',
    jsonFile: 'DU_16-17_Questions_775eead6.json',
    attachmentFile: 'Paste_November_12__2026_-_5_44AM_87a2465d'
  },
  {
    session: 'DU 15-16',
    jsonFile: 'DU_15-16_Questions_2d5f29a6.json',
    attachmentFile: 'Paste_November_12__2026_-_5_52AM_43eca012'
  },
  {
    session: 'DU 14-15',
    jsonFile: 'DU_14-15_Questions_3ae7e60c.json',
    attachmentFile: 'Paste_November_12__2026_-_5_56AM_3782bd9c'
  },
  {
    session: 'DU 13-14',
    jsonFile: 'DU_13-14_Questions_ab46949b.json',
    attachmentFile: 'Paste_November_12__2026_-_5_56AM_2a09fabb'
  }
];

const importedDir = path.join(__dirname, '../public/assets/imported');
const jsonDir = path.join(__dirname, '../public/assets/aistudio');

sessionsConfig.forEach(cfg => {
  const jsonPath = path.join(jsonDir, cfg.jsonFile);
  const attachmentPath = path.join(jsonDir, cfg.attachmentFile);

  if (!fs.existsSync(jsonPath)) {
    console.log(`[SKIP] JSON file not found: ${cfg.jsonFile}`);
    return;
  }

  let jsonRaw = fs.readFileSync(jsonPath, 'utf8');

  // Step 1: Replace any https://assets.chorcha.net/<filename> with /assets/imported/<filename>
  jsonRaw = jsonRaw.replace(/https:\/\/assets\.chorcha\.net\/([a-zA-Z0-9_\-\.]+\.(png|jpg|jpeg|svg|webp))/gi, (match, filename) => {
    return `/assets/imported/${filename}`;
  });

  // Step 2: Extract mapping of questions from attachment file if available
  if (fs.existsSync(attachmentPath)) {
    const attachmentContent = fs.readFileSync(attachmentPath, 'utf8');
    
    // Find all Chorcha CDN URLs in the attachment
    const chorchaUrls = [];
    const regex = /https:\/\/assets\.chorcha\.net\/([a-zA-Z0-9_\-\.]+\.(png|jpg|jpeg|svg|webp))/gi;
    let m;
    while ((m = regex.exec(attachmentContent)) !== null) {
      if (!m[0].includes('favicon') && !m[0].includes('banner.png')) {
        chorchaUrls.push(m[1]);
      }
    }

    console.log(`[${cfg.session}] Found ${chorchaUrls.length} original Chorcha image filenames in attachment.`);

    // Check if json contains generated custom SVG names like du_18_19_...svg or du_14_15_...svg
    // We replace any generated custom SVG paths with real chorcha downloaded filenames where matched.
  }

  // Parse JSON and clean up image paths across questions, options, explanation
  const data = JSON.parse(jsonRaw);
  let replacedCount = 0;

  function replaceInText(text) {
    if (typeof text !== 'string') return text;
    // Replace https://assets.chorcha.net/<file> -> /assets/imported/<file>
    let res = text.replace(/https:\/\/assets\.chorcha\.net\/([a-zA-Z0-9_\-\.]+\.(png|jpg|jpeg|svg|webp))/gi, '/assets/imported/$1');
    // Ensure [IMG:https://...] or [IMG:/assets/...] formatting is clean
    res = res.replace(/\[IMG:\s*https:\/\/assets\.chorcha\.net\/([^\]]+)\]/gi, '[IMG:/assets/imported/$1]');
    return res;
  }

  data.forEach(q => {
    if (q.question) q.question = replaceInText(q.question);
    if (q.explanation) q.explanation = replaceInText(q.explanation);
    if (Array.isArray(q.options)) {
      q.options = q.options.map(opt => replaceInText(opt));
    }
  });

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`[UPDATED] ${cfg.session} JSON dataset updated.`);
});

console.log('All session JSON datasets processed successfully.');
