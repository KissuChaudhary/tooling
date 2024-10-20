import Head from 'next/head';
import PlotGenerator from '@/components/AIPlotForm';
import Script from 'next/script';
import React from 'react';
import { Film, Globe, Users, Sparkles, BookOpen, Rocket } from 'lucide-react';

export const metadata = {
  title: "[FREE] AI Plot Generator | Create Story Ideas Online - No Login, Unlimited",
  description: "Generate unique and creative story plots with the free AI Plot Generator. No login required, unlimited plots in genres like mystery, romance, and sci-fi.",
  keywords: "free AI plot generator, free story generator",
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

export default function AIPlotGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-plot-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "[FREE] AI Plot Generator - Saze AI",
          "description": "Generate unique and creative story plots with the free AI Plot Generator. No login required, unlimited plots in genres like mystery, romance, and sci-fi.",
          "url": "https://sazeai.com/tools/ai-plot-generator",
        })}
      </Script>
      <Script id="schema-ai-plot-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "[FREE] AI Plot Generator - Saze AI",
          "description": "Generate story ideas quickly and easily with our AI Plot Generator. Choose from genres like romance, mystery, and sci-fi.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-plot-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <PlotGenerator />

        {/* What is AI Plot Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is the AI Plot Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The free AI Plot Generator by Saze AI helps you generate unique story ideas and plots based on the parameters you provide. Whether you're writing a novel, screenplay, or short story, this tool instantly creates compelling plots across various genres such as mystery, romance, sci-fi, and more. No login required, and you can generate unlimited plots for free.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Plot Generator</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Film size={24} />}
                title="Genre Variety"
                description="Generate plots for multiple genres including romance, mystery, fantasy, and more."
              />
              <BenefitCard
                icon={<Globe size={24} />}
                title="Creative Settings"
                description="Input unique settings and let the AI craft engaging environments for your story."
              />
              <BenefitCard
                icon={<Users size={24} />}
                title="Complex Characters"
                description="Create well-rounded characters by providing character traits, roles, and names."
              />
              <BenefitCard
                icon={<Sparkles size={24} />}
                title="Instant Plot Creation"
                description="Generate fully-formed story plots instantly, giving you quick inspiration for your writing projects."
              />
              <BenefitCard
                icon={<BookOpen size={24} />}
                title="Unlimited Use"
                description="Use the AI Plot Generator as many times as you want, with no restrictions or logins required."
              />
              <BenefitCard
                icon={<Rocket size={24} />}
                title="Free & Easy"
                description="Enjoy unlimited access to the plot generator for free and without any complicated setup."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Plot Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter the Genre"
                description="Select or type the genre of your story, whether it's sci-fi, romance, mystery, or another."
              />
              <StepItem
                number="2"
                title="Describe the Setting"
                description="Provide details about the time period and location where your story takes place."
              />
              <StepItem
                number="3"
                title="Add Characters"
                description="Describe the main characters, their roles, names, and traits to shape the plot."
              />
              <StepItem
                number="4"
                title="Generate Plot"
                description="Click 'Generate Plot' to instantly receive a unique, creative plot for your story."
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
