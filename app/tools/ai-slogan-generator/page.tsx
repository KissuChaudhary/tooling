import Head from 'next/head';
import SloganGenerator from '@/components/AISloganForm';
import Script from 'next/script';
import React from 'react';
import { Megaphone, Award, Star, Smile, Target, Users } from 'lucide-react';
import AdUnit from '@/components/AdUnit'

export const metadata = {
  title: "AI Slogan Generator 【No Login, Unlimited & Free】",
  description: "Create catchy and memorable slogans for your brand or product with the AI Slogan Generator. No login required, unlimited use, and instant slogan generation for any brand.",
  keywords: "AI slogan generator free, Free slogan maker, Catchy slogan generator, AI slogan maker for business, AI slogan generator for branding, Slogan generator for companies, AI business slogan creator",
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

export default function AISloganGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-slogan-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Slogan Generator - Saze AI",
          "description": "Generate catchy and memorable slogans for your business or brand with the AI Slogan Generator.",
          "url": "https://sazeai.com/tools/ai-slogan-generator",
        })}
      </Script>
      <Script id="schema-ai-slogan-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Slogan Generator - Saze AI",
          "description": "Create perfect slogans instantly for your brand or product with the AI Slogan Generator. Free, fast, and no login required.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-slogan-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <SloganGenerator />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI Slogan Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Slogan Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Slogan Generator by Saze AI helps you create catchy and unique slogans for your business or product. Simply provide the name of your brand, a description of your product or service, and your target audience to generate memorable and effective slogans instantly.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Slogan Generator</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Megaphone size={24} />}
                title="Catchy & Memorable"
                description="Generate slogans that stick in the minds of your audience, helping boost brand recognition."
              />
              <BenefitCard
                icon={<Star size={24} />}
                title="For Any Business or Product"
                description="Whether you're in retail, tech, or services, generate slogans that fit your brand perfectly."
              />
              <BenefitCard
                icon={<Award size={24} />}
                title="Professional & Creative"
                description="Create professional-grade slogans that convey the unique selling point of your business."
              />
              <BenefitCard
                icon={<Target size={24} />}
                title="Tailored to Your Audience"
                description="Generate slogans that resonate with your target audience and align with their preferences."
              />
              <BenefitCard
                icon={<Smile size={24} />}
                title="Quick & Easy"
                description="Get a slogan in seconds. No more brainstorming sessions—just enter a few details and generate!"
              />
              <BenefitCard
                icon={<Users size={24} />}
                title="Free & Unlimited Use"
                description="Use the AI Slogan Generator without any limitations. No login required and unlimited generation."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Slogan Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter Your Brand Name"
                description="Provide the name of your brand or business for which you want to create a slogan."
              />
              <StepItem
                number="2"
                title="Describe Your Product or Service"
                description="Give a brief description of your product, service, or the core offering of your business."
              />
              <StepItem
                number="3"
                title="Define Your Target Audience"
                description="Describe your target audience, including their interests or demographics."
              />
              <StepItem
                number="4"
                title="Generate Your Slogan"
                description="Click 'Generate Slogan' to instantly receive a catchy and impactful slogan for your brand."
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
