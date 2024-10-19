import EssayGenerator from '@/components/AIEssayForm'
import Head from 'next/head'
import Script from 'next/script'
import { Book, Lightbulb, Clock, Target, Sparkles } from 'lucide-react'

export const metadata = {
  title: "AI Essay Writer | Generate Essays with Ease - Unrealshot AI",
  description: "Generate well-structured essays effortlessly with our AI Essay Writer tool. Perfect for students and professionals alike.",
}

interface BenefitCardProps {
  icon: React.ReactElement
  title: string
  description: string
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => (
  <div className="border p-6 rounded-lg">
    <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
      {icon}
    </div>
    <h2 className="text-lg font-medium title-font mb-2">{title}</h2>
    <p className="leading-relaxed text-base">{description}</p>
  </div>
)

export default function AIEssayWriterPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-ai-essay-writer" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Essay Writer - Unrealshot AI",
          "description": "Generate well-structured essays effortlessly with our AI Essay Writer tool. Perfect for students and professionals alike.",
          "url": "https://www.unrealshot.com/ai-essay-writer",
        })}
      </Script>
      <div className="min-h-screen" style={{ paddingBottom: '3rem' }}>
        <EssayGenerator />
        
        {/* Benefits Section */}
        <section className="py-12 bg-white bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
              Benefits of Using the AI Essay Writer
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Clock size={24} />}
                title="Time-Saving"
                description="Generate essays quickly, allowing you to focus on refining and perfecting your work."
              />
              <BenefitCard
                icon={<Lightbulb size={24} />}
                title="Idea Generation"
                description="Get inspiration and new perspectives on your essay topics."
              />
              <BenefitCard
                icon={<Book size={24} />}
                title="Structured Writing"
                description="Ensure your essays have a clear structure with introduction, body, and conclusion."
              />
              <BenefitCard
                icon={<Target size={24} />}
                title="Targeted Content"
                description="Generate essays tailored to your specific topic and key points."
              />
              <BenefitCard
                icon={<Sparkles size={24} />}
                title="Improved Quality"
                description="Enhance the overall quality of your essays with well-researched content."
              />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
