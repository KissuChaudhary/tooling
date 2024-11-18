import RiddleGenerator from '@/components/RiddleGenerator';
import ToolEngagement from '@/components/tool-engagement';
import Head from 'next/head';
import Script from 'next/script';
import RelatedTools from '@/components/related-tools';
import AdUnit from '@/components/AdUnit';
import { Puzzle, Lightbulb, Clock, Brain, Sparkles } from 'lucide-react';

export const metadata = {
  title: "AI Riddle Generator | Create Fun & Engaging Riddles Instantly",
  description: "Generate clever riddles in seconds with our AI Riddle Generator. Perfect for creating puzzles, brain teasers, and fun challenges effortlessly.",
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

export default function AIRiddleGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-ai-riddle-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Riddle Generator - Saze AI",
          "description": "Generate clever riddles in seconds with our AI Riddle Generator. Perfect for creating puzzles, brain teasers, and fun challenges effortlessly.",
          "url": "https://sazeai.com/tools/ai-riddle-generator",
        })}
      </Script>
      <div className="min-h-screen" style={{ paddingBottom: '3rem' }}>
        <RiddleGenerator />
        <ToolEngagement toolName="AI Riddle Generator" />
        <AdUnit
          client="ca-pub-7915372771416695"
          slot="8441706260"
          style={{ marginBottom: '20px' }}
        />
        <RelatedTools currentToolLink="/tools/ai-riddle-generator" />
        {/* Benefits Section */}
        <section className="py-12 bg-white bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center"> What is AI Riddle Generator?</h2>
            <p className="leading-relaxed text-base">
              The AI Riddle Generator by SazeAI is your go-to tool for crafting creative and challenging riddles effortlessly. Whether you're a teacher, trivia host, or puzzle enthusiast, this tool delivers engaging riddles customized to your preferences.
            </p>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
              Benefits of Using the AI Riddle Generator
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Clock size={24} />}
                title="Fast Riddle Creation"
                description="Generate high-quality riddles instantly without delays."
              />
              <BenefitCard
                icon={<Lightbulb size={24} />}
                title="Boost Creativity"
                description="Use the tool to spark ideas and design unique brain teasers."
              />
              <BenefitCard
                icon={<Puzzle size={24} />}
                title="Customizable Difficulty"
                description="Choose from easy, medium, or hard levels to suit your audience."
              />
              <BenefitCard
                icon={<Brain size={24} />}
                title="Fun and Educational"
                description="Create riddles that entertain and challenge minds of all ages."
              />
              <BenefitCard
                icon={<Sparkles size={24} />}
                title="User-Friendly Design"
                description="Enjoy a simple interface designed for easy and seamless use."
              />
            </div>
          </div>
        </section>
        {/* How to Use Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
              How to Use the AI Riddle Generator
            </h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Choose Your Topic"
                description="Enter a specific topic or theme for your riddle to make it engaging."
              />
              <StepItem
                number="2"
                title="Select Difficulty"
                description="Pick the difficulty level: easy, medium, or hard, based on your needs."
              />
              <StepItem
                number="3"
                title="Generate Riddle"
                description="Click the 'Generate Riddle' button and receive your riddle instantly."
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
