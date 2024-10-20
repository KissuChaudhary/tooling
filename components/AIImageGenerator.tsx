'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Download } from 'lucide-react'
import Link from 'next/link'

type AspectRatio = 'portrait' | 'square' | 'landscape'

const aspectRatioOptions: { [key in AspectRatio]: { width: number; height: number } } = {
  portrait: { width: 512, height: 768 },
  square: { width: 512, height: 512 },
  landscape: { width: 768, height: 512 },
}

const stylePresets = [
  'none', '3d-model', 'analog-film', 'anime', 'cinematic', 'comic-book', 'digital-art', 
  'enhance', 'fantasy-art', 'isometric', 'line-art', 'low-poly', 'modeling-compound', 
  'neon-punk', 'origami', 'photographic', 'pixel-art', 'tile-texture'
]

export default function AIImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('square')
  const [style, setStyle] = useState('none')
  const [seed, setSeed] = useState<number>(0)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [imageContainerSize, setImageContainerSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateImageContainerSize = () => {
      const containerWidth = window.innerWidth * (window.innerWidth >= 1024 ? 0.65 : 1)
      const containerHeight = window.innerHeight - 200 // Subtracting some space for margins and other elements
      const aspectRatioValue = aspectRatioOptions[aspectRatio].height / aspectRatioOptions[aspectRatio].width

      let width = containerWidth
      let height = containerWidth * aspectRatioValue

      if (height > containerHeight) {
        height = containerHeight
        width = height / aspectRatioValue
      }

      setImageContainerSize({ width, height })
    }

    updateImageContainerSize()
    window.addEventListener('resize', updateImageContainerSize)
    return () => window.removeEventListener('resize', updateImageContainerSize)
  }, [aspectRatio])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { width, height } = aspectRatioOptions[aspectRatio]
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, width, height, style, seed }),
      })
      if (!response.ok) {
        throw new Error('Failed to generate image')
      }
      const data = await response.json()
      setGeneratedImage(data.imageUrl)
    } catch (error) {
      console.error('Error generating image:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto px-4 py-8">

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[35%]">
        <h1 className="text-4xl font-bold mb-2">FREE AI IMAGE GENERATOR</h1>
        <p className="text-lg text-muted-foreground mb-8">Convert your text into images for FREE.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="prompt" className="text-lg font-semibold">Prompt</Label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you need the AI to create"
                className="mt-1 h-32"
                required
              />
            </div>
            <div>
              <Label className="text-lg font-semibold">Aspect Ratio</Label>
              <RadioGroup value={aspectRatio} onValueChange={(value: AspectRatio) => setAspectRatio(value)} className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center">
                  <RadioGroupItem value="portrait" id="portrait" />
                  <Label htmlFor="portrait" className="ml-2">Portrait</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="square" id="square" />
                  <Label htmlFor="square" className="ml-2">Square</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="landscape" id="landscape" />
                  <Label htmlFor="landscape" className="ml-2">Landscape</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="style" className="text-lg font-semibold">Style Preset</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a style preset" />
                </SelectTrigger>
                <SelectContent>
                  {stylePresets.map((preset) => (
                    <SelectItem key={preset} value={preset}>
                      {preset.charAt(0).toUpperCase() + preset.slice(1).replace(/-/g, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="seed" className="text-lg font-semibold">Seed</Label>
              <Input
                id="seed"
                type="number"
                value={seed}
                onChange={(e) => setSeed(Number(e.target.value))}
                min={0}
                max={4294967295}
                className="mt-1"
                placeholder="Enter a seed number (0-4294967295)"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                By generating AI images, you agree to the{' '}
                <Link href="/terms" className="text-primary hover:underline">
                  terms and conditions
                </Link>{' '}
                of Saze AI.
              </p>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? 'GENERATING...' : 'CREATE AI IMAGE'}
            </Button>
          </form>
        </div>
        <div className="w-full lg:w-[65%] flex items-center justify-center">
          <div 
            className="relative rounded-lg shadow-lg overflow-hidden"
            style={{
              width: `${imageContainerSize.width}px`,
              height: `${imageContainerSize.height}px`,
            }}
          >
            {generatedImage ? (
              <>
                <Image
                  src={generatedImage}
                  alt="Generated image"
                  layout="fill"
                  objectFit="contain"
                />
                <a
                  href={generatedImage}
                  download="generated-image.png"
                  className="absolute top-2 right-2 p-2 bg-background/80 rounded-full shadow-md hover:bg-background/90 z-10"
                >
                  <Download className="w-6 h-6 text-foreground" />
                </a>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <p className="text-muted-foreground text-lg">Your Art Will Appear Here...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}