'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Facebook, Linkedin, Twitter, Share2 } from "lucide-react"

interface ToolEngagementProps {
  toolName: string;
  toolDescription?: string;
}

export default function ToolEngagement({ 
  toolName,
  toolDescription = "Stay ahead in AI. Sign up for expert tips and updates!",
}: ToolEngagementProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, toolName }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Subscription failed')
      }

      toast({
        title: "Success!",
        description: "You've been subscribed to our updates.",
      })
      setEmail('')
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to subscribe. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

 
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `Check out this awesome ${toolName} tool!`

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  }

  return (
    <div className="max-w-7xl mx-auto p-4 mt-10">
    <div className="flex flex-col justify-center md:flex-row gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Stay Updated!</CardTitle>
          <CardDescription>
            {toolDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Share {toolName}</CardTitle>
          <CardDescription>
All this AI goodness is free – sharing is the best thank you! 😊
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.open(shareLinks.twitter, '_blank')}
              aria-label="Share on Twitter"
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.open(shareLinks.facebook, '_blank')}
              aria-label="Share on Facebook"
            >
              <Facebook className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.open(shareLinks.linkedin, '_blank')}
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: toolName,
                    text: shareText,
                    url: shareUrl,
                  })
                }
              }}
              aria-label="Share"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
