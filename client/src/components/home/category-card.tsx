import { Link } from "wouter";
import { Landmark, GraduationCap, Brain } from "lucide-react";

type CategoryCardProps = {
  title: string;
  description: string;
  count: number;
  slug: string;
  icon: "CPNS" | "SNBT" | "Psikotes";
};

export function CategoryCard({ title, description, count, slug, icon }: CategoryCardProps) {
  const getIconComponent = () => {
    switch (icon) {
      case "CPNS":
        return <Landmark className="w-20 h-20 text-white opacity-30" />;
      case "SNBT":
        return <GraduationCap className="w-20 h-20 text-white opacity-30" />;
      case "Psikotes":
        return <Brain className="w-20 h-20 text-white opacity-30" />;
      default:
        return <Landmark className="w-20 h-20 text-white opacity-30" />;
    }
  };

  const getGradientColor = () => {
    switch (icon) {
      case "CPNS":
        return "from-primary-700 to-primary-500";
      case "SNBT":
        return "from-secondary-700 to-secondary-500";
      case "Psikotes":
        return "from-accent-600 to-accent-400";
      default:
        return "from-primary-700 to-primary-500";
    }
  };

  const getBackgroundColor = () => {
    switch (icon) {
      case "CPNS":
        return "bg-primary-600";
      case "SNBT":
        return "bg-secondary-600";
      case "Psikotes":
        return "bg-accent-500";
      default:
        return "bg-primary-600";
    }
  };

  const getLinkColor = () => {
    switch (icon) {
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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className={`h-40 ${getBackgroundColor()} relative overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-r ${getGradientColor()} opacity-90`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          {getIconComponent()}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {count} Tryout Tersedia
          </span>
          <Link href={`/tryout/${slug}`}>
            <a className={`${getLinkColor()} font-medium flex items-center`}>
              <span>Lihat</span>
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
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
