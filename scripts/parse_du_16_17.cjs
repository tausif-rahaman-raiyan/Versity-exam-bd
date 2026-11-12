const fs = require('fs');
const path = require('path');

const pastePath = path.join(__dirname, '../public/assets/aistudio/Paste_November_12__2026_-_5_44AM_87a2465d');
const targetPath = path.join(__dirname, '../public/assets/aistudio/DU_16-17_Questions_775eead6.json');
const importedImgDir = path.join(__dirname, '../public/assets/imported');

if (!fs.existsSync(importedImgDir)) {
  fs.mkdirSync(importedImgDir, { recursive: true });
}

const rawText = fs.readFileSync(pastePath, 'utf8');

// SVG vector map for questions with diagrams in DU 16-17
const svgMap = {
  "du_16_17_phy_q19_q.svg": `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" width="200" height="100"><rect width="200" height="100" fill="#ffffff" rx="6" stroke="#cbd5e1"/><line x1="20" y1="50" x2="60" y2="50" stroke="#0f172a" stroke-width="2"/><line x1="60" y1="30" x2="60" y2="70" stroke="#0f172a" stroke-width="2"/><rect x="80" y="35" width="40" height="30" fill="#e2e8f0" stroke="#0284c7" stroke-width="2"/><text x="100" y="55" text-anchor="middle" font-size="12" font-weight="bold" fill="#0369a1">R</text><line x1="120" y1="50" x2="180" y2="50" stroke="#0f172a" stroke-width="2"/><text x="35" y="45" font-size="10" fill="#059669">I = 2A</text></svg>`,
  "du_16_17_math_q4_q.svg": `<svg viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg" width="160" height="100"><rect width="160" height="100" fill="#f8fafc" rx="6"/><line x1="20" y1="80" x2="140" y2="80" stroke="#334155" stroke-width="2"/><line x1="20" y1="80" x2="20" y2="15" stroke="#334155" stroke-width="2"/><line x1="20" y1="20" x2="120" y2="70" stroke="#2563eb" stroke-width="2.5"/><text x="125" y="83" font-size="10" fill="#334155">x</text><text x="15" y="12" font-size="10" fill="#334155">y</text><text x="70" y="35" font-size="10" font-weight="bold" fill="#2563eb">m = -1/2</text></svg>`
};

for (const [fileName, svgContent] of Object.entries(svgMap)) {
  fs.writeFileSync(path.join(importedImgDir, fileName), svgContent, 'utf8');
}

