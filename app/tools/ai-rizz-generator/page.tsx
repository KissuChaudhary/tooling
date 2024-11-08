import AIRizzGenerator from '@/components/rizzGenerator';
import ToolEngagement from '@/components/tool-engagement';
import Head from 'next/head';
import Script from 'next/script';
import AdUnit from '@/components/AdUnit'
import { MessageCircle, Sparkles, Target, Zap, Heart } from 'lucide-react';

export const metadata = {
  title: "AI Rizz Generator | Instant Pickup Lines and Smooth Talk - USaze AI",
  description: "Generate smooth, tailored pickup lines with our AI Rizz Generator. Perfect for dating, social interactions, and boosting your confidence.",
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

export default function AIRizzGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-ai-rizz-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "100% FREE AI Rizz Generator | No signup, No Payment",
          "description": "Generate smooth, tailored pickup lines with our AI Rizz Generator. Perfect for dating, social interactions, and boosting your confidence.",
          "url": "https://sazeai.com/tools/ai-rizz-generator",
        })}
      </Script>
      <div className="min-h-screen" style={{ paddingBottom: '3rem' }}>
        <AIRizzGenerator />
        <ToolEngagement 
          toolName="AI Rizz Generator"
        />
        <AdUnit 
          client="ca-pub-7915372771416695"
          slot="8441706260"
          style={{ marginBottom: '20px' }}
        />
        {/* Benefits Section */}
        <section className="py-12 bg-white bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Rizz Generator</h2>
            <p className="leading-relaxed text-base">Introducing AI Rizz Generator by SazeAI, your ultimate wingman for crafting smooth, tailored pickup lines and conversation starters. Harnessing the power of advanced AI, this innovative tool generates witty, context-appropriate rizz lines to boost your confidence and charm in social interactions. Whether you're looking to break the ice, impress a date, or simply add some flair to your conversations, AI Rizz Generator ensures you'll always have the perfect line at your fingertips.</p>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
              Benefits of Using the AI Rizz Generator
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<MessageCircle size={24} />}
                title="Instant Smooth Talk"
                description="Get quick and clever pickup lines tailored to your specific situation."
              />
              <BenefitCard
                icon={<Sparkles size={24} />}
                title="Variety of Styles"
                description="Choose from different rizz styles to match your personality and the context."
              />
              <BenefitCard
                icon={<Target size={24} />}
                title="Targeted Approach"
                description="Generate lines specifically tailored to your target audience and situation."
              />
              <BenefitCard
                icon={<Zap size={24} />}
                title="Confidence Boost"
                description="Arm yourself with witty lines to enhance your social confidence."
              />
              <BenefitCard
                icon={<Heart size={24} />}
                title="Icebreaker Magic"
                description="Break the ice effortlessly with AI-generated conversation starters."
              />
            </div>
          </div>
        </section>
        {/* How to Use Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
              How to Use the AI Rizz Generator
            </h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Set the Context"
                description="Describe the situation or setting where you'll use your rizz line."
              />
              <StepItem
                number="2"
                title="Choose Your Style"
                description="Select the style of rizz you want, from smooth to cheesy, nerdy to romantic."
              />
              <StepItem
                number="3"
                title="Specify Your Target"
                description="Describe your target audience to ensure the rizz is appropriately tailored."
              />
              <StepItem
                number="4"
                title="Pick the Intensity"
                description="Choose how intense you want your rizz to be, from mild to extra spicy."
              />
              <StepItem
                number="5"
                title="Generate and Deliver"
                description="Hit generate, review your personalized rizz, and confidently deliver it in your next interaction."
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
