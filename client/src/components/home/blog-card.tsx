import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "@/lib/blog-data";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
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

  const getLinkClass = () => {
    switch (post.category) {
      case "CPNS":
        return "text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300";
      case "SNBT":
        return "text-secondary-600 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300";
      case "Psikotes":
        return "text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300";
      default:
        return "text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-3">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{post.date}</span>
          <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
          <span className={`px-2 py-1 ${getCategoryBadgeClass()} text-xs font-medium rounded-full`}>
            {post.category}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-2">{post.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        <Link href={`/blog/${post.slug}`}>
          <a className={`${getLinkClass()} font-medium flex items-center text-sm`}>
            <span>Baca Selengkapnya</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </Link>
      </div>
    </div>
  );
}
