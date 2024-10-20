import Head from 'next/head';
import InstagramCaptionGenerator from '@/components/InstagramCaptionForm';
import Script from 'next/script';
import React from 'react';
import { Hash, Heart, Smile, MessageCircle } from 'lucide-react';

export const metadata = {
  title: "Free AI Instagram Caption Generator | Create Engaging Captions - Saze AI",
  description: "Generate creative and engaging Instagram captions with the AI Instagram Caption Generator by Saze AI. Input your topic, mood, hashtags, and call to action for a tailored caption instantly.",
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

export default function AIInstagramCaptionGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-ai-instagram-caption-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Free AI Instagram Caption Generator - Saze AI",
          "description": "Generate creative and engaging Instagram captions with the AI Instagram Caption Generator by Saze AI. Input your topic, mood, hashtags, and call to action for a tailored caption instantly.",
          "url": "https://sazeai.com/tools/ai-instagram-caption-generator",
        })}
      </Script>
      <Script id="schema-ai-instagram-caption-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Free AI Instagram Caption Generator - Saze AI",
          "description": "Generate creative and engaging Instagram captions with the AI Instagram Caption Generator by Saze AI for FREE. Input your topic, mood, hashtags, and call to action for a tailored caption instantly.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-instagram-caption-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <InstagramCaptionGenerator />

        {/* What is AI Instagram Caption Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Instagram Caption Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Instagram Caption Generator by Saze AI helps you craft engaging, creative, and tailor-made captions for your Instagram posts. Whether you're sharing a personal moment or promoting a brand, this generator ensures your captions capture attention, match your mood, and include relevant hashtags.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Instagram Caption Generator</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Heart size={24} />}
                title="Custom Topics"
                description="Generate captions based on any topic—personal updates, brand promotions, or creative moments."
              />
              <BenefitCard
                icon={<Smile size={24} />}
                title="Tailored Moods"
                description="Select the perfect mood—energetic, relaxed, playful—to align with the tone of your post."
              />
              <BenefitCard
                icon={<Hash size={24} />}
                title="Optimized Hashtags"
                description="Include relevant hashtags to ensure your posts reach the right audience and gain more visibility."
              />
              <BenefitCard
                icon={<MessageCircle size={24} />}
                title="Compelling CTAs"
                description="Add a call to action to prompt your followers to engage, whether it's liking, sharing, or commenting."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Instagram Caption Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter the Topic"
                description="Provide the topic for your caption, whether it’s about travel, fashion, fitness, or something else."
              />
              <StepItem
                number="2"
                title="Select the Mood"
                description="Choose the mood that matches the tone of your post, from fun and playful to serious and thoughtful."
              />
              <StepItem
                number="3"
                title="Add Hashtags"
                description="Input hashtags to ensure your caption reaches a wider audience. Choose hashtags relevant to your content."
              />
              <StepItem
                number="4"
                title="Enter Call to Action"
                description="Add a call to action to encourage engagement, such as ‘Comment your thoughts’ or ‘Tag a friend.’"
              />
              <StepItem
                number="5"
                title="Generate Your Caption"
                description="Click 'Generate Caption' to create your unique, tailored Instagram caption in seconds!"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
