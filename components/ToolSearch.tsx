'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X } from 'lucide-react'
import { useVirtualizer } from '@tanstack/react-virtual'

interface Tool {
  name: string;
  slug: string;
  description: string;
}

const tools: Tool[] = [
  { 
    name: "AI Answer Generator",
    slug: "ai-answer-generator",
    description: "Generate accurate and informative answers to any question"
  },
  {
    name: "AI Background Remover",
    slug: "ai-background-remover",
    description: "Remove backgrounds from images automatically with AI"
  },
  {
    name: "AI Backstory Generator",
    slug: "ai-backstory-generator",
    description: "Create compelling character backstories for your stories"
  },
  {
    name: "AI Birthday Wish Generator",
    slug: "ai-birthday-wish-generator",
    description: "Generate personalized birthday wishes and messages"
  },
  {
    name: "AI Book Title Generator",
    slug: "ai-book-title-generator",
    description: "Create catchy and meaningful book titles"
  },
  {
    name: "AI Caption Generator",
    slug: "ai-caption-generator",
    description: "Generate engaging captions for your social media posts"
  },
  {
    name: "AI Character Generator",
    slug: "ai-character-generator",
    description: "Create detailed character profiles for your stories"
  },
  {
    name: "AI Conclusion Generator",
    slug: "ai-conclusion-generator",
    description: "Generate powerful conclusions for your essays and articles"
  },
  {
    name: "AI Cover Letter Writer",
    slug: "ai-cover-letter-writer",
    description: "Create professional cover letters tailored to job applications"
  },
  {
    name: "AI Email Generator",
    slug: "ai-email-generator",
    description: "Generate professional and effective emails"
  },
  {
    name: "AI Essay Writer",
    slug: "ai-essay-writer",
    description: "Create well-structured essays on any topic"
  },
  {
    name: "AI Face Transform",
    slug: "ai-face-transform",
    description: "Transform and enhance facial images with AI"
  },
  {
    name: "AI Haiku Generator",
    slug: "ai-haiku-generator",
    description: "Create beautiful haiku poems automatically"
  },
  {
    name: "AI Image Generator",
    slug: "ai-image-generator",
    description: "Generate unique images from text descriptions"
  },
  {
    name: "AI Image Upscaler",
    slug: "ai-image-upscaler",
    description: "Enhance and upscale images while maintaining quality"
  },
  {
    name: "AI Influencer Generator",
    slug: "ai-influencer-generator",
    description: "Generate influencer-style content and ideas"
  },
  {
    name: "AI Instagram Caption Generator",
    slug: "ai-instagram-caption-generator",
    description: "Create engaging Instagram captions"
  },
  {
    name: "AI Intro Writer",
    slug: "ai-intro-writer",
    description: "Generate compelling introductions for your content"
  },
  {
    name: "AI LinkedIn Headline Generator",
    slug: "ai-linkedin-headline-generator",
    description: "Create professional LinkedIn headlines"
  },
  {
    name: "AI LinkedIn Post Generator",
    slug: "ai-linkedin-post-generator",
    description: "Generate engaging LinkedIn posts"
  },
  {
    name: "AI LinkedIn Summary Generator",
    slug: "ai-linkedin-summary-generator",
    description: "Create professional LinkedIn profile summaries"
  },
  {
    name: "AI Love Letter Writer",
    slug: "ai-love-letter-writer",
    description: "Generate romantic and heartfelt love letters"
  },
  {
    name: "AI Lyric Generator",
    slug: "ai-lyric-generator",
    description: "Create song lyrics in various styles"
  },
  {
    name: "AI Metaphor Generator",
    slug: "ai-metaphor-generator",
    description: "Generate creative metaphors for your writing"
  },
  {
    name: "AI Paraphrasing Tool",
    slug: "ai-paraphrasing-tool",
    description: "Rewrite text while maintaining meaning"
  },
  {
    name: "AI Pickup Lines Generator",
    slug: "ai-pickup-lines-generator",
    description: "Generate fun and creative pickup lines"
  },
  {
    name: "AI Plot Generator",
    slug: "ai-plot-generator",
    description: "Create unique story plots and narratives"
  },
  {
    name: "AI Poem Generator",
    slug: "ai-poem-generator",
    description: "Generate beautiful poems in various styles"
  },
  {
    name: "AI Product Description Generator",
    slug: "ai-product-description-generator",
    description: "Create compelling product descriptions"
  },
  {
    name: "AI Punctuation Checker",
    slug: "ai-punctuation-checker",
    description: "Check and correct punctuation in your text"
  },
  {
    name: "AI Quotes Generator",
    slug: "ai-quotes-generator",
    description: "Generate inspirational and meaningful quotes"
  },
  {
    name: "AI Review Generator",
    slug: "ai-review-generator",
    description: "Create balanced and detailed reviews"
  },
  {
    name: "AI Rhyme Generator",
    slug: "ai-rhyme-generator",
    description: "Find perfect rhyming words for your poems"
  },
  {
    name: "AI SEO Meta Description Generator",
    slug: "ai-seo-meta-description-generator",
    description: "Generate SEO-optimized meta descriptions"
  },
  {
    name: "AI SEO Title Generator",
    slug: "ai-seo-title-generator",
    description: "Create SEO-friendly titles for your content"
  },
  {
    name: "AI Slogan Generator",
    slug: "ai-slogan-generator",
    description: "Generate catchy slogans for your brand"
  },
  {
    name: "AI Story Generator",
    slug: "ai-story-generator",
    description: "Create unique and engaging stories"
  },
  {
    name: "AI Summarizer",
    slug: "ai-summarizer",
    description: "Generate concise summaries of longer texts"
  },
  {
    name: "AI Text Improver",
    slug: "ai-text-improver",
    description: "Enhance and polish your written content"
  },
  {
    name: "AI Text to Speech",
    slug: "ai-text-to-speech",
    description: "Convert text to natural-sounding speech"
  },
  {
    name: "AI Thesis Statement Generator",
    slug: "ai-thesis-statement-generator",
    description: "Create strong thesis statements for your essays"
  }
]

