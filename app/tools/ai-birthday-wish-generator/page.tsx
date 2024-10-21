import Head from 'next/head';
import BirthdayWishGenerator from '@/components/AIBirthdayForm';
import Script from 'next/script';
import React from 'react';
import { Clock, Fingerprint, UserCheck, MessageCircle, Eye, RefreshCw } from 'lucide-react';
import AdUnit from '@/components/AdUnit'

export const metadata = {
    title: "AI Birthday Wish Generator | Personalized Birthday Messages - Saze AI",
    description: "Create heartwarming birthday wishes instantly with our AI-powered birthday wish generator. Perfect for sending personalized messages to friends, family, and loved ones.",
};

interface BenefitCardProps {
    icon: React.ReactElement;
    title: string;
    description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => (
    <div className="bg-gray-50 p-6 rounded-lg">
        <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-500 mb-4">
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

export default function BirthdayWishPage() {
    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </Head>
            {/* Schema for AI Birthday Wish Generator */}
            <Script id="schema-ai-birthday-wish-generator" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": "AI Birthday Wish Generator - Saze AI",
                    "description": "Generate heartfelt and personalized birthday wishes in seconds using AI. Perfect for friends, family, and colleagues.",
                    "url": "https://sazeai.com/tools/ai-birthday-wish-generator",
                })}
            </Script>
            <Script id="schema-ai-birthday-wish-generator-webapp" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "AI Birthday Wish Generator",
                    "description": "An AI tool to create personalized birthday wishes instantly. Perfect for sending heartwarming messages to friends and family.",
                    "applicationCategory": "EntertainmentApplication",
                    "operatingSystem": "All",
                    "url": "https://sazeai.com/tools/ai-birthday-wish-generator",
                    "offers": {
                        "@type": "Offer",
                        "price": "0.00",
                        "priceCurrency": "USD",
                    },
                })}
            </Script>
            <div className="min-h-screen" >
                <BirthdayWishGenerator />
                <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
                {/* What is AI Birthday Wish Generator Section */}
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8 text-center">
                            What is the AI Birthday Wish Generator?
                        </h2>
                        <p className="leading-relaxed text-base">
                            The AI Birthday Wish Generator is an innovative tool designed to help you create heartfelt and personalized birthday messages instantly. 
                            Whether you're celebrating a friend's special day or sending warm wishes to family, this generator takes the hassle out of crafting the perfect message. 
                            Just enter a few key details about the recipient, and let the AI create a custom birthday wish that will make them feel cherished and loved.
                        </p>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8 text-center">
                            Why Use the AI Birthday Wish Generator?
                        </h2>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <BenefitCard
                                icon={<Clock size={24} />}
                                title="Save Time"
                                description="Instantly create beautiful birthday wishes without the struggle of thinking of the perfect words."
                            />
                            <BenefitCard
                                icon={<Fingerprint size={24} />}
                                title="Make It Special"
                                description="Personalize each wish with details about the recipient, making it feel thoughtful and unique."
                            />
                            <BenefitCard
                                icon={<UserCheck size={24} />}
                                title="Touch Hearts"
                                description="Generate warm and heartfelt birthday messages that show you care."
                            />
                            <BenefitCard
                                icon={<MessageCircle size={24} />}
                                title="Celebrate with Style"
                                description="Use creative and fun birthday messages that bring a smile to your loved ones."
                            />
                            <BenefitCard
                                icon={<Eye size={24} />}
                                title="Add a Personal Touch"
                                description="Customize your birthday wishes with personal anecdotes or inside jokes."
                            />
                            <BenefitCard
                                icon={<RefreshCw size={24} />}
                                title="Perfect for Any Occasion"
                                description="Generate wishes for friends, family, coworkers, or anyone else in your life with ease."
                            />
                        </div>
                    </div>
                </section>

                {/* How to Use Section */}
                <section className="py-12 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
                            How to Use the AI Birthday Wish Generator
                        </h2>
                        <div className="space-y-8">
                            <StepItem
                                number="1"
                                title="Enter Recipient's Name"
                                description="Provide the birthday person's name to personalize the wish."
                            />
                            <StepItem
                                number="2"
                                title="Enter Age"
                                description="Specify the age of the birthday person to add a special touch."
                            />
                            <StepItem
                                number="3"
                                title="Your Relationship"
                                description="Indicate your relationship with the recipient (e.g., friend, sibling, coworker) for a tailored message."
                            />
                            
                            <StepItem
                                number="4"
                                title="Generate & Review"
                                description="Click 'Generate' to create your custom birthday wish, and review it for any adjustments."
                            />
                            <StepItem
                                number="5"
                                title="Copy & Send"
                                description="Copy the birthday message and send it via text, social media, or even in a greeting card!"
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
