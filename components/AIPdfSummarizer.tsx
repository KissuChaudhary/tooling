'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, FileText, Copy, Share2, RotateCcw } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from '@/hooks/use-toast'

export default function FixedPdfSummarizer() {
  const [file, setFile] = useState<File | null>(null)
  const [summary, setSummary] = useState<string>('')
  const [keyHighlights, setKeyHighlights] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [summaryLength, setSummaryLength] = useState<number>(150)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0]
      if (selectedFile.type !== 'application/pdf') {
        setError('Please select a valid PDF file.')
        return
      }
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size exceeds 10MB limit.')
        return
      }
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!file) {
      setError('Please select a PDF file.')
      return
    }

    setIsLoading(true)
    setProgress(0)
    setSummary('')
    setKeyHighlights('')
    setError(null)

    try {
      const fileContent = await fileToBase64(file)
      const response = await fetch('/api/summarize-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileContent: fileContent.split(',')[1],
          summaryLength,
        }),
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('Failed to read response')

      let receivedLength = 0
      const chunks = []

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        chunks.push(value)
        receivedLength += value.length

        setProgress(Math.min(100, Math.round((receivedLength / 102400) * 100)))
      }

      const resultText = new TextDecoder().decode(new Uint8Array(chunks.flatMap(chunk => Array.from(chunk))))
      const data = JSON.parse(resultText)
      
      setSummary(data.summary || '')
      setKeyHighlights(data.keyHighlights || '')
    } catch (error) {
      console.error('Error processing PDF:', error)
      setError('An error occurred while processing the PDF. Please try again.')
    } finally {
      setIsLoading(false)
      setProgress(100)
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard.",
    })
  }

  const handleShare = (text: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'AI PDF Summary',
        text: text,
      }).then(() => {
        console.log('Shared successfully')
      }).catch((error) => {
        console.error('Error sharing:', error)
      })
    } else {
      toast({
        title: "Sharing not supported",
        description: "Your browser doesn't support the Web Share API.",
        variant: "destructive",
      })
    }
  }

  const handleReset = () => {
    setFile(null)
    setSummary('')
    setKeyHighlights('')
    setError(null)
    setProgress(0)
    setSummaryLength(150)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">AI PDF Summarizer</CardTitle>
          <CardDescription>Upload a PDF file to get an AI-generated summary and key highlights in English using Google's Gemini 1.5 Pro model.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pdf">PDF File (Max 10MB)</Label>
                <div className="flex items-center space-x-2">
                  <Input id="pdf" type="file" accept=".pdf" onChange={handleFileChange} className="flex-grow" ref={fileInputRef} />
                  <Button type="button" variant="outline" size="icon" onClick={() => fileInputRef.current?.click()}>
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary-length">Summary Length (words)</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  id="summary-length"
                  min={50}
                  max={500}
                  step={10}
                  value={[summaryLength]}
                  onValueChange={(value) => setSummaryLength(value[0])}
                  className="flex-grow"
                />
                <span className="font-mono">{summaryLength}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button type="submit" disabled={!file || isLoading} className="flex-grow">
                {isLoading ? 'Processing...' : 'Process PDF'}
              </Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </form>
          {isLoading && (
            <div className="mt-4 space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-center text-sm text-muted-foreground">Processing PDF... {progress}%</p>
            </div>
          )}
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {summary && keyHighlights && (
            <Tabs defaultValue="summary" className="mt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="highlights">Key Highlights</TabsTrigger>
              </TabsList>
              <TabsContent value="summary" className="space-y-4">
                <Textarea value={summary} readOnly className="h-[300px] resize-none" />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleCopy(summary)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleShare(summary)}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="highlights" className="space-y-4">
                <Textarea value={keyHighlights} readOnly className="h-[300px] resize-none" />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleCopy(keyHighlights)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleShare(keyHighlights)}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Powered by Google's Gemini 1.5 Pro model</span>
        </CardFooter>
      </Card>
    </div>
  )
}
