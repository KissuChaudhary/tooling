import Head from 'next/head';
import InstagramBioForm from '@/components/InstagramBioForm';
import Script from 'next/script';
import React from 'react';
import AdUnit from '@/components/AdUnit'
import ToolEngagement from '@/components/tool-engagement'
import { User, Heart, Lightbulb, Smile, CheckCircle } from 'lucide-react';

export const metadata = {
  title: "AI Instagram Bio Generator 【No Login, Instant】",
  description: "Create a captivating Instagram bio effortlessly with the AI Instagram Bio Generator. Input your name, occupation, interests, personality, and call to action to get a personalized bio.",
  keywords: "AI Instagram bio generator free, Instagram bio creator, bio generator for Instagram, free Instagram bio generator, best Instagram bio generator, AI bio generator for social media",
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

export default function AIInstagramBioGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-instagram-bio-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Instagram Bio Generator - Saze AI",
          "description": "Effortlessly create captivating Instagram bios with the AI Instagram Bio Generator. Enter your name, occupation, interests, personality, and call to action for a personalized bio.",
          "url": "https://sazeai.com/tools/ai-instagram-bio-generator",
        })}
      </Script>
      <Script id="schema-ai-instagram-bio-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Instagram Bio Generator - Saze AI",
          "description": "Instantly create a unique Instagram bio with the AI Instagram Bio Generator. No login required.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-instagram-bio-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <InstagramBioForm />
        <ToolEngagement 
          toolName="AI Instagram Bio Generator"
        />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI Instagram Bio Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Instagram Bio Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Instagram Bio Generator by Saze AI helps you craft personalized and engaging Instagram bios effortlessly. By entering your name, occupation, interests, personality, and a call to action, you can create a captivating bio that represents you or your brand.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Instagram Bio Generator</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<User size={24} />}
                title="Personalized Bios"
                description="Generate unique bios that reflect your personality and interests, making your profile stand out."
              />
              <BenefitCard
                icon={<Heart size={24} />}
                title="Engaging Content"
                description="Create captivating content that draws in followers and encourages engagement on your profile."
              />
              <BenefitCard
                icon={<Lightbulb size={24} />}
                title="Quick & Easy"
                description="Save time by instantly generating bios without the hassle of brainstorming."
              />
              <BenefitCard
                icon={<CheckCircle size={24} />}
                title="Free & Accessible"
                description="Use the AI Instagram Bio Generator for free with no login required, making it easy for everyone."
              />
              <BenefitCard
                icon={<Smile size={24} />}
                title="Perfect for Brands & Individuals"
                description="Ideal for businesses, influencers, and anyone looking to enhance their Instagram presence."
              />
              <BenefitCard
                icon={<Lightbulb size={24} />}
                title="Multiple Options"
                description="Receive various bio options to choose from, ensuring you find the perfect fit for your profile."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Instagram Bio Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter Your Name"
                description="Input your name (up to 30 characters) to personalize your bio."
              />
              <StepItem
                number="2"
                title="Specify Your Occupation"
                description="Describe your occupation (up to 50 characters) to give context to your bio."
              />
              <StepItem
                number="3"
                title="List Your Interests"
                description="Share your interests (up to 100 characters) to showcase your personality."
              />
              <StepItem
                number="4"
                title="Describe Your Personality"
                description="Provide details about your personality (up to 50 characters) for a tailored bio."
              />
              <StepItem
                number="5"
                title="Add a Call to Action"
                description="Include a call to action (up to 50 characters) to encourage engagement."
              />
              <StepItem
                number="6"
                title="Generate Your Bio"
                description="Click 'Generate Bio' to receive your personalized Instagram bio instantly."
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
