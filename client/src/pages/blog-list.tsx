import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BlogCard } from "@/components/home/blog-card";
import { blogPosts, getBlogPostsByCategory } from "@/lib/blog-data";
import { Helmet } from "react-helmet";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BlogList() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const categoryParam = searchParams.get('category')?.toUpperCase();
  
  const [activeCategory, setActiveCategory] = useState<string>(categoryParam || 'all');
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(
    categoryParam 
      ? getBlogPostsByCategory(categoryParam) 
      : blogPosts
  );

  useEffect(() => {
    // Filter posts based on category and search query
    let posts = activeCategory === 'all' 
      ? blogPosts 
      : getBlogPostsByCategory(activeCategory);
    
    if (searchQuery.trim() !== "") {
      const lowerCaseQuery = searchQuery.toLowerCase();
      posts = posts.filter(
        post => 
          post.title.toLowerCase().includes(lowerCaseQuery) || 
          post.excerpt.toLowerCase().includes(lowerCaseQuery) ||
          post.content.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    setFilteredPosts(posts);
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <>
      <Helmet>
        <title>
          {activeCategory !== 'all' 
            ? `Blog ${activeCategory} | Ikuttes` 
            : "Blog | Ikuttes"}
        </title>
        <meta 
          name="description" 
          content={`Artikel dan tips terkait ${activeCategory !== 'all' ? activeCategory : "ujian"} dari Ikuttes.`} 
        />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Blog</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Pelajari tips dan strategi untuk menaklukkan berbagai ujian.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Cari artikel..."
                className="pl-10 w-full md:max-w-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full md:w-auto">
              <TabsList className="w-full md:w-auto">
                <TabsTrigger value="all">Semua</TabsTrigger>
                <TabsTrigger value="CPNS">CPNS</TabsTrigger>
                <TabsTrigger value="SNBT">SNBT</TabsTrigger>
                <TabsTrigger value="Psikotes">Psikotes</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-soft">
              <h3 className="text-lg font-medium mb-2">Tidak ada artikel yang ditemukan</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Silakan coba dengan kata kunci atau kategori yang berbeda.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              >
                Reset Pencarian
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
}
