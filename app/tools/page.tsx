import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Sparkles, Brain, Lightbulb, PenTool, Feather, MessageSquare, User, BookOpen, Sunrise, Music, Puzzle, Search, Repeat, Quote } from 'lucide-react'

const tools = [
  {
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
    title: "AI Essay Writer",
    description: "Generate well-structured essays on any topic with ease.",
    link: "/tools/ai-essay-writer",
    badge: { text: "Popular", color: "bg-green-500" }
  },
  {
    icon: <Sparkles className="h-8 w-8 text-purple-500" />,
    title: "AI Text Improver",
    description: "Enhance your writing with AI-powered suggestions and improvements.",
    link: "/tools/ai-text-improver"
  },
  {
    icon: <Brain className="h-8 w-8 text-blue-500" />,
    title: "AI Story Generator",
    description: "Create engaging stories with advanced AI algorithms.",
    link: "/tools/ai-story-generator",
    badge: { text: "New", color: "bg-blue-500" }
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-green-500" />,
    title: "AI Pickup Lines",
    description: "Get creative and fun pickup lines for any occasion.",
    link: "/tools/ai-pickup-lines"
  },
  {
    icon: <PenTool className="h-8 w-8 text-red-500" />,
    title: "AI Thesis Statement",
    description: "Generate compelling thesis statements for your essays.",
    link: "/tools/ai-thesis-statement"
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-indigo-500" />,
    title: "AI Answer Generator",
    description: "Receive precise answers to your questions using AI.",
    link: "/tools/ai-answer-generator"
  },
  {
    icon: <Feather className="h-8 w-8 text-pink-500" />,
    title: "AI Metaphor Generator",
    description: "Generate creative metaphors to enhance your writing.",
    link: "/tools/ai-metaphor-generator",
    badge: { text: "Hot", color: "bg-red-500" }
  },
  {
    icon: <Feather className="h-8 w-8 text-teal-500" />,
    title: "AI Poem Generator",
    description: "Craft beautiful poems with the help of AI.",
    link: "/tools/ai-poem-generator"
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
    icon: <Music className="h-8 w-8 text-rose-500" />,
    title: "AI Lyric Generator",
    description: "Compose unique lyrics for your music projects.",
    link: "/tools/ai-lyric-generator"
  },
  {
    icon: <Puzzle className="h-8 w-8 text-violet-500" />,
    title: "AI Plot Generator",
    description: "Generate intriguing plot ideas for your stories.",
    link: "/tools/ai-plot-generator"
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
    icon: <Search className="h-8 w-8 text-sky-500" />,
    title: "AI SEO Title Generator",
    description: "Generate effective SEO titles to boost your content visibility.",
    link: "/tools/ai-seo-title-generator",
    badge: { text: "Popular", color: "bg-green-500" }
  },
  {
    icon: <Repeat className="h-8 w-8 text-indigo-500" />,
    title: "AI Paraphrasing Tool",
    description: "Rephrase your text in different writing styles to reach your audience.",
    link: "/tools/ai-paraphrasing-tool"
  }
]

export default function ToolsPage() {
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} py-16`}>

      <main className="container mx-auto px-6">

        <h1 className={`text-5xl md:text-6xl font-extrabold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>

          Discover Our AI Tools

        </h1>

        <p className={`text-xl md:text-2xl mb-16 text-center max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>

          Unleash your creativity and boost productivity with our cutting-edge AI-powered tools.

        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {tools.map((tool, index) => (

            <Link href={tool.link} key={index} className="group">

              <Card className={`h-full transition-all duration-300 hover:shadow-xl hover:scale-105 ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}>

                <CardHeader className="relative pb-0">

                  <div className={`absolute top-4 left-4 rounded-full p-3 transition-all duration-300 group-hover:scale-110 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>

                    {tool.icon}

                  </div>

                  {tool.badge && (

                    <Badge 

                      variant="secondary" 

                      className={`absolute top-4 right-4 text-xs font-semibold ${

                        theme === 'dark' 

                          ? 'text-white' 

                          : tool.badge.color === 'bg-green-500' 

                            ? 'text-green-800' 

                            : tool.badge.color === 'bg-blue-500' 

                              ? 'text-blue-800' 

                              : 'text-red-800'

                      } ${tool.badge.color} px-2 py-1 rounded-md`}

                    >

                      {tool.badge.text}

                    </Badge>

                  )}

                </CardHeader>

                <CardContent className="pt-16">

                  <CardTitle className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>

                    {tool.title}

                  </CardTitle>

                  <CardDescription className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>

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
