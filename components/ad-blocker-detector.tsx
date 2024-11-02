'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
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

const INITIAL_CHECK_INTERVAL = 5000
const MAX_CHECK_INTERVAL = 300000 // 5 minutes
const LOCAL_STORAGE_KEY = 'adBlockerDetected'

export default function AdBlockerDetector() {
  const [showModal, setShowModal] = useState(false)
  const checkIntervalRef = useRef(INITIAL_CHECK_INTERVAL)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const detectAdBlocker = useCallback(async () => {
    try {
      await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store',
      })
      return false
    } catch {
      return true
    }
  }, [])

  const checkAdBlocker = useCallback(async () => {
    const cachedResult = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (cachedResult) {
      setShowModal(cachedResult === 'true')
      return
    }

    const detected = await detectAdBlocker()
    setShowModal(detected)
    localStorage.setItem(LOCAL_STORAGE_KEY, detected.toString())

    // Implement exponential backoff
    checkIntervalRef.current = Math.min(checkIntervalRef.current * 2, MAX_CHECK_INTERVAL)
  }, [detectAdBlocker])

  const debouncedCheck = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(checkAdBlocker, 300)
  }, [checkAdBlocker])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          debouncedCheck()
        }
      },
      { threshold: 0.1 }
    )

    const dummyElement = document.createElement('div')
    document.body.appendChild(dummyElement)
    observer.observe(dummyElement)

    const visibilityHandler = () => {
      if (!document.hidden) {
        debouncedCheck()
      }
    }

    document.addEventListener('visibilitychange', visibilityHandler)

    return () => {
      observer.disconnect()
      document.body.removeChild(dummyElement)
      document.removeEventListener('visibilitychange', visibilityHandler)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [debouncedCheck])

  const handleClose = async () => {
    const stillDetected = await detectAdBlocker()
    if (stillDetected) {
      alert("It seems your ad blocker is still active. Please disable it and try again.")
    } else {
      setShowModal(false)
      localStorage.setItem(LOCAL_STORAGE_KEY, 'false')
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
