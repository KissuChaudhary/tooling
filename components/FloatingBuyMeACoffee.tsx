'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import AnimatedCoffeeCup from './AnimatedCoffeeCup'

const MESSAGES = [
  "Enjoying the content? Buy me a coffee!",
  "Your support keeps Sazeai running!",
  "Help fuel more free AI resources!",
  "Every sip counts! Support Sazeai today.",
]

const ACHIEVEMENTS = [
  { name: "Coffee Novice", threshold: 30, icon: "☕" },
  { name: "Brew Master", threshold: 60, icon: "☕☕" },
  { name: "Caffeine Connoisseur", threshold: 90, icon: "☕☕☕" },
]

export default function FloatingBuyMeACoffee() {
  const [isVisible, setIsVisible] = useState(false)
  const [fillPercentage, setFillPercentage] = useState(0)
  const [message, setMessage] = useState(MESSAGES[0])
  const [achievement, setAchievement] = useState<typeof ACHIEVEMENTS[0] | null>(null)
  const [coffeeBeansCount, setCoffeeBeansCount] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    let startTime: number;
    const toggleVisibility = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setFillPercentage(Math.min(scrollPercentage, 100));

      if (window.pageYOffset > 300) {
        setIsVisible(true)
        if (!startTime) startTime = Date.now();
      } else {
        setIsVisible(false)
        startTime = 0;
      }
    }

    const updateCoffeeBeansCount = () => {
      if (startTime) {
        const secondsSpent = Math.floor((Date.now() - startTime) / 1000);
        setCoffeeBeansCount(Math.min(secondsSpent, 100));
      }
    }

    const rotateMessage = () => {
      setMessage(prev => {
        const currentIndex = MESSAGES.indexOf(prev);
        return MESSAGES[(currentIndex + 1) % MESSAGES.length];
      });
    }

    const checkAchievement = () => {
      const newAchievement = ACHIEVEMENTS.findLast(a => fillPercentage >= a.threshold);
      if (newAchievement && newAchievement !== achievement) {
        setAchievement(newAchievement);
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    const messageInterval = setInterval(rotateMessage, 5000);
    const coffeeBeansInterval = setInterval(updateCoffeeBeansCount, 1000);
    const achievementInterval = setInterval(checkAchievement, 1000);

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
      clearInterval(messageInterval);
      clearInterval(coffeeBeansInterval);
      clearInterval(achievementInterval);
    }
  }, [achievement, fillPercentage])

  const handleClick = () => {
    window.open('https://www.buymeacoffee.com/yourusername', '_blank')
  }

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  }

  return (
    <div className={`fixed bottom-0 right-0 z-50 p-4 flex flex-col-reverse sm:flex-row items-end gap-2 sm:gap-4 transition-all duration-300 max-w-full ${isDarkMode ? 'dark' : ''}`}>
      {isVisible && (
        <div className="flex flex-col-reverse sm:flex-row items-end sm:items-center gap-2 sm:gap-4 mb-2 sm:mb-0">
          <div className="bg-background text-foreground px-3 py-1.5 rounded-full shadow-lg animate-float text-xs sm:text-sm max-w-[200px] sm:max-w-none">
            <p className="font-medium truncate">{message}</p>
          </div>
          {achievement && (
            <div className="bg-primary text-primary-foreground px-3 py-1.5 rounded-full shadow-lg animate-bounce text-xs sm:text-sm whitespace-nowrap">
              <p className="font-medium">{achievement.icon} {achievement.name}</p>
            </div>
          )}
          <div className="bg-accent text-accent-foreground px-3 py-1.5 rounded-full shadow-lg text-xs sm:text-sm whitespace-nowrap">
            <p className="font-medium">☕ {coffeeBeansCount}</p>
          </div>
        </div>
      )}
      <div className="flex items-center gap-2">
        <div className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            onClick={handleClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-1.5 px-3 sm:py-2 sm:px-4 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-xs sm:text-sm"
            aria-label="Buy me a coffee"
          >
            <AnimatedCoffeeCup fillPercentage={fillPercentage} />
            <span className="hidden sm:inline ml-2">Buy me a coffee</span>
          </Button>
        </div>
        <Button
          onClick={toggleTheme}
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full p-1.5 sm:p-2 text-xs sm:text-sm"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </Button>
      </div>
    </div>
  )
}

