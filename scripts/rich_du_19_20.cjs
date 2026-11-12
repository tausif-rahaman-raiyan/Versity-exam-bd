/**
 * scripts/rich_du_19_20.cjs
 * Comprehensive, step-by-step bilingual explanations for DU 19-20 MCQ (90 questions)
 * Blocks:
 * 1. Physics (Q1 - Q15)
 * 2. Chemistry (Q16 - Q30)
 * 3. Mathematics (Q31 - Q45)
 * 4. Biology (Q46 - Q60)
 * 5. Bangla (Q61 - Q75)
 * 6. English (Q76 - Q90)
 */

const solutions19_20 = [
  // Physics (1 - 15)
  {
    num: 1,
    ans: 'ক',
    exp: 'দুটি ভেক্টর $\\vec{A}$ এবং $\\vec{B}$ এর মধ্যবর্তী কোণ $\\theta$ হলে ডট গুণফলের সূত্র:\n$\\vec{A} \\cdot \\vec{B} = |\\vec{A}| |\\vec{B}| \\cos\\theta \\implies \\cos\\theta = \\dfrac{\\vec{A} \\cdot \\vec{B}}{|\\vec{A}| |\\vec{B}|}$\nপ্রদত্ত ভেক্টরদ্বয়:\n$\\vec{A} = 3\\hat{i} - 3\\hat{j}$\n$\\vec{B} = 5\\hat{i} + 5\\hat{k}$\n১. ডট গুণফল:\n$\\vec{A} \\cdot \\vec{B} = (3)(5) + (-3)(0) + (0)(5) = 15$।\n২. মানদ্বয় নির্ণয়:\n$|\\vec{A}| = \\sqrt{3^2 + (-3)^2} = \\sqrt{9 + 9} = \\sqrt{18} = 3\\sqrt{2}$\n$|\\vec{B}| = \\sqrt{5^2 + 5^2} = \\sqrt{25 + 25} = \\sqrt{50} = 5\\sqrt{2}$\n৩. গুণফল:\n$|\\vec{A}| |\\vec{B}| = (3\\sqrt{2})(5\\sqrt{2}) = 15 \\times 2 = 30$।\n৪. কোণ নির্ণয়:\n$\\cos\\theta = \\dfrac{15}{30} = \\dfrac{1}{2} = \\cos 60^\\circ \\implies \\theta = 60^\\circ$।\nঅতএব ভেক্টরদ্বয়ের মধ্যবর্তী কোণ হলো $60^\\circ$। সঠিক উত্তর হলো [ক] $60^\\circ$।\n||EN|| Dot product $\\vec{A} \\cdot \\vec{B} = 15$. Magnitudes are $|\\vec{A}| = 3\\sqrt{2}$ and $|\\vec{B}| = 5\\sqrt{2}$, giving $|A||B| = 30$. Thus $\\cos\\theta = 15/30 = 1/2 \\implies \\theta = 60^\\circ$.'
  },
  {
    num: 2,
    ans: 'খ',
    exp: 'বিস্ফোরণের পূর্বে বস্তুটি স্থির অবস্থায় থাকায় আদি ভরবেগ শূন্য ছিল ($P_{\\text{initial}} = 0$)।\nভরবেগের নিত্যতা সূত্রানুসারে বিস্ফোরণের পরেও মোট ভরবেগ সংরক্ষিত থাকবে ($P_{\\text{final}} = P_{\\text{initial}} = 0$):\n$m_1 v_1 + m_2 v_2 = 0$\n$\\implies m_1 v_1 = -m_2 v_2$\nউভয়পক্ষের বেগের অনুপাত নিলে পাই:\n$\\dfrac{v_1}{v_2} = -\\dfrac{m_2}{m_1}$।\n(ঋণাত্মক চিহ্নটি নির্দেশ করে যে কণা দুটি পরস্পরের বিপরীত অভিমুখে গতিশীল)।\nঅতএব বেগের অনুপাত হলো $-\\dfrac{m_2}{m_1}$। সঠিক উত্তর হলো [খ] $-\\dfrac{m_2}{m_1}$।\n||EN|| By conservation of linear momentum from rest, $m_1 v_1 + m_2 v_2 = 0 \\implies \\dfrac{v_1}{v_2} = -\\dfrac{m_2}{m_1}$.'
  },
  {
    num: 3,
    ans: 'গ',
    exp: 'একক বিশ্লেষণ:\n১. $\\text{MeV}$ (Mega electron-volt) হলো শক্তির একক ($1\\text{ MeV} = 1.6 \\times 10^{-13}\\text{ J}$)। এটি সরাসরি ভরের একক নয় (ভরের একক হিসেবে $\\text{MeV}/c^2$ ব্যবহৃত হয়)।\n২. $\\text{amu}$ (Atomic mass unit) পারমাণবিক ভরের প্রমিত একক।\n৩. বলের সূত্র $F = ma \\implies m = \\dfrac{F}{a}$ অনুসারে ভরের একক $\\text{N}\\cdot(\\text{m/s}^2)^{-1} = \\text{N}\\cdot\\text{m}^{-1}\\cdot\\text{s}^2$ একটি সঠিক ভরের একক।\nঅতএব $\\text{MeV}$ ভরের একক নয়। সঠিক উত্তর হলো [গ] MeV।\n||EN|| $\\text{MeV}$ is fundamentally a unit of energy ($1.6 \\times 10^{-13}\\text{ J}$), whereas mass is measured in $\\text{MeV}/c^2$ or $\\text{amu}$.'
  },
  {
    num: 4,
    ans: 'গ',
    exp: 'কণা দুটির সরল ছন্দিত স্পন্দনের সমীকরণ:\n১ম কণা: $x_1 = A\\sin(\\omega t)$\n২য় কণা: $x_2 = A\\cos(\\omega t)$\nত্রিকোণমিতিক রূপান্তরের মাধ্যমে $x_2$ কে সাইন আকারে প্রকাশ করি:\n$x_2 = A\\sin\\left(\\omega t + \\dfrac{\\pi}{2}\\right)$।\nসুতরাং ১ম কণার দশা হলো $\\phi_1 = \\omega t$ এবং ২য় কণার দশা হলো $\\phi_2 = \\omega t + \\dfrac{\\pi}{2}$।\nঅতএব যেকোনো মুহূর্তে এদের মধ্যকার দশা পার্থক্য (Phase difference):\n$\\Delta\\phi = \\phi_2 - \\phi_1 = \\left(\\omega t + \\dfrac{\\pi}{2}\\right) - \\omega t = \\dfrac{\\pi}{2}$ (বা $90^\\circ$)।\nসঠিক উত্তর হলো [গ] $\\dfrac{\\pi}{2}$।\n||EN|| Rewriting $x_2 = A\\cos(\\omega t) = A\\sin(\\omega t + \\pi/2)$, the phase difference with $x_1 = A\\sin(\\omega t)$ is constant at $\\Delta\\phi = \\pi/2$.'
  },
  {
    num: 5,
    ans: 'খ',
    exp: 'ইয়ং-এর ব্যতিচার পরীক্ষায় এবং গ্রেটিং-এর ক্ষেত্রে গঠনমূলক ব্যতিচার (Constructive interference বা উজ্জ্বল ডোরার) শর্ত হলো:\nচিড়দ্বয় হতে আগত গৌণ তরঙ্গসমূহের পথপার্থক্য আলোকের তরঙ্গদৈর্ঘ্যের ($\\lambda$) পূর্ণ গুণিতক হতে হবে:\n$\\Delta x = a\\sin\\theta = n\\lambda$ (যেখানে $n = 0, 1, 2, 3, \\dots$)।\nঅতএব সঠিক উত্তর হলো [খ] $a\\sin\\theta = n\\lambda$।\n||EN|| The path difference for constructive interference (bright fringe) must be an integral multiple of wavelength: $a\\sin\\theta = n\\lambda$.'
  },
  {
    num: 6,
    ans: 'খ',
    exp: 'প্রদত্ত বর্তনী বিশ্লেষণ:\nবর্তনীতে উৎস ভোল্টেজ $V = 9\\text{ V}$ এবং মোট মূল প্রবাহ $I_{\\text{main}} = 0.6\\text{ A}$।\n১. বর্তনীর শুরুতে শ্রেণিতে যুক্ত $5\\,\\Omega$ রোধের দুই প্রান্তের বিভব পতন:\n$V_5 = I_{\\text{main}} \\times 5 = 0.6\\text{ A} \\times 5\\,\\Omega = 3.0\\text{ V}$।\n২. সমান্তরাল অংশের দুই প্রান্তে অবশিষ্ট বিভব পার্থক্য:\n$V_p = V_{\\text{total}} - V_5 = 9.0\\text{ V} - 3.0\\text{ V} = 6.0\\text{ V}$।\n৩. এই সমান্তরাল অংশে $30\\,\\Omega$ রোধের মধ্য দিয়ে প্রবাহিত তড়িৎপ্রবাহ ($I_2$):\n$I_2 = \\dfrac{V_p}{30\\,\\Omega} = \\dfrac{6.0\\text{ V}}{30\\,\\Omega} = 0.2\\text{ A}$।\n৪. কার্শফের প্রথম সূত্রানুসারে (KCL) সমান্তরাল শাখার মূল প্রবাহ ভাগ হয়:\n$I_{\\text{main}} = I_1 + I_2 \\implies 0.6\\text{ A} = I_1 + 0.2\\text{ A}$\n$\\implies I_1 = 0.6\\text{ A} - 0.2\\text{ A} = 0.4\\text{ A}$।\nঅতএব রোধ $R$ এর মধ্য দিয়ে তড়িৎপ্রবাহ $I_1 = 0.4\\text{ A}$। সঠিক উত্তর হলো [খ] $0.4\\text{ A}$।\n||EN|| Voltage across the $5\\,\\Omega$ series resistor is $0.6 \\times 5 = 3\\text{ V}$, leaving $6\\text{ V}$ across the parallel branches. Current through the $30\\,\\Omega$ resistor is $6/30 = 0.2\\text{ A}$. Hence $I_1 = 0.6 - 0.2 = 0.4\\text{ A}$.'
  },
  {
    num: 7,
    ans: 'গ',
    exp: 'কার্নো ইঞ্জিনের কর্মদক্ষতার সমীকরণ:\n$\\eta = 1 - \\dfrac{T_2}{T_1} = \\dfrac{Q_1 - Q_2}{Q_1} = 1 - \\dfrac{Q_2}{Q_1}$\n$\\implies \\dfrac{Q_2}{Q_1} = \\dfrac{T_2}{T_1} \\implies Q_2 = Q_1 \\left(\\dfrac{T_2}{T_1}\\right)$\nদেওয়া আছে:\nউৎস তাপমাত্রা $T_1 = 500\\text{ K}$, গ্রাহক তাপমাত্রা $T_2 = 250\\text{ K}$\nগৃহীত তাপ $Q_1 = 1000\\text{ cal}$ (বা $1\\text{ kcal}$)\nমান বসিয়ে পাই:\n$Q_2 = 1000\\text{ cal} \\times \\left(\\dfrac{250\\text{ K}}{500\\text{ K}}\\right) = 1000 \\times \\dfrac{1}{2} = 500\\text{ cal}$।\nঅতএব তাপগ্রাহকে বর্জিত তাপের পরিমাণ হলো $500\\text{ cal}$। সঠিক উত্তর হলো [গ] $500\\text{ cal}$।\n||EN|| For a Carnot engine, $Q_2/Q_1 = T_2/T_1$. Heat rejected $Q_2 = 1000\\text{ cal} \\times (250/500) = 500\\text{ cal}$.'
  },
  {
    num: 8,
    ans: 'খ',
    exp: 'ব্যাসার্ধ $r = \\pi\\text{ m}$ বিশিষ্ট বৃত্তাকার পথের মোট পরিধি:\n$s = 2\\pi r = 2\\pi(\\pi) = 2\\pi^2\\text{ m}$।\nগাড়িটি সমদ্রুতি $v = 4\\text{ m/s}$ এ চলছে।\nএকবার সম্পূর্ণ আবর্তন করতে প্রয়োজনীয় সময় (পর্যায়কাল):\n$t = \\dfrac{s}{v} = \\dfrac{2\\pi^2}{4} = \\dfrac{\\pi^2}{2}\\text{ s}$।\nঅতএব সঠিক উত্তর হলো [খ] $\\dfrac{\\pi^2}{2}\\text{ s}$।\n||EN|| Circumference $s = 2\\pi r = 2\\pi^2\\text{ m}$. Time for one complete revolution at speed $4\\text{ m/s}$ is $t = \\dfrac{2\\pi^2}{4} = \\dfrac{\\pi^2}{2}\\text{ s}$.'
  },
  {
    num: 9,
    ans: 'ঘ',
    exp: 'তারের দৈর্ঘ্য বৃদ্ধির সমীকরণ: $\\Delta L = \\dfrac{FL}{AY}$।\nপ্রশ্নমতে, লোহার ও তামার তার দুটির দৈর্ঘ্য ($L$), প্রস্থচ্ছেদের ক্ষেত্রফল ($A$), এবং প্রযুক্ত টান বা বল ($F$) উভয়ই অভিন্ন।\nসুতরাং দৈর্ঘ্য বৃদ্ধি ইয়ং-এর গুণাঙ্কের ব্যস্তানুপাতিক: $\\Delta L \\propto \\dfrac{1}{Y}$।\nলোহার ও তামার দৈর্ঘ্য বৃদ্ধির অনুপাত:\n$\\dfrac{\\Delta L_{\\text{iron}}}{\\Delta L_{\\text{copper}}} = \\dfrac{Y_{\\text{copper}}}{Y_{\\text{iron}}}$\nদেওয়া আছে, লোহার ইয়ং গুণাঙ্ক তামার দ্বিগুণ: $Y_{\\text{iron}} = 2 Y_{\\text{copper}}$:\n$\\implies \\dfrac{\\Delta L_{\\text{iron}}}{\\Delta L_{\\text{copper}}} = \\dfrac{Y_{\\text{copper}}}{2 Y_{\\text{copper}}} = \\dfrac{1}{2}$।\nঅতএব অনুপাত হলো $1 : 2$। সঠিক উত্তর হলো [ঘ] $1 : 2$।\n||EN|| Since $\\Delta L = \\dfrac{FL}{AY} \\propto \\dfrac{1}{Y}$ for identical dimensions and load, $\\dfrac{\\Delta L_{\\text{Fe}}}{\\Delta L_{\\text{Cu}}} = \\dfrac{Y_{\\text{Cu}}}{Y_{\\text{Fe}}} = \\dfrac{1}{2}$.'
  },
  {
    num: 10,
    ans: 'ঘ',
    exp: 'প্রদত্ত নিউক্লীয় বিক্রিয়া:\n$^{27}_{13}\\text{Al} + ^4_2\\text{He} \\rightarrow ^{30}_{14}\\text{Si} + ^A_Z X$\nনিউক্লীয় বিক্রিয়ায় ভর সংখ্যা এবং পারমাণবিক সংখ্যা সংরক্ষিত থাকে:\n১. ভর সংখ্যা সমতা: $27 + 4 = 30 + A \\implies 31 = 30 + A \\implies A = 1$।\n২. পারমাণবিক সংখ্যা সমতা: $13 + 2 = 14 + Z \\implies 15 = 14 + Z \\implies Z = 1$।\nকণাটির ভর সংখ্যা $1$ এবং চার্জ $+1$, যা একটি প্রোটন ($^1_1\\text{p}$ বা $^1_1\\text{H}$)।\nঅতএব অনুপস্থিত কণাটি হলো একটি প্রোটন। সঠিক উত্তর হলো [ঘ] a proton।\n||EN|| Mass balance: $27+4 = 30+A \\implies A=1$. Charge balance: $13+2 = 14+Z \\implies Z=1$. The emitted particle is a proton ($^1_1\\text{p}$).'
  },
  {
    num: 11,
    ans: 'গ',
    exp: 'গাড়ির গতি বিশ্লেষণ:\n১. যাত্রা শুরু: গাড়িটি স্থির অবস্থা (P বিন্দু, অবস্থান $x = 0$) হতে ধনাত্মক অভিমুখে গতি বাড়িয়ে (ত্বরণ) এবং পরে গতি কমিয়ে (মন্দন) এক স্থানে থেমে গেল। এর ফলে সরণ মূলবিন্দু থেকে বৃদ্ধি পেয়ে একটি ধনাত্মক সর্বোচ্চ মানে পৌঁছাল।\n২. প্রত্যাবর্তন: পুনরায় একইভাবে গতি বাড়িয়ে ও কমিয়ে বিপরীত অভিমুখে যাত্রা করে পূর্বের P বিন্দুতেই ফিরে আসল, যার ফলে সরণ পুনরায় শূন্যে নেমে আসল ($x = 0$)।\nসরণ-সময় ($x-t$) লেখচিত্রে এটি একটি বক্ররেখা নির্দেশ করে যা মূলবিন্দু থেকে শুরু হয়ে একটি ধনাত্মক শীর্ষে উঠে আবার সময় অক্ষের (সরণ $= 0$) ওপর ফিরে আসে। এই রূপটি [গ] লেখচিত্রে নিখুঁতভাবে চিত্রিত।\nঅতএব সঠিক উত্তর হলো [গ]।\n||EN|| The car starts from $x=0$, decelerates to a stop at maximum displacement, and reverses back to origin $x=0$. Graph [গ] correctly illustrates displacement returning to zero.'
  },
  {
    num: 12,
    ans: 'গ',
    exp: 'তড়িৎ ও চৌম্বক ক্ষেত্রের সমন্বয়ে গতিশীল আধানের ওপর প্রযুক্ত লরেঞ্জ বলের সমীকরণ হলো:\n$\\vec{F} = q(\\vec{E} + \\vec{v} \\times \\vec{B})$\nএখানে আধানযুক্ত কণাটি চৌম্বক ক্ষেত্রের সমান্তরালে গতিশীল হওয়ায় বেগ $\\vec{v}$ এবং চৌম্বক ক্ষেত্র $\\vec{B}$ এর মধ্যবর্তী কোণ $\\theta = 0^\\circ$।\nচৌম্বক বলের অংশ:\n$\\vec{F}_B = q(\\vec{v} \\times \\vec{B}) = q v B \\sin 0^\\circ = 0$।\nসুতরাং চৌম্বক ক্ষেত্র আধানটির ওপর কোনো বল প্রয়োগ করে না। অতএব আধানটির ওপর প্রযুক্ত লব্ধি বল কেবল তড়িৎ ক্ষেত্র দ্বারা নির্ধারিত হয়:\n$\\vec{F} = q\\vec{E}$।\nসঠিক উত্তর হলো [গ] $q\\vec{E}$।\n||EN|| The Lorentz force is $\\vec{F} = q\\vec{E} + q(\\vec{v} \\times \\vec{B})$. Since $\\vec{v} \\parallel \\vec{B}$, the cross product $\\vec{v} \\times \\vec{B} = 0$, leaving net force $\\vec{F} = q\\vec{E}$.'
  },
  {
    num: 13,
    ans: 'গ',
    exp: 'কাঁচের স্ল্যাবের আপাত পুরুত্ব ও প্রতিসরাঙ্কের সম্পর্ক:\nপ্রতিসরাঙ্ক $\\mu = \\dfrac{\\text{প্রকৃত পুরুত্ব } d}{\\text{আপাত পুরুত্ব } d\'}$\nদেওয়া আছে:\nকাঁচের প্রতিসরাঙ্ক $\\mu = 1.5$ এবং আপাত পুরুত্ব $d\' = 6\\text{ cm}$।\nমান বসিয়ে পাই:\n$d = \\mu \\times d\' = 1.5 \\times 6\\text{ cm} = 9.0\\text{ cm}$।\nঅতএব কাঁচের প্লেটের প্রকৃত পুরুত্ব হলো $9\\text{ cm}$। সঠিক উত্তর হলো [গ] $9\\text{ cm}$।\n||EN|| Real depth $d = \\mu \\times d\' = 1.5 \\times 6\\text{ cm} = 9\\text{ cm}$.'
  },
  {
    num: 14,
    ans: 'ক',
    exp: 'একটি ৫ মিটার উঁচু স্তম্ভের শীর্ষ থেকে অনুভূমিকের সাথে $30^\\circ$ কোণে $20\\text{ m/s}$ আদিবেগে বস্তুটি নিক্ষিপ্ত হলো।\nউল্লম্ব আদিবেগ উপাংশ: $v_{0y} = v_0\\sin 30^\\circ = 20 \\times 0.5 = 10\\text{ m/s}$ (উপরের দিকে)।\nভূমি স্তম্ভের শীর্ষ থেকে $5\\text{ m}$ নিচে অবস্থিত হওয়ায় মোট উল্লম্ব সরণ: $y = -5\\text{ m}$।\nগতির সমীকরণ: $y = v_{0y} t - \\dfrac{1}{2}gt^2$\n$\\implies -5 = 10t - 4.9t^2 \\implies 4.9t^2 - 10t - 5 = 0$।\nদ্বিঘাত সমীকরণ সমাধানের সূত্রানুসারে ধনাত্মক সময় $t$:\n$t = \\dfrac{-(-10) + \\sqrt{(-10)^2 - 4(4.9)(-5)}}{2(4.9)} = \\dfrac{10 + \\sqrt{100 + 98}}{9.8} = \\dfrac{10 + \\sqrt{198}}{9.8}\\text{ s}$।\nঅতএব সঠিক উত্তর হলো [ক] $\\dfrac{10+\\sqrt{198}}{9.8}\\text{ s}$।\n||EN|| Vertical displacement equation $-5 = 20\\sin 30^\\circ t - 4.9t^2 \\implies 4.9t^2 - 10t - 5 = 0$ gives $t = \\dfrac{10+\\sqrt{198}}{9.8}\\text{ s}$.'
  },
  {
    num: 15,
    ans: 'ঘ',
    exp: 'স্থির তরঙ্গের (Standing wave) বৈশিষ্ট্যানুসারে:\nপরপর দুটি নিস্পন্দ বিন্দুর (Nodes) মধ্যবর্তী দূরত্ব হলো ঠিক অর্ধেক তরঙ্গদৈর্ঘ্য ($\\lambda/2$):\n$\\dfrac{\\lambda}{2} = 1\\text{ m} \\implies \\lambda = 2 \\times 1\\text{ m} = 2\\text{ m}$।\nসেন্টিমিটারে রূপান্তর করলে:\n$\\lambda = 2 \\times 100\\text{ cm} = 200\\text{ cm}$।\nঅতএব তরঙ্গটির তরঙ্গদৈর্ঘ্য হলো $200\\text{ cm}$। সঠিক উত্তর হলো [ঘ] $200\\text{ cm}$।\n||EN|| Distance between consecutive nodes is $\\lambda/2 = 1\\text{ m} \\implies \\lambda = 2\\text{ m} = 200\\text{ cm}$.'
  },

  // Chemistry (16 - 30)
  {
    num: 16,
    ans: 'ক',
    exp: 'প্রদত্ত তড়িৎ রাসায়নিক কোষ সংকেত:\n$\\text{Fe}(s) \\,|\\, \\text{Fe}^{2+}(aq) \\,||\\, \\text{Br}_2(l) \\,;\\, \\text{Br}^-(aq) \\,|\\, \\text{Pt}(s)$\nকোষের অর্ধ-বিক্রিয়াসমূহ:\n১. অ্যানোড জারণ অর্ধ-বিক্রিয়া (বাম প্রান্তে):\n$\\text{Fe}(s) \\rightarrow \\text{Fe}^{2+}(aq) + 2e^-$\n২. ক্যাথোড বিজারণ অর্ধ-বিক্রিয়া (ডান প্রান্তে):\n$\\text{Br}_2(l) + 2e^- \\rightarrow 2\\text{Br}^-(aq)$\nউভয় অর্ধ-বিক্রিয়া যোগ করে সামগ্রিক কোষ বিক্রিয়া পাই:\n$\\text{Fe} + \\text{Br}_2 \\rightarrow \\text{Fe}^{2+} + 2\\text{Br}^-$\nঅতএব সঠিক কোষ বিক্রিয়াটি হলো: $\\text{Fe} + \\text{Br}_2 \\rightarrow \\text{Fe}^{2+} + 2\\text{Br}^-$ (সঠিক উত্তর [ক])।\n||EN|| Anode oxidation: $\\text{Fe} \\rightarrow \\text{Fe}^{2+} + 2e^-$. Cathode reduction: $\\text{Br}_2 + 2e^- \\rightarrow 2\\text{Br}^-$. Overall: $\\text{Fe} + \\text{Br}_2 \\rightarrow \\text{Fe}^{2+} + 2\\text{Br}^-$.'
  },
  {
    num: 17,
    ans: 'ঘ',
    exp: 'লিপিডের বৈশিষ্ট্যমূলক উক্তিগুলো পরীক্ষা করি:\n$i.$ লিপিডের আপেক্ষিক গুরুত্ব ১ এর চেয়ে কম হওয়ায় এটি পানির চেয়ে হালকা এবং পানিতে ভাসে (উক্তি সত্য)।\n$ii.$ রাসায়নিকভাবে সাধারণ লিপিড হলো ফ্যাটি এসিড ও গ্লিসারলের ট্রাই-এস্টার (ট্রাইগ্লিসারাইড) (উক্তি সত্য)।\n$iii.$ স্তন্যপায়ী প্রাণীর অস্থির সন্ধিস্থলে সাইনোভিয়াল ফ্লুইডের অন্যতম উপাদান হিসেবে লিপিড পিচ্ছিলকারক (Lubricant) হিসেবে কাজ করে ঘর্ষণ কমায় (উক্তি সত্য)।\nযেহেতু তিনটি উক্তিই ($i, ii, iii$) সঠিক, তাই সঠিক উত্তর হলো [ঘ] $i, ii \\text{ ও } iii$।\n||EN|| Lipids are lighter than water, esters of glycerol and fatty acids, and serve as lubricants in biological joints; all three statements are correct.'
  },
  {
    num: 18,
    ans: 'খ',
    exp: 'কাগজ ক্রোমাটোগ্রাফি (Paper Chromatography) এর মূল নীতি:\nফিল্টার কাগজের সেলুলোজ তন্তুর সাথে দৃঢ়ভাবে শোষিত পানি স্থির মাধ্যম (Stationary Phase, তরল) হিসেবে থাকে এবং কাগজের ভেতর দিয়ে কৈশিক ক্রিয়ায় প্রবাহিত জৈব দ্রাবক সচল মাধ্যম (Mobile Phase, তরল) হিসেবে কাজ করে। মিশ্রণের উপাদানগুলো দুটি তরল মাধ্যমের মধ্যে তাদের দ্রাব্যতা ও বণ্টন সহগ (Partition coefficient) অনুযায়ী পৃথক হয়। তাই এটি একটি **তরল-তরল পার্টিশন ক্রোমাটোগ্রাফি**। অতএব সঠিক উত্তর হলো [খ] তরল-তরল।\n||EN|| Paper chromatography acts primarily via partition between water bound to cellulose (liquid stationary phase) and the running solvent (liquid mobile phase).'
  },
  {
    num: 19,
    ans: 'গ',
    exp: 'এমআরআই (Magnetic Resonance Imaging / MRI) প্রযুক্তির মূল ভিত্তি:\nমানবদেহের ওজনের প্রায় ৬৫-৭০% পানি এবং চর্বিতে প্রচুর পরিমাণে হাইড্রোজেন পরমাণু রয়েছে। সাধারণ হাইড্রোজেনের নিউক্লিয়াসে একটিমাত্র প্রোটন থাকে যার একটি নিজস্ব স্পিন ও চৌম্বক ভ্রামক বিদ্যমান। শক্তিশালী বাহ্যিক চৌম্বক ক্ষেত্রে এই হাইড্রোজেন প্রোটনসমূহের **নিউক্লীয় চৌম্বক অনুরণন (Nuclear Magnetic Resonance / NMR)** ঘটিয়ে রেডিও ফ্রিকোয়েন্সি সিগন্যালের মাধ্যমে ত্রিমাত্রিক নিখুঁত অভ্যন্তরীণ প্রতিবিম্ব তৈরি করা হয়। অতএব ব্যবহৃত মূল কণা হলো হাইড্রোজেন পরমাণুর প্রোটন। সঠিক উত্তর হলো [গ] হাইড্রোজেন পরমাণুর প্রোটন।\n||EN|| MRI is based on the nuclear magnetic resonance (NMR) behavior of hydrogen ($^1\\text{H}$) protons abundant in body water and fats.'
  },
  {
    num: 20,
    ans: 'গ',
    exp: 'ক্যালসিয়াম কার্বাইডের আর্দ্রবিশ্লেষণ:\nকঠিন ক্যালসিয়াম কার্বাইডে ($\\text{CaC}_2$) সাধারণ কক্ষ তাপমাত্রায় পানি যোগ করলে তীব্রভাবে বিক্রিয়া ঘটে ক্যালসিয়াম হাইড্রোক্সাইড ও অসম্পৃক্ত হাইড্রোকার্বন গ্যাস **ইথাইন (Ethyne বা অ্যাসিটিলিন, $\\text{C}_2\\text{H}_2$)** উৎপন্ন হয়:\n$\\text{CaC}_2 + 2\\text{H}_2\\text{O} \\rightarrow \\text{Ca(OH)}_2 + \\text{CH}\\equiv\\text{CH}\\uparrow$ (ইথাইন)।\nঅতএব সঠিক উত্তর হলো [গ] ইথাইন।\n||EN|| Hydrolysis of calcium carbide produces ethyne (acetylene): $\\text{CaC}_2 + 2\\text{H}_2\\text{O} \\rightarrow \\text{Ca(OH)}_2 + \\text{C}_2\\text{H}_2$.'
  },
  {
    num: 21,
    ans: 'খ',
    exp: 'সহকারী কোয়ান্টাম সংখ্যা $l$ এর মান অরবিটালের আকৃতি নির্দেশ করে:\n• $l = 0 \\implies s$ অরবিটাল\n• $l = 1 \\implies p$ অরবিটাল\n• $l = 2 \\implies d$ অরবিটাল\n• $l = 3 \\implies f$ অরবিটাল\nএখানে প্রধান কোয়ান্টাম সংখ্যা $n = 4$ এবং সহকারী কোয়ান্টাম সংখ্যা $l = 1$ দেওয়া আছে। সুতরাং এটি নির্দেশ করে **$4p$ অরবিটাল** (বা $p$-অরবিটাল)। সঠিক উত্তর হলো [খ] p orbital।\n||EN|| The orbital quantum number $l=1$ denotes a $p$ orbital. For $n=4, l=1$, the designation is $4p$.'
  },
  {
    num: 22,
    ans: 'ঘ',
    exp: 'হীরা ও গ্রাফাইট উভয়ই কার্বনের বহুরূপী (Allotropes) হলেও এদের অভ্যন্তরীণ কেলাস গঠন ও বন্ধন শক্তি ভিন্ন:\n• গ্রাফাইটে প্রতিটি কার্বনে $sp^2$ সংকরায়ন এবং স্তরীভূত গঠন রয়েছে। এর প্রমাণ গঠন এনথ্যালপি শূন্য ধরা হয়। গ্রাফাইটের দহন তাপ $\\Delta H_{\\text{comb}} = -393.5\\text{ kJ/mol}$।\n• হীরাতে প্রতিটি কার্বনে $sp^3$ সংকরায়ন এবং ত্রিমাত্রিক টেট্রাহেড্রাল দৃঢ় জালিকা রয়েছে। হীরার দহন তাপ $\\Delta H_{\\text{comb}} = -395.4\\text{ kJ/mol}$।\nযেহেতু অভ্যন্তরীণ গঠন এনথ্যালপি ভিন্ন, তাই এদের দহন তাপ কখনো সমান হতে পারে না। সুতরাং Option [ঘ] "এদের দহন তাপ সমান" উক্তিটি সত্য নয়। অতএব সঠিক উত্তর হলো [ঘ]।\n||EN|| Diamond and graphite have different lattice energies and standard enthalpies; thus their molar heats of combustion are unequal ($-395.4$ vs $-393.5\\text{ kJ/mol}$).'
  },
  {
    num: 23,
    ans: 'ঘ',
    exp: 'ল্যাবরেটরিতে এসিড সনাক্তকরণ পরীক্ষা:\nসালফিউরিক এসিড ($\\text{H}_2\\text{SO}_4$) এবং নাইট্রিক এসিডের ($\\text{HNO}_3$) মধ্যে পার্থক্য করতে বেরিয়াম নাইট্রেট $\\text{Ba(NO}_3)_2$ দ্রবণ ব্যবহার করা হয়:\n১. $\\text{H}_2\\text{SO}_4$ দ্রবণে $\\text{Ba(NO}_3)_2$ যোগ করলে অজৈব এসিডে অদ্রবণীয় সাদা রঙের বেরিয়াম সালফেটের ভারী অধঃক্ষেপ পড়ে:\n$\\text{H}_2\\text{SO}_4 + \\text{Ba(NO}_3)_2 \\rightarrow \\text{BaSO}_4\\downarrow + 2\\text{HNO}_3$।\n২. কিন্তু নাইট্রিক এসিডে কোনো সাধারণ আয়ন প্রতিক্রিয়া না ঘটায় কোনো অধঃক্ষেপ পড়ে না।\nঅতএব সঠিক উত্তর হলো [ঘ] $\\text{Ba(NO}_3)_2$।\n||EN|| $\\text{Ba(NO}_3)_2$ yields a distinct insoluble white precipitate of $\\text{BaSO}_4$ with sulfuric acid, but produces no precipitation with nitric acid.'
  },
  {
    num: 24,
    ans: 'খ',
    exp: 'নাইট্রেট মূলকের ($\\text{NO}_3^-$) মোট ইলেকট্রন সংখ্যা হিসাব করি:\n• নাইট্রোজেন পরমাণুতে ইলেকট্রন সংখ্যা ($Z = 7$): $7$\n• ৩টি অক্সিজেন পরমাণুতে ইলেকট্রন সংখ্যা ($3 \\times 8$): $24$\n• ঋণাত্মক চার্জের ($-1$) জন্য অতিরিক্ত ইলেকট্রন: $1$\nমোট ইলেকট্রন সংখ্যা $= 7 + 24 + 1 = 32$টি।\nঅতএব নাইট্রেট অ্যানায়নে মোট ৩২টি ইলেকট্রন রয়েছে। সঠিক উত্তর হলো [খ] ৩২।\n||EN|| Total electrons in $\\text{NO}_3^- = 7 + (3 \\times 8) + 1 = 32$.'
  },
  {
    num: 25,
    ans: 'ক',
    exp: 'জারণ সংখ্যা নির্ণয়:\n১. $\\text{BaMnF}_4$ যৌগে $\\text{Mn}$ এর জারণ সংখ্যা $x$:\n$\\text{Ba} = +2, \\quad \\text{F} = -1$\n$(+2) + x + 4(-1) = 0 \\implies x - 2 = 0 \\implies x = +2$।\n২. $\\text{Li}_2\\text{MgFeF}_6$ যৌগে $\\text{Fe}$ এর জারণ সংখ্যা $y$:\n$\\text{Li} = +1, \\quad \\text{Mg} = +2, \\quad \\text{F} = -1$\n$2(+1) + (+2) + y + 6(-1) = 0$\n$\\implies 2 + 2 + y - 6 = 0 \\implies y - 2 = 0 \\implies y = +2$।\nঅতএব $\\text{Mn}$ ও $\\text{Fe}$ এর জারণ সংখ্যা যথাক্রমে $+2$ এবং $+2$।\nসঠিক উত্তর হলো [ক] $+2, +2$।\n||EN|| For $\\text{BaMnF}_4$, $+2 + x - 4 = 0 \\implies x = +2$. For $\\text{Li}_2\\text{MgFeF}_6$, $2(1) + 2 + y - 6 = 0 \\implies y = +2$. Both are $+2$.'
  },
  {
    num: 26,
    ans: 'ঘ',
    exp: 'কার্বন ডাই-অক্সাইড ($\\text{CO}_2$) একটি অধাতব আম্লিক অক্সাইড। এটি পানিতে দ্রবীভূত হয়ে উভমুখী বিক্রিয়ায় মৃদু কার্বনিক এসিড তৈরি করে যা জলীয় দ্রবণে প্রোটন মুক্ত করে অম্লীয় দ্রবণ সৃষ্টি করে:\n$\\text{CO}_2(g) + \\text{H}_2\\text{O}(l) \\rightleftharpoons \\text{H}_2\\text{CO}_3(aq) \\rightleftharpoons \\text{H}^+(aq) + \\text{HCO}_3^-(aq)$।\nঅতএব এর জলীয় দ্রবণ অম্লীয়। সঠিক উত্তর হলো [ঘ] অম্লীয়।\n||EN|| Carbon dioxide dissolves in water to form weak carbonic acid ($\\text{H}_2\\text{CO}_3$), resulting in an acidic solution.'
  },
  {
    num: 27,
    ans: 'ক',
    exp: 'রসায়ন পরীক্ষাগারে নির্দিষ্ট কোনো আয়তনের (যেমন ঠিক $50\\text{ mL}$) তরল সবচেয়ে সূক্ষ্ম ও যথার্থভাবে স্থানান্তর বা পরিমাপের জন্য **$50\\text{ mL}$ মোলার বা ভলিউমেট্রিক পিপেট (Volumetric Pipette)** ব্যবহার করা হয়। পিপেটের কাঁচনলে একটি সুনির্দিষ্ট অংশাঙ্কন দাগ থাকে যা অত্যন্ত উচ্চ নির্ভুলতা (High precision) প্রদান করে। অতএব সঠিক উত্তর হলো [ক] পিপেট।\n||EN|| A volumetric pipette provides the highest precision and accuracy for dispensing an exact volume ($50\\text{ mL}$) of liquid.'
  },
  {
    num: 28,
    ans: 'ঘ',
    exp: 'জ্যামিতিক সমাণুতা (Geometric Isomerism / Cis-Trans Isomerism) প্রদর্শনের শর্ত:\nকার্বন-কার্বন দ্বিবন্ধনের ঘূর্ণন রহিত হতে হবে এবং দ্বিবন্ধনযুক্ত প্রতিটি কার্বনের সাথে দুটি ভিন্ন পরমাণু বা মূলক যুক্ত থাকতে হবে ($ab\\text{C}=\\text{C}ab$ আকারের)।\nবিউটিন-২ এর গঠন:\n$\\text{CH}_3-\\text{CH}=\\text{CH}-\\text{CH}_3$\nএখানে দ্বিবন্ধনযুক্ত ২য় এবং ৩য় প্রতিটি কার্বনের সাথে একটি হাইড্রোজেন ($-\\text{H}$) এবং একটি মিথাইল মূলক ($-\\text{CH}_3$) যুক্ত রয়েছে। মিথাইল মূলক দুটি দ্বিবন্ধনের একই পাশে থাকলে সিস-বিউটিন-২ এবং বিপরীত পাশে থাকলে ট্রান্স-বিউটিন-২ গঠিত হয়। অতএব সঠিক উত্তর হলো [ঘ] বিউটিন-২।\n||EN|| But-2-ene ($\\text{CH}_3-\\text{CH}=\\text{CH}-\\text{CH}_3$) satisfies the geometric isomerism condition ($ab\\text{C}=\\text{C}ab$) with distinct $-\\text{H}$ and $-\\text{CH}_3$ on each double-bonded carbon.'
  },
  {
    num: 29,
    ans: 'খ',
    exp: 'IUPAC নামকরণের নিয়মাবলী প্রয়োগ করি:\nপ্রদত্ত জৈব যৌগে দীর্ঘতম কার্বন শিকলে মোট ৭টি কার্বন পরমাণু বিদ্যমান (মূল হাইড্রোকার্বন হলো হেপটেন)।\nশিকলের প্রান্ত থেকে প্রতিস্থাপকগুলোর অবস্থান সংখ্যা সর্বনিম্ন করার জন্য বাম প্রান্ত থেকে গণনা শুরু করি:\n• কার্বন-২ এ ক্লোরিন: \'২-ক্লোরো\'\n• কার্বন-৩ এ ব্রোমিন: \'৩-ব্রোমো\'\n• কার্বন-৫ এ মিথাইল: \'৫-মিথাইল\'\nইংরেজি বর্ণানুক্রম (Alphabetical order: bromo $\\rightarrow$ chloro $\\rightarrow$ methyl) অনুযায়ী সাজালে নাম হয়: **৩-ব্রোমো-২-ক্লোরো-৫-মিথাইলহেপটেন** (বা অপশন অনুসারে ২-ক্লোরো-৩-ব্রোমো-৫-মিথাইলহেপটেন)।\nঅতএব সঠিক উত্তর হলো [খ]।\n||EN|| The 7-carbon chain gives heptane. Numbering to minimize substituent locants gives 2-chloro-3-bromo-5-methylheptane.'
  },
  {
    num: 30,
    ans: 'গ',
    exp: 'মোলার ঘনমাত্রা (Molarity) নির্ণয়:\nসালফিউরিক এসিডের ($\\text{H}_2\\text{SO}_4$) আণবিক ভর:\n$M = 2(1) + 32 + 4(16) = 2 + 32 + 64 = 98\\text{ g/mol}$।\nদ্রবণে এসিডের ভর $w = 0.98\\text{ g}$ এবং দ্রবণের আয়তন $V = 1.0\\text{ L}$।\nমোল সংখ্যা:\n$n = \\dfrac{w}{M} = \\dfrac{0.98\\text{ g}}{98\\text{ g/mol}} = 0.01\\text{ mol}$।\nমোলারিটি:\n$S = \\dfrac{n}{V} = \\dfrac{0.01\\text{ mol}}{1.0\\text{ L}} = 0.01\\text{ mol/L} = 0.01\\text{ M}$।\nঅতএব দ্রবণটির মোলার ঘনমাত্রা হলো $0.01\\text{ M}$। সঠিক উত্তর হলো [গ] $0.01\\text{ M}$।\n||EN|| Moles $n = 0.98/98 = 0.01\\text{ mol}$. Volume $V = 1.0\\text{ L}$. Molarity $= 0.01/1.0 = 0.01\\text{ M}$.'
  },

  // Mathematics (31 - 45)
  {
    num: 31,
    ans: 'খ',
    exp: '$[0, 2]$ ব্যবধিতে $y = x - 1$ সরলরেখা এবং $x$-অক্ষ দ্বারা আবদ্ধ জ্যামিতিক ক্ষেত্রফল নির্ণয়:\nলক্ষ্য করি, $x = 1$ বিন্দুতে রেখাটি $x$-অক্ষকে ছেদ করে ($y = 0$):\n• $0 \\le x < 1$ অংশে $y < 0$ (রেখাটি অক্ষের নিচে অবস্থান করে)।\n• $1 < x \\le 2$ অংশে $y > 0$ (রেখাটি অক্ষের উপরে অবস্থান করে)।\nযেহেতু ক্ষেত্রফল সর্বদা অঋণাত্মক পরম মান নির্দেশ করে, তাই আবদ্ধ মোট ক্ষেত্রফল প্রকাশের সঠিক সমাকলন রূপ হলো:\n$\\text{ক্ষেত্রফল} = \\int_0^2 |x - 1|\\,dx = \\int_0^1 (1-x)\\,dx + \\int_1^2 (x-1)\\,dx = \\dfrac{1}{2} + \\dfrac{1}{2} = 1$ বর্গ একক।\nঅতএব সঠিক উত্তর হলো [খ] $\\int_0^2 |x-1|\\,dx$।\n||EN|| The geometric area between $y = x-1$ and the x-axis on $[0, 2]$ is given by $\\int_0^2 |x-1|\\,dx$.'
  },
  {
    num: 32,
    ans: 'ঘ',
    exp: 'প্রদত্ত ফাংশন দুটি:\n$f(x) = x^2 - 2|x|$\n$g(x) = x^2 + 1$\n১ম ধাপ: $f(-2)$ এর মান নির্ণয় করি:\n$|-2| = 2$\n$f(-2) = (-2)^2 - 2|-2| = 4 - 2(2) = 4 - 4 = 0$।\n২য় ধাপ: সংযোজিত ফাংশন $g(f(-2))$ এর মান নির্ণয় করি:\n$g(f(-2)) = g(0) = (0)^2 + 1 = 0 + 1 = 1$।\nঅতএব সঠিক উত্তর হলো [ঘ] $1$।\n||EN|| $f(-2) = (-2)^2 - 2|-2| = 4 - 4 = 0$. Then $g(f(-2)) = g(0) = 0^2 + 1 = 1$.'
  },
  {
    num: 33,
    ans: 'খ',
    exp: 'ভেক্টর $\\vec{b}$ বরাবর ভেক্টর $\\vec{a}$ এর ভেক্টর উপাংশের (Vector Component) সূত্র:\n$\\text{উপাংশ ভেক্টর} = \\left( \\dfrac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|^2} \\right) \\vec{b}$\nপ্রদত্ত ভেক্টরদ্বয়:\n$\\vec{a} = 2\\hat{i} - 2\\hat{j} + \\hat{k}$\n$\\vec{b} = 6\\hat{i} + 7\\hat{j} - 6\\hat{k}$\n১. ডট গুণফল:\n$\\vec{a} \\cdot \\vec{b} = (2)(6) + (-2)(7) + (1)(-6) = 12 - 14 - 6 = -8$।\n২. $|\\vec{b}|^2$ এর মান:\n$|\\vec{b}|^2 = 6^2 + 7^2 + (-6)^2 = 36 + 49 + 36 = 121$।\n৩. সূত্রে মান বসিয়ে পাই:\n$\\text{উপাংশ} = \\left( \\dfrac{-8}{121} \\right) \\vec{b} = -\\dfrac{8}{121}\\vec{b}$।\nঅতএব সঠিক উত্তর হলো [খ] $-\\dfrac{8}{121}\\vec{b}$।\n||EN|| The vector component of $\\vec{a}$ along $\\vec{b}$ is $\\left(\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|^2}\\right)\\vec{b} = \\dfrac{-8}{121}\\vec{b}$.'
  },
  {
    num: 34,
    ans: 'গ',
    exp: '\'Geometry\' শব্দটিতে মোট ৮টি বর্ণ রয়েছে: G, e, o, m, e, t, r, y।\nএর মধ্যে ২টি \'e\' রয়েছে এবং বাকি ৬টি বর্ণ (G, o, m, t, r, y) সম্পূর্ণ ভিন্ন।\nশর্তানুসারে, বিন্যাসের প্রথম ও শেষ স্থানে অবশ্যই \'e\' অক্ষরটি বসবে।\nযেহেতু দুটি \'e\' সম্পূর্ণ সদৃশ (Identical), তাই প্রান্তীয় দুটি স্থানে তাদের বসানোর উপায় কেবল ১টি ($\\dfrac{2!}{2!} = 1$)!\nএখন মাঝের অবশিষ্ট ৬টি ভিন্ন ভিন্ন স্থান ৬টি ভিন্ন বর্ণ দ্বারা নিজেদের মধ্যে সাজানো যায়:\n$6! = 6 \\times 5 \\times 4 \\times 3 \\times 2 \\times 1 = 720$ উপায়ে।\nঅতএব মোট বিন্যাস সংখ্যা $= 1 \\times 720 = 720$।\nসঠিক উত্তর হলো [গ] $720$।\n||EN|| Fixing the two identical \'e\'s at the two ends leaves 6 distinct letters to arrange in the middle, giving $6! = 720$ arrangements.'
  },
  {
    num: 35,
    ans: 'ঘ',
    exp: 'প্রদত্ত অসমতা: $\\dfrac{1}{|3x-1|} > 1$।\nউভয়পক্ষ ধনাত্মক হওয়ায় বিপরীতকরণ (Reciprocal) করলে অসমতার দিক পরিবর্তিত হয়:\n$|3x - 1| < 1$ এবং অবশ্যই $3x - 1 \\ne 0 \\implies x \\ne \\dfrac{1}{3}$ (হর শূন্য হওয়া যাবে না)।\nপরমমানের ধর্ম প্রয়োগ করি:\n$-1 < 3x - 1 < 1$\nপ্রতিটি পক্ষে $1$ যোগ করে পাই:\n$0 < 3x < 2$\n$3$ দ্বারা ভাগ করে পাই:\n$0 < x < \\dfrac{2}{3}$।\nযেহেতু $x \\ne \\dfrac{1}{3}$, তাই এই ব্যবধিটি দুই ভাগে বিভক্ত হয়:\n$\\left(0, \\dfrac{1}{3}\\right) \\cup \\left(\\dfrac{1}{3}, \\dfrac{2}{3}\\right)$।\nঅতএব সঠিক উত্তর হলো [ঘ] $\\left(0, \\dfrac{1}{3}\\right) \\cup \\left(\\dfrac{1}{3}, \\dfrac{2}{3}\\right)$।\n||EN|| $\\dfrac{1}{|3x-1|} > 1 \\iff 0 < |3x-1| < 1$, which gives $-1 < 3x-1 < 1 \\implies 0 < x < 2/3$ with $x \\ne 1/3$. The solution set is $(0, 1/3) \\cup (1/3, 2/3)$.'
  },
  {
    num: 36,
    ans: 'খ',
    exp: 'ম্যাট্রিক্স $A = \\begin{pmatrix} 3 & -4 \\\\ 2 & -3 \\end{pmatrix}$।\n১ম ধাপ: $\\det(A)$ নির্ণয় করি:\n$\\det(A) = (3)(-3) - (-4)(2) = -9 - (-8) = -9 + 8 = -1$।\n২য় ধাপ: বিপরীত ম্যাট্রিক্সের নির্ণায়ক:\n$\\det(A^{-1}) = \\dfrac{1}{\\det(A)} = \\dfrac{1}{-1} = -1$।\n৩য় ধাপ: নির্ণায়কের স্কেলার গুণনের নিয়ম অনুসারে, $n \\times n$ ম্যাট্রিক্সের জন্য $\\det(kM) = k^n \\det(M)$।\nযেহেতু $A$ একটি $2 \\times 2$ ম্যাট্রিক্স ($n = 2$):\n$\\det(2A^{-1}) = 2^2 \\cdot \\det(A^{-1}) = 4 \\times (-1) = -4$।\nঅতএব সঠিক উত্তর হলো [খ] $-4$।\n||EN|| For $2 \\times 2$ matrix $A$, $\\det(A) = -9 - (-8) = -1$. Then $\\det(2A^{-1}) = 2^2 \\det(A^{-1}) = 4(-1) = -4$.'
  },
  {
    num: 37,
    ans: 'খ',
    exp: 'প্রদত্ত জটিল রাশির মডুলাস: $\\left| \\dfrac{1+i}{1-i} \\right|$।\nজটিল সংখ্যার মডুলাসের ধর্ম অনুসারে ভাগফলের মডুলাস হলো মডুলাসদ্বয়ের ভাগফল:\n$\\left| \\dfrac{z_1}{z_2} \\right| = \\dfrac{|z_1|}{|z_2|}$\nএখানে $z_1 = 1 + i$ এবং $z_2 = 1 - i$:\n$|1 + i| = \\sqrt{1^2 + 1^2} = \\sqrt{2}$\n$|1 - i| = \\sqrt{1^2 + (-1)^2} = \\sqrt{2}$\nঅতএব:\n$\\left| \\dfrac{1+i}{1-i} \\right| = \\dfrac{\\sqrt{2}}{\\sqrt{2}} = 1$।\n(বিকল্পভাবে: $\\frac{1+i}{1-i} = \\frac{(1+i)^2}{1 - i^2} = \\frac{2i}{2} = i$, এবং $|i| = 1$)।\nঅতএব সঠিক উত্তর হলো [খ] $1$।\n||EN|| Modulus quotient property: $\\left|\\dfrac{1+i}{1-i}\\right| = \\dfrac{|1+i|}{|1-i|} = \\dfrac{\\sqrt{2}}{\\sqrt{2}} = 1$.'
  },
  {
    num: 38,
    ans: 'ক',
    exp: 'প্রদত্ত সীমা: $L = \\lim_{x \\to -\\infty} \\dfrac{\\sqrt{x^2+2x}}{-x}$।\nযেহেতু $x \\to -\\infty$, তাই $x$ একটি ঋণাত্মক সংখ্যা। চলক প্রতিস্থাপন করি:\nধরি $x = -u$, যেখানে $u > 0$ এবং $u \\to +\\infty$:\n$L = \\lim_{u \\to \\infty} \\dfrac{\\sqrt{(-u)^2 + 2(-u)}}{-(-u)} = \\lim_{u \\to \\infty} \\dfrac{\\sqrt{u^2 - 2u}}{u}$\nলব থেকে $u^2$ কমন নিয়ে বর্গমূলের বাইরে বের করি (যেহেতু $u > 0$, তাই $\\sqrt{u^2} = u$):\n$L = \\lim_{u \\to \\infty} \\dfrac{u \\sqrt{1 - \\dfrac{2}{u}}}{u} = \\lim_{u \\to \\infty} \\sqrt{1 - \\dfrac{2}{u}}$\nযেহেতু $u \\to \\infty$ হলে $\\dfrac{2}{u} \\to 0$:\n$L = \\sqrt{1 - 0} = 1$।\nঅতএব সীমার মান হলো $1$। সঠিক উত্তর হলো [ক] $1$।\n||EN|| Setting $x = -u$ with $u \\to +\\infty$, $\\lim_{u \\to \\infty} \\dfrac{\\sqrt{u^2-2u}}{u} = \\lim_{u \\to \\infty} \\sqrt{1 - 2/u} = 1$.'
  },
  {
    num: 39,
    ans: 'খ',
    exp: 'বৃত্তটির কেন্দ্র $C(4, 3)$ দেওয়া আছে।\nযেহেতু বৃত্তটি $5x - 12y + 3 = 0$ সরলরেখাকে স্পর্শ করে, তাই কেন্দ্র থেকে স্পর্শকের লম্ব দূরত্বই হবে বৃত্তের ব্যাসার্ধ $r$:\n$r = \\dfrac{|5(4) - 12(3) + 3|}{\\sqrt{5^2 + (-12)^2}} = \\dfrac{|20 - 36 + 3|}{\\sqrt{25 + 144}} = \\dfrac{|-13|}{\\sqrt{169}} = \\dfrac{13}{13} = 1$ একক।\nকেন্দ্র $(4, 3)$ এবং ব্যাসার্ধ $r = 1$ বিশিষ্ট বৃত্তের সমীকরণ:\n$(x - 4)^2 + (y - 3)^2 = 1^2$\n$\\implies (x^2 - 8x + 16) + (y^2 - 6y + 9) = 1$\n$\\implies x^2 + y^2 - 8x - 6y + 25 - 1 = 0$\n$\\implies x^2 + y^2 - 8x - 6y + 24 = 0$।\nঅতএব সঠিক উত্তর হলো [খ] $x^2 + y^2 - 8x - 6y + 24 = 0$।\n||EN|| Radius $r = \\dfrac{|5(4) - 12(3) + 3|}{\\sqrt{5^2 + (-12)^2}} = \\dfrac{13}{13} = 1$. Circle equation: $(x-4)^2 + (y-3)^2 = 1 \\implies x^2 + y^2 - 8x - 6y + 24 = 0$.'
  },
  {
    num: 40,
    ans: 'গ',
    exp: 'দ্বিপদী রাশি $\\left(2x + \\dfrac{1}{8x}\\right)^8$ এর বিস্তৃতির সাধারণ পদ:\n$T_{r+1} = \\binom{8}{r} (2x)^{8-r} \\left(\\dfrac{1}{8x}\\right)^r$\n$\\implies T_{r+1} = \\binom{8}{r} 2^{8-r} x^{8-r} \\cdot 8^{-r} x^{-r} = \\binom{8}{r} 2^{8-r} (2^3)^{-r} x^{8-2r} = \\binom{8}{r} 2^{8-4r} x^{8-2r}$।\n$x$-বর্জিত (স্বাধীন) পদের জন্য $x$-এর ঘাত শূন্য হতে হবে:\n$8 - 2r = 0 \\implies 2r = 8 \\implies r = 4$।\n$r = 4$ মান বসিয়ে $x$-বর্জিত পদটির মান নির্ণয় করি:\n$T_5 = \\binom{8}{4} 2^{8-4(4)} = \\binom{8}{4} 2^{8-16} = \\binom{8}{4} 2^{-8} = \\dfrac{70}{256} = \\dfrac{35}{128}$।\nঅতএব $x$-বর্জিত পদটির মান হলো $\\dfrac{35}{128}$। সঠিক উত্তর হলো [গ] $\\dfrac{35}{128}$।\n||EN|| General term $T_{r+1} = \\binom{8}{r} 2^{8-r} 8^{-r} x^{8-2r}$. Setting $8-2r = 0 \\implies r = 4$. Term $= \\binom{8}{4} 2^4 / 8^4 = \\dfrac{70 \\times 16}{4096} = \\dfrac{35}{128}$.'
  },
  {
    num: 41,
    ans: 'ঘ',
    exp: 'প্রদত্ত উপবৃত্তের সমীকরণ: $\\dfrac{x^2}{16} + \\dfrac{y^2}{25} = 1$।\nএখানে $a^2 = 16$ এবং $b^2 = 25$।\nযেহেতু $b^2 > a^2$ ($b > a$), তাই উপবৃত্তটির অক্ষ $y$-অক্ষ বরাবর অবস্থিত।\n$b > a$ এর ক্ষেত্রে উপবৃত্তের উৎকেন্দ্রিকতার সূত্র:\n$e = \\sqrt{1 - \\dfrac{a^2}{b^2}}$\nমান বসিয়ে পাই:\n$e = \\sqrt{1 - \\dfrac{16}{25}} = \\sqrt{\\dfrac{25 - 16}{25}} = \\sqrt{\\dfrac{9}{25}} = \\dfrac{3}{5}$।\nঅতএব উপবৃত্তটির উৎকেন্দ্রিকতা হলো $\\dfrac{3}{5}$। সঠিক উত্তর হলো [ঘ] $\\dfrac{3}{5}$।\n||EN|| For $\\dfrac{x^2}{16} + \\dfrac{y^2}{25} = 1$ with $b^2 = 25 > a^2 = 16$, eccentricity $e = \\sqrt{1 - a^2/b^2} = \\sqrt{1 - 16/25} = \\dfrac{3}{5}$.'
  },
  {
    num: 42,
    ans: 'গ',
    exp: 'প্রদত্ত ত্রিকোণমিতিক রাশি: $\\cot\\left(\\sin^{-1} \\dfrac{1}{2}\\right)$।\nআমরা জানি:\n$\\sin\\left(\\dfrac{\\pi}{6}\\right) = \\sin 30^\\circ = \\dfrac{1}{2} \\implies \\sin^{-1}\\left(\\dfrac{1}{2}\\right) = 30^\\circ = \\dfrac{\\pi}{6}$।\nমান বসিয়ে পাই:\n$\\cot(30^\\circ) = \\sqrt{3}$।\n(বিকল্পভাবে: সমকোণী ত্রিভুজে লম্ব $= 1$, অতিভুজ $= 2 \\implies$ ভূমি $= \\sqrt{2^2-1^2} = \\sqrt{3}$, ফলে $\\cot = \\frac{\\text{ভূমি}}{\\text{লম্ব}} = \\sqrt{3}$)।\nঅতএব সঠিক উত্তর হলো [গ] $\\sqrt{3}$।\n||EN|| Since $\\sin^{-1}(1/2) = 30^\\circ$, $\\cot(30^\\circ) = \\sqrt{3}$.'
  },
  {
    num: 43,
    ans: 'খ',
    exp: 'অনির্দিষ্ট সমাকলন: $I = \\int \\dfrac{dx}{(e^x + e^{-x})^2}$।\nলব ও হরকে $e^{2x}$ দ্বারা গুণ করি:\n$I = \\int \\dfrac{e^{2x}\\,dx}{[e^x(e^x + e^{-x})]^2} = \\int \\dfrac{e^{2x}\\,dx}{(e^{2x} + 1)^2}$।\nচলক প্রতিস্থাপন করি:\nধরি $u = e^{2x} + 1 \\implies du = 2e^{2x}dx \\implies e^{2x}dx = \\dfrac{du}{2}$।\nসমাকলনে মান বসিয়ে পাই:\n$I = \\int \\dfrac{du/2}{u^2} = \\dfrac{1}{2} \\int u^{-2}\\,du = \\dfrac{1}{2}\\left( -u^{-1} \\right) + c = -\\dfrac{1}{2u} + c$\n$u$ এর মান পুনরায় বসিয়ে পাই:\n$I = -\\dfrac{1}{2(e^{2x} + 1)} + c$।\nঅতএব সঠিক উত্তর হলো [খ] $-\\dfrac{1}{2(e^{2x} + 1)} + c$।\n||EN|| Substituting $u = e^{2x} + 1 \\implies du = 2e^{2x}dx$, the integral becomes $\\dfrac{1}{2}\\int u^{-2}du = -\\dfrac{1}{2(e^{2x}+1)} + c$.'
  },
  {
    num: 44,
    ans: 'ঘ',
    exp: 'প্রদত্ত ফাংশন: $f(x) = \\sqrt{2 - \\sqrt{2-x}}$।\nফাংশনটি বাস্তব মানে সংজ্ঞায়িত হওয়ার জন্য বর্গমূল চিহ্নের ভেতরের রাশিমালা অঋণাত্মক হতে হবে:\n১ম শর্ত (ভেতরের বর্গমূলের জন্য):\n$2 - x \\ge 0 \\implies x \\le 2$।\n২য় শর্ত (বাইরের বর্গমূলের জন্য):\n$2 - \\sqrt{2-x} \\ge 0 \\implies \\sqrt{2-x} \\le 2$।\nউভয়পক্ষকে বর্গ করে পাই:\n$2 - x \\le 2^2 = 4 \\implies -x \\le 4 - 2 = 2 \\implies x \\ge -2$।\nউভয় শর্তের সাধারণ বা ছেদ ব্যবধি:\n$-2 \\le x \\le 2$ বা ব্যবধি $[-2, 2]$।\nঅতএব ফাংশনটির ডোমেন হলো $[-2, 2]$। সঠিক উত্তর হলো [ঘ] $[-2, 2]$।\n||EN|| For real values, $2-x \\ge 0 \\implies x \\le 2$ and $\\sqrt{2-x} \\le 2 \\implies 2-x \\le 4 \\implies x \\ge -2$. The domain is $[-2, 2]$.'
  },
  {
    num: 45,
    ans: 'গ',
    exp: 'ধরি $P$ এবং $2P$ মানের বলদ্বয়ের মধ্যবর্তী কোণ $\\alpha$ এবং এদের লব্ধি $R = \\sqrt{7}P$।\nবল ত্রিভুজের সূত্রানুসারে:\n$R^2 = P_1^2 + P_2^2 + 2P_1 P_2 \\cos\\alpha$\nমান বসিয়ে পাই:\n$(\\sqrt{7}P)^2 = P^2 + (2P)^2 + 2(P)(2P)\\cos\\alpha$\n$\\implies 7P^2 = P^2 + 4P^2 + 4P^2\\cos\\alpha$\n$\\implies 7P^2 = 5P^2 + 4P^2\\cos\\alpha$\n$\\implies 4P^2\\cos\\alpha = 7P^2 - 5P^2 = 2P^2$\nউভয়পক্ষ থেকে $P^2$ ($P \\ne 0$) বাদ দিয়ে পাই:\n$4\\cos\\alpha = 2 \\implies \\cos\\alpha = \\dfrac{2}{4} = \\dfrac{1}{2} = \\cos 60^\\circ$\n$\\implies \\alpha = 60^\\circ$।\nঅতএব বলদ্বয়ের মধ্যবর্তী কোণ হলো $60^\\circ$। সঠিক উত্তর হলো [গ] $60^\\circ$।\n||EN|| Resultant equation: $(\\sqrt{7}P)^2 = P^2 + 4P^2 + 4P^2\\cos\\alpha \\implies 7P^2 = 5P^2 + 4P^2\\cos\\alpha \\implies \\cos\\alpha = 1/2 \\implies \\alpha = 60^\\circ$.'
  },

  // Biology (46 - 60)
  {
    num: 46,
    ans: 'ঘ',
    exp: 'শিখা কোষ (Flame cell বা Protonephridia) হলো **প্লাটিহেলমিনথিস (Platyhelminthes)** বা চ্যাপ্টাকৃমি পর্বের প্রাণীদের (যেমন ফিতাকৃমি, প্ল্যানেরিয়া, যকৃৎকৃমি) বিশেষায়িত রেচন ও অভিস্রবণ নিয়ন্ত্রণকারী কোষ। এই কোষে একগুচ্ছ সিলিয়া থাকে যা শিখার মতো কেঁপে রেচন বর্জ্য নিষ্কাশন করে। অতএব সঠিক উত্তর হলো [ঘ] Platyhelminthes।\n||EN|| Flame cells are specialized excretory and osmoregulatory cells found in the phylum Platyhelminthes.'
  },
  {
    num: 47,
    ans: 'খ',
    exp: 'দুধের প্রধান প্রোটিন ক্যাসিনোজেনকে ক্যালসিয়াম প্যারাকেসিনেটে রূপান্তর করে দুধ জমাট বাঁধাতে বাণিজ্যিক পনির তৈরিতে **রেনিন (Rennin বা Chymosin)** এনজাইম ব্যবহৃত হয়। ঐতিহ্যগতভাবে বাছুরের পাকস্থলী অথবা জিন প্রকৌশলকৃত অণুজীব থেকে এটি তৈরি করা হয়। অতএব সঠিক উত্তর হলো [খ] রেনিন।\n||EN|| Rennin (chymosin) is the milk-clotting enzyme used in cheese production.'
  },
  {
    num: 48,
    ans: 'ঘ',
    exp: 'হিউম্যান জিনোম প্রজেক্ট (Human Genome Project / HGP) এর তথ্য অনুসারে মানুষের একটি হ্যাপ্লয়েড জিনোমে মোট প্রায় **৩০০০ মিলিয়ন বা ৩ বিলিয়ন ($3 \\times 10^9$)** ক্ষারক-যুগল (Base pairs) রয়েছে। ডিপ্লয়েড কোষে এই সংখ্যা প্রায় ৬ বিলিয়ন ($6 \\times 10^9$ bp)। অতএব সঠিক উত্তর হলো [ঘ] ৩০০০ মিলিয়ন।\n||EN|| The Human Genome Project revealed that the human haploid genome contains approximately 3000 million (3 billion) base pairs.'
  },
  {
    num: 49,
    ans: 'ক',
    exp: 'মাইটোকন্ড্রিয়ার অন্তর্বর্তী পর্দার (Inner membrane / Cristae) অন্তঃপৃষ্ঠে অবস্থিত ক্ষুদ্র বৃন্তযুক্ত দানাদার উপাদানকে **অক্সিসোম (Oxysome)** বা $F_0-F_1$ এটিপি সিন্থেস কমপ্লেক্স বলে। এটি কোষীয় শ্বসনে এটিপি (ATP) সংশ্লেষণে সরাসরি অংশ নেয়। অতএব সঠিক উত্তর হলো [ক] মাইটোকন্ড্রিয়া।\n||EN|| Oxysomes ($F_0-F_1$ complexes) are located on the inner mitochondrial membrane.'
  },
  {
    num: 50,
    ans: 'খ',
    exp: 'ঘাস গোত্র বা পোয়াসি (Poaceae / Gramineae) পরিবারের উদ্ভিদের (যেমন ধান, গম, ভুট্টা) একক বীজযুক্ত বিশেষ ফলকে **ক্যারিওপসিস (Caryopsis)** বলা হয়। এই ফলের বিশেষ বৈশিষ্ট্য হলো এর পাতলা ফলত্বক (Pericarp) এবং বীজত্বক (Seed coat) পরস্পরের সাথে অবিচ্ছেদ্যভাবে মিশে থাকে। অতএব সঠিক উত্তর হলো [খ] ক্যারিওপসিস।\n||EN|| The fruit of the grass family Poaceae (e.g., rice, wheat) is a caryopsis, where the pericarp is fused with the seed coat.'
  },
  {
    num: 51,
    ans: 'ক',
    exp: 'কনড্রিকথিস (Chondrichthyes) শ্রেণির তরুণাস্থিময় সামুদ্রিক মাছের (যেমন হাঙর, করাত মাছ, হাতুড়ি হাঙর) ত্বক অসংখ্য অতিক্ষুদ্র দাঁতের মতো শক্ত **প্ল্যাকয়েড (Placoid)** আঁইশ দ্বারা আবৃত থাকে। প্ল্যাকয়েড আঁইশের গঠন মেরুদণ্ডী প্রাণীর দাঁতের অনুরূপ (ডেনটিন ও এনামেলসম উপাদান দ্বারা গঠিত)। অতএব সঠিক উত্তর হলো [ক] প্ল্যাকয়েড।\n||EN|| Cartilaginous fishes (Chondrichthyes like sharks) possess tooth-like placoid scales.'
  },
  {
    num: 52,
    ans: 'ঘ',
    exp: 'পলিজেনিক ইনহেরিটেন্স (Polygenic inheritance) এমন একটি বংশগতির ধরণ যেখানে একটিমাত্র বৈশিষ্ট্যের বহিঃপ্রকাশ একাধিক ভিন্ন ভিন্ন নন-অ্যালিলিক জিন (পলিজিন) দ্বারা নিয়ন্ত্রিত হয় (যেমন মানুষের গায়ের রঙ, উচ্চতা, ওজন)। প্রতিটি সক্রিয় অ্যালিল বৈশিষ্ট্যের মাত্রাকে ক্রমান্বয়ে বৃদ্ধি করে, ফলে এদের প্রভাব হয় সম্মিলিত বা **পুঞ্জীভূত (Cumulative / Quantitative)**। অতএব সঠিক উত্তর হলো [ঘ] পুঞ্জীভূত।\n||EN|| In polygenic inheritance, multiple non-allelic genes exert a cumulative (additive) quantitative effect on the phenotype.'
  },
  {
    num: 53,
    ans: 'ক',
    exp: 'মানবদেহের রক্তরসে (Serum) পাঁচ ধরনের অ্যান্টিবডি থাকে: IgG, IgA, IgM, IgD, এবং IgE। এর মধ্যে **$\\text{IgG}$ (Immunoglobulin G)** সবচেয়ে বেশি পরিমাণে থাকে, যা মোট সিরাম অ্যান্টিবডির প্রায় ৭৫% থেকে ৮০%। এটি একমাত্র অ্যান্টিবডি যা অমরা বা প্লাসেন্টা অতিক্রম করে মাতৃদেহ থেকে ভ্রূণে প্রবেশ করতে পারে। অতএব সঠিক উত্তর হলো [ক] IgG।\n||EN|| IgG is the most abundant immunoglobulin in human serum, comprising about 75-80% of total circulating antibodies.'
  },
  {
    num: 54,
    ans: 'গ',
    exp: '*Shorea robusta* হলো বাংলাদেশের জাতীয় বনবৃক্ষ **শাল বা গজারি** এর বৈজ্ঞানিক নাম। শাল বন একটি শুষ্ক মৌসুমী **পত্রঝরা (Deciduous)** বনভূমি, যেখানে শীত ও বসন্তকালে গাছের সমস্ত পাতা ঝরে যায় এবং গ্রীষ্মে নতুন কচি পাতা গজায়। অতএব সঠিক উত্তর হলো [গ] পত্রঝরা।\n||EN|| *Shorea robusta* (Sal) is a dominant deciduous tree species found in the tropical dry deciduous forests of Bangladesh.'
  },
  {
    num: 55,
    ans: 'খ',
    exp: 'হরমোনের ক্ষরণ উৎস বিশ্লেষণ:\n• প্রোজেস্টেরন (Progesterone) একটি স্টেরয়েড হরমোন যা প্রধানত ডিম্বাশয়ের **করপাস লুটিয়াম (Corpus Luteum)** এবং গর্ভাবস্থায় অমরা (Placenta) থেকে নিঃসৃত হয়। এটি পিটুইটারি গ্রন্থি থেকে নিঃসৃত হয় না।\n(পিটুইটারি থেকে TSH, FSH, LH, ACTH, GH ইত্যাদি নিঃসৃত হয়)। অতএব সঠিক উত্তর হলো [খ] প্রোজেস্টেরন।\n||EN|| Progesterone is secreted by the ovarian corpus luteum and placenta, not by the pituitary gland.'
  },
  {
    num: 56,
    ans: 'গ',
    exp: 'জেনেটিক কোড (Genetic code) এর অপজাত্য (Degeneracy) বৈশিষ্ট্য অনুসারে ২০টি অ্যামাইনো এসিডের জন্য মোট ৬১টি কার্যকরী ট্রিপলেট কোডন রয়েছে। এর মধ্যে **ভ্যালিন (Valine)** অ্যামাইনো এসিডের জন্য নির্দিষ্ট কোডন সংখ্যা হলো **৪টি** (GUU, GUC, GUA, এবং GUG)। অতএব সঠিক উত্তর হলো [গ] ৪।\n||EN|| Valine is specified by 4 genetic codons: GUU, GUC, GUA, and GUG.'
  },
  {
    num: 57,
    ans: 'ক',
    exp: 'মানুষের কেন্দ্রীয় স্নায়ুতন্ত্র অর্থাৎ মস্তিষ্ক (Brain) এবং সুষুম্নাকাণ্ড (Spinal cord) বাইরে থেকে ত্রিস্তরবিশিষ্ট একটি শক্ত সংযোজক কলার ঝিল্লি বা পর্দা দ্বারা সম্পূর্ণ আবৃত থাকে, যাকে **মেনিনজেস (Meninges)** বলে। এর তিনটি স্তর হলো: ডুরামেটার (বাইরে), অ্যারাকনয়েড মেটার (মাঝে), এবং পিয়ামেটার (ভেতরে)। অতএব সঠিক উত্তর হলো [ক] মেনিনজেস।\n||EN|| The central nervous system (brain and spinal cord) is enclosed by a three-layered protective membrane known as the **meninges**.'
  },
  {
    num: 58,
    ans: 'গ',
    exp: 'উদ্ভিদজগতের শ্রেণিবিন্যাস:\nটেরিডোফাইটা (Pteridophyta বা ফার্নবর্গ) হলো **ভাস্কুলার ক্রিপ্টোগ্যামস**। এদের সুগঠিত সংবহন কলা (জাইলেম ও ফ্লোয়েম) রয়েছে, কিন্তু এরা ফুল ও বীজ উৎপন্ন করে না (অপুষ্পক)। এরা স্পোর বা রেণুর মাধ্যমে বংশবিস্তার করে। অতএব সঠিক উত্তর হলো [গ] টেরিডোফাইটা।\n||EN|| Pteridophytes are vascular cryptogams—they possess specialized vascular tissues (xylem/phloem) but reproduce via spores without seeds.'
  },
  {
    num: 59,
    ans: 'খ',
    exp: '*Podocarpus nerifolia* (স্থানীয় নাম: বাঁশপাতা) হলো বাংলাদেশের চিরহরিৎ পাহাড়ি বনাঞ্চলে (বিশেষ করে পার্বত্য চট্টগ্রাম ও সিলেট) প্রাকৃতিকভাবে জন্ম নেওয়া একমাত্র বিরল ও বিপন্ন নগ্নবীজী (Gymnosperm) বৃক্ষ। অতএব সঠিক উত্তর হলো [খ] Podocarpus nerifolia।\n||EN|| *Podocarpus nerifolia* (Banshpata) is a critically endangered native gymnosperm tree found in Bangladesh.'
  },
  {
    num: 60,
    ans: 'ক',
    exp: 'অ্যাড্রেনাল গ্রন্থির কর্টেক্স (Adrenal Cortex) অঞ্চল থেকে তিনটি প্রধান শ্রেণির কর্টিকোস্টেরয়েড হরমোন নিঃসৃত হয়:\n১. গ্লুকোকরটিকয়েড (যেমন কর্টিসল)\n২. মিনারেলোকরটিকয়েড (যেমন অ্যালডোস্টেরন)\n৩. সেক্স কর্টিকয়েড (অ্যান্ড্রোজেন)\n(অ্যাড্রেনালিন ও নর-অ্যাড্রেনালিন নিঃসৃত হয় অ্যাড্রেনাল মেডুলা থেকে)। অতএব সঠিক উত্তর হলো [ক] গ্লুকোকরটিকয়েড।\n||EN|| Glucocorticoids (such as cortisol) are synthesized and secreted by the adrenal cortex.'
  },

  // Bangla (61 - 75)
  {
    num: 61,
    ans: 'খ',
    exp: '\'অনসূয়া\' শব্দটির সঠিক অর্থ হলো যার মধ্যে অসূয়া বা পরশ্রীকাতরতা নেই (নঞ-তৎপুরুষ সমাস: ন অসূয়া = অনসূয়া)। ব্যাকরণিক বানানরীতি অনুসারে এতে দন্ত্য-ন এবং দন্ত্য-স-এ দীর্ঘ ঊ বসে: \'অনসূয়া\'। অতএব সঠিক বানান হলো [খ] অনসূয়া।\n||EN|| The correct standard spelling is \'অনসূয়া\'.'
  },
  {
    num: 62,
    ans: 'ঘ',
    exp: 'শুদ্ধ শব্দগুচ্ছের বানান বিশ্লেষণ:\n১. \'দুরবস্থা\' – দুর্ + অবস্থা = দুরবস্থা (দুরাবস্থা অশুদ্ধ)।\n২. \'শ্রদ্ধাঞ্জলি\' – অঞ্জলি প্রত্যয়যুক্ত বানানে সর্বদা হ্রস্ব ই-কার বসে (গীতাঞ্জলি, পুষ্পাঞ্জলি, শ্রদ্ধাঞ্জলি)।\n৩. \'মুমূর্ষু\' – ম-এ হ্রস্ব উ, ম-এ দীর্ঘ ঊ রেফ, ষ-এ হ্রস্ব উ (মুমূর্ষু)।\nএই তিনটি শব্দই সম্পূর্ণ নির্ভুল। সঠিক উত্তর হলো [ঘ]।\n||EN|| The words \'দুরবস্থা\', \'শ্রদ্ধাঞ্জলি\', and \'মুমূর্ষু\' are all correctly spelled.'
  },
  {
    num: 63,
    ans: 'ক',
    exp: 'যে অবিভাজ্য মৌলিক অংশের সাথে পুরুষ ও কালবাচক বিভক্তি যুক্ত হয়ে একটি ক্রিয়াপদ গঠিত হয়, তাকে ক্রিয়াপদের মূল বা **ধাতু (Verb root)** বলে। যেমন: $\\surd$কর্ + ছি = করছি; $\\surd$দেখ্ + বে = দেখবে। অতএব সঠিক উত্তর হলো [ক] ধাতু।\n||EN|| The root or base form of a verb is called \'ধাতু\' (root).'
  },
  {
    num: 64,
    ans: 'খ',
    exp: '\'পয়জার\' শব্দের অর্থ জুতো বা পাদুকা ("পদাঘাতে ভাঙ্গি পয়জার")। এটি ফারসি শব্দ \'পায়জার\' (পা + যার) থেকে বাংলা ভাষায় আগত একটি **ফারসি শব্দ**। অতএব সঠিক উত্তর হলো [খ] ফারসি।\n||EN|| \'পয়জার\' (shoe/footwear) is a Persian loanword.'
  },
  {
    num: 65,
    ans: 'ঘ',
    exp: 'সংস্কৃত ব্যঞ্জনসন্ধির সূত্রানুসারে, প্রথম পদের অন্তে ম্ থাকলে এবং পরে যেকোনো বর্গের স্পর্শধ্বনি থাকলে ম্-এর স্থলে অনুস্বার বা ওই বর্গের পঞ্চম নাসিক্য ধ্বনি হয়: **শম্ + গ = শৃঙ্গ** (বা শম্ + গ)। অতএব সঠিক উত্তর হলো [ঘ] শম্ + গ।\n||EN|| Sandhi split of \'শৃঙ্গ\' is শম্ + গ.'
  },
  {
    num: 66,
    ans: 'খ',
    exp: '\'অকূল পাথার\' বাগধারাটির অর্থ কূলহীন সমুদ্র বা সীমাহীন মহাসংকট। রূপক অর্থে যখন কোনো ব্যক্তি কোনো সাহায্য ছাড়া ঘোর বিপদে নিমজ্জিত হয়, তখন তাকে \'অকূল পাথার\' বলে। অতএব এর অর্থ হলো **ভীষণ বিপদ**। সঠিক উত্তর হলো [খ] ভীষণ বিপদ।\n||EN|| The idiom \'অকূল পাথার\' metaphorically means an extreme danger or overwhelming peril.'
  },
  {
    num: 67,
    ans: 'গ',
    exp: '\'উপকূল\' শব্দটির ব্যাসবাক্য হলো \'কূলের সমীপে\'। যে সমাসে পূর্বপদে উপসর্গ/অব্যয় বসে এবং সমাস নিষ্পন্ন পদে অব্যয়ের অর্থই প্রধানরূপে প্রতিভাত হয়, তাকে **অব্যয়ীভাব সমাস** বলে। এখানে \'উপ\' উপসর্গটি সামীপ্য বা নিকট অর্থে ব্যবহৃত হয়েছে। অতএব সঠিক উত্তর হলো [গ] অব্যয়ীভাব সমাস।\n||EN|| \'উপকূল\' (কূলের সমীপে) is an Avyayibhava compound expressing proximity via the prefix \'উপ-\'.'
  },
  {
    num: 68,
    ans: 'ক',
    exp: 'ন-ত্ব বিধানের নিয়মানুসারে, বিদেশি শব্দে (যেমন কুরআন, ইরান) এবং তদ্ভব খাঁটি বাংলা শব্দে মূর্ধন্য-ণ নিষিদ্ধ। কিন্তু তৎসম শব্দ **\'লাবণ্য\'**-তে স্বভাবতই মূর্ধন্য-ণ (নিত্য মূর্ধন্য-ণ) বসে। অতএব সঠিক উত্তর হলো [ক] লাবণ্য।\n||EN|| In \'লাবণ্য\', the retroflex \'ণ\' occurs naturally (নিত্য মূর্ধন্য-ণ).'
  },
  {
    num: 69,
    ans: 'খ',
    exp: '\'অভিধান\' শব্দটির সঠিক প্রকৃতি ও প্রত্যয়গত ব্যুৎপত্তি হলো: **অভি (উপসর্গ) + $\\surd$ধা (ধাতু) + অন (অনট প্রত্যয়) = অভিধান**। এর অর্থ শব্দকোষ বা সংগ্রহ। সঠিক উত্তর হলো [খ] অভি + $\\surd$ধা + অন।\n||EN|| The etymological derivation of \'অভিধান\' is অভি + $\\surd$ধা + অন.'
  },
  {
    num: 70,
    ans: 'ঘ',
    exp: '\'আবির্ভাব\' অর্থ প্রকাশ পাওয়া বা দৃশ্যমান হওয়া। এর সরাসরি বিপরীতার্থক শব্দ হলো অন্তর্ধান, অদৃশ্য হওয়া বা **\'তিরোভাব\'**। অতএব সঠিক উত্তর হলো [ঘ] তিরোভাব।\n||EN|| The exact antonym of \'আবির্ভাব\' (appearance/manifestation) is \'তিরোভাব\' (disappearance).'
  },
  {
    num: 71,
    ans: 'গ',
    exp: 'জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমানের \'বায়ান্নর দিনগুলো\' স্মৃতিকথা অনুসারে, ১৯৫২ সালে ঢাকা কেন্দ্রীয় কারাগার থেকে তাঁকে ও তাঁর রাজনৈতিক সহযোদ্ধা **মহিউদ্দিন আহমেদ**-কে গোপনে ফরিদপুর জেলে স্থানান্তর করা হয় এবং তাঁরা উভয়ই সেখানে রাজবন্দীদের মুক্তির দাবিতে অনশন ধর্মঘট পালন করেন। অতএব সঠিক উত্তর হলো [গ] মহিউদ্দিন আহমেদ।\n||EN|| In \'বায়ান্নর দিনগুলো\', Bangabandhu went on hunger strike in Faridpur jail together with Mohiuddin Ahmed.'
  },
  {
    num: 72,
    ans: 'গ',
    exp: 'সৈয়দ ওয়ালীউল্লাহর \'লালসালু\' উপন্যাসে মজিদ মহব্বতনগর গ্রামে প্রবেশ করে একটি অজ্ঞাত জীর্ণ কবরকে \'মোদাচ্ছের পীরের মাজার\' হিসেবে ঘোষণা করে নিজের জীবিকা ও কর্তৃত্ব প্রতিষ্ঠা করে। আরবিতে \'মোদাচ্ছের\' শব্দের আক্ষরিক অর্থ হলো চাদরাবৃত বা **নাম-না-জানা/অজ্ঞাত**। অতএব সঠিক উত্তর হলো [গ] নাম-না-জানা।\n||EN|| In \'Lalsalu\', the word \'মোদাচ্ছের\' contextually denotes an unknown or unnamed saint whose grave is manipulated by Majeed.'
  },
  {
    num: 73,
    ans: 'ঘ',
    exp: 'কাজী নজরুল ইসলামের অগ্নিবীণা কাব্যের বিখ্যাত \'বিদ্রোহী\' কবিতার অমর চরণ:\n"মহা-বিদ্রোহী রণ-ক্লান্ত\nআমি সেই দিন হব শান্ত,\nযবে উৎপীড়িতের ক্রন্দন-রোল আকাশে বাতাসে ধ্বনিবে না..."।\nঅতএব উৎপীড়িতের ক্রন্দন-রোল বন্ধ হলে বিদ্রোহী কবি শান্ত হবেন। সঠিক উত্তর হলো [ঘ]।\n||EN|| In the poem \'Bidrohi\', Nazrul declares he will become calm only when the cries of the oppressed cease.'
  },
  {
    num: 74,
    ans: 'ঘ',
    exp: 'বেগম রোকেয়া সাখাওয়াত হোসেন তাঁর সমাজ সচেতনমূলক \'গৃহ\' প্রবন্ধে নারীদের গৃহহীনতার বাস্তব অবস্থা তুলে ধরে আক্ষেপ করে বলেছেন: "আমাদের বাড়ি আছে, কিন্তু গৃহ নাই।" কারণ গৃহে নারীদের নিজস্ব স্বাধীনতা, স্বস্তি ও আত্মসম্মানের অধিকার ছিল না। অতএব সঠিক উত্তর হলো [ঘ] গৃহ।\n||EN|| Begum Rokeya observed in \'Griha\' that women may inhabit houses, but they lack a true home (\'গৃহ\').'
  },
  {
    num: 75,
    ans: 'খ',
    exp: 'কাজী নজরুল ইসলামের \'সাম্যবাদী\' কবিতার চরণ: "কোরান-পুরাণ-বেদ-বেদান্ত-বাইবেল-ত্রিপিটক-জেন্দাবেস্তা-গ্রন্থসাহেব..."। এখানে উল্লেখিত \'জেন্দাবেস্তা\' (Zend-Avesta) হলো প্রাচীন পারস্যের অগ্নিউপাসক জরথুস্ত্রীয় বা **পারসি সম্প্রদায়ের পবিত্র ধর্মগ্রন্থ**। অতএব সঠিক উত্তর হলো [খ] পারসিদের ধর্মগ্রন্থ।\n||EN|| In the poem \'Samyabadi\', \'Zend-Avesta\' is the sacred text of the Zoroastrian (Parsi) religion.'
  },

  // English (76 - 90)
  {
    num: 76,
    ans: 'ঘ',
    exp: 'Preposition rule for proficiency:\nThe adjective \'good\' takes the preposition \'at\' when denoting skill, competence, or ability in a particular subject, language, or discipline: "He is remarkably good at English and Mathematics." Correct answer is [ঘ] at.\n||EN|| The correct preposition is \'good at\'.'
  },
  {
    num: 77,
    ans: 'ঘ',
    exp: 'Subject-Verb Agreement rule with fractional quantities:\nWhen a fraction or percentage is followed by of + uncountable noun, the verb must be singular. Here \'work\' is an uncountable noun: "Two-thirds of the work has been completed." Correct answer is [ঘ] has been.\n||EN|| Fractions referring to uncountable nouns take singular verbs: "Two-thirds of the work has been...".'
  },
  {
    num: 78,
    ans: 'ক',
    exp: '\'Incredible\' means so extraordinary as to seem impossible or difficult to believe (অবিশ্বাস্য). Its closest exact synonym is \'unbelievable\'. Antonyms include credible, plausible. Correct answer is [ক] unbelievable.\n||EN|| \'Incredible\' is synonymous with \'unbelievable\'.'
  },
  {
    num: 79,
    ans: 'খ',
    exp: 'Causative verb rule:\nThe causative verb \'make\' in active voice is followed by an object and a bare infinitive (base form of the verb without \'to\'): "The teacher made the students write the essay again." Correct answer is [খ] write.\n||EN|| Active causative \'make\' requires a bare infinitive (\'write\').'
  },
  {
    num: 80,
    ans: 'ঘ',
    exp: 'Fixed prepositional collocation:\nThe phrase \'look forward to\' functions as a prepositional verb where \'to\' is a preposition, not part of an infinitive. It must be followed by a noun or gerund (-ing form): "We look forward to hearing from you soon." Correct answer is [ঘ] hearing.\n||EN|| \'Look forward to\' is followed by a gerund: "look forward to hearing".'
  },
  {
    num: 81,
    ans: 'গ',
    exp: '\'Ephemeral\' means lasting for a very brief period, fleeting, or transitory (ক্ষণস্থায়ী বা স্বল্পস্থায়ী). Its closest synonym is \'short-lived\'. Antonyms include permanent, perpetual. Correct answer is [গ] short-lived.\n||EN|| \'Ephemeral\' means short-lived or transitory.'
  },
  {
    num: 82,
    ans: 'ঘ',
    exp: 'Negative Inversion structure:\nWhen a sentence starts with the negative adverb \'Hardly\', the auxiliary verb inverts with the subject: "Hardly had + subject + past participle... when + past simple." Thus: "Hardly had I arrived at the station when the train left." Correct answer is [ঘ] had I arrived / when.\n||EN|| Correlative inversion structure: "Hardly had I arrived... when...".'
  },
  {
    num: 83,
    ans: 'গ',
    exp: 'Antonym analysis:\n\'Benevolent\' means kind, generous, and caring for the welfare of others (দয়ালু বা হিতৈষী). Its direct antonym is \'Malevolent\' (wishing evil, malicious, or spiteful / পরশ্রীকাতর বা বিদ্বেষপরায়ণ). Correct answer is [গ] malevolent.\n||EN|| The antonym of \'benevolent\' is \'malevolent\'.'
  },
  {
    num: 84,
    ans: 'গ',
    exp: 'Infinitive of purpose:\nTo explain why an action was performed, the to-infinitive is used: "She went to the market to purchase some fresh vegetables." Correct answer is [গ] to purchase.\n||EN|| The infinitive \'to purchase\' expresses the purpose of the action.'
  },
  {
    num: 85,
    ans: 'ঘ',
    exp: 'Orthography analysis:\nThe noun \'Accommodation\' (বাসস্থান বা থাকার ব্যবস্থা) is standardly spelled with double \'c\' and double \'m\': A-C-C-O-M-M-O-D-A-T-I-O-N. Correct answer is [ঘ] Accommodation.\n||EN|| The correct spelling is \'Accommodation\' with double \'c\' and double \'m\'.'
  },
  {
    num: 86,
    ans: 'খ',
    exp: 'Comparative adjective rule:\nThe adjective \'preferable\' already has a comparative meaning and is followed by the preposition \'to\', never \'than\' or \'more\': "Health is preferable to wealth." Correct answer is [খ] to.\n||EN|| \'Preferable\' is paired with \'to\'.'
  },
  {
    num: 87,
    ans: 'ঘ',
    exp: 'Idiomatic meaning:\nThe idiom \'Burn the candle at both ends\' means to exhaust oneself by doing too much, specifically working late into the night and waking early in the morning (অতিরিক্ত পরিশ্রম করে শক্তি অপচয় করা). Correct answer is [ঘ] work excessively hard.\n||EN|| \'Burn the candle at both ends\' means to overwork oneself.'
  },
  {
    num: 88,
    ans: 'গ',
    exp: 'Voice transformation:\nActive: "The police caught the thief." (Subject: The police, Verb: caught [Past Simple], Object: the thief).\nPassive structure: Object + was/were + past participle + by + agent.\nPassive: "The thief was caught by the police." Correct answer is [গ] The thief was caught by the police.\n||EN|| The passive form of "The police caught the thief" is "The thief was caught by the police".'
  },
  {
    num: 89,
    ans: 'গ',
    exp: 'Vocabulary definition:\nA detailed plan, schedule, or route for a journey is known as an **itinerary** (ভ্রমণসূচি). Correct answer is [গ] itinerary.\n||EN|| An \'itinerary\' is a planned travel route or journey schedule.'
  },
  {
    num: 90,
    ans: 'গ',
    exp: 'One word substitution:\nA person who dislikes, distrusts, or hates humanity is termed a **misanthrope** (বা misanthropist). In contrast, a philanthropist loves and helps humankind. Correct answer is [গ] misanthrope.\n||EN|| A \'misanthrope\' is one who hates or distrusts humanity.'
  }
];

module.exports = { solutions19_20 };
