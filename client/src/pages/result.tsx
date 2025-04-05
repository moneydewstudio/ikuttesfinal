import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Helmet } from "react-helmet";
import { Loader2, AlertCircle, Share2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTryoutBySlug, Question } from "@/lib/tryout-data";

type ResultData = {
  userId: string;
  userName: string;
  userInitials: string;
  tryoutId: string;
  tryoutSlug: string;
  tryoutTitle: string;
  score: {
    correct: number;
    total: number;
    percentage: number;
    TWK?: number;
    TIU?: number;
    TKP?: number;
    totalScore: number;
  };
  answers: Record<string, string>;
  timestamp: number;
};

export default function Result() {
  const [, params] = useRoute("/hasil/:id");
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<ResultData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tryoutQuestions, setTryoutQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchResult = async () => {
      if (!params?.id) {
        setError("ID hasil tidak ditemukan");
        setLoading(false);
        return;
      }

      try {
        const resultRef = doc(db, "results", params.id);
        const resultSnap = await getDoc(resultRef);

        if (resultSnap.exists()) {
          const resultData = resultSnap.data() as ResultData;
          setResult(resultData);
          
          // Get tryout details
          const tryout = getTryoutBySlug(resultData.tryoutSlug);
          if (tryout) {
            setTryoutQuestions(tryout.questions);
          }
        } else {
          setError("Hasil tidak ditemukan");
        }
      } catch (err) {
        console.error("Error fetching result:", err);
        setError("Terjadi kesalahan saat mengambil data hasil");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [params]);

  const handleShare = () => {
    if (result) {
      if (navigator.share) {
        navigator.share({
          title: `Hasil Tryout ${result.tryoutTitle}`,
          text: `Saya menyelesaikan tryout ${result.tryoutTitle} dengan skor ${result.score.percentage}%. Coba juga yuk!`,
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support the Web Share API
        navigator.clipboard.writeText(
          `Saya menyelesaikan tryout ${result.tryoutTitle} dengan skor ${result.score.percentage}%. Coba juga di ${window.location.origin}/tryout/${result.tryoutSlug}`
        );
        alert('Link hasil telah disalin ke clipboard!');
      }
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-16">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-soft max-w-md mx-auto">
              <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-4">Memuat Hasil</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Mohon tunggu sebentar...
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !result) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-16">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-soft max-w-md mx-auto">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-4">Hasil Tidak Ditemukan</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {error || "Maaf, kami tidak dapat menemukan hasil yang Anda cari."}
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

  return (
    <>
      <Helmet>
        <title>Hasil Tryout | EdukasiBersama</title>
        <meta 
          name="description" 
          content={`Hasil tryout ${result.tryoutTitle} dengan skor ${result.score.percentage}%.`} 
        />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button 
              variant="outline"
              className="mb-4"
              onClick={() => navigate("/tryout")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Daftar Tryout
            </Button>
            
            <h1 className="text-2xl font-bold">Hasil Tryout</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {result.tryoutTitle}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <div className="mb-4">
                  <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                      {result.score.percentage}%
                    </span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Hasil Tryout Anda</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Anda telah menyelesaikan {result.score.total} soal.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {new Date(result.timestamp).toLocaleString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl">
                  <div className="font-bold text-green-600 dark:text-green-400 text-lg">
                    {result.score.correct}
                  </div>
                  <div className="text-green-600 dark:text-green-400 text-sm">
                    Jawaban Benar
                  </div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl">
                  <div className="font-bold text-red-600 dark:text-red-400 text-lg">
                    {result.score.total - result.score.correct}
                  </div>
                  <div className="text-red-600 dark:text-red-400 text-sm">
                    Jawaban Salah
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                  <div className="font-bold text-gray-600 dark:text-gray-400 text-lg">
                    {Object.values(result.answers).filter(a => !a).length}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    Tidak Dijawab
                  </div>
                </div>
              </div>

              {result.score.TWK !== undefined && (
                <div className="mb-8">
                  <h3 className="font-bold mb-4">Skor Per Kategori</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">TWK</span>
                        <span className="text-sm font-medium">{result.score.TWK}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${(result.score.TWK / 100) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">TIU</span>
                        <span className="text-sm font-medium">{result.score.TIU}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-secondary-600 h-2 rounded-full" 
                          style={{ width: `${(result.score.TIU / 100) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">TKP</span>
                        <span className="text-sm font-medium">{result.score.TKP}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-accent-600 h-2 rounded-full" 
                          style={{ width: `${(result.score.TKP / 150) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Nilai</span>
                      <span className="font-bold text-xl">{result.score.totalScore}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <Button 
                  className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                  <span>Bagikan Hasil</span>
                </Button>
              </div>
            </div>
            
            {tryoutQuestions.length > 0 && (
              <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-6">Review Jawaban</h3>
                
                <div className="space-y-8">
                  {tryoutQuestions.map((question, index) => (
                    <div key={question.id} className="pb-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0">
                      <div className="flex items-start mb-4">
                        <span className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
                          {index + 1}
                        </span>
                        <h4 className="font-medium">{question.text}</h4>
                      </div>
                      
                      <div className="space-y-2 ml-8">
                        {question.options.map(option => {
                          const isUserAnswer = result.answers[question.id] === option.id;
                          const isCorrectAnswer = question.correctAnswerId === option.id;
                          
                          let bgClass = "";
                          if (isUserAnswer && isCorrectAnswer) {
                            bgClass = "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700";
                          } else if (isUserAnswer && !isCorrectAnswer) {
                            bgClass = "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700";
                          } else if (isCorrectAnswer) {
                            bgClass = "bg-green-50/50 dark:bg-green-900/10 border-green-200/50 dark:border-green-700/50";
                          }
                          
                          return (
                            <div 
                              key={option.id} 
                              className={`p-3 border rounded-xl ${bgClass || "border-gray-200 dark:border-gray-700"}`}
                            >
                              {option.text}
                              {isUserAnswer && isCorrectAnswer && (
                                <span className="ml-2 text-green-600 dark:text-green-400 text-sm">✓ Jawaban Anda benar</span>
                              )}
                              {isUserAnswer && !isCorrectAnswer && (
                                <span className="ml-2 text-red-600 dark:text-red-400 text-sm">✗ Jawaban Anda salah</span>
                              )}
                              {!isUserAnswer && isCorrectAnswer && (
                                <span className="ml-2 text-green-600 dark:text-green-400 text-sm">✓ Jawaban benar</span>
                              )}
                            </div>
                          );
                        })}
                        
                        {!result.answers[question.id] && (
                          <div className="p-3 border border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                            <span className="text-orange-600 dark:text-orange-400 text-sm">Tidak dijawab</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
