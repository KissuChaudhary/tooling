// app/components/AITextHumanizer.tsx
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function AITextHumanizer() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your AI-generated text here..."
              rows={5}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Humanizing...
              </>
            ) : (
              'Humanize Text'
            )}
          </Button>
        </form>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {outputText && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Humanized Output:</h3>
            <div className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">{outputText}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
