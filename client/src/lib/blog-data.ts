export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "CPNS" | "SNBT" | "Psikotes";
  date: string;
  imageUrl: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    slug: "strategi-jitu-tes-skd-cpns",
    title: "10 Strategi Jitu Menghadapi Tes SKD CPNS 2025",
    excerpt:
      "Pelajari strategi terbaik untuk menaklukkan Seleksi Kompetensi Dasar (SKD) CPNS dengan persiapan yang tepat dan efektif.",
    content: `
      <p>Seleksi Kompetensi Dasar (SKD) merupakan tahapan awal yang harus dilalui para peserta seleksi CPNS. Tahapan ini seringkali menjadi momok bagi banyak peserta karena tingkat kesulitannya yang cukup tinggi serta passing grade yang terus ditingkatkan setiap tahunnya.</p>
      
      <h2>1. Pahami Pola Soal CAT SKD</h2>
      <p>SKD terdiri dari tiga jenis tes: Tes Wawasan Kebangsaan (TWK), Tes Intelegensi Umum (TIU), dan Tes Karakteristik Pribadi (TKP). Masing-masing memiliki jumlah soal dan passing grade yang berbeda-beda. Memahami pola soal akan membantu kamu fokus belajar pada bagian yang tepat.</p>
      
      <h2>2. Buat Jadwal Belajar Konsisten</h2>
      <p>Konsistensi adalah kunci utama dalam persiapan. Buat jadwal belajar teratur, minimal 2-3 jam sehari dengan porsi yang seimbang untuk ketiga jenis tes.</p>
      
      <h2>3. Latihan Soal Secara Berkala</h2>
      <p>Jangan hanya membaca teori, tetapi juga berlatihlah mengerjakan soal-soal dari tahun-tahun sebelumnya. Ini akan membantu kamu memahami pola dan tingkat kesulitan soal yang mungkin muncul.</p>
      
      <h2>4. Perhatikan Manajemen Waktu</h2>
      <p>Dalam tes CAT, manajemen waktu sangat penting. Rata-rata kamu memiliki waktu sekitar 1,5-2 menit per soal. Berlatih mengerjakan soal dengan timer akan membantu mengatur kecepatan menjawab.</p>
      
      <h2>5. Prioritaskan TKP</h2>
      <p>TKP memiliki skor tertinggi di antara ketiga jenis tes. Setiap jawaban benar bisa mendapatkan 5 poin. Memprioritaskan latihan TKP bisa memberikan keuntungan signifikan.</p>
      
      <h2>6. Pelajari Teknik Mengerjakan Soal TIU</h2>
      <p>TIU seringkali menjadi bagian tersulit karena melibatkan hitungan, logika, dan analisis. Pelajari teknik cepat dalam mengerjakan soal matematika dan logika verbal.</p>
      
      <h2>7. Hafal Materi Dasar TWK</h2>
      <p>Untuk TWK, hafal materi dasar seperti Pancasila, UUD 1945, sejarah kemerdekaan, dan wawasan kebangsaan lainnya.</p>
      
      <h2>8. Jaga Kesehatan Fisik dan Mental</h2>
      <p>Persiapan yang baik tidak hanya tentang belajar, tetapi juga tentang menjaga kondisi fisik dan mental. Pastikan cukup istirahat, makan sehat, dan kelola stres dengan baik.</p>
      
      <h2>9. Ikuti Tryout Resmi</h2>
      <p>Ikuti tryout resmi yang diadakan oleh lembaga terpercaya untuk mendapatkan gambaran nyata tentang sistem CAT dan tingkat kesulitan soal terbaru.</p>
      
      <h2>10. Review dan Evaluasi</h2>
      <p>Setelah mengerjakan latihan soal atau tryout, selalu review jawaban dan evaluasi apa yang perlu diperbaiki. Catat jenis soal yang sering salah untuk dipelajari lebih lanjut.</p>
      
      <p>Dengan persiapan yang tepat dan konsisten, kamu punya peluang lebih besar untuk lolos SKD CPNS. Selamat belajar dan semoga sukses!</p>
    `,
    category: "CPNS",
    date: "Maret 14, 2025",
    imageUrl:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "blog-2",
    slug: "memahami-sistem-snbt",
    title: "Memahami Sistem SNBT 2025: Apa yang Berbeda dari UTBK?",
    excerpt:
      "Berbagai perubahan penting dari sistem UTBK ke SNBT dan bagaimana cara terbaik untuk mempersiapkan diri menghadapinya.",
    content: `
      <p>Sejak tahun 2025, sistem seleksi masuk perguruan tinggi negeri di Indonesia telah berubah dari UTBK-SBMPTN menjadi Seleksi Nasional Berdasarkan Tes (SNBT). Perubahan ini membawa beberapa perbedaan signifikan yang perlu dipahami oleh para calon mahasiswa.</p>
      
      <h2>Apa itu SNBT?</h2>
      <p>SNBT atau Seleksi Nasional Berdasarkan Tes adalah jalur seleksi masuk perguruan tinggi negeri yang menggantikan UTBK-SBMPTN. SNBT menjadi satu-satunya jalur seleksi nasional berbasis tes untuk masuk PTN, berdampingan dengan SNBP (Seleksi Nasional Berdasarkan Prestasi) yang menggantikan jalur SNMPTN.</p>
      
      <h2>Perbedaan Utama SNBT dan UTBK</h2>
      
      <h3>1. Struktur Tes</h3>
      <p>UTBK terdiri dari TPS (Tes Potensi Skolastik) dan TKA (Tes Kompetensi Akademik) sesuai dengan kelompok ujian (Saintek/Soshum). Sementara itu, SNBT hanya terdiri dari Tes Potensi Skolastik dan Literasi dalam Bahasa Indonesia serta Bahasa Inggris yang wajib diikuti semua peserta.</p>
      
      <h3>2. Materi Ujian</h3>
      <p>SNBT tidak lagi menguji materi pelajaran spesifik seperti Matematika, Fisika, Kimia, Biologi (Saintek) atau Ekonomi, Geografi, Sejarah, Sosiologi (Soshum). Semua peserta mengikuti tes yang sama tanpa memandang jurusan yang akan dipilih.</p>
      
      <h3>3. Sistem Penilaian</h3>
      <p>SNBT menggunakan sistem penilaian yang bersifat komprehensif, tidak hanya berdasarkan skor tes tetapi juga mempertimbangkan rekam jejak prestasi akademik dan non-akademik selama di SMA/SMK/MA.</p>
      
      <h3>4. Pemilihan Program Studi</h3>
      <p>Pada UTBK, pemilihan program studi dilakukan sebelum tes, sedangkan pada SNBT, peserta baru memilih program studi setelah hasil tes diumumkan, sehingga dapat menyesuaikan pilihan dengan skor yang diperoleh.</p>
      
      <h2>Strategi Persiapan SNBT</h2>
      
      <h3>1. Fokus pada Kemampuan Dasar</h3>
      <p>Karena SNBT lebih fokus pada kemampuan penalaran dan literasi, persiapkan diri dengan melatih kemampuan berpikir kritis, logika, dan pemahaman bacaan.</p>
      
      <h3>2. Tingkatkan Kemampuan Bahasa</h3>
      <p>Literasi Bahasa Indonesia dan Bahasa Inggris menjadi kunci. Perbanyak membaca berbagai jenis teks dan berlatih memahami konteks serta menjawab pertanyaan terkait.</p>
      
      <h3>3. Latihan Soal TPS</h3>
      <p>Meskipun ada perubahan, format TPS tidak jauh berbeda dari sebelumnya. Berlatihlah dengan soal-soal TPS tahun sebelumnya untuk membiasakan diri dengan pola soal.</p>
      
      <h3>4. Kembangkan Portofolio</h3>
      <p>Karena penilaian juga mempertimbangkan rekam jejak, aktif dalam kegiatan akademik dan non-akademik yang dapat memperkuat portofolio.</p>
      
      <h2>Kesimpulan</h2>
      <p>Perubahan dari UTBK ke SNBT membawa paradigma baru dalam seleksi masuk perguruan tinggi. Fokus kini lebih pada kemampuan dasar dan potensi calon mahasiswa, bukan sekadar penguasaan materi pelajaran. Dengan memahami perbedaan dan menyiapkan strategi yang tepat, calon mahasiswa dapat meningkatkan peluang keberhasilan dalam SNBT.</p>
    `,
    category: "SNBT",
    date: "Maret 11, 2025",
    imageUrl:
      "https://images.unsplash.com/photo-1519834022362-8c5d13254d53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: "blog-3",
    slug: "jenis-psikotes-dan-cara-menaklukkannya",
    title: "5 Jenis Psikotes yang Sering Muncul dan Cara Menaklukkannya",
    excerpt:
      "Kenali berbagai jenis psikotes yang sering digunakan dalam seleksi kerja dan pendidikan serta tips menghadapinya.",
    content: `
      <p>Psikotes menjadi salah satu tahapan seleksi yang umum digunakan perusahaan atau institusi pendidikan untuk mengetahui karakter, kepribadian, dan kemampuan kognitif calon karyawan atau mahasiswa. Berikut adalah 5 jenis psikotes yang sering muncul dan cara menghadapinya:</p>
      
      <h2>1. Tes Kecerdasan (Intelligence Test)</h2>
      <p>Tes ini mengukur kemampuan kognitif umum seperti penalaran, pemecahan masalah, pemahaman verbal, dan kemampuan numerik.</p>
      
      <h3>Cara Menaklukkan:</h3>
      <ul>
        <li>Latih kemampuan logika dengan teka-teki dan puzzle</li>
        <li>Berlatih soal-soal matematika dasar dan deret angka</li>
        <li>Perbanyak membaca untuk meningkatkan pemahaman verbal</li>
        <li>Berlatih menyelesaikan soal dalam batasan waktu tertentu</li>
      </ul>
      
      <h2>2. Tes Kepribadian (Personality Test)</h2>
      <p>Tes ini memetakan karakter, sikap, dan preferensi seseorang dalam berbagai situasi, seperti MBTI, Big Five Personality, atau tes DISC.</p>
      
      <h3>Cara Menaklukkan:</h3>
      <ul>
        <li>Jawab dengan jujur sesuai kepribadian asli Anda</li>
        <li>Hindari memberikan jawaban ekstrim (selalu/tidak pernah)</li>
        <li>Pahami bahwa tidak ada jawaban "benar" atau "salah" dalam tes ini</li>
        <li>Konsisten dengan jawaban Anda sepanjang tes</li>
      </ul>
      
      <h2>3. Tes Minat dan Bakat (Aptitude Test)</h2>
      <p>Tes ini mengevaluasi kecenderungan minat, bakat, dan potensi seseorang dalam bidang tertentu, seperti teknik, seni, atau manajemen.</p>
      
      <h3>Cara Menaklukkan:</h3>
      <ul>
        <li>Kenali minat dan bakat diri sendiri sebelum mengikuti tes</li>
        <li>Jawab sesuai dengan preferensi nyata, bukan berdasarkan ekspektasi orang lain</li>
        <li>Perhatikan pola pertanyaan yang mungkin berulang dengan konteks berbeda</li>
      </ul>
      
      <h2>4. Tes Proyektif (Projective Test)</h2>
      <p>Tes ini melibatkan interpretasi terhadap gambar atau situasi ambigu, seperti Tes Rorschach (bercak tinta) atau Thematic Apperception Test (TAT).</p>
      
      <h3>Cara Menaklukkan:</h3>
      <ul>
        <li>Berikan interpretasi yang wajar dan tidak terlalu ekstrim</li>
        <li>Coba lihat gambar dari berbagai sudut pandang</li>
        <li>Jawab dengan spontan, tanpa terlalu banyak berpikir</li>
        <li>Hindari interpretasi yang terlalu negatif atau menyeramkan</li>
      </ul>
      
      <h2>5. Tes Kinerja Kerja (Work Performance Test)</h2>
      <p>Tes ini mengevaluasi bagaimana seseorang akan bereaksi dan bekerja dalam situasi kerja tertentu, termasuk kemampuan mengatasi stres dan bekerja dalam tekanan.</p>
      
      <h3>Cara Menaklukkan:</h3>
      <ul>
        <li>Pertahankan fokus dan ketenangan dalam situasi tertekan</li>
        <li>Tunjukkan kemampuan bekerja dalam tim jika diperlukan</li>
        <li>Prioritaskan tugas berdasarkan urgensi dan kepentingan</li>
        <li>Komunikasikan proses berpikir Anda ketika memecahkan masalah</li>
      </ul>
      
      <h2>Tips Umum Menghadapi Psikotes</h2>
      
      <h3>Persiapan Mental dan Fisik</h3>
      <p>Pastikan Anda cukup istirahat sebelum tes. Hindari konsumsi kafein berlebihan dan datang tepat waktu atau lebih awal untuk mengurangi stres.</p>
      
      <h3>Pahami Instruksi</h3>
      <p>Dengarkan atau baca instruksi dengan saksama. Jangan ragu untuk bertanya jika ada yang kurang jelas.</p>
      
      <h3>Manajemen Waktu</h3>
      <p>Alokasikan waktu dengan bijak untuk setiap bagian tes. Jika tidak tahu jawaban, lebih baik lompati dulu dan kembali jika masih ada waktu.</p>
      
      <h3>Berlatih</h3>
      <p>Familiarkan diri dengan berbagai jenis psikotes melalui contoh soal dan simulasi yang tersedia online atau di buku-buku persiapan.</p>
      
      <p>Dengan persiapan yang tepat dan pemahaman tentang jenis-jenis psikotes, Anda akan lebih percaya diri dan berpeluang lebih besar untuk sukses menghadapinya.</p>
    `,
    category: "Psikotes",
    date: "Agustus 5, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
  },
];

// Get blog posts by category
export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase(),
  );
};

// Get blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

// Get latest blog posts
export const getLatestBlogPosts = (limit: number = 3): BlogPost[] => {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};
