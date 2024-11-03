import ImageChat from '@/components/ImageChat'
import Head from 'next/head';
import Script from 'next/script';
import React from 'react';
import AdUnit from '@/components/AdUnit'
import ToolEngagement from '@/components/tool-engagement'

export const metadata = {
  title: "Chat with Images for free | AI image chat app - Saze AI",
  description: "Chat with your images using our free ai image chat tool",
};



export default function AiImageChat() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-ai-haiku-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Chat with Images for free | AI image chat app - Saze AI",
          "description": "Chat with your images using our free ai image chat tool",
          "url": "https://sazeai.com/tools/ai-image-chat",
        })}
      </Script>
      <Script id="schema-ai-haiku-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Chat with Images for free",
          "description": "Chat with your images using our free ai image chat tool",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-image-chat",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        <ImageChat />
        <ToolEngagement 
          toolName="AI Image Chat Tool"
        />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
       
  
      </div>
    </>
  );
}
