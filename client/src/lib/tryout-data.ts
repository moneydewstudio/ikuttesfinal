export type Question = {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswerId: string;
};

export type Tryout = {
  id: string;
  slug: string;
  title: string;
  category: 'CPNS' | 'SNBT' | 'Psikotes';
  description: string;
  timeInMinutes: number;
  participants: number;
  questions: Question[];
};

// Sample tryout data for CPNS
const cpnsTryouts: Tryout[] = [
  {
    id: "cpns-1",
    slug: "cpns-simulasi-cat-skd",
    title: "CPNS: Simulasi CAT SKD Lengkap 2023",
    category: "CPNS",
    description: "Simulasi Computer Assisted Test (CAT) untuk Seleksi Kompetensi Dasar (SKD) CPNS dengan soal terbaru.",
    timeInMinutes: 90,
    participants: 1200,
    questions: [
      {
        id: "cpns1-q1",
        text: "Sebuah pesawat terbang dengan kecepatan 800 km/jam diterbangkan dari bandara A menuju bandara B yang berjarak 2.400 km. Jika pesawat tersebut berangkat pukul 08.30 WIB, pada pukul berapa pesawat tersebut akan tiba di bandara B?",
        options: [
          { id: "cpns1-q1-a", text: "Pukul 11.00 WIB" },
          { id: "cpns1-q1-b", text: "Pukul 11.30 WIB" },
          { id: "cpns1-q1-c", text: "Pukul 12.00 WIB" },
          { id: "cpns1-q1-d", text: "Pukul 12.30 WIB" }
        ],
        correctAnswerId: "cpns1-q1-c"
      },
      {
        id: "cpns1-q2",
        text: "Pancasila sebagai dasar negara memiliki fungsi sebagai...",
        options: [
          { id: "cpns1-q2-a", text: "Pedoman penyelenggaraan pemerintahan" },
          { id: "cpns1-q2-b", text: "Sumber dari segala sumber hukum" },
          { id: "cpns1-q2-c", text: "Pemersatu bangsa Indonesia" },
          { id: "cpns1-q2-d", text: "Semua jawaban benar" }
        ],
        correctAnswerId: "cpns1-q2-d"
      },
      {
        id: "cpns1-q3",
        text: "Menurut UUD 1945, kekuasaan membentuk undang-undang berada di tangan...",
        options: [
          { id: "cpns1-q3-a", text: "Presiden" },
          { id: "cpns1-q3-b", text: "DPR" },
          { id: "cpns1-q3-c", text: "MPR" },
          { id: "cpns1-q3-d", text: "MA" }
        ],
        correctAnswerId: "cpns1-q3-b"
      },
      {
        id: "cpns1-q4",
        text: "Aparatur Sipil Negara wajib...",
        options: [
          { id: "cpns1-q4-a", text: "Netral dari pengaruh partai politik" },
          { id: "cpns1-q4-b", text: "Menjadi anggota partai politik" },
          { id: "cpns1-q4-c", text: "Mendukung calon presiden tertentu" },
          { id: "cpns1-q4-d", text: "Aktif dalam kegiatan politik" }
        ],
        correctAnswerId: "cpns1-q4-a"
      },
      {
        id: "cpns1-q5",
        text: "Yang bukan merupakan asas-asas umum pemerintahan yang baik adalah...",
        options: [
          { id: "cpns1-q5-a", text: "Kepastian hukum" },
          { id: "cpns1-q5-b", text: "Keterbukaan" },
          { id: "cpns1-q5-c", text: "Kepentingan umum" },
          { id: "cpns1-q5-d", text: "Nepotisme" }
        ],
        correctAnswerId: "cpns1-q5-d"
      },
      {
        id: "cpns1-q6",
        text: "Dalam konteks pelayanan publik, akuntabilitas berarti...",
        options: [
          { id: "cpns1-q6-a", text: "Pelayanan harus cepat" },
          { id: "cpns1-q6-b", text: "Pelayanan dapat dipertanggungjawabkan" },
          { id: "cpns1-q6-c", text: "Pelayanan harus murah" },
          { id: "cpns1-q6-d", text: "Pelayanan harus ramah" }
        ],
        correctAnswerId: "cpns1-q6-b"
      }
    ]
  },
  {
    id: "cpns-2",
    slug: "cpns-tes-wawasan-kebangsaan",
    title: "CPNS: Tes Wawasan Kebangsaan (TWK)",
    category: "CPNS",
    description: "Kumpulan soal Tes Wawasan Kebangsaan (TWK) yang fokus pada nasionalisme, integritas, dan wawasan nusantara.",
    timeInMinutes: 30,
    participants: 950,
    questions: [
      {
        id: "cpns2-q1",
        text: "Nilai-nilai yang terkandung dalam Pancasila sila pertama adalah...",
        options: [
          { id: "cpns2-q1-a", text: "Keadilan sosial" },
          { id: "cpns2-q1-b", text: "Persatuan Indonesia" },
          { id: "cpns2-q1-c", text: "Ketuhanan Yang Maha Esa" },
          { id: "cpns2-q1-d", text: "Kerakyatan" }
        ],
        correctAnswerId: "cpns2-q1-c"
      }
    ]
  },
  {
    id: "cpns-3",
    slug: "cpns-tes-intelegensi-umum",
    title: "CPNS: Tes Intelegensi Umum (TIU)",
    category: "CPNS",
    description: "Latihan soal Tes Intelegensi Umum (TIU) untuk meningkatkan kemampuan analitis dan penalaran dalam ujian CPNS.",
    timeInMinutes: 35,
    participants: 830,
    questions: [
      {
        id: "cpns3-q1",
        text: "Jika 3x + 2y = 12 dan 2x - y = 5, maka nilai x + y = ...",
        options: [
          { id: "cpns3-q1-a", text: "3" },
          { id: "cpns3-q1-b", text: "4" },
          { id: "cpns3-q1-c", text: "5" },
          { id: "cpns3-q1-d", text: "6" }
        ],
        correctAnswerId: "cpns3-q1-b"
      }
    ]
  }
];

