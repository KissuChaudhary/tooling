'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Share2, Download, Copy, Timer, FileText, Link, AlignLeft, CheckCircle2 } from 'lucide-react';

interface SummaryContent {
  summary: string;
  keyPoints: string[];
  bestLines: string[];
  wordCount: number;
}

export default function AISummarizer() {
  const [inputType, setInputType] = useState<'url' | 'text'>('text');
  const [input, setInput] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [content, setContent] = useState<SummaryContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [summaryLength, setSummaryLength] = useState(50);
  const [showSummary, setShowSummary] = useState(true);
  const [showBullets, setShowBullets] = useState(false);
  const [showBestLine, setShowBestLine] = useState(false);

  useEffect(() => {
    const words = input.split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setContent(null);

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          input,
          inputType,
          summaryLength,
          showSummary,
          showBullets,
          showBestLine
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch content');
      }

      const data = await response.json();
      setContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (text: string, filename: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share && content) {
      try {
        await navigator.share({
          title: 'AI Summarizer Result',
          text: content.summary,
          url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newInput = e.target.value;
    if (newInput.length <= 10000) {
      setInput(newInput);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">AI Summarizer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex space-x-2">
            <Toggle 
              pressed={inputType === 'url'} 
              onPressedChange={() => {
                setInputType('url');
                setInput('');
              }}
            >
              URL
            </Toggle>
            <Toggle 
              pressed={inputType === 'text'} 
              onPressedChange={() => {
                setInputType('text');
                setInput('');
              }}
            >
              Text
            </Toggle>
          </div>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <span className="text-sm">Short</span>
            <Slider
              value={[summaryLength]}
              onValueChange={(value) => setSummaryLength(value[0])}
              max={100}
              step={1}
              className="w-[140px] md:w-[200px]"
            />
            <span className="text-sm">Long</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {inputType === 'url' ? (
            <Input
              type="url"
              value={input}
              onChange={handleInputChange}
              placeholder="Enter URL to analyze"
              required
            />
          ) : (
            <Textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Enter or paste text to analyze (max 10000 characters)"
              required
              className="min-h-[200px]"
            />
          )}

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {wordCount} Words / {input.length} characters
            </span>
            <Button type="submit" disabled={loading}>
              {loading ? 'Processing...' : 'Summarize'}
            </Button>
          </div>
        </form>

        <div className="flex justify-center space-x-2 mt-4">
          <Toggle pressed={showSummary} onPressedChange={setShowSummary}>
            Summary
          </Toggle>
          <Toggle pressed={showBullets} onPressedChange={setShowBullets}>
            Show Bullets
          </Toggle>
          <Toggle pressed={showBestLine} onPressedChange={setShowBestLine}>
            Best Line
          </Toggle>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading && (
          <div className="mt-8 space-y-4">
            <div className="h-4 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 bg-gray-100 rounded animate-pulse w-5/6" />
            <div className="h-4 bg-gray-100 rounded animate-pulse w-4/6" />
          </div>
        )}

        {content && !loading && (
          <div className="mt-8">
            <div className="mb-4">
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  {content.wordCount} words
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Timer className="w-3 h-3" />
                  {Math.ceil(content.wordCount / 200)} min read
                </Badge>
              </div>
            </div>

            {showSummary && (
              <Card className="mb-4">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <div className="prose max-w-none">
                    {content.summary}
                  </div>
                </CardContent>
              </Card>
            )}

            {showBullets && (
              <Card className="mb-4">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">Key Points</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {content.keyPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {showBestLine && (
              <Card className="mb-4">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">Best Line</h3>
                  <blockquote className="border-l-4 border-primary pl-4 italic">
                    "{content.bestLines[0]}"
                  </blockquote>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(content.summary)}
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(content.summary, 'summary.txt')}
              >
                <Download className="w-4 h-4" />
              </Button>
              {typeof navigator.share === 'function' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
