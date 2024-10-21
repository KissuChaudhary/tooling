import Head from 'next/head';
import Script from 'next/script';
import React from 'react';
import LyricGenerator from '@/components/AILyricForm';
import AdUnit from '@/components/AdUnit'

import { Hash, Heart, Music, Smile } from 'lucide-react';

export const metadata = {
  title: "AI Lyric Generator Free | Generate Custom Lyrics for Any Genre",
  description: "Create unique song lyrics with the AI Lyric Generator. Input your genre, theme, and mood to instantly generate custom lyrics. Free tool for artists, lyricists, and songwriters.",
  keywords: "AI lyrics Generator free, AI lyrics Generator Hindi, Lyric generator free, AI lyric generator based on artist, Song lyrics generator from title, Song generator with music, Lyrics to song generator, Song lyrics Generator Hindi",
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

export default function AILyricGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-lyric-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Lyric Generator",
          "description": "Create unique song lyrics with the AI Lyric Generator. Input your genre, theme, and mood to instantly generate custom lyrics.",
          "url": "https://www.yoursite.com/tools/ai-lyric-generator",
        })}
      </Script>
      <Script id="schema-ai-lyric-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Lyric Generator",
          "description": "Create unique song lyrics with the AI Lyric Generator for FREE. Input your genre, theme, and mood to generate custom lyrics.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://www.yoursite.com/tools/ai-lyric-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
      <LyricGenerator />
      <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI Lyric Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
              What is AI Lyric Generator?
            </h2>
            <p className="leading-relaxed text-base text-muted-foreground text-center">
              The AI Lyric Generator allows you to create custom song lyrics in any genre, from rock to pop and everything in between. Simply input the genre, theme, and mood to generate unique lyrics in seconds. Ideal for musicians, songwriters, and hobbyists alike.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
              Benefits of Using the AI Lyric Generator
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Music size={24} />}
                title="Customizable by Genre"
                description="Generate lyrics for any music genre, from pop to hip-hop, rock, and more."
              />
              <BenefitCard
                icon={<Heart size={24} />}
                title="Tailored Themes"
                description="Input specific themes to ensure the lyrics align with your creative vision."
              />
              <BenefitCard
                icon={<Smile size={24} />}
                title="Match Your Mood"
                description="Create lyrics that match the mood of your song, whether it’s melancholic, upbeat, or energetic."
              />
              <BenefitCard
                icon={<Hash size={24} />}
                title="Based on Artist or Title"
                description="Generate lyrics inspired by your favorite artists or songs with AI lyric generation based on titles."
              />
              <BenefitCard
                icon={<Music size={24} />}
                title="Available in Hindi"
                description="Use the AI lyric generator in Hindi to create songs in your preferred language."
              />
              <BenefitCard
                icon={<Smile size={24} />}
                title="Free to Use"
                description="Generate lyrics for free, without any charges or subscriptions."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Lyric Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter the Genre"
                description="Select your music genre, whether it’s rock, pop, hip-hop, or another style."
              />
              <StepItem
                number="2"
                title="Choose the Theme"
                description="Provide a theme for the lyrics, such as love, life, or adventure."
              />
              <StepItem
                number="3"
                title="Set the Mood"
                description="Pick a mood for the song, whether it’s upbeat, melancholic, or energetic."
              />
              <StepItem
                number="4"
                title="Generate Your Lyrics"
                description="Click 'Generate Lyrics' to instantly create a set of unique song lyrics tailored to your inputs."
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
