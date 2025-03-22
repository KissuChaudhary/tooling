// components/RequireAuth.tsx
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import LoginPopup from '@/components/LoginPopup';
import { AlertTriangle } from 'lucide-react';
import { Session } from '@supabase/supabase-js';

interface RequireAuthProps {
  session: Session | null;
  onAuthChange: (isAuthenticated: boolean) => void;
}

export default function RequireAuth({ session, onAuthChange }: RequireAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false);
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      let authenticated = false;

      // First, try to get the user using the session's access token if available
      if (session?.access_token) {
        console.log('RequireAuth: Using server-side session access token');
        const { data, error } = await supabase.auth.getUser(session.access_token);
        console.log('RequireAuth: getUser with session token result:', { data, error });
        authenticated = !error && !!data.user;
      }

      // If not authenticated, try to get the user from the client-side session
      if (!authenticated) {
        console.log('RequireAuth: Falling back to client-side session');
        const { data, error } = await supabase.auth.getUser();
        console.log('RequireAuth: getUser client-side result:', { data, error });
        authenticated = !error && !!data.user;
      }

      setIsAuthenticated(authenticated);
      onAuthChange(authenticated);
      setLoading(false);
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log('RequireAuth: onAuthStateChange event:', event, 'newSession:', newSession);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        const { data, error } = await supabase.auth.getUser();
        console.log('RequireAuth: getUser in onAuthStateChange result:', { data, error });
        const authenticated = !error && !!data.user;
        setIsAuthenticated(authenticated);
        onAuthChange(authenticated);
        if (authenticated) {
          setShowLoginPopup(false);
        }
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        onAuthChange(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [onAuthChange, session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-16">
        <svg className="animate-spin h-5 w-5 text-gray-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h-8z" />
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
              <AlertTitle className="text-base font-semibold text-gray-900">Login Required</AlertTitle>
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