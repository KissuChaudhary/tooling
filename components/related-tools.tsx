import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { tools, Tool } from '@/app/tools/tools-data'
import * as Icons from 'lucide-react'

export default function RelatedTools({ currentToolLink, maxTools = 6 }: { currentToolLink: string, maxTools?: number }) {
  // Filter out the current tool and get related tools
  const relatedTools = tools
    .filter((tool: Tool) => tool.link !== currentToolLink)
    .sort(() => 0.5 - Math.random()) // Shuffle the array
    .slice(0, maxTools)

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedTools.map((tool: Tool) => {
          const IconComponent = Icons[tool.icon as keyof typeof Icons]
          return (
            <Link key={tool.title} href={tool.link} passHref>
              <Card className="group transition-all duration-300 hover:shadow-xl hover:scale-105">
                <CardHeader className="relative pb-0">
                  <div className="absolute top-4 left-4 bg-gray-100 rounded-full p-3 transition-all duration-300 group-hover:scale-110">
                    <IconComponent className="h-8 w-8" />
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
