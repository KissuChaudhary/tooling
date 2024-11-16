'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Copy, Share2, Check, Download, Youtube, FileText, Sparkles, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Transcript {
  text: string
  start: number
  duration: number
}

interface Summary {
  summary: string
  highlights: string[]
  keyInsights: { title: string; description: string }[]
}

interface VideoMetadata {
  duration: number
  language: string
}

export default function YouTubeSummarizer() {
  const [url, setUrl] = useState('')
  const [videoId, setVideoId] = useState('')
  const [transcript, setTranscript] = useState<Transcript[]>([])
  const [summary, setSummary] = useState<Summary | null>(null)
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('transcript')
  const [copied, setCopied] = useState(false)
  const transcriptRef = useRef<HTMLDivElement>(null)

  const formatTime = (seconds: number): string => {
    if (typeof seconds !== 'number' || isNaN(seconds)) {
      return '00:00';
    }
    
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    
    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
    }
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSummary(null)
    setTranscript([])
    setMetadata(null)

    try {
      const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      const extractedVideoId = videoIdMatch?.[1]
      if (!extractedVideoId) throw new Error('Invalid YouTube URL')
      setVideoId(extractedVideoId)

      const response = await fetch('/api/summarize-youtube', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ youtubeUrl: url }),
      })

      if (!response.ok) {
        throw new Error('Failed to summarize video')
      }

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      setTranscript(data.transcript)
      setSummary(data.summary)
      setMetadata(data.metadata)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while summarizing the video')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    let contentToCopy = ''
    if (activeTab === 'transcript') {
      contentToCopy = transcript.map(entry => entry.text).join(' ')
    } else if (activeTab === 'summary' && summary) {
      contentToCopy = `Summary:\n${summary.summary}\n\nHighlights:\n${summary.highlights.join('\n')}\n\nKey Insights:\n${summary.keyInsights.map(insight => `${insight.title}: ${insight.description}`).join('\n')}`
    }

    navigator.clipboard.writeText(contentToCopy).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {
      setError('Failed to copy content')
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      let contentToShare = ''
      if (activeTab === 'transcript') {
        contentToShare = `Transcript of YouTube video: ${url}\n\n${transcript.map(entry => entry.text).join(' ')}`
      } else if (activeTab === 'summary' && summary) {
        contentToShare = `Summary of YouTube video: ${url}\n\n${summary.summary}\n\nHighlights:\n${summary.highlights.join('\n')}\n\nKey Insights:\n${summary.keyInsights.map(insight => `${insight.title}: ${insight.description}`).join('\n')}`
      }

      navigator.share({
        title: 'YouTube Video Summary',
        text: contentToShare,
        url: url
      }).catch(() => {
        setError('Failed to share content')
      })
    } else {
      setError('Sharing is not supported on this device')
    }
  }

  const handleDownload = () => {
    let content = ''
    let filename = ''
    if (activeTab === 'transcript') {
      content = transcript.map(entry => entry.text).join(' ')
      filename = 'transcript.txt'
    } else if (activeTab === 'summary' && summary) {
      content = `Summary:\n${summary.summary}\n\nHighlights:\n${summary.highlights.join('\n')}\n\nKey Insights:\n${summary.keyInsights.map(insight => `${insight.title}: ${insight.description}`).join('\n')}`
      filename = 'summary.txt'
    }

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center mb-4 text-primary">
            <Youtube className="inline-block mr-2 w-10 h-10 text-red-600 mb-1" /> 100% Free YouTube Video Summarizer
          </h1>

          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input
              type="url"
              placeholder="Enter YouTube URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze
                </>
              )}
            </Button>
          </form>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-red-100 text-red-700 rounded-md"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {videoId && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {metadata && (
                <div className="text-sm text-muted-foreground bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <div className="flex justify-between">
                    <span>
                      <BookOpen className="inline-block mr-2 mb-1" />
                      Video Duration: {formatTime(metadata.duration)}
                    </span>
                    <span>
                      <FileText className="inline-block mr-2 mb-1" />
                      Read Time: {Math.ceil((transcript.map(t => t.text).join(' ').split(' ').length) / 200)} mins
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="relative h-[600px]">
              <Tabs defaultValue="transcript" className="w-full h-full" onValueChange={setActiveTab}>
                <div className="flex justify-between items-center mb-4 sticky top-0 bg-white dark:bg-gray-800 z-10 p-2 rounded-t-lg shadow">
                  <TabsList>
                    <TabsTrigger value="transcript">Transcript</TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                  </TabsList>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={handleCopy}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleDownload}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="h-[calc(100%-60px)] overflow-y-auto" ref={transcriptRef}>
                  <TabsContent value="transcript" className="mt-0">
                    <div className="space-y-4">
                      {transcript.reduce((paragraphs, entry, index, array) => {
                        if (index % 10 === 0) {
                          paragraphs.push(array.slice(index, index + 10).map(e => e.text).join(' '));
                        }
                        return paragraphs;
                      }, [] as string[]).map((paragraph, index) => (
                        <motion.p
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="text-sm bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="summary" className="mt-0">
                    {summary && (
                      <div className="space-y-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
                        >
                          <h3 className="text-lg font-semibold mb-2">Summary</h3>
                          <p className="text-sm">{summary.summary}</p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
                        >
                          <h3 className="text-lg font-semibold mb-2">Highlights</h3>
                          <ul className="space-y-2">
                            {summary.highlights.map((highlight, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="flex items-start gap-2 text-sm"
                              >
                                <span className="text-lg">✨</span>
                                <span>{highlight}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
                        >
                          <h3 className="text-lg font-semibold mb-2">Key Insights</h3>
                          {summary.keyInsights.map((insight, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                              className="mb-4"
                            >
                              <h4 className="font-medium mb-1">{insight.title}</h4>
                              <p className="text-sm text-muted-foreground">{insight.description}</p>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    )}
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
