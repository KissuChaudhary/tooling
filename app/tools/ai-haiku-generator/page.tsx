import Head from 'next/head';
import HaikuGenerator from '@/components/AIHaikuForm';
import Script from 'next/script';
import React from 'react';
import { Feather, Sunset, Leaf, PenTool } from 'lucide-react';
import AdUnit from '@/components/AdUnit'
import ToolEngagement from '@/components/tool-engagement'

export const metadata = {
  title: "AI Haiku Generator | Create Beautiful Haikus Instantly - Saze AI",
  description: "Generate beautiful haikus with the AI Haiku Generator by Saze AI. Enter a theme and receive a creative, elegant haiku instantly.",
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

export default function AIHaikuGeneratorPage() {
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
          "name": "AI Haiku Generator - Saze AI",
          "description": "Generate beautiful haikus with the AI Haiku Generator by Saze AI. Enter a theme and receive a creative, elegant haiku instantly.",
          "url": "https://sazeai.com/tools/ai-haiku-generator",
        })}
      </Script>
      <Script id="schema-ai-haiku-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Haiku Generator - Saze AI",
          "description": "Generate beautiful haikus with the AI Haiku Generator by Saze AI. Enter a theme and receive a creative, elegant haiku instantly.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-haiku-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <HaikuGenerator />
        <ToolEngagement 
          toolName="AI Haiku Generator"
        />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI Haiku Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Haiku Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Haiku Generator by Saze AI is designed to help you create elegant, 17-syllable poems, known as haikus, in seconds. Simply enter a theme, and let the AI craft a haiku that reflects the beauty and simplicity of this ancient art form.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Haiku Generator</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Sunset size={24} />}
                title="Expressive Themes"
                description="Generate haikus on a variety of themes, from nature to emotions, with just a few clicks."
              />
              <BenefitCard
                icon={<Feather size={24} />}
                title="Instant Creativity"
                description="The AI creates haikus in seconds, offering a quick way to express ideas and emotions."
              />
              <BenefitCard
                icon={<Leaf size={24} />}
                title="Minimalist Poetry"
                description="Enjoy the beauty of simplicity with haikus that distill thoughts into just three lines."
              />
              <BenefitCard
                icon={<PenTool size={24} />}
                title="Refined Poetry Structure"
                description="Each haiku is perfectly structured with the traditional 5-7-5 syllable format."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Haiku Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter Your Theme"
                description="Start by entering the theme you want your haiku to reflect. This could be anything from nature to emotions or a moment in time."
              />
              <StepItem
                number="2"
                title="Generate Your Haiku"
                description="Once you've entered the theme, click 'Generate Haiku' and let the AI create a beautiful and concise 17-syllable poem for you."
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
