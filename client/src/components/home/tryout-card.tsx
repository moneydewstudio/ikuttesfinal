import { Link } from "wouter";
import { Clock, Users } from "lucide-react";
import { Tryout } from "@/lib/tryout-data";

type TryoutCardProps = {
  tryout: Tryout;
};

export function TryoutCard({ tryout }: TryoutCardProps) {
  const getCategoryBadgeClass = () => {
    switch (tryout.category) {
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

  const getButtonClass = () => {
    switch (tryout.category) {
      case "CPNS":
        return "bg-primary-600 hover:bg-primary-700";
      case "SNBT":
        return "bg-secondary-600 hover:bg-secondary-700";
      case "Psikotes":
        return "bg-accent-600 hover:bg-accent-700";
      default:
        return "bg-primary-600 hover:bg-primary-700";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <span className={`px-3 py-1 ${getCategoryBadgeClass()} text-xs font-medium rounded-full`}>
            {tryout.category}
          </span>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{tryout.timeInMinutes} menit</span>
          </div>
        </div>
        <h3 className="text-lg font-bold mb-2">{tryout.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {tryout.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
            <Users className="w-4 h-4" />
            <span className="text-sm">{tryout.participants.toLocaleString()}+ peserta</span>
          </div>
          <Link href={`/tryout/${tryout.category.toLowerCase()}/${tryout.slug}`}>
            <a className={`${getButtonClass()} text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200`}>
              Mulai Tryout
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
