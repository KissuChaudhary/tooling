import UsernameGenerator from '@/components/UsernameGenerator';
import ToolEngagement from '@/components/tool-engagement';
import Head from 'next/head';
import Script from 'next/script';
import RelatedTools from '@/components/related-tools'
import AdUnit from '@/components/AdUnit'
import { User, Sparkles, Clock, Target, Fingerprint } from 'lucide-react';

export const metadata = {
  title: "AI Username Generator | Create Unique and Creative Usernames",
  description: "Generate unique and creative usernames with our AI Username Generator. Perfect for social media, gaming, or any online presence.",
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

export default function AIUsernameGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-ai-username-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Username Generator - Saze AI",
          "description": "Generate unique and creative usernames with our AI Username Generator. Perfect for social media, gaming, or any online presence.",
          "url": "https://sazeai.com/tools/ai-username-generator",
        })}
      </Script>
      <div className="min-h-screen" style={{ paddingBottom: '3rem' }}>
        <UsernameGenerator />
        <ToolEngagement 
          toolName="AI Username Generator"
        />
        <AdUnit 
          client="ca-pub-7915372771416695"
          slot="8441706260"
          style={{ marginBottom: '20px' }}
        />
        <RelatedTools currentToolLink="/tools/ai-username-generator" />
        {/* Benefits Section */}
        <section className="py-12 bg-white bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Username Generator</h2>
            <p className="leading-relaxed text-base">
              Introducing AI Username Generator by SazeAI, your ultimate solution for creating unique and creative usernames. Harnessing the power of advanced AI, this innovative tool generates personalized usernames based on your interests and style preferences. Whether you're setting up a new social media account, creating a gaming persona, or establishing an online presence, AI Username Generator ensures you get distinctive, memorable usernames every time.
            </p>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
              Benefits of Using the AI Username Generator
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Sparkles size={24} />}
                title="Unique Creations"
                description="Generate one-of-a-kind usernames that stand out from the crowd."
              />
              <BenefitCard
                icon={<User size={24} />}
                title="Personalized Results"
                description="Get usernames tailored to your interests and style preferences."
              />
              <BenefitCard
                icon={<Clock size={24} />}
                title="Time-Saving"
                description="Instantly generate multiple username options, saving you time and effort."
              />
              <BenefitCard
                icon={<Target size={24} />}
                title="Versatile Use"
                description="Perfect for social media, gaming, forums, and any online platform."
              />
              <BenefitCard
                icon={<Fingerprint size={24} />}
                title="Brand Identity"
                description="Create usernames that align with your personal or professional brand."
              />
            </div>
          </div>
        </section>
        {/* How to Use Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
              How to Use the AI Username Generator
            </h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter Your Interests"
                description="Input your interests or keywords that reflect your personality or brand."
              />
              <StepItem
                number="2"
                title="Select Your Style"
                description="Choose a style preference: fun, professional, creative, or gaming."
              />
              <StepItem
                number="3"
                title="Choose the Number of Usernames"
                description="Decide how many username options you want to generate."
              />
              <StepItem
                number="4"
                title="Generate and Review"
                description="Click 'Generate Usernames' and review the AI-generated options."
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