// Sample tryout data for SNBT
const snbtTryouts: Tryout[] = [
  {
    id: "snbt-1",
    slug: "snbt-tes-potensi-skolastik",
    title: "SNBT: Tes Potensi Skolastik (TPS) 2023",
    category: "SNBT",
    description: "Persiapkan diri dengan soal TPS yang meliputi penalaran umum, pengetahuan kuantitatif, dan literasi.",
    timeInMinutes: 120,
    participants: 950,
    questions: [
      {
        id: "snbt1-q1",
        text: "Jika semua mahasiswa suka membaca, dan sebagian mahasiswa suka menulis, maka...",
        options: [
          { id: "snbt1-q1-a", text: "Semua yang suka membaca adalah mahasiswa" },
          { id: "snbt1-q1-b", text: "Sebagian yang suka menulis adalah mahasiswa" },
          { id: "snbt1-q1-c", text: "Sebagian yang suka membaca juga suka menulis" },
          { id: "snbt1-q1-d", text: "Tidak ada mahasiswa yang tidak suka membaca" }
        ],
        correctAnswerId: "snbt1-q1-d"
      }
    ]
  },
  {
    id: "snbt-2",
    slug: "snbt-literasi-bahasa-inggris",
    title: "SNBT: Literasi Bahasa Inggris",
    category: "SNBT",
    description: "Latihan kemampuan memahami teks bahasa Inggris dengan berbagai jenis soal reading comprehension.",
    timeInMinutes: 60,
    participants: 780,
    questions: [
      {
        id: "snbt2-q1",
        text: "Which of the following best summarizes the passage?",
        options: [
          { id: "snbt2-q1-a", text: "The evolution of energy sources throughout human history" },
          { id: "snbt2-q1-b", text: "The advantages of renewable energy over fossil fuels" },
          { id: "snbt2-q1-c", text: "The challenges of implementing sustainable energy solutions" },
          { id: "snbt2-q1-d", text: "The economic impact of transitioning to green energy" }
        ],
        correctAnswerId: "snbt2-q1-b"
      },
      {
        id: "snbt2-q2",
        text: "Sebuah toko memberikan diskon 20% untuk pembelian di atas Rp200.000. Jika Ana membeli barang seharga Rp250.000, berapa yang harus dibayar?",
        options: [
          { id: "snbt2-q2-a", text: "Rp200.000" },
          { id: "snbt2-q2-b", text: "Rp150.000" },
          { id: "snbt2-q2-c", text: "Rp180.000" },
          { id: "snbt2-q2-d", text: "Rp190.000" }
        ],
        correctAnswerId: "snbt2-q2-a"
      },
      {
        id: "snbt2-q3",
        text: "Jika 2x + 3y = 12 dan 3x - 2y = 9, maka nilai x adalah...",
        options: [
          { id: "snbt2-q3-a", text: "3" },
          { id: "snbt2-q3-b", text: "4" },
          { id: "snbt2-q3-c", text: "5" },
          { id: "snbt2-q3-d", text: "6" }
        ],
        correctAnswerId: "snbt2-q3-a"
      },
      {
        id: "snbt2-q4",
        text: "What is the main idea of the following sentence: 'Despite advances in renewable energy, fossil fuels still dominate global energy production.'",
        options: [
          { id: "snbt2-q4-a", text: "Renewable energy is not effective" },
          { id: "snbt2-q4-b", text: "Fossil fuels remain the primary energy source globally" },
          { id: "snbt2-q4-c", text: "Global energy production is decreasing" },
          { id: "snbt2-q4-d", text: "Energy production is becoming more expensive" }
        ],
        correctAnswerId: "snbt2-q4-b"
      }
    ]
  }
];

