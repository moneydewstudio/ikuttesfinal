import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { 
  getPersonalityTestBySlug, 
  calculateMBTIType,
  calculateDISCType,
  interpretScores,
  PersonalityQuestion,
  PersonalityResult
} from "@/lib/personality-test-data";
import { PersonalityQuestionCard } from "@/components/personality/personality-question";
import { PersonalityResultCard } from "@/components/personality/personality-result-card";
import { useUser } from "@/lib/user-context";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function PersonalityTest() {
  // Get the test slug from the URL
  const [_, params] = useRoute('/personality-test/:slug');
  const [, navigate] = useLocation();
  const slug = params?.slug;
  
  const { user, loading: userLoading } = useUser();
  const { toast } = useToast();
  
  // Get the test data
  const test = slug ? getPersonalityTestBySlug(slug) : null;
  
  // State for the test
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState('');
  const [testCompleted, setTestCompleted] = useState(false);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [testResult, setTestResult] = useState<PersonalityResult | null>(null);
  
  // Handle missing test
  if (!test) {
    return (
      <div className="container max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Tes Tidak Ditemukan
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Maaf, tes kepribadian yang Anda cari tidak tersedia. Silakan kembali ke daftar tes.
        </p>
        <Link href="/personality-tests">
          <Button>
            Kembali ke Daftar Tes
          </Button>
        </Link>
      </div>
    );
  }
  
  // Initialize the timer when the component mounts
  useEffect(() => {
    if (!testCompleted && !endTime) {
      const end = new Date();
      end.setMinutes(end.getMinutes() + test.timeInMinutes);
      setEndTime(end);
    }
    
    // Clean up timer on unmount
    return () => {};
  }, [test, testCompleted]);
  
  // Update the timer every second
  useEffect(() => {
    if (!endTime || testCompleted) return;
    
    const timer = setInterval(() => {
      const now = new Date();
      const diff = endTime.getTime() - now.getTime();
      
      if (diff <= 0) {
        clearInterval(timer);
        handleTestCompletion();
        return;
      }
      
      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [endTime, testCompleted]);
  
  // Handle selecting an answer for the current question
  const handleSelectAnswer = (answerId: string) => {
    if (testCompleted) return;
    
    const questionId = test.questions[currentQuestionIndex].id;
    setUserAnswers({
      ...userAnswers,
      [questionId]: answerId,
    });
  };
  
  // Move to the previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Move to the next question or complete the test
  const handleNextQuestion = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleTestCompletion();
    }
  };
  
  // Calculate test results
  const handleTestCompletion = () => {
    // Calculate the scores for each factor
    const factorScores: Record<string, { total: number, count: number, score: number }> = {};
    
    // Initialize factor scores
    Object.keys(test.factors).forEach(factor => {
      factorScores[factor] = { total: 0, count: 0, score: 0 };
    });
    
    // Calculate the raw scores
    test.questions.forEach((question: PersonalityQuestion) => {
      const answerId = userAnswers[question.id];
      if (!answerId) return;
      
      const option = question.options.find(opt => opt.id === answerId);
      if (!option) return;
      
      const factor = question.factor;
      let value = option.value;
      
      // Reverse scoring if needed
      if (question.reversedScoring) {
        value = 6 - value; // Reverse on a 1-5 scale
      }
      
      if (factorScores[factor]) {
        factorScores[factor].total += value;
        factorScores[factor].count += 1;
      }
    });
    
    // Calculate the average scores
    const finalScores: Record<string, number> = {};
    Object.keys(factorScores).forEach(factor => {
      const { total, count } = factorScores[factor];
      const average = count > 0 ? total / count : 0;
      finalScores[factor] = Number(average.toFixed(2));
    });
    
    // Calculate main type if applicable
    let mainType: string | undefined = undefined;
    if (test.type === 'MBTI') {
      mainType = calculateMBTIType(finalScores);
    } else if (test.type === 'DISC') {
      mainType = calculateDISCType(finalScores);
    }
    
    // Create the result object
    const result: PersonalityResult = {
      testId: test.id,
      testType: test.type,
      scores: finalScores,
      ...(mainType && { mainType }),
      timestamp: Date.now(),
    };
    
    setTestResult(result);
    setTestCompleted(true);
  };
  
  // Save the result to the user's profile
  const handleSaveToProfile = () => {
    if (!user) {
      toast({
        title: "Login Diperlukan",
        description: "Silakan login untuk menyimpan hasil ke profil Anda.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would send this to your backend to save
    toast({
      title: "Hasil Disimpan",
      description: "Hasil tes kepribadian telah disimpan ke profil Anda.",
    });
    
    // Redirect to user profile
    // navigate('/profile');
  };
  
  // Render the test or results
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {!testCompleted ? (
        <>
          {/* Test header */}
          <div className="flex items-center mb-6">
            <Link href="/personality-tests">
              <button className="mr-4 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span>Kembali</span>
              </button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{test.title}</h1>
          </div>
          
          {/* Current question */}
          <PersonalityQuestionCard
            question={test.questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={test.questions.length}
            timeRemaining={timeRemaining}
            selectedAnswer={userAnswers[test.questions[currentQuestionIndex].id] || null}
            onSelectAnswer={handleSelectAnswer}
            onPrevQuestion={handlePrevQuestion}
            onNextQuestion={handleNextQuestion}
          />
          
          {/* Question navigation */}
          <div className="grid grid-cols-5 gap-2 mt-4">
            {test.questions.map((_, index) => (
              <button
                key={index}
                className={`p-2 rounded ${
                  index === currentQuestionIndex
                    ? 'bg-primary-600 text-white'
                    : userAnswers[test.questions[index].id]
                    ? 'bg-gray-200 dark:bg-gray-700'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Test results */}
          <div className="flex items-center mb-6">
            <Link href="/personality-tests">
              <button className="mr-4 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span>Kembali ke Daftar Tes</span>
              </button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hasil Tes</h1>
          </div>
          
          {/* Display test results */}
          {testResult && (
            <PersonalityResultCard
              result={testResult}
              test={test}
              onSaveToProfile={handleSaveToProfile}
            />
          )}
          
          {/* Related tests */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Tes Lainnya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Show other personality tests that the user hasn't taken */}
              {slug !== 'mbti-test' && (
                <Link href="/personality-test/mbti-test">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-soft hover:shadow-medium cursor-pointer transition-shadow">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Myers-Briggs Type Indicator (MBTI)</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Temukan tipe kepribadian MBTI Anda dari 16 kemungkinan tipe.</p>
                  </div>
                </Link>
              )}
              
              {slug !== 'big-five-test' && (
                <Link href="/personality-test/big-five-test">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-soft hover:shadow-medium cursor-pointer transition-shadow">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Big Five Personality Test</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Ukur lima dimensi utama kepribadian Anda.</p>
                  </div>
                </Link>
              )}
              
              {slug !== 'hexaco-test' && (
                <Link href="/personality-test/hexaco-test">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-soft hover:shadow-medium cursor-pointer transition-shadow">
                    <h3 className="font-semibold text-gray-900 dark:text-white">HEXACO Personality Inventory</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Jelajahi enam dimensi kepribadian Anda, termasuk Kejujuran-Kerendahan hati.</p>
                  </div>
                </Link>
              )}
              
              {slug !== 'disc-test' && (
                <Link href="/personality-test/disc-test">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-soft hover:shadow-medium cursor-pointer transition-shadow">
                    <h3 className="font-semibold text-gray-900 dark:text-white">DISC Personality Assessment</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Kenali gaya perilaku dan komunikasi Anda melalui empat dimensi DISC.</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}