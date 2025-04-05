import { useState } from "react";
import { X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { loginWithGoogle } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      // With redirect flow, user will be redirected to Google login page
      // and then back to the app, so we don't show success toast here
      await loginWithGoogle();
      // NOTE: The success toast will be shown in App.tsx after redirect
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        title: "Login gagal",
        description: "Terjadi kesalahan saat login dengan Google.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For MVP, we only implement Google login
    toast({
      title: "Fitur dalam pengembangan",
      description: "Untuk saat ini, silakan login dengan Google.",
      variant: "default",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
          onClick={onClose}
        ></div>
        
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full mx-auto shadow-soft">
          <Button 
            variant="ghost"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" 
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
          
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-2">
                <span className="bg-primary-600 text-white p-1.5 rounded-lg">
                  <BookOpen className="w-6 h-6" />
                </span>
              </div>
              <h3 className="text-xl font-bold">Masuk ke EdukasiBersama</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Akses berbagai tryout dan pantau progressmu
              </p>
            </div>
            
            <Button 
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white mb-4"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              <span>{isLoading ? "Memproses..." : "Masuk dengan Google"}</span>
            </Button>
            
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
              <span className="flex-shrink mx-4 text-gray-600 dark:text-gray-400 text-sm">
                atau masuk dengan email
              </span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-4">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </Label>
                <Input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div className="mb-4">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </Label>
                <Input 
                  type="password" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label 
                    htmlFor="remember" 
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    Ingat saya
                  </Label>
                </div>
                <a href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                  Lupa password?
                </a>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>
            </form>
            
            <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-6">
              Belum punya akun? <a href="/register" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">Daftar</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
