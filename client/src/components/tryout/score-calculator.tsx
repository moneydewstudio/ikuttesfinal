import { useMemo } from "react";
import { Question } from "@/lib/tryout-data";
import { Link } from "wouter";
import { Share2, RotateCcw, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";

type ScoreCalculatorProps = {
  questions: Question[];
  userAnswers: Record<string, string>;
  category: string;
  tryoutId: string;
  tryoutSlug: string;
};

export function ScoreCalculator({ 
  questions, 
  userAnswers, 
  category, 
  tryoutId,
  tryoutSlug
}: ScoreCalculatorProps) {
  const scores = useMemo(() => {
    // Calculate core scores
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach(question => {
      const userAnswer = userAnswers[question.id];
      if (!userAnswer) {
        unanswered++;
      } else if (userAnswer === question.correctAnswerId) {
        correct++;
      } else {
        incorrect++;
      }
    });

    // Calculate category-specific scores
    let TWK = 0;
    let TIU = 0;
    let TKP = 0;
    
    // For CPNS we'll assign mock values for these categories
    if (category === "CPNS") {
      // In a real app, questions would be tagged by their specific category
      const totalCorrect = (correct / questions.length) * 100;
      TWK = Math.floor(totalCorrect * 0.3);
      TIU = Math.floor(totalCorrect * 0.35);
      TKP = Math.floor(totalCorrect * 0.35);
    }

    const score = Math.round((correct / questions.length) * 100);
    const totalScore = category === "CPNS" ? TWK + TIU + TKP : score;

    return {
      correct,
      incorrect,
      unanswered,
      score,
      TWK,
      TIU,
      TKP,
      totalScore
    };
  }, [questions, userAnswers, category]);

  const handleShare = () => {
    // Implement sharing logic
    if (navigator.share) {
      navigator.share({
        title: 'Hasil Tryout EdukasiBersama',
        text: `Saya berhasil menyelesaikan tryout ${category} dengan skor ${scores.score}%. Coba juga yuk!`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(
        `Saya berhasil menyelesaikan tryout ${category} dengan skor ${scores.score}%. Coba juga di ${window.location.origin}/tryout/${category.toLowerCase()}/${tryoutSlug}`
      );
      alert('Link hasil telah disalin ke clipboard!');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-8">
        <div className="mb-4">
          <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto">
            <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
              {scores.score}%
            </span>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Hasil Tryout Anda</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Anda telah menyelesaikan {questions.length} soal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl">
          <div className="font-bold text-green-600 dark:text-green-400 text-lg">
            {scores.correct}
          </div>
          <div className="text-green-600 dark:text-green-400 text-sm">
            Jawaban Benar
          </div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl">
          <div className="font-bold text-red-600 dark:text-red-400 text-lg">
            {scores.incorrect}
          </div>
          <div className="text-red-600 dark:text-red-400 text-sm">
            Jawaban Salah
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
          <div className="font-bold text-gray-600 dark:text-gray-400 text-lg">
            {scores.unanswered}
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            Tidak Dijawab
          </div>
        </div>
      </div>

      {category === "CPNS" && (
        <div className="mb-8">
          <h3 className="font-bold mb-4">Skor Per Kategori</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">TWK</span>
                <span className="text-sm font-medium">{scores.TWK}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full" 
                  style={{ width: `${(scores.TWK / 100) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">TIU</span>
                <span className="text-sm font-medium">{scores.TIU}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-secondary-600 h-2 rounded-full" 
                  style={{ width: `${(scores.TIU / 100) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">TKP</span>
                <span className="text-sm font-medium">{scores.TKP}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-accent-600 h-2 rounded-full" 
                  style={{ width: `${(scores.TKP / 150) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Nilai</span>
              <span className="font-bold text-xl">{scores.totalScore}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <Link href={`/tryout/${category.toLowerCase()}/${tryoutSlug}`}>
          <Button 
            variant="outline"
            className="w-full flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Coba Lagi</span>
          </Button>
        </Link>
        <Link href={`/review/${tryoutId}`}>
          <Button 
            variant="outline"
            className="w-full flex items-center justify-center space-x-2"
          >
            <ListChecks className="w-4 h-4" />
            <span>Review Jawaban</span>
          </Button>
        </Link>
        <Button 
          className="w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4" />
          <span>Bagikan Hasil</span>
        </Button>
      </div>
    </div>
  );
}
