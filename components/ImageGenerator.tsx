'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image'
import AdOverlay from './AdOverlay'
import AdUnit from '../components/AdUnit'

interface GenerationParams {
  prompt: string
  image_size: 'portrait' | 'square' | 'landscape'
  seed?: number
  enable_safety_checker: boolean
}

const IMAGE_SIZES = {
  portrait: { width: 512, height: 768 },
  square: { width: 512, height: 512 },
  landscape: { width: 768, height: 512 },
}

const initialParams: GenerationParams = {
  prompt: "",
  image_size: "square",
  enable_safety_checker: true
}

export default function ImageGenerator() {
  const [params, setParams] = useState<GenerationParams>(initialParams)
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [loadingImages, setLoadingImages] = useState<boolean[]>([])
  const [showAdOverlay, setShowAdOverlay] = useState(false)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isGenerating) {
      interval = setInterval(() => {
        setLoadingProgress((prev) => (prev < 100 ? prev + 1 : 100))
      }, 100)
    } else {
      setLoadingProgress(0)
    }
    return () => clearInterval(interval)
  }, [isGenerating])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setError(null)
    setImageUrls([])
    setLoadingProgress(0)

    try {
      const apiParams = {
        ...params,
        image_size: IMAGE_SIZES[params.image_size],
        num_inference_steps: 4,
        num_images: 1
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiParams)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image')
      }

      if (!data.images || !Array.isArray(data.images)) {
        throw new Error('Invalid response format from API')
      }

      setImageUrls(data.images.map((image: { url: string }) => image.url))
      setLoadingImages(new Array(data.images.length).fill(true))
      setHasGenerated(true)
    } catch (err) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleReset = () => {
    setParams(initialParams)
    setImageUrls([])
    setError(null)
    setHasGenerated(false)
    setLoadingProgress(0)
  }

  const handleDownload = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl)
    setShowAdOverlay(true)
  }

  const handleCloseAdOverlay = () => {
    setShowAdOverlay(false)
    setSelectedImageUrl(null)
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
              <h2>Free AI Influencer Generator</h2>
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

            <div className="space-y-2">
              <Label htmlFor="seed">Seed (optional)</Label>
              <Input
                id="seed"
                type="number"
                value={params.seed || ''}
                onChange={(e) => setParams({...params, seed: e.target.value ? Number(e.target.value) : undefined})}
                placeholder="Random seed for reproducible generation"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="enable_safety_checker"
                checked={params.enable_safety_checker}
                onCheckedChange={(checked) => setParams({...params, enable_safety_checker: checked})}
              />
              <Label htmlFor="enable_safety_checker">Enable Safety Checker</Label>
            </div>

            <div className="flex space-x-2">
              <Button type="submit" className="w-full" disabled={isGenerating || hasGenerated}>
                {isGenerating ? 'Generating...' : 'Generate Image'}
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

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="w-full md:w-[70%] md:h-screen dotted-bg flex flex-col flex justify-center items-center p-4">
      <AdUnit 
          client="ca-pub-7915372771416695"
          slot="2181958821"
          style={{ marginBottom: '20px' }}
          />
        <div className={`bg-white rounded-lg shadow flex items-center justify-center ${getImagePreviewStyle()} relative overflow-hidden`}>
          {isGenerating && (
            <div className="absolute inset-0 bg-gray-200 z-10">
              <div 
                className="h-1 bg-blue-500 transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
              <p className="text-center mt-4">Generating: {loadingProgress}%</p>
            </div>
          )}
          {imageUrls.length > 0 ? (
            <div className="relative w-full h-full transition-opacity duration-500 ease-in-out opacity-0" style={{ opacity: isGenerating ? 0 : 1 }}>
              <Image
                src={imageUrls[0]}
                alt="Generated image"
                fill
                className="object-contain rounded-lg"
                onLoad={() => setLoadingImages([false])}
              />
              {!loadingImages[0] && (
                <Button
                  className="absolute bottom-2 right-2"
                  onClick={() => handleDownload(imageUrls[0])}
                >
                  Download
                </Button>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Your Art Will Appear Here..</p>
          )}
        </div>
      </div>

      {showAdOverlay && (
        <AdOverlay imageUrl={selectedImageUrl} onClose={handleCloseAdOverlay} />
      )}
    </div>
  )
}
