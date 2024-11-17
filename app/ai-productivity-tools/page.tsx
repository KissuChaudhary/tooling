import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Image, Zap, Star, Volume2 } from 'lucide-react'
import { Metadata } from 'next'
import AdUnit from '../../components/AdUnit'


const tools = [
  {
    icon: <Image className="h-8 w-8 text-blue-500" />,
    title: "AI Influencer Generator",
    description: "Create Realistic Social Media AI Influencer",
    link: "/tools/ai-influencer-generator",
    badge: { text: "Popular", color: "bg-green-500" }
  },
{
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
    title: "AI PDF Summarizer",
    description: "Upload PDF and get an AI-generated summary!",
    link: "/tools/ai-pdf-summarizer",
    badge: { text: "Popular", color: "bg-pink-500" }
  },
  {
    icon: <Star className="h-8 w-8 text-yellow-500" />,
    title: "AI Text Humanizer",
    description: "Transform AI-generated text into more human-like language!",
    link: "/tools/ai-text-humanizer",
    badge: { text: "Popular", color: "bg-pink-500" }
  },
    {
    icon: <Volume2 className="h-8 w-8 text-yellow-500" />,
    title: "AI Image Generator",
    description: "Free AI Image Generator for creative minds.",
    link: "/tools/ai-image-generator",
    badge: { text: "Hot", color: "bg-blue-500" }
  },

]

export function generateMetadata(): Metadata {
  const pageTitle = 'Explore All Free AI Image Editing Tools | Saze AI'
  const pageDescription = 'Discover a wide range of free AI-powered image editing tools designed to enhance your creativity and simplify your workflow.'

  return {
    title: pageTitle,
    description: pageDescription,
  }
}
export default function ToolsPage() {
  const adFrequency = 4 
  

  return (
    <div className="min-h-screen py-16">
      <main className="container mx-auto px-6">
           <AdUnit 
          client="ca-pub-7915372771416695"
          slot="8441706260"
          style={{ marginBottom: '20px' }}
        />
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-center animate-fade-in-down">
          Explore All Free AI Image Tools
        </h1>
        <p className="text-xl md:text-2xl mb-16 text-center max-w-3xl mx-auto animate-fade-in-up">
          Discover a wide range of free AI-powered image editing tools designed to enhance your creativity and simplify your workflow. 
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {tools.map((tool, index) => (
      <>
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
           {(index + 1) % adFrequency === 0 && index !== tools.length - 1 && (
                <div key={`ad-${index}`} className="col-span-full">
                  <AdUnit 
                    client="ca-pub-7915372771416695"
                    slot="8441706260"
                    style={{ margin: '20px 0' }}
                  />
                </div>
              )}
            </>
          ))}
        </div>
    
      </main>
    </div>
  )
}
