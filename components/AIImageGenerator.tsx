'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import Image from 'next/image'
import AdOverlay from './AdOverlay'
import AdUnit from './AdUnit'

interface GenerationParams {
  prompt: string
  image_size: 'portrait' | 'square' | 'landscape'
  negative_prompt: string
  seed?: number
}

const IMAGE_SIZES = {
  portrait: { width: 512, height: 768 },
  square: { width: 512, height: 512 },
  landscape: { width: 768, height: 512 },
}

const initialParams: GenerationParams = {
  prompt: "",
  image_size: "square",
  negative_prompt: ""
}

export default function AIImageGenerator() {
  const [params, setParams] = useState<GenerationParams>(initialParams)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [flaggedError, setFlaggedError] = useState<string | null>(null)
  const [showFlaggedError, setShowFlaggedError] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [showAdOverlay, setShowAdOverlay] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLimitReached, setIsLimitReached] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isGenerating || isImageLoading) {
      interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (isGenerating && prev < 90) {
            return prev + 1
          } else if (isImageLoading && prev < 99) {
            return prev + 0.2
          }
          return prev
        })
      }, 100)
    } else {
      setLoadingProgress(0)
    }
    return () => clearInterval(interval)
  }, [isGenerating, isImageLoading])

  useEffect(() => {
    if (flaggedError) {
      setShowFlaggedError(true)
      const timer = setTimeout(() => {
        setShowFlaggedError(false)
      }, 5000) // Hide the error after 5 seconds
      return () => clearTimeout(timer)
    }
  }, [flaggedError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setFlaggedError(null)
    setImageUrl(null)
    setLoadingProgress(0)

    try {
      const apiParams = {
        ...params,
        width: IMAGE_SIZES[params.image_size].width,
        height: IMAGE_SIZES[params.image_size].height,
      }

      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiParams)
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          setIsLimitReached(true)
          throw new Error(data.error || 'You have reached the daily limit for image generation.')
        } else if (response.status === 400 && data.error.includes('inappropriate content')) {
          setFlaggedError(data.error)
        } else {
          throw new Error(data.error || 'Failed to generate image')
        }
        return
      }

      if (!data.images || !Array.isArray(data.images) || data.images.length === 0) {
        throw new Error('Invalid response format from API')
      }

      setImageUrl(data.images[0])
      setIsGenerating(false)
      setIsImageLoading(true)
    } catch (err: any) {
      console.error('Error:', err)
      setIsGenerating(false)
      setFlaggedError(err.message)
    }
  }

  const handleImageLoad = () => {
    setIsImageLoading(false)
    setLoadingProgress(100)
  }

  const handleReset = () => {
    setParams(initialParams)
    setImageUrl(null)
    setFlaggedError(null)
    setLoadingProgress(0)
    setIsGenerating(false)
    setIsImageLoading(false)
  }

  const handleDownload = () => {
    if (imageUrl) {
      setShowAdOverlay(true)
    }
  }

  const handleCloseAdOverlay = () => {
    setShowAdOverlay(false)
  }

  const getImagePreviewStyle = () => {
    switch (params.image_size) {
      case 'portrait':
        return 'aspect-[2/3] w-full max-w-[512px]'
      case 'landscape':
        return 'aspect-[3/2] w-full max-w-[768px]'
      default:
        return 'aspect-square w-full max-w-[512px]'
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Card className="w-full md:w-[30%] md:h-screen md:overflow-y-auto">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <AdUnit 
              client="ca-pub-7915372771416695"
              slot="2181958821"
              style={{ marginBottom: '20px' }}
            />
            <div className="space-y-2">
              <h2>Free AI Image Generator (Nvidia Sana)</h2>
              <Label htmlFor="prompt">Prompt</Label>
              <Textarea
                id="prompt"
                value={params.prompt}
                onChange={(e) => setParams({...params, prompt: e.target.value})}
                placeholder="Enter your image description"
                required
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="negative_prompt">Negative Prompt</Label>
              <Textarea
                id="negative_prompt"
                value={params.negative_prompt}
                onChange={(e) => setParams({...params, negative_prompt: e.target.value})}
                placeholder="Specify things to not see in the output"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_size">Image Size</Label>
              <Select
                value={params.image_size}
                onValueChange={(value: 'portrait' | 'square' | 'landscape') => setParams({...params, image_size: value})}
              >
                <SelectTrigger id="image_size">
                  <SelectValue placeholder="Select image size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portrait">Portrait (512x768)</SelectItem>
                  <SelectItem value="square">Square (512x512)</SelectItem>
                  <SelectItem value="landscape">Landscape (768x512)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLimitReached && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Daily Limit Reached</AlertTitle>
                <AlertDescription>
                  Congrats! You have officially hit your image generation limit for today. No more magic for you. Try again tomorrow, if you can wait that long!
                </AlertDescription>
              </Alert>
            )}

            {showFlaggedError && flaggedError && (
              <Alert variant="destructive" className="transition-opacity duration-300 ease-in-out">
                <AlertTitle>Content Flagged</AlertTitle>
                <AlertDescription>{flaggedError}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={handleSubmit}
                disabled={isGenerating || isImageLoading || isLimitReached}
                className="w-full text-white py-2 rounded-lg transition-all duration-300"
              >
                {isGenerating || isImageLoading ? 'Processing...' : 'Generate Image'}
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={handleReset}>
                Reset
              </Button>
            </div>
            <AdUnit 
              client="ca-pub-7915372771416695"
              slot="2181958821"
              style={{ marginBottom: '20px' }}
            />
          </form>
        </CardContent>
      </Card>

      <div className="w-full md:w-[70%] md:h-screen dotted-bg flex flex-col flex justify-center items-center p-4">
        <AdUnit 
          client="ca-pub-7915372771416695"
          slot="2181958821"
          style={{ marginBottom: '20px' }}
        />
        <div className={`bg-white rounded-lg shadow flex items-center justify-center ${getImagePreviewStyle()} relative overflow-hidden`}>
          {(isGenerating || isImageLoading) && (
            <div className="absolute inset-0 bg-gray-200 z-10">
              <Progress value={loadingProgress} className="w-full" />
              <p className="text-center mt-4">
                {isGenerating ? 'Generating' : 'Loading'}: {Math.round(loadingProgress)}%
              </p>
            </div>
          )}
          {imageUrl && (
            <div className="relative w-full h-full transition-opacity duration-500 ease-in-out" style={{ opacity: isImageLoading ? 0 : 1 }}>
              <Image
                src={imageUrl}
                alt="Generated image"
                fill
                className="object-contain rounded-lg"
                onLoad={handleImageLoad}
              />
              {!isImageLoading && (
                <Button
                  className="absolute bottom-2 right-2"
                  onClick={handleDownload}
                >
                  Download
                </Button>
              )}
            </div>
          )}
          {!imageUrl && !isGenerating && !isImageLoading && (
            <p className="text-gray-500">Your Art Will Appear Here..</p>
          )}
        </div>
      </div>

      {showAdOverlay && (
        <AdOverlay imageUrl={imageUrl} onClose={handleCloseAdOverlay} />
      )}
    </div>
  )
}
