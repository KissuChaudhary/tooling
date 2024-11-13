'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

type BrokenLink = {
  url: string
  status: number | string
}

export default function AIBrokenLinkChecker() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{
    brokenLinks: BrokenLink[]
    totalChecked: number
    totalBroken: number
  } | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResults(null)

    try {
      const response = await fetch('/api/check-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ baseUrl: url })
      })

      if (!response.ok) {
        throw new Error('Failed to check links')
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred while checking links')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>AI Broken Link Checker</CardTitle>
          <CardDescription>Enter a URL to check for broken links</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking Links
                </>
              ) : (
                'Check Links'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          {error && <p className="text-red-500">{error}</p>}
          {results && (
            <div className="mt-4 space-y-2">
              <p>Total links checked: {results.totalChecked}</p>
              <p>Broken links found: {results.totalBroken}</p>
              {results.brokenLinks.length > 0 && (
                <div>
                  <h3 className="font-semibold">Broken Links:</h3>
                  <ul className="list-disc pl-5">
                    {results.brokenLinks.map((link, index) => (
                      <li key={index}>
                        {link.url} - Status: {link.status}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
