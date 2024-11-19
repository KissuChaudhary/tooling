import NameCombiner from '@/components/NameCombiner';
import ToolEngagement from '@/components/tool-engagement';
import Head from 'next/head';
import Script from 'next/script';
import RelatedTools from '@/components/related-tools';
import AdUnit from '@/components/AdUnit';
import { Check, Shuffle, Clipboard, Smile, Star } from 'lucide-react';

export const metadata = {
  title: "Name Combiner AI | Create Unique Name Ideas Instantly",
  description: "Generate creative and unique name combinations with our Name Combiner AI. Perfect for baby names, business ideas, or fun combinations.",
};

interface BenefitCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => (
  <div className="border p-6 rounded-lg">
    <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
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
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500 text-white">
        {number}
      </div>
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default function NameCombinerAIPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-name-combiner-ai" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Name Combiner AI - Saze AI",
          "description": "Generate creative and unique name combinations with our Name Combiner AI. Perfect for baby names, business ideas, or fun combinations.",
          "url": "https://sazeai.com/tools/name-combiner-ai",
        })}
      </Script>
      <div className="min-h-screen" style={{ paddingBottom: '3rem' }}>
        <NameCombiner />
        <ToolEngagement toolName="Name Combiner AI" />
        <AdUnit 
          client="ca-pub-7915372771416695"
          slot="8441706260"
          style={{ marginBottom: '20px' }}
        />
        <RelatedTools currentToolLink="/tools/name-combiner-ai" />
        {/* Benefits Section */}
        <section className="py-12 bg-white bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is Name Combiner AI?</h2>
            <p className="leading-relaxed text-base">Introducing Name Combiner AI by SazeAI — a smart tool that creates unique and creative name combinations in seconds. Whether you're brainstorming baby names, brand names, or just for fun, this tool helps you explore endless possibilities. Simplify your search for meaningful and creative names today!</p>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
              Benefits of Using Name Combiner AI
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Shuffle size={24} />}
                title="Creative Name Ideas"
                description="Generate unique and innovative name combinations effortlessly."
              />
              <BenefitCard
                icon={<Check size={24} />}
                title="Multi-Name Support"
                description="Combine up to four names for diverse and meaningful results."
              />
              <BenefitCard
                icon={<MagicWand size={24} />}
                title="Customizable Options"
                description="Choose how many combined names you want, from shortlists to longlists."
              />
              <BenefitCard
                icon={<Smile size={24} />}
                title="Easy to Use"
                description="A simple interface makes it accessible for everyone, anytime."
              />
              <BenefitCard
                icon={<Star size={24} />}
                title="Versatile Applications"
                description="Perfect for baby names, team names, businesses, or fun projects."
              />
            </div>
          </div>
        </section>
        {/* How to Use Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
              How to Use Name Combiner AI
            </h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter Number of People"
                description="Select how many names you want to combine — from two to four."
              />
              <StepItem
                number="2"
                title="Input Names"
                description="Add the names you wish to combine for creative suggestions."
              />
              <StepItem
                number="3"
                title="Set Preferences"
                description="Choose the number of combined names to generate in the results."
              />
              <StepItem
                number="4"
                title="Combine Names"
                description="Click 'Combine Names' to instantly view unique name combinations."
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
