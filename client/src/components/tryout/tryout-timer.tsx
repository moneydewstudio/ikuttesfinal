import { useState, useEffect, useCallback } from "react";
import { AlertCircle } from "lucide-react";

type TryoutTimerProps = {
  durationInMinutes: number;
  onTimeUp: () => void;
};

export function TryoutTimer({ durationInMinutes, onTimeUp }: TryoutTimerProps) {
  const [timeLeft, setTimeLeft] = useState(durationInMinutes * 60);
  const [warningActive, setWarningActive] = useState(false);

  // Format time as HH:MM:SS
  const formatTime = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0")
    ].join(":");
  }, []);

  // Effect to countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    // Show warning when 5 minutes or less remaining
    if (timeLeft <= 300 && !warningActive) {
      setWarningActive(true);
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, onTimeUp, warningActive]);

  return (
    <div 
      className={`flex items-center ${
        warningActive 
          ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20" 
          : "text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700"
      } px-3 py-1 rounded-full transition-colors duration-300`}
    >
      {warningActive && <AlertCircle className="w-4 h-4 mr-1 animate-pulse" />}
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
      <span className="text-sm font-medium">{formatTime(timeLeft)}</span>
    </div>
  );
}
