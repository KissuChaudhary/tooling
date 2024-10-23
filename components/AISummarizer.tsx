'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Share2, Download, Copy, CheckCircle2, Timer, FileText } from 'lucide-react';

interface SummaryContent {
  fullText: string;
  summary: string;
  keyPoints: string[];
  title?: string;
  wordCount: number;
  readingTime?: number;
}

export default function AISummarizer() {
  const [url, setUrl] = useState('');
  const [content, setContent] = useState<SummaryContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const response = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    // Check if the response content type is JSON before parsing
    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // Handle non-JSON response (e.g., plain text or HTML)
      const text = await response.text();
      throw new Error(text || 'Unknown error occurred');
    }

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch content');
    }

    setContent(data);
    setUrl('');
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
          title: content.title || 'Article Summary',
          text: content.summary,
          url: url
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">AI Content Summarizer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
        </form>

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
            {content.title && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold">{content.title}</h2>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {content.wordCount} words
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Timer className="w-3 h-3" />
                    {content.readingTime} min read
                  </Badge>
                </div>
              </div>
            )}

            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="summary" className="flex-1">Summary</TabsTrigger>
                <TabsTrigger value="key" className="flex-1">Key Points</TabsTrigger>
                <TabsTrigger value="full" className="flex-1">Full Text</TabsTrigger>
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
  {typeof window !== 'undefined' && typeof navigator.share === 'function' && (
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

              <TabsContent value="full" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="prose max-w-none whitespace-pre-wrap">
                      {content.fullText}
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
