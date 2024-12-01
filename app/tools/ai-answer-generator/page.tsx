import Head from 'next/head';
import Script from 'next/script';
import ToolEngagement from '@/components/tool-engagement';
import AdUnit from '@/components/AdUnit';
import RelatedTools from '@/components/related-tools';

export const metadata = {
  title: "AI Face Swap Tool | Fun and Realistic Face Swapping",
  description: "Effortlessly swap faces in photos with the AI Face Swap Tool. Create fun and realistic face swaps for entertainment or creative projects.",
};

export default function AIFaceSwapToolPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-ai-face-swap-tool" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": metadata.title,
          "description": metadata.description,
          "url": "https://sazeai.com/tools/ai-face-swap",
        })}
      </Script>
      <div className="min-h-screen">
        {/* Tool Engagement Section */}
        <ToolEngagement toolName="AI Face Swap Tool" />
        
        {/* Advertisement */}
        <AdUnit 
          client="ca-pub-7915372771416695" 
          slot="8441706260" 
          style={{ marginBottom: '20px' }} 
        />
        
        {/* Related Tools Section */}
        <RelatedTools currentToolLink="/tools/ai-face-swap" />
        
        {/* Content Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-4">About AI Face Swap Tool</h1>
            <p className="text-lg">
              The AI Face Swap Tool helps you create realistic and fun face swaps. Whether for social media, creative projects, or entertainment, this tool delivers amazing results with ease.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
