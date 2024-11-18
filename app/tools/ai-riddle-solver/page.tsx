import RiddleSolver from '@/components/AiRiddle';
import ToolEngagement from '@/components/tool-engagement';
import Head from 'next/head';
import Script from 'next/script';
import RelatedTools from '@/components/related-tools';
import AdUnit from '@/components/AdUnit';
import { Puzzle, Lightbulb, Clock, Brain, Sparkles } from 'lucide-react';

export const metadata = {
  title: "AI Riddle Solver | Crack Any Riddle Instantly",
  description: "Solve riddles effortlessly with our AI Riddle Solver. Perfect for puzzle enthusiasts, trivia fans, and anyone who loves a good challenge.",
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

export default function AIRiddleSolverPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-ai-riddle-solver" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Riddle Solver - Saze AI",
          "description": "Solve riddles effortlessly with our AI Riddle Solver. Perfect for puzzle enthusiasts, trivia fans, and anyone who loves a good challenge.",
          "url": "https://sazeai.com/tools/ai-riddle-solver",
        })}
      </Script>
      <div className="min-h-screen" style={{ paddingBottom: '3rem' }}>
        <RiddleSolver />
        <ToolEngagement 
          toolName="AI Riddle Solver"
        />
        <AdUnit 
          client="ca-pub-7915372771416695"
          slot="8441706260"
          style={{ marginBottom: '20px' }}
        />
        <RelatedTools currentToolLink="/tools/ai-riddle-solver" />
        {/* Benefits Section */}
        <section className="py-12 bg-white bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center"> What is AI Riddle Solver?</h2>
            <p className="leading-relaxed text-base">
              Introducing AI Riddle Solver by SazeAI, your ultimate tool for solving tricky riddles in seconds. Whether you're stuck on a puzzle or testing your brainpower, our tool delivers precise, engaging answers instantly. It's perfect for trivia games, puzzles, or sharpening your mind.
            </p>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
              Benefits of Using the AI Riddle Solver
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Clock size={24} />}
                title="Quick Solutions"
                description="Solve riddles in seconds without frustration or delays."
              />
              <BenefitCard
                icon={<Lightbulb size={24} />}
                title="Creative Thinking"
                description="Enhance your critical thinking by exploring clever solutions."
              />
              <BenefitCard
                icon={<Puzzle size={24} />}
                title="Wide Puzzle Support"
                description="Supports riddles, trivia, and complex puzzles across various themes."
              />
              <BenefitCard
                icon={<Brain size={24} />}
                title="Educational Fun"
                description="Learn new perspectives while having fun solving riddles."
              />
              <BenefitCard
                icon={<Sparkles size={24} />}
                title="User-Friendly Interface"
                description="Enjoy a simple and intuitive design for smooth usage."
              />
            </div>
          </div>
        </section>
        {/* How to Use Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
              How to Use the AI Riddle Solver
            </h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter the Riddle"
                description="Type or paste the riddle you need help solving. Be as clear as possible."
              />
              <StepItem
                number="2"
                title="Click 'Solve'"
                description="Press the 'Solve' button to generate an instant and accurate solution."
              />
              <StepItem
                number="3"
                title="Analyze the Answer"
                description="Review the generated solution and apply it to your puzzle challenge."
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
