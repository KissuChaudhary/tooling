import Head from 'next/head';
import AIThesisStatementGenerator from '@/components/AIThesisForm';
import Script from 'next/script';
import React from 'react';
import { Fingerprint, Lightbulb, CheckCircle, BookOpen, Smile } from 'lucide-react';
import AdUnit from '@/components/AdUnit'

export const metadata = {
  title: "AI Thesis Statement Generator 【No Login, Free & Fast】",
  description: "Generate strong thesis statements effortlessly with the AI Thesis Statement Generator. Input your topic, argument, and field of study to get a tailored thesis statement.",
  keywords: "AI thesis statement generator free, AI thesis statement generator online free, thesis statement generator free, AI thesis statement generator PDF, thesis statement example, thesis generator Ashford writing, thesis statement generator for research paper",
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

export default function AIThesisStatementGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-thesis-statement-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Thesis Statement Generator - Saze AI",
          "description": "Effortlessly generate strong thesis statements with the AI Thesis Statement Generator. Input your topic, argument, and field of study to get a tailored thesis statement.",
          "url": "https://sazeai.com/tools/ai-thesis-statement-generator",
        })}
      </Script>
      <Script id="schema-ai-thesis-statement-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Thesis Statement Generator - Saze AI",
          "description": "Instantly create effective thesis statements tailored to your research with the AI Thesis Statement Generator. No login required.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-thesis-statement-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <AIThesisStatementGenerator />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI Thesis Statement Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Thesis Statement Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Thesis Statement Generator by Saze AI allows you to create strong and clear thesis statements for your academic papers effortlessly. Just enter your topic, argument, and field of study to get a well-crafted thesis statement tailored to your needs.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Thesis Statement Generator</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Fingerprint size={24} />}
                title="Efficient Thesis Creation"
                description="Generate strong thesis statements quickly, saving you time in the writing process."
              />
              <BenefitCard
                icon={<Lightbulb size={24} />}
                title="Tailored Statements"
                description="Craft thesis statements that reflect your unique argument and topic effectively."
              />
              <BenefitCard
                icon={<BookOpen size={24} />}
                title="User-Friendly Tool"
                description="An easy-to-use interface that helps students and researchers generate thesis statements without hassle."
              />
              <BenefitCard
                icon={<Smile size={24} />}
                title="Free Access"
                description="Use the AI Thesis Statement Generator at no cost and without any sign-up requirements."
              />
              <BenefitCard
                icon={<CheckCircle size={24} />}
                title="Versatile for All Fields"
                description="Suitable for various academic disciplines, making it perfect for any research paper."
              />
              <BenefitCard
                icon={<CheckCircle size={24} />}
                title="Instant Results"
                description="Get your thesis statement in seconds, enabling you to focus on your research and writing."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Thesis Statement Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter Your Topic"
                description="Provide a clear and concise topic for your thesis statement, up to 100 characters."
              />
              <StepItem
                number="2"
                title="Define Your Argument"
                description="Enter your main argument or claim, giving the generator insight into your perspective."
              />
              <StepItem
                number="3"
                title="Select Field of Study"
                description="Choose the relevant field of study to help tailor your thesis statement appropriately."
              />
              <StepItem
                number="4"
                title="Generate Thesis Statement"
                description="Click 'Generate Thesis Statement' to receive a well-crafted statement that supports your argument."
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