// Sample tryout data for Psikotes
const psikotesTryouts: Tryout[] = [
  {
    id: "psikotes-1",
    slug: "psikotes-kecerdasan-logika",
    title: "Psikotes: Tes Kecerdasan Logika",
    category: "Psikotes",
    description: "Kumpulan soal psikotes kecerdasan logika yang sering muncul pada seleksi kerja dan pendidikan.",
    timeInMinutes: 60,
    participants: 780,
    questions: [
      {
        id: "psiko1-q1",
        text: "Lanjutkan urutan angka berikut: 3, 6, 12, 24, ...",
        options: [
          { id: "psiko1-q1-a", text: "30" },
          { id: "psiko1-q1-b", text: "36" },
          { id: "psiko1-q1-c", text: "48" },
          { id: "psiko1-q1-d", text: "60" }
        ],
        correctAnswerId: "psiko1-q1-c"
      }
    ]
  },
  {
    id: "psikotes-2",
    slug: "psikotes-tes-kepribadian",
    title: "Psikotes: Tes Kepribadian",
    category: "Psikotes",
    description: "Persiapan menghadapi tes kepribadian yang umum digunakan dalam rekrutmen kerja dan penilaian psikologis.",
    timeInMinutes: 45,
    participants: 650,
    questions: [
      {
        id: "psiko2-q1",
        text: "Ketika menghadapi konflik dalam tim, saya cenderung:",
        options: [
          { id: "psiko2-q1-a", text: "Mencari solusi yang menguntungkan semua pihak" },
          { id: "psiko2-q1-b", text: "Mengalah untuk menghindari perselisihan" },
          { id: "psiko2-q1-c", text: "Mempertahankan pendapat saya dengan tegas" },
          { id: "psiko2-q1-d", text: "Meminta bantuan pihak ketiga sebagai penengah" }
        ],
        correctAnswerId: "psiko2-q1-a"
      }
    ]
  }
];

// Combine all tryouts
export const allTryouts: Tryout[] = [
  ...cpnsTryouts,
  ...snbtTryouts,
  ...psikotesTryouts
];

// Get tryouts by category
export const getTryoutsByCategory = (category: string): Tryout[] => {
  return allTryouts.filter(tryout => 
    tryout.category.toLowerCase() === category.toLowerCase());
};

// Get tryout by slug
export const getTryoutBySlug = (slug: string): Tryout | undefined => {
  return allTryouts.find(tryout => tryout.slug === slug);
};

// Get popular tryouts
export const getPopularTryouts = (limit: number = 3): Tryout[] => {
  return [...allTryouts].sort((a, b) => b.participants - a.participants).slice(0, limit);
};
