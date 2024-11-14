import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { tools, Tool } from '@/app/tools/tools-data'

const getIconColor = (iconName: string): string => {
  const colorMap: { [key: string]: string } = {
    Image: 'text-blue-500',
    Zap: 'text-yellow-500',
    Feather: 'text-pink-500',
    MessageSquare: 'text-indigo-500',
    Volume2: 'text-green-500',
    History: 'text-purple-600',
    Cake: 'text-pink-500',
    Book: 'text-yellow-600',
    User: 'text-orange-500',
    BookOpen: 'text-emerald-500',
    FileText: 'text-green-600',
    Mail: 'text-blue-600',
    Sunrise: 'text-amber-500',
    Instagram: 'text-pink-600',
    PenTool: 'text-cyan-500',
    Linkedin: 'text-blue-700',
    Heart: 'text-red-500',
    Music: 'text-rose-500',
    Repeat: 'text-indigo-500',
    Lightbulb: 'text-yellow-500',
    Puzzle: 'text-violet-500',
    Edit: 'text-orange-600',
    ShoppingBag: 'text-red-600',
    Star: 'text-yellow-500',
    Search: 'text-green-600',
    Youtube: 'text-red-600'
  }
  return colorMap[iconName] || 'text-gray-500' // default color if not found
}

export default function RelatedTools({ currentToolLink, maxTools = 6 }: { currentToolLink: string, maxTools?: number }) {
  // Filter out the current tool and get related tools
  const relatedTools = React.useMemo(() => {
    return tools
      .filter((tool: Tool) => tool.link !== currentToolLink)
      .sort(() => 0.5 - Math.random()) // Shuffle the array
      .slice(0, maxTools)
  }, [currentToolLink, maxTools])

  return (
    <div className="py-12 px-4 mx-auto max-w-7xl">
       <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedTools.map((tool: Tool) => {
          const IconComponent = tool.icon
          const iconColor = getIconColor(IconComponent.name)
          return (
            <Link key={tool.title} href={tool.link} passHref>
              <Card className="group transition-all duration-300 hover:shadow-xl hover:scale-105">
                <CardHeader className="relative pb-0">
                  <div className="absolute top-4 left-4 bg-gray-100 rounded-full p-3 transition-all duration-300 group-hover:scale-110">
                    <IconComponent className={`h-8 w-8 ${iconColor}`} />
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
                  <CardTitle className="text-lg font-bold mb-2">{tool.title}</CardTitle>
                  <CardDescription className="text-sm">{tool.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