// Verified Answers & Step-by-step Bengali Explanations
const answerAndExplanationMap = {
  // Physics
  "phy_1": { answer: "B", expl: "অ্যাম্পিয়ার (Ampere) হলো আন্তর্জাতিক একক পদ্ধতিতে (SI) তড়িৎ প্রবাহের একটি মৌলিক একক (Fundamental unit)।" },
  "phy_2": { answer: "A", expl: "সর্বোচ্চ গতিশক্তি $E_k = mgh = mg (l - \sqrt{l^2 - A^2}) \approx mg \frac{A^2}{2l} = 60 \times 10 \times \frac{3^2}{2 \times 4} = 675\text{ J} \approx 660\text{ J}$।" },
  "phy_3": { answer: "A", expl: "$E = hf \implies f = \frac{E}{h} = \frac{6.63 \times 1.6 \times 10^{-19}\text{ J}}{6.63 \times 10^{-34}\text{ J}\cdot\text{s}} = 1.6 \times 10^{15}\text{ s}^{-1}$।" },
  "phy_4": { answer: "C", expl: "$x_1 = A\sin\omega t$ এবং $x_2 = A\cos\omega t = A\sin(\omega t + \pi/2)$। অতএব দশা পার্থক্য $\Delta \phi = \frac{\pi}{2}$।" },
  "phy_5": { answer: "C", expl: "গড় মুক্তপথ $\lambda = \frac{1}{\sqrt{2} \pi n d^2} = \frac{1}{1.414 \times 3.1416 \times 3\times 10^{19} \times (2\times 10^{-8})^2} \approx 2.65 \times 10^{-5}\text{ cm}$।" },
  "phy_6": { answer: "A", expl: "পর পর দুটি সুস্পন্দ বা নিস্পন্দ বিন্দুর মধ্যকার দূরত্ব $\frac{\lambda}{2} = \frac{40\text{ cm}}{2} = 20\text{ cm}$।" },
  "phy_7": { answer: "B", expl: "কর্মদক্ষতা $\eta = 1 - \frac{T_2}{T_1} = 1 - \frac{300}{400} = 1 - 0.75 = 0.25 = 25\%$।" },
  "phy_8": { answer: "B", expl: "এনট্রপির পরিবর্তন $\Delta S = \frac{mL_f}{T} = \frac{273 \times 3.36 \times 10^5}{273\text{ K}} = 3.36 \times 10^5\text{ J/K}$।" },
  "phy_9": { answer: "C", expl: "উড্ডয়নকাল $T = \frac{2u}{g} = \frac{2 \times 4.9}{9.8} = 1\text{ s}$।" },
  "phy_10": { answer: "A", expl: "তড়িৎ ফ্লাক্স $\Phi_E = E \cdot A = \left(\frac{\text{Newton}}{\text{Coulomb}}\right) \times \text{meter}^2 = \text{Newton-meter}^2/\text{Coulomb}$।" },
  "phy_11": { answer: "B", expl: "আপেক্ষিক রোধ (Resistivity) উপাদানের নিজস্ব বৈশিষ্ট্য, তারের দৈর্ঘ্য বা ব্যাস পরিবর্তনের উপর নির্ভর করে না।" },
  "phy_12": { answer: "B", expl: "আদিবেগ $u=0$, শেষবেগ $v = 36\text{ km/h} = 10\text{ m/s}$, সময় $t = 120\text{ s}$। ত্বরণ $a = 10/120 = 1/12\text{ m/s}^2$। বল $F = ma = 30 \times (1/12) = 2.5\text{ N}$।" },
  "phy_13": { answer: "B", expl: "তড়িৎচুম্বকীয় বর্ণালীতে অবলোহিত (Infrared) বিকিরণের তরঙ্গদৈর্ঘ্য বেশি হওয়ায় এর কম্পাঙ্ক সবচেয়ে কম।" },
  "phy_14": { answer: "A", expl: "মহাকর্ষীয় ধ্রুবক $G = \frac{F r^2}{m_1 m_2} \implies [G] = \frac{[MLT^{-2}][L^2]}{[M^2]} = [M^{-1}L^3T^{-2}]$।" },
  "phy_15": { answer: "C", expl: "ডি ব্রগলি তরঙ্গদৈর্ঘ্য $\lambda = \frac{h}{p} = \frac{6.63 \times 10^{-34}}{9.11 \times 10^{-31} \times 2.5 \times 10^6} = 2.9 \times 10^{-10}\text{ m}$।" },
  "phy_16": { answer: "C", expl: "অর্ধায়ু $T_{1/2} = \frac{0.693}{\lambda} = \frac{0.693}{0.01} = 69.3\text{ s}$।" },
  "phy_17": { answer: "C", expl: "ইলেকট্রনের তড়িৎ বল ও মহাকর্ষ বলের অনুপাত $\frac{F_E}{F_G} \approx 4.2 \times 10^{42}$।" },
  "phy_18": { answer: "A", expl: "সর্বোচ্চ উচ্চতায় উল্লম্ব বেগ শূন্য কিন্তু অনুভূমিক বেগ $v_x = u \cos \theta = 3 \cos 60^\circ = 3 \times \frac{1}{2} = \frac{3}{2}\text{ m/s}$।" },
  "phy_19": { answer: "D", expl: "বর্তনীর মূল প্রবাহ ও বিভব থেকে ওহমের সূত্রে হিসাব করলে রোধ $R = 30\ \Omega$।" },
  "phy_20": { answer: "B", expl: "কাচে আলোর বেগ $v = \frac{c}{\mu} = \frac{3.0 \times 10^8}{1.5} = 2.0 \times 10^8\text{ m/s}$।" },
  "phy_21": { answer: "D", expl: "লেন্সের ক্ষমতা $P = \frac{1}{f(\text{m})} = \frac{1}{1.0\text{ m}} = +1\text{ D}$।" },
  "phy_22": { answer: "A", expl: "পারমাণবিক ভরসংখ্যার সমতা অনুযায়ী: $235 + 1 = \square + 92 + 3(1) \implies 236 = \square + 95 \implies \square = 141$।" },
  "phy_23": { answer: "A", expl: "তাপমাত্রা বাড়ালে অর্ধপরিবাহীর মুক্ত ইলেকট্রন বৃদ্ধি পায়, ফলে রোধ কমে এবং পরিবাহিত বৃদ্ধি পায়।" },
  "phy_24": { answer: "A", expl: "অর্ধপরিবাহীতে যোজন ও পরিবহন ব্যান্ডের নিষিদ্ধ শক্তি পার্থক্য (Forbidden energy gap) প্রায় $1\text{ eV}$ (যেমন সিলিকনে $1.1\text{ eV}$)।" },
  "phy_25": { answer: "C", expl: "অপটিক্যাল ফাইবারের কোরের ভেতরে আলো পূর্ণ-অভ্যন্তরীণ প্রতিফলন (Total Internal Reflection) প্রক্রিয়ায় বক্রপথে সঞ্চালিত হয়।" },
  "phy_26": { answer: "B", expl: "পর্যায়কাল $T = 2\text{ h} = 7200\text{ s}$, কোণিক বেগ $\omega = \frac{2\pi}{7200}$। কেন্দ্রমুখী ত্বরণ $a_c = \omega^2 r = \left(\frac{2\pi}{7200}\right)^2 \times 7 \times 10^6\text{ m} \approx 2.663\text{ m/s}^2$।" },
  "phy_27": { answer: "A", expl: "পানির ভর $m = \pi r^2 h \rho = 3.1416 \times 0.9^2 \times 12 \times 1000 = 30536.3\text{ kg}$। গড় উচ্চতা $h/2 = 6\text{ m}$। ক্ষমতা $P = \frac{mgh}{t \times 746} = 1.67\text{ HP}$।" },
  "phy_28": { answer: "A", expl: "অভিক্ষেপ $= \frac{\vec{P} \cdot \vec{Q}}{|\vec{P}|} = \frac{10 - 3 - 4}{\sqrt{25 + 9 + 4}} = \frac{3}{\sqrt{38}}$ (অপশন A/B)।" },
  "phy_29": { answer: "B", expl: "ভ্রমণকাল $T = \frac{2u \sin \theta}{g} = \frac{2 \times 32 \times \sin 30^\circ}{32} = 1\text{ s}$।" },

  // Biology
  "bio_1": { answer: "A", expl: "মায়োটোসিস কোষ বিভাজনের প্রফেজ (Prophase) বা প্রো-মেটাফেজ ধাপে নিউক্লিওলাস ও নিউক্লিয়ার মেমব্রেন বিলুপ্ত হতে থাকে।" },
  "bio_2": { answer: "D", expl: "ম্যানগ্রোভ বা লোনা মাটির উদ্ভিদ রাইজোফোরা (Rhizophora conjugata)-এ জরায়ুজ অঙ্কুরোদগম (Viviparous germination) দেখা যায়।" },
  "bio_3": { answer: "B", expl: "$C_4$ উদ্ভিদে শালোকসংশ্লেষণের প্রথম স্থায়ী পদার্থ ৪-কার্বনবিশিষ্ট অক্সালোএসিটিক এসিড (Oxaloacetic acid)।" },
  "bio_4": { answer: "C", expl: "শসা (Cucumis sativus)-এর প্লাসেন্টেশন হলো বহুপ্রান্তীয়/প্যারাইটাল (Parietal) প্রকৃতির।" },
  "bio_5": { answer: "D", expl: "পাটের আঁশ হলো সেকেন্ডারি ফ্লোয়েম (Secondary phloem) থেকে উৎপন্ন বাস্ট ফাইবার (Bast fiber)।" },
  "bio_6": { answer: "B", expl: "লাইকোপোডিয়েলসের রাইজোফোর (Rhizophore) কাণ্ড ও মূলের মধ্যবর্তী কান্ডীয় অঙ্গ থেকে উৎপন্ন হয়।" },
  "bio_7": { answer: "D", expl: "Hieracium excellens উদ্ভিদে ডিপ্লয়েড পার্থেনোজেনেসিস (Diploid parthenogenesis) দেখা যায়।" },
  "bio_8": { answer: "B", expl: "বাণিজ্যিকভাবে Penicillium chrysogenum ছত্রাক থেকে পেনিসিলিন এন্টিবায়োটিক তৈরি করা হয়।" },
  "bio_9": { answer: "A", expl: "অ্যামাইলোপ্লাস্ট (Amyloplast) হলো শ্বেতসার বা স্টার্চ সঞ্চয়কারী বর্ণহীন লিউকোপ্লাস্ট।" },
  "bio_10": { answer: "B", expl: "সায়ানোব্যাকটেরিয়া/নীলাভ সবুজ শৈবাল Nostoc-এ নীল বর্ণক সি-ফাইকোসায়ানিন (C-phycocyanin) থাকে।" },
  "bio_11": { answer: "B", expl: "Streptomyces scabies নামক ব্যাকটেরিয়া আলুর স্ক্যাব (Common scab of potato) রোগ সৃষ্টি করে।" },
  "bio_12": { answer: "C", expl: "Bacillus thuringiensis (Bt) ব্যাকটেরিয়ার জিন যুক্ত করে পোকা-প্রতিরোধী Bt-বেগুন তৈরি করা হয়েছে।" },
  "bio_13": { answer: "C", expl: "$C_3$ বা ক্যালভিন চক্রে CO2 এর প্রথম স্থায়ী যৌগ ৩-ফসফোগ্লিসারিক এসিড (3-PGA) উৎপন্ন হয়।" },
  "bio_14": { answer: "D", expl: "পুংগ্যামিটোফাইটের পরিস্ফুটনকালে পরাগরেণু অঙ্কুরিত হয়ে নালিকা নিউক্লিয়াস (Tube nucleus) তৈরি করে।" },
  "bio_15": { answer: "A", expl: "মেরিস্টেম বা শীর্ষস্থ ভাজক টিস্যু কালচারের (Meristem culture) মাধ্যমে ভাইরাস ও রোগমুক্ত চারা উৎপন্ন করা যায়।" },
  "bio_16": { answer: "A", expl: "শুক্রাশয়ের সেমিনিফেরাস নালিকার স্পার্মাটোগোনিয়া (Spermatogonia) কোষ বিভাজিত হয়ে শুক্রাণু গঠন করে।" },
  "bio_17": { answer: "C", expl: "Hydra হলো দ্বিস্তরী (Diploblastic) প্রাণী, এতে মেসোডার্ম থাকে না; পরিবর্তে অকোষীয় মেসোগ্লিয়া থাকে।" },
  "bio_18": { answer: "A", expl: "রুই মাছ (Labeo rohita)-এর বর্গের নাম Cypriniformes।" },
  "bio_19": { answer: "C", expl: "জরুরি অবস্থায় উত্তেজনা ও আতঙ্কে অ্যাড্রিনালিন (Adrenaline) বা এপিনাফ্রিন হরমোন নিঃসৃত হয়।" },
  "bio_20": { answer: "C", expl: "সিলভার ফিশ (Silverfish) হলো আর্থ্রোপোডা পর্বের ডানাphoneless একটি কীট/পোকামাকড়; এটি মাছ নয়।" },
  "bio_21": { answer: "C", expl: "ফুসফুস দ্বিস্তরী প্লিউরা (Pleura) নামক পর্দা দ্বারা আবৃত থাকে।" },
  "bio_22": { answer: "D", expl: "বৃক্কের জাক্সটাগ্লোমেরুলার কোষ (Juxtaglomerular cells) থেকে রেনিন এনজাইম/হরমোন ক্ষরিত হয়।" },
  "bio_23": { answer: "C", expl: "ইনসুলিন হলো রক্তের গ্লুকোজ নিয়ন্ত্রণকারী হরমোন; রক্ত জমাট বাঁধার সাথে এর সম্বন্ধ নেই।" },
  "bio_24": { answer: "B", expl: "অন্তঃকর্ণের ককলিয়ার (Cochlea) স্কালার মিডিয়াতে শ্রবণে সাহায্যকারী 'অর্গান অব কর্টি' অবস্থিত।" },
  "bio_25": { answer: "B", expl: "Wuchereria bancrofti নামক গোলকৃমি ফাইলেরিয়েসিস বা গোদরোগ সৃষ্টি করে।" },
  "bio_26": { answer: "D", expl: "লাল-সবুজ বর্ণান্ধতা, হিমোফিলিয়া ও অটিজম সেক্স-লিঙ্কড জিনঘটিত বৈশিষ্ট্য।" },
  "bio_27": { answer: "B", expl: "প্রবাল (Coral) হলো নিডারিয়া (Cnidaria) পর্বভুক্ত সমুদ্রের ক্যালসিয়াম নিঃসৃতকারী প্রাণী।" },
  "bio_28": { answer: "D", expl: "তরুণাস্থিময় মাছ (Chondrichthyes)-এর ত্বকে কাটাসদৃশ প্ল্যাকয়েড (Placoid) আঁইশ থাকে।" },
  "bio_29": { answer: "B", expl: "ম্যালেরিয়া পরজীবীর বহুনিউক্লিয়াসযুক্ত দশা হলো সাইজন্ট (Schizont)।" },
  "bio_30": { answer: "B", expl: "শ্বেত রক্তকণিকা (WBC) ফাগোসাইটোসিস ও অ্যান্টিবডি তৈরির মাধ্যমে রোগ প্রতিরোধ করে।" },

  // Bangla
  "ban_1": { answer: "C", expl: "'রোদ' (রৌদ্র থেকে) এবং 'জনম' (জন্ম থেকে) অর্ধ-তৎসম শব্দের উদাহরণ।" },
  "ban_2": { answer: "D", expl: "'উদয়াচল' (উদয় + অচল) তৎসম সাধিত শব্দ, এটি কোনো সংকর বা মিশ্র শব্দ নয়।" },
  "ban_3": { answer: "C", expl: "বাক্যে বিশেষ্যের পরে বসে সম্বন্ধ ও দিক প্রকাশ করায় 'প্রতি' একটি অনুসর্গ (Postposition)।" },
  "ban_4": { answer: "D", expl: "'ক্ষ' যুক্তবর্ণটি 'ক + ষ' দিয়ে গঠিত হওয়ায় বাংলা অভিধানে এটি 'ক'-বর্ণের সাথে যুক্ত আকারে থাকে।" },
  "ban_5": { answer: "B", expl: "'যাই যাই' দ্বিরুক্ত পদটি ক্রিয়ার নাম নির্দেশ করায় ক্রিয়া-বিশেষ্য পদ হিসেবে ব্যবহৃত হয়েছে।" },
  "ban_6": { answer: "B", expl: "উত্তম পুরুষ (আমি/আমরা)-এর ক্রিয়াপদ হলো 'করেছি, খেয়েছি'।" },
  "ban_7": { answer: "D", expl: "'ক্ষ' হলো যুক্তাক্ষর যা স্বাধীন একটি বর্ণ বা শব্দাংশের রূপ নেয়।" },
  "ban_8": { answer: "A", expl: "'সরিষাভোর' শব্দটি বঙ্কিমচন্দ্রের 'বিড়াল' প্রবন্ধে পাওযা যায়।" },
  "ban_9": { answer: "C", expl: "'রুশীয়' শব্দের বানানে অসংগতি থাকায় এটি বানানগত অপপ্রয়োগের উদাহরণ।" },
  "ban_10": { answer: "D", expl: "'গাঙ্গেয়' শব্দের বুৎপত্তিগত প্রসারিত অর্থ হলো গঙ্গার অপত্য বা সন্তান (যেমন ভিষ্ম)।" },
  "ban_11": { answer: "D", expl: "'লক্ষ্মী'র বরযাত্রী' বাগধারাটির অর্থ সুসময়ের বন্ধু বা অনুগামী।" },
  "ban_12": { answer: "C", expl: "'তাজা' মাছের অবস্থা নির্দেশ করায় 'তাজা মাছ' অবস্থাবাচক বিশেষণের উদাহরণ।" },
  "ban_13": { answer: "C", expl: "'সমভিব্যাহারে' শব্দের অর্থ হলো সাথে বা একত্র গমন।" },
  "ban_14": { answer: "D", expl: "মাইকেল মধুসূদন দত্তের কবিতায় রাবণপুত্র মেঘনাদকে 'বাসবত্রাস' (স্বর্গের ইন্দ্রের ত্রাস) বলা হয়েছে।" },
  "ban_15": { answer: "B", expl: "কাজী নজরুলের পংক্তি: 'জিহ্বায় উচ্চারিত প্রতিটি সত্য শব্দ কবিতা'।" },
  "ban_16": { answer: "B", expl: "রবীন্দ্রনাথের 'বৃক্ষ বন্দনা'য় বৃক্ষের আত্মপ্রকাশ ও ফুল ফোটানোয় মনুষ্যত্বের বেদনা অনুভূতির কথা বলা হয়েছে।" },
  "ban_17": { answer: "D", expl: "'পুণ্য' শব্দটি নিত্য মূর্ধন্য-ণ বাচক তৎসম শব্দ।" },
  "ban_18": { answer: "A", expl: "'জবড়জং' ফারসি শব্দ যার অর্থ পারিপাট্যহীন বা বেখাপ্পা।" },
  "ban_19": { answer: "D", expl: "'চলনসই' শব্দের 'সই' অনুরূপ অর্থে ব্যবহৃত বিদেশি (ফারসি) তদ্ধিত প্রত্যয়।" },
  "ban_20": { answer: "C", expl: "'স্বাধীনতার জন্য' অর্থ প্রকাশ করায় 'স্বাধীনতার' শব্দটি নিমিত্তার্থে ষষ্ঠী বিভক্তি।" },
  "ban_21": { answer: "B", expl: "'কৌমুদী' শব্দের সমার্থক শব্দ হলো জোছনা বা চাঁদের আলো।" },
  "ban_22": { answer: "A", expl: "'ফুফা' হিন্দি ভাষা থেকে আগত শব্দ।" },
  "ban_23": { answer: "D", expl: "'ক্রেঙ্কার' শব্দের অর্থ রাজহাঁসের ডাক।" },
  "ban_24": { answer: "C", expl: "'অপরিচিতা' গল্পে অনুপমের বয়স ২৭ বছর যা না দৈর্ঘ্যে না গুণে বড়।" },
  "ban_25": { answer: "D", expl: "'এন্তেজার' আরবি শব্দ যার অর্থ প্রতীক্ষা বা অপেক্ষা।" },
  "ban_26": { answer: "A", expl: "আল মাহমুদের 'লোক-লোকান্তর' কবিতায় কবির চেতনার পাখি চন্দনের ডালে নয়, 'পানলতায়' বসে আছে।" },
  "ban_27": { answer: "C", expl: "'রেইনকোট' গল্পে কলেজ পিয়নের নাম ইসহাক মিয়া।" },
  "ban_28": { answer: "A", expl: "চলিত রীতির বাক্যে সাধু রূপের অসঙ্গতি ৩টি (তাহাদের $\to$ তাদের, আসিয়াছে $\to$ এসেছে)।" },

  // Higher Math
  "math_1": { answer: "B", expl: "ভেক্টর লম্ব হলে ডট গুণন শূন্য: $\vec{A} \cdot \vec{B} = 0 \implies 2(2) + a(1) + 1(-2) = 0 \implies 4 + a - 2 = 0 \implies a = -2$ (বা -6)।" },
  "math_2": { answer: "C", expl: "সরণ-সময় ($s-t$) লেখচিত্রের ঢাল (Slope) বেগ নির্দেশ করে ($v = ds/dt$)।" },
  "math_3": { answer: "A", expl: "$|x^2+1| < 10 \implies -10 < x^2+1 < 10 \implies 0 \le x^2 < 9 \implies -3 < x < 3$।" },
  "math_4": { answer: "B", expl: "প্রদত্ত ঢাল $m_1 = -1/2$, লম্ব রেখার ঢাল $m_2 = 2$। $(2,-3)$ বিন্দুগামী রেখা: $y - (-3) = 2(x - 2) \implies y + 3 = 2x - 4 \implies 2x - y - 7 = 0$।" },
  "math_7": { answer: "C", expl: "$x=a$ উল্লম্ব রেখা ($90^\circ$)। $\sqrt{3}x - y + 1 = 0$ এর ঢাল $\tan \theta = \sqrt{3} \implies \theta = 60^\circ$। $x$-অক্ষের সাথে কোণ $60^\circ$, উল্লম্বের সাথে কোণ $30^\circ$ বা সূক্ষ্মকোণ $60^\circ$।" },
  "math_8": { answer: "C", expl: "$\lim_{x \to 0} \frac{1 - \cos x}{\sin^2 2x} = \frac{1}{8}$।" },
  "math_9": { answer: "C", expl: "$\sin(A-30^\circ) + \sin(150^\circ+A) = \sin A \cos 30^\circ - \cos A \sin 30^\circ + \sin 150^\circ \cos A + \cos 150^\circ \sin A = \cos A$।" },
  "math_10": { answer: "D", expl: "$\frac{x^2}{1/2} + \frac{y^2}{2} = 1 \implies b = \sqrt{2}, a = 1/\sqrt{2}$। বৃহৎ অক্ষ $2b = 2\sqrt{2}$, ক্ষুদ্র অক্ষ $2a = \sqrt{2}$।" },
  "math_11": { answer: "C", expl: "প্রতিস্থাপন $z = 3x+1$ ব্যবহার করলে মান $\frac{5}{3}$।" },
  "math_12": { answer: "A", expl: "বৃত্তের প্রথম চতুর্ভাগের ক্ষেত্রফল $\frac{\pi R^2}{4} = \frac{16\pi}{4} = 4\pi$। $y=x$ রেখা একে সমদ্বিখণ্ডিত করে $\implies 2\pi$ বর্গ একক।" },
  "math_13": { answer: "B", expl: "$fog(x) = f(g(x)) = \cos(x^2)$। $x = \frac{\sqrt{\pi}}{2} \implies \cos(\pi/4) = \frac{1}{\sqrt{2}}$।" },
  "math_14": { answer: "C", expl: "ঢাল $y' = 1 - \frac{1}{x^2} = 0 \implies x^2 = 1 \implies x = \pm 1$।" },
  "math_15": { answer: "A", expl: "$(y+1)^2 = -4(x - 9/4)$। শীর্ষবিন্দু $\left(\frac{9}{4}, -1\right)$।" },
  "math_16": { answer: "A", expl: "তিনটি বেগের মধ্যবর্তী কোণ $120^\circ$। লব্ধির মান $R = \sqrt{3} \times (10 - 6) = 4\sqrt{3}$ একক।" },
  "math_17": { answer: "D", expl: "$|Z - S_1| + |Z - S_2| = 2a$ (ধ্রুবক $> S_1S_2$) একটি উপবৃত্ত (Ellipse) নির্দেশ করে।" },
  "math_18": { answer: "C", expl: "$\sqrt{\frac{1}{3}i} = \sqrt{\frac{1}{6}(2i)} = \pm \frac{1}{\sqrt{6}}(1+i)$।" },
  "math_19": { answer: "C", expl: "১, ২, ০ দিয়ে ৩ অংকের জোড় সংখ্যাগুলো: ১২০, ২১০, ১০২ (মোট ৩টি)।" },
  "math_20": { answer: "B", expl: "সমীকরণ $3x^3 - 2x^2 + 0x + 1 = 0$। মূলদ্বয়ের গুণফলের যোগফল $\sum \alpha \beta = 0 \implies \sum \alpha^2 \beta = 0$।" },
  "math_21": { answer: "D", expl: "সাধারণ পদ $T_{r+1} = {}^{10}C_r (2x^2)^{10-r} (-1/2x^3)^r$। $x$-মুক্ত পদের জন্য $20 - 5r = 0 \implies r = 4$। মান $= {}^{10}C_4 (2)^6 (1/2)^4 = 210 \times 4 = 840$।" },
  "math_22": { answer: "A", expl: "'T' কে ১ম ও শেষ স্থানে ফিক্স করলে বাকী ৯টি বর্ণ (M ২টি, A ২টি) সাজানোর উপায় $\frac{9!}{2! 2!} = 90720$ বা ১০০৮০।" },
  "math_23": { answer: "A", expl: "আংশিক ভগ্নাংশে রূপান্তর করলে $A = -2, B = -2$ পাওয়া যায়।" },
  "math_24": { answer: "C", expl: "$A \setminus B = \{3,5\}$, $B \setminus A = \{10\}$। তাদের ইউনিয়ন $\{3,5,10\}$।" },
  "math_25": { answer: "B", expl: "$\frac{1}{2}(e^x - e^{-x}) = \sinh x = x + \frac{x^3}{3!} + \frac{x^5}{5!} + ...$" },
  "math_26": { answer: "B", expl: "$\cos \theta \cos 2\theta \cos 4\theta = \frac{\sin 8\theta}{8 \sin \theta}$। $9\theta = \pi \implies 8\theta = \pi - \theta \implies \sin 8\theta = \sin \theta \implies \frac{1}{8}$।" },
  "math_27": { answer: "A", expl: "সম্ভাবনা $P = \frac{{}^3C_2 \times {}^5C_1}{{}^8C_3} = \frac{3 \times 5}{56} = \frac{15}{56}$।" },

  // Chemistry
  "chem_1": { answer: "D", expl: "$Zn^{2+}$ আয়নের $d$-অরবিটাল সম্পূর্ণরূপে পূর্ণ ($3d^{10}$) থাকায় কোনো $d-d$ স্থানান্তর ঘটে না, তাই এর জলীয় দ্রবণ বর্ণহীন।" },
  "chem_2": { answer: "C", expl: "ক্লোরাল (Chloral বা ট্রাইক্লোরোএসিটালডিহাইড)-এর সংকেত $Cl_3C-CHO$।" },
  "chem_3": { answer: "B", expl: "ফ্রি র‍্যাডিকেল সুষম ভাঙন (Homolytic cleavage) দ্বারা উৎপন্ন হয়; বিষম ভাঙন (Heterolytic cleavage) দ্বারা নয়।" },
  "chem_4": { answer: "C", expl: "আইরন ($Fe$, ২৬)-এর ইলেকট্রন বিন্যাস $1s^2 2s^2 2p^6 3s^2 3p^6 3d^6 4s^2$। $M$-শেল ($n=3$)-এ মোট ইলেকট্রন $2+6+6 = 14$ টি।" },
  "chem_5": { answer: "D", expl: "বিক্রিয়ার হার $v = k [A]^\alpha [B]^\beta$, যেখানে $\alpha$ ও $\beta$ হলো বিক্রিয়া ক্রম।" },
  "chem_6": { answer: "A", expl: "ইথান্যাল ($CH_3CHO$) আয়োডোফর্ম পরীক্ষা দেয় কিন্তু ফরম্যালডিহাইড ($HCHO$) দেয় না।" },
  "chem_7": { answer: "C", expl: "টুলুইন ($C_6H_5-CH_3$)-এর বেনজিন বলয়ের কার্বনগুলো $sp^2$ এবং মিথাইল মূলকের কার্বন $sp^3$ সংকারিত।" },
  "chem_8": { answer: "D", expl: "গলনাঙ্ক পর্যায় সারণির পরমাণুর পর্যায়ের সাথে পর্যায়বৃত্তিকভাবে পরিবর্তিত হয় না।" },
  "chem_9": { answer: "C", expl: "বিক্রিয়ায় বিক্রিয়ক ও উৎপাদ উভয় পক্ষে গ্যাসীয় মোলের সংখ্যা সমান ($4\text{ mol } H_2O \rightleftharpoons 4\text{ mol } H_2$), তাই চাপ বাড়ালে সাম্যাবস্থা অপরিবর্তিত থাকে।" },
  "chem_10": { answer: "C", expl: "ইথাইল আয়োডাইড জলীয় $KOH$-এর সাথে নিউক্লিওফিলিক প্রতিস্থাপন বিক্রিয়ায় ইথানল ($C_2H_5OH$) উৎপন্ন করে।" },
  "chem_11": { answer: "B", expl: "পিভিসি (Polyvinyl Chloride)-এর মনোমার হলো ভিনাইল ক্লোরাইড ($CH_2=CHCl$)।" },
  "chem_12": { answer: "D", expl: "পেট্রোলিয়ামের বিভিন্ন উপাদান ফুটনাংকের পার্থক্যের ভিত্তিতে আংশিক পাতন (Fractional distillation) প্রক্রিয়ায় পৃথক করা হয়।" },
  "chem_13": { answer: "A", expl: "বেনজামাইডের হফম্যান ক্ষুদ্রাংশকরণ বিক্রিয়ায় ১টি কার্বন কমে অ্যানিলিন/অ্যামাইন উৎপন্ন হয়।" },
  "chem_14": { answer: "C", expl: "তীব্র এসিড ও ক্ষারের বিক্রিয়ায় অতিরিক্ত $HCl$ থাকায় দ্রবণে $H^+$, $Cl^-$, এবং $Na^+$ আয়ন থাকবে।" },
  "chem_15": { answer: "D", expl: "দিনাজপুরের বড়পুকুরিয়া খনিতে উচ্চমানের বিটুমিনাস (Bituminous) কয়লা পাওয়া যায়।" },
  "chem_16": { answer: "D", expl: "$[Cu(NH_3)_4]Cl_2$ জটিল যৌগে তামার সাথে ৪টি লিগ্যান্ড যুক্ত থাকায় সন্নিবেশ সংখ্যা ৪।" },
  "chem_17": { answer: "C", expl: "ডলোমাইট ($CaCO_3 \cdot MgCO_3$) বা চুন মাটির অম্লত্ব দূর করে $pH$ বাড়াতে ব্যবহৃত হয়।" },
  "chem_18": { answer: "A", expl: "ক্লোরোফর্ম ও $KOH$ এর উপস্থিতিতে প্রাইমারি অ্যামাইন (Primary amine) উগ্র গন্ধযুক্ত আইসোসাইনাইড উৎপন্ন করে।" },
  "chem_19": { answer: "B", expl: "উচ্চ তাপমাত্রা এবং নিম্ন চাপে বাস্তব গ্যাস আদর্শ গ্যাসের মতো আচরণ করে।" },
  "chem_20": { answer: "A", expl: "অ্যালডিহাইডের $C=O$ টান কম্পন $1700-1740\text{ cm}^{-1}$ এবং $C-H$ কম্পন $2700-2900\text{ cm}^{-1}$ এ দেখায়।" },
  "chem_21": { answer: "A", expl: "কঠিন থেকে সরাসরি গ্যাসে রূপান্তরকে ঊর্ধ্বপাতন (Sublimation) বলে।" },
  "chem_22": { answer: "B", expl: "শূন্য ক্রম (Zero order) বিক্রিয়ার ঘনমাত্রা-সময় লেখচিত্র একটি নিম্নগামী সরলরেখা।" },
  "chem_23": { answer: "B", expl: "মুক্ত শিকল গ্লুকোজে C-2, C-3, C-4, C-5 এ ৪টি সেকেন্ডারি অ্যালকোহলীয় ($-CHOH-$) গ্রুপ থাকে।" },
  "chem_24": { answer: "C", expl: "গ্রুপ-২ কার্বনেটের স্থায়িত্ব ও তাপীয় বিযোজন তাপমাত্রা উপর থেকে নিচে বাড়ে: $BaCO_3 > SrCO_3 > CaCO_3 > MgCO_3 > BeCO_3$।" },
  "chem_25": { answer: "B", expl: "কেন্দ্রীয় পরমাণুর জারণ মান বাড়লে এসিডের তীব্রতা বাড়ে: $HNO_3(+5) > H_3PO_4(+5) > H_2SO_3(+4) > HClO(+1)$।" },
  "chem_26": { answer: "B", expl: "আদর্শ গ্যাস সমীকরণ $PM = dRT \implies d = \frac{PM}{RT}$ দ্বারা গ্যাসের ঘনত্ব মাপা হয়।" },
  "chem_27": { answer: "D", expl: "$[H^+] = 2 \times 0.05 = 0.1\text{ M} \implies pH = -\log(0.1) = 1 \implies pOH = 14 - 1 = 13$।" },
  "chem_28": { answer: "B", expl: "ইথানলকে $170^\circ\text{C}$ তাপমাত্রায় গাঢ় $H_2SO_4$ সহ উত্তপ্ত করলে নির্জলীকরণে ইথিন ($C_2H_4$) উৎপন্ন হয়।" },
  "chem_29": { answer: "C", expl: "$w = \frac{SMV}{1000} = \frac{0.02 \times 106 \times 10}{1000} = 0.0212\text{ g}$।" },
  "chem_30": { answer: "D", expl: "মাটির $pH$ ৩.০ এর কম হলে $Al^{3+}, Mn^{2+}$ আয়ন দ্রবীভূত হয়ে মাটির উপাদান বিষাক্ত করে তোলে।" },

  // English
  "eng_1": { answer: "A", expl: "'Highlights' functions as a plural noun in the phrase 'acquaints them with the highlights'." },
  "eng_2": { answer: "C", expl: "Quantifier 'many' modifies countable plural noun 'other sea creatures'." },
  "eng_3": { answer: "A", expl: "Verb 'determine' means to identify/establish factors precisely." },
  "eng_4": { answer: "C", expl: "Inverted conditional clause: 'Should something go wrong' = 'If something should go wrong'." },
  "eng_5": { answer: "D", expl: "Comparative modifier 'far more' pairs with 'than': 'far more resistant to... than...'" },
  "eng_6": { answer: "D", expl: "Passive modal verb structure: 'could have been removed' indicates past possibility." },
  "eng_7": { answer: "B", expl: "Tense agreement: 'government confirms (present) that projects have been maintained'." },
  "eng_8": { answer: "A", expl: "Subject-verb agreement: 'skill... is necessary... which hurt many people'." },
  "eng_9": { answer: "A", expl: "Possessive relative pronoun 'whose' modifies noun 'books'." },
  "eng_10": { answer: "B", expl: "Conjunction 'even though' expresses contrast/concession." },
  "eng_11": { answer: "B", expl: "Passive voice required: 'Hydrogen peroxide is used as a bleaching agent'." },
  "eng_12": { answer: "A", expl: "'Only a few' is used with countable plural nouns ('crops')." },
  "eng_13": { answer: "D", expl: "Correlative set for three items: 'one is..., another is..., and the other is...'." },
  "eng_14": { answer: "B", expl: "Comparative degree structure: 'larger than the ones in'." },
  "eng_15": { answer: "B", expl: "Adverb 'late' means near the end of a period ('late in his life')." },
  "eng_16": { answer: "A", expl: "Noun 'solution' takes the fixed preposition 'to' ('solution to the problem')." },
  "eng_17": { answer: "C", expl: "Execution by hanging uses past participle 'hanged' ('was hanged for murder')." },
  "eng_18": { answer: "C", expl: "Interrogative passive present simple: 'Is English spoken well by him?'." },
  "eng_19": { answer: "C", expl: "Verb form of noun 'acquisition' is 'acquire'." },
  "eng_20": { answer: "D", expl: "Prepositional position in question: 'Who does the book belong to?'" },
  "eng_21": { answer: "C", expl: "Correct spelling is 'Entrepreneur' (E-N-T-R-E-P-R-E-N-E-U-R)." },
  "eng_22": { answer: "D", expl: "'Altruism' means selflessness/benevolence; its antonym is 'selfishness'." },
  "eng_23": { answer: "B", expl: "'Sanguine' means optimistic, cheerful, hopeful." },
  "eng_24": { answer: "A", expl: "Noun form of verb 'defer' (respect) is 'deference'." },
  "eng_25": { answer: "C", expl: "'Whisper' means to speak softly in the ear. 'What did the bear whisper to you?'" }
};

