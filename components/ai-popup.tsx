'use client'

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { X, Sparkles } from "lucide-react"

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
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed right-4 bottom-4 z-50 w-[240px] sm:w-[280px] bg-indigo-100 dark:bg-indigo-900 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="bg-indigo-600 p-2 sm:p-3 relative">
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-2 top-2 text-indigo-100 hover:text-white"
              aria-label="Close popup"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
            <h2 className="font-bold text-base sm:text-lg text-white flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
             💼 Look Professional Instantly! 💼
            </h2>
          </div>
          
          <div className="p-2 sm:p-3 space-y-2 sm:space-y-3">
            <p className="text-indigo-800 dark:text-indigo-200 font-medium text-xs sm:text-sm">
              Let UnrealShot AI Turn You into a Professional (At Least on Paper)
            </p>
            <div className="relative w-full aspect-[512/728] rounded-lg overflow-hidden">
              <Image
                src="/images/headshots1.webp"
                alt="AI-generated image example"
                width={384}
                height={546}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-600 to-transparent opacity-60"></div>
              <div className="absolute bottom-2 left-2 right-2 text-white text-xs sm:text-sm font-medium">
               🤓 Still using that 'deer in headlights' photo from 2012? Time for an upgrade. Impress bosses and LinkedIn stalkers alike! 🤓
              </div>
            </div>

           <Link href="/login" passHref>
              <Button 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-1 px-2 sm:px-3 rounded-lg text-xs sm:text-sm"
              >
                🎯 Get Your AI Headshot Now
              </Button>
            </Link>
          </div>
          
          <div className="bg-indigo-200 dark:bg-indigo-800 p-1.5 text-center text-[10px] sm:text-xs text-indigo-600 dark:text-indigo-200">
            🚀 Limited Time Offer: Starting Only at $8!
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
