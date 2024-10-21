import Head from 'next/head';
import AITextImprover from '@/components/AITextImprover';
import Script from 'next/script';
import React from 'react';
import { Edit3, CheckCircle, Smile, Lightbulb, Paperclip, TextCursor } from 'lucide-react';
import AdUnit from '@/components/AdUnit'

export const metadata = {
  title: "AI Text Improver 【No Login, Free & Fast】",
  description: "Enhance your writing effortlessly with the AI Text Improver. Input your original text and your improvement goal to generate refined content instantly.",
  keywords: "AI text improver online free, AI text improver free, AI text rewriter free, free AI content improver, AI content improver online, free AI content improver - no sign-up, best AI content improver, writing improver AI",
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

export default function AITextImproverPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-text-improver" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Text Improver - Saze AI",
          "description": "Enhance your writing with the AI Text Improver. Input your original text and improvement goals to generate refined content instantly.",
          "url": "https://sazeai.com/tools/ai-text-improver",
        })}
      </Script>
      <Script id="schema-ai-text-improver-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Text Improver - Saze AI",
          "description": "Instantly improve your writing with the AI Text Improver. No login required, free, and fast.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-text-improver",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <AITextImprover />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI Text Improver Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Text Improver?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Text Improver by Saze AI allows you to enhance your written content effortlessly. Simply input your original text and specify your improvement goal to generate refined and engaging text that meets your needs.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Text Improver</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Edit3 size={24} />}
                title="Effortless Enhancements"
                description="Transform your text into polished, professional content in just seconds."
              />
              <BenefitCard
                icon={<Lightbulb size={24} />}
                title="Tailored Improvements"
                description="Specify your goals to get personalized improvements that match your writing style."
              />
              <BenefitCard
                icon={<Smile size={24} />}
                title="User-Friendly Interface"
                description="Easily navigate and improve your text without any technical expertise required."
              />
              <BenefitCard
                icon={<CheckCircle size={24} />}
                title="Free & Unlimited Use"
                description="Enjoy unlimited access to the AI Text Improver at no cost and without signup."
              />
              <BenefitCard
                icon={<Paperclip size={24} />}
                title="Versatile Applications"
                description="Perfect for students, professionals, and anyone looking to enhance their writing."
              />
              <BenefitCard
                icon={<TextCursor size={24} />}
                title="Instant Results"
                description="Receive improved text instantly, saving you time and effort in the writing process."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Text Improver</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter Your Original Text"
                description="Paste the text you want to improve into the provided field, up to 1000 characters."
              />
              <StepItem
                number="2"
                title="Specify Your Improvement Goal"
                description="Clearly state what you want to achieve, whether it’s clarity, conciseness, or creativity."
              />
              <StepItem
                number="3"
                title="Generate Improved Text"
                description="Click 'Improve Text' to receive a refined version of your text tailored to your goals."
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
