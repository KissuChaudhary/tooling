import Head from 'next/head';
import LinkedInHeadlineGenerator from '@/components/LinkedInHeadlineForm';
import Script from 'next/script';
import React from 'react';
import { Heart, Smile, Hash, MessageCircle, Target, Users } from 'lucide-react';

export const metadata = {
  title: "AI LinkedIn Headline Generator | Free Tool for Perfect LinkedIn Headlines",
  description: "Generate optimized LinkedIn headlines using the AI LinkedIn Headline Generator. Input your profession, skills, industry, tone, and get a personalized LinkedIn headline for free!",
  keywords: "AI LinkedIn Headline Generator, LinkedIn headline tool, personalized LinkedIn headlines, LinkedIn optimization, free LinkedIn tool, professional headlines",
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

export default function AILinkedInHeadlineGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-linkedin-headline-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI LinkedIn Headline Generator",
          "description": "Generate optimized LinkedIn headlines using the AI LinkedIn Headline Generator. Input your profession, skills, industry, and tone, and get a personalized headline in seconds.",
          "url": "https://www.yoursite.com/tools/ai-linkedin-headline-generator",
        })}
      </Script>
      <Script id="schema-ai-linkedin-headline-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI LinkedIn Headline Generator",
          "description": "Generate optimized LinkedIn headlines using the AI LinkedIn Headline Generator. Input your profession, skills, industry, and tone, and get a personalized headline in seconds.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://www.yoursite.com/tools/ai-linkedin-headline-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
      <LinkedInHeadlineGenerator />
        {/* What is AI LinkedIn Headline Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
              AI LinkedIn Headline Generator
            </h2>
            <p className="leading-relaxed text-base text-muted-foreground text-center">
              The AI LinkedIn Headline Generator is a free tool designed to help professionals create optimized, personalized LinkedIn headlines in seconds. Input your profession, skills, industry, and desired tone, and let the AI generate a headline that stands out.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
              Benefits of Using the AI LinkedIn Headline Generator
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Heart size={24} />}
                title="Personalized Headlines"
                description="Tailored to your profession, skills, and industry for maximum impact."
              />
              <BenefitCard
                icon={<Smile size={24} />}
                title="AI-Driven Suggestions"
                description="Get unique and SEO-optimized LinkedIn headlines with minimal input."
              />
              <BenefitCard
                icon={<Hash size={24} />}
                title="Tone Customization"
                description="Choose the perfect tone—professional, friendly, or engaging—to match your personal brand."
              />
              <BenefitCard
                icon={<MessageCircle size={24} />}
                title="Free and Easy to Use"
                description="Completely free and user-friendly, generate your headline with just a few clicks."
              />
              <BenefitCard
                icon={<Target size={24} />}
                title="Boost Profile Visibility"
                description="Create headlines that improve visibility and engagement on LinkedIn."
              />
              <BenefitCard
                icon={<Users size={24} />}
                title="Optimized for LinkedIn"
                description="Generate headlines that resonate with your network and attract attention."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI LinkedIn Headline Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter Your Profession"
                description="Provide your profession to start the headline generation."
              />
              <StepItem
                number="2"
                title="List Your Skills"
                description="Input your key skills that you want to showcase in your headline."
              />
              <StepItem
                number="3"
                title="Specify Your Industry"
                description="Add your industry to tailor the headline to your professional domain."
              />
              <StepItem
                number="4"
                title="Select the Tone"
                description="Choose from different tones like professional, engaging, or casual."
              />
              <StepItem
                number="5"
                title="Generate Your Headline"
                description="Click 'Generate Headline' and get your personalized LinkedIn headline instantly."
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
