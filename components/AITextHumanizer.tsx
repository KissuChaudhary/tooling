'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Copy, Share2, Edit2, RotateCcw, Wand2 } from "lucide-react"
import { toast } from 'react-hot-toast'

const MAX_CHARS = 1000

export default function AITextHumanizer() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [editableOutput, setEditableOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setEditableOutput(outputText)
  }, [outputText])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    if (text.length <= MAX_CHARS) {
      setInputText(text)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/humanize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to humanize text')
      }
      const data = await response.json()
      setOutputText(data.humanizedText)
    } catch (error) {
      console.error('Error:', error)
      setError(error instanceof Error ? error.message : 'Failed to humanize text. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setInputText('')
    setOutputText('')
    setEditableOutput('')
    setError(null)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(editableOutput)
    toast.success('Copied to clipboard!')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Humanized Text',
        text: editableOutput,
      }).then(() => {
        toast.success('Shared successfully!')
      }).catch((error) => {
        console.error('Error sharing:', error)
        toast.error('Failed to share')
      })
    } else {
      toast.error('Sharing is not supported on this device')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 flex items-center justify-center relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-blue-100 rounded-full opacity-50"></div>
        <div className="absolute top-1/2 -right-24 w-48 h-48 bg-green-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-20 left-1/4 w-40 h-40 bg-yellow-100 rounded-full opacity-50"></div>
      </div>
      
      <Card className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-sm shadow-lg relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">AI Text Humanizer</CardTitle>
          <CardDescription className="text-lg text-gray-600">Transform AI-generated text into more human-like language</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="input-text" className="block text-sm font-medium text-gray-700 mb-1">
                AI-generated Text
              </label>
              <Textarea
                id="input-text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Paste your AI-generated text here..."
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled={isLoading}
              />
              <p className="text-sm text-gray-500 mt-1">
                {inputText.length}/{MAX_CHARS} characters
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                type="submit" 
                disabled={isLoading || inputText.length === 0} 
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Humanizing...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-5 w-5" />
                    Humanize Text
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                onClick={handleReset} 
                variant="outline"
                disabled={isLoading}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Reset
              </Button>
            </div>
          </form>
          {error && (
            <Alert variant="destructive" className="mt-4 bg-red-50 border-red-200 text-red-800">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {outputText && (
            <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h3 className="text-xl font-semibold text-gray-800">Humanized Output:</h3>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleCopy} variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={handleShare} variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button onClick={() => setIsEditing(!isEditing)} variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
                    <Edit2 className="h-4 w-4 mr-2" />
                    {isEditing ? 'Save' : 'Edit'}
                  </Button>
                </div>
              </div>
              {isEditing ? (
                <Textarea
                  value={editableOutput}
                  onChange={(e) => setEditableOutput(e.target.value)}
                  rows={10}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              ) : (
                <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap border border-gray-200">{editableOutput}</div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
