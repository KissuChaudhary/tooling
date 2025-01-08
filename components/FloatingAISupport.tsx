'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

const MESSAGES = [
  "Enjoying Saze AI? Help me keep the magic flowing!",
  "Your support powers my innovation. Thank you!",
  "I'm working hard to make AI accessible to everyone!",
  "Every contribution helps me add new features!",
  "Love these tools? Show your appreciation here!",
  "Help me keep providing cutting-edge AI for free!",
  "Support my mission to democratize AI technology!",
  "Your support means everything to me. Thank you!",
  "I'm a solo developer making AI tools for you!",
  "Your contribution helps me maintain these tools!",
]

export default function FloatingBuyMeACoffee() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState(MESSAGES[0])

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    const rotateMessage = () => {
      setMessage(prev => {
        const currentIndex = MESSAGES.indexOf(prev);
        return MESSAGES[(currentIndex + 1) % MESSAGES.length];
      });
    }

    window.addEventListener('scroll', toggleVisibility)
    const messageInterval = setInterval(rotateMessage, 5000);

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
      clearInterval(messageInterval);
    }
  }, [])

  const handleClick = () => {
    window.open('https://buymeacoffee.com/harvansh', '_blank')
  }

  const toggleMinimize = () => {
    setIsMinimized(prev => !prev)
  }

  return (
    <div className="fixed bottom-4 mb-12 right-4 z-50 flex flex-col items-end gap-2 transition-all duration-300">
      {isVisible && !isMinimized && (
        <div className="bg-background text-foreground px-4 py-2 rounded-full shadow-lg animate-float text-sm max-w-[350px] relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background shadow-md"
            onClick={toggleMinimize}
          >
            <X className="h-4 w-4" />
          </Button>
          <p className="font-medium">{message}</p>
        </div>
      )}
      <div className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {isMinimized ? (
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-lg"
            onClick={toggleMinimize}
          >
            ☕
          </Button>
        ) : (
          <Button
            onClick={handleClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-sm"
            aria-label="Support Saze AI"
          >
            Support Saze AI
          </Button>
        )}
      </div>
    </div>
  )
}

