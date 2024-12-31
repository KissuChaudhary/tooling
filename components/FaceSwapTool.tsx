'use client'

import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import AdUnit from '../components/AdUnit'
import { ImageIcon, RefreshCw, Download } from 'lucide-react'
import Image from 'next/image'
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ImageData {
  url: string
  file: File
  base64: string
}

export default function FaceSwapTool() {
  const [faceImage, setFaceImage] = useState<ImageData | null>(null)
  const [targetImage, setTargetImage] = useState<ImageData | null>(null)
  const [swappedImage, setSwappedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string | null>(null)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    if (alertMessage) {
      setShowAlert(true)
      const timer = setTimeout(() => {
        setShowAlert(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [alertMessage])

  const handleImageChange = (type: 'face' | 'target') => async (file: File) => {
    const base64 = await fileToBase64(file)
    const imageData = { url: URL.createObjectURL(file), file, base64 }
    if (type === 'face') {
      setFaceImage(imageData)
    } else {
      setTargetImage(imageData)
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleSwap = async () => {
  if (!faceImage || !targetImage) return
  setIsProcessing(true)
  setAlertMessage(null)
  
  try {
    const response = await fetch('/api/face-swap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        faceImage: faceImage.base64,
        targetImage: targetImage.base64,
      }),
    })

    // First check if the response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: `HTTP error! status: ${response.status}`
      }))
      throw new Error(errorData.error || 'Face swap failed')
    }

    // Then try to parse the JSON
    const data = await response.json().catch(() => {
      throw new Error('Failed to parse response')
    })

    if (typeof data.result === 'object' && data.result.image) {
      setSwappedImage(`data:image/jpeg;base64,${data.result.image}`)
    } else {
      throw new Error('Invalid response format')
    }
  } catch (error) {
    console.error('Error during face swap:', error)
    setAlertMessage(error instanceof Error ? error.message : 'Face swap failed. Please try again.')
  } finally {
    setIsProcessing(false)
  }
}


  const resetTool = () => {
    setFaceImage(null)
    setTargetImage(null)
    setSwappedImage(null)
    setAlertMessage(null)
    setShowAlert(false)
  }

  const handleDownload = () => {
    if (swappedImage) {
      const link = document.createElement('a')
      link.href = swappedImage
      link.download = 'swapped-image.jpg'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const ImageUploader = ({ title, image, onImageChange }: { title: string, image: ImageData | null, onImageChange: (file: File) => void }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
      if (acceptedFiles[0]) {
        onImageChange(acceptedFiles[0])
      }
    }, [onImageChange])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        'image/*': ['.jpeg', '.jpg', '.png', '.webp']
      },
      multiple: false
    })

    return (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div
          {...getRootProps()}
          className={`relative h-[120px] bg-muted rounded-lg overflow-hidden ${
            isDragActive ? 'border-2 border-dashed border-primary' : ''
          }`}
        >
          <input {...getInputProps()} />
          {image ? (
            <div className="relative w-full h-full">
              <Image
                src={image.url}
                alt={title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
              <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">
                {isDragActive ? 'Drop the image here' : 'Click or drag image here'}
              </span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 py-12 text-foreground">
      <div className="relative min-h-[600px] rounded-lg border flex items-center justify-center overflow-hidden">
        {swappedImage ? (
          <div className="relative w-full h-full">
            <Image
              src={swappedImage}
              alt="Swapped Result"
              fill
              style={{ objectFit: 'contain' }}
              className="rounded-lg"
            />
            <Button
              variant="secondary"
              className="absolute top-2 right-2"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        ) : targetImage ? (
          <Image
            src={targetImage.url}
            alt="Target Image"
            fill
            style={{ objectFit: 'contain' }}
            className="rounded-lg"
          />
        ) : (
          <Image
            src="/ai-face-swap.png"
            alt="free ai face swap"
            width={800}
            height={600}
            className="rounded-lg"
          />
        )}
      </div>
      <div className="space-y-6">
        <ImageUploader
          title="Add Face Image"
          image={faceImage}
          onImageChange={handleImageChange('face')}
        />
             <AdUnit 
        client="ca-pub-7915372771416695"
        slot="8441706260"
        style={{ marginBottom: '20px' }}
      />
        <ImageUploader
          title="Add Target Image"
          image={targetImage}
          onImageChange={handleImageChange('target')}
        />
        <div className="space-y-6">
          {showAlert && alertMessage && (
            <Alert variant="destructive" className="mb-4 transition-opacity duration-500 ease-in-out">
              <AlertDescription>{alertMessage}</AlertDescription>
            </Alert>
          )}
          <p className="text-sm text-muted-foreground">
           This tool is designed for fun and creative purposes only. Users must ensure their uploads and outputs comply with legal and ethical standards. Misuse, such as creating deceptive, harmful, or unauthorized content, is strictly prohibited.
          </p>
          <div className="flex gap-4">
            <Button
              className="flex-1"
              disabled={!faceImage || !targetImage || isProcessing}
              onClick={handleSwap}
            >
              {isProcessing ? "Processing..." : "Upload & Start"}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={resetTool}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            By uploading the images, you agree to our{' '}
            <a href="/page/terms" className="underline">Terms of Use</a> and{' '}
            <a href="/page/privacy-policy" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  )
}

