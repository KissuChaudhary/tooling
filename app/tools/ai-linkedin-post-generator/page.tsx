import Head from 'next/head';
import LinkedInPostGenerator from '@/components/LinkedInPostGenerator';
import Script from 'next/script';
import React from 'react';
import { Hash, Heart, Smile, MessageCircle, Target, Users } from 'lucide-react';
import AdUnit from '@/components/AdUnit'
import ToolEngagement from '@/components/tool-engagement'

export const metadata = {
  title: "AI LinkedIn Post Generator | Create Engaging LinkedIn Posts - Saze AI",
  description: "Create professional LinkedIn posts with the AI LinkedIn Post Generator by Saze AI. Input your topic, key points, tone, and call to action to generate a personalized post instantly.",
  keywords: "AI LinkedIn Post Generator, LinkedIn content writing, AI content generation, professional LinkedIn posts, Saze AI",
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

export default function AILinkedInPostGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-linkedin-post-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI LinkedIn Post Generator - Saze AI",
          "description": "Create professional LinkedIn posts with the AI LinkedIn Post Generator by Saze AI. Input your topic, key points, tone, and call to action to generate a personalized post instantly.",
          "url": "https://sazeai.com/tools/ai-linkedin-post-generator",
        })}
      </Script>
      <Script id="schema-ai-linkedin-post-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI LinkedIn Post Generator - Saze AI",
          "description": "Create professional LinkedIn posts with the AI LinkedIn Post Generator by Saze AI. Input your topic, key points, tone, and call to action to generate a personalized post instantly.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-linkedin-post-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <LinkedInPostGenerator />
       <ToolEngagement 
          toolName="AI Linkedin Post Generator"
        />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI LinkedIn Post Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI LinkedIn Post Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI LinkedIn Post Generator by Saze AI helps you craft professional, engaging, and tailored LinkedIn posts. Whether you're sharing industry insights, personal achievements, or company updates, this tool ensures your posts resonate with your audience and include all key elements like topic, tone, key points, and a call to action.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI LinkedIn Post Generator</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Heart size={24} />}
                title="Custom Topics"
                description="Generate LinkedIn posts on any topic—industry trends, personal milestones, or business insights."
              />
              <BenefitCard
                icon={<Smile size={24} />}
                title="Key Point Clarity"
                description="Highlight essential points that keep your audience focused on the key message."
              />
              <BenefitCard
                icon={<Hash size={24} />}
                title="Tone Control"
                description="Set the perfect tone for your LinkedIn post—professional, casual, or persuasive."
              />
              <BenefitCard
                icon={<MessageCircle size={24} />}
                title="Effective CTAs"
                description="Add a clear call to action to drive engagement, whether it's a comment, share, or follow-up."
              />
              <BenefitCard
                icon={<Target size={24} />}
                title="Engage Specific Audiences"
                description="Tailor your post to connect with your professional network and industry peers."
              />
              <BenefitCard
                icon={<Users size={24} />}
                title="Boost Engagement"
                description="Increase visibility and engagement by writing posts that resonate with your LinkedIn audience."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI LinkedIn Post Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter the Topic"
                description="Provide the main topic for your post, whether it's about business insights, career updates, or industry trends."
              />
              <StepItem
                number="2"
                title="Add Key Points"
                description="Enter the key points you want to highlight in your post. These should capture the core message and keep the reader engaged."
              />
              <StepItem
                number="3"
                title="Select the Tone"
                description="Choose the tone for your post—whether it's professional, conversational, or thought-provoking, depending on your content."
              />
              <StepItem
                number="4"
                title="Add a Call to Action"
                description="Include a compelling call to action, encouraging readers to engage by commenting, sharing, or following up."
              />
              <StepItem
                number="5"
                title="Generate Your LinkedIn Post"
                description="Click 'Generate LinkedIn Post' to create a tailored post that aligns with your topic, key points, tone, and audience."
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
