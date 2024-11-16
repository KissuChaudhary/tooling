import Head from 'next/head';
import BookTitleGenerator from '@/components/AIBookTitle';
import Script from 'next/script';
import React from 'react';
import { Book, Lightbulb, Clock, Target, Sparkles } from 'lucide-react';
import AdUnit from '@/components/AdUnit'
import ToolEngagement from '@/components/tool-engagement'

export const metadata = {
  title: "Free AI Book Title Generator | Create Unique Book Titles",
  description: "Effortlessly create unique and engaging book titles with our AI Book Title Generator. Perfect for authors, writers, and publishers.",
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

export default function AIBookTitleGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-ai-book-title-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Book Title Generator - Saze AI",
          "description": "Effortlessly create unique and engaging book titles with our AI Book Title Generator. Perfect for authors, writers, and publishers.",
          "url": "https://sazeai.com/tools/ai-book-title-generator",
        })}
      </Script>
      <Script id="schema-ai-book-title-generator-webapp" type="application/ld+json">
        {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "AI Book Title Generator - Saze AI",
            "description": "Effortlessly create unique and engaging book titles with our AI Book Title Generator. Perfect for authors, writers, and publishers.",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "All",
            "url": "https://sazeai.com/tools/ai-book-title-generator",
            "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "USD",
            },
        })}
    </Script>
      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <BookTitleGenerator />
        <ToolEngagement 
          toolName="AI Book Title Generator"
        />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI Book Title Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Book Title Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Book Title Generator by SazeAI helps authors, writers, and publishers quickly generate creative and catchy book titles. 
              Whether you’re stuck in a creative rut or need fresh ideas, this tool uses advanced AI to generate titles that reflect your book’s genre, themes, and style.
              Just provide a few details, like your book’s genre, plot summary, or keywords, and the AI will generate a list of unique and engaging title options for you to choose from.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
              Benefits of Using the AI Book Title Generator
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Clock size={24} />}
                title="Fast and Efficient"
                description="Generate book titles quickly, allowing you to focus on writing and publishing."
              />
              <BenefitCard
                icon={<Lightbulb size={24} />}
                title="Creative Boost"
                description="Receive creative, engaging, and genre-appropriate title suggestions to inspire your writing."
              />
              <BenefitCard
                icon={<Book size={24} />}
                title="Diverse Options"
                description="Get a variety of title options, ranging from fun and quirky to serious and dramatic."
              />
              <BenefitCard
                icon={<Target size={24} />}
                title="Tailored Suggestions"
                description="Customize your title suggestions by providing key information like genre and plot."
              />
              <BenefitCard
                icon={<Sparkles size={24} />}
                title="Simple and Easy"
                description="Our user-friendly interface makes generating book titles quick and simple."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">
              How to Use the AI Book Title Generator
            </h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter Book Details"
                description="Start by entering your book’s genre, a brief plot summary, or some important keywords."
              />
              <StepItem
                number="2"
                title="Select Tone"
                description="Choose whether you want the title to be serious, playful, or quirky."
              />
              <StepItem
                number="3"
                title="Click Generate"
                description="Click 'Generate Book Title' to receive a list of suggested titles."
              />
              <StepItem
                number="4"
                title="Pick Your Favorite"
                description="Browse the generated titles and pick the one that best fits your book."
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
