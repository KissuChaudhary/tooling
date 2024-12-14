import Head from 'next/head';
import AIImageGenerator from '@/components/AIImageGenerator';
import Script from 'next/script';
import React from 'react';
import { Camera, Brush, Clock, Sparkles, Layers } from 'lucide-react';
import AdUnit from '@/components/AdUnit';
import ToolEngagement from '@/components/tool-engagement';

export const metadata = {
  title: "AI Image Generator | Create Stunning AI-Generated Images",
  description: "Generate high-quality, AI-driven images effortlessly with our AI Image Generator. Perfect for artists, marketers, and content creators.",
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

export default function AIImageGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-ai-image-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Image Generator - Saze AI",
          "description": "Generate high-quality, AI-driven images effortlessly with our AI Image Generator. Perfect for artists, marketers, and content creators.",
          "url": "https://sazeai.com/tools/ai-image-generator",
        })}
      </Script>
      <Script id="schema-ai-image-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Image Generator - Saze AI",
          "description": "Generate high-quality, AI-driven images effortlessly with our AI Image Generator. Perfect for artists, marketers, and content creators.",
          "applicationCategory": "DesignApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-image-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>
      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <AIImageGenerator />
        <ToolEngagement toolName="AI Image Generator" />
        <AdUnit
          client="ca-pub-7915372771416695"
          slot="8441706260"
          style={{ marginBottom: '20px' }}
        />
        {/* What is AI Image Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Image Generator</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Image Generator by SazeAI allows you to create stunning, high-quality images tailored to your needs. 
              Ideal for artists, marketers, and content creators, this tool leverages cutting-edge AI to generate images based on your input. 
              Simply provide a prompt describing your desired image, and the AI will bring your vision to life.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
              Benefits of Using the AI Image Generator
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Clock size={24} />}
                title="Time-Saving"
                description="Quickly generate professional-quality images without spending hours designing from scratch."
              />
              <BenefitCard
                icon={<Brush size={24} />}
                title="Creative Freedom"
                description="Explore limitless creative possibilities with unique, AI-generated designs."
              />
              <BenefitCard
                icon={<Camera size={24} />}
                title="High-Quality Output"
                description="Get stunning, high-resolution images perfect for personal or commercial use."
              />
              <BenefitCard
                icon={<Sparkles size={24} />}
                title="Easy to Use"
                description="An intuitive interface makes it easy to create images even without design experience."
              />
              <BenefitCard
                icon={<Layers size={24} />}
                title="Versatile Applications"
                description="Use the generated images for marketing, social media, presentations, or creative projects."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">
              How to Use the AI Image Generator
            </h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter Your Prompt"
                description="Provide a brief description of the image you want to create, such as its style, elements, or theme."
              />
              <StepItem
                number="2"
                title="Customize Settings"
                description="Adjust optional parameters like resolution, color palette, or aspect ratio for more precise results."
              />
              <StepItem
                number="3"
                title="Click Generate"
                description="Hit the 'Generate' button to create your AI-generated image in seconds."
              />
              <StepItem
                number="4"
                title="Download Your Image"
                description="Once generated, download the image and use it in your projects."
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
