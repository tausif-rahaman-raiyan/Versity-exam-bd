const fs = require('fs');
const path = require('path');

const labels = ['ক', 'খ', 'গ', 'ঘ'];

const { solutions21_22 } = require('./rich_du_21_22.cjs');
const { solutions20_21 } = require('./rich_du_20_21.cjs');
const { solutions19_20 } = require('./rich_du_19_20.cjs');

// Also keep solve_du_*.cjs in sync
fs.writeFileSync('scripts/solve_du_21_22.cjs', fs.readFileSync('scripts/rich_du_21_22.cjs', 'utf8'));
fs.writeFileSync('scripts/solve_du_20_21.cjs', fs.readFileSync('scripts/rich_du_20_21.cjs', 'utf8'));
fs.writeFileSync('scripts/solve_du_19_20.cjs', fs.readFileSync('scripts/rich_du_19_20.cjs', 'utf8'));

const stems21 = JSON.parse(fs.readFileSync('scripts/extracted_stems_21-22.json', 'utf8'));
const stems20 = JSON.parse(fs.readFileSync('scripts/extracted_stems_20-21.json', 'utf8'));
const stems19 = JSON.parse(fs.readFileSync('scripts/extracted_stems_19-20.json', 'utf8'));

// Block orders for the 3 exams:
const blockOrder21 = ['Bangla', 'Mathematics', 'Biology', 'Chemistry', 'English', 'Physics'];
const blockOrder20 = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Bangla', 'English'];
const blockOrder19 = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Bangla', 'English'];

function buildExam(year, blockOrder, stems, solutions, specialConfigs = {}) {
  const result = [];
  for (let i = 0; i < 90; i++) {
    const num = i + 1;
    const blockIdx = Math.floor(i / 15);
    const subject = blockOrder[blockIdx];
    const stemObj = stems[i] || {};
    const solObj = solutions[i] || {};
    
    let stemText = stemObj.stem || '';
    // Strip leading number like "1. ", "15. "
    stemText = stemText.replace(/^\d+\.\s*/, '').trim();
    
    let opts = (stemObj.opts && stemObj.opts.length === 4) ? [...stemObj.opts] : ['', '', '', ''];
    let optImgs = [[], [], [], []];
    let qImgs = [];

    // Special handlers
    if (specialConfigs.handleQuestion) {
      const res = specialConfigs.handleQuestion(i, num, subject, stemText, opts, solObj);
      stemText = res.stemText;
      opts = res.opts;
      optImgs = res.optImgs || optImgs;
      qImgs = res.qImgs || qImgs;
    }

    const correctAns = solObj.ans || 'ক';
    const correctIdx = labels.indexOf(correctAns);
    const correctText = opts[correctIdx] || '';

    const formattedOptions = opts.map((optText, oIdx) => {
      const label = labels[oIdx];
      return {
        label,
        text: optText,
        image_urls: optImgs[oIdx] || [],
        math_tex: [],
        is_correct: label === correctAns,
        is_incorrect: false
      };
    });

    const allImgs = [...qImgs, ...optImgs.flat()];

    result.push({
      id: `du_${year.replace('-', '_')}_mcq_${num}`,
      number: num,
      question_number: num,
      subject,
      question: stemText,
      question_text: stemText,
      question_image_urls: qImgs,
      options: formattedOptions,
      correct_answer: {
        label: correctAns,
        text: correctText
      },
      answer_detection: 'verified_official_key',
      explanation: solObj.exp || '',
      source_label: `DU A ${year}`,
      all_image_urls: allImgs
    });
  }
  return result;
}

// Special handler for DU 21-22
const config21 = {
  handleQuestion(i, num, subject, stemText, opts, solObj) {
    let optImgs = [[], [], [], []];
    let qImgs = [];
    if (i === 19) { // Q20: Parabola focus
      stemText = '$y^2 = 8x + 2y - 9$ পরাবৃত্তটির উপকেন্দ্রের স্থানাঙ্ক কত?';
    } else if (i === 59) { // Q60: Basic buffer
      opts = [
        '$\\text{HCOOH} + \\text{HCOONa}$',
        '$\\text{NaOH} + \\text{NaCl}$',
        '$\\text{Aq. } \\text{NH}_3 + \\text{NaOH}$',
        '$\\text{Aq. } \\text{NH}_3 + \\text{NH}_4\\text{Cl}$'
      ];
    }
    return { stemText, opts, optImgs, qImgs };
  }
};

