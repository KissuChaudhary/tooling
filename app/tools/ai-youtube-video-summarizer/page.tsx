import Head from 'next/head';
import YouTubeSummarizer from '@/components/AIYoutubeSummary';
import Script from 'next/script';
import React from 'react';
import AdUnit from '@/components/AdUnit';
import ToolEngagement from '@/components/tool-engagement';
import EnhancedContent from '@/components/EnhancedYoutube';


export const metadata = {
  title: "Free AI YouTube Video Summarizer | Summarize Videos Instantly",
  description:
    "Save time with our Free AI YouTube Video Summarizer. Create concise summaries, highlights, or text from YouTube videos effortlessly using AI.",
};



export default function AIYouTubeSummarizerPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-youtube-video-summarizer" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI YouTube Video Summarizer - Saze AI",
          "description": metadata.description,
          "url": "https://sazeai.com/tools/youtube-video-summarizer",
        })}
      </Script>
      <Script id="schema-youtube-video-summarizer-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI YouTube Video Summarizer - Saze AI",
          "description": metadata.description,
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/youtube-video-summarizer",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>
      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <YouTubeSummarizer />
        <ToolEngagement toolName="AI YouTube Video Summarizer" />
        <AdUnit
          client="ca-pub-7915372771416695"
          slot="8441706260"
          style={{ marginBottom: '20px' }}
        />

              <EnhancedContent />

   
      </div>
    </>
  );
}
