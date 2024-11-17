import Head from 'next/head';
import PdfSummarizer from '@/components/AIPdfSummary';
import Script from 'next/script';
import React from 'react';
import { Book, Lightbulb, Clock, Target, Sparkles } from 'lucide-react';
import AdUnit from '@/components/AdUnit';
import ToolEngagement from '@/components/tool-engagement';

export const metadata = {
  title: "AI PDF Summarizer | Summarize long PDFs for free",
  description: "Quickly summarize PDF files and extract key highlights with our AI PDF Summarizer. Powered by advanced AI technology, it's the best tool for summarizing large and scanned PDFs online for free.",
};

export default function AIPdfSummarizerPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-ai-pdf-summarizer" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI PDF Summarizer - Saze AI",
          "description": metadata.description,
          "url": "https://sazeai.com/tools/ai-pdf-summarizer",
        })}
      </Script>
      <Script id="schema-ai-pdf-summarizer-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI PDF Summarizer | Summarize long PDFs for free - Saze AI",
          "description": metadata.description,
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-pdf-summarizer",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>
      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <PdfSummarizer />
        <ToolEngagement toolName="AI PDF Summarizer" />
        <AdUnit client="ca-pub-7915372771416695" slot="8441706260" style={{ marginBottom: '20px' }} />

        {/* Content Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">AI PDF Summarizer Free</h2>
            <p className="leading-relaxed text-base text-muted-foreground text-center">
              Easily upload a PDF file to generate an AI-powered summary or extract key highlights with precision. Our tool, powered by advanced <strong>AI PDF ChatGPT</strong> technology, helps you summarize content in seconds—no registration required.
            </p>
            <p className="leading-relaxed text-base text-muted-foreground text-center mt-4">
              With support for large documents and a user-friendly interface, this tool acts as a <strong>best PDF summary generator free</strong>, perfect for students, professionals, and researchers. Whether you need to <strong>summarize PDFs online free</strong> or quickly extract essential points from scanned PDFs, our AI ensures fast and accurate results.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Features</h2>
            <ul className="space-y-4">
              <li><strong>Efficient Summarization</strong>: Process PDFs up to 10MB and generate concise summaries in seconds.</li>
              <li><strong>Customizable Length</strong>: Adjust the summary word count to fit your needs using the slider.</li>
              <li><strong>Key Highlights Tab</strong>: Quickly access the most important points from your document for instant reference.</li>
              <li><strong>No Signup Required</strong>: Upload and summarize without the hassle of creating an account.</li>
              <li><strong>AI PDF Reader</strong>: Use it to analyze and skim through lengthy documents efficiently.</li>
              <li><strong>Large PDF Summarizer</strong>: Works seamlessly with longer files, making it the <strong>best PDF summarizer</strong> for complex documents.</li>
            </ul>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">How to Use the Tool</h2>
            <ol className="space-y-4">
              <li><strong>Upload a PDF</strong>: Click “Choose file” and select the PDF you want to summarize (up to 10MB).</li>
              <li><strong>Set Summary Length</strong>: Use the slider to customize the word limit for your summary.</li>
              <li><strong>Click “Process PDF”</strong>: Let the AI analyze and summarize your document.</li>
              <li><strong>Review Output</strong>: Switch between the “Summary” and “Key Highlights” tabs to access the results.</li>
            </ol>
          </div>
        </section>

        <AdUnit client="ca-pub-7915372771416695" slot="8441706260" style={{ marginBottom: '20px' }} />
      </div>
    </>
  );
}
