'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Share2, Download, Copy, Timer, FileText, Link, AlignLeft, CheckCircle2 } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface SummaryContent {
  summary: string;
  keyPoints: string[];
  bestLines: string[];
  wordCount: number;
}

export default function AISummarizer() {
  const [inputType, setInputType] = useState<'url' | 'text'>('url');
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [content, setContent] = useState<SummaryContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const words = text.split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [text]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setContent(null);

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputType === 'url' ? { url } : { text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch content');
      }

      const data = await response.json();
      setContent(data);
      setUrl('');
      setText('');
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
    setNotification(`${filename} is being downloaded`);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleShare = async () => {
    if (navigator.share && content) {
      try {
        await navigator.share({
          title: 'Article Summary',
          text: content.summary,
          url: url
        });
        setNotification('Content shared successfully');
      } catch (err) {
        console.error('Error sharing:', err);
        setNotification('Failed to share content');
      }
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const words = newText.split(/\s+/).filter(word => word.length > 0);
    if (words.length <= 1500 && newText.length <= 10000) {
      setText(newText);
      setWordCount(words.length);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">AI Content Summarizer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <RadioGroup defaultValue="url" onValueChange={(value) => setInputType(value as 'url' | 'text')} className="flex space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="url" id="url" />
              <Label htmlFor="url">URL</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="text" id="text" />
              <Label htmlFor="text">Text</Label>
            </div>
          </RadioGroup>

          {inputType === 'url' ? (
            <div className="flex gap-2">
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL to analyze"
                required
                className="flex-1"
              />
              <Button type="submit" disabled={loading}>
                {loading ? 'Processing...' : 'Analyze'}
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Enter or paste text to analyze (max 1500 words or 10000 characters)"
                required
                className="min-h-[200px]"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {wordCount}/1500 words | {text.length}/10000 characters
                </span>
                <Button type="submit" disabled={loading || wordCount === 0}>
                  {loading ? 'Processing...' : 'Analyze'}
                </Button>
              </div>
            </div>
          )}
        </form>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {notification && (
          <Alert className="mt-4">
            <AlertDescription>{notification}</AlertDescription>
          </Alert>
        )}

        {loading && (
          <div className="mt-8 space-y-4">
            <div className="h-4 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 bg-gray-100 rounded animate-pulse w-5/6" />
            <div className="h-4 bg-gray-100 rounded animate-pulse w-4/6" />
          </div>
        )}

        {!content && !loading && (
          <div className="mt-8 text-center space-y-4">
            <div className="flex justify-center space-x-4">
              <div className="text-center">
                <Link className="w-12 h-12 text-primary" />
                <p className="mt-2 text-sm font-medium">Analyze URLs</p>
              </div>
              <div className="text-center">
                <AlignLeft className="w-12 h-12 text-primary" />
                <p className="mt-2 text-sm font-medium">Summarize Text</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Enter a URL or paste text to get started with AI-powered summarization.
            </p>
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

            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="summary" className="flex-1">Summary</TabsTrigger>
                <TabsTrigger value="key" className="flex-1">Key Points</TabsTrigger>
                <TabsTrigger value="best" className="flex-1">Best Lines</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="prose max-w-none">
                      {content.summary}
                    </div>
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
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="key" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      {content.keyPoints.map((point, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Badge variant="secondary" className="mt-1">
                            {index + 1}
                          </Badge>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="best" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {content.bestLines.map((line, index) => (
                        <blockquote key={index} className="border-l-4 border-primary pl-4 italic">
                          "{line}"
                        </blockquote>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
