import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Linkedin, Image, Instagram, Youtube } from 'lucide-react'
import { Metadata } from 'next'
import AdUnit from '../../components/AdUnit'


const tools = [
  {
    icon: <Image className="h-8 w-8 text-blue-500" />,
    title: "AI Caption Generator",
    description: "Create engaging captions for your images.",
    link: "/tools/ai-caption-generator"
  },


  {
    icon: <Instagram className="h-8 w-8 text-pink-600" />,
    title: "AI Instagram Caption Generator",
    description: "Generate engaging captions for your Instagram posts.",
    link: "/tools/ai-instagram-caption-generator"
  },

  {
    icon: <Linkedin className="h-8 w-8 text-blue-700" />,
    title: "AI LinkedIn Headline Generator",
    description: "Craft attention-grabbing LinkedIn headlines.",
    link: "/tools/ai-linkedin-headline-generator",
    badge: { text: "Popular", color: "bg-green-500" }
  },
  {
    icon: <Linkedin className="h-8 w-8 text-blue-600" />,
    title: "AI LinkedIn Post Generator",
    description: "Create engaging LinkedIn posts with AI.",
    link: "/tools/ai-linkedin-post-generator"
  },
  {
    icon: <Linkedin className="h-8 w-8 text-blue-700" />,
    title: "AI LinkedIn Summary Generator",
    description: "Craft effective LinkedIn summaries with AI.",
    link: "/tools/ai-linkedin-summary-generator"
  },

  {
    icon: <Lightbulb className="h-8 w-8 text-green-500" />,
    title: "AI Pickup Lines Generator",
    description: "Get creative and fun pickup lines for any occasion.",
    link: "/tools/ai-pickup-lines-generator",
    badge: { text: "Popular", color: "bg-green-500" }
  },


  {
    icon: <Youtube className="h-8 w-8 text-red-600" />,
    title: "AI YouTube Title Generator",
    description: "Create catchy titles for your YouTube videos.",
    link: "/tools/ai-youtube-title-generator"
  },
  {
    icon: <Instagram className="h-8 w-8 text-purple-600" />,
    title: "Instagram Bio Generator",
    description: "Create engaging Instagram bios with AI assistance.",
    link: "/tools/instagram-bio-generator"
  },
  {
    icon: <Image className="h-8 w-8 text-indigo-500" />,
    title: "Realistic Influencer Image Prompts",
    description: "Generate realistic image prompts for influencer content.",
    link: "/tools/ai-influencer-prompt-generator",
    badge: { text: "Hot", color: "bg-red-500" }

  }
]

export function generateMetadata(): Metadata {
  const pageTitle = 'Free AI Social Media Tools - SazeAI'
  const pageDescription = 'Elevate your social media game with SazeAI’s free AI tools—instant setup and unlimited features for optimizing content and engagement.'

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: 'https://sazeai.com/social-media-tools',
      siteName: 'Saze AI',
      images: [
        {
          url: 'https://sazeai.com/images/screenshot.png',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: 'https://sazeai.com/tools',
    },
  }
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen py-16">
      <main className="container mx-auto px-6">
      <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-center animate-fade-in-down">
          Explore All AI Social Media Tools
        </h1>
        <p className="text-xl md:text-2xl mb-16 text-center max-w-3xl mx-auto animate-fade-in-up">
          Elevate your social media game with SazeAI’s free AI tools—instant setup and unlimited features for optimizing content and engagement.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {tools.map((tool, index) => (
            <Link key={index} href={tool.link} passHref>
              <Card className="group transition-all duration-300 hover:shadow-xl hover:scale-105">
                <CardHeader className="relative pb-0">
                  <div className="absolute top-4 left-4 bg-gray-100 rounded-full p-3 transition-all duration-300 group-hover:scale-110">
                    {tool.icon}
                  </div>
                  {tool.badge && (
                    <Badge 
                      variant="secondary" 
                      className={`absolute top-4 right-4 text-xs font-semibold ${tool.badge.color} px-2 py-1 rounded-md`}
                    >
                      {tool.badge.text}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="pt-16">
                  <CardTitle className="text-xl font-bold mb-2">{tool.title}</CardTitle>
                  <CardDescription className="text-sm">{tool.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
      </main>
    </div>
  )
}

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Free AI Social Media Tools - SazeAI',
  description: 'Elevate your social media game with SazeAI’s free AI tools—instant setup and unlimited features for optimizing content and engagement.',
  url: 'https://sazeai.com/social-media-tools',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.title,
      description: tool.description,
      url: `https://sazeai.com${tool.link}`
    }))
  }
}