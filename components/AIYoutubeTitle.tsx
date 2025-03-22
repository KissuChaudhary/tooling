"use client"

import React, { useState } from 'react'
import { Loader2, Clipboard, Check, AlertCircle, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import AdUnit from '../components/AdUnit'

interface FormData {
  topic: string;
  keywords: string[];
}

interface Errors {
  [key: string]: string;
}

const characterLimits = {
  topic: 100,
  keyword: 20,
};

export default function YoutubeTitleGenerator() {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    keywords: [],
  });
  const [characterCounts, setCharacterCounts] = useState({
    topic: '0',
  });
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [generatedTitle, setGeneratedTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  const handleTopicChange = (value: string) => {
    if (value.length <= characterLimits.topic) {
      setFormData(prev => ({ ...prev, topic: value }));
      setCharacterCounts(prev => ({ ...prev, topic: value.length.toString() }));
      if (errors.topic) {
        setErrors(prev => ({ ...prev, topic: '' }));
      }
    }
  };

  const handleKeywordChange = (value: string) => {
    if (value.length <= characterLimits.keyword) {
      setCurrentKeyword(value);
      if (errors.keywords) {
        setErrors(prev => ({ ...prev, keywords: '' }));
      }
    }
  };

  const addKeyword = () => {
    if (currentKeyword.trim() && formData.keywords.length < 5) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, currentKeyword.trim()]
      }));
      setCurrentKeyword('');
    }
  };

  const removeKeyword = (index: number) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.topic.trim()) {
      newErrors.topic = 'Topic is required';
    }
    if (formData.keywords.length === 0) {
      newErrors.keywords = 'At least one keyword is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsLoading(true);
    setErrors({});
    setGeneratedTitle('');

    try {
      const response = await fetch('/api/openai-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool: 'aiYoutubeTitleGenerator',
          model: 'gemini',
          data: formData,
        }),
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'An error occurred while generating the title');
      }

      setGeneratedTitle(data.youtubeTitle);
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: error instanceof Error ? error.message : 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedTitle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight">AI YouTube Title Generator</h1>
      <p className="text-xl text-center mb-12 max-w-3xl mx-auto">Create Engaging YouTube Titles with Saze AI – Boost Your Video's Click-Through Rate.</p>
      <AdUnit 
        client="ca-pub-7915372771416695"
        slot="8441706260"
        style={{ marginBottom: '20px' }}
      />

      <div className="flex flex-col md:flex-row gap-8">
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>Title Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic" className="text-sm font-medium text-gray-700">
                  Topic
                </Label>
                <div className="relative">
                  <Textarea
                    id="topic"
                    value={formData.topic}
                    onChange={(e) => handleTopicChange(e.target.value)}
                    placeholder="Enter the main topic of your YouTube video..."
                    className={`resize-none ${errors.topic ? 'border-red-500' : ''}`}
                    rows={3}
                  />
                  <p className={`absolute right-0 -bottom-5 text-xs ${parseInt(characterCounts.topic) === characterLimits.topic ? 'text-orange-500' : 'text-gray-500'}`}>
                    {characterCounts.topic}/{characterLimits.topic}
                  </p>
                </div>
                {errors.topic && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.topic}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords" className="text-sm font-medium text-gray-700">
                  Keywords (up to 5)
                </Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {keyword}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-auto p-0"
                        onClick={() => removeKeyword(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="keywords"
                    value={currentKeyword}
                    onChange={(e) => handleKeywordChange(e.target.value)}
                    placeholder="Enter a keyword"
                    className={errors.keywords ? 'border-red-500' : ''}
                  />
                  <Button type="button" onClick={addKeyword} disabled={formData.keywords.length >= 5 || !currentKeyword.trim()}>
                    Add
                  </Button>
                </div>
                {errors.keywords && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.keywords}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : 'Generate Title'}
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
            <CardTitle>Generated Title</CardTitle>
          </CardHeader>
          <CardContent>
            {generatedTitle ? (
              <>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-4 min-h-[100px] flex items-center justify-center">
                  <p className="dark:text-gray-200">{generatedTitle}</p>
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
              <p className="text-gray-500 italic text-center">Your generated YouTube title will appear here.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
