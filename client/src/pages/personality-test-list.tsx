import { personalityTests } from "@/lib/personality-test-data";
import { PersonalityTestCard } from "@/components/personality/personality-test-card";
import { ArrowLeft, Brain } from "lucide-react";
import { Link } from "wouter";

export default function PersonalityTestList() {
  return (
    <div className="container py-12 max-w-6xl mx-auto px-4">
      <div className="flex items-center mb-4">
        <Link href="/">
          <button className="mr-4 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Kembali</span>
          </button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tes Kepribadian</h1>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
        Temukan lebih banyak tentang diri Anda melalui tes kepribadian standar dan tervalidasi. 
        Hasil dapat membantu Anda memahami kekuatan dan kelemahan Anda, serta memberikan wawasan 
        tentang cara Anda berinteraksi dengan dunia.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {personalityTests.map((test) => (
          <PersonalityTestCard
            key={test.id}
            id={test.id}
            slug={test.slug}
            title={test.title}
            description={test.description}
            type={test.type}
            timeInMinutes={test.timeInMinutes}
            participants={Math.floor(Math.random() * 1000) + 100} // In a real app, this would come from the database
          />
        ))}
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-12">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300 flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <h2 className="ml-4 text-2xl font-bold text-gray-900 dark:text-white">
            Tentang Tes Kepribadian
          </h2>
        </div>
        
        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <p>
            Tes kepribadian adalah alat psikometri yang dirancang untuk mengukur karakteristik kepribadian. 
            Platform ini menawarkan tiga tes kepribadian terkemuka:
          </p>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-xl">
              <h3 className="font-semibold text-lg mb-2 text-purple-600 dark:text-purple-400">Myers-Briggs Type Indicator (MBTI)</h3>
              <p className="text-sm">
                Mengklasifikasikan individu ke dalam 16 tipe kepribadian berdasarkan preferensi psikologis 
                mereka dalam bagaimana mereka mempersepsikan dunia dan membuat keputusan.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-4 rounded-xl">
              <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">Big Five (OCEAN)</h3>
              <p className="text-sm">
                Mengukur lima dimensi utama kepribadian: Keterbukaan, Kesadaran, Extraversion, 
                Keramahan, dan Neurotisisme. Model ini didukung oleh penelitian ilmiah yang luas.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-4 rounded-xl">
              <h3 className="font-semibold text-lg mb-2 text-teal-600 dark:text-teal-400">HEXACO</h3>
              <p className="text-sm">
                Memperluas model Big Five dengan menambahkan dimensi keenam: Kejujuran-Kerendahan hati. 
                Model ini memberikan gambaran yang lebih komprehensif tentang kepribadian manusia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}