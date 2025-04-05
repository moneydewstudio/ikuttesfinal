import { Link } from "wouter";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Persiapkan Ujianmu dengan Lebih Efektif
            </h1>
            <p className="text-lg md:text-xl mb-8 text-primary-100">
              Platform tryout online untuk persiapan CPNS, SNBT, dan Psikotes dengan analisis hasil yang komprehensif.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link href="/tryout">
                <a className="bg-white text-primary-700 hover:bg-gray-100 font-medium px-6 py-3 rounded-2xl shadow-soft transition-colors duration-200 text-center">
                  Mulai Tryout
                </a>
              </Link>
              <Link href="/blog">
                <a className="bg-primary-700 text-white border border-primary-400 hover:bg-primary-800 font-medium px-6 py-3 rounded-2xl transition-colors duration-200 text-center">
                  Baca Materi
                </a>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-8">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary-400 rounded-full opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Pelajar sedang belajar bersama" 
                className="relative z-10 rounded-2xl shadow-soft" 
                width="600" 
                height="400"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