interface ToolSearchProps {
  onClose: () => void;
}

export default function ToolSearch({ onClose }: ToolSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const router = useRouter()

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // Memoize search results
  const searchResults = useMemo(() => {
    if (!debouncedSearchTerm) return []
    return tools.filter(tool =>
      tool.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
  }, [debouncedSearchTerm])

  // Close search on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }, [])

  const handleToolSelect = useCallback((slug: string) => {
    router.push(`/tools/${slug}`)
    onClose()
  }, [router, onClose])

  // Virtualized list
  const parentRef = useRef<HTMLDivElement>(null)
  const rowVirtualizer = useVirtualizer({
    count: searchResults.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 70,
    overscan: 5,
  })

return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="fixed inset-0 w-full h-full flex items-start justify-center pt-4 px-4 sm:pt-16">
        <div className="w-full max-w-lg">
          <Card className="shadow-lg border rounded-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 border-b">
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Search AI tools..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="flex-grow"
                    autoFocus
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={onClose}
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close search</span>
                  </Button>
                </div>
              </div>
              <div 
                ref={parentRef}
                className="overflow-y-auto max-h-[calc(100vh-200px)] overscroll-contain"
                style={{ scrollbarGutter: 'stable' }}
              >
                {debouncedSearchTerm ? (
                  searchResults.length > 0 ? (
                    <div
                      style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                      }}
                    >
                      {rowVirtualizer.getVirtualItems().map((virtualRow) => (
                        <div
                          key={virtualRow.index}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: `${virtualRow.size}px`,
                            transform: `translateY(${virtualRow.start}px)`,
                          }}
                        >
                          <button
                            onClick={() => handleToolSelect(searchResults[virtualRow.index].slug)}
                            className="w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors"
                          >
                            <h3 className="font-semibold text-base mb-1">
                              {searchResults[virtualRow.index].name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {searchResults[virtualRow.index].description}
                            </p>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No tools found
                    </div>
                  )
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    Start typing to search AI tools...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
