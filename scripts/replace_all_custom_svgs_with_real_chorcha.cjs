const fs = require('fs');
const path = require('path');

const sessionsMap = [
  { session: 'DU 19-20', json: 'DU_19-20_MCQ_8fa34f4d.json', att: 'Paste_November_11__2026_-_8_18PM_db71e917' },
  { session: 'DU 18-19', json: 'DU_18-19_Questions_89aa927f.json', att: 'Paste_November_12__2026_-_5_03AM_40385fa8' },
  { session: 'DU 17-18', json: 'DU_17-18_Questions_3ee2a139.json', att: 'Paste_November_12__2026_-_5_38AM_8546ac17' },
  { session: 'DU 16-17', json: 'DU_16-17_Questions_775eead6.json', att: 'Paste_November_12__2026_-_5_44AM_87a2465d' },
  { session: 'DU 15-16', json: 'DU_15-16_Questions_2d5f29a6.json', att: 'Paste_November_12__2026_-_5_52AM_43eca012' },
  { session: 'DU 14-15', json: 'DU_14-15_Questions_3ae7e60c.json', att: 'Paste_November_12__2026_-_5_56AM_3782bd9c' },
  { session: 'DU 13-14', json: 'DU_13-14_Questions_ab46949b.json', att: 'Paste_November_12__2026_-_5_56AM_2a09fabb' }
];

const jsonDir = path.join(__dirname, '../public/assets/aistudio');

sessionsMap.forEach(s => {
  const jsonPath = path.join(jsonDir, s.json);
  const attPath = path.join(jsonDir, s.att);

  if (!fs.existsSync(jsonPath) || !fs.existsSync(attPath)) return;

  const attContent = fs.readFileSync(attPath, 'utf8');

  // Extract real Chorcha image filenames in sequence from attachment
  const chorchaFiles = [];
  const regex = /https:\/\/assets\.chorcha\.net\/([a-zA-Z0-9_\-\.]+\.(png|jpg|jpeg|svg|webp))/gi;
  let m;
  while ((m = regex.exec(attContent)) !== null) {
    if (!m[0].includes('favicon') && !m[0].includes('banner.png')) {
      chorchaFiles.push(m[1]);
    }
  }

  let jsonStr = fs.readFileSync(jsonPath, 'utf8');

  // Find all generated custom SVGs in json
  const customSvgMatches = jsonStr.match(/\/assets\/imported\/du_[a-zA-Z0-9_\-]+\.svg/gi) || [];
  const uniqueCustomSvgs = Array.from(new Set(customSvgMatches));

  console.log(`[${s.session}] Replacing ${uniqueCustomSvgs.length} custom SVGs with real Chorcha files (${chorchaFiles.length} available)...`);

  // Map each custom SVG in order to the corresponding Chorcha file
  uniqueCustomSvgs.forEach((customSvg, index) => {
    if (index < chorchaFiles.length) {
      const realChorchaPath = `/assets/imported/${chorchaFiles[index]}`;
      jsonStr = jsonStr.split(customSvg).join(realChorchaPath);
      console.log(`  Mapped: ${customSvg} -> ${realChorchaPath}`);
    }
  });

  // Ensure any leftover https://assets.chorcha.net/ links in json also point to /assets/imported/
  jsonStr = jsonStr.replace(/https:\/\/assets\.chorcha\.net\/([a-zA-Z0-9_\-\.]+\.(png|jpg|jpeg|svg|webp))/gi, '/assets/imported/$1');

  fs.writeFileSync(jsonPath, jsonStr, 'utf8');
});

console.log('=== ALL CUSTOM SVGS REPLACED WITH REAL CHORCHA IMAGES ===');
