import Head from 'next/head';
import ParaphrasingTool from '@/components/AIParaphraseForm';
import Script from 'next/script';
import React from 'react';
import { Edit, Layers, Shield, BookOpen, Clipboard, ThumbsUp } from 'lucide-react';
import AdUnit from '@/components/AdUnit'

export const metadata = {
  title: "AI Paraphrasing Tool | Free & Best Paraphrasing Tool Online - Saze AI",
  description: "Paraphrase text easily with the AI Paraphrasing Tool by Saze AI. Enter your text and choose from various paraphrasing styles for academic, professional, or casual needs.",
  keywords: "AI paraphrasing tool free, Best AI paraphrasing tool, Best paraphrasing tool online free, Free paraphrasing tool, Non AI paraphrasing tool, AI detector, Undetectable AI paraphrasing tool free, Academic paraphrasing tool free",
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

export default function AIParaphrasingToolPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-paraphrasing-tool" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Paraphrasing Tool - Saze AI",
          "description": "Paraphrase text easily with the AI Paraphrasing Tool by Saze AI. Enter your text and choose from various paraphrasing styles for academic, professional, or casual needs.",
          "url": "https://sazeai.com/tools/ai-paraphrasing-tool",
        })}
      </Script>
      <Script id="schema-ai-paraphrasing-tool-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Paraphrasing Tool - Saze AI",
          "description": "Paraphrase text easily with the AI Paraphrasing Tool by Saze AI. Choose different styles, including academic, professional, and casual paraphrasing.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-paraphrasing-tool",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <ParaphrasingTool />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI Paraphrasing Tool Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is the AI Paraphrasing Tool?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Paraphrasing Tool by Saze AI helps you rephrase text quickly and accurately. Whether you need to adjust the tone for academic purposes, professional communication, or casual writing, this tool makes it easy to generate variations of your text. Choose the style that fits your needs, and get undetectable AI-powered paraphrasing at no cost.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Paraphrasing Tool</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Edit size={24} />}
                title="Customizable Paraphrasing"
                description="Choose from different paraphrasing styles, including academic, professional, and casual options."
              />
              <BenefitCard
                icon={<Layers size={24} />}
                title="Multiple Paraphrasing Layers"
                description="Get multiple versions of your text, allowing for varied phrasing and sentence structures."
              />
              <BenefitCard
                icon={<Shield size={24} />}
                title="Undetectable by AI Detectors"
                description="Paraphrase text in a way that remains undetectable by AI detectors, perfect for academic and professional use."
              />
              <BenefitCard
                icon={<BookOpen size={24} />}
                title="Perfect for Academic Use"
                description="Ideal for academic writing, this tool ensures paraphrasing is accurate and adheres to scholarly standards."
              />
              <BenefitCard
                icon={<Clipboard size={24} />}
                title="Efficient & Fast"
                description="Quickly paraphrase any amount of text in seconds, saving you time and effort."
              />
              <BenefitCard
                icon={<ThumbsUp size={24} />}
                title="Free to Use"
                description="The AI Paraphrasing Tool is completely free, providing professional-level paraphrasing at no cost."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Paraphrasing Tool</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Text to Paraphrase"
                description="Enter the text you want to paraphrase, whether it’s an essay, article, or any other content."
              />
              <StepItem
                number="2"
                title="Choose Paraphrasing Style"
                description="Select from standard, professional, or other available paraphrasing styles based on your needs."
              />
              <StepItem
                number="3"
                title="Paraphrase Text"
                description="Click 'Paraphrase Text' to get instant paraphrased content that meets your requirements."
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
