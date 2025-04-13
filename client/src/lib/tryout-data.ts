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
        text: "Dalam sistem pemerintahan Indonesia, yang bukan merupakan lembaga tinggi negara adalah...",
        options: [
          { id: "cpns1-q3-a", text: "Mahkamah Agung" },
          { id: "cpns1-q3-b", text: "Dewan Perwakilan Rakyat" },
          { id: "cpns1-q3-c", text: "Komisi Pemberantasan Korupsi" },
          { id: "cpns1-q3-d", text: "Mahkamah Konstitusi" }
        ],
        correctAnswerId: "cpns1-q3-c"
      },
      {
        id: "cpns1-q4",
        text: "Yang bukan merupakan hak-hak seorang ASN adalah...",
        options: [
          { id: "cpns1-q4-a", text: "Gaji dan tunjangan" },
          { id: "cpns1-q4-b", text: "Cuti" },
          { id: "cpns1-q4-c", text: "Jaminan pensiun" },
          { id: "cpns1-q4-d", text: "Ikut kampanye politik" }
        ],
        correctAnswerId: "cpns1-q4-d"
      },
      {
        id: "cpns1-q5",
        text: "Jumlah provinsi di Indonesia saat ini adalah...",
        options: [
          { id: "cpns1-q5-a", text: "34 provinsi" },
          { id: "cpns1-q5-b", text: "35 provinsi" },
          { id: "cpns1-q5-c", text: "36 provinsi" },
          { id: "cpns1-q5-d", text: "37 provinsi" }
        ],
        correctAnswerId: "cpns1-q5-d"
      },
      {
        id: "cpns1-q6",
        text: "UUD 1945 telah mengalami amandemen sebanyak...",
        options: [
          { id: "cpns1-q6-a", text: "3 kali" },
          { id: "cpns1-q6-b", text: "4 kali" },
          { id: "cpns1-q6-c", text: "5 kali" },
          { id: "cpns1-q6-d", text: "6 kali" }
        ],
        correctAnswerId: "cpns1-q6-b"
      },
      {
        id: "cpns1-q7",
        text: "Dalam konsep good governance, yang bukan merupakan prinsip-prinsipnya adalah...",
        options: [
          { id: "cpns1-q7-a", text: "Transparansi" },
          { id: "cpns1-q7-b", text: "Akuntabilitas" },
          { id: "cpns1-q7-c", text: "Partisipasi" },
          { id: "cpns1-q7-d", text: "Sentralisasi" }
        ],
        correctAnswerId: "cpns1-q7-d"
      },
      {
        id: "cpns1-q8",
        text: "Menurut UU ASN, batas usia pensiun pejabat administrasi adalah...",
        options: [
          { id: "cpns1-q8-a", text: "56 tahun" },
          { id: "cpns1-q8-b", text: "58 tahun" },
          { id: "cpns1-q8-c", text: "60 tahun" },
          { id: "cpns1-q8-d", text: "65 tahun" }
        ],
        correctAnswerId: "cpns1-q8-b"
      },
      {
        id: "cpns1-q9",
        text: "Yang bukan merupakan asas penyelenggaraan kebijakan dan manajemen ASN adalah...",
        options: [
          { id: "cpns1-q9-a", text: "Profesionalitas" },
          { id: "cpns1-q9-b", text: "Netralitas" },
          { id: "cpns1-q9-c", text: "Hierarki" },
          { id: "cpns1-q9-d", text: "Patronase" }
        ],
        correctAnswerId: "cpns1-q9-d"
      },
      {
        id: "cpns1-q10",
        text: "Lembaga yang memiliki kewenangan melakukan pengawasan terhadap keuangan negara adalah...",
        options: [
          { id: "cpns1-q10-a", text: "BPK" },
          { id: "cpns1-q10-b", text: "BPKP" },
          { id: "cpns1-q10-c", text: "DPR" },
          { id: "cpns1-q10-d", text: "KPK" }
        ],
        correctAnswerId: "cpns1-q10-a"
      },
      {
        id: "cpns1-q11",
        text: "Dalam konteks pelayanan publik, empati berarti...",
        options: [
          { id: "cpns1-q11-a", text: "Kemampuan melayani dengan cepat" },
          { id: "cpns1-q11-b", text: "Kemampuan memahami kebutuhan masyarakat" },
          { id: "cpns1-q11-c", text: "Kemampuan memberikan pelayanan tepat waktu" },
          { id: "cpns1-q11-d", text: "Kemampuan menyelesaikan masalah" }
        ],
        correctAnswerId: "cpns1-q11-b"
      },
      {
        id: "cpns1-q12",
        text: "Fungsi APBN yang benar adalah...",
        options: [
          { id: "cpns1-q12-a", text: "Otorisasi, perencanaan, pengawasan, alokasi" },
          { id: "cpns1-q12-b", text: "Stabilisasi, alokasi, distribusi, otorisasi" },
          { id: "cpns1-q12-c", text: "Perencanaan, otorisasi, pengawasan, distribusi" },
          { id: "cpns1-q12-d", text: "Alokasi, distribusi, stabilisasi, pengawasan" }
        ],
        correctAnswerId: "cpns1-q12-a"
      },
      {
        id: "cpns1-q13",
        text: "Periode masa jabatan anggota DPR RI adalah...",
        options: [
          { id: "cpns1-q13-a", text: "3 tahun" },
          { id: "cpns1-q13-b", text: "4 tahun" },
          { id: "cpns1-q13-c", text: "5 tahun" },
          { id: "cpns1-q13-d", text: "6 tahun" }
        ],
        correctAnswerId: "cpns1-q13-c"
      },
      {
        id: "cpns1-q14",
        text: "Yang bukan merupakan syarat pembentukan daerah otonom baru adalah...",
        options: [
          { id: "cpns1-q14-a", text: "Kemampuan ekonomi" },
          { id: "cpns1-q14-b", text: "Potensi daerah" },
          { id: "cpns1-q14-c", text: "Luas wilayah" },
          { id: "cpns1-q14-d", text: "Jumlah partai politik" }
        ],
        correctAnswerId: "cpns1-q14-d"
      },
      {
        id: "cpns1-q15",
        text: "Prinsip penyelenggaraan pemerintahan daerah adalah...",
        options: [
          { id: "cpns1-q15-a", text: "Otonomi seluas-luasnya" },
          { id: "cpns1-q15-b", text: "Sentralisasi" },
          { id: "cpns1-q15-c", text: "Dekonsentrasi" },
          { id: "cpns1-q15-d", text: "Tugas pembantuan" }
        ],
        correctAnswerId: "cpns1-q15-a"
      },
      {
        id: "cpns1-q16",
        text: "Salah satu tujuan reformasi birokrasi adalah...",
        options: [
          { id: "cpns1-q16-a", text: "Menciptakan birokrasi yang kuat" },
          { id: "cpns1-q16-b", text: "Menciptakan birokrasi yang bersih dan akuntabel" },
          { id: "cpns1-q16-c", text: "Memperbesar struktur organisasi" },
          { id: "cpns1-q16-d", text: "Menambah jumlah pegawai" }
        ],
        correctAnswerId: "cpns1-q16-b"
      },
      {
        id: "cpns1-q17",
        text: "Pengertian yang tepat tentang desentralisasi adalah...",
        options: [
          { id: "cpns1-q17-a", text: "Penyerahan wewenang pemerintahan oleh pemerintah pusat kepada daerah otonom" },
          { id: "cpns1-q17-b", text: "Pelimpahan wewenang dari atasan kepada bawahan" },
          { id: "cpns1-q17-c", text: "Pelimpahan wewenang dari pusat ke daerah administratif" },
          { id: "cpns1-q17-d", text: "Pemberian tugas dari pemerintah pusat kepada daerah" }
        ],
        correctAnswerId: "cpns1-q17-a"
      },
      {
        id: "cpns1-q18",
        text: "Asas yang menyatakan bahwa setiap kegiatan dan hasil akhir dari kegiatan penyelenggara negara harus dapat dipertanggungjawabkan kepada masyarakat sebagai pemegang kedaulatan tertinggi negara adalah...",
        options: [
          { id: "cpns1-q18-a", text: "Asas kepastian hukum" },
          { id: "cpns1-q18-b", text: "Asas keterbukaan" },
          { id: "cpns1-q18-c", text: "Asas akuntabilitas" },
          { id: "cpns1-q18-d", text: "Asas profesionalitas" }
        ],
        correctAnswerId: "cpns1-q18-c"
      },
      {
        id: "cpns1-q19",
        text: "Menurut UU ASN, Pegawai ASN terdiri dari...",
        options: [
          { id: "cpns1-q19-a", text: "PNS dan PPPK" },
          { id: "cpns1-q19-b", text: "PNS dan PTT" },
          { id: "cpns1-q19-c", text: "PNS dan Honorer" },
          { id: "cpns1-q19-d", text: "PPPK dan PTT" }
        ],
        correctAnswerId: "cpns1-q19-a"
      },
      {
        id: "cpns1-q20",
        text: "Yang bukan merupakan fungsi DPRD adalah...",
        options: [
          { id: "cpns1-q20-a", text: "Legislasi" },
          { id: "cpns1-q20-b", text: "Anggaran" },
          { id: "cpns1-q20-c", text: "Pengawasan" },
          { id: "cpns1-q20-d", text: "Yudikatif" }
        ],
        correctAnswerId: "cpns1-q20-d"
      },
      {
        id: "cpns1-q21",
        text: "Sistem pemerintahan Indonesia menurut UUD 1945 adalah...",
        options: [
          { id: "cpns1-q21-a", text: "Presidensial" },
          { id: "cpns1-q21-b", text: "Parlementer" },
          { id: "cpns1-q21-c", text: "Campuran" },
          { id: "cpns1-q21-d", text: "Federal" }
        ],
        correctAnswerId: "cpns1-q21-a"
      },
      {
        id: "cpns1-q22",
        text: "Program reformasi birokrasi nasional dilaksanakan dalam periode...",
        options: [
          { id: "cpns1-q22-a", text: "3 tahun" },
          { id: "cpns1-q22-b", text: "4 tahun" },
          { id: "cpns1-q22-c", text: "5 tahun" },
          { id: "cpns1-q22-d", text: "6 tahun" }
        ],
        correctAnswerId: "cpns1-q22-c"
      },
      {
        id: "cpns1-q23",
        text: "Pejabat yang berwenang dalam pengangkatan CPNS adalah...",
        options: [
          { id: "cpns1-q23-a", text: "Presiden" },
          { id: "cpns1-q23-b", text: "Menteri" },
          { id: "cpns1-q23-c", text: "Kepala BKN" },
          { id: "cpns1-q23-d", text: "Pejabat Pembina Kepegawaian" }
        ],
        correctAnswerId: "cpns1-q23-d"
      },
      {
        id: "cpns1-q24",
        text: "Yang bukan merupakan jenis-jenis pelayanan publik menurut UU No. 25 Tahun 2009 adalah...",
        options: [
          { id: "cpns1-q24-a", text: "Pelayanan administratif" },
          { id: "cpns1-q24-b", text: "Pelayanan barang publik" },
          { id: "cpns1-q24-c", text: "Pelayanan jasa publik" },
          { id: "cpns1-q24-d", text: "Pelayanan politik" }
        ],
        correctAnswerId: "cpns1-q24-d"
      },
      {
        id: "cpns1-q25",
        text: "Konsep New Public Management (NPM) menekankan pada...",
        options: [
          { id: "cpns1-q25-a", text: "Birokrasi yang kaku" },
          { id: "cpns1-q25-b", text: "Orientasi pada hasil" },
          { id: "cpns1-q25-c", text: "Sentralisasi kewenangan" },
          { id: "cpns1-q25-d", text: "Prosedur yang kompleks" }
        ],
        correctAnswerId: "cpns1-q25-b"
      },
      {
        id: "cpns1-q26",
        text: "Yang bukan merupakan nilai dasar ASN adalah...",
        options: [
          { id: "cpns1-q26-a", text: "Akuntabilitas" },
          { id: "cpns1-q26-b", text: "Nasionalisme" },
          { id: "cpns1-q26-c", text: "Etika publik" },
          { id: "cpns1-q26-d", text: "Materialisme" }
        ],
        correctAnswerId: "cpns1-q26-d"
      },
      {
        id: "cpns1-q27",
        text: "Menurut UU ASN, manajemen ASN diselenggarakan berdasarkan sistem...",
        options: [
          { id: "cpns1-q27-a", text: "Merit" },
          { id: "cpns1-q27-b", text: "Karir" },
          { id: "cpns1-q27-c", text: "Prestasi" },
          { id: "cpns1-q27-d", text: "Senioritas" }
        ],
        correctAnswerId: "cpns1-q27-a"
      },
      {
        id: "cpns1-q28",
        text: "Hak budget DPR adalah...",
        options: [
          { id: "cpns1-q28-a", text: "Hak mengajukan RUU" },
          { id: "cpns1-q28-b", text: "Hak mengawasi jalannya pemerintahan" },
          { id: "cpns1-q28-c", text: "Hak menetapkan APBN" },
          { id: "cpns1-q28-d", text: "Hak mengajukan pertanyaan" }
        ],
        correctAnswerId: "cpns1-q28-c"
      },
      {
        id: "cpns1-q29",
        text: "Yang bukan merupakan unsur pelayanan publik adalah...",
        options: [
          { id: "cpns1-q29-a", text: "Penyedia layanan" },
          { id: "cpns1-q29-b", text: "Penerima layanan" },
          { id: "cpns1-q29-c", text: "Jenis layanan" },
          { id: "cpns1-q29-d", text: "Keuntungan pribadi" }
        ],
        correctAnswerId: "cpns1-q29-d"
      },
      {
        id: "cpns1-q30",
        text: "Instansi yang memiliki kewenangan pembinaan ASN secara nasional adalah...",
        options: [
          { id: "cpns1-q30-a", text: "Kementerian PAN-RB" },
          { id: "cpns1-q30-b", text: "BKN" },
          { id: "cpns1-q30-c", text: "LAN" },
          { id: "cpns1-q30-d", text: "KASN" }
        ],
        correctAnswerId: "cpns1-q30-a"
      },
      {
        id: "cpns1-q31",
        text: "Berdasarkan UU ASN, yang bukan merupakan fungsi ASN adalah...",
        options: [
          { id: "cpns1-q31-a", text: "Pelaksana kebijakan publik" },
          { id: "cpns1-q31-b", text: "Pelayan publik" },
          { id: "cpns1-q31-c", text: "Perekat dan pemersatu bangsa" },
          { id: "cpns1-q31-d", text: "Pembuat kebijakan politik" }
        ],
        correctAnswerId: "cpns1-q31-d"
      },
      {
        id: "cpns1-q32",
        text: "Batas usia pensiun pejabat fungsional adalah...",
        options: [
          { id: "cpns1-q32-a", text: "58 tahun" },
          { id: "cpns1-q32-b", text: "60 tahun" },
          { id: "cpns1-q32-c", text: "65 tahun" },
          { id: "cpns1-q32-d", text: "70 tahun" }
        ],
        correctAnswerId: "cpns1-q32-c"
      },
      //Adding 20 placeholder questions
      { id: "cpns1-q33", text: "Placeholder Question 33", options: [{ id: "cpns1-q33-a", text: "A" }, { id: "cpns1-q33-b", text: "B" }, { id: "cpns1-q33-c", text: "C" }, { id: "cpns1-q33-d", text: "D" }], correctAnswerId: "cpns1-q33-a" },
      { id: "cpns1-q34", text: "Placeholder Question 34", options: [{ id: "cpns1-q34-a", text: "A" }, { id: "cpns1-q34-b", text: "B" }, { id: "cpns1-q34-c", text: "C" }, { id: "cpns1-q34-d", text: "D" }], correctAnswerId: "cpns1-q34-a" },
      { id: "cpns1-q35", text: "Placeholder Question 35", options: [{ id: "cpns1-q35-a", text: "A" }, { id: "cpns1-q35-b", text: "B" }, { id: "cpns1-q35-c", text: "C" }, { id: "cpns1-q35-d", text: "D" }], correctAnswerId: "cpns1-q35-a" },
      { id: "cpns1-q36", text: "Placeholder Question 36", options: [{ id: "cpns1-q36-a", text: "A" }, { id: "cpns1-q36-b", text: "B" }, { id: "cpns1-q36-c", text: "C" }, { id: "cpns1-q36-d", text: "D" }], correctAnswerId: "cpns1-q36-a" },
      { id: "cpns1-q37", text: "Placeholder Question 37", options: [{ id: "cpns1-q37-a", text: "A" }, { id: "cpns1-q37-b", text: "B" }, { id: "cpns1-q37-c", text: "C" }, { id: "cpns1-q37-d", text: "D" }], correctAnswerId: "cpns1-q37-a" },
      { id: "cpns1-q38", text: "Placeholder Question 38", options: [{ id: "cpns1-q38-a", text: "A" }, { id: "cpns1-q38-b", text: "B" }, { id: "cpns1-q38-c", text: "C" }, { id: "cpns1-q38-d", text: "D" }], correctAnswerId: "cpns1-q38-a" },
      { id: "cpns1-q39", text: "Placeholder Question 39", options: [{ id: "cpns1-q39-a", text: "A" }, { id: "cpns1-q39-b", text: "B" }, { id: "cpns1-q39-c", text: "C" }, { id: "cpns1-q39-d", text: "D" }], correctAnswerId: "cpns1-q39-a" },
      { id: "cpns1-q40", text: "Placeholder Question 40", options: [{ id: "cpns1-q40-a", text: "A" }, { id: "cpns1-q40-b", text: "B" }, { id: "cpns1-q40-c", text: "C" }, { id: "cpns1-q40-d", text: "D" }], correctAnswerId: "cpns1-q40-a" },
      { id: "cpns1-q41", text: "Placeholder Question 41", options: [{ id: "cpns1-q41-a", text: "A" }, { id: "cpns1-q41-b", text: "B" }, { id: "cpns1-q41-c", text: "C" }, { id: "cpns1-q41-d", text: "D" }], correctAnswerId: "cpns1-q41-a" },
      { id: "cpns1-q42", text: "Placeholder Question 42", options: [{ id: "cpns1-q42-a", text: "A" }, { id: "cpns1-q42-b", text: "B" }, { id: "cpns1-q42-c", text: "C" }, { id: "cpns1-q42-d", text: "D" }], correctAnswerId: "cpns1-q42-a" },
      { id: "cpns1-q43", text: "Placeholder Question 43", options: [{ id: "cpns1-q43-a", text: "A" }, { id: "cpns1-q43-b", text: "B" }, { id: "cpns1-q43-c", text: "C" }, { id: "cpns1-q43-d", text: "D" }], correctAnswerId: "cpns1-q43-a" },
      { id: "cpns1-q44", text: "Placeholder Question 44", options: [{ id: "cpns1-q44-a", text: "A" }, { id: "cpns1-q44-b", text: "B" }, { id: "cpns1-q44-c", text: "C" }, { id: "cpns1-q44-d", text: "D" }], correctAnswerId: "cpns1-q44-a" },
      { id: "cpns1-q45", text: "Placeholder Question 45", options: [{ id: "cpns1-q45-a", text: "A" }, { id: "cpns1-q45-b", text: "B" }, { id: "cpns1-q45-c", text: "C" }, { id: "cpns1-q45-d", text: "D" }], correctAnswerId: "cpns1-q45-a" },
      { id: "cpns1-q46", text: "Placeholder Question 46", options: [{ id: "cpns1-q46-a", text: "A" }, { id: "cpns1-q46-b", text: "B" }, { id: "cpns1-q46-c", text: "C" }, { id: "cpns1-q46-d", text: "D" }], correctAnswerId: "cpns1-q46-a" },
      { id: "cpns1-q47", text: "Placeholder Question 47", options: [{ id: "cpns1-q47-a", text: "A" }, { id: "cpns1-q47-b", text: "B" }, { id: "cpns1-q47-c", text: "C" }, { id: "cpns1-q47-d", text: "D" }], correctAnswerId: "cpns1-q47-a" },
      { id: "cpns1-q48", text: "Placeholder Question 48", options: [{ id: "cpns1-q48-a", text: "A" }, { id: "cpns1-q48-b", text: "B" }, { id: "cpns1-q48-c", text: "C" }, { id: "cpns1-q48-d", text: "D" }], correctAnswerId: "cpns1-q48-a" },
      { id: "cpns1-q49", text: "Placeholder Question 49", options: [{ id: "cpns1-q49-a", text: "A" }, { id: "cpns1-q49-b", text: "B" }, { id: "cpns1-q49-c", text: "C" }, { id: "cpns1-q49-d", text: "D" }], correctAnswerId: "cpns1-q49-a" },
      { id: "cpns1-q50", text: "Placeholder Question 50", options: [{ id: "cpns1-q50-a", text: "A" }, { id: "cpns1-q50-b", text: "B" }, { id: "cpns1-q50-c", text: "C" }, { id: "cpns1-q50-d", text: "D" }], correctAnswerId: "cpns1-q50-a" },
      { id: "cpns1-q51", text: "Placeholder Question 51", options: [{ id: "cpns1-q51-a", text: "A" }, { id: "cpns1-q51-b", text: "B" }, { id: "cpns1-q51-c", text: "C" }, { id: "cpns1-q51-d", text: "D" }], correctAnswerId: "cpns1-q51-a" },
      { id: "cpns1-q52", text: "Placeholder Question 52", options: [{ id: "cpns1-q52-a", text: "A" }, { id: "cpns1-q52-b", text: "B" }, { id: "cpns1-q52-c", text: "C" }, { id: "cpns1-q52-d", text: "D" }], correctAnswerId: "cpns1-q52-a" }

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