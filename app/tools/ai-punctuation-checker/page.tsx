import Head from 'next/head';
import PunctuationChecker from '@/components/AIpunctuationForm';
import Script from 'next/script';
import React from 'react';
import { CheckCircle, Fingerprint, UserCheck, SpellCheck, Edit3, Smile } from 'lucide-react';

export const metadata = {
  title: "Free AI Punctuation Checker – Free Grammar and Punctuation Check!",
  description: "Check and correct your punctuation instantly with the Free AI Punctuation Checker by Saze AI. Input your text, and the tool will analyze and fix any grammar or punctuation errors in seconds.",
  keywords: "Google punctuation checker, Free ai punctuation checker app, Best free punctuation checker, Punctuation checker and corrector, Best free ai punctuation checker, Free comma checker, Grammar checker, Punctuate this sentence for me",
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

export default function AIPunctuationCheckerPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-punctuation-checker" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Free AI Punctuation Checker – Free Grammar and Punctuation Check - Saze AI",
          "description": "Check and correct your punctuation instantly with the Free AI Punctuation Checker by Saze AI. Input your text, and the tool will analyze and fix any grammar or punctuation errors in seconds.",
          "url": "https://sazeai.com/tools/ai-punctuation-checker",
        })}
      </Script>
      <Script id="schema-ai-punctuation-checker-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Free AI Punctuation Checker – Free Grammar and Punctuation Check - Saze AI",
          "description": "Check and correct your punctuation instantly with the Free AI Punctuation Checker by Saze AI. Input your text, and the tool will analyze and fix any grammar or punctuation errors in seconds.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-punctuation-checker",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <PunctuationChecker />

        {/* What is AI Punctuation Checker Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is the AI Punctuation Checker?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Punctuation Checker by Saze AI ensures your writing is grammatically sound and properly punctuated. Whether you're writing an essay, a business email, or social media content, this tool will help you catch missing commas, misplaced periods, and other punctuation issues. Simply paste your text, and the tool will instantly correct any errors.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Punctuation Checker</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<CheckCircle size={24} />}
                title="Instant Corrections"
                description="Correct your punctuation and grammar in real-time, without waiting for manual edits."
              />
              <BenefitCard
                icon={<SpellCheck size={24} />}
                title="Grammar Support"
                description="Beyond punctuation, the tool checks for common grammatical errors and provides solutions."
              />
              <BenefitCard
                icon={<Edit3 size={24} />}
                title="No Login Required"
                description="Use the tool for free without the need to create an account or log in."
              />
              <BenefitCard
                icon={<Smile size={24} />}
                title="User-Friendly Interface"
                description="Simply paste your text and get corrections within seconds—ideal for quick checks."
              />
              <BenefitCard
                icon={<Fingerprint size={24} />}
                title="Multiple Formats"
                description="Check punctuation for all types of writing, whether it's an email, report, blog post, or even a social media caption."
              />
              <BenefitCard
                icon={<UserCheck size={24} />}
                title="Completely Free"
                description="Use the AI Punctuation Checker at no cost, with unlimited corrections available to you."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Punctuation Checker</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Paste Your Text"
                description="Copy and paste the text you want to check into the input box. The tool supports up to 500 characters per check."
              />
              <StepItem
                number="2"
                title="Click 'Check Punctuation'"
                description="Click the button to let the AI analyze your text for punctuation and grammar mistakes."
              />
              <StepItem
                number="3"
                title="Review Suggestions"
                description="The tool will highlight errors and suggest corrections to improve your writing."
              />
              <StepItem
                number="4"
                title="Apply Changes"
                description="Once you review the corrections, you can apply them to your text manually or copy the corrected version."
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
