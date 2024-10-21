import Head from 'next/head';
import RhymeGenerator from '@/components/AIRhymeForm';
import Script from 'next/script';
import React from 'react';
import { Music, PenTool, Mic, Smile, UserCheck, Speaker } from 'lucide-react';
import AdUnit from '@/components/AdUnit'

export const metadata = {
  title: "AI Rhyme Generator 【No Login, Unlimited & Free】",
  description: "Generate perfect rhymes for your poems, raps, and songs instantly with the AI Rhyme Generator. No login required, unlimited use, and easy to generate rhymes for any word.",
  keywords: "AI rhyme generator free, AI rhyme generator for poems, Rhyme generator rap, AI rhyme generator funny, AI rhyme generator Hindi, Rhyme generator sentences, Text to rhyme voice generator, Rhyme generator app",
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

export default function AIRhymeGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-rhyme-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Rhyme Generator - Saze AI",
          "description": "Generate rhymes easily with the AI Rhyme Generator by Saze AI. Perfect for poets, rappers, and songwriters.",
          "url": "https://sazeai.com/tools/ai-rhyme-generator",
        })}
      </Script>
      <Script id="schema-ai-rhyme-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Rhyme Generator - Saze AI",
          "description": "Create rhymes instantly for any word with the AI Rhyme Generator. Free, fast, and no login required.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-rhyme-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <RhymeGenerator />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI Rhyme Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Rhyme Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Rhyme Generator by Saze AI helps you find the perfect rhymes for your creative writing. Whether you’re writing poems, raps, or lyrics, this tool generates rhymes instantly based on any word you input. Choose the number of rhymes you want and generate everything from funny lines to deep rhymes in multiple languages.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Rhyme Generator</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Music size={24} />}
                title="Perfect for Poems & Songs"
                description="Generate rhymes that fit your poem, song, or rap effortlessly."
              />
              <BenefitCard
                icon={<Mic size={24} />}
                title="For Rappers & Lyricists"
                description="Create rhymes suitable for rap lyrics or hip-hop verses."
              />
              <BenefitCard
                icon={<PenTool size={24} />}
                title="Funny & Playful Rhymes"
                description="Need a humorous or playful rhyme? Generate funny rhymes instantly."
              />
              <BenefitCard
                icon={<UserCheck size={24} />}
                title="Supports Multiple Languages"
                description="Generate rhymes in different languages like Hindi for a global audience."
              />
              <BenefitCard
                icon={<Speaker size={24} />}
                title="Text-to-Voice Options"
                description="Combine text-to-rhyme and voice generation to create spoken word pieces or tracks."
              />
              <BenefitCard
                icon={<Smile size={24} />}
                title="Free & Unlimited Use"
                description="Enjoy unlimited rhymes with no login or restrictions. Use it as much as you like."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Rhyme Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter the Word to Rhyme"
                description="Type the word you want to find rhymes for, whether it's for a poem, a song, or a rap."
              />
              <StepItem
                number="2"
                title="Select Number of Rhymes"
                description="Choose how many rhymes you want to generate, from 5 to unlimited."
              />
              <StepItem
                number="3"
                title="Generate Rhymes"
                description="Click 'Generate Rhymes' and instantly get a list of rhyming words to use in your writing."
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
