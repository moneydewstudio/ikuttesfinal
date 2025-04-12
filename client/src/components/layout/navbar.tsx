import { useState } from "react";
import { Link } from "wouter";
import { Menu, BookOpen, LogIn, User, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/auth-modal";
import { useUser } from "@/lib/user-context";
import { logout } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logout berhasil",
        description: "Anda telah keluar dari akun.",
      });
    } catch (error) {
      toast({
        title: "Logout gagal",
        description: "Terjadi kesalahan saat logout.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="bg-primary text-white p-1.5 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </span>
            <span className="text-xl font-bold text-primary-700 dark:text-primary-400">Ikuttes</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/tryout" className="font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
            Tryout
          </Link>
          <Link href="/blog" className="font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
            Blog
          </Link>
          <Link href="/leaderboard" className="font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
            Leaderboard
          </Link>
          
          <ThemeToggle />
          
          {user ? (
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost"
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
              >
                <User className="w-4 h-4" />
                <span className="font-medium">{user.displayName || 'User'}</span>
              </Button>
              <Button 
                variant="outline"
                className="flex items-center space-x-1"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar</span>
              </Button>
            </div>
          ) : (
            <Button 
              className="flex items-center space-x-1 bg-primary-600 hover:bg-primary-700 text-white"
              onClick={openAuthModal}
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk</span>
            </Button>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost"
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle Menu"
          onClick={toggleMobileMenu}
        >
          <Menu className="w-6 h-6" />
        </Button>
      </nav>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 pb-4 shadow-lg">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link href="/tryout" className="py-2 font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
              Tryout
            </Link>
            <Link href="/blog" className="py-2 font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
              Blog
            </Link>
            <Link href="/leaderboard" className="py-2 font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
              Leaderboard
            </Link>
            
            <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">Mode Gelap</span>
              <ThemeToggle />
            </div>
            
            {user ? (
              <div className="flex flex-col space-y-3 pt-2">
                <div className="flex items-center space-x-2 py-2 text-gray-700 dark:text-gray-300">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{user.displayName || 'User'}</span>
                </div>
                <Button 
                  className="w-full flex items-center justify-center space-x-1"
                  variant="outline"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar</span>
                </Button>
              </div>
            ) : (
              <Button 
                className="w-full flex items-center justify-center space-x-1 bg-primary-600 hover:bg-primary-700 text-white"
                onClick={openAuthModal}
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk</span>
              </Button>
            )}
          </div>
        </div>
      )}

      <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} />
    </header>
  );
}
