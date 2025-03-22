"use client"

import React, { useState } from 'react'
import { Loader2, Clipboard, Check, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FormData {
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Errors {
  [key: string]: string;
}

const characterLimit = 100;

export default function RiddleGenerator() {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    difficulty: 'medium',
  });
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [generatedRiddle, setGeneratedRiddle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});


  const handleTopicChange = (value: string) => {
    if (value.length <= characterLimit) {
      setFormData(prev => ({ ...prev, topic: value }));
      setCharacterCount(value.length);
      if (errors.topic) {
        setErrors({});
      }
    }
  };

  const handleDifficultyChange = (value: 'easy' | 'medium' | 'hard') => {
    setFormData(prev => ({ ...prev, difficulty: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.topic.trim()) {
      setErrors({ topic: 'Topic is required' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsLoading(true);
    setErrors({});
    setGeneratedRiddle('');

    try {
      const response = await fetch('/api/openai-new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool: 'aiRiddleGenerator',
          data: formData,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'An error occurred while generating the riddle');
      }
      setGeneratedRiddle(data.riddle);
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: error instanceof Error ? error.message : 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedRiddle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight">AI Riddle Generator</h1>
      <p className="text-xl text-center mb-12 max-w-3xl mx-auto">Generate clever and engaging riddles with our AI-powered Riddle Generator.</p>
      

      
      <div className="flex flex-col md:flex-row gap-8">
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>Riddle Input</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="flex justify-between items-center mb-1">
                  <Label htmlFor="topic" className="text-sm font-medium text-gray-400">
                    Topic
                  </Label>
                  <p className={`text-sm ${characterCount === characterLimit ? 'text-orange-500' : 'text-gray-500'}`}>
                    {characterCount}/{characterLimit} characters
                  </p>
                </div>
                <Textarea
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => handleTopicChange(e.target.value)}
                  placeholder="Enter a topic for your riddle..."
                  className={`mt-1 ${errors.topic ? 'border-red-500' : ''}`}
                />
                {errors.topic && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.topic}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="difficulty" className="text-sm font-medium text-gray-400">
                  Difficulty
                </Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value: 'easy' | 'medium' | 'hard') => handleDifficultyChange(value)}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : 'Generate Riddle'}
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
            <CardTitle>Generated Riddle</CardTitle>
          </CardHeader>
          <CardContent>
            {generatedRiddle ? (
              <>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                  <p className="whitespace-pre-wrap text-gray-900 dark:text-gray-100">{generatedRiddle}</p>
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
              <p className="text-gray-500 dark:text-gray-400 italic">Your generated riddle will appear here.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
