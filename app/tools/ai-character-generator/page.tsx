import Head from 'next/head';
import CharacterGenerator from '@/components/AICharacterForm';
import Script from 'next/script';
import React from 'react';
import { User, Star, Film, Tag, Lightbulb } from 'lucide-react';
import AdUnit from '@/components/AdUnit'

export const metadata = {
  title: "AI Character Generator | Create Unique Characters - Saze AI",
  description: "Effortlessly create unique and detailed characters with our AI Character Generator. Ideal for writers, game developers, and storytellers.",
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

export default function AICharacterGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-ai-character-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Character Generator - Saze AI",
          "description": "Effortlessly create unique and detailed characters with our AI Character Generator. Ideal for writers, game developers, and storytellers.",
          "url": "https://sazeai.com/tools/ai-character-generator",
        })}
      </Script>
      <Script id="schema-ai-character-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Character Generator - Saze AI",
          "description": "Effortlessly create unique and detailed characters with our AI Character Generator. Ideal for writers, game developers, and storytellers.",
          "applicationCategory": "EntertainmentApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-character-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <CharacterGenerator />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI Character Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Character Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Character Generator by Saze AI helps you create detailed, unique characters effortlessly. 
              Whether you're a writer, game developer, or storyteller, this tool uses advanced AI to generate rich character profiles based on genre, role, and traits. 
              Simply provide a few key details about the character and let the AI do the rest, sparking creativity and saving you time.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Character Generator</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<User size={24} />}
                title="Diverse Characters"
                description="Generate unique and diverse characters for any genre or story."
              />
              <BenefitCard
                icon={<Star size={24} />}
                title="Creative Freedom"
                description="Get new ideas and character concepts to fuel your creativity."
              />
              <BenefitCard
                icon={<Film size={24} />}
                title="Tailored Profiles"
                description="Create characters that fit perfectly into your story's world."
              />
              <BenefitCard
                icon={<Tag size={24} />}
                title="Easy to Customize"
                description="Customize the character's traits, role, and genre for a perfect match."
              />
              <BenefitCard
                icon={<Lightbulb size={24} />}
                title="Instant Results"
                description="Generate detailed character profiles in seconds, ready to use."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Character Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Select Genre"
                description="Start by selecting a genre for your character (e.g., fantasy, sci-fi, mystery)."
              />
              <StepItem
                number="2"
                title="Choose the Role"
                description="Enter the role of your character (e.g., protagonist, villain, sidekick)."
              />
              <StepItem
                number="3"
                title="Input Traits"
                description="List key traits of the character (e.g., brave, intelligent, mysterious) to personalize the profile."
              />
              <StepItem
                number="4"
                title="Generate Character"
                description="Click 'Generate Character' to instantly create a detailed character profile."
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
