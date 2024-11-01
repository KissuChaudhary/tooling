import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Tool {
  name: string;
  slug: string;
  description: string;
}

interface RelatedToolsProps {
  currentTool: string;
  tools: Tool[];
}

const RelatedTools: React.FC<RelatedToolsProps> = ({ currentTool, tools }) => {
  const relatedTools = tools
    .filter(tool => tool.slug !== currentTool)
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  return (
    <section className="py-12 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">Related Tools</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {relatedTools.map((tool) => (
            <Card key={tool.slug}>
              <CardHeader>
                <CardTitle>{tool.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{tool.description}</p>
                <Link 
                  href={`/tools/${tool.slug}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Try Now
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedTools
