import Head from 'next/head';
import ConclusionGenerator from '@/components/AIConclusionForm';
import Script from 'next/script';
import React from 'react';
import { BookOpen, List, Type, CheckCircle } from 'lucide-react';
import AdUnit from '@/components/AdUnit'
import ToolEngagement from '@/components/tool-engagement'

export const metadata = {
  title: "AI Conclusion Generator | Create Effective Conclusions - Saze AI",
  description: "Generate concise and impactful conclusions for essays, reports, or any writing projects with our AI Conclusion Generator. Save time and enhance your writing.",
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

export default function AIConclusionGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-ai-conclusion-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Conclusion Generator - Saze AI",
          "description": "Generate concise and impactful conclusions for essays, reports, or any writing projects with our AI Conclusion Generator. Save time and enhance your writing.",
          "url": "https://sazeai.com/tools/ai-conclusion-generator",
        })}
      </Script>
      <Script id="schema-ai-conclusion-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Conclusion Generator - Saze AI",
          "description": "Generate concise and impactful conclusions for essays, reports, or any writing projects with our AI Conclusion Generator. Save time and enhance your writing.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-conclusion-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <ConclusionGenerator />
        <ToolEngagement 
          toolName="AI Conclusion Generator"
        />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI Conclusion Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Conclusion Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Conclusion Generator by Saze AI is designed to help you craft well-rounded conclusions for essays, reports, or any form of writing. By entering key points, tone, and the topic, the AI creates a concise and clear conclusion that wraps up your writing effectively.
              Perfect for students, professionals, or anyone looking to generate summaries with ease.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Conclusion Generator</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<BookOpen size={24} />}
                title="Summarizes Key Points"
                description="Effortlessly summarize your main ideas and arguments."
              />
              <BenefitCard
                icon={<List size={24} />}
                title="Organized Structure"
                description="Produces structured conclusions that flow logically and cohesively."
              />
              <BenefitCard
                icon={<Type size={24} />}
                title="Customizable Tone"
                description="Set the tone of the conclusion to match your writing style."
              />
              <BenefitCard
                icon={<CheckCircle size={24} />}
                title="Instant Results"
                description="Generate conclusions instantly, saving you time and effort."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Conclusion Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter the Topic"
                description="Start by entering the main topic of your conclusion, like the subject or core idea of your paper."
              />
              <StepItem
                number="2"
                title="Provide Key Points"
                description="Enter the key points or arguments that you want to summarize in the conclusion."
              />
              <StepItem
                number="3"
                title="Set the Tone"
                description="Choose the tone for your conclusion, whether it's formal, persuasive, reflective, or any other style."
              />
              <StepItem
                number="4"
                title="Generate Conclusion"
                description="Click 'Generate Conclusion' and instantly get a concise, well-crafted conclusion for your writing."
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
