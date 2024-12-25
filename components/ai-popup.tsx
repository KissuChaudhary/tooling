'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function AIPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 3000) // Show popup after 3 seconds
    return () => clearTimeout(timer)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-white dark:bg-gray-800 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <DialogHeader className="p-4 bg-[#6366f1]">
          <DialogTitle className="text-white flex items-center justify-between gap-2">
            <span className="text-lg font-semibold">🎄 Transform Your Holiday Photos Now!</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6 space-y-6">
            <div className="relative w-full aspect-[1/1] rounded-lg overflow-hidden">
              <Image
                src="/images/christmas.jpg"
                alt="AI-generated image example"
                layout="fill"
                objectFit="cover"
                priority
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#6366f1] to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium">
                ✨ Tired of the same old festive selfies? Create magical, AI-powered Christmas photos that everyone will love! 🎅
              </div>
            </div>

            <Link href="https://www.unrealshot.com/login" passHref>
              <Button 
                className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold py-3 px-4 rounded-lg text-sm"
              >
                🎁 Get Your AI Christmas Photos Now
              </Button>
            </Link>
          </div>
          
          <div className="bg-[#6366f1]/10 dark:bg-[#6366f1]/20 p-3 text-center text-sm text-[#6366f1] dark:text-[#6366f1]">
            🎉 Limited Time Offer: Celebrate for just $8!
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

