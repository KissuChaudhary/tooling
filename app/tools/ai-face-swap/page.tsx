import Head from 'next/head';
import FaceSwapTool from '@/components/FaceSwapTool';
import Script from 'next/script';
import React from 'react';
import { Book, Feather, Target, Users, FileText } from 'lucide-react';
import AdUnit from '@/components/AdUnit'
import ToolEngagement from '@/components/tool-engagement'

export const metadata = {
  title: "AI Essay Writer | Generate Quality Essays in Minutes",
  description: "Craft high-quality essays in minutes with the AI Essay Writer by Saze AI. Generate essays tailored to your topic, tone, audience, and purpose.",
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

export default function AIEssayWriterPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-ai-essay-writer" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Essay Writer - Saze AI",
          "description": "Craft high-quality essays in minutes with the AI Essay Writer by Saze AI. Generate essays tailored to your topic, tone, audience, and purpose.",
          "url": "https://sazeai.com/tools/ai-essay-writer",
        })}
      </Script>
      <Script id="schema-ai-essay-writer-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Essay Writer - Saze AI",
          "description": "Craft high-quality essays in minutes with the AI Essay Writer by Saze AI. Generate essays tailored to your topic, tone, audience, and purpose.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-essay-writer",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <FaceSwapTool />
        <ToolEngagement 
          toolName="AI Face Swap"
        />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI Essay Writer Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Essay Writer?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Essay Writer by Saze AI is designed to help you generate well-structured essays in minutes. Tailored to your specific topic, tone, and audience, this tool provides an efficient solution for students, professionals, and content creators seeking quality essay writing without spending hours on research and drafting.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Essay Writer</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Book size={24} />}
                title="Custom Essays"
                description="Generate essays tailored to your specific topic, tone, and purpose, ensuring relevance and accuracy."
              />
              <BenefitCard
                icon={<Feather size={24} />}
                title="Multiple Essay Types"
                description="From argumentative to persuasive essays, the AI adapts to various types and formats."
              />
              <BenefitCard
                icon={<Users size={24} />}
                title="Audience Targeting"
                description="Customize your essay for specific audiences, ensuring the message resonates with the intended readers."
              />
              <BenefitCard
                icon={<Target size={24} />}
                title="Purpose-Driven Content"
                description="Craft essays that meet your specific goal, whether it’s to inform, persuade, or analyze."
              />
              <BenefitCard
                icon={<FileText size={24} />}
                title="Time-Efficient"
                description="Save time and effort by generating high-quality essays in a matter of minutes."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Essay Writer</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter Your Essay Topic"
                description="Start by entering the topic for your essay. The AI uses this to create a relevant and focused essay."
              />
              <StepItem
                number="2"
                title="Select the Tone"
                description="Choose the tone you want your essay to have: formal, neutral, or conversational. The tone sets the style of the essay."
              />
              <StepItem
                number="3"
                title="Choose Essay Type"
                description="Select the type of essay you need—whether it's argumentative, narrative, or descriptive, the AI adjusts the format accordingly."
              />
              <StepItem
                number="4"
                title="Specify the Audience"
                description="Indicate who the essay is for—whether it’s for academic purposes, professional readers, or general audiences."
              />
              <StepItem
                number="5"
                title="Set the Length"
                description="Choose the desired length for your essay—short, medium, or long, based on the scope of the content you need."
              />
              <StepItem
                number="6"
                title="Select Purpose"
                description="Identify the purpose of your essay—whether it’s to inform, persuade, or analyze a subject."
              />
              <StepItem
                number="7"
                title="Generate Your Essay"
                description="Once all inputs are in place, click 'Generate Essay' to create a well-structured, high-quality essay that meets your criteria."
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
