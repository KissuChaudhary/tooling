import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { tools } from '@/app/tools/page'

type Tool = (typeof tools)[0]

const getRelatedTools = (currentToolLink: string, maxTools: number = 6): Tool[] => {
  const currentTool = tools.find(tool => tool.link === currentToolLink)
  if (!currentTool) return []

  return tools
    .filter(tool => tool.link !== currentToolLink)
    .sort(() => Math.random() - 0.5)
    .slice(0, maxTools)
}

export default function RelatedTools({ currentToolLink }: { currentToolLink: string }) {
  const relatedTools = getRelatedTools(currentToolLink)

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold mb-8">Related Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedTools.map((tool, index) => (
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
    </div>
  )
}
