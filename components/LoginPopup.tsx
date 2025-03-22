"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Now used
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Removed unused DialogFooter import
import { useToast } from "@/components/ui/use-toast";

interface LoginPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  redirectUrl?: string; // Optional redirect URL
}

export default function LoginPopup({ open, onOpenChange }: LoginPopupProps) { // Removed unused redirectUrl prop
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false); 
  const [isMagicLinkLoading, setIsMagicLinkLoading] = useState<boolean>(false); // Now used
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
        onOpenChange(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, message, onOpenChange]);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true); 
    setIsMagicLinkLoading(false); 
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
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
      setIsGoogleLoading(false);
    }
  };

  const handleMagicLinkSignIn = async () => {
    setError('');
    setMessage('');
    setIsMagicLinkLoading(true); // This is now used correctly
    setIsGoogleLoading(false);

    try {
      const response = await fetch('/api/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error checking email');

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          shouldCreateUser: !data.exists,
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
      setIsMagicLinkLoading(false);
    }
  };

  const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" className="mr-2">
      {/* Google icon paths */}
    </svg>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Sign In</DialogTitle>
          <p className="text-sm text-gray-600">Access this tool by signing in with Google or email.</p>
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

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or use email</span>
            </div>
          </div>

          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isGoogleLoading || isMagicLinkLoading}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}
          <Button
            onClick={handleMagicLinkSignIn}
            disabled={isMagicLinkLoading || !email}
            className="w-full bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center"
          >
            {isMagicLinkLoading ? 'Sending...' : 'Send Magic Link'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
