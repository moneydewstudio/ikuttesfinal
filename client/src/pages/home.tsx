import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { CategoryCard } from "@/components/home/category-card";
import { TryoutCard } from "@/components/home/tryout-card";
import { BlogCard } from "@/components/home/blog-card";
import { LeaderboardPreview } from "@/components/home/leaderboard-preview";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { getPopularTryouts } from "@/lib/tryout-data";
import { getLatestBlogPosts } from "@/lib/blog-data";
import { Helmet } from "react-helmet";

export default function Home() {
  const popularTryouts = getPopularTryouts(3);
  const latestPosts = getLatestBlogPosts(3);

  return (
    <>
      <Helmet>
        <title>EdukasiBersama - Platform Persiapan Ujian Indonesia</title>
        <meta name="description" content="Platform persiapan ujian Indonesia untuk CPNS, SNBT, dan Psikotes dengan tryout interaktif dan materi pembelajaran." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Category Cards */}
        <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Kategori Ujian</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CategoryCard 
                title="CPNS"
                description="Persiapan ujian CPNS dengan soal TWK, TIU, dan TKP sesuai dengan kisi-kisi terbaru."
                count={3}
                slug="cpns"
                icon="CPNS"
              />
              
              <CategoryCard 
                title="SNBT"
                description="Tryout Seleksi Nasional Berdasarkan Tes dengan pola soal terbaru dan pembahasan lengkap."
                count={2}
                slug="snbt"
                icon="SNBT"
              />
              
              <CategoryCard 
                title="Psikotes"
                description="Latihan psikotes lengkap meliputi tes logika, tes verbal, tes numerik, dan tes kepribadian."
                count={2}
                slug="psikotes"
                icon="Psikotes"
              />
            </div>
          </div>
        </section>

        {/* Featured Tryouts */}
        <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Tryout Terpopuler</h2>
              <Link href="/tryout">
                <a className="mt-4 md:mt-0 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center">
                  <span>Lihat Semua Tryout</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTryouts.map(tryout => (
                <TryoutCard key={tryout.id} tryout={tryout} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Tryout Preview */}
        <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Rasakan Pengalaman Ujian yang Sesungguhnya</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Platform kami menyediakan simulasi ujian yang mirip dengan ujian asli, lengkap dengan:</p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="ml-3 text-gray-700 dark:text-gray-300">Timer yang dapat disesuaikan sesuai ketentuan ujian</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="ml-3 text-gray-700 dark:text-gray-300">Sistem navigasi soal yang mudah dan efisien</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="ml-3 text-gray-700 dark:text-gray-300">Analisis hasil ujian yang komprehensif</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="ml-3 text-gray-700 dark:text-gray-300">Pembahasan soal yang detail dan mudah dipahami</span>
                  </li>
                </ul>
                
                <Link href="/tryout">
                  <a className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white px-5 py-3 rounded-xl font-medium transition-colors duration-200">
                    <span>Coba Tryout Gratis</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Link>
              </div>
              
              <div className="md:w-1/2 md:pl-8">
                {/* Question Preview */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <span className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-medium">12</span>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">dari 100 soal</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="w-4 h-4 mr-1" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span className="text-sm font-medium">01:23:45</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-4">Sebuah pesawat terbang dengan kecepatan 800 km/jam diterbangkan dari bandara A menuju bandara B yang berjarak 2.400 km. Jika pesawat tersebut berangkat pukul 08.30 WIB, pada pukul berapa pesawat tersebut akan tiba di bandara B?</h4>
                    
                    <div className="space-y-3">
                      <label className="flex items-start p-3 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                        <input type="radio" name="answer" className="w-5 h-5 mt-0.5 text-primary-600 rounded-full" />
                        <span className="ml-3">A. Pukul 11.00 WIB</span>
                      </label>
                      
                      <label className="flex items-start p-3 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                        <input type="radio" name="answer" className="w-5 h-5 mt-0.5 text-primary-600 rounded-full" />
                        <span className="ml-3">B. Pukul 11.30 WIB</span>
                      </label>
                      
                      <label className="flex items-start p-3 border border-primary-200 dark:border-primary-700 bg-primary-50 dark:bg-primary-900/20 rounded-xl cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors">
                        <input type="radio" name="answer" className="w-5 h-5 mt-0.5 text-primary-600 rounded-full" checked />
                        <span className="ml-3">C. Pukul 12.00 WIB</span>
                      </label>
                      
                      <label className="flex items-start p-3 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                        <input type="radio" name="answer" className="w-5 h-5 mt-0.5 text-primary-600 rounded-full" />
                        <span className="ml-3">D. Pukul 12.30 WIB</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="w-4 h-4 mr-1" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="m12 19-7-7 7-7"></path>
                        <path d="M19 12H5"></path>
                      </svg>
                      <span>Sebelumnya</span>
                    </button>
                    
                    <button className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                      <span>Selanjutnya</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="w-4 h-4 ml-1" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Latest Blog */}
        <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Artikel Terbaru</h2>
              <Link href="/blog">
                <a className="mt-4 md:mt-0 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center">
                  <span>Lihat Semua Artikel</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Personality Tests */}
        <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Tes Kepribadian</h2>
              <Link href="/personality-tests">
                <a className="mt-4 md:mt-0 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center">
                  <span>Lihat Semua Tes</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </Link>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6 md:p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:w-1/2 md:pr-8">
                  <div className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-2">FITUR BARU</div>
                  <h3 className="text-2xl font-bold mb-4">Kenali Dirimu Lebih Dalam</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Tes kepribadian kami membantu Anda memahami kepribadian, kekuatan dan kelemahan Anda.
                    Ambil tes standar seperti MBTI, Big Five, atau HEXACO dan dapatkan hasil yang dapat dibagikan.
                  </p>
                  <Link href="/personality-tests">
                    <a className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white px-5 py-3 rounded-xl font-medium transition-colors duration-200">
                      <span>Coba Tes Kepribadian</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Link>
                </div>
                <div className="md:w-1/2 grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 flex items-center justify-center mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 16c2.5-4.2 4-6.3 4-8a4 4 0 0 0-8 0c0 1.7 1.5 3.8 4 8Z"/>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-lg">MBTI</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Temukan tipe kepribadian dari 16 jenis berbeda
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="m7 15 5-5 5 5"/>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-lg">Big Five</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Ukur kepribadian berdasarkan lima dimensi utama
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300 flex items-center justify-center mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <polygon points="12 2 17.5 7.5 17.5 16.5 12 22 6.5 16.5 6.5 7.5 12 2"/>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-lg">HEXACO</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Pelajari enam dimensi kepribadian Anda
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300 flex items-center justify-center mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="M17 12a5 5 0 0 0-5-5 1 1 0 0 0 0 2 3 3 0 0 1 0 6 1 1 0 0 0 0 2 5 5 0 0 0 5-5Z"/>
                        <path d="M5 12a5 5 0 0 1 5-5 1 1 0 0 1 0 2 3 3 0 0 0 0 6 1 1 0 0 1 0 2 5 5 0 0 1-5-5Z"/>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-lg">Hasil</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Dapatkan hasil yang dapat dibagikan dengan mudah
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboard Preview */}
        <LeaderboardPreview />
        
        {/* CTA */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">Siap Untuk Mulai Persiapan Ujianmu?</h2>
            <p className="text-lg md:text-xl mb-8 text-primary-100 max-w-2xl mx-auto">Bergabunglah dengan ribuan peserta lain yang telah berhasil melalui persiapan ujian bersama kami.</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/register">
                <a className="bg-white text-primary-700 hover:bg-gray-100 font-medium px-8 py-3 rounded-2xl shadow-soft transition-colors duration-200">
                  Buat Akun Gratis
                </a>
              </Link>
              <Link href="/tryout">
                <a className="bg-primary-700 text-white border border-primary-400 hover:bg-primary-800 font-medium px-8 py-3 rounded-2xl transition-colors duration-200">
                  Coba Tryout
                </a>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
