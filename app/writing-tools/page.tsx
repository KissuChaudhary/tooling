import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Sparkles, Brain,  PenTool, Feather, MessageSquare, User, BookOpen, Sunrise, Music, Puzzle,  Repeat, Quote, Mail, Book, History, FileText, Edit,  Heart, Cake } from 'lucide-react'
import { Metadata } from 'next'
import AdUnit from '../../components/AdUnit'

const tools = [
  {
    icon: <MessageSquare className="h-8 w-8 text-indigo-500" />,
    title: "AI Answer Generator",
    description: "Generate precise answers to your questions using AI.",
    link: "/tools/ai-answer-generator"
  },
  {
    icon: <History className="h-8 w-8 text-purple-600" />,
    title: "AI Backstory Generator",
    description: "Develop engaging backstories for your characters.",
    link: "/tools/ai-backstory-generator"
  },
  {
    icon: <Cake className="h-8 w-8 text-pink-500" />,
    title: "AI Birthday Wish Generator",
    description: "Create personalized birthday wishes with AI.",
    link: "/tools/ai-birthday-wish-generator"
  },
  {
    icon: <Book className="h-8 w-8 text-yellow-600" />,
    title: "AI Book Title Generator",
    description: "Generate compelling titles for your books.",
    link: "/tools/ai-book-title-generator"
  },
  {
    icon: <User className="h-8 w-8 text-orange-500" />,
    title: "AI Character Generator",
    description: "Create unique characters for your stories or projects.",
    link: "/tools/ai-character-generator"
  },
  {
    icon: <BookOpen className="h-8 w-8 text-emerald-500" />,
    title: "AI Conclusion Generator",
    description: "Generate impactful conclusions for your writing.",
    link: "/tools/ai-conclusion-generator"
  },
  {
    icon: <FileText className="h-8 w-8 text-green-600" />,
    title: "AI Cover Letter Writer",
    description: "Write persuasive cover letters with AI.",
    link: "/tools/ai-cover-letter-writer"
  },
  {
    icon: <Mail className="h-8 w-8 text-blue-600" />,
    title: "AI Email Generator",
    description: "Create professional emails with AI assistance.",
    link: "/tools/ai-email-generator"
  },
  {
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
    title: "AI Essay Writer",
    description: "Generate well-structured essays on any topic with ease.",
    link: "/tools/ai-essay-writer",
    badge: { text: "Popular", color: "bg-green-500" }
  },
  {
    icon: <Sunrise className="h-8 w-8 text-amber-500" />,
    title: "AI Haiku Generator",
    description: "Generate traditional haikus with AI assistance.",
    link: "/tools/ai-haiku-generator"
  },
  {
    icon: <PenTool className="h-8 w-8 text-cyan-500" />,
    title: "AI Intro Writer",
    description: "Create engaging introductions for your content.",
    link: "/tools/ai-intro-writer"
  },
  {
    icon: <Heart className="h-8 w-8 text-red-500" />,
    title: "AI Love Letter Writer",
    description: "Compose heartfelt love letters with AI assistance.",
    link: "/tools/ai-love-letter-writer"
  },
  {
    icon: <Music className="h-8 w-8 text-rose-500" />,
    title: "AI Lyric Generator",
    description: "Compose unique lyrics for your music projects.",
    link: "/tools/ai-lyric-generator"
  },
  {
    icon: <Feather className="h-8 w-8 text-pink-500" />,
    title: "AI Metaphor Generator",
    description: "Generate creative metaphors to enhance your writing.",
    link: "/tools/ai-metaphor-generator",
    badge: { text: "Hot", color: "bg-red-500" }
  },
  {
    icon: <Repeat className="h-8 w-8 text-indigo-500" />,
    title: "AI Paraphrasing Tool",
    description: "Rephrase your text in different writing styles.",
    link: "/tools/ai-paraphrasing-tool"
  },
  {
    icon: <Puzzle className="h-8 w-8 text-violet-500" />,
    title: "AI Plot Generator",
    description: "Generate intriguing plot ideas for your stories.",
    link: "/tools/ai-plot-generator"
  },
  {
    icon: <Feather className="h-8 w-8 text-teal-500" />,
    title: "AI Poem Generator",
    description: "Craft beautiful poems with the help of AI.",
    link: "/tools/ai-poem-generator"
  },
  {
    icon: <Edit className="h-8 w-8 text-orange-600" />,
    title: "AI Punctuation Checker",
    description: "Check and correct punctuation in your texts.",
    link: "/tools/ai-punctuation-checker"
  },
  {
    icon: <Quote className="h-8 w-8 text-lime-500" />,
    title: "AI Quotes Generator",
    description: "Get inspiring and thought-provoking quotes.",
    link: "/tools/ai-quotes-generator"
  },
  {
    icon: <Music className="h-8 w-8 text-fuchsia-500" />,
    title: "AI Rhyme Generator",
    description: "Find perfect rhymes for your poems and lyrics.",
    link: "/tools/ai-rhyme-generator"
  },
  {
    icon: <Brain className="h-8 w-8 text-blue-500" />,
    title: "AI Story Generator",
    description: "Create engaging stories with advanced AI algorithms.",
    link: "/tools/ai-story-generator",
    badge: { text: "New", color: "bg-blue-500" }
  },
  {
    icon: <Sparkles className="h-8 w-8 text-purple-500" />,
    title: "AI Text Improver",
    description: "Enhance your writing with AI-powered suggestions and improvements.",
    link: "/tools/ai-text-improver"
  },
  {
    icon: <PenTool className="h-8 w-8 text-red-500" />,
    title: "AI Thesis Statement Generator",
    description: "Generate compelling thesis statements for your essays.",
    link: "/tools/ai-thesis-statement-generator"
  },
   {
    icon: <Brain className="h-8 w-8 text-indigo-500" />,
    title: "Free AI Rizz Generator",
    description: "Get the cheesy, clever, flirty lines to impress your someone.",
    link: "/tools/ai-rizz-generator"
  }
]

export function generateMetadata(): Metadata {
  const pageTitle = "Free AI Writing Tools - SazeAI"
  const pageDescription = "Generate text effortlessly with SazeAI's free AI writing tools. No sign-up, unlimited features for all your writing needs."

  return {
    title: pageTitle,
    description: pageDescription,
  }
}
export default function ToolsPage() {
  const adFrequency = 8
    

  return (
    <div className="min-h-screen py-16">
      <main className="container mx-auto px-6">
        <AdUnit 
          client="ca-pub-7915372771416695"
          slot="8441706260"
          style={{ marginBottom: '20px' }}
        />
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-center animate-fade-in-down">
          Explore All AI Writing Tools
        </h1>
        <p className="text-xl md:text-2xl mb-16 text-center max-w-3xl mx-auto animate-fade-in-up">
          Generate text effortlessly with SazeAI's free AI writing tools. No sign-up, unlimited features for all your writing needs.
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
        <AdUnit 
          client="ca-pub-7915372771416695"
          slot="8441706260"
          style={{ marginBottom: '20px' }}
        />
      </main>
    </div>
  )
}
