import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Sparkles, Brain, Lightbulb, PenTool } from 'lucide-react'

const tools = [
  {
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
    title: "AI Essay Writer",
    description: "Generate well-structured essays on any topic with ease.",
    link: "/tools/ai-essay-writer"
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
    link: "/tools/ai-story-generator"
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
  }
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-16">
      <main className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 text-center">
          Our AI Tools
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Explore our collection of AI-powered tools designed to enhance your creativity and productivity.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold">{tool.title}</CardTitle>
                  {tool.icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{tool.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Link href={tool.link} passHref>
                  <Button className="w-full">
                    Try Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}