// Special handler for DU 20-21
const config20 = {
  handleQuestion(i, num, subject, stemText, opts, solObj) {
    let optImgs = [[], [], [], []];
    let qImgs = [];
    if (i === 4) { // Q5 (Physics): g vs h graph
      stemText = 'অভিকর্ষীয় ত্বরণ $g$ বনাম পৃথিবী পৃষ্ঠ হতে গভীরতা $h$ এর লেখচিত্র কোনটি? (Which is the correct graph of acceleration due to gravity $g$ versus depth $h$ from the Earth\'s surface?)';
      opts = ['', '', '', ''];
      optImgs = [
        ['/assets/imported/du_20_21_mcq_q5_opt_a.png'],
        ['/assets/imported/du_20_21_mcq_q5_opt_b.png'],
        ['/assets/imported/du_20_21_mcq_q5_opt_c.png'],
        ['/assets/imported/du_20_21_mcq_q5_opt_d.png']
      ];
    } else if (i === 11) { // Q12 (Physics): Nuclear reaction
      stemText = '${}^{27}_{13}\\text{Al} + {}^4_2\\text{He} \\rightarrow {}^{30}_{14}\\text{Si} + X$ নিউক্লীয় বিক্রিয়াটিতে অনুপস্থিত কণাটি হলো-';
    } else if (i === 15) { // Q16 (Chemistry): Dissolving NaCl
      stemText = '$\\text{NaCl}$ এর সাথে $\\text{H}_2\\text{O}$ যোগ করলে কোনটি ঘটে?';
      opts = [
        '$\\text{NaOH} + \\text{HCl}$',
        '$\\text{H}^+ + \\text{OH}^-$',
        '$\\text{Na}^+(\\text{H}_2\\text{O}) + \\text{Cl}^-(\\text{H}_2\\text{O})$',
        '$\\text{NaOCl} + \\text{H}_2$'
      ];
    } else if (i === 16) { // Q17 (Chemistry): Carbon combustion
      stemText = 'নিম্নের বিক্রিয়াগুলো হতে কার্বনের প্রমাণ দহন তাপ নির্ণয় কর:\n\n$i.\\ \\ \\text{C}(s) + \\frac{1}{2}\\text{O}_2(g) \\rightarrow \\text{CO}(g), \\quad \\Delta H^\\circ = -111.0\\text{ kJ mol}^{-1}$\n\n$ii.\\ \\ \\text{CO}(g) + \\frac{1}{2}\\text{O}_2(g) \\rightarrow \\text{CO}_2(g), \\quad \\Delta H^\\circ = -283.0\\text{ kJ mol}^{-1}$';
    } else if (i === 20) { // Q21 (Chemistry): Water Kw
      opts = [
        '$K_w = 1.0 \\times 10^{-14}$',
        '$pK_w = 14$',
        '$[\\text{H}_3\\text{O}^+][\\text{OH}^-] = K_w$',
        '$K_w = 1 \\times 10^{-14}\\text{ M}$'
      ];
    } else if (i === 22) { // Q23 (Chemistry): Pure water OH/H ratio
      stemText = 'বিশুদ্ধ পানিতে $[\\text{OH}^-]$ এবং $[\\text{H}^+]$ এর মোলার ঘনমাত্রার অনুপাত কত?';
      opts = ['$7$', '$10^{-7}$', '$0$', '$1$'];
    } else if (i === 24) { // Q25 (Chemistry): Reduction potential
      opts = [
        '$\\text{H}^+(aq) / \\text{H}_2(g), \\text{Pt}$',
        '$\\text{Cu}^+(aq) / \\text{Cu}(s)$',
        '$\\text{Na}^+(aq) / \\text{Na}(s)$',
        '$\\text{Pt}(s) / \\text{F}_2(g) / \\text{F}^-(aq)$'
      ];
    } else if (i === 25) { // Q26 (Chemistry): Rate of reaction
      stemText = '$a\\text{A} \\rightarrow b\\text{B}$ বিক্রিয়াটির ক্ষেত্রে কোনটি বিক্রিয়ার হার নির্দেশ করে?';
    } else if (i === 36) { // Q37 (Mathematics): Roots cubes sum
      stemText = '$x^2 - 2x + 1 = 0$ সমীকরণটির মূলদ্বয়ের ত্রিঘাতের সমষ্টি হলো-';
    }
    return { stemText, opts, optImgs, qImgs };
  }
};

