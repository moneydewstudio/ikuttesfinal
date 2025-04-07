import { useState } from 'react';
import { useRoute, Link } from 'wouter';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPersonalityTestBySlug } from '@/lib/personality-test-data';
import { AuthenticKraepelinTest, KraepelinResults } from '@/components/personality/authentic-kraepelin-test';
import { KraepelinResultCard } from '@/components/personality/kraepelin-result-card';
import { useUser } from '@/lib/user-context';
import { useToast } from '@/hooks/use-toast';

export default function KraepelinTestPage() {
  // Get the test slug from the URL
  const [_, params] = useRoute('/kraepelin-test/:slug');
  const slug = params?.slug;
  
  const { user } = useUser();
  const { toast } = useToast();
  
  // Get the test data
  const test = slug ? getPersonalityTestBySlug(slug) : null;
  
  // State for the test
  const [testCompleted, setTestCompleted] = useState(false);
  const [testResults, setTestResults] = useState<KraepelinResults | null>(null);
  
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
          Maaf, tes Kraepelin yang Anda cari tidak tersedia. Silakan kembali ke daftar tes.
        </p>
        <Link href="/personality-tests">
          <Button>
            Kembali ke Daftar Tes
          </Button>
        </Link>
      </div>
    );
  }
  
  // Handle test completion
  const handleComplete = (results: KraepelinResults) => {
    setTestResults(results);
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
      description: "Hasil tes Kraepelin telah disimpan ke profil Anda.",
    });
  };
  
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
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
      
      {!testCompleted ? (
        // Show the test
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-soft p-6">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {test.description}
          </p>
          
          <AuthenticKraepelinTest 
            durationInMinutes={test.timeInMinutes} 
            onComplete={handleComplete} 
          />
        </div>
      ) : (
        // Show the results
        <>
          {testResults && (
            <KraepelinResultCard 
              results={testResults}
              test={test}
              onSaveToProfile={handleSaveToProfile}
            />
          )}
          
          <div className="flex justify-center gap-4 mt-6">
            <Button 
              variant="outline"
              onClick={() => {
                setTestCompleted(false);
                setTestResults(null);
              }}
            >
              Coba Lagi
            </Button>
            
            <Link href="/personality-tests">
              <Button>
                Kembali ke Daftar Tes
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}