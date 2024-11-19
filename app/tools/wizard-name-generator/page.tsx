import WizardGenerator from '@/components/WizardGenerator';
import ToolEngagement from '@/components/tool-engagement';
import Head from 'next/head';
import Script from 'next/script';
import RelatedTools from '@/components/related-tools'
import AdUnit from '@/components/AdUnit'
import { Wand2, Sparkles, Clock, Target, Fingerprint } from 'lucide-react';

export const metadata = {
  title: "Wizard Name Generator | Create Mystical and Unique Wizard Names",
  description: "Generate mystical and unique wizard names with our AI-powered Wizard Name Generator. Perfect for fantasy writers, game developers, and RPG enthusiasts.",
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

export default function WizardNameGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-wizard-name-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Wizard Name Generator - Saze AI",
          "description": "Generate mystical and unique wizard names with our AI-powered Wizard Name Generator. Perfect for fantasy writers, game developers, and RPG enthusiasts.",
          "url": "https://sazeai.com/tools/wizard-name-generator",
        })}
      </Script>
      <div className="min-h-screen" style={{ paddingBottom: '3rem' }}>
        <WizardGenerator />
        <ToolEngagement 
          toolName="Wizard Name Generator"
        />
        <AdUnit 
          client="ca-pub-7915372771416695"
          slot="8441706260"
          style={{ marginBottom: '20px' }}
        />
        <RelatedTools currentToolLink="/tools/wizard-name-generator" />
        {/* Benefits Section */}
        <section className="py-12 bg-white bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is Wizard Name Generator</h2>
            <p className="leading-relaxed text-base">
              Introducing the Wizard Name Generator by SazeAI, your ultimate solution for creating mystical and unique wizard names. Harnessing the power of advanced AI, this innovative tool generates personalized wizard names based on magic types and personality traits. Whether you're a fantasy writer, game developer, or RPG enthusiast, the Wizard Name Generator ensures you get distinctive, memorable names for your magical characters every time.
            </p>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
              Benefits of Using the Wizard Name Generator
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Wand2 size={24} />}
                title="Magical Creations"
                description="Generate one-of-a-kind wizard names that capture the essence of magic."
              />
              <BenefitCard
                icon={<Sparkles size={24} />}
                title="Tailored Results"
                description="Get names customized to specific magic types and personality traits."
              />
              <BenefitCard
                icon={<Clock size={24} />}
                title="Time-Saving"
                description="Instantly generate multiple wizard name options, saving you time and creative energy."
              />
              <BenefitCard
                icon={<Target size={24} />}
                title="Versatile Use"
                description="Perfect for fantasy novels, role-playing games, and character creation."
              />
              <BenefitCard
                icon={<Fingerprint size={24} />}
                title="Unique Identity"
                description="Create wizard names that stand out and leave a lasting impression on your audience."
              />
            </div>
          </div>
        </section>
        {/* How to Use Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
              How to Use the Wizard Name Generator
            </h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Select Magic Type"
                description="Choose from elemental, necromancy, illusion, enchantment, or divination magic types."
              />
              <StepItem
                number="2"
                title="Describe Personality"
                description="Input personality traits or characteristics for your wizard."
              />
              <StepItem
                number="3"
                title="Choose Number of Names"
                description="Decide how many wizard name options you want to generate."
              />
              <StepItem
                number="4"
                title="Generate and Review"
                description="Click 'Generate Wizard Names' and review the AI-generated magical names."
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
