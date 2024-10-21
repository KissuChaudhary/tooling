import Head from 'next/head';
import SeoMetaDescriptionGenerator from '@/components/AISeoDesc';
import Script from 'next/script';
import React from 'react';
import { Tag, Code, Edit3, CheckCircle, Clipboard, MessageCircle } from 'lucide-react';
import AdUnit from '@/components/AdUnit'

export const metadata = {
  title: "AI SEO Meta Description Generator | Create Perfect Meta Descriptions - Saze AI",
  description: "Generate optimized SEO meta descriptions with the AI SEO Meta Description Generator by Saze AI. Enter your page title and keywords to create compelling meta descriptions that enhance your search engine visibility.",
  keywords: "Ai seo meta description generator free, Best ai seo meta description generator, Ai seo meta description generator online, Meta description generator from URL, SEO description generator free, Meta title Generator, Free description generator online, Free description Generator for YouTube",
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

export default function AISeoMetaDescriptionGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-seo-meta-description-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI SEO Meta Description Generator - Saze AI",
          "description": "Generate optimized SEO meta descriptions with the AI SEO Meta Description Generator by Saze AI. Enter your page title and keywords to create compelling meta descriptions that enhance your search engine visibility.",
          "url": "https://sazeai.com/tools/ai-seo-meta-description-generator",
        })}
      </Script>
      <Script id="schema-ai-seo-meta-description-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI SEO Meta Description Generator - Saze AI",
          "description": "Generate optimized SEO meta descriptions with the AI SEO Meta Description Generator by Saze AI. Enter your page title and keywords to create compelling meta descriptions that enhance your search engine visibility.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-seo-meta-description-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <SeoMetaDescriptionGenerator />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI SEO Meta Description Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is the AI SEO Meta Description Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI SEO Meta Description Generator by Saze AI is a powerful tool designed to create optimized meta descriptions that boost your website's search engine visibility. Simply enter your page title and relevant keywords, and generate compelling meta descriptions that attract clicks and improve your SEO rankings.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI SEO Meta Description Generator</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Tag size={24} />}
                title="Instant Generation"
                description="Quickly create optimized meta descriptions tailored to your specific page title and keywords."
              />
              <BenefitCard
                icon={<Code size={24} />}
                title="SEO Optimized"
                description="Ensure your meta descriptions are SEO-friendly, enhancing your chances of ranking higher in search results."
              />
              <BenefitCard
                icon={<Edit3 size={24} />}
                title="User-Friendly"
                description="The intuitive interface makes it easy for anyone to generate effective meta descriptions without technical expertise."
              />
              <BenefitCard
                icon={<CheckCircle size={24} />}
                title="Free to Use"
                description="Access the AI SEO Meta Description Generator for free, with no registration or hidden fees."
              />
              <BenefitCard
                icon={<MessageCircle size={24} />}
                title="Customizable Options"
                description="Add multiple keywords to create tailored descriptions that reflect your content accurately."
              />
              <BenefitCard
                icon={<Clipboard size={24} />}
                title="Versatile Applications"
                description="Use the generator for various needs, including blog posts, product pages, and YouTube descriptions."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI SEO Meta Description Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter the Page Title"
                description="Provide a concise and descriptive page title that reflects the content of your webpage."
              />
              <StepItem
                number="2"
                title="Add Keywords"
                description="Input relevant keywords that you want to target in your meta description for better SEO optimization."
              />
              <StepItem
                number="3"
                title="Generate Meta Description"
                description="Click 'Generate Meta Description' to receive a well-crafted description that is ready to use."
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
