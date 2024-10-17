import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Sparkles, Brain, Lightbulb, PenTool, Feather, MessageSquare, User, BookOpen, Sunrise, Music, Puzzle, Search, Repeat, Quote } from 'lucide-react'
import { useTheme } from 'next-themes'

const tools = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "AI Essay Writer",
    description: "Generate essays with ease using AI technology.",
    link: "/tools/ai-essay-writer",
    badge: { text: "Popular", color: "bg-green-500" }
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "AI Text Improver",
    description: "Enhance the quality of your text with AI suggestions.",
    link: "/tools/ai-text-improver"
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "AI Story Generator",
    description: "Create engaging stories using advanced AI algorithms.",
    link: "/tools/ai-story-generator",
    badge: { text: "New", color: "bg-blue-500" }
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "AI Pickup Lines Generator",
    description: "Get creative pickup lines for any occasion.",
    link: "/tools/ai-pickup-lines"
  },
  {
    icon: <PenTool className="h-6 w-6" />,
    title: "AI Thesis Statement",
    description: "Generate compelling thesis statements for your essays.",
    link: "/tools/ai-thesis-statement"
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "AI Answer Generator",
    description: "Receive precise answers to your questions using AI.",
    link: "/tools/ai-answer-generator"
  },
  {
    icon: <Feather className="h-6 w-6" />,
    title: "AI Metaphor Generator",
    description: "Generate creative metaphors to enhance your writing.",
    link: "/tools/ai-metaphor-generator",
    badge: { text: "Hot", color: "bg-red-500" }
  },
  {
    icon: <Feather className="h-6 w-6" />,
    title: "AI Poem Generator",
    description: "Craft beautiful poems with the help of AI.",
    link: "/tools/ai-poem-generator"
  },
  {
    icon: <User className="h-6 w-6" />,
    title: "AI Character Generator",
    description: "Create unique characters for your stories or projects.",
    link: "/tools/ai-character-generator"
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "AI Conclusion Generator",
    description: "Generate impactful conclusions for your writing.",
    link: "/tools/ai-conclusion-generator"
  },
  {
    icon: <Sunrise className="h-6 w-6" />,
    title: "AI Haiku Generator",
    description: "Generate traditional haikus with AI assistance.",
    link: "/tools/ai-haiku-generator"
  },
  {
    icon: <PenTool className="h-6 w-6" />,
    title: "AI Intro Writer",
    description: "Create engaging introductions for your content.",
    link: "/tools/ai-intro-writer"
  },
  {
    icon: <Music className="h-6 w-6" />,
    title: "AI Lyric Generator",
    description: "Compose unique lyrics for your music projects.",
    link: "/tools/ai-lyric-generator"
  },
  {
    icon: <Puzzle className="h-6 w-6" />,
    title: "AI Plot Generator",
    description: "Generate intriguing plot ideas for your stories.",
    link: "/tools/ai-plot-generator"
  },
  {
    icon: <Quote className="h-6 w-6" />,
    title: "AI Quotes Generator",
    description: "Get inspiring and thought-provoking quotes.",
    link: "/tools/ai-quotes-generator"
  },
  {
    icon: <Music className="h-6 w-6" />,
    title: "AI Rhyme Generator",
    description: "Find perfect rhymes for your poems and lyrics.",
    link: "/tools/ai-rhyme-generator"
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "AI SEO Title Generator",
    description: "Generate effective SEO titles to boost your content visibility.",
    link: "/tools/ai-seo-title-generator",
    badge: { text: "Popular", color: "bg-green-500" }
  },
  {
    icon: <Repeat className="h-6 w-6" />,
    title: "AI Paraphrasing Tool",
    description: "Rephrase your text in 5 different writing styles to reach your audience.",
    link: "/tools/ai-paraphrasing-tool"
  }
]

export default function ToolsPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen py-16 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900' : 'bg-gradient-to-br from-gray-100 via-purple-100 to-blue-100'}`}>
      <main className="container mx-auto px-4">
        <h1 className={`text-5xl md:text-6xl font-extrabold mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'} animate-fade-in-down`}>
          Discover Our AI Tools
        </h1>
        <p className={`text-xl md:text-2xl mb-16 text-center max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} animate-fade-in-up`}>
          Unleash your creativity and boost productivity with our cutting-edge AI-powered tools.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {tools.map((tool, index) => (
            <Link href={tool.link} key={index} className="group perspective">
              <Card className={`h-full ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl rounded-lg overflow-hidden`}>
                <div className="relative h-40 overflow-hidden">
                  <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'} transition-transform duration-300 ease-in-out transform group-hover:scale-125`}>
                      {tool.icon}
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2 relative">
                  <CardTitle className="text-xl font-bold line-clamp-1">
                    {tool.title}
                  </CardTitle>
                  {tool.badge && (
                    <Badge 
                      variant="secondary" 
                      className={`absolute top-0 right-0 text-xs font-semibold text-white ${tool.badge.color} px-2 py-1 rounded-bl-md`}
                    >
                      {tool.badge.text}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <CardDescription className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} line-clamp-2`}>
                    {tool.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
