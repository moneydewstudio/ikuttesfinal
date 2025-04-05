import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

type LeaderboardEntry = {
  id: string;
  userId: string;
  userName: string;
  userInitials: string;
  tryoutId: string;
  tryoutTitle: string;
  score: {
    TWK?: number;
    TIU?: number;
    TKP?: number;
    total: number;
  };
  timestamp: number;
};

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: "lb-1",
    userId: "user-1",
    userName: "Raden Surya",
    userInitials: "RS",
    tryoutId: "cpns-1",
    tryoutTitle: "CPNS: Simulasi CAT SKD Lengkap 2023",
    score: {
      TWK: 95,
      TIU: 85,
      TKP: 160,
      total: 340
    },
    timestamp: Date.now()
  },
  {
    id: "lb-2",
    userId: "user-2",
    userName: "Ahmad Maulana",
    userInitials: "AM",
    tryoutId: "cpns-1",
    tryoutTitle: "CPNS: Simulasi CAT SKD Lengkap 2023",
    score: {
      TWK: 90,
      TIU: 85,
      TKP: 158,
      total: 333
    },
    timestamp: Date.now() - 3600000
  },
  {
    id: "lb-3",
    userId: "user-3",
    userName: "Siti Pratiwi",
    userInitials: "SP",
    tryoutId: "cpns-1",
    tryoutTitle: "CPNS: Simulasi CAT SKD Lengkap 2023",
    score: {
      TWK: 85,
      TIU: 90,
      TKP: 155,
      total: 330
    },
    timestamp: Date.now() - 7200000
  },
  {
    id: "lb-4",
    userId: "user-4",
    userName: "Budi Prakoso",
    userInitials: "BP",
    tryoutId: "cpns-1",
    tryoutTitle: "CPNS: Simulasi CAT SKD Lengkap 2023",
    score: {
      TWK: 90,
      TIU: 80,
      TKP: 150,
      total: 320
    },
    timestamp: Date.now() - 10800000
  },
  {
    id: "lb-5",
    userId: "user-5",
    userName: "Dewi Sartika",
    userInitials: "DS",
    tryoutId: "cpns-1",
    tryoutTitle: "CPNS: Simulasi CAT SKD Lengkap 2023",
    score: {
      TWK: 85,
      TIU: 85,
      TKP: 149,
      total: 319
    },
    timestamp: Date.now() - 14400000
  }
];

export function LeaderboardPreview() {
  const { data: leaderboardData, isLoading } = useQuery({
    queryKey: ['/api/leaderboard'],
    queryFn: async () => {
      try {
        // Attempt to fetch data from Firestore
        const leaderboardRef = collection(db, "leaderboard");
        const q = query(
          leaderboardRef,
          orderBy("score.total", "desc"),
          limit(5)
        );
        
        const querySnapshot = await getDocs(q);
        const data: LeaderboardEntry[] = [];
        
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as LeaderboardEntry);
        });
        
        return data.length > 0 ? data : MOCK_LEADERBOARD;
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        // Return mock data if Firestore fails
        return MOCK_LEADERBOARD;
      }
    }
  });

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ranking Teratas</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Lihat ranking teratas peserta tryout dan bandingkan performa kamu dengan peserta lainnya.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft overflow-hidden">
          <div className="p-4 bg-gray-50 dark:bg-gray-850 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">CPNS: Simulasi CAT SKD Lengkap 2023</h3>
              <Link href="/leaderboard/cpns-simulasi-cat-skd">
                <a className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium flex items-center">
                  <span>Lihat Selengkapnya</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </Link>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-850">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">TWK</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">TIU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">TKP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  leaderboardData?.map((entry, index) => (
                    <tr 
                      key={entry.id} 
                      className={index === 0 ? "bg-yellow-50 dark:bg-yellow-900/20" : ""}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center justify-center w-6 h-6 ${
                          index === 0 
                            ? "bg-yellow-500 text-white" 
                            : "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                        } rounded-full text-xs`}>
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                            <span className="text-primary-700 dark:text-primary-300 font-medium">
                              {entry.userInitials}
                            </span>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium">{entry.userName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                          {entry.score.TWK}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                          {entry.score.TIU}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                          {entry.score.TKP}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                        {entry.score.total}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
