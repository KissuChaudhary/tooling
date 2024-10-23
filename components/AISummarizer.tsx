// components/AISummarizer.tsx
'use client';

import { useState } from 'react';

interface SummaryContent {
  fullText: string;
  summary: string;
  keyPoints: string[];
  title?: string;
  wordCount: number;
}

export default function AISummarizer() {
  const [url, setUrl] = useState('');
  const [content, setContent] = useState<SummaryContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'summary' | 'full' | 'key'>('summary');

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

      const data = await response.json();

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

  return (
    <div className="max-w-4xl w-full">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to analyze"
            required
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Analyze Content'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {loading && (
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      )}

      {content && !loading && (
        <div className="border rounded-lg overflow-hidden">
          {content.title && (
            <h2 className="text-xl font-semibold p-4 bg-gray-50 border-b">
              {content.title}
            </h2>
          )}
          
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('summary')}
                className={`flex-1 px-4 py-2 text-center ${
                  activeTab === 'summary' 
                    ? 'border-b-2 border-blue-500 text-blue-600 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Summary
              </button>
              <button
                onClick={() => setActiveTab('key')}
                className={`flex-1 px-4 py-2 text-center ${
                  activeTab === 'key' 
                    ? 'border-b-2 border-blue-500 text-blue-600 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Key Points
              </button>
              <button
                onClick={() => setActiveTab('full')}
                className={`flex-1 px-4 py-2 text-center ${
                  activeTab === 'full' 
                    ? 'border-b-2 border-blue-500 text-blue-600 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Full Text
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="text-sm text-gray-500 mb-4">
              Word count: {content.wordCount}
            </div>

            {activeTab === 'summary' && (
              <div className="prose max-w-none">
                {content.summary}
              </div>
            )}

            {activeTab === 'key' && (
              <div className="space-y-2">
                {content.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'full' && (
              <div className="prose max-w-none whitespace-pre-wrap">
                {content.fullText}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
