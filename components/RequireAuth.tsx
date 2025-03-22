// components/RequireAuth.tsx
'use client';

import { useState, useEffect } from 'react';
import { getSession, signOut, supabase } from '@/lib/supabase';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import LoginPopup from '@/components/LoginPopup';
import { AlertTriangle } from 'lucide-react'; // For the warning icon

interface RequireAuthProps {
  onAuthChange: (isAuthenticated: boolean) => void;
}

export default function RequireAuth({ onAuthChange }: RequireAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      const authenticated = !!session;
      setIsAuthenticated(authenticated);
      onAuthChange(authenticated);
      setLoading(false);
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        const authenticated = !!session;
        setIsAuthenticated(authenticated);
        onAuthChange(authenticated);
        if (authenticated) {
          setShowLoginPopup(false);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [onAuthChange]);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-16">
        <svg
          className="animate-spin h-5 w-5 text-gray-500"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8h-8z"
          />
        </svg>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Alert className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border border-gray-300 rounded-lg mb-4 shadow-sm bg-white">
          <div className="flex items-center space-x-3 mb-3 sm:mb-0">
            <div className="border border-gray-300 rounded-lg p-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <AlertTitle className="text-base font-semibold text-gray-900">
                Login Required
              </AlertTitle>
              <AlertDescription className="text-sm text-gray-600">
                Please login to continue using this tool.
              </AlertDescription>
            </div>
          </div>
          <Button
            onClick={() => setShowLoginPopup(true)}
            className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium w-full sm:w-auto"
          >
            Login
          </Button>
        </Alert>
        <LoginPopup
          open={showLoginPopup}
          onOpenChange={setShowLoginPopup}
          redirectUrl={`${window.location.origin}${window.location.pathname}`}
        />
      </>
    );
  }

  return null;
}