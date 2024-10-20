import Head from 'next/head';
import YoutubeTitleGenerator from '@/components/AIYoutubeTitle';
import Script from 'next/script';
import React from 'react';
import { Clock, Fingerprint, Search, MessageCircle, Star, RefreshCw } from 'lucide-react';


export const metadata = {
  title: "AI YouTube Title Generator | Create Engaging Titles - Saze AI",
  description: "Generate catchy and SEO-friendly titles for your YouTube videos with Saze AI's AI YouTube Title Generator. Easily input your topic and keywords to create the perfect title for your content.",
  keywords: "AI YouTube title generator free, Best YouTube title generator, YouTube description generator, AI title generator, YouTube Shorts title generator, AI YouTube description generator, Funny YouTube title generator",
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
export default function AIYouTubeTitleGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-youtube-title-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI YouTube Title Generator - Saze AI",
          "description": "Generate catchy and SEO-friendly titles for your YouTube videos with Saze AI's AI YouTube Title Generator. Easily input your topic and keywords to create the perfect title for your content.",
          "url": "https://sazeai.com/tools/ai-youtube-title-generator",
        })}
      </Script>
      <Script id="schema-ai-youtube-title-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI YouTube Title Generator - Saze AI",
          "description": "Generate catchy and SEO-friendly titles for your YouTube videos with Saze AI's AI YouTube Title Generator. Easily input your topic and keywords to create the perfect title for your content.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-youtube-title-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <YoutubeTitleGenerator />

        {/* What is AI YouTube Title Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is the AI YouTube Title Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI YouTube Title Generator by Saze AI allows you to create catchy, engaging, and SEO-optimized titles for your YouTube videos. Simply enter your video topic and relevant keywords to generate a variety of compelling title options that will help your content stand out.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI YouTube Title Generator</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Fingerprint size={24} />}
                title="Catchy Titles"
                description="Generate eye-catching titles that attract viewers and increase clicks."
              />
              <BenefitCard
                icon={<Search size={24} />}
                title="SEO Optimization"
                description="Create titles optimized for search engines to improve visibility."
              />
              <BenefitCard
                icon={<Clock size={24} />}
                title="Time-Saving"
                description="Quickly produce multiple title options in seconds."
              />
              <BenefitCard
                icon={<MessageCircle size={24} />}
                title="Versatile Usage"
                description="Perfect for various types of content, including vlogs, tutorials, and reviews."
              />
              <BenefitCard
                icon={<Star size={24} />}
                title="Increased Engagement"
                description="Engaging titles can lead to higher viewer retention and interaction."
              />
              <BenefitCard
                icon={<RefreshCw size={24} />}
                title="User-Friendly"
                description="Simple interface makes it easy for anyone to generate titles effortlessly."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI YouTube Title Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter Topic"
                description="Input the main topic of your YouTube video in the designated area."
              />
              <StepItem
                number="2"
                title="Add Keywords"
                description="Enter relevant keywords (up to 5) to enhance your title options."
              />
              <StepItem
                number="3"
                title="Generate Title"
                description="Click the 'Generate Title' button to see a list of title suggestions."
              />
              <StepItem
                number="4"
                title="Choose Your Title"
                description="Review the generated titles and select the one that fits your video best."
              />
              <StepItem
                number="5"
                title="Use in Your Video"
                description="Copy the chosen title and paste it into your YouTube video upload settings."
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
