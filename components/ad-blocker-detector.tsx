'use client'

import { useEffect, useState } from 'react'
import { ShieldAlert } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AdBlockerDetector() {
  const [showModal, setShowModal] = useState(false)

  const detectAdBlocker = async () => {
    let adBlockDetected = false

    // Method 1: Adbox detection
    const testAd = document.createElement('div')
    testAd.innerHTML = '&nbsp;'
    testAd.className = 'adsbox'
    document.body.appendChild(testAd)

    await new Promise(resolve => setTimeout(resolve, 100))

    if (testAd.offsetHeight === 0) {
      adBlockDetected = true
    }
    testAd.remove()

    // Method 2: Google AdSense fetch
    if (!adBlockDetected) {
      try {
        await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-store',
        })
      } catch {
        adBlockDetected = true
      }
    }

    return adBlockDetected
  }

  useEffect(() => {
    const checkAdBlocker = async () => {
      const detected = await detectAdBlocker()
      setShowModal(detected)
    }

    checkAdBlocker()
    const interval = setInterval(checkAdBlocker, 5000) // Check every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const handleClose = async () => {
    const stillDetected = await detectAdBlocker()
    if (stillDetected) {
      alert("It seems your ad blocker is still active. Please disable it and try again.")
    } else {
      setShowModal(false)
    }
  }

  if (!showModal) return null

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-red-500" />
            Ad Blocker Detected
          </DialogTitle>
          <DialogDescription>
            We've detected that you're using an ad blocker. Our website relies on ad revenue to keep running and provide you with free content.
          </DialogDescription>
        </DialogHeader>
        <div className="my-6">
          <Alert>
            <AlertDescription>
              <h3 className="font-semibold mb-2">How to disable your ad blocker:</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>Look for the ad blocker icon in your browser's toolbar</li>
                <li>Click on the icon and select "Pause" or "Disable" for this site</li>
                <li>Refresh the page to see the changes</li>
              </ol>
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter>
          <Button onClick={handleClose} className="w-full">
            I've disabled my ad blocker
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