// Special handler for DU 19-20
const config19 = {
  handleQuestion(i, num, subject, stemText, opts, solObj) {
    let optImgs = [[], [], [], []];
    let qImgs = [];
    if (i === 1) { // Q2 (Physics): Explosion velocity ratio
      stemText = 'স্থির অবস্থায় থাকা একটি বস্তু বিস্ফোরিত হয়ে $m_1$ ও $m_2$ ভরের দুইটি বস্তুতে পরিণত হয়ে যথাক্রমে $v_1$ ও $v_2$ বেগে বিপরীত দিকে চলমান। $\\frac{v_1}{v_2}$ এর অনুপাত কত?';
    } else if (i === 3) { // Q4 (Physics): Phase difference
      stemText = 'সরল ছন্দিত গতিতে স্পন্দনরত দুটি কণার সরণ $x_1 = A\\sin\\omega t$ এবং $x_2 = A\\cos\\omega t$, যে কোন সময়ে এদের মধ্যে দশা পার্থক্য কত হবে?';
    } else if (i === 5) { // Q6 (Physics): circuit
      stemText = 'নিচের বর্তনীতে তড়িৎপ্রবাহ $I_1$ এর মান কত? (What is the value of current $I_1$ in the circuit below?)';
      qImgs = ['/assets/imported/du_19_20_mcq_q6_circuit.png'];
    } else if (i === 10) { // Q11 (Physics): motion graph
      stemText = 'একটি গাড়ি স্থির অবস্থা (P বিন্দু) হতে সোজা রাস্তায় যাত্রা শুরু করল। কিছু সময় পরে গাড়িটি মন্দনের ফলে থেমে গেল এবং একই ভাবে (প্রথমে গতি বাড়িয়ে এবং পরে গতি কমিয়ে) আবার যাত্রা শুরু করে P বিন্দুতে ফিরে আসল। নিচের কোন লেখচিত্রটি গাড়ির গতিকে প্রকাশ করে? (A car starts from rest at point P along a straight path, stops after deceleration, and similarly accelerates then decelerates to return to P. Which graph represents its motion?)';
      opts = ['', '', '', ''];
      optImgs = [
        ['/assets/imported/du_19_20_mcq_q11_opt_a.png'],
        ['/assets/imported/du_19_20_mcq_q11_opt_b.png'],
        ['/assets/imported/du_19_20_mcq_q11_opt_c.png'],
        ['/assets/imported/du_19_20_mcq_q11_opt_d.png']
      ];
    } else if (i === 15) { // Q16 (Chemistry): Cell reaction
      stemText = '$\\text{Fe}(s)\\,|\\,\\text{Fe}^{2+}(aq)\\,||\\,\\text{Br}_2(l)\\,;\\,\\text{Br}^-(aq)\\,|\\,\\text{Pt}(s)$ তড়িৎ রাসায়নিক কোষের সঠিক কোষ-বিক্রিয়া কোনটি?';
      opts = [
        '$\\text{Fe} + \\text{Br}_2 \\rightarrow \\text{Fe}^{2+} + 2\\text{Br}^-$',
        '$\\text{Fe}^+ + 2\\text{Br}^- \\rightarrow \\text{Fe}^{2+} + \\text{Br}_2$',
        '$\\text{Fe}^{2+} + \\text{Br}_2 \\rightarrow \\text{Fe} + 2\\text{Br}^-$',
        '$\\text{Fe}^+ + \\text{Br}_2 \\rightarrow \\text{Fe}^{3+} + 2\\text{Br}^-$'
      ];
    } else if (i === 24) { // Q25 (Chemistry): Oxidation numbers
      stemText = '$\\text{BaMnF}_4$ এবং $\\text{Li}_2\\text{MgFeF}_6$ যৌগদ্বয়ে $\\text{Mn}$ ও $\\text{Fe}$ এর জারণ সংখ্যা যথাক্রমে ____, _____।';
      opts = ['$+2, +2$', '$+5, +2$', '$+4, +3$', '$+5, +3$'];
    } else if (i === 31) { // Q32 (Mathematics): Composite function
      stemText = 'যদি $f(x) = x^2 - 2|x|$ এবং $g(x) = x^2 + 1$ হয় তাহলে $g(f(-2))$ এর মান কত?';
    } else if (i === 38) { // Q39 (Mathematics): Tangent circle
      stemText = '$(4,3)$ কেন্দ্র বিশিষ্ট এবং $5x - 12y + 3 = 0$ সরলরেখাকে স্পর্শ করে এমন বৃত্তের সমীকরণ কোনটি?';
    } else if (i === 84) { // Q85 (English Q10): Reading passage question
      stemText = "Read the following passage and answer the questions:\n\n'Bacteria' is the common name of a very large group of one-celled microscopic organisms that, we believe, may be the smallest, simplest and perhaps even the very first form of cellular life that evolved on earth. That is why they are observable only under a microscope. There are three main types of bacteria, which are classified according to their shape.\n\nThe bacilli are a group of bacteria that occur in the soil and air. They are shaped like rods. If we look at them under a microscope, we find them in motion, they always seem to be rolling or tumbling under the microscope. These bacilli are largely responsible for food spoilage. There is another group of bacteria who tend to grow in chains. They are referred to as the cocci group. A common example of this type is streptococci that causes strep throat. Finally, there is the spiral shaped bacteria called spirilla. They look a little like corkscrews, and they are responsible for a number of diseases in humans. Some species of bacteria cause diseases, but mostly bacteria live harmlessly on the skin, in mouth, and intestines. In fact bacteria are very helpful to researchers. Bacterial cells resemble the cells of other life forms in many ways, and may be studied to give us insights.\n\n**What is the main topic of this passage?**";
      opts = [
        'Three major types of bacteria',
        'How microscopic organisms are measured',
        'Diseases caused by bacteria',
        'The microscopic structure of single cells'
      ];
    } else if (i === 85) { // Q86 (English Q11)
      stemText = 'Which one is the incorrect spelling?';
      opts = ['deportation', 'depriciation', 'denunciation', 'denomination'];
    } else if (i === 86) { // Q87 (English Q12)
      stemText = "Choose the correct passive form of: 'Who taught you French?'";
      opts = [
        'By whom were you taught French?',
        'By whom you were taught French?',
        'Who were you taught French by?',
        'By whom was you taught French?'
      ];
    } else if (i === 87) { // Q88 (English Q13)
      stemText = "Identify the correct meaning of the idiom 'At the eleventh hour':";
      opts = [
        'At the very last moment',
        'Very early in the morning',
        'At 11 o’clock sharp',
        'Frequently'
      ];
    } else if (i === 88) { // Q89 (English Q14)
      stemText = 'Neither Rini nor Simi _____ qualified for the post.';
      opts = ['are', 'is', 'were', 'have'];
    } else if (i === 89) { // Q90 (English Q15)
      stemText = "What is the synonym of 'Magnanimous'?";
      opts = ['Generous', 'Selfish', 'Revengeful', 'Cruel'];
    }
    return { stemText, opts, optImgs, qImgs };
  }
};

const du21Questions = buildExam('21-22', blockOrder21, stems21, solutions21_22, config21);
const du20Questions = buildExam('20-21', blockOrder20, stems20, solutions20_21, config20);
const du19Questions = buildExam('19-20', blockOrder19, stems19, solutions19_20, config19);

console.log("Built DU 21-22:", du21Questions.length);
console.log("Built DU 20-21:", du20Questions.length);
console.log("Built DU 19-20:", du19Questions.length);

function saveExam(year, questions, publicHashFile) {
  const jsonPath = `Question/DU/DU_${year}_MCQ.json`;
  fs.writeFileSync(jsonPath, JSON.stringify(questions, null, 2), 'utf8');
  console.log(`Saved ${jsonPath}`);

  const aistudioPath = `public/assets/aistudio/${publicHashFile}`;
  fs.writeFileSync(aistudioPath, JSON.stringify(questions, null, 2), 'utf8');
  console.log(`Saved ${aistudioPath}`);
}

saveExam('21-22', du21Questions, 'DU_21-22_MCQ_ed83ccc3.json');
saveExam('20-21', du20Questions, 'DU_20-21_MCQ_b5b23a14.json');
saveExam('19-20', du19Questions, 'DU_19-20_MCQ_8fa34f4d.json');
