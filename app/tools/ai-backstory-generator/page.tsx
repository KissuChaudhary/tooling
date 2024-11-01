import Head from 'next/head';
import BackstoryGenerator from '@/components/AIBackstoryForm';
import Script from 'next/script';
import React from 'react';
import { Book, Lightbulb, Clock, Target, Sparkles } from 'lucide-react';
import AdUnit from '@/components/AdUnit'
import ToolEngagement from '@/components/tool-engagement'

export const metadata = {
  title: "AI Backstory Generator | Create Unique Character Backstories - Saze AI", 
  description: "Create unique, compelling character backstories effortlessly with our AI Backstory Generator. Ideal for writers, game developers, and storytellers.",
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

export default function AIBackstoryGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-ai-backstory-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Backstory Generator - Saze AI", 
          "description": "Create unique, compelling character backstories effortlessly with our AI Backstory Generator. Ideal for writers, game developers, and storytellers.",
          "url": "https://sazeai.com/tools/ai-backstory-generator", 
        })}
      </Script>
      <Script id="schema-ai-birthday-wish-generator-webapp" type="application/ld+json">
        {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "AI Backstory Generator - Saze AI",
            "description": "Create unique, compelling character backstories effortlessly with our AI Backstory Generator. Ideal for writers, game developers, and storytellers.",
            "applicationCategory": "EntertainmentApplication",
            "operatingSystem": "All",
            "url": "https://sazeai.com/tools/ai-backstory-generator",
            "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "USD",
            },
        })}
    </Script>
      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <BackstoryGenerator />
        <ToolEngagement 
          toolName="AI Backstory Generator"
        />
       <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI Backstory Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Backstory Generator</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Backstory Generator by SazeAI helps you craft compelling character backstories effortlessly. 
              Whether you're a writer, game developer, or storyteller, this tool uses advanced AI to generate rich, unique backgrounds for your characters, saving you time and sparking creativity.
              Simply provide a few key details about your character, such as their name, setting, and life events, and let the AI do the rest.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
              Benefits of Using the AI Backstory Generator
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Clock size={24} />}
                title="Time-Saving"
                description="Generate character backstories quickly, allowing you to focus on other creative aspects of storytelling."
              />
              <BenefitCard
                icon={<Lightbulb size={24} />}
                title="Creative Inspiration"
                description="Get unique ideas and new perspectives to enrich your characters' backgrounds and histories."
              />
              <BenefitCard
                icon={<Book size={24} />}
                title="Well-Structured"
                description="Ensure your backstories are cohesive and logically structured with clear events and character development."
              />
              <BenefitCard
                icon={<Target size={24} />}
                title="Customizable"
                description="Tailor the generated backstory to match the specific needs of your character and the world they live in."
              />
              <BenefitCard
                icon={<Sparkles size={24} />}
                title="Easy to Use"
                description="Our user-friendly interface makes it simple to input your character details and generate a backstory in seconds."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">
              How to Use the AI Backstory Generator
            </h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter Character Name"
                description="Start by entering your character's name. This will personalize the backstory for your character."
              />
              <StepItem
                number="2"
                title="Describe the Setting"
                description="Provide a brief description of the setting where your character exists (e.g., medieval fantasy, futuristic city, etc.)."
              />
              <StepItem
                number="3"
                title="List Key Events"
                description="List important events that shaped your character's life, such as significant achievements, tragedies, or turning points."
              />
              <StepItem
                number="4"
                title="Hit Generate Backstory"
                description="Click the 'Generate Backstory' button, and our AI will create a rich and compelling backstory based on the details you've provided."
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
