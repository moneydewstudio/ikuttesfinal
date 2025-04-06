export type PersonalityTestType = 'MBTI' | 'HEXACO' | 'BIG_FIVE';

export type PersonalityQuestion = {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    value: number; // Score value for this option (usually 1-5 or similar scale)
  }[];
  factor: string; // Which personality factor this question measures
  reversedScoring?: boolean; // If true, the scoring scale is reversed
};

export type PersonalityTest = {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: PersonalityTestType;
  timeInMinutes: number;
  questions: PersonalityQuestion[];
  factors: {
    [key: string]: {
      name: string;
      description: string;
      scoreInterpretation: {
        low: string;
        medium: string;
        high: string;
      };
    };
  };
};

export type PersonalityResult = {
  testId: string;
  testType: PersonalityTestType;
  scores: {
    [key: string]: number; // Factor code and score
  };
  mainType?: string; // Primary personality type (e.g. "INTJ" for MBTI)
  timestamp: number;
};

// MBTI Test
const mbtiTest: PersonalityTest = {
  id: 'mbti-test',
  slug: 'mbti-test',
  title: 'Myers-Briggs Type Indicator (MBTI)',
  description: 'Tes kepribadian Myers-Briggs membantu Anda memahami preferensi alami Anda dalam empat dimensi psikologis. Tes ini akan membantu mengklasifikasikan Anda ke dalam salah satu dari 16 tipe kepribadian.',
  type: 'MBTI',
  timeInMinutes: 15,
  questions: [
    // Extraversion (E) vs. Introversion (I)
    {
      id: 'mbti-1',
      text: 'Saya lebih suka berada di sekitar banyak orang daripada sendiri.',
      factor: 'EI',
      options: [
        { id: 'mbti-1-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'mbti-1-2', text: 'Tidak Setuju', value: 2 },
        { id: 'mbti-1-3', text: 'Netral', value: 3 },
        { id: 'mbti-1-4', text: 'Setuju', value: 4 },
        { id: 'mbti-1-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    {
      id: 'mbti-2',
      text: 'Saya merasa lebih berenergi setelah menghabiskan waktu sendirian.',
      factor: 'EI',
      reversedScoring: true,
      options: [
        { id: 'mbti-2-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'mbti-2-2', text: 'Tidak Setuju', value: 2 },
        { id: 'mbti-2-3', text: 'Netral', value: 3 },
        { id: 'mbti-2-4', text: 'Setuju', value: 4 },
        { id: 'mbti-2-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    {
      id: 'mbti-3',
      text: 'Saya cenderung berbicara dahulu dan berpikir kemudian.',
      factor: 'EI',
      options: [
        { id: 'mbti-3-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'mbti-3-2', text: 'Tidak Setuju', value: 2 },
        { id: 'mbti-3-3', text: 'Netral', value: 3 },
        { id: 'mbti-3-4', text: 'Setuju', value: 4 },
        { id: 'mbti-3-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    
    // Sensing (S) vs. Intuition (N)
    {
      id: 'mbti-4',
      text: 'Saya lebih memperhatikan detail daripada gambaran besarnya.',
      factor: 'SN',
      options: [
        { id: 'mbti-4-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'mbti-4-2', text: 'Tidak Setuju', value: 2 },
        { id: 'mbti-4-3', text: 'Netral', value: 3 },
        { id: 'mbti-4-4', text: 'Setuju', value: 4 },
        { id: 'mbti-4-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    {
      id: 'mbti-5',
      text: 'Saya lebih suka berurusan dengan ide dan konsep abstrak daripada fakta konkret.',
      factor: 'SN',
      reversedScoring: true,
      options: [
        { id: 'mbti-5-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'mbti-5-2', text: 'Tidak Setuju', value: 2 },
        { id: 'mbti-5-3', text: 'Netral', value: 3 },
        { id: 'mbti-5-4', text: 'Setuju', value: 4 },
        { id: 'mbti-5-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    {
      id: 'mbti-6',
      text: 'Saya lebih percaya pada pengalaman langsung daripada teori.',
      factor: 'SN',
      options: [
        { id: 'mbti-6-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'mbti-6-2', text: 'Tidak Setuju', value: 2 },
        { id: 'mbti-6-3', text: 'Netral', value: 3 },
        { id: 'mbti-6-4', text: 'Setuju', value: 4 },
        { id: 'mbti-6-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    
    // Thinking (T) vs. Feeling (F)
    {
      id: 'mbti-7',
      text: 'Saya membuat keputusan lebih berdasarkan logika daripada perasaan.',
      factor: 'TF',
      options: [
        { id: 'mbti-7-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'mbti-7-2', text: 'Tidak Setuju', value: 2 },
        { id: 'mbti-7-3', text: 'Netral', value: 3 },
        { id: 'mbti-7-4', text: 'Setuju', value: 4 },
        { id: 'mbti-7-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    {
      id: 'mbti-8',
      text: 'Harmoni dalam hubungan lebih penting bagi saya daripada kebenaran objektif.',
      factor: 'TF',
      reversedScoring: true,
      options: [
        { id: 'mbti-8-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'mbti-8-2', text: 'Tidak Setuju', value: 2 },
        { id: 'mbti-8-3', text: 'Netral', value: 3 },
        { id: 'mbti-8-4', text: 'Setuju', value: 4 },
        { id: 'mbti-8-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    {
      id: 'mbti-9',
      text: 'Saya lebih suka memberikan kritik jujur daripada pujian yang tidak tulus.',
      factor: 'TF',
      options: [
        { id: 'mbti-9-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'mbti-9-2', text: 'Tidak Setuju', value: 2 },
        { id: 'mbti-9-3', text: 'Netral', value: 3 },
        { id: 'mbti-9-4', text: 'Setuju', value: 4 },
        { id: 'mbti-9-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    
    // Judging (J) vs. Perceiving (P)
    {
      id: 'mbti-10',
      text: 'Saya lebih suka memiliki rencana daripada spontanitas.',
      factor: 'JP',
      options: [
        { id: 'mbti-10-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'mbti-10-2', text: 'Tidak Setuju', value: 2 },
        { id: 'mbti-10-3', text: 'Netral', value: 3 },
        { id: 'mbti-10-4', text: 'Setuju', value: 4 },
        { id: 'mbti-10-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    {
      id: 'mbti-11',
      text: 'Saya lebih suka menjaga pilihan tetap terbuka daripada membuat keputusan cepat.',
      factor: 'JP',
      reversedScoring: true,
      options: [
        { id: 'mbti-11-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'mbti-11-2', text: 'Tidak Setuju', value: 2 },
        { id: 'mbti-11-3', text: 'Netral', value: 3 },
        { id: 'mbti-11-4', text: 'Setuju', value: 4 },
        { id: 'mbti-11-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    {
      id: 'mbti-12',
      text: 'Saya merasa tidak nyaman dengan ketidakpastian.',
      factor: 'JP',
      options: [
        { id: 'mbti-12-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'mbti-12-2', text: 'Tidak Setuju', value: 2 },
        { id: 'mbti-12-3', text: 'Netral', value: 3 },
        { id: 'mbti-12-4', text: 'Setuju', value: 4 },
        { id: 'mbti-12-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
  ],
  factors: {
    'EI': {
      name: 'Extraversion vs. Introversion',
      description: 'Bagaimana Anda mendapatkan energi',
      scoreInterpretation: {
        low: 'Introversion (I): Anda cenderung mendapatkan energi dari waktu sendiri dan refleksi internal.',
        medium: 'Ambivert: Anda seimbang antara mendapatkan energi dari interaksi sosial dan waktu sendiri.',
        high: 'Extraversion (E): Anda cenderung mendapatkan energi dari interaksi dengan orang lain.'
      }
    },
    'SN': {
      name: 'Sensing vs. Intuition',
      description: 'Bagaimana Anda memproses informasi',
      scoreInterpretation: {
        low: 'Intuition (N): Anda lebih fokus pada pola, makna, dan kemungkinan masa depan.',
        medium: 'Seimbang: Anda memproses informasi dengan memperhatikan detail dan pola.',
        high: 'Sensing (S): Anda lebih fokus pada fakta konkret dan detail yang dapat diamati.'
      }
    },
    'TF': {
      name: 'Thinking vs. Feeling',
      description: 'Bagaimana Anda membuat keputusan',
      scoreInterpretation: {
        low: 'Feeling (F): Anda cenderung membuat keputusan berdasarkan nilai-nilai dan dampak pada orang lain.',
        medium: 'Seimbang: Anda menggunakan baik logika maupun nilai-nilai personal dalam membuat keputusan.',
        high: 'Thinking (T): Anda cenderung membuat keputusan berdasarkan logika dan konsistensi.'
      }
    },
    'JP': {
      name: 'Judging vs. Perceiving',
      description: 'Bagaimana Anda menghadapi dunia luar',
      scoreInterpretation: {
        low: 'Perceiving (P): Anda lebih fleksibel, spontan, dan suka menjaga pilihan tetap terbuka.',
        medium: 'Seimbang: Anda bisa terstruktur dan fleksibel tergantung situasi.',
        high: 'Judging (J): Anda lebih terencana, terorganisir, dan suka membuat keputusan cepat.'
      }
    }
  }
};

// Big Five (OCEAN) Test
const bigFiveTest: PersonalityTest = {
  id: 'big-five-test',
  slug: 'big-five-test',
  title: 'Big Five Personality Test (OCEAN)',
  description: 'Tes Big Five mengukur lima dimensi utama kepribadian Anda: Openness, Conscientiousness, Extraversion, Agreeableness, dan Neuroticism.',
  type: 'BIG_FIVE',
  timeInMinutes: 10,
  questions: [
    // Openness
    {
      id: 'big5-1',
      text: 'Saya memiliki imajinasi yang kaya.',
      factor: 'O',
      options: [
        { id: 'big5-1-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'big5-1-2', text: 'Tidak Setuju', value: 2 },
        { id: 'big5-1-3', text: 'Netral', value: 3 },
        { id: 'big5-1-4', text: 'Setuju', value: 4 },
        { id: 'big5-1-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    {
      id: 'big5-2',
      text: 'Saya tertarik pada ide-ide abstrak.',
      factor: 'O',
      options: [
        { id: 'big5-2-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'big5-2-2', text: 'Tidak Setuju', value: 2 },
        { id: 'big5-2-3', text: 'Netral', value: 3 },
        { id: 'big5-2-4', text: 'Setuju', value: 4 },
        { id: 'big5-2-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    
    // Conscientiousness
    {
      id: 'big5-3',
      text: 'Saya selalu mempersiapkan segala sesuatu dengan baik.',
      factor: 'C',
      options: [
        { id: 'big5-3-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'big5-3-2', text: 'Tidak Setuju', value: 2 },
        { id: 'big5-3-3', text: 'Netral', value: 3 },
        { id: 'big5-3-4', text: 'Setuju', value: 4 },
        { id: 'big5-3-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    {
      id: 'big5-4',
      text: 'Saya memperhatikan detail.',
      factor: 'C',
      options: [
        { id: 'big5-4-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'big5-4-2', text: 'Tidak Setuju', value: 2 },
        { id: 'big5-4-3', text: 'Netral', value: 3 },
        { id: 'big5-4-4', text: 'Setuju', value: 4 },
        { id: 'big5-4-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    
    // Extraversion
    {
      id: 'big5-5',
      text: 'Saya mudah bersosialisasi di pesta.',
      factor: 'E',
      options: [
        { id: 'big5-5-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'big5-5-2', text: 'Tidak Setuju', value: 2 },
        { id: 'big5-5-3', text: 'Netral', value: 3 },
        { id: 'big5-5-4', text: 'Setuju', value: 4 },
        { id: 'big5-5-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    {
      id: 'big5-6',
      text: 'Saya tidak keberatan menjadi pusat perhatian.',
      factor: 'E',
      options: [
        { id: 'big5-6-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'big5-6-2', text: 'Tidak Setuju', value: 2 },
        { id: 'big5-6-3', text: 'Netral', value: 3 },
        { id: 'big5-6-4', text: 'Setuju', value: 4 },
        { id: 'big5-6-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    
    // Agreeableness
    {
      id: 'big5-7',
      text: 'Saya merasakan emosi orang lain.',
      factor: 'A',
      options: [
        { id: 'big5-7-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'big5-7-2', text: 'Tidak Setuju', value: 2 },
        { id: 'big5-7-3', text: 'Netral', value: 3 },
        { id: 'big5-7-4', text: 'Setuju', value: 4 },
        { id: 'big5-7-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    {
      id: 'big5-8',
      text: 'Saya senang membantu orang lain.',
      factor: 'A',
      options: [
        { id: 'big5-8-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'big5-8-2', text: 'Tidak Setuju', value: 2 },
        { id: 'big5-8-3', text: 'Netral', value: 3 },
        { id: 'big5-8-4', text: 'Setuju', value: 4 },
        { id: 'big5-8-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    
    // Neuroticism
    {
      id: 'big5-9',
      text: 'Saya sering merasa cemas.',
      factor: 'N',
      options: [
        { id: 'big5-9-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'big5-9-2', text: 'Tidak Setuju', value: 2 },
        { id: 'big5-9-3', text: 'Netral', value: 3 },
        { id: 'big5-9-4', text: 'Setuju', value: 4 },
        { id: 'big5-9-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    {
      id: 'big5-10',
      text: 'Saya mudah stres.',
      factor: 'N',
      options: [
        { id: 'big5-10-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'big5-10-2', text: 'Tidak Setuju', value: 2 },
        { id: 'big5-10-3', text: 'Netral', value: 3 },
        { id: 'big5-10-4', text: 'Setuju', value: 4 },
        { id: 'big5-10-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
  ],
  factors: {
    'O': {
      name: 'Openness to Experience',
      description: 'Keterbukaan terhadap pengalaman baru',
      scoreInterpretation: {
        low: 'Anda cenderung lebih konvensional dan praktis, lebih menyukai rutinitas.',
        medium: 'Anda seimbang antara tradisi dan inovasi, terbuka pada ide baru dalam batas tertentu.',
        high: 'Anda sangat kreatif, imajinatif, dan penasaran dengan hal-hal baru.'
      }
    },
    'C': {
      name: 'Conscientiousness',
      description: 'Kesadaran dan kecermatan',
      scoreInterpretation: {
        low: 'Anda cenderung spontan dan fleksibel, tapi mungkin kurang terorganisir.',
        medium: 'Anda memiliki keseimbangan yang baik antara keteraturan dan fleksibilitas.',
        high: 'Anda sangat terorganisir, dapat diandalkan, dan disiplin.'
      }
    },
    'E': {
      name: 'Extraversion',
      description: 'Tingkat keterbukaan dalam berinteraksi',
      scoreInterpretation: {
        low: 'Anda lebih introver, menikmati waktu sendiri dan refleksi diri.',
        medium: 'Anda ambivert, bisa menikmati interaksi sosial maupun waktu sendiri.',
        high: 'Anda sangat ekstrover, energik, dan menikmati interaksi sosial.'
      }
    },
    'A': {
      name: 'Agreeableness',
      description: 'Keramahan dan kecenderungan bekerja sama',
      scoreInterpretation: {
        low: 'Anda cenderung lebih analitis dan skeptis, fokus pada objektivitas.',
        medium: 'Anda seimbang antara empati dan objektivitas dalam hubungan interpersonal.',
        high: 'Anda sangat kooperatif, penuh empati, dan mengutamakan harmoni.'
      }
    },
    'N': {
      name: 'Neuroticism',
      description: 'Kecenderungan mengalami emosi negatif',
      scoreInterpretation: {
        low: 'Anda secara emosional stabil dan tangguh menghadapi stres.',
        medium: 'Anda memiliki keseimbangan emosional yang baik.',
        high: 'Anda cenderung lebih sensitif dan reaktif terhadap stres.'
      }
    }
  }
};

// HEXACO Test
const hexacoTest: PersonalityTest = {
  id: 'hexaco-test',
  slug: 'hexaco-test',
  title: 'HEXACO Personality Inventory',
  description: 'Tes HEXACO mengukur enam dimensi kepribadian: Honesty-Humility, Emotionality, Extraversion, Agreeableness, Conscientiousness, dan Openness to Experience.',
  type: 'HEXACO',
  timeInMinutes: 15,
  questions: [
    // Honesty-Humility
    {
      id: 'hexaco-1',
      text: 'Saya tidak akan menggunakan pujian untuk mendapatkan kenaikan gaji atau promosi, meskipun itu mungkin berhasil.',
      factor: 'H',
      options: [
        { id: 'hexaco-1-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'hexaco-1-2', text: 'Tidak Setuju', value: 2 },
        { id: 'hexaco-1-3', text: 'Netral', value: 3 },
        { id: 'hexaco-1-4', text: 'Setuju', value: 4 },
        { id: 'hexaco-1-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    {
      id: 'hexaco-2',
      text: 'Jika saya yakin tidak akan ketahuan, saya bersedia memalsukan tanda tangan.',
      factor: 'H',
      reversedScoring: true,
      options: [
        { id: 'hexaco-2-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'hexaco-2-2', text: 'Tidak Setuju', value: 2 },
        { id: 'hexaco-2-3', text: 'Netral', value: 3 },
        { id: 'hexaco-2-4', text: 'Setuju', value: 4 },
        { id: 'hexaco-2-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    
    // Emotionality
    {
      id: 'hexaco-3',
      text: 'Saya takut mengalami kesakitan fisik.',
      factor: 'E',
      options: [
        { id: 'hexaco-3-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'hexaco-3-2', text: 'Tidak Setuju', value: 2 },
        { id: 'hexaco-3-3', text: 'Netral', value: 3 },
        { id: 'hexaco-3-4', text: 'Setuju', value: 4 },
        { id: 'hexaco-3-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    {
      id: 'hexaco-4',
      text: 'Saya memerlukan dukungan emosional dari orang lain saat menghadapi kesulitan.',
      factor: 'E',
      options: [
        { id: 'hexaco-4-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'hexaco-4-2', text: 'Tidak Setuju', value: 2 },
        { id: 'hexaco-4-3', text: 'Netral', value: 3 },
        { id: 'hexaco-4-4', text: 'Setuju', value: 4 },
        { id: 'hexaco-4-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    
    // Extraversion
    {
      id: 'hexaco-5',
      text: 'Saya menikmati berinteraksi dengan banyak orang berbeda di acara sosial.',
      factor: 'X',
      options: [
        { id: 'hexaco-5-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'hexaco-5-2', text: 'Tidak Setuju', value: 2 },
        { id: 'hexaco-5-3', text: 'Netral', value: 3 },
        { id: 'hexaco-5-4', text: 'Setuju', value: 4 },
        { id: 'hexaco-5-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    {
      id: 'hexaco-6',
      text: 'Dalam kelompok, saya cenderung menjadi sosok yang memulai percakapan.',
      factor: 'X',
      options: [
        { id: 'hexaco-6-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'hexaco-6-2', text: 'Tidak Setuju', value: 2 },
        { id: 'hexaco-6-3', text: 'Netral', value: 3 },
        { id: 'hexaco-6-4', text: 'Setuju', value: 4 },
        { id: 'hexaco-6-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    
    // Agreeableness
    {
      id: 'hexaco-7',
      text: 'Saya bisa memaafkan orang yang pernah memperlakukan saya dengan buruk.',
      factor: 'A',
      options: [
        { id: 'hexaco-7-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'hexaco-7-2', text: 'Tidak Setuju', value: 2 },
        { id: 'hexaco-7-3', text: 'Netral', value: 3 },
        { id: 'hexaco-7-4', text: 'Setuju', value: 4 },
        { id: 'hexaco-7-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    {
      id: 'hexaco-8',
      text: 'Sulit bagi saya untuk menahan amarah ketika orang memperlakukan saya dengan buruk.',
      factor: 'A',
      reversedScoring: true,
      options: [
        { id: 'hexaco-8-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'hexaco-8-2', text: 'Tidak Setuju', value: 2 },
        { id: 'hexaco-8-3', text: 'Netral', value: 3 },
        { id: 'hexaco-8-4', text: 'Setuju', value: 4 },
        { id: 'hexaco-8-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    
    // Conscientiousness
    {
      id: 'hexaco-9',
      text: 'Saya selalu memeriksa pekerjaan saya dengan teliti sebelum menyelesaikannya.',
      factor: 'C',
      options: [
        { id: 'hexaco-9-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'hexaco-9-2', text: 'Tidak Setuju', value: 2 },
        { id: 'hexaco-9-3', text: 'Netral', value: 3 },
        { id: 'hexaco-9-4', text: 'Setuju', value: 4 },
        { id: 'hexaco-9-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    {
      id: 'hexaco-10',
      text: 'Saya cenderung menunda-nunda tugas yang memerlukan banyak upaya.',
      factor: 'C',
      reversedScoring: true,
      options: [
        { id: 'hexaco-10-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'hexaco-10-2', text: 'Tidak Setuju', value: 2 },
        { id: 'hexaco-10-3', text: 'Netral', value: 3 },
        { id: 'hexaco-10-4', text: 'Setuju', value: 4 },
        { id: 'hexaco-10-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    
    // Openness to Experience
    {
      id: 'hexaco-11',
      text: 'Saya tertarik mempelajari sejarah dan politik negara-negara asing.',
      factor: 'O',
      options: [
        { id: 'hexaco-11-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'hexaco-11-2', text: 'Tidak Setuju', value: 2 },
        { id: 'hexaco-11-3', text: 'Netral', value: 3 },
        { id: 'hexaco-11-4', text: 'Setuju', value: 4 },
        { id: 'hexaco-11-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
    {
      id: 'hexaco-12',
      text: 'Saya lebih suka aktivitas yang tidak memerlukan pemikiran mendalam.',
      factor: 'O',
      reversedScoring: true,
      options: [
        { id: 'hexaco-12-1', text: 'Sangat Tidak Setuju', value: 1 },
        { id: 'hexaco-12-2', text: 'Tidak Setuju', value: 2 },
        { id: 'hexaco-12-3', text: 'Netral', value: 3 },
        { id: 'hexaco-12-4', text: 'Setuju', value: 4 },
        { id: 'hexaco-12-5', text: 'Sangat Setuju', value: 5 },
      ],
    },
  ],
  factors: {
    'H': {
      name: 'Honesty-Humility',
      description: 'Kejujuran dan kerendahan hati',
      scoreInterpretation: {
        low: 'Anda cenderung merasa berhak atas keistimewaan, tertarik pada kemewahan, dan mungkin mencari keuntungan ketika berurusan dengan orang lain.',
        medium: 'Anda seimbang antara nilai pragmatis dan integritas dalam urusan interpersonal.',
        high: 'Anda sangat menghargai kejujuran, keadilan, dan menghindari manipulasi orang lain untuk keuntungan pribadi.'
      }
    },
    'E': {
      name: 'Emotionality',
      description: 'Reaktivitas emosional',
      scoreInterpretation: {
        low: 'Anda cenderung tidak terlalu cemas, tidak terlalu sentimental, dan lebih mandiri secara emosional.',
        medium: 'Anda memiliki keseimbangan yang baik dalam hal reaktivitas emosional.',
        high: 'Anda cenderung lebih cemas, sentimental, dan membutuhkan dukungan emosional.'
      }
    },
    'X': {
      name: 'Extraversion',
      description: 'Keterbukaan dalam berinteraksi',
      scoreInterpretation: {
        low: 'Anda cenderung lebih tenang, lebih menarik diri secara sosial, dan kurang antusias.',
        medium: 'Anda seimbang antara aktivitas sosial dan waktu untuk diri sendiri.',
        high: 'Anda cenderung lebih percaya diri secara sosial, energik, dan antusias.'
      }
    },
    'A': {
      name: 'Agreeableness',
      description: 'Kesediaan dalam bekerja sama',
      scoreInterpretation: {
        low: 'Anda cenderung mencari kesalahan orang lain, keras, dan mungkin lebih pendendam.',
        medium: 'Anda seimbang dalam hal ketegasan dan fleksibilitas dalam hubungan interpersonal.',
        high: 'Anda cenderung lebih pemaaf, lunak dalam menilai orang, dan bersedia berkompromi.'
      }
    },
    'C': {
      name: 'Conscientiousness',
      description: 'Kesadaran dan kecermatan',
      scoreInterpretation: {
        low: 'Anda cenderung kurang terorganisir, lebih impulsif, dan kurang perfeksionis.',
        medium: 'Anda seimbang antara fleksibilitas dan keteraturan dalam kebiasaan kerja.',
        high: 'Anda sangat terorganisir, disiplin, dan perfeksionis dalam pekerjaan Anda.'
      }
    },
    'O': {
      name: 'Openness to Experience',
      description: 'Keterbukaan terhadap pengalaman baru',
      scoreInterpretation: {
        low: 'Anda cenderung konvensional, praktis, dan kurang tertarik pada ide-ide abstrak.',
        medium: 'Anda seimbang antara tradisi dan inovasi dalam pemikiran.',
        high: 'Anda sangat ingin tahu, kreatif, dan tertarik pada gagasan yang tidak konvensional.'
      }
    }
  }
};

export const personalityTests = [mbtiTest, bigFiveTest, hexacoTest];

export const getPersonalityTestBySlug = (slug: string): PersonalityTest | undefined => {
  return personalityTests.find(test => test.slug === slug);
};

// Calculate MBTI type based on factor scores
export const calculateMBTIType = (scores: {[key: string]: number}): string => {
  let mbtiType = '';
  
  // E vs I
  mbtiType += scores['EI'] > 3 ? 'E' : 'I';
  
  // S vs N
  mbtiType += scores['SN'] > 3 ? 'S' : 'N';
  
  // T vs F
  mbtiType += scores['TF'] > 3 ? 'T' : 'F';
  
  // J vs P
  mbtiType += scores['JP'] > 3 ? 'J' : 'P';
  
  return mbtiType;
};

// Calculate score interpretations based on raw scores
export const interpretScores = (test: PersonalityTest, scores: {[key: string]: number}): {[key: string]: string} => {
  const interpretations: {[key: string]: string} = {};
  
  for (const factor in scores) {
    if (test.factors[factor]) {
      const score = scores[factor];
      let interpretation = '';
      
      if (score <= 2.33) {
        interpretation = test.factors[factor].scoreInterpretation.low;
      } else if (score <= 3.66) {
        interpretation = test.factors[factor].scoreInterpretation.medium;
      } else {
        interpretation = test.factors[factor].scoreInterpretation.high;
      }
      
      interpretations[factor] = interpretation;
    }
  }
  
  return interpretations;
};