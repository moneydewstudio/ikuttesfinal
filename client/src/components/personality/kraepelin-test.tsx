import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRightCircle, XCircle, PlayCircle, PauseCircle, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type KraepelinTestProps = {
  durationInMinutes: number;
  onComplete: (results: KraepelinResults) => void;
};

export type KraepelinResults = {
  totalAnswers: number;
  correctAnswers: number;
  accuracy: number;
  speed: number;
  consistency: number;
  endurance: number;
  sections: {
    time: number;
    answers: number;
    correct: number;
  }[];
};

type KraepelinProblem = {
  row: number[];
  userAnswer: number | null;
  isCorrect: boolean | null;
};

// Helper to generate a random number between min and max (inclusive)
const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Generate a row of random single-digit numbers
const generateRow = (length: number = 2): number[] => {
  return Array.from({ length }, () => getRandomNumber(1, 9));
};

export function KraepelinTest({ durationInMinutes, onComplete }: KraepelinTestProps) {
  const totalTimeInSeconds = durationInMinutes * 60;
  const [timeLeft, setTimeLeft] = useState(totalTimeInSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(true);
  const [isConfirmExitOpen, setIsConfirmExitOpen] = useState(false);
  
  // For tracking statistics
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [sections, setSections] = useState<{time: number, answers: number, correct: number}[]>([]);
  const sectionInterval = useRef<number>(60); // Update stats every minute
  const lastSectionTime = useRef<number>(0);
  const sectionAnswers = useRef<number>(0);
  const sectionCorrect = useRef<number>(0);
  
  // Test problems
  const [visibleProblems, setVisibleProblems] = useState<KraepelinProblem[]>([]);
  const [position, setPosition] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Initialize or reset the problem set
  const initializeProblems = useCallback(() => {
    const initialProblems: KraepelinProblem[] = Array.from({ length: 12 }, () => ({
      row: generateRow(),
      userAnswer: null,
      isCorrect: null,
    }));
    setVisibleProblems(initialProblems);
    setPosition(0);
    setTotalAnswers(0);
    setCorrectAnswers(0);
    setSections([]);
    lastSectionTime.current = 0;
    sectionAnswers.current = 0;
    sectionCorrect.current = 0;
  }, []);
  
  // Start the test
  const startTest = () => {
    setIsStarted(true);
    setIsInstructionsOpen(false);
    initializeProblems();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Handle timer logic
  useEffect(() => {
    if (!isStarted || isPaused) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        // Check if we need to record section data
        const elapsedTime = totalTimeInSeconds - prev;
        if (elapsedTime - lastSectionTime.current >= sectionInterval.current) {
          setSections(prev => [
            ...prev, 
            { 
              time: elapsedTime, 
              answers: sectionAnswers.current, 
              correct: sectionCorrect.current 
            }
          ]);
          lastSectionTime.current = elapsedTime;
          sectionAnswers.current = 0;
          sectionCorrect.current = 0;
        }
        
        // End test if time is up
        if (prev <= 1) {
          clearInterval(timer);
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isStarted, isPaused, totalTimeInSeconds]);
  
  // Format time as MM:SS
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage
  const progressPercentage = ((totalTimeInSeconds - timeLeft) / totalTimeInSeconds) * 100;
  
  // Handle user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Only process single-digit numbers
    if (/^[0-9]$/.test(value)) {
      const userAnswer = parseInt(value, 10);
      const currentProblem = visibleProblems[position];
      
      // Calculate correct answer (sum of the row)
      const correctAnswer = currentProblem.row.reduce((sum, num) => sum + num, 0);
      
      // Check if the last digit matches
      const isCorrect = userAnswer === correctAnswer % 10;
      
      // Update the current problem
      const updatedProblems = [...visibleProblems];
      updatedProblems[position] = {
        ...currentProblem,
        userAnswer,
        isCorrect,
      };
      
      // Update statistics
      setTotalAnswers(prev => prev + 1);
      if (isCorrect) {
        setCorrectAnswers(prev => prev + 1);
        sectionCorrect.current += 1;
      }
      sectionAnswers.current += 1;
      
      // Move to the next problem and clear input
      setVisibleProblems(updatedProblems);
      e.target.value = '';
      
      // Move to the next position or add a new problem
      if (position < visibleProblems.length - 1) {
        setPosition(position + 1);
      } else {
        // Add a new problem and shift the visible window
        const newProblems = [...updatedProblems];
        newProblems.push({
          row: generateRow(),
          userAnswer: null,
          isCorrect: null,
        });
        
        if (newProblems.length > 12) {
          newProblems.shift(); // Remove the first problem if we have more than 12
        } else {
          setPosition(position + 1);
        }
        
        setVisibleProblems(newProblems);
      }
    }
  };
  
  // Calculate results and finish the test
  const finishTest = () => {
    const finalSectionData = {
      time: totalTimeInSeconds - lastSectionTime.current,
      answers: sectionAnswers.current,
      correct: sectionCorrect.current
    };
    
    // Add the last section data if there's anything to record
    const finalSections = sectionAnswers.current > 0 
      ? [...sections, finalSectionData]
      : sections;
    
    // Calculate metrics (simplified calculations for demo)
    const accuracy = totalAnswers > 0 ? correctAnswers / totalAnswers : 0;
    
    // Speed: normalized to a 1-5 scale
    const answersPerMinute = totalAnswers / (durationInMinutes || 1);
    const speed = Math.min(answersPerMinute / 20, 5); // Assuming 100 answers/min is maximum (5 rating)
    
    // Consistency: standard deviation of performance across sections
    let consistency = 5; // Default high consistency
    if (finalSections.length > 1) {
      const accuracies = finalSections.map(s => s.answers > 0 ? s.correct / s.answers : 0);
      const avgAccuracy = accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length;
      const variance = accuracies.reduce((sum, acc) => sum + Math.pow(acc - avgAccuracy, 2), 0) / accuracies.length;
      const stdDev = Math.sqrt(variance);
      consistency = Math.max(5 - (stdDev * 10), 1); // Convert to 1-5 scale
    }
    
    // Endurance: compare performance in first half vs second half
    let endurance = 3; // Default average endurance
    if (finalSections.length > 1) {
      const midpoint = Math.floor(finalSections.length / 2);
      const firstHalf = finalSections.slice(0, midpoint);
      const secondHalf = finalSections.slice(midpoint);
      
      const firstHalfAccuracy = firstHalf.reduce((sum, s) => sum + (s.answers > 0 ? s.correct / s.answers : 0), 0) / firstHalf.length;
      const secondHalfAccuracy = secondHalf.reduce((sum, s) => sum + (s.answers > 0 ? s.correct / s.answers : 0), 0) / secondHalf.length;
      
      const enduranceRatio = secondHalfAccuracy / (firstHalfAccuracy || 0.01); // Avoid division by zero
      endurance = Math.min(Math.max(enduranceRatio * 3, 1), 5); // Convert to 1-5 scale
    }
    
    // Complete the test with results
    onComplete({
      totalAnswers,
      correctAnswers,
      accuracy,
      speed,
      consistency,
      endurance,
      sections: finalSections,
    });
  };
  
  // Handle pause/resume
  const togglePause = () => {
    setIsPaused(!isPaused);
    if (isPaused && inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Handle exit confirmation
  const handleExitRequest = () => {
    if (isStarted && !isPaused) {
      setIsPaused(true);
    }
    setIsConfirmExitOpen(true);
  };
  
  const confirmExit = () => {
    finishTest();
    setIsConfirmExitOpen(false);
  };
  
  return (
    <div className="relative">
      {/* Instructions Dialog */}
      <Dialog open={isInstructionsOpen} onOpenChange={setIsInstructionsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Instruksi Tes Kraepelin</DialogTitle>
            <DialogDescription>
              Tes ini mengukur kecepatan, ketelitian, konsistensi, dan ketahanan mental Anda.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Cara Mengerjakan:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>Anda akan melihat angka berderet yang harus dijumlahkan.</li>
                <li>Jumlahkan setiap baris angka, lalu masukkan <strong>digit terakhir</strong> dari hasil penjumlahan.</li>
                <li>Contoh: <span className="font-mono">6 + 8 = 14</span>, masukkan <span className="font-mono">4</span>.</li>
                <li>Bekerjalah secepat dan seteliti mungkin. Fokus sangat penting!</li>
              </ol>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
              <h3 className="font-semibold mb-1">Contoh:</h3>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="bg-white dark:bg-gray-700 p-2 rounded text-center font-mono">8</div>
                <div className="bg-white dark:bg-gray-700 p-2 rounded text-center font-mono">7</div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-mono">8 + 7 = 15</span>, masukkan <span className="font-mono">5</span>
              </p>
            </div>
            
            <div className="flex items-center text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
              <AlertTriangle className="w-5 h-5 mr-2" />
              <p className="text-sm">
                Tes akan berjalan selama {durationInMinutes} menit. Jangan tinggalkan halaman selama tes berlangsung.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={startTest} className="w-full">
              Mulai Tes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Exit Confirmation Dialog */}
      <Dialog open={isConfirmExitOpen} onOpenChange={setIsConfirmExitOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Yakin ingin mengakhiri tes?</DialogTitle>
            <DialogDescription>
              Jika Anda mengakhiri tes sekarang, tes akan dihitung berdasarkan jawaban yang sudah diisi.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => {
              setIsConfirmExitOpen(false);
              if (!isPaused) {
                setIsPaused(false);
              }
            }} className="sm:flex-1">
              Lanjutkan Tes
            </Button>
            <Button variant="destructive" onClick={confirmExit} className="sm:flex-1">
              Akhiri Tes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Test UI */}
      {isStarted && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-soft">
          {/* Timer and controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col">
              <div className="text-3xl font-mono font-bold">
                {formatTime(timeLeft)}
              </div>
              <Progress value={progressPercentage} className="w-32 h-2 mt-1" />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                className="p-2 h-auto"
                onClick={togglePause}
              >
                {isPaused ? 
                  <PlayCircle className="w-8 h-8 text-green-600 dark:text-green-500" /> : 
                  <PauseCircle className="w-8 h-8 text-amber-600 dark:text-amber-500" />
                }
              </Button>
              
              <Button 
                variant="ghost" 
                className="p-2 h-auto"
                onClick={handleExitRequest}
              >
                <XCircle className="w-8 h-8 text-red-600 dark:text-red-500" />
              </Button>
            </div>
          </div>
          
          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Jawaban</div>
              <div className="text-2xl font-bold">{totalAnswers}</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Jawaban Benar</div>
              <div className="text-2xl font-bold">
                {correctAnswers} 
                <span className="text-sm font-normal text-gray-500 ml-1">
                  ({totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0}%)
                </span>
              </div>
            </div>
          </div>
          
          {/* Test problems */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Selesaikan penjumlahan berikut:</h3>
            
            <div className="h-[360px] overflow-hidden relative">
              <div className="absolute inset-0 border-t border-b border-gray-200 dark:border-gray-700 pointer-events-none"></div>
              
              <div className="grid grid-cols-1 gap-4 py-4">
                {visibleProblems.map((problem, index) => (
                  <div 
                    key={index}
                    className={`grid grid-cols-3 items-center p-2 rounded-lg transition-colors ${
                      index === position 
                        ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' 
                        : index < position && problem.isCorrect !== null
                          ? problem.isCorrect 
                            ? 'bg-green-50 dark:bg-green-900/10' 
                            : 'bg-red-50 dark:bg-red-900/10'
                          : ''
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {problem.row.map((num, i) => (
                        <div 
                          key={i} 
                          className="bg-white dark:bg-gray-700 w-12 h-12 rounded flex items-center justify-center text-2xl font-mono shadow-sm"
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-center">
                      <ArrowRightCircle className="w-6 h-6 text-gray-400" />
                    </div>
                    
                    <div className="flex justify-end">
                      {index === position ? (
                        <input
                          ref={inputRef}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          autoFocus
                          disabled={isPaused}
                          className="w-12 h-12 rounded bg-white dark:bg-gray-700 border-2 border-blue-300 dark:border-blue-600 text-center text-2xl font-mono shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className={`w-12 h-12 rounded flex items-center justify-center text-2xl font-mono ${
                          problem.userAnswer !== null
                            ? problem.isCorrect
                              ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                              : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                            : 'bg-white dark:bg-gray-700'
                        }`}>
                          {problem.userAnswer !== null ? problem.userAnswer : ''}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {isPaused && (
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
              <div className="text-center">
                <PauseCircle className="w-16 h-16 mx-auto mb-4 text-amber-500" />
                <h3 className="text-2xl font-bold mb-2">Tes Dijeda</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Klik tombol lanjutkan untuk melanjutkan tes
                </p>
                <Button onClick={togglePause}>
                  Lanjutkan Tes
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}