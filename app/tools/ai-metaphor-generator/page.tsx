import Head from 'next/head';
import MetaphorGenerator from '@/components/AIMetaphorForm';
import Script from 'next/script';
import React from 'react';
import { Lightbulb, BookOpen, Smile, Brain, Clock, MessageCircle } from 'lucide-react';
import AdUnit from '@/components/AdUnit'

export const metadata = {
  title: "AI Metaphor Generator | Create Unique Metaphors Online Free - Saze AI",
  description: "Generate creative and meaningful metaphors with the AI Metaphor Generator by Saze AI. Input your topic and context for a customized metaphor instantly.",
  keywords: "AI metaphor generator with meaning, AI metaphor generator funny, Simile generator, Metaphor Generator free, Song Metaphor Generator, Simile to Metaphor converter, Simile Generator free, Personification generator",
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

export default function AIMetaphorGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-metaphor-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Metaphor Generator - Saze AI",
          "description": "Generate creative and meaningful metaphors with the AI Metaphor Generator by Saze AI. Input your topic and context for a customized metaphor instantly.",
          "url": "https://sazeai.com/tools/ai-metaphor-generator",
        })}
      </Script>
      <Script id="schema-ai-metaphor-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Metaphor Generator - Saze AI",
          "description": "Generate creative and meaningful metaphors with the AI Metaphor Generator by Saze AI. Input your topic and context for a customized metaphor instantly.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-metaphor-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <MetaphorGenerator />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI Metaphor Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Metaphor Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Metaphor Generator by Saze AI helps you craft unique, creative metaphors based on your input. Whether you're writing a poem, a song, or an essay, this tool generates metaphors that enhance your message and make your content more vivid and impactful. Enter your topic and context to generate a metaphor that fits your needs.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Metaphor Generator</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Lightbulb size={24} />}
                title="Creative Metaphors"
                description="Generate metaphors that add depth and creativity to your writing, making your ideas more engaging."
              />
              <BenefitCard
                icon={<Smile size={24} />}
                title="Funny & Playful Options"
                description="Create fun and humorous metaphors for light-hearted content, perfect for social media or casual writing."
              />
              <BenefitCard
                icon={<BookOpen size={24} />}
                title="For Various Writing Styles"
                description="Generate metaphors for different types of content, including essays, poetry, songs, and more."
              />
              <BenefitCard
                icon={<Brain size={24} />}
                title="Simile to Metaphor Conversion"
                description="Easily transform your similes into powerful metaphors with the Simile to Metaphor Converter feature."
              />
              <BenefitCard
                icon={<Clock size={24} />}
                title="Fast & Effortless"
                description="Save time by generating metaphors quickly without struggling to find the perfect wording."
              />
              <BenefitCard
                icon={<MessageCircle size={24} />}
                title="Free & Easy to Use"
                description="Use the AI Metaphor Generator for free and start creating unique metaphors for any writing project."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Metaphor Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter the Topic"
                description="Input the topic you want the metaphor to be based on, whether it’s about life, love, or any other subject."
              />
              <StepItem
                number="2"
                title="Provide Context"
                description="Add additional context or details to shape the metaphor, helping the AI understand the direction of your idea."
              />
              <StepItem
                number="3"
                title="Generate Your Metaphor"
                description="Click 'Generate Metaphor' to instantly create a unique and meaningful metaphor for your writing."
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
