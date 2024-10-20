import Head from 'next/head';
import PoemGenerator from '@/components/AIPoemForm';
import Script from 'next/script';
import React from 'react';
import { BookOpen, Feather, UserCheck, Heart, Star, Smile } from 'lucide-react';

export const metadata = {
  title: "[FREE] AI Poem Generator - No Login, Unlimited Poems - Saze AI",
  description: "Generate unlimited poems with the FREE AI Poem Generator by Saze AI. No login required. Input your theme, style, and length to create beautiful, customized poems instantly.",
  keywords: "AI poem Generator free, AI Poem Generator Hindi, Google AI Poem Generator, AI poem Generator ChatGPT, Best AI poem Generator, AI poem generator tagalog, Rhyming poem generator, Poem generator from paragraph",
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

export default function AIPoemGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-poem-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "[FREE] AI Poem Generator - Saze AI",
          "description": "Generate unlimited poems with the FREE AI Poem Generator by Saze AI. No login required. Input your theme, style, and length to create beautiful, customized poems instantly.",
          "url": "https://sazeai.com/tools/ai-poem-generator",
        })}
      </Script>
      <Script id="schema-ai-poem-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "[FREE] AI Poem Generator - Saze AI",
          "description": "Generate unlimited poems with the FREE AI Poem Generator by Saze AI. No login required. Input your theme, style, and length to create beautiful, customized poems instantly.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-poem-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <PoemGenerator />

        {/* What is AI Poem Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is the AI Poem Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Poem Generator by Saze AI allows you to create beautiful and meaningful poems instantly. Whether you need a rhyming poem, a free verse, or a haiku, this tool can generate poems based on your selected theme, style, and length. Perfect for expressing emotions, creating gifts, or simply enjoying the art of poetry.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Poem Generator</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<BookOpen size={24} />}
                title="Creative Freedom"
                description="Generate poems in any style—sonnet, haiku, free verse—and tailor them to your preferred theme."
              />
              <BenefitCard
                icon={<Feather size={24} />}
                title="Instant Results"
                description="Create poems in seconds without needing any writing experience. Input your preferences, and the AI will do the rest."
              />
              <BenefitCard
                icon={<Star size={24} />}
                title="No Login Required"
                description="Enjoy unlimited access to generate as many poems as you want, with no account or login required."
              />
              <BenefitCard
                icon={<Smile size={24} />}
                title="Poems in Multiple Languages"
                description="Generate poems in various languages, including Hindi, Tagalog, and more, for a truly diverse experience."
              />
              <BenefitCard
                icon={<UserCheck size={24} />}
                title="For All Occasions"
                description="Whether you're creating a romantic poem for someone special or a thoughtful piece for a personal project, this tool has you covered."
              />
              <BenefitCard
                icon={<Heart size={24} />}
                title="Completely Free"
                description="Use the AI Poem Generator for free—unlimited poems, with no hidden costs or restrictions."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Poem Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter the Theme"
                description="Provide the theme for your poem, whether it's love, nature, friendship, or any other subject that inspires you."
              />
              <StepItem
                number="2"
                title="Choose the Style"
                description="Select the poem style you’d like to use, such as a sonnet, haiku, rhyming verse, or free verse."
              />
              <StepItem
                number="3"
                title="Set the Length"
                description="Choose the length of your poem. You can generate short, medium, or long poems depending on your needs."
              />
              <StepItem
                number="4"
                title="Generate Your Poem"
                description="Click 'Generate Poem' and the AI will craft a unique, customized poem for you based on your inputs."
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
