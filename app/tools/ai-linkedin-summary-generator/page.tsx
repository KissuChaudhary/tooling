import Head from 'next/head';
import Script from 'next/script';
import React from 'react';
import LinkedInSummaryGenerator from '@/components/LinkedinSummary';
import { Heart, Smile, Hash, MessageCircle, Target, Users } from 'lucide-react';
import AdUnit from '@/components/AdUnit'

export const metadata = {
  title: "AI LinkedIn Summary Generator | Free Tool for LinkedIn Summaries",
  description: "Generate a professional LinkedIn summary with the AI LinkedIn Summary Generator. Input your profession, experience, skills, and achievements to create a personalized summary for free.",
  keywords: "AI LinkedIn summary generator free, Free LinkedIn summary generator, LinkedIn summary examples, LinkedIn summary generator from resume, LinkedIn summary generator from LinkedIn profile, LinkedIn summary generator for freshers, LinkedIn bio generator Chat GPT, AI LinkedIn bio generator, AI LinkedIn summary generator for students",
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

export default function AILinkedInSummaryGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-linkedin-summary-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI LinkedIn Summary Generator",
          "description": "Generate a professional LinkedIn summary using the AI LinkedIn Summary Generator. Input your profession, experience, skills, and achievements to create a personalized summary in seconds.",
          "url": "https://www.yoursite.com/tools/ai-linkedin-summary-generator",
        })}
      </Script>
      <Script id="schema-ai-linkedin-summary-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI LinkedIn Summary Generator",
          "description": "Generate a professional LinkedIn summary using the AI LinkedIn Summary Generator. Input your profession, experience, skills, and achievements to create a personalized summary in seconds.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://www.yoursite.com/tools/ai-linkedin-summary-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
      <LinkedInSummaryGenerator />
      <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI LinkedIn Summary Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
              AI LinkedIn Summary Generator
            </h2>
            <p className="leading-relaxed text-base text-muted-foreground text-center">
              The AI LinkedIn Summary Generator is a free tool that helps you create a professional LinkedIn summary in seconds. Whether you're a seasoned professional or a fresher, input your profession, experience, key skills, and achievements to generate a personalized summary that stands out on LinkedIn.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
              Benefits of Using the AI LinkedIn Summary Generator
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Heart size={24} />}
                title="Tailored for Professionals"
                description="Generate summaries tailored to your profession, skills, and achievements."
              />
              <BenefitCard
                icon={<Smile size={24} />}
                title="AI-Powered Optimization"
                description="Leverage AI to create optimized, engaging LinkedIn summaries in seconds."
              />
              <BenefitCard
                icon={<Hash size={24} />}
                title="Free and Easy to Use"
                description="The tool is free, user-friendly, and generates summaries with minimal input."
              />
              <BenefitCard
                icon={<MessageCircle size={24} />}
                title="For Freshers and Experienced"
                description="Whether you're a fresher or a seasoned professional, create a LinkedIn bio that stands out."
              />
              <BenefitCard
                icon={<Target size={24} />}
                title="Perfect for Students"
                description="AI LinkedIn summary generator for students, helping them highlight their key skills and achievements."
              />
              <BenefitCard
                icon={<Users size={24} />}
                title="From Resume or Profile"
                description="Easily generate LinkedIn summaries from your resume or LinkedIn profile."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI LinkedIn Summary Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter Your Profession"
                description="Start by inputting your current profession or job title to guide the summary generation."
              />
              <StepItem
                number="2"
                title="Describe Your Professional Experience"
                description="Provide a brief description of your professional experience to help craft a relevant summary."
              />
              <StepItem
                number="3"
                title="List Key Skills"
                description="Input the key skills that you want to highlight in your LinkedIn summary."
              />
              <StepItem
                number="4"
                title="Highlight Achievements"
                description="Mention your notable achievements that will help you stand out."
              />
              <StepItem
                number="5"
                title="Generate Your LinkedIn Summary"
                description="Click 'Generate LinkedIn Summary' to instantly receive a customized, professional LinkedIn summary."
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
