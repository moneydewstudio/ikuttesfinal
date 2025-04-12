import { Link } from "wouter";
import { BookOpen, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-primary-600 text-white p-1.5 rounded-lg">
                <BookOpen className="w-6 h-6" />
              </span>
              <span className="text-xl font-bold text-white">Ikuttes</span>
            </div>
            <p className="text-gray-400 mb-4">
              Platform persiapan ujian Indonesia yang membantu kamu meraih hasil terbaik dalam CPNS, SNBT, dan Psikotes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Tryout</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tryout/cpns" className="text-gray-400 hover:text-white">
                  CPNS
                </Link>
              </li>
              <li>
                <Link href="/tryout/snbt" className="text-gray-400 hover:text-white">
                  SNBT
                </Link>
              </li>
              <li>
                <Link href="/tryout/psikotes" className="text-gray-400 hover:text-white">
                  Psikotes
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-gray-400 hover:text-white">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Blog</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog?category=cpns" className="text-gray-400 hover:text-white">
                  Tips CPNS
                </Link>
              </li>
              <li>
                <Link href="/blog?category=snbt" className="text-gray-400 hover:text-white">
                  Persiapan SNBT
                </Link>
              </li>
              <li>
                <Link href="/blog?category=psikotes" className="text-gray-400 hover:text-white">
                  Strategi Psikotes
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  Semua Artikel
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Tentang</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tentang" className="text-gray-400 hover:text-white">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="text-gray-400 hover:text-white">
                  Kontak
                </Link>
              </li>
              <li>
                <Link href="/kebijakan-privasi" className="text-gray-400 hover:text-white">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/syarat-ketentuan" className="text-gray-400 hover:text-white">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2023 Ikuttes. Hak Cipta Dilindungi.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-white text-sm">Bahasa: Indonesia</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
