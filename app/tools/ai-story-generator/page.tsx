import Head from 'next/head';
import AIStoryGenerator from '@/components/AIStoryForm';
import Script from 'next/script';
import React from 'react';
import { Book, Edit, Star, Settings, Clipboard, Eye } from 'lucide-react';

export const metadata = {
  title: "[FREE] AI Story Generator | Create Unlimited Stories - Saze AI",
  description: "Generate unique and creative stories with the free AI Story Generator by Saze AI. Choose your genre, characters, setting, and plot points to unleash your imagination without any login or sign-up.",
  keywords: "AI story generator free unlimited, AI story generator free, AI story generator with pictures, AI story generator based on prompt, AI story generator no filter, AI story generator free no sign up, Best AI story generator, Best free AI story generator",
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

export default function AIStoryGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-story-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Story Generator - Saze AI",
          "description": "Generate unique and creative stories with the free AI Story Generator by Saze AI. Choose your genre, characters, setting, and plot points to unleash your imagination without any login or sign-up.",
          "url": "https://sazeai.com/tools/ai-story-generator",
        })}
      </Script>
      <Script id="schema-ai-story-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Story Generator - Saze AI",
          "description": "Generate unique and creative stories with the free AI Story Generator by Saze AI. Choose your genre, characters, setting, and plot points to unleash your imagination without any login or sign-up.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-story-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <AIStoryGenerator />

        {/* What is the AI Story Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is the AI Story Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Story Generator by Saze AI is a powerful tool designed to help you create captivating and original stories without the need for sign-ups or login. Simply input your preferred genre, characters, setting, and plot points to unleash your creativity and generate unique narratives instantly.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Story Generator</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Book size={24} />}
                title="Unlimited Story Creation"
                description="Generate as many stories as you like with no restrictions or sign-up required."
              />
              <BenefitCard
                icon={<Edit size={24} />}
                title="Flexible Input Options"
                description="Customize your story by selecting genre, characters, settings, and plot points."
              />
              <BenefitCard
                icon={<Star size={24} />}
                title="User-Friendly Interface"
                description="Easily navigate through the generator to create your stories effortlessly."
              />
              <BenefitCard
                icon={<Settings size={24} />}
                title="Diverse Genres Available"
                description="Choose from a wide range of genres to suit your storytelling preferences."
              />
              <BenefitCard
                icon={<Clipboard size={24} />}
                title="Inspiration for Writers"
                description="Use the generated stories as inspiration for your own writing projects."
              />
              <BenefitCard
                icon={<Eye size={24} />}
                title="Visual Storytelling Options"
                description="Explore the option to generate stories with accompanying pictures."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Story Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Select a Genre"
                description="Choose the genre of your story from various options available."
              />
              <StepItem
                number="2"
                title="Enter Character Details"
                description="Input the names and characteristics of your story's characters."
              />
              <StepItem
                number="3"
                title="Define the Setting"
                description="Provide details about the setting where your story takes place."
              />
              <StepItem
                number="4"
                title="Add Plot Points"
                description="Outline key plot points that you want to include in your story."
              />
              <StepItem
                number="5"
                title="Generate Your Story"
                description="Click 'Generate Story' to create your unique narrative in seconds!"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
