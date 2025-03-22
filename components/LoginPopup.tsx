// components/LoginPopup.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface LoginPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  redirectUrl?: string; // Optional redirect URL
}

export default function LoginPopup({ open, onOpenChange, redirectUrl }: LoginPopupProps) {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false); // Separate loader for Google login
  const [isMagicLinkLoading, setIsMagicLinkLoading] = useState<boolean>(false); // Separate loader for magic link
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    if (!open) {
      setEmail('');
      setError('');
      setMessage('');
      setIsGoogleLoading(false);
      setIsMagicLinkLoading(false);
    }
  
    if (message) {
      const timer = setTimeout(() => {
        onOpenChange(false); // Automatically close popup after 5 seconds if there's a message
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, message, onOpenChange]);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true); // Set Google loader
    setIsMagicLinkLoading(false); // Disable Magic Link loader if it was running
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl || `${window.location.origin}/auth/callback`, // Use redirectUrl if provided
        },
      });

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Google Sign-In error:', err);
      toast({
        title: 'Error',
        description: 'Failed to sign in with Google. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGoogleLoading(false); // Reset Google loader after request
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
    setIsMagicLinkLoading(true); // Set Magic Link loader
    setIsGoogleLoading(false); // Disable Google loader if it was running

    try {
      const userExists = await checkUserExists(email);

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectUrl || `${window.location.origin}/auth/callback`, // Use redirectUrl if provided
          shouldCreateUser: !userExists,
        },
      });

      if (error) throw error;

      setMessage('Magic link sent! Check your email to continue.');
      toast({
        title: 'Check your email',
        description: 'We’ve sent you a magic link to sign in.',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Magic Link Sign-In error:', err);
      toast({
        title: 'Error',
        description: 'Failed to send magic link. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsMagicLinkLoading(false); // Reset Magic Link loader after request
    }
  };

  const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" className="mr-2">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.04.7-2.36 1.11-3.71 1.11-2.85 0-5.27-1.92-6.13-4.5H1.5v2.82C3.38 20.38 7.44 23 12 23z" />
      <path fill="#FBBC05" d="M5.87 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H1.5C.54 8.74 0 10.65 0 12.5s.54 3.76 1.5 5.43l4.37-3.84z" />
      <path fill="#EA4335" d="M12 4.5c1.64 0 3.11.58 4.26 1.72l3.19-3.19C17.46 1.36 14.97.5 12 .5 7.44.5 3.38 3.12 1.5 6.57l4.37 3.84C6.73 7.42 9.15 4.5 12 4.5z" />
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
            disabled={isGoogleLoading}
          >
            <GoogleIcon />
            {isGoogleLoading ? 'Connecting...' : 'Sign in with Google'}
          </Button>

          {/* The rest of your component remains unchanged */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
