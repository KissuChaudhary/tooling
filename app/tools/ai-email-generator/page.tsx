import Head from 'next/head';
import EmailResponseGenerator from '@/components/AIEmailForm';
import Script from 'next/script';
import React from 'react';
import { Mail, MessageCircle, ThumbsUp, Zap, Clock } from 'lucide-react';

export const metadata = {
  title: "AI Email Response Generator | Create Professional Email Replies - Saze AI",
  description: "Quickly generate personalized email responses using our AI Email Response Generator. Craft professional, friendly, or formal replies with ease.",
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

export default function AIEmailResponseGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-ai-email-response-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Email Response Generator - Saze AI",
          "description": "Quickly generate personalized email responses using our AI Email Response Generator. Craft professional, friendly, or formal replies with ease.",
          "url": "https://sazeai.com/tools/ai-email-response-generator",
        })}
      </Script>
      <Script id="schema-ai-email-response-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Email Response Generator - Saze AI",
          "description": "Quickly generate personalized email responses using our AI Email Response Generator. Craft professional, friendly, or formal replies with ease.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-email-response-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <EmailResponseGenerator />

        {/* What is AI Email Response Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Email Response Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Email Response Generator by Saze AI helps you craft quick, personalized email responses that match your desired tone. Whether you need a formal, professional, or friendly reply, the tool adapts to the context and tone of the original email, ensuring your responses are on-point and time-efficient.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Email Response Generator</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Mail size={24} />}
                title="Quick Replies"
                description="Save time by generating responses instantly, without needing to draft emails from scratch."
              />
              <BenefitCard
                icon={<MessageCircle size={24} />}
                title="Adaptable Tones"
                description="Generate responses with a tone that matches the original email, whether it’s professional, friendly, or formal."
              />
              <BenefitCard
                icon={<ThumbsUp size={24} />}
                title="Improved Communication"
                description="Create clear and concise replies that effectively convey your key points."
              />
              <BenefitCard
                icon={<Zap size={24} />}
                title="Boosts Efficiency"
                description="Accelerate your email workflow by responding to messages faster and more efficiently."
              />
              <BenefitCard
                icon={<Clock size={24} />}
                title="Personalized Touch"
                description="Crafts responses that feel tailored to the sender, enhancing your professional relationships."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Email Response Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Paste the Original Email"
                description="Copy and paste the original email you received into the tool. This helps the AI understand the context."
              />
              <StepItem
                number="2"
                title="Enter Key Response Points"
                description="Provide the main points you want to include in your reply. The AI will integrate them into a well-structured response."
              />
              <StepItem
                number="3"
                title="Choose a Response Tone"
                description="Select the desired tone for your response: formal, professional, or friendly. The AI will adjust the language accordingly."
              />
              <StepItem
                number="4"
                title="Generate Email Response"
                description="Click 'Generate Email Response,' and the AI will create a polished reply ready for you to send."
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
