import Head from 'next/head';
import QuotesGenerator from '@/components/AIQuotesForm';
import Script from 'next/script';
import React from 'react';
import { Quote, Smile, PenTool, Target, Camera, Brain } from 'lucide-react';
import AdUnit from '@/components/AdUnit'

export const metadata = {
  title: "AI Quotes Generator 【No Login, Free & Instant】",
  description: "Generate inspiring, funny, or philosophical quotes instantly with the AI Quotes Generator. Free to use, no login required, and perfect for creating text or image-based quotes.",
  keywords: "AI quotes generator free, AI quote image generator, Free AI quote generator from text, Best AI quote generator, Quote generator with picture, AI quotes generator from text, AI quotes generator funny, Short quote generator",
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

export default function AIQuoteGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-quote-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Quotes Generator - Saze AI",
          "description": "Generate quotes instantly with the AI Quotes Generator by Saze AI. Perfect for creating funny, inspiring, or philosophical quotes.",
          "url": "https://sazeai.com/tools/ai-quotes-generator",
        })}
      </Script>
      <Script id="schema-ai-quote-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Quotes Generator - Saze AI",
          "description": "Create quotes with AI quickly. Whether it’s motivational or humorous, the AI Quotes Generator is free, fast, and easy to use.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-quotes-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <QuotesGenerator />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI Quotes Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is the AI Quotes Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Quotes Generator by Saze AI helps you create personalized, meaningful, or funny quotes based on your selected topic and style. Whether you need a motivational quote, a humorous one-liner, or a philosophical statement, this tool generates quotes quickly and easily. You can also generate image-based quotes for social media posts.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Quotes Generator</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Quote size={24} />}
                title="Generate Quotes Instantly"
                description="Create quotes in seconds based on any topic or style, from inspirational to funny."
              />
              <BenefitCard
                icon={<Smile size={24} />}
                title="For Every Mood"
                description="Generate quotes that match any tone, including motivational, philosophical, or humorous."
              />
              <BenefitCard
                icon={<PenTool size={24} />}
                title="Perfect for Social Media"
                description="Create quotes with text or images, ideal for sharing on social platforms like Instagram or Twitter."
              />
              <BenefitCard
                icon={<Target size={24} />}
                title="Customizable"
                description="Add your own topics and styles to generate personalized quotes that resonate with your audience."
              />
              <BenefitCard
                icon={<Camera size={24} />}
                title="Quote Image Generator"
                description="Generate beautiful image quotes for use in graphics, blog posts, and social media."
              />
              <BenefitCard
                icon={<Brain size={24} />}
                title="Free & Unlimited"
                description="Use the AI Quotes Generator for free, with no login required, and generate as many quotes as you want."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Quotes Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter the Topic"
                description="Provide the topic of the quote, whether it’s about love, success, motivation, or any other subject."
              />
              <StepItem
                number="2"
                title="Describe the Style"
                description="Specify the style of the quote, such as inspirational, humorous, or philosophical."
              />
              <StepItem
                number="3"
                title="Generate Your Quote"
                description="Click 'Generate Quote' to instantly create a unique and meaningful quote."
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
