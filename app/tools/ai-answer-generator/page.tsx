import AnswerGenerator from '@/components/AIAnswerForm';
import ToolEngagement from '@/components/tool-engagement';
import Head from 'next/head';
import Script from 'next/script';
import AdUnit from '@/components/AdUnit'
import { Book, Lightbulb, Clock, Target, Sparkles } from 'lucide-react';

export const metadata = {
  title: "AI Answer Generator | Instant Answers for Any Question - USaze AI",
  description: "Get instant, accurate answers with our AI Answer Generator. Ideal for students, professionals, and anyone seeking quick information.",
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
          "description": "Get instant, accurate answers with our AI Answer Generator. Ideal for students, professionals, and anyone seeking quick information.",
          "url": "https://sazeai.com/tools/ai-answer-generator",
        })}
      </Script>
      <div className="min-h-screen" style={{ paddingBottom: '3rem' }}>
        <AnswerGenerator />
         <ToolEngagement 
          toolName="AI Answer Generator"
        />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
<RelatedTools currentToolLink="/tools/ai-answer-generator" />
        {/* Benefits Section */}
        <section className="py-12 bg-white bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center"> What is AI Answer Generator</h2>
          <p className="leading-relaxed text-base">Introducing AI Answer Generator by SazeAI, your go-to solution for crafting detailed and accurate answers to all your questions. Leveraging advanced data analysis, this powerful tool generates well-informed, clear responses, helping you save time and make better decisions. Whether for research, customer queries, or general knowledge, AI Answer Generator ensures you get precise, reliable information every time.
          </p></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
              Benefits of Using the AI Answer Generator
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Clock size={24} />}
                title="Instant Answers"
                description="Get quick and accurate answers, saving you time when researching."
              />
              <BenefitCard
                icon={<Lightbulb size={24} />}
                title="Wide Range of Topics"
                description="Find answers to questions across various subjects and industries."
              />
              <BenefitCard
                icon={<Book size={24} />}
                title="Fact-Checked Information"
                description="Access reliable and well-researched information for every question."
              />
              <BenefitCard
                icon={<Target size={24} />}
                title="Precise Results"
                description="Get answers tailored to your specific questions and needs."
              />
              <BenefitCard
                icon={<Sparkles size={24} />}
                title="Easy to Use"
                description="Our simple interface makes it easy to ask questions and get answers."
              />
            </div>
          </div>
        </section>
         {/* How to Use Section */}
<section className="py-12 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
      How to Use the AI Answer Generator
    </h2>
    <div className="space-y-8">
      <StepItem
        number="1"
        title="Choose the Model"
        description="Select your preferred AI model, either GPT-4o or Gemini, depending on your needs."
      />
      <StepItem
        number="2"
        title="Enter Your Question"
        description="Type the question or query you need an answer for. Make it specific for the best results."
      />
      <StepItem
        number="3"
        title="Hit the Generate Button"
        description="Click the 'Generate' button to get instant, well-researched answers from our AI."
      />
      <StepItem
        number="4"
        title="Review and Copy"
        description="Review the generated answer and copy it to use in your research, reports, or personal projects."
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
