import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleDarkMode } from "@/lib/dark-mode";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Check the initial state
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    
    // Set up a mutation observer to track dark mode changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  const handleToggle = () => {
    toggleDarkMode();
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleToggle} 
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle Dark Mode"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
