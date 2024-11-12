'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Download, Upload, RefreshCw } from 'lucide-react'
import Image from 'next/image'
import AdOverlay from '@/components/Adover'
import AdUnit from '@/components/AdUnit'

export default function EmojiFaceTransform() {
  const [imageUrl, setImageUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [resultImage, setResultImage] = useState<string[]>([])
  const [originalImage, setOriginalImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [predictionId, setPredictionId] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState('original')
  const [showAdOverlay, setShowAdOverlay] = useState(false)

  const [prompt, setPrompt] = useState('')
  const [loraScale, setLoraScale] = useState(1)
  const [negativePrompt, setNegativePrompt] = useState('')


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!originalImage) {
      setError('Please upload an image first')
      return
    }
    setLoading(true)
    setError('')
    setResultImage([])
    setProgress(0)

    const formData = new FormData()
    if (file) {
      formData.append('file', file)
    } else if (imageUrl) {
      formData.append('imageUrl', imageUrl)
    }
    formData.append('style', 'Emoji')
    formData.append('prompt', prompt)
    formData.append('loraScale', loraScale.toString())
    formData.append('negativePrompt', negativePrompt)
    formData.append('promptStrength', '4.5')
    formData.append('denoisingStrength', '0.65')
    formData.append('instantIdStrength', '0.8')
    formData.append('controlDepthStrength', '0.8')

    try {
      const response = await fetch('/api/face-transform', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 429) {
          setError("Congrats! You've officially hit your transformation limit for today. No more magic for you. Try again tomorrow, if you can wait that long!")
          setLoading(false)
          return
        }
        throw new Error(errorData.error || 'Failed to start image processing')
      }

      const data = await response.json()
      setPredictionId(data.predictionId)
    } catch (error) {
      console.error('Error:', error)
      setError(error instanceof Error ? error.message : 'An error occurred while starting image processing.')
      setLoading(false)
    }
  }

  const checkPredictionStatus = useCallback(async (retryCount = 0) => {
    if (!predictionId) return

    try {
      const response = await fetch(`/api/face-transform?id=${predictionId}`)
      if (!response.ok) {
        throw new Error('Failed to get prediction status')
      }
      const data = await response.json()

      if (Array.isArray(data.output) && data.output.length > 0) {
        setResultImage(data.output)
        setLoading(false)
        setPredictionId(null)
        setProgress(100)
        setActiveTab('processed')
      } else if (data.error) {
        throw new Error(data.error)
      } else if (data.status === 'processing' || data.status === 'starting') {
        setProgress((prev) => Math.min(prev + 10, 90))
        const nextRetryCount = retryCount + 1
        const delay = Math.min(1000 * Math.pow(2, nextRetryCount), 30000)
        if (nextRetryCount < 10) {
          setTimeout(() => checkPredictionStatus(nextRetryCount), delay)
        } else {
          throw new Error('Maximum retries reached. Please try again.')
        }
      } else {
        throw new Error(`Unexpected prediction status: ${data.status}`)
      }
    } catch (error) {
      console.error('Error:', error)
      setError(error instanceof Error ? error.message : 'An error occurred while checking image processing status.')
      setLoading(false)
      setPredictionId(null)
    }
  }, [predictionId])

  useEffect(() => {
    if (predictionId) {
      checkPredictionStatus()
    }
  }, [predictionId, checkPredictionStatus])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB limit')
        return
      }
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(selectedFile.type)) {
        setError('Only JPEG, PNG, and WebP images are allowed')
        return
      }
      setFile(selectedFile)
      setImageUrl('')
      setError('')
      setOriginalImage(URL.createObjectURL(selectedFile))
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value)
    setFile(null)
    setError('')
  }

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (imageUrl) {
      setOriginalImage(imageUrl)
    }
  }

  const handleReset = () => {
    setImageUrl('')
    setFile(null)
    setResultImage([])
    setOriginalImage('')
    setLoading(false)
    setError('')
    setPredictionId(null)
    setProgress(0)
    setActiveTab('original')
    setPrompt('')
    setLoraScale(1)
    setNegativePrompt('')
  }

  const downloadImage = () => {
    setShowAdOverlay(true)
  }

  const handleAdOverlayClose = () => {
    setShowAdOverlay(false)
  }

  return (
    <div className="mx-auto p-2 min-h-screen">
      <Card className="w-full max-w-7xl mx-auto shadow">
        <AdUnit 
          client="ca-pub-7915372771416695"
          slot="2181958821"
          style={{ marginBottom: '20px' }}
        />
        
        <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Form Section */}
              <div className="w-full lg:w-1/2 space-y-6">
                <Tabs defaultValue="upload" className="w-full mb-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">Upload Image</TabsTrigger>
                    <TabsTrigger value="url">Image URL</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload">
                    <div className="space-y-4">
                      <Label htmlFor="file" className="block text-lg font-medium">
                        Upload an image (Max 10MB, JPEG/PNG/WebP)
                      </Label>
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="file"
                          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">JPEG, PNG or WebP (MAX. 10MB)</p>
                          </div>
                          <Input
                            id="file"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="url">
                    <form onSubmit={handleUrlSubmit} className="space-y-4">
                      <Label htmlFor="imageUrl" className="block text-lg font-medium">
                        Image URL
                      </Label>
                      <div className="flex space-x-2">
                        <Input
                          id="imageUrl"
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          value={imageUrl}
                          onChange={handleUrlChange}
                          className="flex-grow"
                        />
                        <Button type="submit">Load</Button>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="prompt">Prompt</Label>
                    <Input
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe the desired outcome"
                    />
                  </div>

                  <div>
                    <Label htmlFor="negativePrompt">Negative Prompt</Label>
                    <Input
                      id="negativePrompt"
                      value={negativePrompt}
                      onChange={(e) => setNegativePrompt(e.target.value)}
                      placeholder="Describe what to avoid"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 py-2 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
                  >
                    {loading ? 'Processing...' : 'Create AI Emoji'}
                  </Button>
                  <Button
                    onClick={handleReset}
                    className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-all duration-300"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>

                {loading && (
                  <div className="space-y-2">
                    <Progress value={progress} className="w-full" />
                    <p className="text-center text-sm text-gray-500">Processing image... This may take a few moments.</p>
                  </div>
                )}

                {error && (
                  <div className="flex items-center p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-yellow-900 dark:text-yellow-100">
                    <AlertCircle className="flex-shrink-0 w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                )}
              </div>

              {/* Output Section */}
              <div className="w-full lg:w-1/2 space-y-6">
                {originalImage ? (
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="original">Original</TabsTrigger>
                      <TabsTrigger value="processed" disabled={!resultImage.length}>
                        Transformed
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="original" className="mt-4">
                      <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                        <Image src={originalImage} alt="Original image" layout="fill" objectFit="contain" />
                      </div>
                    </TabsContent>
                    <TabsContent value="processed" className="mt-4">
                      {resultImage.length > 0 ? (
                        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                          <Image 
                            src={resultImage[0]} 
                            alt="Transformed image" 
                            layout="fill" 
                            objectFit="contain" 
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-64 md:h-96 bg-gray-100 rounded-lg dark:bg-gray-800">
                          <p className="text-gray-500 dark:text-gray-400">Processing not started yet</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="flex items-center justify-center h-64 md:h-96 bg-gray-100 rounded-lg dark:bg-gray-800">
                    <p className="text-gray-500 dark:text-gray-400">No image uploaded yet</p>
                  </div>
                )}

                {resultImage.length > 0 && (
                  <Button onClick={downloadImage} className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Download Transformed Image
                  </Button>
                )}
              </div>
            </div>
        </CardContent>
      </Card>
      {showAdOverlay && resultImage.length > 0 && (
        <AdOverlay
          imageUrl={resultImage[0]}
          onClose={handleAdOverlayClose}
        />
      )}
      <AdUnit 
        client="ca-pub-7915372771416695"
        slot="2181958821"
        style={{ marginBottom: '20px' }}
      />
    </div>
  )
        }
