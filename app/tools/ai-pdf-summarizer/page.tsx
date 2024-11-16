import Head from 'next/head';
import PdfSummarizer from '@/components/AIPdfSummarizer';
import Script from 'next/script';
import React from 'react';
import { Book, Feather, Target, Users, FileText } from 'lucide-react';
import AdUnit from '@/components/AdUnit';
import ToolEngagement from '@/components/tool-engagement';

export const metadata = {
  title: "AI PDF Summarizer | Best PDF Summary Generator - Saze AI",
  description: "Summarize PDFs instantly with Saze AI's AI PDF Summarizer. Easily extract key points, summarize large PDFs, and save time with this free online tool.",
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
          "description": "Summarize PDFs instantly with Saze AI's AI PDF Summarizer. Easily extract key points, summarize large PDFs, and save time with this free online tool.",
          "url": "https://sazeai.com/tools/ai-pdf-summarizer",
        })}
      </Script>
      <Script id="schema-ai-pdf-summarizer-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI PDF Summarizer - Saze AI",
          "description": "Summarize PDFs instantly with Saze AI's AI PDF Summarizer. Easily extract key points, summarize large PDFs, and save time with this free online tool.",
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
        <AdUnit
          client="ca-pub-7915372771416695"
          slot="8441706260"
          style={{ marginBottom: '20px' }}
        />
        {/* What is AI PDF Summarizer Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI PDF Summarizer?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI PDF Summarizer by Saze AI is a free online tool designed to extract key points and generate concise summaries from PDF files. Whether you're handling large PDFs or looking for quick insights, this tool simplifies the process, saving you time and effort.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI PDF Summarizer</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Book size={24} />}
                title="Summarize Large PDFs"
                description="Quickly generate summaries from lengthy PDF documents with precision and accuracy."
              />
              <BenefitCard
                icon={<Feather size={24} />}
                title="Free and Easy to Use"
                description="Access a powerful PDF summarizer for free with an intuitive interface for effortless usage."
              />
              <BenefitCard
                icon={<Users size={24} />}
                title="Optimized for All Audiences"
                description="Suitable for students, professionals, and researchers needing clear and concise PDF summaries."
              />
              <BenefitCard
                icon={<Target size={24} />}
                title="AI-Powered Accuracy"
                description="Leverage advanced AI to identify key information and provide the best summaries tailored to your needs."
              />
              <BenefitCard
                icon={<FileText size={24} />}
                title="Save Time"
                description="Focus on what matters most by summarizing PDFs online in seconds."
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
                title="Upload Your PDF"
                description="Drag and drop your PDF file or select it from your device to get started."
              />
              <StepItem
                number="2"
                title="Select Summary Type"
                description="Choose between short, medium, or detailed summaries based on your preferences."
              />
              <StepItem
                number="3"
                title="Click Summarize"
                description="Let the AI analyze your file and create a concise, high-quality summary in seconds."
              />
              <StepItem
                number="4"
                title="Download or Share"
                description="Save the summary to your device or share it online with ease."
              />
            </div>
          </div>
        </section>
        <AdUnit
          client="ca-pub-7915372771416695"
          slot="8441706260"
          style={{ marginBottom: '20px' }}
        />
      </div>
    </>
  );
}
