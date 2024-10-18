'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download } from 'lucide-react'
import Link from 'next/link'

type AspectRatio = 'portrait' | 'square' | 'landscape'

const aspectRatioOptions: { [key in AspectRatio]: { width: number; height: number } } = {
  portrait: { width: 512, height: 768 },
  square: { width: 512, height: 512 },
  landscape: { width: 768, height: 512 },
}

export default function AIImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('square')
  const [style, setStyle] = useState('none')
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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
        body: JSON.stringify({ prompt, width, height, style }),
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">FREE AI IMAGE GENERATOR</h1>
      <p className="text-lg text-gray-600 mb-8">Convert your text into images for FREE.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
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
              <Label htmlFor="style" className="text-lg font-semibold">Style</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="cartoon">Cartoon</SelectItem>
                  <SelectItem value="realistic">Realistic</SelectItem>
                  <SelectItem value="abstract">Abstract</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                By generating AI images, you agree to the{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  terms and conditions
                </Link>{' '}
                of Saze AI.
              </p>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
              {isLoading ? 'GENERATING...' : 'CREATE AI IMAGE'}
            </Button>
          </form>
        </div>
        <div className="relative">
          <div 
            className="relative rounded-lg shadow-lg overflow-hidden"
            style={{
              width: `${aspectRatioOptions[aspectRatio].width}px`,
              height: `${aspectRatioOptions[aspectRatio].height}px`,
              maxWidth: '100%',
              margin: '0 auto'
            }}
          >
            {generatedImage ? (
              <>
                <Image
                  src={generatedImage}
                  alt="Generated image"
                  layout="fill"
                  objectFit="cover"
                />
                <a
                  href={generatedImage}
                  download="generated-image.png"
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-10"
                >
                  <Download className="w-6 h-6 text-gray-600" />
                </a>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <p className="text-gray-400 text-lg">Your Art Will Appear Here...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
