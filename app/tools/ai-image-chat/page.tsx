import ImageChat from '@/components/ImageChat'
import Head from 'next/head';
import Script from 'next/script';
import React from 'react';
import { Image, Pencil, Text, MessageCircle, Eye, Globe } from 'lucide-react';
import AdUnit from '@/components/AdUnit';
import ToolEngagement from '@/components/tool-engagement';

export const metadata = {
  title: "AI Image Chat Tool | Chat with Images and Convert to Text - Saze AI",
  description: "Use the AI Image Chat Tool by Saze AI to chat with images, convert images to text, and engage in interactive conversations using image inputs. Perfect for professionals, content creators, and more.",
  keywords: "AI image chat, chat with image, image-to-text, AI image converter, image-based conversation, interactive AI tools, Saze AI",
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

export default function AIImageChatToolPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-image-chat-tool" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Image Chat Tool - Saze AI",
          "description": "Use the AI Image Chat Tool by Saze AI to chat with images, convert images to text, and engage in interactive conversations using image inputs.",
          "url": "https://sazeai.com/tools/ai-image-chat-tool",
        })}
      </Script>
      <Script id="schema-ai-image-chat-tool-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Image Chat Tool - Saze AI",
          "description": "Use the AI Image Chat Tool by Saze AI to chat with images, convert images to text, and engage in interactive conversations using image inputs.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-image-chat-tool",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <ImageChat />
        <ToolEngagement 
          toolName="AI Image Chat Tool"
        />
        <AdUnit 
          client="ca-pub-7915372771416695"
          slot="8441706260"
          style={{ marginBottom: '20px' }}
        />

        {/* What is AI Image Chat Tool Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Image Chat Tool?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Image Chat Tool by Saze AI allows you to chat with images, convert images to text, and engage in meaningful image-based conversations. Whether you need to extract information from an image, conduct an image-to-text conversion, or interact with AI using visual inputs, this tool is perfect for users looking for an innovative way to communicate through images.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Image Chat Tool</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Image size={24} />}
                title="Image-Based Interaction"
                description="Engage in chats using images as inputs, enhancing communication with visual content."
              />
              <BenefitCard
                icon={<Pencil size={24} />}
                title="Chat with Images"
                description="Start conversations with AI by uploading images, letting the AI respond intelligently to visual content."
              />
              <BenefitCard
                icon={<Text size={24} />}
                title="Image-to-Text Conversion"
                description="Instantly convert images to text, making it easy to extract key details from photos or screenshots."
              />
              <BenefitCard
                icon={<MessageCircle size={24} />}
                title="Interactive Conversations"
                description="Engage in dynamic, interactive conversations that combine text and image-based input for richer communication."
              />
              <BenefitCard
                icon={<Eye size={24} />}
                title="Visual Content Insights"
                description="Analyze and generate insights from images, helping users understand and process visual information quickly."
              />
              <BenefitCard
                icon={<Globe size={24} />}
                title="Multi-Language Support"
                description="Chat with images and convert text in multiple languages, making this tool accessible for a global audience."
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Image Chat Tool</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Upload an Image"
                description="Start by uploading an image to the tool, whether it's a screenshot, photo, or graphic."
              />
              <StepItem
                number="2"
                title="Initiate the Chat"
                description="Use the image as input to start a conversation with the AI. You can ask questions or request insights based on the image."
              />
              <StepItem
                number="3"
                title="Convert Image to Text"
                description="If you need text extracted from the image, simply choose the image-to-text option for instant conversion."
              />
              <StepItem
                number="4"
                title="Engage with Results"
                description="Review the AI's responses or the extracted text, and continue the chat or use the data as needed."
              />
              <StepItem
                number="5"
                title="Download or Share"
                description="Save the text results or share the image-based conversation with others."
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
