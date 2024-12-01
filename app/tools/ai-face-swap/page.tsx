import Head from 'next/head';
import FaceSwapTool from '@/components/FaceSwapTool';
import Script from 'next/script';
import React from 'react';
import { Image, Smile, Shield, Clock, Star } from 'lucide-react';
import AdUnit from '@/components/AdUnit';
import RelatedTools from '@/components/related-tools'
import ToolEngagement from '@/components/tool-engagement';

export const metadata = {
  title: "100% Free AI Face Swap Online - No Sign-Up Needed",
  description: "Swap faces online for free with our AI face swap tool. No sign-up required—just upload your photo and create fun, realistic face swaps instantly!",
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

export default function AIFaceSwapToolPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-ai-face-swap-tool" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "100% Free AI Face Swap Online - No Sign-Up Needed",
          "description": "Easily create fun face swaps using our AI Face Swap Tool. Upload your photos and see amazing results in just seconds.",
          "url": "https://sazeai.com/tools/ai-face-swap-tool",
        })}
      </Script>
      <Script id="schema-ai-face-swap-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "100% Free AI Face Swap Online - No Sign-Up Needed",
          "description": "Easily create fun face swaps using our AI Face Swap Tool. Upload your photos and see amazing results in just seconds.",
          "applicationCategory": "EntertainmentApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-face-swap",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <h1 className="text-3xl font-bold mb-6 text-center">100% Free AI Face Swap Online - No Sign-Up Needed</h1>
        <p className="text-center>Swap faces online for free with our AI face swap tool. No sign-up required—just upload your photo and create fun, realistic face swaps instantly!</p>
        <FaceSwapTool />
        <ToolEngagement toolName="AI Face Swap Tool" />
        <AdUnit 
          client="ca-pub-7915372771416695"
          slot="8441706260"
          style={{ marginBottom: '20px' }}
        />
<RelatedTools currentToolLink="/tools/ai-face-swap" />

        {/* What is AI Face Swap Tool Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is the AI Face Swap Tool?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Face Swap Tool makes face swapping simple and fun. Just upload your photos, and the tool will create unique swaps that look seamless. Perfect for fun projects, social media, or creative edits.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Why Use the AI Face Swap Tool?</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Image size={24} />}
                title="High-Quality Swaps"
                description="Get realistic and smooth face swaps that look amazing in any setting."
              />
              <BenefitCard
                icon={<Smile size={24} />}
                title="Easy to Use"
                description="No technical skills needed. Just upload your photo, and you’re good to go."
              />
              <BenefitCard
                icon={<Shield size={24} />}
                title="Privacy Protected"
                description="Your photos are processed securely, and all data is deleted after 60 minutes."
              />
              <BenefitCard
                icon={<Clock size={24} />}
                title="Fast Processing"
                description="See your face swap results in just a few seconds."
              />
              <BenefitCard
                icon={<Star size={24} />}
                title="Free and Fun"
                description="Enjoy creating face swaps for free with endless possibilities."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Face Swap Tool</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Upload Your Photos"
                description="Choose the photos you want to swap faces from and upload them to the tool."
              />
              <StepItem
                number="2"
                title="Adjust Your Swap"
                description="Select which faces to swap. The tool automatically detects and swaps them seamlessly."
              />
              <StepItem
                number="3"
                title="Preview and Download"
                description="Check the result, and if you're happy, download your swapped photo instantly."
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
