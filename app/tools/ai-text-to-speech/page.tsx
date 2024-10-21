import Head from 'next/head';
import EnhancedAzureTextToSpeech from '@/components/EnhancedAzureTextToSpeech';
import Script from 'next/script';
import React from 'react';
import { Speaker, Volume2, Clock, Fingerprint, UserCheck, Headphones } from 'lucide-react';
import AdUnit from '@/components/AdUnit'

export const metadata = {
  title: "AI Text-to-Speech | Convert Text to Speech - Saze AI",
  description: "Transform your written content into spoken words effortlessly with Saze AI's Text-to-Speech synthesizer. Choose from over 200 voices and customize pitch, rate, and volume for a personalized audio experience.",
  keywords: "AI text-to-speech, Text-to-speech synthesizer free, Convert text to speech online, Best text-to-speech software, AI voice generator, Free text-to-speech converter, Text-to-speech voice options",
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

export default function AITextToSpeechPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <Script id="schema-ai-text-to-speech" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Text-to-Speech - Saze AI",
          "description": "Transform your written content into spoken words effortlessly with Saze AI's Text-to-Speech synthesizer. Choose from over 200 voices and customize pitch, rate, and volume for a personalized audio experience.",
          "url": "https://sazeai.com/tools/ai-text-to-speech",
        })}
      </Script>
      <Script id="schema-ai-text-to-speech-webapp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Text-to-Speech - Saze AI",
          "description": "Transform your written content into spoken words effortlessly with Saze AI's Text-to-Speech synthesizer. Choose from over 200 voices and customize pitch, rate, and volume for a personalized audio experience.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "url": "https://sazeai.com/tools/ai-text-to-speech",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
          },
        })}
      </Script>

      <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
        <EnhancedAzureTextToSpeech />
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        {/* What is AI Text-to-Speech Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">What is AI Text-to-Speech?</h2>
            <p className="leading-relaxed text-base text-muted-foreground">
              The AI Text-to-Speech tool by Saze AI enables you to convert any text into natural-sounding speech. With a wide selection of over 200 voices to choose from, you can easily customize pitch, rate, and volume to create the perfect audio output for your needs.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Benefits of Using the AI Text-to-Speech</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                icon={<Speaker size={24} />}
                title="Natural Voice Options"
                description="Choose from a variety of over 200 natural-sounding voices for your text."
              />
              <BenefitCard
                icon={<Volume2 size={24} />}
                title="Adjustable Settings"
                description="Customize pitch, rate, and volume to tailor the audio to your preferences."
              />
              <BenefitCard
                icon={<Clock size={24} />}
                title="Easy to Use"
                description="Quickly convert your text to speech with a user-friendly interface."
              />
              <BenefitCard
                icon={<Fingerprint size={24} />}
                title="Multiple Languages"
                description="Supports various languages and accents, enhancing accessibility."
              />
              <BenefitCard
                icon={<UserCheck size={24} />}
                title="Cloud-Based Service"
                description="Access the tool from anywhere with an internet connection, no downloads required."
              />
              <BenefitCard
                icon={<Headphones size={24} />}
                title="Versatile Applications"
                description="Ideal for creating audiobooks, voiceovers, and more!"
              />
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use the AI Text-to-Speech Tool</h2>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Enter Text"
                description="Paste or type the text you want to convert to speech in the designated area."
              />
              <StepItem
                number="2"
                title="Choose Voice"
                description="Select from over 200 voice options available in the dropdown menu."
              />
              <StepItem
                number="3"
                title="Adjust Settings"
                description="Customize the pitch, rate, and volume to suit your audio preferences."
              />
              <StepItem
                number="4"
                title="Synthesize Speech"
                description="Click the 'Synthesize Speech' button to convert your text to audio."
              />
              <StepItem
                number="5"
                title="Listen and Download"
                description="Play back the audio or download it for future use."
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
