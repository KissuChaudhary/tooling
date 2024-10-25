'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function AdBlockerDetector() {
  const [isAdBlockerDetected, setIsAdBlockerDetected] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const detectAdBlocker = async () => {
      let adBlockDetected = false

      // Method 1: Adbox detection
      const testAd = document.createElement('div')
      testAd.innerHTML = '&nbsp;'
      testAd.className = 'adsbox'
      document.body.appendChild(testAd)

      window.setTimeout(() => {
        if (testAd.offsetHeight === 0) {
          adBlockDetected = true
        }
        testAd.remove()

        // If adblock is already detected, no need to check the second method
        if (adBlockDetected) {
          setIsAdBlockerDetected(true)
          return
        }

        // Method 2: Google AdSense fetch
        fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-store',
        })
        .then(() => {
          // AdSense loaded successfully, likely no ad blocker
        })
        .catch(() => {
          // Failed to load AdSense, likely due to an ad blocker
          setIsAdBlockerDetected(true)
        })
      }, 100)
    }

    const hasBeenPrompted = localStorage.getItem('adBlockerPrompted')
    if (!hasBeenPrompted) {
      detectAdBlocker()
    }
  }, [])

  useEffect(() => {
    if (isAdBlockerDetected) {
      setShowModal(true)
      localStorage.setItem('adBlockerPrompted', 'true')
    }
  }, [isAdBlockerDetected])

  const handleClose = () => {
    setShowModal(false)
  }

  if (!showModal) return null

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ad Blocker Detected</DialogTitle>
          <DialogDescription>
            We've detected that you're using an ad blocker. Our website relies on ad revenue to keep running and provide you with free content. Please disable your ad blocker to continue using our site.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">How to disable your ad blocker:</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>Look for the ad blocker icon in your browser's toolbar</li>
            <li>Click on the icon and select "Pause" or "Disable" for this site</li>
            <li>Refresh the page to see the changes</li>
          </ol>
        </div>
        <Button onClick={handleClose} className="mt-4">
          I've disabled my ad blocker
        </Button>
      </DialogContent>
    </Dialog>
  )
}
