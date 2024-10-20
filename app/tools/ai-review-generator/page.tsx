import Head from 'next/head';
import ReviewGenerator from '@/components/AIReviewForm';
import Script from 'next/script';
import React from 'react';
import { Star, ThumbsUp, RefreshCw, Eye, CheckCircle, MessageCircle } from 'lucide-react';

export const metadata = {
  title: "AI Review Generator | Free Product & Customer Reviews - Saze AI",
  description: "Generate detailed product reviews with the AI Review Generator by Saze AI. Input the product name, rating, and aspects to review for an instant, comprehensive review in seconds.",
  keywords: "Ai review generator free, Best ai review generator, AI book review generator free, Free customer review Generator, AI review Writer free, AI article review generator, Review Generator online, AI feedback generator for teachers",
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

export default function AIReviewGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-review-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Review Generator - Free Product & Customer Reviews - Saze AI",
          "description": "Generate detailed product reviews with the AI Review Generator by Saze AI. Input the product name, rating, and aspects to review for an instant, comprehensive review in seconds.",
          "url": "https://sazeai.com/tools/ai-review-generator",
        })}
      </Script>
      <Script id="schema-ai-review-generator-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Review Generator - Free Product & Customer Reviews - Saze AI",
          "description": "Generate detailed product reviews with the AI Review Generator by Saze AI. Input the product name, rating, and aspects to review for an instant, comprehensive review in seconds.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-review-generator",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <ReviewGenerator />

        {/* What is AI Review Generator Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is the AI Review Generator?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Review Generator by Saze AI is designed to help users create comprehensive and insightful product, book, or customer reviews. Whether you’re reviewing a product you've recently purchased or writing a book review, this tool simplifies the process by generating an accurate and thoughtful review based on your inputs. Enter the product name, assign a rating, and list the aspects you want to discuss.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Review Generator</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Star size={24} />}
                title="Quick Reviews"
                description="Generate high-quality reviews for products, books, or services within seconds."
              />
              <BenefitCard
                icon={<ThumbsUp size={24} />}
                title="Multiple Aspects"
                description="Choose multiple aspects to review, such as quality, design, and functionality, to give a detailed assessment."
              />
              <BenefitCard
                icon={<CheckCircle size={24} />}
                title="Custom Ratings"
                description="Provide a rating (out of 5 stars) for a personalized review based on your experience."
              />
              <BenefitCard
                icon={<MessageCircle size={24} />}
                title="No Account Needed"
                description="Use the AI Review Generator for free, with no sign-up or login required."
              />
              <BenefitCard
                icon={<Eye size={24} />}
                title="Diverse Reviews"
                description="Create reviews for various products, books, software, or even customer feedback quickly and easily."
              />
              <BenefitCard
                icon={<RefreshCw size={24} />}
                title="Comprehensive Feedback"
                description="Ensure your reviews are insightful, highlighting both positive and constructive aspects."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Review Generator</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter the Product Name"
                description="Provide the name of the product, book, or service you want to review."
              />
              <StepItem
                number="2"
                title="Assign a Rating"
                description="Choose a rating for the product (out of 5 stars) based on your experience."
              />
              <StepItem
                number="3"
                title="Add Aspects to Review"
                description="List the aspects you want to review, such as quality, design, or functionality. You can add multiple aspects for a thorough evaluation."
              />
              <StepItem
                number="4"
                title="Generate Your Review"
                description="Click 'Generate Review' and receive a detailed review tailored to your inputs."
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
