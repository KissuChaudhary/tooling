import Head from 'next/head';
import LoveLetterWriter from '@/components/AILoveForm';
import Script from 'next/script';
import React from 'react';
import { Clock, MessageCircle, Heart, PenTool, ThumbsUp, Smile } from 'lucide-react';
import AdUnit from '@/components/AdUnit'

export const metadata = {
  title: "AI Love Letter Writer | Personalized Romantic Letters with AI - Saze AI",
  description: "Write the perfect romantic love letter in seconds with our AI-powered love letter writer. Create heartfelt, personalized letters for your partner or crush effortlessly.",
};

interface BenefitCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => (
  <div className="bg-gray-50 p-6 rounded-lg">
    <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-4">
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
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white">
        {number}
      </div>
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default function AILoveLetterWriterPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      {/* Schema for AI Love Letter Writer */}
      <Script id="schema-ai-love-letter-writer" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Love Letter Writer - Saze AI",
          "description": "Create romantic, personalized love letters effortlessly with AI. Perfect for showing your affection and care to a partner, crush, or spouse.",
          "url": "https://sazeai.com/ai-love-letter-writer",
        })}
      </Script>
      <Script id="schema-ai-love-letter-writer-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Love Letter Writer",
          "description": "A free AI tool to help you craft romantic love letters in seconds. Show your partner or crush how much you care.",
          "applicationCategory": "EntertainmentApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/ai-love-letter-writer",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>
      <div className="min-h-screen px-4 sm:px-6 lg:px-8" style={{ paddingBottom: '3rem' }}>
        <LoveLetterWriter />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* Benefits Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8 text-center">
              Why Use the AI Love Letter Writer?
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Clock size={24} />}
                title="Save Time"
                description="Generate heartfelt love letters in seconds, saving you the time and effort."
              />
              <BenefitCard
                icon={<MessageCircle size={24} />}
                title="Express Your Feelings"
                description="Perfectly communicate your emotions with a well-written, romantic message."
              />
              <BenefitCard
                icon={<Heart size={24} />}
                title="Touch Their Heart"
                description="Write letters that will leave a lasting impression and touch the hearts of your loved ones."
              />
              <BenefitCard
                icon={<PenTool size={24} />}
                title="Personalized Letters"
                description="Add personal details to your letters, ensuring they feel special and tailored for your partner."
              />
              <BenefitCard
                icon={<ThumbsUp size={24} />}
                title="Effortless Romance"
                description="Craft romantic messages without the struggle, making it easy to be romantic any day."
              />
              <BenefitCard
                icon={<Smile size={24} />}
                title="Make Them Smile"
                description="Send love letters that will put a smile on their face and brighten their day."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
              How to Use the AI Love Letter Writer
            </h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter Recipient's Name"
                description="Provide the name of your partner or the person you want to write the letter to."
              />
              <StepItem
                number="2"
                title="Add Personal Details"
                description="Include any personal details, memories, or inside jokes that make the letter unique."
              />
              <StepItem
                number="3"
                title="Choose Tone"
                description="Select the tone of the letter—romantic, playful, or formal—depending on your relationship."
              />
              <StepItem
                number="4"
                title="Generate & Review"
                description="Click 'Generate' and review your AI-written love letter. Make any tweaks if needed."
              />
              <StepItem
                number="5"
                title="Send Your Letter"
                description="Copy your personalized love letter and send it via text, email, or even print it for a special touch."
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
