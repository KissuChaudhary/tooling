import Head from 'next/head';
import CoverLetterWriter from '@/components/AICoverForm';
import Script from 'next/script';
import React from 'react';
import { Briefcase, Building, Settings, Clock, CheckCircle } from 'lucide-react';
import AdUnit from '@/components/AdUnit'
import ToolEngagement from '@/components/tool-engagement'

export const metadata = {
  title: "AI Cover Letter Writer | Create Professional Cover Letters - Saze AI",
  description: "Generate tailored cover letters for your job applications with our AI Cover Letter Writer. Save time and increase your chances of landing an interview.",
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

export default function AICoverLetterWriterPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-ai-cover-letter-writer" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Cover Letter Writer - Saze AI",
          "description": "Generate tailored cover letters for your job applications with our AI Cover Letter Writer. Save time and increase your chances of landing an interview.",
          "url": "https://sazeai.com/tools/ai-cover-letter-writer",
        })}
      </Script>
      <Script id="schema-ai-cover-letter-writer-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Cover Letter Writer - Saze AI",
          "description": "Generate tailored cover letters for your job applications with our AI Cover Letter Writer. Save time and increase your chances of landing an interview.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-cover-letter-writer",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <CoverLetterWriter />
        <ToolEngagement 
          toolName="AI Cover Letter Writer"
        />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI Cover Letter Writer Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Cover Letter Writer?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Cover Letter Writer by Saze AI allows you to create personalized, professional cover letters in minutes. By entering key information such as job title, company name, relevant skills, and experience, the AI generates a fully customized cover letter, helping you stand out to potential employers.
              Ideal for job seekers at any stage of their career.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Cover Letter Writer</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Briefcase size={24} />}
                title="Tailored to Job Role"
                description="Crafts a cover letter specific to the job you're applying for, boosting your chances."
              />
              <BenefitCard
                icon={<Building size={24} />}
                title="Custom for Each Company"
                description="Generates personalized cover letters tailored to the company you're targeting."
              />
              <BenefitCard
                icon={<Settings size={24} />}
                title="Highlights Key Skills"
                description="Emphasizes your most relevant skills, making you stand out as the perfect candidate."
              />
              <BenefitCard
                icon={<Clock size={24} />}
                title="Saves Time"
                description="Instantly generates cover letters, cutting down the time it takes to apply for jobs."
              />
              <BenefitCard
                icon={<CheckCircle size={24} />}
                title="Professional Formatting"
                description="Ensures your cover letter is formatted to professional standards."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Cover Letter Writer</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter the Job Title"
                description="Start by entering the job title you're applying for. This ensures the cover letter is customized for the specific role."
              />
              <StepItem
                number="2"
                title="Enter the Company Name"
                description="Provide the name of the company you're applying to, so the letter feels personal and targeted."
              />
              <StepItem
                number="3"
                title="List Your Key Skills"
                description="Add a list of your most relevant skills that match the job requirements."
              />
              <StepItem
                number="4"
                title="Describe Your Relevant Experience"
                description="Summarize your relevant experience, demonstrating why you're the ideal candidate."
              />
              <StepItem
                number="5"
                title="Generate Cover Letter"
                description="Click 'Generate Cover Letter' and get a polished, professional cover letter ready to submit."
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
