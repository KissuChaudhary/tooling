import ImageCaptionGenerator from '@/components/ImageCaptionGenerator';
import ToolEngagement from '@/components/tool-engagement';
import Head from 'next/head';
import Script from 'next/script';
import RelatedTools from '@/components/related-tools'
import AdUnit from '@/components/AdUnit'
import { Image, Sparkles, Clock, Target, Fingerprint } from 'lucide-react';

export const metadata = {
  title: "AI Image Caption Generator | Create Accurate Descriptions for Your Images",
  description: "Generate detailed and accurate captions for your images with our AI Image Caption Generator. Perfect for content creators, marketers, and accessibility needs.",
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

export default function ImageCaptionGeneratorPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Script id="schema-image-caption-generator" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Image Caption Generator - Saze AI",
          "description": "Generate detailed and accurate captions for your images with our AI Image Caption Generator. Perfect for content creators, marketers, and accessibility needs.",
          "url": "https://sazeai.com/tools/image-caption-generator",
        })}
      </Script>
      <div className="min-h-screen" style={{ paddingBottom: '3rem' }}>
        <ImageCaptionGenerator />
        <ToolEngagement 
          toolName="AI Image Caption Generator"
        />
        <AdUnit 
          client="ca-pub-7915372771416695"
          slot="8441706260"
          style={{ marginBottom: '20px' }}
        />
        <RelatedTools currentToolLink="/tools/image-caption-generator" />
        {/* Benefits Section */}
        <section className="py-12 bg-white bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Image Caption Generator</h2>
            <p className="leading-relaxed text-base">
              Introducing AI Image Caption Generator by SazeAI, your ultimate solution for creating accurate and detailed captions for any image. Leveraging advanced AI technology, this powerful tool analyzes images and generates descriptive captions, saving time and enhancing accessibility. Whether you're a content creator, marketer, or working on improving web accessibility, our AI Image Caption Generator ensures you get precise, context-aware descriptions for your visual content.
            </p>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
              Benefits of Using the AI Image Caption Generator
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Clock size={24} />}
                title="Time-Saving"
                description="Generate accurate captions in seconds, streamlining your workflow."
              />
              <BenefitCard
                icon={<Sparkles size={24} />}
                title="AI-Powered Accuracy"
                description="Benefit from advanced AI that understands and describes image content with precision."
              />
              <BenefitCard
                icon={<Image size={24} />}
                title="Versatile Usage"
                description="Perfect for social media, blogs, e-commerce, and improving web accessibility."
              />
              <BenefitCard
                icon={<Target size={24} />}
                title="Customizable Output"
                description="Get captions tailored to your specific needs and preferences."
              />
              <BenefitCard
                icon={<Fingerprint size={24} />}
                title="Unique Descriptions"
                description="Each caption is uniquely generated based on the specific image content."
              />
            </div>
          </div>
        </section>
        {/* How to Use Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
              How to Use the AI Image Caption Generator
            </h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Upload Your Image"
                description="Enter the URL of the image you want to caption. Ensure it's a publicly accessible image link."
              />
              <StepItem
                number="2"
                title="Generate Caption"
                description="Click the 'Generate Caption' button to start the AI analysis of your image."
              />
              <StepItem
                number="3"
                title="Review the Result"
                description="The AI will provide a detailed caption describing the main elements of your image."
              />
              <StepItem
                number="4"
                title="Use or Refine"
                description="Use the generated caption as is, or use it as a starting point for further customization."
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
