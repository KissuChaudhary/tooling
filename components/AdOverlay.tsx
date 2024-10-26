'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import AdUnit from '../components/AdUnit'


interface AdOverlayProps {
  imageUrl: string | null
  onClose: () => void
}

export default function AdOverlay({ imageUrl, onClose }: AdOverlayProps) {
  const [timeLeft, setTimeLeft] = useState(10)
  const [downloadStarted, setDownloadStarted] = useState(false)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (!downloadStarted && imageUrl) {
      setDownloadStarted(true)
      window.open(imageUrl, '_blank')
    }
  }, [timeLeft, downloadStarted, imageUrl])

  const handleManualDownload = () => {
    if (imageUrl) {
      window.open(imageUrl, '_blank')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">No Need to Interact, Image will be downloaded automatically!</h2>
        <div className="mb-4 bg-gray-200 p-4 text-center">
          {/* Placeholder for Google AdSense ad */}
          <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
        </div>
        <div className="mb-4">
          <Progress value={(10 - timeLeft) * 10} className="w-full" />
          <p className="text-center mt-2">
            {timeLeft > 0
              ? `Download will start in ${timeLeft} seconds`
              : 'Download should have started'}
          </p>
        </div>
        {timeLeft === 0 && (
          <div className="text-center mb-4">
            <p>If the download didn't start automatically, click the link below:</p>
            <button
              onClick={handleManualDownload}
              className="text-blue-500 hover:underline"
            >
              Download Image
            </button>
          </div>
        )}
        <Button className="w-full" variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  )
}
