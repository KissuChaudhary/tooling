// components/Header.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Search, LogOut } from 'lucide-react';
import ToolSearch from './ToolSearch';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LoginPopup from '@/components/LoginPopup';
import { toast } from 'sonner';
import type { Session } from '@supabase/supabase-js';

export default function Header({ session }: { session: Session | null }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false);
  const [redirectUrl, setRedirectUrl] = useState<string>('');
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!session);
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
    setRedirectUrl(`${window.location.origin}${window.location.pathname}`);

    // Check initial authentication state
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getUser();
      setIsAuthenticated(!error && !!data.user);
    };
    checkAuth();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log('Header: onAuthStateChange event:', event, 'newSession:', newSession);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setIsAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        // Force a full page reload to ensure all components update
        window.location.href = '/';
      }
    });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      authListener.subscription.unsubscribe();
    };
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);

    // Set a timeout to prevent the UI from getting stuck
    const signOutTimeout = setTimeout(() => {
      setIsSigningOut(false);
      toast.error('Sign out timed out. Please try again.');
      // Force a full page reload as a fallback
      window.location.href = '/';
    }, 5000); // 5 seconds timeout

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      toast.success('Signed out successfully');
      // The onAuthStateChange handler will handle the redirect
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out. Please try again.');
      // Force a full page reload as a fallback
      window.location.href = '/';
    } finally {
      clearTimeout(signOutTimeout);
      setIsSigningOut(false);
    }
  };

  return (
    <>
      <header className={`bg-background border transition-all duration-300 ${isSticky ? 'sticky top-0 z-50' : ''}`}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center relative w-[150px] h-[50px]">
              <Image
                src="/images/logo.png"
                alt="Your Logo (Light Mode)"
                width={150}
                height={50}
                className={`absolute top-0 left-0 transition-opacity duration-300 ${
                  theme === 'dark' ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <Image
                src="/images/logo.png"
                alt="Your Logo (Dark Mode)"
                width={150}
                height={50}
                className={`absolute top-0 left-0 transition-opacity duration-300 ${
                  theme === 'dark' ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </Link>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:block">
                <ul className="flex space-x-4">
                  <li>
                    <Link href="/" className="text-muted-foreground hover:text-foreground font-semibold transition-colors duration-200">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/ai-text-to-speech" className="text-muted-foreground font-semibold hover:text-foreground transition-colors duration-200">
                      AI Text to Speech
                    </Link>
                  </li>
                  <li>
                    <Link href="/ai-productivity-tools" className="text-muted-foreground font-semibold hover:text-foreground transition-colors duration-200">
                      AI Productivity Tools
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools" className="text-muted-foreground hover:text-foreground font-semibold transition-colors duration-200">
                      AI Tools
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-muted-foreground hover:text-foreground font-semibold transition-colors duration-200">
                      Blog
                    </Link>
                  </li>
                </ul>
              </nav>
              <button
                aria-label="Toggle Search"
                type="button"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors duration-300 ease-in-out"
                onClick={toggleSearch}
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                aria-label="Toggle Dark Mode"
                type="button"
                className="btn btn-secondary relative w-10 h-10 rounded-full overflow-hidden transition-colors duration-300 ease-in-out"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out">
                  {mounted && (
                    <>
                      <Sun className={`w-5 h-5 ${theme === 'dark' ? 'translate-y-10' : 'translate-y-0'}`} />
                      <Moon className={`w-5 h-5 absolute ${theme === 'dark' ? 'translate-y-0' : '-translate-y-10'}`} />
                    </>
                  )}
                </div>
              </button>
              {mounted && (
                isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="relative w-10 h-10 rounded-full p-0 focus:outline-none">
                      <Avatar>
                        <AvatarImage
                          src={session?.user.user_metadata?.avatar_url || ''}
                          alt="User profile"
                        />
                        <AvatarFallback>
                          {session?.user.email ? session.user.email[0].toUpperCase() : 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer" disabled={isSigningOut}>
                        <LogOut className="w-4 h-4 mr-2" />
                        {isSigningOut ? 'Signing Out...' : 'Sign Out'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setShowLoginPopup(true)}
                  >
                    Login
                  </Button>
                )
              )}
              <button
                aria-label="Toggle Menu"
                type="button"
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 ease-in-out z-[1000]"
                onClick={toggleMenu}
              >
                <div className={`transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </div>
              </button>
            </div>
          </div>
        </div>
        <div
          className={`fixed top-0 left-0 w-full h-full bg-background transition-opacity duration-300 ease-in-out md:hidden z-[999] ${
            isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <nav className="h-full flex items-center justify-center">
            <ul className="flex flex-col space-y-8 text-center">
              <li>
                <Link
                  href="/"
                  className="text-2xl font-bold text-foreground hover:text-primary transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-2xl font-bold text-foreground hover:text-primary transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-2xl font-bold text-foreground hover:text-primary transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  AI Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-productivity-tools"
                  className="text-2xl font-bold text-foreground hover:text-primary transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  AI Productivity Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/ai-text-to-speech"
                  className="text-2xl font-bold text-foreground hover:text-primary transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  AI Text-To-Speech
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {isSearchOpen && (
          <div className="fixed inset-0 bg-background bg-opacity-50 flex items-start justify-center pt-20 px-4 z-[1001]">
            <div className="w-full max-w-2xl">
              <ToolSearch onClose={toggleSearch} />
            </div>
          </div>
        )}
      </header>
      {mounted && (
        <LoginPopup
          open={showLoginPopup}
          onOpenChange={setShowLoginPopup}
          redirectUrl={redirectUrl}
        />
      )}
    </>
  );
}