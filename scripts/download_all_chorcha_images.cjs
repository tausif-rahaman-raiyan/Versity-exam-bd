const fs = require('fs');
const path = require('path');
const https = require('https');

const attachments = [
  'Paste_November_11__2026_-_8_18PM_db71e917',
  'Paste_November_12__2026_-_5_03AM_40385fa8',
  'Paste_November_12__2026_-_5_38AM_8546ac17',
  'Paste_November_12__2026_-_5_44AM_87a2465d',
  'Paste_November_12__2026_-_5_52AM_43eca012',
  'Paste_November_12__2026_-_5_56AM_3782bd9c',
  'Paste_November_12__2026_-_5_56AM_2a09fabb'
];

const targetDir = path.join(__dirname, '../public/assets/imported');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const allUrls = new Set();

attachments.forEach(file => {
  const filePath = path.join(__dirname, '../public/assets/aistudio', file);
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = /https:\/\/assets\.chorcha\.net\/[a-zA-Z0-9_\-\.]+\.(png|jpg|jpeg|svg|webp)/gi;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const url = m[0];
    if (!url.includes('favicon') && !url.includes('banner.png')) {
      allUrls.add(url);
    }
  }
});

console.log(`Found ${allUrls.size} unique Chorcha image URLs.`);

function download(url) {
  return new Promise((resolve, reject) => {
    const filename = path.basename(url);
    const dest = path.join(targetDir, filename);

    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      console.log(`[EXISTS] ${filename}`);
      return resolve({ url, filename, status: 'EXISTS' });
    }

    const fileStream = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        fs.unlinkSync(dest);
        return reject(new Error(`Failed to download ${url}: Status ${res.statusCode}`));
      }
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`[DOWNLOADED] ${filename} (${fs.statSync(dest).size} bytes)`);
        resolve({ url, filename, status: 'DOWNLOADED' });
      });
    }).on('error', (err) => {
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function main() {
  const urls = Array.from(allUrls);
  let successCount = 0;
  for (const url of urls) {
    try {
      await download(url);
      successCount++;
    } catch (err) {
      console.error(`Error downloading ${url}:`, err.message);
    }
  }
  console.log(`Downloaded ${successCount} / ${urls.length} images successfully.`);
}

main();
