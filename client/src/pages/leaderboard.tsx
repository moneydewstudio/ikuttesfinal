import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { Helmet } from "react-helmet";
import { allTryouts, getTryoutBySlug } from "@/lib/tryout-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function Leaderboard() {
  const [, params] = useRoute("/leaderboard/:slug");
  const [selectedTryoutSlug, setSelectedTryoutSlug] = useState<string | undefined>(
    params?.slug || undefined
  );

  // Get the tryout title if a slug is provided
  const selectedTryout = selectedTryoutSlug 
    ? getTryoutBySlug(selectedTryoutSlug) 
    : undefined;

  const handleTryoutChange = (value: string) => {
    setSelectedTryoutSlug(value === "all" ? undefined : value);
  };

  return (
    <>
      <Helmet>
        <title>
          {selectedTryout 
            ? `Leaderboard ${selectedTryout.title} | Ikuttes` 
            : "Leaderboard | Ikuttes"}
        </title>
        <meta 
          name="description" 
          content={`Lihat ranking teratas peserta tryout ${selectedTryout?.title || "Ikuttes"}.`} 
        />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Lihat ranking teratas peserta tryout dan bandingkan performa kamu dengan peserta lainnya.
            </p>
          </div>
          
          <div className="mb-8">
            <div className="max-w-xs">
              <Label htmlFor="tryout-select" className="block mb-2">
                Pilih Tryout
              </Label>
              <Select 
                value={selectedTryoutSlug || "all"} 
                onValueChange={handleTryoutChange}
              >
                <SelectTrigger id="tryout-select" className="w-full">
                  <SelectValue placeholder="Pilih Tryout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tryout</SelectItem>
                  {allTryouts.map(tryout => (
                    <SelectItem key={tryout.slug} value={tryout.slug}>
                      {tryout.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <LeaderboardTable tryoutSlug={selectedTryoutSlug} limit={20} />
        </div>
      </main>
      
      <Footer />
    </>
  );
}
