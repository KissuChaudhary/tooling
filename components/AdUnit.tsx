'use client'

import React, { useEffect, useRef, useState } from 'react'

interface AdUnitProps {
  client: string
  slot: string
  format?: string
  responsive?: boolean
  style?: React.CSSProperties
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export default function AdUnit({
  client,
  slot,
  format = 'auto',
  responsive = true,
  style = {}
}: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const [adLoaded, setAdLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAd = () => {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({})
          setAdLoaded(true)
        } else {
          setError('AdSense not available')
        }
      } catch (err) {
        console.error('AdSense error:', err)
        setError('Failed to load ad')
      }
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !adLoaded) {
          loadAd()
        }
      })
    }

    if (adRef.current && !adLoaded) {
      const observer = new IntersectionObserver(handleIntersection, {
        rootMargin: '200px', // Load ad when it's 200px from entering the viewport
        threshold: 0
      })

      observer.observe(adRef.current)

      return () => {
        observer.disconnect()
      }
    }
  }, [adLoaded])

  // Debugging: Log when component mounts and unmounts
  useEffect(() => {
    console.log(`AdUnit mounted: client=${client}, slot=${slot}`)
    return () => {
      console.log(`AdUnit unmounted: client=${client}, slot=${slot}`)
    }
  }, [client, slot])

  return (
    <div ref={adRef} className="ad-container flex justify-center items-center w-full my-4">
      <div className="relative max-w-full w-full">
        <p className="text-xs text-gray-500 text-center mb-1">- Advertisement -</p>
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <ins
            className="adsbygoogle"
            style={{
              display: 'block',
              minWidth: '250px',
              minHeight: '100px',
              width: '100%',
              ...style
            }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive ? 'true' : 'false'}
          />
        )}
      </div>
    </div>
  )
        }
