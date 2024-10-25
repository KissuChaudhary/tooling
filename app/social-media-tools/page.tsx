import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Search, ShoppingBag, Image, Star, Volume2 } from 'lucide-react'
import { Metadata } from 'next'
import AdUnit from '../../components/AdUnit'


const tools = [
  {
    icon: <Image className="h-8 w-8 text-purple-500" />,
    title: "AI Image Generator",
    description: "Create unique images using AI technology.",
    link: "/tools/ai-image-generator"
  },
  {
    icon: <ShoppingBag className="h-8 w-8 text-red-600" />,
    title: "AI Product Description Generator",
    description: "Generate detailed product descriptions for your e-commerce needs.",
    link: "/tools/ai-product-description-generator"
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-blue-500" />,
    title: "AI Slogan Generator",
    description: "Create catchy slogans for your brand or product.",
    link: "/tools/ai-slogan-generator"
  },
  {
    icon: <Star className="h-8 w-8 text-yellow-500" />,
    title: "AI Review Generator",
    description: "Generate authentic-looking product reviews.",
    link: "/tools/ai-review-generator"
  },
  {
    icon: <Search className="h-8 w-8 text-green-600" />,
    title: "AI SEO Meta Description Generator",
    description: "Create effective meta descriptions for better SEO.",
    link: "/tools/ai-seo-meta-description-generator"
  },
  {
    icon: <Search className="h-8 w-8 text-sky-500" />,
    title: "AI SEO Title Generator",
    description: "Generate effective SEO titles to boost your content visibility.",
    link: "/tools/ai-seo-title-generator",
    badge: { text: "Popular", color: "bg-green-500" }
  },
  {
    icon: <Volume2 className="h-8 w-8 text-green-500" />,
    title: "AI Text to Speech",
    description: "Convert your text into natural-sounding speech.",
    link: "/tools/ai-text-to-speech"
  },
]

export function generateMetadata(): Metadata {
  const pageTitle = 'Explore All Free AI Tools | Your Site Name'
  const pageDescription = 'Unleash your creativity and boost productivity with our cutting-edge AI-powered tools. Discover a wide range of free AI tools for various tasks.'

  return {
    title: pageTitle,
    description: pageDescription,
  }
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen py-16">
      <main className="container mx-auto px-6
         <AdUnit 
          client="ca-pub-7915372771416695"
          slot="8441706260"
          style={{ marginTop: '20px' }}
        />
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-center animate-fade-in-down">
          Explore All Free AI Tools
        </h1>
        <p className="text-xl md:text-2xl mb-16 text-center max-w-3xl mx-auto animate-fade-in-up">
          Unleash your creativity and boost productivity with our cutting-edge AI-powered tools.
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
          slot="6282756837"
          style={{ marginTop: '20px' }}
        />
      </main>
    </div>
  )
}
