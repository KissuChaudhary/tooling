import Head from 'next/head';
import CaptionGenerator from '@/components/AICaptionForm';
import Script from 'next/script';
import React from 'react';
import { Image, Lightbulb, Clock, Hash, Sparkles } from 'lucide-react';
 
export const metadata = {
  title: "AI Caption Generator | Create Engaging Captions Effortlessly - Saze AI", 
  description: "Generate catchy and creative captions with our AI Caption Generator. Perfect for social media posts, marketing campaigns, and more.",
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

export default function AICaptionGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-ai-caption-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Caption Generator - Saze AI", 
          "description": "Generate catchy and creative captions with our AI Caption Generator. Perfect for social media posts, marketing campaigns, and more.",
          "url": "https://sazeai.com/tools/ai-caption-generator", 
        })}
      </Script>
      <Script id="schema-ai-caption-generator-webapp" type="application/ld+json">
        {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "AI Caption Generator - Saze AI",
            "description": "Generate catchy and creative captions with our AI Caption Generator. Perfect for social media posts, marketing campaigns, and more.",
            "applicationCategory": "EntertainmentApplication",
            "operatingSystem": "All",
            "url": "https://sazeai.com/tools/ai-caption-generator",
            "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "USD",
            },
        })}
    </Script>
      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <CaptionGenerator />
       
        {/* What is AI Caption Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Caption Generator</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Caption Generator by SazeAI helps you create catchy and engaging captions for social media, marketing, and personal use. 
              Whether you’re a content creator, marketer, or simply looking to spice up your posts, this tool uses AI to craft unique, eye-catching captions that grab attention.
              Just provide a few key details, such as the type of image or theme, and let the AI generate the perfect caption in seconds.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
              Benefits of Using the AI Caption Generator
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Clock size={24} />}
                title="Time-Saving"
                description="Generate captions instantly, freeing up time for other creative tasks."
              />
              <BenefitCard
                icon={<Lightbulb size={24} />}
                title="Creative Inspiration"
                description="Get fresh, creative ideas to make your captions stand out in a crowded social feed."
              />
              <BenefitCard
                icon={<Image size={24} />}
                title="Tailored to Your Needs"
                description="Create captions that match the theme, mood, or target audience of your post."
              />
              <BenefitCard
                icon={<Hash size={24} />}
                title="Hashtag Ready"
                description="Get hashtags along with captions to increase your reach and engagement."
              />
              <BenefitCard
                icon={<Sparkles size={24} />}
                title="Easy to Use"
                description="Our interface is designed to make generating captions as simple as clicking a button."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">
              How to Use the AI Caption Generator
            </h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Write Your Image Details"
                description="Provide a brief description of the context or mood of the image (e.g., travel, celebration, motivational)."
              />
             
              <StepItem
                number="2"
                title="Choose The Platform"
                description="Choose the platform from the dropdown you want to create caption for."
              />
              <StepItem
                number="3"
                title="Describe The Tone"
                description="Describe the desired tone (e.g., funny, professional, inspirational)..."
              />
              <StepItem
                number="4"
                title="Hit Generate Caption"
                description="Click 'Generate Caption' and let the AI create a captivating caption in seconds."
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
