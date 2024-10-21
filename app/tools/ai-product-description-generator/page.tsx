import Head from 'next/head';
import ProductDescriptionGenerator from '@/components/AIProductDesc';
import Script from 'next/script';
import React from 'react';
import { ShoppingCart, List, Gift, Users, Rocket, Globe } from 'lucide-react';
import AdUnit from '@/components/AdUnit'

export const metadata = {
  title: "AI Product Description Generator 【No Login, Super Fast】 | Free & Online",
  description: "Create compelling and SEO-friendly product descriptions with the AI Product Description Generator. No login, super fast, and free to use for online stores and YouTube descriptions.",
  keywords: "AI product description generator free, Free description generator, Best AI product description generator, AI product description generator online, AI description generator from image, AI business description generator, AI description generator for YouTube, Free description generator for YouTube",
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

export default function AIProductDescriptionGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-product-description-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Product Description Generator - Saze AI",
          "description": "Create high-quality product descriptions fast and easy with the free AI Product Description Generator. No login required, perfect for businesses and content creators.",
          "url": "https://sazeai.com/tools/ai-product-description-generator",
        })}
      </Script>
      <Script id="schema-ai-product-description-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Product Description Generator - Saze AI",
          "description": "Generate product descriptions instantly with our AI tool. Perfect for online stores, YouTube videos, and business use.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-product-description-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <ProductDescriptionGenerator />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI Product Description Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is the AI Product Description Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Product Description Generator by Saze AI helps you create engaging and SEO-friendly product descriptions in seconds. Simply enter your product name, features, benefits, and target audience to generate a description that highlights your product's value. Whether you're an e-commerce business owner or a YouTube content creator, this tool is fast, free, and requires no login.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Product Description Generator</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<ShoppingCart size={24} />}
                title="E-Commerce Ready"
                description="Generate product descriptions tailored for online stores and e-commerce platforms."
              />
              <BenefitCard
                icon={<List size={24} />}
                title="Highlight Key Features"
                description="List your product's main features to create descriptions that inform and convert."
              />
              <BenefitCard
                icon={<Gift size={24} />}
                title="Communicate Benefits"
                description="Showcase how your product solves problems and adds value for your target audience."
              />
              <BenefitCard
                icon={<Users size={24} />}
                title="Targeted Descriptions"
                description="Create descriptions that resonate with your specific audience, whether it's tech-savvy professionals or casual consumers."
              />
              <BenefitCard
                icon={<Rocket size={24} />}
                title="Super Fast & Easy"
                description="Get high-quality descriptions generated in seconds, with no need for logins or complicated processes."
              />
              <BenefitCard
                icon={<Globe size={24} />}
                title="Free & Unlimited"
                description="Use the AI Product Description Generator as many times as you need, completely free of charge."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Product Description Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter the Product Name"
                description="Provide the name of your product, whether it's a gadget, clothing item, or service."
              />
              <StepItem
                number="2"
                title="List Key Features"
                description="Highlight the main features that make your product stand out, such as durability, performance, or design."
              />
              <StepItem
                number="3"
                title="Describe Key Benefits"
                description="Explain the main benefits your product offers, such as time-saving, efficiency, or convenience."
              />
              <StepItem
                number="4"
                title="Define Your Target Audience"
                description="Specify your target audience to generate a description that speaks directly to their needs and preferences."
              />
              <StepItem
                number="5"
                title="Generate Product Description"
                description="Click 'Generate Product Description' to instantly create a compelling and engaging description."
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
