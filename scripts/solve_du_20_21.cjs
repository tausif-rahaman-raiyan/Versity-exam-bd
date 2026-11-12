/**
 * scripts/rich_du_20_21.cjs
 * Comprehensive, step-by-step bilingual explanations for DU 20-21 MCQ (90 questions)
 * Blocks:
 * 1. Physics (Q1 - Q15)
 * 2. Chemistry (Q16 - Q30)
 * 3. Mathematics (Q31 - Q45)
 * 4. Biology (Q46 - Q60)
 * 5. Bangla (Q61 - Q75)
 * 6. English (Q76 - Q90)
 */

const solutions20_21 = [
  // Physics (1 - 15)
  {
    num: 1,
    ans: 'ক',
    exp: 'দুটি ভেক্টর $\\vec{A}$ এবং $\\vec{B}$ পরস্পর লম্ব হওয়ার শর্ত হলো এদের ডট গুণফল শূন্য হওয়া ($\\vec{A} \\cdot \\vec{B} = 0$)।\nপ্রদত্ত ভেক্টরদ্বয়:\n$\\vec{A} = 2\\hat{i} + 2\\hat{j} - \\hat{k}$\n$\\vec{B} = a\\hat{i} + \\hat{j}$\nডট গুণফল করে পাই:\n$\\vec{A} \\cdot \\vec{B} = (2)(a) + (2)(1) + (-1)(0) = 2a + 2$।\nলম্ব হওয়ার শর্তমতে:\n$2a + 2 = 0 \\implies 2a = -2 \\implies a = -1$।\nঅতএব সঠিক উত্তর হলো [ক] $-1$।\n||EN|| Dot product $\\vec{A} \\cdot \\vec{B} = 2a + 2 = 0 \\implies a = -1$.'
  },
  {
    num: 2,
    ans: 'খ',
    exp: 'দৈর্ঘ্য সংকোচন সূত্র: $L = L_0\\sqrt{1 - \\dfrac{v^2}{c^2}}$।\nপ্রশ্নমতে গতিশীল দৈর্ঘ্য নিশ্চল দৈর্ঘ্যের অর্ধেক: $L = \\dfrac{L_0}{2}$।\n$\\implies \\dfrac{L_0}{2} = L_0\\sqrt{1 - \\dfrac{v^2}{c^2}} \\implies \\sqrt{1 - \\dfrac{v^2}{c^2}} = \\dfrac{1}{2}$।\nউভয়পক্ষ বর্গ করে পাই:\n$1 - \\dfrac{v^2}{c^2} = \\dfrac{1}{4} \\implies \\dfrac{v^2}{c^2} = \\dfrac{3}{4} \\implies v = \\dfrac{\\sqrt{3}}{2}c$।\nঅতএব সঠিক উত্তর হলো [খ] $\\dfrac{\\sqrt{3}}{2}c$।\n||EN|| $L = L_0/2 \\implies \\sqrt{1 - v^2/c^2} = 1/2 \\implies v = \\dfrac{\\sqrt{3}}{2}c$.'
  },
  {
    num: 3,
    ans: 'ক',
    exp: 'শক্তি সংরক্ষণশীলতা নীতি অনুসারে গতিশীল বস্তুর গতিশক্তি স্প্রিং-এর স্থিতিস্থাপক বিভব শক্তিতে রূপান্তরিত হয়:\n$\\dfrac{1}{2}mv^2 = \\dfrac{1}{2}kx^2 \\implies kx^2 = mv^2 \\implies x^2 = \\dfrac{m}{k}v^2 \\implies x = \\sqrt{\\dfrac{m}{k}}v$।\nঅতএব স্প্রিংটির সংকোচন হবে $\\sqrt{\\dfrac{m}{k}}v$। সঠিক উত্তর হলো [ক]।\n||EN|| $\\frac{1}{2}mv^2 = \\frac{1}{2}kx^2 \\implies x = \\sqrt{\\dfrac{m}{k}}v$.'
  },
  {
    num: 4,
    ans: 'ঘ',
    exp: 'বৃত্তাকার পথে ঘূর্ণায়মান কণার ত্বরণ:\n১. কেন্দ্রমুখী ত্বরণ: $a_c = \\dfrac{v^2}{r} = \\dfrac{6^2}{12} = \\dfrac{36}{12} = 3\\text{ ms}^{-2}$।\n২. স্পর্শীয় ত্বরণ: $a_t = 4\\text{ ms}^{-2}$।\nযেহেতু এরা পরস্পর লম্ব ($90^\\circ$ কোণে), তাই লব্ধি ত্বরণ:\n$a = \\sqrt{a_c^2 + a_t^2} = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5\\text{ ms}^{-2}$।\nঅতএব সঠিক উত্তর হলো [ঘ] $5\\text{ ms}^{-2}$।\n||EN|| $a_c = 6^2/12 = 3\\text{ m/s}^2$, $a_t = 4\\text{ m/s}^2$. Total $a = \\sqrt{3^2+4^2} = 5\\text{ m/s}^2$.'
  },
  {
    num: 5,
    ans: 'ক',
    exp: 'ভূপৃষ্ঠ হতে $h$ গভীরতায় অভিকর্ষজ ত্বরণের সূত্র:\n$g\' = g\\left(1 - \\dfrac{h}{R}\\right) = g - \\left(\\dfrac{g}{R}\\right)h$।\nএটি একটি ঋণাত্মক ঢালযুক্ত সরলরেখা:\n• ভূপৃষ্ঠে ($h = 0$): $g\' = g$ (সর্বোচ্চ মান)।\n• পৃথিবীর কেন্দ্রে ($h = R$): $g\' = 0$।\nসুতরাং লেখচিত্রটি একটি অধোগামী সরলরেখা যা অপশন [ক]-তে প্রদর্শিত। সঠিক উত্তর হলো [ক]।\n||EN|| Acceleration $g\' = g(1 - h/R)$ decreases linearly from $g$ at surface to $0$ at Earth\'s center.'
  },
  {
    num: 6,
    ans: 'খ',
    exp: 'ইয়ং-এর ব্যতিচার পরীক্ষায় ডোরার প্রস্থ $\\beta = \\dfrac{\\lambda D}{d}$।\nপর্দার প্রতি একক প্রস্থে ডোরার সংখ্যা হলো ডোরার প্রস্থের বিপরীত রাশি:\n$N = \\dfrac{1}{\\beta} = \\dfrac{d}{D\\lambda}$।\nঅতএব সঠিক উত্তর হলো [খ] $\\dfrac{d}{D\\lambda}$।\n||EN|| Fringes per unit width is $1/\\beta = \\dfrac{d}{D\\lambda}$.'
  },
  {
    num: 7,
    ans: 'গ',
    exp: 'সরল দোলকের পর্যায়কালের সূত্র: $T = 2\\pi\\sqrt{\\dfrac{L}{g}} \\implies L \\propto T^2$।\nদোলনকাল $50\\%$ বৃদ্ধি পেলে নতুন পর্যায়কাল $T\' = 1.5 T$।\nনতুন কার্যকর দৈর্ঘ্য $L\' = (1.5)^2 L = 2.25 L$।\nকার্যকর দৈর্ঘ্যের শতকরা বৃদ্ধি:\n$\\dfrac{L\' - L}{L} \\times 100\\% = (2.25 - 1) \\times 100\\% = 125\\%$।\nঅতএব সঠিক উত্তর হলো [গ] $125\\%$।\n||EN|| $L \\propto T^2$. Increasing $T$ by $50\\%$ gives $L\' = (1.5)^2 L = 2.25L$, an increase of $125\\%$.'
  },
  {
    num: 8,
    ans: 'ঘ',
    exp: 'আদর্শ গ্যাসের মূল-গড়-বর্গ বেগের সূত্র:\n$c_{\\text{rms}} = \\sqrt{\\dfrac{3RT}{M}} \\implies c_{\\text{rms}} \\propto \\sqrt{T}$।\nপরম তাপমাত্রা চারগুণ ($4T$) করা হলে নতুন বেগ:\n$c\'_{\\text{rms}} = \\sqrt{4} \\times c_{\\text{rms}} = 2 c_{\\text{rms}}$ (দ্বিগুণ)।\nঅতএব সঠিক উত্তর হলো [ঘ] দ্বিগুণ।\n||EN|| $c_{\\text{rms}} \\propto \\sqrt{T}$. Quadrupling $T$ doubles the rms velocity ($\times 2$).'
  },
  {
    num: 9,
    ans: 'গ',
    exp: 'উৎস বিচ্ছিন্ন করায় ধারকের আধান $Q$ অপরিবর্তিত থাকে।\nধারকে সঞ্চিত শক্তি: $U = \\dfrac{Q^2}{2C}$।\nপাতদ্বয়ের দূরত্ব দ্বিগুণ ($2d$) করলে ধারকত্ব অর্ধেক হয় ($C\' = C/2$):\n$U\' = \\dfrac{Q^2}{2(C/2)} = 2\\left(\\dfrac{Q^2}{2C}\\right) = 2U$ (দ্বিগুণ)।\nঅতএব সঞ্চিত শক্তি দ্বিগুণ হবে। সঠিক উত্তর হলো [গ] দ্বিগুণ।\n||EN|| Halving capacitance by doubling distance at constant charge doubles stored electrostatic energy $U$.'
  },
  {
    num: 10,
    ans: 'ঘ',
    exp: 'ঘূর্ণনরত আধানের পর্যায়কাল $T = \\dfrac{2\\pi}{\\omega}$।\nপ্রতি সেকেন্ডে কার্যকর তড়িৎপ্রবাহ:\n$I = \\dfrac{q}{T} = \\dfrac{q}{\\dfrac{2\\pi}{\\omega}} = \\dfrac{q\\omega}{2\\pi}$।\nঅতএব সঠিক উত্তর হলো [ঘ] $\\dfrac{q\\omega}{2\\pi}$।\n||EN|| Effective current $I = q/T = \\dfrac{q\\omega}{2\\pi}$.'
  },
  {
    num: 11,
    ans: 'খ',
    exp: 'স্থিতিস্থাপক গুণাঙ্ক $= \\dfrac{\\text{পীড়ন}}{\\text{বিকৃতি}}$।\nযেহেতু বিকৃতি মাত্রাহীন, তাই গুণাঙ্কের মাত্রা পীড়নের সমান:\n$[\\text{গুণাঙ্ক}] = [\\text{পীড়ন}] = \\dfrac{[\\text{বল}]}{[\\text{ক্ষেত্রফল}]} = \\dfrac{\\text{MLT}^{-2}}{\\text{L}^2} = \\text{ML}^{-1}\\text{T}^{-2}$।\nঅতএব সঠিক উত্তর হলো [খ] $\\text{ML}^{-1}\\text{T}^{-2}$।\n||EN|| Modulus has dimension of stress: $\\text{ML}^{-1}\\text{T}^{-2}$.'
  },
  {
    num: 12,
    ans: 'গ',
    exp: 'নিউক্লীয় বিক্রিয়া: $^{27}_{13}\\text{Al} + ^4_2\\text{He} \\rightarrow ^{30}_{14}\\text{Si} + ^A_Z X$।\nভর সংখ্যা সংরক্ষণ: $27 + 4 = 30 + A \\implies A = 1$।\nপারমাণবিক সংখ্যা সংরক্ষণ: $13 + 2 = 14 + Z \\implies Z = 1$।\nভর সংখ্যা $1$ এবং চার্জ $+1$ বিশিষ্ট কণাটি হলো একটি প্রোটন ($^1_1\\text{p}$)।\nঅতএব সঠিক উত্তর হলো [গ] প্রোটন।\n||EN|| Mass conservation: $27+4 = 30+1$. Atomic number: $13+2 = 14+1$. Missing particle is a **proton** ($^1_1\\text{p}$).'
  },
  {
    num: 13,
    ans: 'গ',
    exp: 'অবশিষ্ট ভগ্নাংশ $\\dfrac{N}{N_0} = \\left(\\dfrac{1}{2}\\right)^n = \\dfrac{1}{16} = \\left(\\dfrac{1}{2}\\right)^4 \\implies n = 4$টি অর্ধায়ু।\nদেওয়া আছে মোট সময় $t = 14\\text{ min}$:\n$4 \\times T_{1/2} = 14 \\implies T_{1/2} = \\dfrac{14}{4} = \\dfrac{7}{2}\\text{ min}$।\nঅতএব সঠিক উত্তর হলো [গ] $\\dfrac{7}{2}\\text{ min}$।\n||EN|| $4$ half-lives elapsed in $14\\text{ min}$, so $T_{1/2} = 14/4 = \\dfrac{7}{2}\\text{ min}$.'
  },
  {
    num: 14,
    ans: 'খ',
    exp: 'আরএমএস মান $V_{\\text{rms}} = 10\\text{ V}$ হলে শীর্ষমান:\n$V_0 = \\sqrt{2} \\times V_{\\text{rms}} = 1.4142 \\times 10 = 14.14\\text{ V}$।\nঅতএব সঠিক উত্তর হলো [খ] $14.14\\text{ volt}$।\n||EN|| Peak voltage $V_0 = \\sqrt{2} V_{\\text{rms}} = 14.14\\text{ V}$.'
  },
  {
    num: 15,
    ans: 'খ',
    exp: 'দূরদৃষ্টি (হাইপারমেট্রোপিয়া) ত্রুটিতে চোখের লেন্সের অভিসারী ক্ষমতা কমে যায় এবং আলো রেটিনার পেছনে মিলিত হয়। এই ত্রুটি দূর করতে উপযুক্ত ফোকাস দূরত্বের অভিসারী বা **উত্তল লেন্স** ব্যবহার করা হয়। অতএব সঠিক উত্তর হলো [খ] উত্তল লেন্স।\n||EN|| Hypermetropia is corrected using a convex lens.'
  },

  // Chemistry (16 - 30)
  {
    num: 16,
    ans: 'গ',
    exp: 'কঠিন $\\text{NaCl}$ পানিতে দ্রবীভূত হলে কোনো রাসায়নিক বিক্রিয়া না ঘটিয়ে জলযোজিত আয়নে বিয়োজিত হয়:\n$\\text{NaCl}(s) + \\text{H}_2\\text{O} \\rightarrow \\text{Na}^+(\\text{H}_2\\text{O}) + \\text{Cl}^-(\\text{H}_2\\text{O})$।\nপানির পোলার অণুর বিপরীত প্রান্ত ক্যাটায়ন ও অ্যানায়নকে বেষ্টন করে দ্রবীভূত রাখে। অতএব সঠিক উত্তর হলো [গ] $\\text{Na}^+(\\text{H}_2\\text{O}) + \\text{Cl}^-(\\text{H}_2\\text{O})$।\n||EN|| Dissolving NaCl in water yields hydrated ions $\\text{Na}^+(\\text{H}_2\\text{O}) + \\text{Cl}^-(\\text{H}_2\\text{O})$.'
  },
  {
    num: 17,
    ans: 'খ',
    exp: 'হেসের তাপ সমষ্টিকরণ সূত্রানুসারে:\n$i.\\ \\ \\text{C}(s) + \\dfrac{1}{2}\\text{O}_2(g) \\rightarrow \\text{CO}(g), \\quad \\Delta H_1^\\circ = -111.0\\text{ kJ mol}^{-1}$\n$ii.\\ \\ \\text{CO}(g) + \\dfrac{1}{2}\\text{O}_2(g) \\rightarrow \\text{CO}_2(g), \\quad \\Delta H_2^\\circ = -283.0\\text{ kJ mol}^{-1}$\nবিক্রিয়া দুটি যোগ করলে কার্বনের পূর্ণ দহন বিক্রিয়া পাওয়া যায়:\n$\\text{C}(s) + \\text{O}_2(g) \\rightarrow \\text{CO}_2(g)$\nমোট দহন তাপ $\\Delta H^\\circ = \\Delta H_1^\\circ + \\Delta H_2^\\circ = -111.0 + (-283.0) = -394.0\\text{ kJ mol}^{-1}$।\nঅতএব সঠিক উত্তর হলো [খ] $-394.0\\text{ kJ mol}^{-1}$।\n||EN|| Summing the two reaction enthalpies: $\\Delta H^\\circ = -111.0 - 283.0 = -394.0\\text{ kJ mol}^{-1}$.'
  },
  {
    num: 18,
    ans: 'গ',
    exp: 'আর্সেনিকের পারমাণবিক সংখ্যা $Z = 33$।\nইলেকট্রন বিন্যাস: $[\\text{Ar}]\\,3d^{10}\\,4s^2\\,4p^3$।\nসর্ববহিঃস্থ প্রধান শক্তিস্তর $n = 4$ এ মোট যোজন ইলেকট্রন সংখ্যা $= 2 + 3 = 5$টি।\nঅতএব সঠিক উত্তর হলো [গ] ৫।\n||EN|| Arsenic ($_{33}\\text{As}$) has 5 valence electrons in $4s^2 4p^3$.'
  },
  {
    num: 19,
    ans: 'ক',
    exp: '$E_2$ অপনয়ন বিক্রিয়ায় অ্যালকোহলীয় $\\text{KOH}$ একটি শক্তিশালী ক্ষারক (Base) হিসেবে কাজ করে সাবস্ট্রেটের $\\beta$-কার্বন থেকে একটি প্রোটন ($\\text{H}^+$) অপসারণ করে দ্বিবন্ধন গঠন ত্বরান্বিত করে। অতএব সঠিক উত্তর হলো [ক] তীব্র ক্ষার।\n||EN|| In $E_2$ elimination, alcoholic KOH acts as a strong base to abstract a proton.'
  },
  {
    num: 20,
    ans: 'খ',
    exp: 'হাইড্রোনিয়াম আয়নে ($\\text{H}_3\\text{O}^+$) পানির অণুর দুটি সমযোজী $\\text{O}-\\text{H}$ বন্ধনের পাশাপাশি অক্সিজেনের একটি নিঃসঙ্গ ইলেকট্রন জোড় প্রোটনের ($\\text{H}^+$) সাথে সন্নিবেশ সমযোজী বন্ধন গঠন করে। সুতরাং এতে **সমযোজী ও সন্নিবেশ বন্ধন** বিদ্যমান। সঠিক উত্তর হলো [খ]।\n||EN|| $\\text{H}_3\\text{O}^+$ contains both covalent and coordinate covalent bonds.'
  },
  {
    num: 21,
    ans: 'ঘ',
    exp: 'পানির স্বতঃআয়নন ধ্রুবক $K_w = [\\text{H}_3\\text{O}^+][\\text{OH}^-] = 1.0 \\times 10^{-14}$। এটি একটি সাম্যধ্রুবক যার একক $\\text{mol}^2/\\text{L}^2$ বা $\\text{M}^2$ (অথবা এককহীন)। এর একক কখনোই \'M\' হতে পারে না। অতএব Option [ঘ] "$K_w = 1 \\times 10^{-14}\\text{ M}$" উক্তিটি সত্য নয়। সঠিক উত্তর হলো [ঘ]।\n||EN|| $K_w$ has units $\\text{M}^2$, not M, making option [ঘ] false.'
  },
  {
    num: 22,
    ans: 'ঘ',
    exp: 'ক্রোমিক এসিড মিশ্রণ ($\\text{K}_2\\text{Cr}_2\\text{O}_7 + \\text{গাঢ় } \\text{H}_2\\text{SO}_4$) একটি তীব্র জারক। এটি কাঁচপাত্রের গায়ে লেগে থাকা গ্রিজ ও জৈব পদার্থকে জারণ বিক্রিয়ার মাধ্যমে পানিতে দ্রবণীয় পদার্থে রূপান্তর করে পরিষ্কার করে। অতএব সঠিক উত্তর হলো [ঘ] জারণ।\n||EN|| Chromic acid cleans glassware by oxidizing organic residues.'
  },
  {
    num: 23,
    ans: 'ঘ',
    exp: '$25^\\circ\\text{C}$ এ বিশুদ্ধ পানিতে স্বতঃআয়ননে $[\text{H}^+] = [\\text{OH}^-] = 1.0 \\times 10^{-7}\\text{ M}$।\nএদের মোলার ঘনমাত্রার অনুপাত:\n$\\dfrac{[\\text{OH}^-]}{[\\text{H}^+]} = \\dfrac{1.0 \\times 10^{-7}}{1.0 \\times 10^{-7}} = 1$।\nঅতএব সঠিক উত্তর হলো [ঘ] $1$।\n||EN|| In pure water, $[\\text{OH}^-] = [\\text{H}^+]$, so the ratio is 1.'
  },
  {
    num: 24,
    ans: 'খ',
    exp: '$\\text{PCl}_5$ অণুতে ফসফরাস পরমাণু ৫টি ক্লোরিনের সাথে ৫টি সমযোজী বন্ধনে যুক্ত থাকে, ফলে এর যোজন স্তরে মোট ১০টি ইলেকট্রন বিদ্যমান। এটি অষ্টকের চেয়ে বেশি হওয়ায় **অষ্টক সম্প্রসারণ** (Expanded Octet) প্রদর্শন করে। অতএব সঠিক উত্তর হলো [খ] অষ্টক সম্প্রসারণ।\n||EN|| $\\text{PCl}_5$ has 10 electrons around phosphorus, an example of octet expansion.'
  },
  {
    num: 25,
    ans: 'গ',
    exp: 'প্রমাণ বিজারণ বিভবের মান:\n$\\text{Na}^+/\\text{Na} = -2.71\\text{ V}$, যা প্রদত্ত অপশনগুলোর মধ্যে সর্বনিম্ন (সর্বাধিক ঋণাত্মক)। অতএব সঠিক উত্তর হলো [গ] $\\text{Na}^+(aq)/\\text{Na}(s)$।\n||EN|| Standard reduction potential of $\\text{Na}^+/\\text{Na}$ is $-2.71\\text{ V}$, the lowest among the choices.'
  },
  {
    num: 26,
    ans: 'খ',
    exp: '$a\\text{A} \\rightarrow b\\text{B}$ বিক্রিয়ায় সময়ের সাথে বিক্রিয়ক $\\text{A}$ হ্রাসের হার দ্বারা বিক্রিয়ার হার প্রকাশ করা হয়:\n$\\text{বিক্রিয়ার হার} = -\\dfrac{1}{a}\\dfrac{d[A]}{dt}$।\nঅতএব সঠিক উত্তর হলো [খ] $-\\dfrac{1}{a}\\dfrac{d[A]}{dt}$।\n||EN|| Rate of reaction with respect to reactant A is $-\\dfrac{1}{a}\\dfrac{d[A]}{dt}$.'
  },
  {
    num: 27,
    ans: 'গ',
    exp: 'দুধে বিদ্যমান সর্বপ্রধান প্রোটিন হলো **ক্যাসিন (Casein)**, যা দুধের মোট প্রোটিনের প্রায় ৮০%। অতএব সঠিক উত্তর হলো [গ] ক্যাসিন।\n||EN|| Casein is the primary protein in milk (~80%).'
  },
  {
    num: 28,
    ans: 'ঘ',
    exp: 'টলেন বিকারকের সাথে সিলভার দর্পণ পরীক্ষা কেবল অ্যালডিহাইড দেয়। অপশনগুলোর মধ্যে প্রপান্যাল ($\\text{CH}_3\\text{CH}_2\\text{CHO}$) একটি অ্যালডিহাইড। অতএব সঠিক উত্তর হলো [ঘ] প্রপান্যাল।\n||EN|| Propanal is an aldehyde and thus gives a positive Tollens\' test.'
  },
  {
    num: 29,
    ans: 'ক',
    exp: 'অ্যামিনো মূলকের ($-\\text{NH}_2$) নাইট্রোজেনের নিঃসঙ্গ ইলেকট্রন জোড় রেজোন্যান্সের মাধ্যমে বেনজিন বলয়ে ইলেকট্রন ঘনত্ব বাড়িয়ে অর্থো-প্যারা অবস্থানে সক্রিয়তা বৃদ্ধি করে। অতএব এটি বলয় সক্রিয়কারী মূলক। সঠিক উত্তর হলো [ক] $-\\text{NH}_2$।\n||EN|| The amino group ($-\\text{NH}_2$) donates electrons via resonance, activating the ring.'
  },
  {
    num: 30,
    ans: 'খ',
    exp: 'বামার সিরিজের জন্য $n_1 = 2$। সর্বনিম্ন তরঙ্গ সংখ্যা পাওয়া যায় প্রথম রেখায় ($n_2 = 3$):\n$\\bar{\\nu} = R_H\\left(\\dfrac{1}{2^2} - \\dfrac{1}{3^2}\\right) = R_H\\left(\\dfrac{1}{4} - \\dfrac{1}{9}\\right) = \\dfrac{5}{36}R_H$।\nঅতএব সঠিক উত্তর হলো [খ] $\\dfrac{5}{36}R_H$।\n||EN|| For Balmer series, minimum wavenumber is for $n_2=3$: $\\bar{\\nu} = R_H(1/4 - 1/9) = \\dfrac{5}{36}R_H$.'
  },

  // Mathematics (31 - 45)
  {
    num: 31,
    ans: 'ক',
    exp: 'পোলার সমীকরণ: $r^2 - 2r\\sin\\theta = 3$।\nকার্তেসীয় রূপ: $x^2 + y^2 - 2y = 3 \\implies x^2 + (y-1)^2 = 4 = 2^2$।\nএটি $(0, 1)$ কেন্দ্র এবং ব্যাসার্ধ $r = 2$ একক বিশিষ্ট একটি বৃত্ত।\nঅতএব সঠিক উত্তর হলো [ক] $2$।\n||EN|| Cartesian form is $x^2 + (y-1)^2 = 2^2$. Radius is $2$.'
  },
  {
    num: 32,
    ans: 'গ',
    exp: '$\\lim_{x \\to 0} \\dfrac{1-\\cos x}{\\sin^2 2x} = \\lim_{x \\to 0} \\dfrac{2\\sin^2(x/2)}{\\sin^2 2x} = 2 \\lim_{x \\to 0} \\dfrac{(x/2)^2}{(2x)^2} = 2 \\times \\dfrac{x^2/4}{4x^2} = 2 \\times \\dfrac{1}{16} = \\dfrac{1}{8}$।\nঅতএব সঠিক উত্তর হলো [গ] $\\dfrac{1}{8}$।\n||EN|| $\\lim_{x \\to 0} \\dfrac{2(x/2)^2}{(2x)^2} = \\dfrac{2(1/4)}{4} = \\dfrac{1}{8}$.'
  },
  {
    num: 33,
    ans: 'ঘ',
    exp: '$R^2 = 3^2 + 2^2 + 2(3)(2)\\cos\\alpha = 13 + 12\\cos\\alpha$ ... (১)\n১ম বল দ্বিগুণ করলে: $(2R)^2 = 4R^2 = 6^2 + 2^2 + 2(6)(2)\\cos\\alpha = 40 + 24\\cos\\alpha$ ... (২)\n(১) থেকে $R^2$ এর মান বসিয়ে:\n$4(13 + 12\\cos\\alpha) = 40 + 24\\cos\\alpha \\implies 52 + 48\\cos\\alpha = 40 + 24\\cos\\alpha$\n$\\implies 24\\cos\\alpha = -12 \\implies \\cos\\alpha = -\\dfrac{1}{2} \\implies \\alpha = 120^\\circ$।\nঅতএব সঠিক উত্তর হলো [ঘ] $120^\\circ$।\n||EN|| $4(13 + 12\\cos\\alpha) = 40 + 24\\cos\\alpha \\implies \\cos\\alpha = -1/2 \\implies \\alpha = 120^\\circ$.'
  },
  {
    num: 34,
    ans: 'খ',
    exp: 'উল্লম্বভাবে নিক্ষিপ্ত বস্তুর সর্বোচ্চ উচ্চতা: $H = \\dfrac{v_0^2}{2g}$।\nআদিবেগ $v_0 = 2u$ হলে:\n$H = \\dfrac{(2u)^2}{2g} = \\dfrac{4u^2}{2g} = \\dfrac{2u^2}{g}$।\nঅতএব সঠিক উত্তর হলো [খ] $\\dfrac{2u^2}{g}$।\n||EN|| $H = (2u)^2/(2g) = \\dfrac{2u^2}{g}$.'
  },
  {
    num: 35,
    ans: 'গ',
    exp: '$\\dfrac{d}{dx}[\\cos^2(\\ln x)] = 2\\cos(\\ln x)[-\\sin(\\ln x)] \\cdot \\dfrac{1}{x} = -\\dfrac{2\\sin(\\ln x)\\cos(\\ln x)}{x} = -\\dfrac{\\sin(2\\ln x)}{x}$।\nঅতএব সঠিক উত্তর হলো [গ] $-\\dfrac{\\sin(2\\ln x)}{x}$।\n||EN|| By chain rule: $2\\cos(\\ln x)(-\\sin(\\ln x))(1/x) = -\\dfrac{\\sin(2\\ln x)}{x}$.'
  },
  {
    num: 36,
    ans: 'ঘ',
    exp: 'তিনটি ছক্কা একত্রে নিক্ষেপে মোট ফলাফল $= 6^3 = 216$।\nতিনটিতেই একই সংখ্যা পাওয়ার ফলাফল ৬টি: $(1,1,1), (2,2,2), \\dots, (6,6,6)$।\nসম্ভাবনা $= \\dfrac{6}{216} = \\dfrac{1}{36}$।\nঅতএব সঠিক উত্তর হলো [ঘ] $\\dfrac{1}{36}$।\n||EN|| Probability $= 6/216 = 1/36$.'
  },
  {
    num: 37,
    ans: 'ক',
    exp: '$x^2 - 2x + 1 = (x-1)^2 = 0 \\implies$ মূলদ্বয় $\\alpha = 1, \\beta = 1$।\nএদের ত্রিঘাতের সমষ্টি $= 1^3 + 1^3 = 1 + 1 = 2$।\nঅতএব সঠিক উত্তর হলো [ক] $2$।\n||EN|| Roots are 1 and 1. Sum of their cubes is $1^3 + 1^3 = 2$.'
  },
  {
    num: 38,
    ans: 'গ',
    exp: '$(1+x)^7(1-x)^8 = (1-x^2)^7(1-x) = (1-x^2)^7 - x(1-x^2)^7$।\n$(1-x^2)^7$ এর বিস্তৃতিতে কেবল $x$ এর জোড় ঘাত থাকে।\nসুতরাং $x^7$ পদটি আসবে $-x(1-x^2)^7$ এর $x^6$ পদ হতে:\n$-x \\left[ \\binom{7}{3}(-x^2)^3 \\right] = -x \\left[ 35(-x^6) \\right] = +35x^7$।\nঅতএব $x^7$ এর সহগ হলো $35$। সঠিক উত্তর হলো [গ] $35$।\n||EN|| Term with $x^7$ is $-x \\times [\\binom{7}{3}(-1)^3 x^6] = 35x^7$, so coefficient is 35.'
  },
  {
    num: 39,
    ans: 'ক',
    exp: '$y^2 + 8y + 16 = 2x - 22 + 16 = 2x - 6 \\implies (y+4)^2 = 2(x-3)$।\nআদর্শ আকার $(y-k)^2 = 4a(x-h)$ এর সাথে তুলনা করলে শীর্ষবিন্দু $(h, k) = (3, -4)$।\nঅতএব সঠিক উত্তর হলো [ক] $(3, -4)$।\n||EN|| Vertex of $(y+4)^2 = 2(x-3)$ is $(3, -4)$.'
  },
  {
    num: 40,
    ans: 'খ',
    exp: '$\\int_0^2 |x-1|\\,dx = \\int_0^1 (1-x)\\,dx + \\int_1^2 (x-1)\\,dx = \\left[x - \\dfrac{x^2}{2}\\right]_0^1 + \\left[\\dfrac{x^2}{2} - x\\right]_1^2 = \\dfrac{1}{2} + \\dfrac{1}{2} = 1$।\nঅতএব সঠিক উত্তর হলো [খ] $1$।\n||EN|| $\\int_0^1 (1-x)\\,dx + \\int_1^2 (x-1)\\,dx = 1/2 + 1/2 = 1$.'
  },
  {
    num: 41,
    ans: 'গ',
    exp: 'বাস্তব মানের জন্য:\n১. $x - 2 \\ge 0 \\implies x \\ge 2$।\n২. $3 - \\sqrt{x-2} \\ge 0 \\implies \\sqrt{x-2} \\le 3 \\implies x - 2 \\le 9 \\implies x \\le 11$।\nঅতএব ডোমেন $2 \\le x \\le 11$। সঠিক উত্তর হলো [গ] $2 \\le x \\le 11$।\n||EN|| Domain condition: $x \\ge 2$ and $x-2 \\le 9 \\implies 2 \\le x \\le 11$.'
  },
  {
    num: 42,
    ans: 'খ',
    exp: '$\\csc\\theta + \\cot\\theta = \\sqrt{3} \\implies \\dfrac{1+\\cos\\theta}{\\sin\\theta} = \\cot(\\theta/2) = \\sqrt{3} \\implies \\dfrac{\\theta}{2} = \\dfrac{\\pi}{6} \\implies \\theta = \\dfrac{\\pi}{3}$।\nঅতএব সঠিক উত্তর হলো [খ] $\\dfrac{\\pi}{3}$।\n||EN|| $\\cot(\\theta/2) = \\sqrt{3} \\implies \\theta/2 = \\pi/6 \\implies \\theta = \\pi/3$.'
  },
  {
    num: 43,
    ans: 'ঘ',
    exp: '$A$ এর আকার $4 \\times 5 \\implies A^T$ এর আকার $5 \\times 4$। $B$ এর আকার $5 \\times 4$ হওয়ায় $(A^T + B)$ এর আকার $5 \\times 4$।\n$C$ এর আকার $4 \\times 2$। এদের গুণফল $(5 \\times 4) \\times (4 \\times 2) = 5 \\times 2$।\nঅতএব সঠিক উত্তর হলো [ঘ] $5 \\times 2$।\n||EN|| $(A^T + B)$ is $5 \\times 4$. Multiplied by $C$ ($4 \\times 2$), size is $5 \\times 2$.'
  },
  {
    num: 44,
    ans: 'ক',
    exp: 'সমান্তরাল রেখা $3x - 4y + 1 = 0$ এবং $3x - 4y + 6 = 0$ এর মধ্যবর্তী লম্ব দূরত্ব:\n$d = \\dfrac{|1 - 6|}{\\sqrt{3^2 + (-4)^2}} = \\dfrac{5}{\\sqrt{25}} = \\dfrac{5}{5} = 1$ একক।\nঅতএব সঠিক উত্তর হলো [ক] $1$।\n||EN|| Distance $d = |1-6|/\\sqrt{3^2+4^2} = 5/5 = 1$.'
  },
  {
    num: 45,
    ans: 'গ',
    exp: '$\\lim_{x \\to 0} \\dfrac{e^x + e^{-x} - 2}{x^2}$ ($\\dfrac{0}{0}$ আকার)।\nলা হসপিটাল নিয়মে:\n$\\lim_{x \\to 0} \\dfrac{e^x - e^{-x}}{2x} = \\lim_{x \\to 0} \\dfrac{e^x + e^{-x}}{2} = \\dfrac{1+1}{2} = 1$।\nঅতএব সঠিক উত্তর হলো [গ] $1$।\n||EN|| L\'Hôpital twice gives $(e^0 + e^0)/2 = 1$.'
  },

  // Biology (46 - 60)
  {
    num: 46,
    ans: 'খ',
    exp: 'রক্তনালীর ভেতর স্বাভাবিক অবস্থায় রক্ত জমাট বাঁধে না কারণ রক্তে প্রাকৃতিক অ্যান্টিকোয়াগুল্যান্ট **হেপারিন (Heparin)** উপস্থিত থাকে। এটি বেসোফিল ও মাস্ট কোষ থেকে ক্ষরিত হয়। অতএব সঠিক উত্তর হলো [খ] হেপারিন।\n||EN|| Heparin is a natural anticoagulant that prevents intravascular clotting.'
  },
  {
    num: 47,
    ans: 'ক',
    exp: 'সালোকসংশ্লেষণের আলোক পর্যায়ে ক্লোরোফিল অণু কর্তৃক শোষিত আলোক শক্তি রাসায়নিক শক্তি হিসেবে **ATP এবং $\\text{NADPH} + \\text{H}^+$**-এ সঞ্চিত হয়। অতএব সঠিক উত্তর হলো [ক]।\n||EN|| Light reactions generate ATP and $\\text{NADPH} + \\text{H}^+$.'
  },
  {
    num: 48,
    ans: 'গ',
    exp: 'প্লাটিহেলমিনথিস (Platyhelminthes) পর্বের প্রাণীদের (চ্যাপ্টাকৃমি) প্রধান রেচন অঙ্গাণু হলো **শিখা কোষ (Flame cell)**। অতএব সঠিক উত্তর হলো [গ] শিখা কোষ।\n||EN|| Flame cells are the excretory units of Platyhelminthes.'
  },
  {
    num: 49,
    ans: 'খ',
    exp: 'পাকস্থলীর গ্যাস্ট্রিক জুসে প্রধান আমিষ পরিপাককারী এনজাইম হলো **পেপসিন (Pepsin)**। এটি অম্লীয় মাধ্যমে প্রোটিনকে প্রোটিওজ ও পেপটনে ভাঙে। অতএব সঠিক উত্তর হলো [খ] পেপসিন।\n||EN|| Pepsin is the primary protein-digesting enzyme in the stomach.'
  },
  {
    num: 50,
    ans: 'ঘ',
    exp: 'অ্যানাফেজ দশায় সেন্ট্রোমিয়ার কিছুটা একপাশে অবস্থিত থাকার কারণে **সাব-মেটাসেন্ট্রিক ক্রোমোজোম** দেখতে ইংরেজি \'L\' অক্ষরের মতো দেখায়। অতএব সঠিক উত্তর হলো [ঘ] সাব-মেটাসেন্ট্রিক।\n||EN|| Sub-metacentric chromosomes appear L-shaped during anaphase.'
  },
  {
    num: 51,
    ans: 'ঘ',
    exp: 'পতঙ্গের সম্পূর্ণ রূপান্তরের ৪টি পর্যায়ক্রমিক ধাপ হলো: **ডিম $\\rightarrow$ লার্ভা $\\rightarrow$ পিউপা $\\rightarrow$ পূর্ণাঙ্গ পতঙ্গ**। অতএব সঠিক উত্তর হলো [ঘ]।\n||EN|| Complete metamorphosis stages: Egg $\\rightarrow$ Larva $\\rightarrow$ Pupa $\\rightarrow$ Adult.'
  },
  {
    num: 52,
    ans: 'গ',
    exp: 'মুক্ত (Open) ভাস্কুলার বান্ডলে জাইলেম ও ফ্লোয়েমের মাঝে ভাজক টিস্যু **ক্যাম্বিয়াম (Cambium)** স্তর উপস্থিত থাকে, যা উদ্ভিদের কাণ্ডের গৌণ বৃদ্ধির জন্য দায়ী। অতএব সঠিক উত্তর হলো [গ] ক্যাম্বিয়াম।\n||EN|| An open vascular bundle contains a cambium layer between xylem and phloem.'
  },
  {
    num: 53,
    ans: 'খ',
    exp: 'মানবদেহের বৃক্কের গঠন ও কাজের মৌলিক একক হলো **নেফ্রন (Nephron)**। প্রতিটি বৃক্কে প্রায় ১০-১২ লক্ষ নেফ্রন থাকে। অতএব সঠিক উত্তর হলো [খ] নেফ্রন।\n||EN|| The structural and functional unit of the kidney is the nephron.'
  },
  {
    num: 54,
    ans: 'খ',
    exp: 'মাইটোকন্ড্রিয়া ও আদি কোষে বিদ্যমান 70S রাইবোসোম দুটি সাবইউনিট নিয়ে গঠিত: বড় সাবইউনিট **50S** এবং ছোট সাবইউনিট **30S**। অতএব সঠিক উত্তর হলো [খ] 50S এবং 30S।\n||EN|| 70S ribosomes consist of 50S and 30S subunits.'
  },
  {
    num: 55,
    ans: 'ক',
    exp: 'ডিএনএ অণুর পিরিমিডিন বেসসমূহ হলো সাইটোসিন (C) এবং **থাইমিন (T)**। অ্যাডেনিন ও গুয়ানিন হলো পিউরিন বেস। অতএব সঠিক উত্তর হলো [ক] থাইমিন।\n||EN|| Thymine is a pyrimidine base in DNA.'
  },
  {
    num: 56,
    ans: 'খ',
    exp: 'দ্বৈত প্রচ্ছন্ন এপিস্ট্যাসিসের (Duplicate Recessive Epistasis) কারণে মেন্ডেলের ডাইহাইব্রিড অনুপাত পরিবর্তিত হয়ে **$9 : 7$** হয় (যেমন জন্মগত মূক-বধিরতা)। অতএব সঠিক উত্তর হলো [খ] $9 : 7$।\n||EN|| Duplicate recessive epistasis gives a $9:7$ phenotypic ratio.'
  },
  {
    num: 57,
    ans: 'খ',
    exp: 'ম্যালভ্যাসি (Malvaceae) গোত্রের পরাগধানী একপ্রকোষ্ঠী এবং দেখতে **বৃক্কাকার (Kidney-shaped)**। অতএব সঠিক উত্তর হলো [খ] বৃক্কাকার।\n||EN|| Anthers in Malvaceae are kidney-shaped (reniform).'
  },
  {
    num: 58,
    ans: 'খ',
    exp: 'হৃৎস্পন্দন পরিবহনের সঠিক পর্যায়ক্রমিক পথ: **$\\text{SAN} \\rightarrow \\text{AVN} \\rightarrow \\text{বান্ডল অব হিজ} \\rightarrow \\text{পারকিনজি তন্তু}$**। অতএব সঠিক উত্তর হলো [খ]।\n||EN|| Cardiac conduction sequence: $\\text{SAN} \\rightarrow \\text{AVN} \\rightarrow \\text{Bundle of His} \\rightarrow \\text{Purkinje fibers}$.'
  },
  {
    num: 59,
    ans: 'গ',
    exp: 'রুই মাছের ভেনাস হৃদপিণ্ডে রক্তপ্রবাহের ক্রম: **সাইনাস ভেনোসাস $\\rightarrow$ অলিন্দ $\\rightarrow$ নিলয় $\\rightarrow$ বালবাস আর্টারিওসাস**। অতএব সঠিক উত্তর হলো [গ]।\n||EN|| Fish heart sequence: Sinus venosus $\\rightarrow$ Atrium $\\rightarrow$ Ventricle $\\rightarrow$ Bulbus arteriosus.'
  },
  {
    num: 60,
    ans: 'খ',
    exp: 'রিকম্বিন্যান্ট ডিএনএ প্রযুক্তিতে ডিএনএ অণুর নির্দিষ্ট অংশ কেটে ফেলার আণবিক কাঁচি হলো **রেস্ট্রিকশন এনজাইম (Restriction Enzyme)**। অতএব সঠিক উত্তর হলো [খ] রেস্ট্রিকশন এনজাইম।\n||EN|| Restriction enzymes act as molecular scissors to cut DNA at specific sites.'
  },

  // Bangla (61 - 75)
  {
    num: 61,
    ans: 'খ',
    exp: '\'অনসূয়া\' শব্দটির সঠিক অর্থ যার মধ্যে ঈর্ষা বা পরশ্রীকাতরতা নেই (ন অসূয়া = অনসূয়া)। ব্যাকরণসম্মত শুদ্ধ বানান হলো **অনসূয়া** (দন্ত্য-স-এ দীর্ঘ ঊ)। অতএব সঠিক উত্তর হলো [খ] অনসূয়া।\n||EN|| The correct spelling is \'অনসূয়া\'.'
  },
  {
    num: 62,
    ans: 'ঘ',
    exp: '\'দুরবস্থা\' (দুর্ + অবস্থা = দুরবস্থা), \'শ্রদ্ধাঞ্জলি\' (অঞ্জলি যুক্ত শব্দে হ্রস্ব ই-কার), এবং \'মুমূর্ষু\' (ম-এ হ্রস্ব উ, ম-এ দীর্ঘ ঊ রেফ, ষ-এ হ্রস্ব উ)—এই তিনটি বানানই সম্পূর্ণ প্রমিত ও নির্ভুল। অতএব সঠিক উত্তর হলো [ঘ]।\n||EN|| \'দুরবস্থা\', \'শ্রদ্ধাঞ্জলি\', and \'মুমূর্ষু\' are all correctly spelled.'
  },
  {
    num: 63,
    ans: 'ক',
    exp: 'ক্রিয়াপদের মূল বা অবিভাজ্য অংশকে **ধাতু (Verb root)** বলে। ধাতুর সাথে বিভক্তি যুক্ত হয়ে ক্রিয়াপদ গঠিত হয়। অতএব সঠিক উত্তর হলো [ক] ধাতু।\n||EN|| The root of a verb is called \'ধাতু\'.'
  },
  {
    num: 64,
    ans: 'খ',
    exp: '\'পয়জার\' শব্দের অর্থ জুতো। এটি ফারসি শব্দ \'পায়জার\' থেকে বাংলা ভাষায় আগত একটি **ফারসি শব্দ**। অতএব সঠিক উত্তর হলো [খ] ফারসি।\n||EN|| \'পয়জার\' is a Persian loanword meaning shoe.'
  },
  {
    num: 65,
    ans: 'ঘ',
    exp: '\'শৃঙ্গ\' শব্দের সংস্কৃত ব্যঞ্জনসন্ধি বিচ্ছেদ হলো: **শম্ + গ = শৃঙ্গ**। অতএব সঠিক উত্তর হলো [ঘ] শম্ + গ।\n||EN|| Sandhi split: শম্ + গ = শৃঙ্গ.'
  },
  {
    num: 66,
    ans: 'খ',
    exp: '\'অকূল পাথার\' বাগধারাটির অর্থ কূলহীন সমুদ্র বা **ভীষণ বিপদ**। অসহায় সংকটময় পরিস্থিতি প্রকাশে এটি ব্যবহৃত হয়। অতএব সঠিক উত্তর হলো [খ] ভীষণ বিপদ।\n||EN|| \'অকূল পাথার\' means extreme danger or great peril.'
  },
  {
    num: 67,
    ans: 'গ',
    exp: '\'উপকূল\' শব্দটির ব্যাসবাক্য হলো \'কূলের সমীপে\'। পূর্বপদে উপসর্গ/অব্যয় বসে সামীপ্য অর্থ প্রকাশ করায় এটি একটি **অব্যয়ীভাব সমাস**। অতএব সঠিক উত্তর হলো [গ] অব্যয়ীভাব সমাস।\n||EN|| \'উপকূল\' (কূলের সমীপে) is an Avyayibhava compound.'
  },
  {
    num: 68,
    ans: 'ক',
    exp: '\'লাবণ্য\' শব্দে কোনো বাহ্যিক নিয়ম ছাড়াই স্বভাবতই মূর্ধন্য-ণ (নিত্য মূর্ধন্য-ণ) বসে। বাকি বিদেশি ও খাঁটি বাংলা শব্দে মূর্ধন্য-ণ হয় না। অতএব সঠিক উত্তর হলো [ক] লাবণ্য।\n||EN|| \'লাবণ্য\' naturally takes retroflex \'ণ\'.'
  },
  {
    num: 69,
    ans: 'খ',
    exp: '\'অভিধান\' শব্দটির সঠিক ব্যুৎপত্তি: **অভি (উপসর্গ) + $\\surd$ধা (ধাতু) + অন (প্রত্যয়) = অভিধান**। অতএব সঠিক উত্তর হলো [খ] অভি + $\\surd$ধা + অন।\n||EN|| Etymology: অভি + $\\surd$ধা + অন.'
  },
  {
    num: 70,
    ans: 'ঘ',
    exp: '\'আবির্ভাব\' শব্দের অর্থ আত্মপ্রকাশ। এর সরাসরি বিপরীতার্থক শব্দ হলো অন্তর্ধান বা **তিরোভাব**। অতএব সঠিক উত্তর হলো [ঘ] তিরোভাব।\n||EN|| Antonym of \'আবির্ভাব\' is \'তিরোভাব\' (disappearance).'
  },
  {
    num: 71,
    ans: 'গ',
    exp: '\'বায়ান্নর দিনগুলো\' রচনায় ফরিদপুর জেলে অনশন ধর্মঘটের সময় বঙ্গবন্ধুর সহযোদ্ধা ছিলেন **মহিউদ্দিন আহমেদ**। অতএব সঠিক উত্তর হলো [গ] মহিউদ্দিন আহমেদ।\n||EN|| Bangabandhu\'s hunger strike companion was Mohiuddin Ahmed.'
  },
  {
    num: 72,
    ans: 'গ',
    exp: 'সৈয়দ ওয়ালীউল্লাহর \'লালসালু\' উপন্যাসে মজিদের বর্ণিত \'মোদাচ্ছের\' পীরের নামের অর্থ হলো **নাম-না-জানা বা অজ্ঞাত**। অতএব সঠিক উত্তর হলো [গ] নাম-না-জানা।\n||EN|| In \'Lalsalu\', \'মোদাচ্ছের\' signifies an unknown or unnamed person.'
  },
  {
    num: 73,
    ans: 'ঘ',
    exp: '\'বিদ্রোহী\' কবিতায় কবি কাজী নজরুল ইসলাম ঘোষণা করেছেন: "যবে উৎপীড়িতের ক্রন্দন-রোল আকাশে বাতাসে ধ্বনিবে না" তখনই তিনি শান্ত হবেন। অতএব সঠিক উত্তর হলো [ঘ]।\n||EN|| The rebel poet will rest only when the cries of the oppressed cease.'
  },
  {
    num: 74,
    ans: 'ঘ',
    exp: '"আমাদের বাড়ি আছে কিন্তু গৃহ নাই"-বেগম রোকেয়ার সমাজ সচেতনমূলক **\'গৃহ\'** প্রবন্ধের একটি বিখ্যাত উক্তি। অতএব সঠিক উত্তর হলো [ঘ] গৃহ।\n||EN|| The line is from Begum Rokeya\'s essay \'গৃহ\'.'
  },
  {
    num: 75,
    ans: 'খ',
    exp: 'কাজী নজরুল ইসলামের \'সাম্যবাদী\' কবিতায় উল্লেখিত \'জেন্দাবেস্তা\' হলো প্রাচীন পারস্যের অগ্নিউপাসক **পারসিদের ধর্মগ্রন্থ** (Zend-Avesta)। অতএব সঠিক উত্তর হলো [খ] পারসিদের ধর্মগ্রন্থ।\n||EN|| \'Zend-Avesta\' is the sacred scripture of the Parsis (Zoroastrians).'
  },

  // English (76 - 90)
  {
    num: 76,
    ans: 'ঘ',
    exp: 'The adjective \'good\' takes the preposition \'at\' when expressing skill or ability: "good at English". Correct answer is [ঘ] at.\n||EN|| Correct preposition is \'good at\'.'
  },
  {
    num: 77,
    ans: 'ঘ',
    exp: 'Fractions modifying uncountable nouns require a singular verb: "Two-thirds of the work has been completed." Correct answer is [ঘ] has been.\n||EN|| Singular auxiliary \'has been\' with uncountable noun \'work\'.'
  },
  {
    num: 78,
    ans: 'ক',
    exp: '\'Incredible\' means difficult to believe (অবিশ্বাস্য). Its exact synonym is \'unbelievable\'. Correct answer is [ক] unbelievable.\n||EN|| \'Incredible\' = \'unbelievable\'.'
  },
  {
    num: 79,
    ans: 'খ',
    exp: 'Active causative verb \'make\' takes a bare infinitive: "made them write the essay". Correct answer is [খ] write.\n||EN|| Causative \'make\' requires bare infinitive \'write\'.'
  },
  {
    num: 80,
    ans: 'ঘ',
    exp: 'The phrasal verb \'look forward to\' is followed by a gerund: "look forward to hearing from you". Correct answer is [ঘ] hearing.\n||EN|| Followed by gerund: \'hearing\'.'
  },
  {
    num: 81,
    ans: 'গ',
    exp: '\'Ephemeral\' means lasting for a very short time (ক্ষণস্থায়ী). Its closest synonym is \'short-lived\'. Correct answer is [গ] short-lived.\n||EN|| \'Ephemeral\' = \'short-lived\'.'
  },
  {
    num: 82,
    ans: 'ঘ',
    exp: 'Correlative negative inversion: "Hardly had I arrived... when the train left." Correct answer is [ঘ] had I arrived / when.\n||EN|| Structure: Hardly had + subject + V3... when.'
  },
  {
    num: 83,
    ans: 'গ',
    exp: '\'Benevolent\' means kind and charitable. Its exact antonym is \'Malevolent\' (spiteful or malicious). Correct answer is [গ] malevolent.\n||EN|| Antonym of benevolent is malevolent.'
  },
  {
    num: 84,
    ans: 'গ',
    exp: 'Infinitive of purpose: "She went to the market to purchase some vegetables." Correct answer is [গ] to purchase.\n||EN|| \'To purchase\' indicates purpose.'
  },
  {
    num: 85,
    ans: 'ঘ',
    exp: 'Correct standard spelling is **Accommodation** (double \'c\' and double \'m\'). Correct answer is [ঘ] Accommodation.\n||EN|| Correct spelling: Accommodation.'
  },
  {
    num: 86,
    ans: 'খ',
    exp: '\'Preferable\' takes the preposition \'to\', not \'than\': "Health is preferable to wealth." Correct answer is [খ] to.\n||EN|| \'Preferable to\', not than.'
  },
  {
    num: 87,
    ans: 'ঘ',
    exp: 'The idiom \'Burn the candle at both ends\' means to work excessively hard and exhaust oneself. Correct answer is [ঘ] work excessively hard.\n||EN|| Means to work excessively hard.'
  },
  {
    num: 88,
    ans: 'গ',
    exp: 'Passive voice of "The police caught the thief" is "The thief was caught by the police." Correct answer is [গ].\n||EN|| Passive: "The thief was caught by the police".'
  },
  {
    num: 89,
    ans: 'গ',
    exp: 'A detailed plan, route, or schedule for a journey is called an **itinerary** (ভ্রমণসূচি). Correct answer is [গ] itinerary.\n||EN|| An itinerary is a travel schedule/plan.'
  },
  {
    num: 90,
    ans: 'গ',
    exp: 'A person who hates or distrusts humanity is called a **misanthrope**. Correct answer is [গ] misanthrope.\n||EN|| A misanthrope hates humankind.'
  }
];

module.exports = { solutions20_21 };
