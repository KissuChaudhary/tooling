'use client'

import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
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
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const handleImageChange = (type: 'face' | 'target') => async (file: File) => {
    const base64 = await fileToBase64(file)
    const imageData = { url: URL.createObjectURL(file), file, base64 }
    type === 'face' ? setFaceImage(imageData) : setTargetImage(imageData)
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
      const data = await response.json()
      if (!response.ok) {
        if (data.isRateLimitExceeded) {
          setAlertMessage(data.error)
        } else {
          throw new Error(data.error || 'Face swap failed')
        }
      } else {
        if (typeof data.result === 'object' && data.result.image) {
          setSwappedImage(`data:image/jpeg;base64,${data.result.image}`)
        } else {
          throw new Error('Invalid response format')
        }
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
                layout="fill"
                objectFit="cover"
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
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 bg-background text-foreground">
      <div className="relative min-h-[600px] rounded-lg bg-muted flex items-center justify-center overflow-hidden">
        {swappedImage ? (
          <div className="relative w-full h-full">
            <Image
              src={swappedImage}
              alt="Swapped Result"
              layout="fill"
              objectFit="contain"
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
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        ) : (
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="Placeholder Image"
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
            Face Swapper is best for one-to-one face swapping. For face swapping in group photos, try the Multiple Face Swap feature.
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
            <a href="#" className="underline">Terms of Use</a> and{' '}
            <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  )
}

