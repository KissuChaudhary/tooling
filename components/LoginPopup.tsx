// components/LoginPopup.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface LoginPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  redirectUrl?: string;
}

export default function LoginPopup({ open, onOpenChange, redirectUrl }: LoginPopupProps) {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [finalRedirectUrl, setFinalRedirectUrl] = useState<string>('');

  useEffect(() => {
    const url = redirectUrl || `${window.location.pathname}` || '/';
    setFinalRedirectUrl(url);
    console.log('LoginPopup - finalRedirectUrl:', url);
  }, [redirectUrl]);

  const handleGoogleSignIn = async () => {
    const redirectTo = `${window.location.origin}/api/auth/confirm?next=${encodeURIComponent(finalRedirectUrl)}`;
    console.log('Google Sign-In - redirectTo:', redirectTo);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
          response_type: 'code', // Ensure we get an authorization code
        },
      },
    });

    if (error) {
      setError(error.message);
      console.error('Google Sign-In error:', error);
    } else {
      console.log('Google Sign-In initiated:', data);
    }
  };

  const checkUserExists = async (email: string) => {
    const response = await fetch('/api/check-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Error checking email');
    }
    return data.exists;
  };

  const handleMagicLinkSignIn = async () => {
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      const redirectTo = `${window.location.origin}/api/auth/confirm?next=${encodeURIComponent(finalRedirectUrl)}`;
      console.log('Magic Link Sign-In - redirectTo:', redirectTo);

      const userExists = await checkUserExists(email);

      if (userExists) {
        const { error: linkError } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: redirectTo,
            shouldCreateUser: false,
          },
        });

        if (linkError) {
          setError(linkError.message);
          setIsLoading(false);
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: redirectTo,
          },
        });

        if (error) {
          setError(error.message);
          setIsLoading(false);
          return;
        }
      }

      setMessage('Magic link sent! Check your email to continue.');
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsLoading(false);
      console.error('Magic Link Sign-In error:', err);
    }
  };

  const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" className="mr-2">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-

3.57-2.77c-1.04.7-2.36 1.11-3.71 1.11-2.85 0-5.27-1.92-6.13-4.5H1.5v2.82C3.38 20.38 7.44 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.87 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H1.5C.54 8.74 0 10.65 0 12.5s.54 3.76 1.5 5.43l4.37-3.84z"
      />
      <path
        fill="#EA4335"
        d="M12 4.5c1.64 0 3.11.58 4.26 1.72l3.19-3.19C17.46 1.36 14.97.5 12 .5 7.44.5 3.38 3.12 1.5 6.57l4.37 3.84C6.73 7.42 9.15 4.5 12 4.5z"
      />
    </svg>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Sign In
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Access this tool by signing in with Google or email.
          </p>
        </DialogHeader>
        <div className="space-y-6 p-4">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm"
          >
            <GoogleIcon />
            Sign in with Google
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or use email</span>
            </div>
          </div>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            {message && (
              <p className="text-sm text-green-600">{message}</p>
            )}
            <Button
              onClick={handleMagicLinkSignIn}
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
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
                  Sending...
                </>
              ) : (
                'Send Magic Link'
              )}
            </Button>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}