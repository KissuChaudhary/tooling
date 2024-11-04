// app/components/AITextHumanizer.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Copy, Share2, Edit2, RotateCcw } from "lucide-react"
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
      if (!response.ok) throw new Error('Failed to humanize text')
      const data = await response.json()
      setOutputText(data.humanizedText)
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to humanize text. Please try again.')
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
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>AI Text Humanizer (Powered by Gemini)</CardTitle>
        <CardDescription>Transform AI-generated text into more human-like language</CardDescription>
      </CardHeader>
      <CardContent>
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
              className="w-full p-2 border rounded-md"
            />
            <p className="text-sm text-gray-500 mt-1">
              {inputText.length}/{MAX_CHARS} characters
            </p>
          </div>
          <div className="flex space-x-2">
            <Button type="submit" disabled={isLoading || inputText.length === 0} className="flex-1">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Humanizing...
                </>
              ) : (
                'Humanize Text'
              )}
            </Button>
            <Button type="button" onClick={handleReset} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </form>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {outputText && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-gray-900">Humanized Output:</h3>
              <div className="space-x-2">
                <Button onClick={handleCopy} variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={handleShare} variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button onClick={() => setIsEditing(!isEditing)} variant="outline" size="sm">
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
                className="w-full p-2 border rounded-md"
              />
            ) : (
              <div className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">{editableOutput}</div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