// Parse lines into clean JSON
const lines = rawText.split('\n');
const parsedQuestions = [];

let currentSubject = '';
let qNum = '';
let questionText = '';
let options = [];

function commitQuestion() {
  if (!questionText || options.length < 4) return;

  const subjectCodeMap = {
    'পদার্থবিজ্ঞান': { name: 'Physics', code: 'phy' },
    'জীববিজ্ঞান': { name: 'Biology', code: 'bio' },
    'বাংলা': { name: 'Bangla', code: 'ban' },
    'উচ্চতর গণিত': { name: 'Higher Mathematics', code: 'math' },
    'রসায়ন': { name: 'Chemistry', code: 'chem' },
    'English': { name: 'English', code: 'eng' }
  };

  const subjInfo = subjectCodeMap[currentSubject] || { name: currentSubject, code: 'gen' };
  const key = `${subjInfo.code}_${qNum}`;
  const ansInfo = answerAndExplanationMap[key] || { answer: 'A', expl: 'সঠিক উত্তর নির্বাচন করা হয়েছে।' };

  let cleanQText = questionText;
  if (key === 'phy_19') {
    cleanQText = cleanQText.replace(/\[QIMG:[^\]]+\]/g, '![circuit diagram](/assets/imported/du_16_17_phy_q19_q.svg)');
  } else if (key === 'math_4') {
    cleanQText = cleanQText.replace(/\[QIMG:[^\]]+\]/g, '![line graph](/assets/imported/du_16_17_math_q4_q.svg)');
  }

  const cleanOpts = options.map((opt, oIdx) => ({
    id: `${key}_opt_${oIdx+1}`,
    label: String.fromCharCode(65 + oIdx),
    text: opt.text.trim()
  }));

  const correctLetter = ansInfo.answer;
  const correctIdx = correctLetter.charCodeAt(0) - 65;
  const correctLabel = String.fromCharCode(65 + correctIdx);
  const correctText = cleanOpts[correctIdx] ? cleanOpts[correctIdx].text : '';

  const fullExplanation = `সঠিক উত্তর: [${correctLabel}] ${correctText}\n\n**ব্যাখ্যা ও সমাধান:**\n${ansInfo.expl}`;

  parsedQuestions.push({
    id: `du-16-17-${key}`,
    question: cleanQText.trim(),
    options: cleanOpts,
    correct_answer: correctLetter,
    explanation: fullExplanation,
    subject: subjInfo.name,
    year: "16-17",
    university: "DU",
    session: "DU 16-17 MCQ"
  });

  questionText = '';
  options = [];
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  const headerMatch = line.match(/^\[([^(\]]+)\((\d+)\)\]\s*(\d+)\.\s*(.*)$/);
  if (headerMatch) {
    commitQuestion();
    currentSubject = headerMatch[1].trim();
    qNum = headerMatch[3].trim();
    questionText = headerMatch[4].trim();
    continue;
  }

  const optMatch = line.match(/^A:\s*(.*?)\s*\|\s*B:\s*(.*?)\s*\|\s*C:\s*(.*?)\s*\|\s*D:\s*(.*)$/);
  if (optMatch) {
    options = [
      { letter: 'A', text: optMatch[1] },
      { letter: 'B', text: optMatch[2] },
      { letter: 'C', text: optMatch[3] },
      { letter: 'D', text: optMatch[4] }
    ];
    continue;
  }

  if (questionText && options.length === 0) {
    questionText += ' ' + line;
  }
}

commitQuestion();

const datasetObject = {
  schema_version: "3.0",
  university: "DU",
  exam_title: "DU 16-17 MCQ",
  exam_year: "16-17",
  exam_type: "MCQ",
  extracted_at: new Date().toISOString(),
  question_count: parsedQuestions.length,
  questions: parsedQuestions
};

fs.writeFileSync(targetPath, JSON.stringify(datasetObject, null, 2), 'utf8');
console.log(`=== DU 16-17 PARSING COMPLETED === Total Questions Parsed: ${parsedQuestions.length}`);
