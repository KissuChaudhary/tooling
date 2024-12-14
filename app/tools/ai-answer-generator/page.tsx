import Head from 'next/head';
import AnswerGenerator from '@/components/AIAnswerForm';
import Script from 'next/script';
import React from 'react';
import RelatedTools from '@/components/related-tools';
import { Search, Brain, Clock, Lightbulb, Sparkles } from 'lucide-react';
import AdUnit from '@/components/AdUnit';
import ToolEngagement from '@/components/tool-engagement';

export const metadata = {
  title: "AI Answer Generator | Instant, Accurate Answers to Your Questions",
  description: "Get accurate, AI-powered answers to any question with our AI Answer Generator. Ideal for students, researchers, and professionals.",
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

export default function AIAnswerGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-ai-answer-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Answer Generator - Saze AI",
          "description": "Get accurate, AI-powered answers to any question with our AI Answer Generator. Ideal for students, researchers, and professionals.",
          "url": "https://sazeai.com/tools/ai-answer-generator",
        })}
      </Script>
      <Script id="schema-ai-answer-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Answer Generator - Saze AI",
          "description": "Get accurate, AI-powered answers to any question with our AI Answer Generator. Ideal for students, researchers, and professionals.",
          "applicationCategory": "EducationApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-answer-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>
      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <AnswerGenerator />
        <ToolEngagement toolName="AI Answer Generator" />
        <AdUnit
          client="ca-pub-7915372771416695"
          slot="8441706260"
          style={{ marginBottom: '20px' }}
        />
        <RelatedTools currentToolLink="/tools/ai-answer-generator" />
        {/* What is AI Answer Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Answer Generator</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Answer Generator by SazeAI provides instant, accurate answers to any question you ask. 
              Whether you're a student, researcher, or professional, this tool uses advanced AI to understand your query and deliver precise responses. 
              Save time and boost productivity with this intelligent, easy-to-use answer generator.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
              Benefits of Using the AI Answer Generator
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Clock size={24} />}
                title="Time-Saving"
                description="Get quick answers without spending hours researching or looking through multiple sources."
              />
              <BenefitCard
                icon={<Brain size={24} />}
                title="Accurate and Reliable"
                description="Leverage advanced AI algorithms to ensure precise and trustworthy answers."
              />
              <BenefitCard
                icon={<Search size={24} />}
                title="Wide Coverage"
                description="Ask about any topic, from academics to general knowledge, and get detailed responses."
              />
              <BenefitCard
                icon={<Lightbulb size={24} />}
                title="Boosts Productivity"
                description="Focus on what matters by letting the AI handle quick information retrieval for you."
              />
              <BenefitCard
                icon={<Sparkles size={24} />}
                title="Easy to Use"
                description="A user-friendly interface ensures seamless interaction and intuitive use for everyone."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">
              How to Use the AI Answer Generator
            </h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Type Your Question"
                description="Enter the question you need an answer for in the input box."
              />
              <StepItem
                number="2"
                title="Review Suggestions"
                description="Preview the suggested answer provided by the AI based on your query."
              />
              <StepItem
                number="3"
                title="Refine Your Query"
                description="If needed, rephrase or add more details to your question for a more accurate response."
              />
              <StepItem
                number="4"
                title="Save or Copy the Answer"
                description="Once satisfied, copy or save the generated answer for your use."
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
