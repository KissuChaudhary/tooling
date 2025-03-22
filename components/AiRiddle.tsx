"use client"

import React, { useState } from 'react'
import { Loader2, Clipboard, Check, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import AdUnit from '../components/AdUnit'

interface FormData {
  riddle: string;
}

interface Errors {
  [key: string]: string;
}

const characterLimit = 500;

export default function RiddleSolver() {
  const [formData, setFormData] = useState<FormData>({
    riddle: '',
  });
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [solution, setSolution] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (value: string) => {
    if (value.length <= characterLimit) {
      setFormData({ riddle: value });
      setCharacterCount(value.length);
      if (errors.riddle) {
        setErrors({});
      }
    }
  };

  const validateForm = (): boolean => {
    if (!formData.riddle.trim()) {
      setErrors({ riddle: 'Riddle is required' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    setSolution('');

    try {
      const payload = {
        tool: 'aiRiddleSolver',
        data: formData,
      };
      console.log('Sending to API:', payload); // Log request payload
      const response = await fetch('/api/openai-new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'An error occurred while solving the riddle');
      }
      setSolution(data.solution);
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: error instanceof Error ? error.message : 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(solution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight">AI Riddle Solver</h1>
      <p className="text-xl text-center mb-12 max-w-3xl mx-auto">Get expert solutions to complex riddles with our AI-powered Riddle Solver.</p>
      <AdUnit 
        client="ca-pub-7915372771416695"
        slot="8441706260"
        style={{ marginBottom: '20px' }}
      />

      <div className="flex flex-col md:flex-row gap-8">
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>Riddle Input</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="flex justify-between items-center mb-1">
                  <Label htmlFor="riddle" className="text-sm font-medium text-gray-400">
                    Riddle
                  </Label>
                  <p className={`text-sm ${characterCount === characterLimit ? 'text-orange-500' : 'text-gray-500'}`}>
                    {characterCount}/{characterLimit} characters
                  </p>
                </div>
                <Textarea
                  id="riddle"
                  value={formData.riddle}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="Enter your riddle here..."
                  className={`mt-1 ${errors.riddle ? 'border-red-500' : ''}`}
                />
                {errors.riddle && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.riddle}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Solving...
                  </>
                ) : 'Solve Riddle'}
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
            <CardTitle>Riddle Solution</CardTitle>
          </CardHeader>
          <CardContent>
            {solution ? (
              <>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                  <p className="whitespace-pre-wrap text-gray-900 dark:text-gray-100">{solution}</p>
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
              <p className="text-gray-500 dark:text-gray-400 italic">Your riddle solution will appear here.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}