const fs = require('fs');
const path = require('path');

const sessionsMap = [
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

const jsonDir = path.join(__dirname, '../public/assets/aistudio');

// Map generated SVGs back to real Chorcha images if any exist
const svgToRealChorchaMap = {
  '/assets/imported/du_18_19_phy_q23_a.svg': '/assets/imported/hfjYCDaZoI9lgV_kdFeFG.png',
  '/assets/imported/du_18_19_phy_q23_b.svg': '/assets/imported/iB3TVW9hKdBkWuVrwZ5DU.png',
  '/assets/imported/du_18_19_phy_q23_c.svg': '/assets/imported/ZmqmBM6KKNvSzjC14bJUL.png',
  '/assets/imported/du_18_19_phy_q23_d.svg': '/assets/imported/lU-MSqscOZkZgoJMTxoLU.png',
  '/assets/imported/du_14_15_phy_q2_a.svg': '/assets/imported/KiGpSnXBjhKRFe2vp_LvP.png',
  '/assets/imported/du_14_15_phy_q2_b.svg': '/assets/imported/i-UVVvs8RFymVQxTNdsXQ.png',
  '/assets/imported/du_14_15_phy_q2_c.svg': '/assets/imported/NJN0qKmF4YGNS5_tFYwBt.png',
  '/assets/imported/du_14_15_phy_q2_d.svg': '/assets/imported/lofBJhx4JDonRdmi5y2pL.png',
  '/assets/imported/du_14_15_phy_q12_q.svg': '/assets/imported/zbatefqZ6BvUXkJtIAbOr.svg',
  '/assets/imported/du_14_15_phy_q18_q.svg': '/assets/imported/jcY8Efu9QXMwtNvT9x4h5.jpg',
  '/assets/imported/du_14_15_bio_q29_q.svg': '/assets/imported/k0haODiNDIhvZGnwpE4F2.png',
  '/assets/imported/du_14_15_chem_q4_c.svg': '/assets/imported/KNdMkOBGSwE7kT3A8Q5A7.png',
  '/assets/imported/du_14_15_math_q18_q.svg': '/assets/imported/3zrOW7bzQtIEylOCgG642.svg',
  '/assets/imported/du_13_14_phy_q12_q.svg': '/assets/imported/awM8QrIl5mShanDyKwN1v.jpg',
  '/assets/imported/du_13_14_phy_q25_q.svg': '/assets/imported/5A0KXnKk48nkRBIgbJv4S.jpg',
  '/assets/imported/du_13_14_phy_q27_q.svg': '/assets/imported/mtC7O7KHpw98t2crmrTEN.png',
  '/assets/imported/du_13_14_phy_q28_q.svg': '/assets/imported/XkDU6BQiTTv63K-drdB_z.png'
};

sessionsMap.forEach(item => {
  const jsonPath = path.join(jsonDir, item.jsonFile);
  if (!fs.existsSync(jsonPath)) {
    console.log(`[SKIP] File not found: ${item.jsonFile}`);
    return;
  }

  let jsonStr = fs.readFileSync(jsonPath, 'utf8');

  // Replace any generated SVG path with real downloaded Chorcha image path
  Object.keys(svgToRealChorchaMap).forEach(genSvg => {
    const realImg = svgToRealChorchaMap[genSvg];
    jsonStr = jsonStr.split(genSvg).join(realImg);
  });

  // Replace any CDN https://assets.chorcha.net/<filename> with local /assets/imported/<filename>
  jsonStr = jsonStr.replace(/https:\/\/assets\.chorcha\.net\/([a-zA-Z0-9_\-\.]+\.(png|jpg|jpeg|svg|webp))/gi, (m, filename) => {
    return `/assets/imported/${filename}`;
  });

  const parsed = JSON.parse(jsonStr);
  const questions = Array.isArray(parsed) ? parsed : (parsed.questions || []);

  function fixText(text) {
    if (typeof text !== 'string') return text;
    // Replace https://assets.chorcha.net/ -> /assets/imported/
    let t = text.replace(/https:\/\/assets\.chorcha\.net\/([a-zA-Z0-9_\-\.]+\.(png|jpg|jpeg|svg|webp))/gi, '/assets/imported/$1');
    // Ensure clean [IMG:/assets/imported/filename] formatting
    t = t.replace(/\[IMG:\s*(?:https:\/\/assets\.chorcha\.net\/|\/assets\/imported\/|\/public\/assets\/imported\/)?([a-zA-Z0-9_\-\.]+\.(png|jpg|jpeg|svg|webp))\]/gi, '[IMG:/assets/imported/$1]');
    return t;
  }

  questions.forEach(q => {
    if (q.question) q.question = fixText(q.question);
    if (q.explanation) q.explanation = fixText(q.explanation);
    if (Array.isArray(q.options)) {
      q.options = q.options.map(opt => fixText(opt));
    }
  });

  // Save updated JSON back in original root array/object structure
  if (Array.isArray(parsed)) {
    fs.writeFileSync(jsonPath, JSON.stringify(parsed, null, 2), 'utf8');
  } else {
    parsed.questions = questions;
    fs.writeFileSync(jsonPath, JSON.stringify(parsed, null, 2), 'utf8');
  }

  // Count image references in final JSON
  const updatedStr = fs.readFileSync(jsonPath, 'utf8');
  const localImgMatches = updatedStr.match(/\/assets\/imported\/[a-zA-Z0-9_\-\.]+\.(png|jpg|jpeg|svg|webp)/gi) || [];
  console.log(`[SUCCESS] ${item.session} updated with ${localImgMatches.length} real local Chorcha image references.`);
});

console.log('--- ALL CHORCHA REAL IMAGES RESTORED & LINKED LOCALLY ---');
