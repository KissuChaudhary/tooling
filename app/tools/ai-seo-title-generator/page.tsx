import Head from 'next/head';
import SEOTitleGenerator from '@/components/AISeoTitleForm';
import Script from 'next/script';
import React from 'react';
import { Edit, Tag, Star, CheckCircle, Fingerprint, UserCheck } from 'lucide-react';
import AdUnit from '@/components/AdUnit'

export const metadata = {
  title: "AI SEO Title Generator | Create Compelling Meta Titles - Saze AI",
  description: "Generate optimized SEO titles with the AI SEO Title Generator by Saze AI. Enter your topic and relevant keywords to create catchy meta titles that enhance your search engine visibility.",
  keywords: "Ai meta title generator free, Meta description generator free, Meta Title Generator: Free SEO Titles for Search Engines (AI), SEO title Generator, Meta title Generator free",
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

export default function AISeoTitleGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-seo-title-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI SEO Title Generator - Saze AI",
          "description": "Generate optimized SEO titles with the AI SEO Title Generator by Saze AI. Enter your topic and relevant keywords to create catchy meta titles that enhance your search engine visibility.",
          "url": "https://sazeai.com/tools/ai-seo-title-generator",
        })}
      </Script>
      <Script id="schema-ai-seo-title-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI SEO Title Generator - Saze AI",
          "description": "Generate optimized SEO titles with the AI SEO Title Generator by Saze AI. Enter your topic and relevant keywords to create catchy meta titles that enhance your search engine visibility.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-seo-title-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <SEOTitleGenerator />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI SEO Title Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is the AI SEO Title Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI SEO Title Generator by Saze AI is a powerful tool designed to help you create optimized meta titles that enhance your content’s visibility on search engines. By entering your main topic and relevant keywords, you can generate catchy and relevant titles that attract clicks and improve SEO rankings.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI SEO Title Generator</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Tag size={24} />}
                title="Instant Title Generation"
                description="Quickly generate multiple optimized titles based on your content's topic and keywords."
              />
              <BenefitCard
                icon={<Edit size={24} />}
                title="SEO-Friendly Titles"
                description="Create titles that are tailored for search engines, improving your chances of ranking higher."
              />
              <BenefitCard
                icon={<Star size={24} />}
                title="User-Friendly Interface"
                description="The easy-to-use interface allows anyone to generate effective SEO titles without technical expertise."
              />
              <BenefitCard
                icon={<CheckCircle size={24} />}
                title="Free Access"
                description="Use the AI SEO Title Generator for free, with no sign-up or hidden fees."
              />
              <BenefitCard
                icon={<UserCheck size={24} />}
                title="Customizable Options"
                description="Enter relevant keywords to generate targeted titles that accurately reflect your content."
              />
              <BenefitCard
                icon={<Fingerprint size={24} />}
                title="Versatile Applications"
                description="Ideal for blogs, articles, product pages, and any online content requiring effective titles."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI SEO Title Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter the Main Topic"
                description="Provide the main topic of your content to guide the title generation."
              />
              <StepItem
                number="2"
                title="Add Relevant Keywords"
                description="Input keywords related to your topic, separated by commas, for better optimization."
              />
              <StepItem
                number="3"
                title="Select Number of Titles"
                description="Choose how many title options you would like to generate."
              />
              <StepItem
                number="4"
                title="Generate SEO Titles"
                description="Click 'Generate SEO Titles' to receive a list of catchy, optimized titles ready for use."
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
