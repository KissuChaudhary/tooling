// components/UsernameGenerator.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Loader2, Clipboard, Check, AlertCircle, Plus, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RequireAuth from '@/components/RequireAuth';
import AdUnit from '@/components/AdUnit';
import { Session } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

interface UsernameGeneratorProps {
  session: Session | null;
}

interface FormData {
  interests: string[];
  style: 'fun' | 'professional' | 'creative' | 'gaming';
  numberOfUsernames: string;
}

interface Errors {
  [key: string]: string;
}

export default function UsernameGenerator({ session }: UsernameGeneratorProps) {
  const [formData, setFormData] = useState<FormData>({
    interests: [''],
    style: 'fun',
    numberOfUsernames: '5',
  });
  const [generatedUsernames, setGeneratedUsernames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [rateLimitExceeded, setRateLimitExceeded] = useState<boolean>(false);
  const supabase = createClient();

  // Check authentication state and fetch access token
  useEffect(() => {
    const checkAuth = async () => {
      // First, try using the server-side session if available
      let authenticated = false;
      if (session?.access_token) {
        console.log('UsernameGenerator: Using server-side session access token');
        const { data, error } = await supabase.auth.getUser(session.access_token);
        console.log('UsernameGenerator: getUser with session token result:', { data, error });
        authenticated = !error && !!data.user;
        if (authenticated) {
          setAccessToken(session.access_token);
        }
      }

      // If not authenticated, fall back to client-side session
      if (!authenticated) {
        console.log('UsernameGenerator: Falling back to client-side session');
        const { data, error } = await supabase.auth.getUser();
        console.log('UsernameGenerator: getUser client-side result:', { data, error });
        authenticated = !error && !!data.user;
        if (authenticated) {
          const { data: { session } } = await supabase.auth.getSession();
          setAccessToken(session?.access_token || null);
        }
      }

      setIsAuthenticated(authenticated);
    };

    checkAuth();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log('UsernameGenerator: onAuthStateChange event:', event, 'newSession:', newSession);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        const { data, error } = await supabase.auth.getUser();
        console.log('UsernameGenerator: getUser in onAuthStateChange result:', { data, error });
        const authenticated = !error && !!data.user;
        setIsAuthenticated(authenticated);
        setAccessToken(newSession?.access_token || null);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setAccessToken(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [session]);

  // Rate limit window (20 minutes in milliseconds)
  const RATE_LIMIT_WINDOW = 20 * 60 * 1000;

  // Reset rate limit exceeded state after the window expires
  useEffect(() => {
    if (rateLimitExceeded) {
      const timer = setTimeout(() => {
        setRateLimitExceeded(false);
        setErrors(prev => ({ ...prev, submit: '' }));
      }, RATE_LIMIT_WINDOW);
      return () => clearTimeout(timer);
    }
  }, [rateLimitExceeded]);

  const handleInterestChange = (index: number, value: string) => {
    const newInterests = [...formData.interests];
    newInterests[index] = value;
    setFormData(prev => ({ ...prev, interests: newInterests }));
  };

  const addInterest = () => {
    setFormData(prev => ({ ...prev, interests: [...prev.interests, ''] }));
  };

  const removeInterest = (index: number) => {
    const newInterests = formData.interests.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, interests: newInterests }));
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (formData.interests.some(interest => !interest.trim())) {
      newErrors.interests = 'All interest fields are required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!isAuthenticated) {
      setErrors({ submit: 'Please login to generate usernames' });
      return;
    }

    setIsLoading(true);
    setErrors({});
    setGeneratedUsernames([]);
    setRateLimitExceeded(false);

    try {
      const response = await fetch('/api/openai-new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken || ''}`,
        },
        body: JSON.stringify({
          tool: 'aiUsernameGenerator',
          data: formData,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 429) {
          setRateLimitExceeded(true);
          setErrors({ submit: 'Rate limit exceeded. Please try again later.' });
        } else {
          throw new Error(data.error || 'An error occurred while generating usernames');
        }
      } else {
        setGeneratedUsernames(data.usernames);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: error instanceof Error ? error.message : 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUsernames.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight">Free AI Username Generator</h1>
      <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
        Generate unique and creative usernames based on your interests and style preferences with our username generator AI.
      </p>
      <AdUnit
        client="ca-pub-7915372771416695"
        slot="8441706260"
        style={{ marginBottom: '20px' }}
      />
      {/* Keep RequireAuth as a UI alert, but don't use it for access control */}
      {!isAuthenticated && <RequireAuth session={session} onAuthChange={() => {}} />}

      <div className="flex flex-col md:flex-row gap-8">
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>Username Generator Input</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="interests" className="text-sm font-medium">
                  Interests
                </Label>
                {formData.interests.map((interest, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <Input
                      id={`interest-${index}`}
                      value={interest}
                      onChange={(e) => handleInterestChange(index, e.target.value)}
                      placeholder={`Enter interest ${index + 1}`}
                      className={`flex-grow ${errors.interests ? 'border-red-500' : ''}`}
                    />
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeInterest(index)}
                        className="ml-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addInterest}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Interest
                </Button>
                {errors.interests && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.interests}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="style" className="text-sm font-medium">
                  Style
                </Label>
                <Select
                  value={formData.style}
                  onValueChange={(value: 'fun' | 'professional' | 'creative' | 'gaming') =>
                    setFormData(prev => ({ ...prev, style: value }))
                  }
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fun">Fun</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="numberOfUsernames" className="text-sm font-medium">
                  Number of Usernames
                </Label>
                <Select
                  value={formData.numberOfUsernames}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, numberOfUsernames: value }))}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select number of usernames" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || rateLimitExceeded}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : rateLimitExceeded ? (
                  'Rate Limit Exceeded'
                ) : (
                  'Generate Usernames'
                )}
              </Button>
              {errors.submit && (
                <p className="mt-2 text-sm text-red-600 flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.submit}
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>Generated Usernames</CardTitle>
          </CardHeader>
          <CardContent>
            {generatedUsernames.length > 0 ? (
              <>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                  <ul className="list-disc list-inside">
                    {generatedUsernames.map((username, index) => (
                      <li key={index} className="mb-2">{username}</li>
                    ))}
                  </ul>
                </div>
                <Button onClick={handleCopy} variant="outline" className="w-full">
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Clipboard className="mr-2 h-4 w-4" />
                      Copy to Clipboard
                    </>
                  )}
                </Button>
              </>
            ) : (
              <p className="text-gray-500 italic">Your generated usernames will appear here.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}