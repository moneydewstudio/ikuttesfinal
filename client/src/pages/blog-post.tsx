import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Helmet } from "react-helmet";
import { getBlogPostBySlug, getLatestBlogPosts, BlogPost } from "@/lib/blog-data";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/home/blog-card";

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const [, navigate] = useLocation();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (params?.slug) {
      const blogPost = getBlogPostBySlug(params.slug);
      if (blogPost) {
        setPost(blogPost);
        
        // Get related posts from the same category
        const latestPosts = getLatestBlogPosts(4);
        const filtered = latestPosts.filter(p => p.id !== blogPost.id).slice(0, 3);
        setRelatedPosts(filtered);
      }
    }
  }, [params]);

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-16">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-soft max-w-md mx-auto">
              <h1 className="text-2xl font-bold mb-4">Artikel Tidak Ditemukan</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Maaf, artikel yang Anda cari tidak tersedia. Silakan kembali ke halaman blog.
              </p>
              <Button 
                onClick={() => navigate("/blog")}
                className="bg-primary-600 hover:bg-primary-700 text-white"
              >
                Kembali ke Blog
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const getCategoryBadgeClass = () => {
    switch (post.category) {
      case "CPNS":
        return "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200";
      case "SNBT":
        return "bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200";
      case "Psikotes":
        return "bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-200";
      default:
        return "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200";
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Ikuttes</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.imageUrl} />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <Button 
            variant="outline"
            className="mb-8"
            onClick={() => navigate("/blog")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Blog
          </Button>
          
          <article className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft overflow-hidden">
              <div className="h-[300px] md:h-[400px] overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
                    <span className={`px-3 py-1 ${getCategoryBadgeClass()} text-xs font-medium rounded-full`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold mb-4">{post.title}</h1>
                
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Bagikan artikel ini:</span>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
                        }}
                      >
                        Twitter
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          window.open(`https://wa.me/?text=${encodeURIComponent(post.title + '\n' + window.location.href)}`, '_blank');
                        }}
                      >
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Artikel Terkait</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map(relatedPost => (
                    <BlogCard key={relatedPost.id} post={relatedPost} />
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
