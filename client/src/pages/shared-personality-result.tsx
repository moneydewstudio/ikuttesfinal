import { useRoute } from "wouter";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, AlertTriangle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PersonalityResultCard } from "@/components/personality/personality-result-card";
import { personalityTests, PersonalityResult, PersonalityTest } from "@/lib/personality-test-data";

export default function SharedPersonalityResult() {
  // Get the result ID and test type from the URL
  const [_, params] = useRoute('/shared-result/:testId/:testType');
  const testId = params?.testId;
  const testType = params?.testType;
  
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState<PersonalityTest | null>(null);
  const [result, setResult] = useState<PersonalityResult | null>(null);
  const [error, setError] = useState('');
  
  // Fetch the result data
  useEffect(() => {
    // In a real app, you would fetch this from your backend
    if (!testId || !testType) {
      setError('ID hasil tidak valid');
      setLoading(false);
      return;
    }
    
    setTimeout(() => {
      // Find the test
      const foundTest = personalityTests.find(t => 
        t.id === testId || 
        t.type.toLowerCase() === testType.toLowerCase()
      );
      
      if (!foundTest) {
        setError('Hasil tes tidak ditemukan');
        setLoading(false);
        return;
      }
      
      // Create a mock result for demo purposes
      // In a real app, this would come from your backend
      const mockResult: PersonalityResult = {
        testId: foundTest.id,
        testType: foundTest.type,
        scores: {
          ...(foundTest.type === 'MBTI' ? {
            'EI': 2.1,
            'SN': 3.8,
            'TF': 4.2,
            'JP': 2.7
          } : foundTest.type === 'BIG_FIVE' ? {
            'O': 4.3,
            'C': 3.5,
            'E': 2.8,
            'A': 3.9,
            'N': 2.2
          } : foundTest.type === 'DISC' ? {
            'D': 3.8,
            'I': 4.2,
            'S': 2.5,
            'C': 3.1
          } : {
            'H': 3.6,
            'E': 2.9,
            'X': 3.2,
            'A': 4.1,
            'C': 3.7,
            'O': 4.5
          })
        },
        mainType: foundTest.type === 'MBTI' ? 'INFJ' : 
                 foundTest.type === 'DISC' ? 'DI' : undefined,
        timestamp: Date.now() - 86400000, // 1 day ago
      };
      
      setTest(foundTest);
      setResult(mockResult);
      setLoading(false);
    }, 1000);
  }, [testId, testType]);
  
  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
          <div className="w-full max-w-md h-60 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (error || !test || !result) {
    return (
      <div className="container max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Hasil Tidak Ditemukan
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {error || 'Maaf, hasil tes kepribadian tidak tersedia atau telah dihapus.'}
        </p>
        <Link href="/personality-tests">
          <Button>
            Lihat Tes Kepribadian
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/personality-tests">
          <button className="mr-4 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Kembali ke Daftar Tes</span>
          </button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hasil Tes Dibagikan</h1>
      </div>
      
      <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg mb-6 flex items-center">
        <Share2 className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
        <p className="text-primary-600 dark:text-primary-400 text-sm">
          Ini adalah hasil tes kepribadian yang telah dibagikan dengan Anda. 
          Anda juga dapat mengambil tes yang sama untuk membandingkan hasilnya.
        </p>
      </div>
      
      <PersonalityResultCard
        result={result}
        test={test}
        isShared={true}
      />
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Ingin Mencoba Sendiri?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Ambil tes yang sama untuk menemukan kepribadian Anda dan bandingkan hasilnya.
        </p>
        <Link href={`/personality-test/${test.slug}`}>
          <Button className="w-full md:w-auto">
            Mulai Tes {test.title}
          </Button>
        </Link>
      </div>
    </div>
  );
}