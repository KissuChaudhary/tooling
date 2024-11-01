'use client'

import InfluencerPromptGenerator from '@/components/AIInfluencerPrompt';
import Image from 'next/image';
import { Clock, Fingerprint, UserCheck, MessageCircle, Eye, RefreshCw, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import AdUnit from '@/components/AdUnit'
import ToolEngagement from '@/components/tool-engagement'

interface BenefitCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => (
  <div className="bg-background/50 dark:bg-background/80 shadow p-4 rounded-lg">
    <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
      {icon}
    </div>
    <h2 className="text-lg font-medium title-font mb-2">{title}</h2>
    <p className="leading-relaxed text-sm text-muted-foreground">{description}</p>
  </div>
);

interface StepItemProps {
  number: string;
  title: string;
  description: string;
}

const StepItem: React.FC<StepItemProps> = ({ number, title, description }) => (
  <div className="flex mb-6">
    <div className="flex-shrink-0 mr-4">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
        {number}
      </div>
    </div>
    <div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  </div>
);


const examplePrompts = [
  {
    prompt: "Create an ultra-realistic full-body portrait of a 25-year-old Australian woman standing casually outdoors, exuding a relaxed and confident vibe. She has blonde hair loosely styled and captivating blue eyes, dressed in a pair of stylish jean shorts and a cute fitted T-shirt that complements her toned physique. Her posture is laid-back yet confident, with one hand resting in her pocket and a slight smile on her face. The scene should have vibrant colors and sharp focus, capturing the casual, carefree atmosphere of a sunny day outdoors. Rendered in 12k resolution, the image should evoke a sense of youthfulness, confidence, and charm, with impeccable attention to detail",
    tag: "Perfect for: Fashion & Style Content",
    image: "/images/ai_image01.jpg",
    imagePosition: "right"
  },
  {
    prompt: "Create an ultra-realistic full-body portrait of a 25-year-old Australian woman standing in sleek sports gear that highlights her fit, perfect physique. She's wearing a form-fitting sports bra and high-waisted leggings. Her blonde hair is tied back in a ponytail, and she has a subtle smile expression. The setting should be an outdoor workout area or gym, with vibrant colors and sharp focus to capture the details of her muscular form and the active, empowered vibe. The image should radiate health, confidence, and athleticism, showcasing her perfect body in motion.",
    tag: "Perfect for: Fitness & Wellness Content",
    image: "/images/ai_image02.jpg",
    imagePosition: "left"
  },
  {
    prompt: "Create an exceptionally detailed and ultra-realistic full-body portrait of a 25-year-old Australian woman sitting comfortably on a sofa. She has striking blonde hair and captivating blue eyes, dressed in stylish sports attire that accentuates her athletic physique. The scene should capture her in a relaxed yet confident pose, exuding a blend of sophistication and youthful energy. Rendered in 12k resolution, the image must showcase meticulous attention to detail, with vibrant colors and sharp focus. Her expression should convey a sense of empowerment and calm, with the composition radiating a natural, cozy atmosphere.",
    tag: "Perfect for: Casual & Stylish Content",
    image: "/images/ai_image03.jpg",
    imagePosition: "right"
  },
  {
    prompt: "Create an ultra-realistic full-body portrait of a 25-year-old Indian woman standing casually outdoors, exuding a relaxed and confident vibe. She has blonde hair loosely styled and captivating blue eyes, dressed in a pair of stylish jean shorts and a cute fitted T-shirt that complements her toned physique. Her posture is laid-back yet confident, with one hand resting in her pocket and a slight smile on her face. The scene should have vibrant colors and sharp focus, capturing the casual, carefree atmosphere of a sunny day outdoors. Rendered in 12k resolution, the image should evoke a sense of youthfulness, confidence, and charm, with impeccable attention to detail.",
    tag: "Perfect for: Beauty & Makeup Content",
    image: "/images/ai_image04.jpg",
    imagePosition: "left"
  },
  {
    prompt: "Create an ultra-realistic full-body portrait of a 25-year-old Australian woman standing confidently in a modern office environment. She has sleek blonde hair styled in a professional manner and captivating blue eyes. She's dressed in a tailored navy-blue business suit with a white blouse and heels, her posture strong and upright, exuding authority and professionalism. The image, rendered in 12k resolution, should feature meticulous attention to detail with vibrant colors, capturing the sleek design of the office and her poised, commanding presence. The composition should radiate confidence, success, and sophistication in a corporate setting.",
    tag: "Perfect for: Office & Work Content",
    image: "/images/ai_image05.jpg",
    imagePosition: "right"
  },
  {
    prompt: "Create an ultra-realistic full-body portrait of a 25-year-old Australian woman mid-stretch in a park. She has blonde hair tied in a ponytail and captivating blue eyes, wearing a sleek sports outfit with a tank top and leggings, accentuating her fit physique. Her pose is dynamic as she stretches her legs, one foot resting on a park bench. Rendered in 12k resolution, the image should capture the fresh, natural atmosphere of the park, with lush greenery in the background. The composition should radiate energy, health, and an active lifestyle, with sharp focus and vibrant details that enhance the outdoor setting.",
    tag: "Perfect for: Sports & Athlete Content",
    image: "/images/ai_image06.jpg",
    imagePosition: "left"
  },
  {
    prompt: "Create an ultra-realistic full-body portrait of a 25-year-old Australian woman sitting casually at a café table outdoors. She has blonde hair loosely tied back and captivating blue eyes, dressed in a stylish, relaxed outfit consisting of a light denim jacket, white T-shirt, and ripped jeans. The scene captures her enjoying a cup of coffee, legs crossed, leaning slightly back in the chair with a confident, serene expression. Rendered in 12k resolution, the image should have vibrant colors and sharp focus, evoking a sense of calm, leisure, and modern sophistication. The café surroundings should enhance the cozy and social atmosphere.",
    tag: "Perfect for: Casual Outdoor scenes",
    image: "/images/ai_image07.jpg",
    imagePosition: "right"
  },
  {
    prompt: "Create an exceptionally detailed and ultra-realistic full-body portrait of a 25-year-old Australian woman walking with confidence. She has striking blonde hair and captivating blue eyes, dressed in stylish sports attire that highlights her athletic physique. The scene should capture her in motion, radiating youthful energy and vitality. Rendered in 12k resolution, the image must showcase meticulous attention to detail, with vibrant colors and sharp focus. Her movement should feel dynamic yet graceful, exuding both sophistication and empowerment, all while maintaining impeccable clarity and a sense of realism",
    tag: "Perfect for: Fitness Content",
    image: "/images/ai_image08.jpg",
    imagePosition: "left"
  },
  {
    prompt: "Create an exceptionally detailed, ultra-realistic full-body portrait of a strikingly attractive 25-year-old Australian woman. She should have lustrous blonde hair and captivating blue eyes, exuding a magnetic charm. Dressed in elegant party attire that accentuates her figure, the image should capture her confidence and allure. Render this masterpiece in stunning 12k resolution, showcasing meticulous attention to detail with a focus on premium quality. The composition should highlight her sophisticated yet youthful essence, featuring sharp focus, vibrant colors, and immaculate clarity—free from any blurriness. Ensure that her beauty is celebrated in a tasteful and artistic manner, embodying the perfect balance of elegance and vivacity.",
    tag: "Perfect for: Beautiful Girl Content",
    image: "/images/ai_image09.jpg",
    imagePosition: "right"
  },
  {
    prompt: "A photorealistic business photo of a 25-year-old American girl with long, flowing blonde hair and striking blue eyes Wearing black suit. She should have a natural, approachable expression and be illuminated by soft, golden-hour sunlight. Capture this image with a high-resolution photograph using an 85mm lens for a flattering perspective.",
    tag: "Perfect for: Beautiful Photo-realistic AI Girl",
    image: "/images/ai_image10.jpg",
    imagePosition: "left"
  }
];

export default function RealisticInfluencerImagePromptsPage() {
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({});

  const handleCopy = (index: number, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [index]: false }));
      }, 2000);
    });
  };

  return (
    <div className="min-h-screen pt-8">
      <InfluencerPromptGenerator />
      <ToolEngagement 
          toolName="Free AI Influencer Generator"
        />
      <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
      {/* Main SEO Content Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-6 text-center">
            Creating Perfect AI Influencer Images: Your Complete Guide
          </h2>
          <p className="text-lg mb-8 text-center max-w-3xl mx-auto text-muted-foreground">
            Want to create stunning AI-generated influencer images? Our advanced prompt generator helps you craft detailed prompts for creating lifelike social media influencer photos.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-xl font-bold mb-4">Key Features:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Detailed Age Customization</li>
                <li>Cultural Diversity Options</li>
                <li>Comprehensive Style Control</li>
                <li>Professional Photography Settings</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Popular Use Cases:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Social Media Content Creation</li>
                <li>Brand Marketing Materials</li>
                <li>Fashion and Beauty Demonstrations</li>
                <li>Lifestyle and Travel Content</li>
                <li>Product Photography</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold sm:text-3xl mb-6 text-center">
            Benefits of Using the AI Influencer Image Prompt Generator
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <BenefitCard
              icon={<Clock size={24} />}
              title="Time-Saving"
              description="Generate detailed prompts in seconds, streamlining your content creation process."
            />
            <BenefitCard
              icon={<Fingerprint size={24} />}
              title="Unique and Customizable"
              description="Create prompts tailored to your specific needs, ensuring unique and diverse influencer images."
            />
            <BenefitCard
              icon={<UserCheck size={24} />}
              title="Realistic Results"
              description="Our prompts are designed to generate highly realistic AI images that look authentic and engaging."
            />
            <BenefitCard
              icon={<MessageCircle size={24} />}
              title="Boost Engagement"
              description="Create eye-catching influencer content that resonates with your target audience and increases engagement."
            />
            <BenefitCard
              icon={<Eye size={24} />}
              title="Professional Quality"
              description="Generate prompts that result in high-quality, professional-looking influencer images."
            />
            <BenefitCard
              icon={<RefreshCw size={24} />}
              title="Endless Variety"
              description="Easily create diverse prompts for different scenarios, styles, and influencer types."
            />
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold mb-6 text-center">
            How to Use the AI Influencer Image Prompt Generator
          </h2>
          <div className="space-y-6">
            <StepItem
              number="1"
              title="Define Your Influencer"
              description="Specify the age, ethnicity, and key physical characteristics of your influencer."
            />
            <StepItem
              number="2"
              title="Choose the Setting"
              description="Select the environment or backdrop for your influencer image, such as outdoors, studio, or specific locations."
            />
            <StepItem
              number="3"
              title="Specify the Style"
              description="Define the clothing style, accessories, and overall aesthetic for your influencer image."
            />
            <StepItem
              number="4"
              title="Add Photography Details"
              description="Include specific camera settings, lighting conditions, and composition details for a professional look."
            />
            <StepItem
              number="5"
              title="Generate Your Prompt"
              description="Click the 'Generate Prompt' button to create a detailed, AI-friendly description for your influencer image."
            />
            <StepItem
              number="6"
              title="Refine and Use"
              description="Review the generated prompt, make any necessary adjustments, and use it with your preferred AI image generation tool."
            />
          </div>
        </div>
      </section>

      {/* Example Prompts Section */}
      <section className="py-8 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-extrabold sm:text-3xl mb-6 text-center">Ready-to-Use Example Prompts</h3>
          <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examplePrompts.map((example, index) => (
              <div key={index} className="bg-card shadow-lg rounded-lg overflow-hidden flex flex-col">
                <div className="relative w-full">
                  <Image
                    src={example.image}
                    alt={`Example ${index + 1}`}
                    width={500}
                    height={500}
                    layout="responsive"
                    objectFit="cover"
                    className="w-full h-auto"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="uppercase tracking-wide text-sm text-primary font-semibold mb-2">{example.tag}</div>
                  <p className="text-muted-foreground text-sm flex-grow overflow-y-auto max-h-40">{example.prompt}</p>
                  <div className="mt-4">
                    <button
                      onClick={() => handleCopy(index, example.prompt)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      {copiedStates[index] ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Prompt
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
    </div>
  );
}
