import Head from 'next/head';
import IntroductionWriter from '@/components/AIIntroForm';
import Script from 'next/script';
import React from 'react';
import { Hash, Heart, Smile, MessageCircle, Target, Users } from 'lucide-react';

export const metadata = {
  title: "AI Introduction Writer | Generate Captivating Introductions - Saze AI",
  description: "Create captivating introductions with the AI Introduction Writer by Saze AI. Input your topic, audience, tone, and generate a personalized introduction in seconds.",
  keywords: "AI Introduction Writer, content writing, AI content generation, personalized introductions, AI tools for writing, Saze AI",
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

export default function AIIntroductionWriterPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-introduction-writer" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Introduction Writer - Saze AI",
          "description": "Create captivating introductions with the AI Introduction Writer by Saze AI. Input your topic, audience, tone, and generate a personalized introduction in seconds.",
          "url": "https://sazeai.com/tools/ai-introduction-writer",
        })}
      </Script>
      <Script id="schema-ai-introduction-writer-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Introduction Writer - Saze AI",
          "description": "Create captivating introductions with the AI Introduction Writer by Saze AI. Input your topic, audience, tone, and generate a personalized introduction in seconds.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-introduction-writer",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <IntroductionWriter />

        {/* What is AI Introduction Writer Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Introduction Writer?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Introduction Writer by Saze AI is a tool designed to help you craft compelling and personalized introductions for your content. Whether you're writing an essay, a blog post, or marketing material, this tool ensures your introduction is tailored to your topic, audience, and tone, creating a captivating opening that draws readers in.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Introduction Writer</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Heart size={24} />}
                title="Custom Topics"
                description="Generate introductions based on any topic—business, education, marketing, or personal projects."
              />
              <BenefitCard
                icon={<Smile size={24} />}
                title="Targeted Audience"
                description="Tailor your introduction to resonate with your specific audience, ensuring higher engagement."
              />
              <BenefitCard
                icon={<Hash size={24} />}
                title="Optimized Tone"
                description="Choose from different tones—friendly, formal, persuasive—to set the perfect mood for your content."
              />
              <BenefitCard
                icon={<MessageCircle size={24} />}
                title="Compelling Openings"
                description="Create attention-grabbing openings that entice readers to continue reading your content."
              />
              <BenefitCard
                icon={<Target size={24} />}
                title="Audience-Specific Messages"
                description="Ensure your message hits the right audience by customizing the introduction to their interests."
              />
              <BenefitCard
                icon={<Users size={24} />}
                title="Increase Engagement"
                description="Boost engagement by creating introductions that encourage readers to explore further."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Introduction Writer</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter the Topic"
                description="Provide the main topic for your introduction, whether it's for a business proposal, blog post, or creative project."
              />
              <StepItem
                number="2"
                title="Specify Your Audience"
                description="Describe your target audience so the introduction is crafted to resonate with their preferences and interests."
              />
              <StepItem
                number="3"
                title="Select the Tone"
                description="Choose the tone that matches your message, such as formal, friendly, or persuasive, depending on your content type."
              />
              <StepItem
                number="4"
                title="Generate Your Introduction"
                description="Click 'Generate Introduction' to create a personalized, captivating introduction in seconds."
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
