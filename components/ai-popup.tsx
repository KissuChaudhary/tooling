'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AIPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 3000) // Show popup after 3 seconds
    return () => clearTimeout(timer)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full overflow-hidden relative"
      >
        {/* Header with gradient */}
        <div className="bg-[#6366f1] p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            🎄 Transform Your Holiday Photos Now!
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* Main content */}
        <div className="p-6 space-y-6">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src="/images/christmas.jpg"
              alt="AI-generated image example"
              layout="fill"
              objectFit="cover"
              priority
              className="rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#6366f1] to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium">
              ✨ Tired of the same old festive selfies? Create magical, AI-powered Christmas photos that everyone will love! 🎅
            </div>
          </div>

          <Link href="https://www.unrealshot.com/ai-christmas-photoshoot" passHref>
            <Button 
              className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold py-3 px-4 rounded-lg text-sm"
            >
              🎁 Get Your AI Christmas Photos Now
            </Button>
          </Link>
        </div>
        
        {/* Footer */}
        <div className="bg-[#6366f1]/10 dark:bg-[#6366f1]/20 p-3 text-center text-sm text-[#6366f1] dark:text-[#6366f1]">
          🎉 Limited Time Offer: Celebrate for just $5!
        </div>
      </motion.div>
    </div>
  )
}
