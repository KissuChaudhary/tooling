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
    }, 2000) // 2 seconds delay

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [hasScrolled])

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setIsVisible(false)}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-[400px] bg-indigo-100 dark:bg-indigo-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-indigo-600 p-3 relative">
              <button
                onClick={() => setIsVisible(false)}
                className="absolute right-2 top-2 text-indigo-100 hover:text-white"
                aria-label="Close popup"
              >
                <X className="h-5 w-5" />
              </button>
              <h2 className="font-bold text-lg text-white flex items-center gap-1.5">
                 🎄 Transform Your Holiday Photos Now!
              </h2>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="relative w-full aspect-[512/728] rounded-lg overflow-hidden">
                <Image
                  src="/images/christmas.jpg"
                  alt="AI-generated image example"
                  width={512}
                  height={728}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-600 to-transparent opacity-60"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium">
                   ✨ Tired of the same old festive selfies? Create magical, AI-powered Christmas photos that everyone will love! 🎅
                </div>
              </div>

             <Link href="https://www.unrealshot.com/login" passHref>
                <Button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg text-sm"
                >
                    🎁 Get Your AI Christmas Photos Now
                </Button>
              </Link>
            </div>
            
            <div className="bg-indigo-200 dark:bg-indigo-800 p-2 text-center text-xs text-indigo-600 dark:text-indigo-200">
              🎉 Limited Time Offer: Celebrate for just $8!
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

