import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TryoutCard } from "@/components/home/tryout-card";
import { allTryouts, getTryoutsByCategory } from "@/lib/tryout-data";
import { Helmet } from "react-helmet";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function TryoutList() {
  const [, params] = useRoute("/tryout/:category");
  const category = params?.category?.toUpperCase();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTryouts, setFilteredTryouts] = useState(
    category ? getTryoutsByCategory(category) : allTryouts
  );

  useEffect(() => {
    // Filter tryouts based on category and search query
    const tryouts = category ? getTryoutsByCategory(category) : allTryouts;
    
    if (searchQuery.trim() === "") {
      setFilteredTryouts(tryouts);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = tryouts.filter(
        tryout => 
          tryout.title.toLowerCase().includes(lowerCaseQuery) || 
          tryout.description.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredTryouts(filtered);
    }
  }, [category, searchQuery]);

  const getCategoryTitle = () => {
    switch (category) {
      case "CPNS":
        return "CPNS (Calon Pegawai Negeri Sipil)";
      case "SNBT":
        return "SNBT (Seleksi Nasional Berdasarkan Tes)";
      case "PSIKOTES":
        return "Psikotes";
      default:
        return "Semua Kategori";
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {category 
            ? `Tryout ${category} | Ikuttes` 
            : "Semua Tryout | Ikuttes"}
        </title>
        <meta 
          name="description" 
          content={`Tryout online untuk persiapan ${category || "ujian"} dengan soal terbaru dan pembahasan lengkap.`} 
        />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{getCategoryTitle()}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Persiapkan diri Anda dengan tryout online yang mirip dengan ujian sebenarnya.
            </p>
          </div>
          
          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Cari tryout..."
                className="pl-10 w-full md:max-w-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {filteredTryouts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTryouts.map(tryout => (
                <TryoutCard key={tryout.id} tryout={tryout} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-soft">
              <h3 className="text-lg font-medium mb-2">Tidak ada tryout yang ditemukan</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Silakan coba dengan kata kunci yang berbeda.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
}
