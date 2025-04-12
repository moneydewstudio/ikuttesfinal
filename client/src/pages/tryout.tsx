import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { QuestionCard } from "@/components/tryout/question-card";
import { TryoutTimer } from "@/components/tryout/tryout-timer";
import { ScoreCalculator } from "@/components/tryout/score-calculator";
import { getTryoutBySlug, Question } from "@/lib/tryout-data";
import { Helmet } from "react-helmet";
import { useUser } from "@/lib/user-context";
import { AuthModal } from "@/components/auth/auth-modal";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Tryout() {
  const [, params] = useRoute("/tryout/:category/:slug");
  const [, navigate] = useLocation();
  const { user } = useUser();
  const { toast } = useToast();

  const tryout = params ? getTryoutBySlug(params.slug) : null;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Initialize empty answers
    if (tryout) {
      const initialAnswers: Record<string, string> = {};
      tryout.questions.forEach(question => {
        initialAnswers[question.id] = "";
      });
      setUserAnswers(initialAnswers);
    }
  }, [tryout]);

  if (!tryout) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-16">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-soft max-w-md mx-auto">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-4">Tryout Tidak Ditemukan</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Maaf, tryout yang Anda cari tidak tersedia. Silakan periksa URL atau kembali ke halaman tryout.
              </p>
              <Button 
                onClick={() => navigate("/tryout")}
                className="bg-primary-600 hover:bg-primary-700 text-white"
              >
                Kembali ke Daftar Tryout
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleSelectAnswer = (answerId: string) => {
    const currentQuestion = tryout.questions[currentQuestionIndex];
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerId
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < tryout.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Ask for confirmation before finishing
      if (window.confirm("Apakah Anda yakin ingin menyelesaikan tryout ini?")) {
        handleFinishTryout();
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    toast({
      title: "Waktu Habis!",
      description: "Waktu pengerjaan tryout telah habis.",
      variant: "destructive",
    });
    handleFinishTryout();
  };

  const handleFinishTryout = async () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate the score
      let correctCount = 0;
      tryout.questions.forEach(question => {
        if (userAnswers[question.id] === question.correctAnswerId) {
          correctCount++;
        }
      });

      const score = Math.round((correctCount / tryout.questions.length) * 100);
      
      // Prepare category-specific scores
      let TWK, TIU, TKP, totalScore;
      
      if (tryout.category === "CPNS") {
        // Mock distribution for CPNS scores
        TWK = Math.floor(score * 0.3);
        TIU = Math.floor(score * 0.35);
        TKP = Math.floor(score * 0.35);
        totalScore = TWK + TIU + TKP;
      } else {
        totalScore = score;
      }

      // Save to Firestore
      const resultId = `result_${Date.now()}`;
      const resultRef = doc(db, "results", resultId);
      
      await setDoc(resultRef, {
        userId: user.uid,
        userName: user.displayName || "Anonymous User",
        userInitials: user.displayName 
          ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase() 
          : "AU",
        tryoutId: tryout.id,
        tryoutSlug: tryout.slug,
        tryoutTitle: tryout.title,
        score: {
          correct: correctCount,
          total: tryout.questions.length,
          percentage: score,
          ...(tryout.category === "CPNS" ? { TWK, TIU, TKP } : {}),
          totalScore
        },
        answers: userAnswers,
        timestamp: Date.now()
      });

      // Update the leaderboard
      const leaderboardRef = doc(db, "leaderboard", `${user.uid}_${tryout.id}`);
      await setDoc(leaderboardRef, {
        userId: user.uid,
        userName: user.displayName || "Anonymous User",
        userInitials: user.displayName 
          ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase() 
          : "AU",
        tryoutId: tryout.id,
        tryoutTitle: tryout.title,
        score: {
          ...(tryout.category === "CPNS" ? { TWK, TIU, TKP } : {}),
          total: totalScore
        },
        timestamp: Date.now()
      });

      // Show completion UI
      setIsCompleted(true);
    } catch (error) {
      console.error("Error saving result:", error);
      toast({
        title: "Terjadi kesalahan",
        description: "Gagal menyimpan hasil tryout. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimeRemaining = (timeInMinutes: number): string => {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    return `${hours > 0 ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:00`;
  };

  const currentQuestion: Question = tryout.questions[currentQuestionIndex];

  return (
    <>
      <Helmet>
        <title>{tryout.title} | Ikuttes</title>
        <meta 
          name="description" 
          content={`Ikuti tryout ${tryout.title} untuk persiapan ${tryout.category} dengan soal-soal terbaru.`} 
        />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold">{tryout.title}</h1>
                <div className="flex items-center mt-2">
                  <span className="px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 text-xs font-medium rounded-full">
                    {tryout.category}
                  </span>
                  <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                    {tryout.questions.length} soal • {tryout.timeInMinutes} menit
                  </span>
                </div>
              </div>
              
              {!isCompleted && (
                <TryoutTimer 
                  durationInMinutes={tryout.timeInMinutes} 
                  onTimeUp={handleTimeUp} 
                />
              )}
            </div>
          </div>
          
          {!isCompleted ? (
            <div className="max-w-3xl mx-auto">
              <QuestionCard 
                question={currentQuestion}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={tryout.questions.length}
                timeRemaining={formatTimeRemaining(tryout.timeInMinutes)}
                selectedAnswer={userAnswers[currentQuestion.id]}
                onSelectAnswer={handleSelectAnswer}
                onPrevQuestion={handlePrevQuestion}
                onNextQuestion={handleNextQuestion}
              />
              
              <div className="mt-6 flex justify-center">
                <Button 
                  onClick={handleFinishTryout}
                  className="bg-primary-600 hover:bg-primary-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Menyimpan..." : "Selesaikan Tryout"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <ScoreCalculator 
                questions={tryout.questions} 
                userAnswers={userAnswers}
                category={tryout.category}
                tryoutId={tryout.id}
                tryoutSlug={tryout.slug}
              />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </>
  );
}
