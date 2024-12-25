'use client'

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { X } from 'lucide-react'

export default function AIPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 80) {
        setHasScrolled(true)
      }
    }

    window.addEventListener('scroll', handleScroll)

    const timer = setTimeout(() => {
      if (hasScrolled) {
        setIsVisible(true)
      }
    }, 2000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [hasScrolled])

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsVisible(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[400px] max-w-[95vw] bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <div className="bg-[#6366f1] p-4 relative">
              <button
                onClick={() => setIsVisible(false)}
                className="absolute right-4 top-4 text-white/80 hover:text-white"
                aria-label="Close popup"
              >
                <X className="h-5 w-5" />
              </button>
              <h2 className="text-white text-lg font-semibold flex items-center gap-2">
                🎄 Transform Your Holiday Photos Now!
              </h2>
            </div>

            <div className="p-4">
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden mb-4">
                <Image
                  src="/images/christmas.jpg"
                  alt="AI-generated Christmas photo example"
                  fill
                  className="object-cover"
                />
              </div>

              <Link 
                href="https://www.unrealshot.com/login" 
                className="block w-full"
              >
                <Button 
                  className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white"
                >
                  🎁 Get Your AI Christmas Photos Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

