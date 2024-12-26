import Head from 'next/head';
import PdfSummarizer from '@/components/AIPdfSummary';
import Script from 'next/script';
import React from 'react';
import { Book, Lightbulb, Clock, Target, Sparkles } from 'lucide-react';
import AdUnit from '@/components/AdUnit';
import ToolEngagement from '@/components/tool-engagement';
import EnhancedContent from '@/components/EnhancedPdfContent';

export const metadata = {
  title: "AI PDF Summarizer | Summarize long PDFs for free",
  description:
    "Quickly summarize PDF files and extract key highlights with our AI PDF Summarizer. Powered by advanced AI technology, it's the best tool for summarizing large and scanned PDFs online for free.",
};

interface BenefitCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => (
  <div className="bg-card text-card-foreground p-6 rounded-lg">
    <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
      {icon}
    </div>
    <h2 className="text-lg font-medium title-font mb-2">{title}</h2>
    <p className="leading-relaxed text-base">{description}</p>
  </div>
);

interface StepItemProps {
  number: string;
  title: string;
  description: string;
}

const StepItem: React.FC<StepItemProps> = ({ number, title, description }) => (
  <div className="flex mb-8">
    <div className="flex-shrink-0 mr-4">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
        {number}
      </div>
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

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
          "name": metadata.title,
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

        {/* What is AI PDF Summarizer Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI PDF Summarizer?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI PDF Summarizer is a cutting-edge tool that simplifies the way you engage with lengthy PDF files. Using advanced AI algorithms, it quickly analyzes your documents to extract key points and generate concise summaries. Whether you’re a student trying to grasp complex research papers, a professional reviewing detailed reports, or a researcher processing large volumes of information, this tool is tailored to save you time and effort.</p>
         <p>What sets it apart? You don’t need to sign up or go through any complicated setup. The AI PDF Summarizer delivers results in seconds, combining speed with exceptional accuracy. From highlighting critical insights to creating streamlined summaries, it’s your go-to solution for turning overwhelming PDFs into actionable knowledge. </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
              Benefits of Using the AI PDF Summarizer
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Clock size={24} />}
                title="Fast Summarization"
                description="Get clear summaries in just a few seconds. Skip the hassle of reading through long PDFs and save your time for what matters."
              />
              <BenefitCard
                icon={<Lightbulb size={24} />}
                title="Key Highlights"
                description="Find the most important details right away. The Key Highlights tab pulls out the main ideas so you don’t have to dig through the document."
              />
              <BenefitCard
                icon={<Book size={24} />}
                title="Large File Support"
                description="Got a big file? No problem. This tool works with PDFs up to 10MB, making it great for reports, research, or eBooks."
              />
              <BenefitCard
                icon={<Target size={24} />}
                title="Custom Length"
                description="Choose how detailed you want your summary. Use a simple slider to get the exact amount of information you need."
              />
              <BenefitCard
                icon={<Sparkles size={24} />}
                title="Scanned PDFs"
                description="Even scanned documents are easy to summarize. The Saze AI Free PDF Summarizer Tool reads them accurately and gives you the results you need."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI PDF Summarizer</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Upload a PDF"
                description="Click 'Choose File' and select the PDF you want to summarize (up to 10MB)."
              />
              <StepItem
                number="2"
                title="Set Summary Length"
                description="Use the slider to customize the word count for the summary."
              />
              <StepItem
                number="3"
                title="Click 'Process PDF'"
                description="Let the AI analyze the file and generate a concise summary."
              />
              <StepItem
                number="4"
                title="Review the Results"
                description="Switch between the Summary and Key Highlights tabs to view the output."
              />
            </div>
          </div>
        </section>
        <AdUnit client="ca-pub-7915372771416695" slot="8441706260" style={{ marginBottom: '20px' }} />
       <EnhancedContent />
      </div>
    </>
  );
}
