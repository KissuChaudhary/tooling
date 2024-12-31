'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

const MESSAGES = [
  "Enjoying Saze AI? Help us keep the magic flowing!",
  "Your support powers our innovation. Thank you!",
  "Together, we're shaping the future of AI. Join us!",
  "Every contribution fuels new features. Support us!",
  "Love our tools? Show your appreciation here!",
  "Help us continue to provide cutting-edge AI for free!",
  "Be a part of the AI revolution. Support Saze AI today!",
  "Your support means the world to us. Thank you!",
]

export default function FloatingBuyMeACoffee() {
  const [isVisible, setIsVisible] = useState(false)
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
    window.open('https://www.buymeacoffee.com/yourusername', '_blank')
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 transition-all duration-300">
      {isVisible && (
        <div className="bg-background text-foreground px-4 py-2 rounded-full shadow-lg animate-float text-sm max-w-[350px]">
          <p className="font-medium">{message}</p>
        </div>
      )}
      <div className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <Button
          onClick={handleClick}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-sm"
          aria-label="Support Saze AI"
        >
          Support Saze AI
        </Button>
      </div>
    </div>
  )
}

