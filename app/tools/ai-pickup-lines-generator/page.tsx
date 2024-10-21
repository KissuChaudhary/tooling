import Head from 'next/head';
import PickupLineGenerator from '@/components/AIPickupLineForm';
import Script from 'next/script';
import React from 'react';
import AdUnit from '@/components/AdUnit'

import { Heart, Smile, Clock, Fingerprint, MessageCircle, Star } from 'lucide-react';

export const metadata = {
  title: "AI Pickup Lines Generator | Funny & Creative Pickup Lines Online Free - Saze AI",
  description: "Generate funny and creative pickup lines with the AI Pickup Lines Generator by Saze AI. Input your context and style for a personalized pickup line instantly.",
  keywords: "AI pickup lines generator free, AI pickup lines generator funny, pick-up line generator by name, AI Pickup Lines Generator In Hindi, ChatGPT pickup line Generator, Pick up line generator by word, Draft with AI pickup lines",
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

export default function AIPickupLineGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-pickup-line-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Pickup Lines Generator - Saze AI",
          "description": "Generate funny and creative pickup lines with the AI Pickup Lines Generator by Saze AI. Input your context and style for a personalized pickup line instantly.",
          "url": "https://sazeai.com/tools/ai-pickup-line-generator",
        })}
      </Script>
      <Script id="schema-ai-pickup-line-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Pickup Lines Generator - Saze AI",
          "description": "Generate funny and creative pickup lines with the AI Pickup Lines Generator by Saze AI. Input your context and style for a personalized pickup line instantly.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-pickup-line-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <PickupLineGenerator />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI Pickup Lines Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Pickup Lines Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Pickup Lines Generator by Saze AI helps you create hilarious, charming, or even poetic pickup lines based on your input. Whether you’re looking for a funny icebreaker, a smooth compliment, or a unique line to impress someone special, this generator delivers personalized pickup lines in seconds. Simply enter your context and choose your style to get started.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Pickup Lines Generator</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Heart size={24} />}
                title="Personalized Pickup Lines"
                description="Craft custom pickup lines based on your specific context, making it relevant and effective."
              />
              <BenefitCard
                icon={<Smile size={24} />}
                title="Funny & Playful Styles"
                description="Choose from a variety of styles to create funny, charming, or even cheesy pickup lines that suit your mood."
              />
              <BenefitCard
                icon={<Clock size={24} />}
                title="Fast & Effortless"
                description="Get instant results without the hassle of thinking up pickup lines on your own."
              />
              <BenefitCard
                icon={<Star size={24} />}
                title="For Every Occasion"
                description="Generate pickup lines for various situations, from casual conversations to romantic occasions."
              />
              <BenefitCard
                icon={<Fingerprint size={24} />}
                title="Available in Multiple Languages"
                description="Create pickup lines in different languages, including Hindi, and make your approach even more unique."
              />
              <BenefitCard
                icon={<MessageCircle size={24} />}
                title="Free to Use"
                description="Use the AI Pickup Lines Generator for free and get creative lines in seconds."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Pickup Line Generator</h2>
    <div className="space-y-8">
      <StepItem
        number="1"
        title="Enter the Target's Name (Optional)"
        description="Start by entering the name of the person you want to impress. This is optional, but personalizing your pickup line can make it feel more genuine and special."
      />
      <StepItem
        number="2"
        title="Select Target's Gender"
        description="Next, choose the gender of your target. This helps ensure that the pickup line resonates with them, making your approach more effective and thoughtful."
      />
      <StepItem
        number="3"
        title="Describe the Setting"
        description="Think about where you’ll be using this pickup line. Is it at a cozy coffee shop, a lively bar, or perhaps a quiet library? Entering the setting provides context that can make your line more relatable and situational."
      />
      <StepItem
        number="4"
        title="Choose a Pickup Line Style"
        description="Do you want your pickup line to be funny, romantic, or playful? Selecting a style sets the tone for your approach, so consider what might work best for the situation and your target."
      />
      <StepItem
        number="5"
        title="Generate Your Pickup Line"
        description="Once you've filled in the details, click 'Generate Pickup Line.' In an instant, you’ll receive a unique line crafted just for you, ready to break the ice and spark a conversation!"
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
