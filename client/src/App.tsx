import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import TryoutList from "@/pages/tryout-list";
import Tryout from "@/pages/tryout";
import Result from "@/pages/result";
import Leaderboard from "@/pages/leaderboard";
import BlogList from "@/pages/blog-list";
import BlogPost from "@/pages/blog-post";
import PersonalityTestList from "@/pages/personality-test-list";
import PersonalityTest from "@/pages/personality-test";
import KraepelinTest from "@/pages/kraepelin-test";
import SharedPersonalityResult from "@/pages/shared-personality-result";
import { UserProvider } from "@/lib/user-context";
import { useEffect, useState } from "react";
import { initDarkMode } from "@/lib/dark-mode";
import { handleRedirectResult } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tryout" component={TryoutList} />
      <Route path="/tryout/:category" component={TryoutList} />
      <Route path="/tryout/:category/:slug" component={Tryout} />
      <Route path="/hasil/:id" component={Result} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/leaderboard/:slug" component={Leaderboard} />
      <Route path="/blog" component={BlogList} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/personality-tests" component={PersonalityTestList} />
      <Route path="/personality-test/:slug" component={PersonalityTest} />
      <Route path="/kraepelin-test/:slug" component={KraepelinTest} />
      <Route path="/shared-result/:testId/:testType" component={SharedPersonalityResult} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isCheckingRedirect, setIsCheckingRedirect] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    initDarkMode();
    
    // Handle redirect result from Google sign-in
    const checkRedirectResult = async () => {
      try {
        const user = await handleRedirectResult();
        if (user) {
          toast({
            title: "Login berhasil",
            description: `Selamat datang, ${user.displayName || 'User'}!`,
          });
        }
      } catch (error) {
        console.error("Error handling redirect result", error);
        toast({
          title: "Login gagal",
          description: "Terjadi kesalahan saat proses login.",
          variant: "destructive",
        });
      } finally {
        setIsCheckingRedirect(false);
      }
    };
    
    checkRedirectResult();
  }, [toast]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router />
        <Toaster />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
