'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Coffee, Zap, Star, Award, X } from 'lucide-react'
import confetti from 'canvas-confetti'
import DOMPurify from 'dompurify'

const MILESTONES = [
  { name: "AI Novice", threshold: 5, icon: <Zap className="w-4 h-4" /> },
  { name: "Tech Wizard", threshold: 15, icon: <Star className="w-4 h-4" /> },
  { name: "AI Maven", threshold: 30, icon: <Award className="w-4 h-4" /> },
]

interface ProgressData {
  toolsUsed: number;
  currentMilestoneName: string | null;
}

export default function FloatingAISupport() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)
  const [toolsUsed, setToolsUsed] = useState(0)
  const [currentMilestone, setCurrentMilestone] = useState<typeof MILESTONES[0] | null>(null)

  const saveProgress = useCallback((data: ProgressData) => {
    try {
      localStorage.setItem('aiSupportProgress', JSON.stringify(data))
    } catch (error) {
      console.error('Error saving progress:', error)
    }
  }, [])

  const loadProgress = useCallback((): ProgressData => {
    try {
      const savedData = localStorage.getItem('aiSupportProgress')
      if (savedData) {
        const parsedData = JSON.parse(savedData) as ProgressData
        return {
          toolsUsed: Number(parsedData.toolsUsed) || 0,
          currentMilestoneName: typeof parsedData.currentMilestoneName === 'string' ? DOMPurify.sanitize(parsedData.currentMilestoneName) : null
        }
      }
    } catch (error) {
      console.error('Error loading progress:', error)
    }
    return { toolsUsed: 0, currentMilestoneName: null }
  }, [])

  const checkMilestone = useCallback(() => {
    const newMilestone = MILESTONES.findLast(m => toolsUsed >= m.threshold)
    if (newMilestone && newMilestone !== currentMilestone) {
      setCurrentMilestone(newMilestone)
      saveProgress({ toolsUsed, currentMilestoneName: newMilestone.name })
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [toolsUsed, currentMilestone, saveProgress])

  useEffect(() => {
    const { toolsUsed: savedToolsUsed, currentMilestoneName } = loadProgress()
    setToolsUsed(savedToolsUsed)
    const savedMilestone = MILESTONES.find(m => m.name === currentMilestoneName) || null
    setCurrentMilestone(savedMilestone)

    const checkVisibility = () => {
      setIsVisible(window.pageYOffset > 100)
    }

    const trackToolUsage = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target.tagName === 'BUTTON') {
        setToolsUsed(prev => {
          const newCount = prev + 1
          saveProgress({ toolsUsed: newCount, currentMilestoneName: currentMilestone?.name || null })
          return newCount
        })
      }
    }

    window.addEventListener('scroll', checkVisibility)
    document.addEventListener('click', trackToolUsage)

    checkVisibility()
    checkMilestone()

    return () => {
      window.removeEventListener('scroll', checkVisibility)
      document.removeEventListener('click', trackToolUsage)
    }
  }, [checkMilestone, loadProgress, saveProgress, currentMilestone])

  useEffect(() => {
    checkMilestone()
  }, [toolsUsed, checkMilestone])

  const handleSupport = () => {
    window.open('https://www.buymeacoffee.com/yourusername', '_blank', 'noopener,noreferrer')
  }

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev)
  }

  const nextMilestone = MILESTONES.find(m => m.threshold > toolsUsed) || MILESTONES[MILESTONES.length - 1]
  const progress = nextMilestone === MILESTONES[MILESTONES.length - 1] && toolsUsed >= nextMilestone.threshold
    ? 100
    : ((toolsUsed - (currentMilestone?.threshold || 0)) / (nextMilestone.threshold - (currentMilestone?.threshold || 0))) * 100

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {isExpanded ? (
        <>
          <button
            onClick={toggleExpanded}
            className="bg-background/90 backdrop-blur-sm text-foreground p-2 rounded-full shadow-lg hover:bg-background/70 transition-colors duration-200"
            aria-label="Close support widget"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="bg-background/90 backdrop-blur-sm text-foreground px-4 py-2 rounded-lg shadow-lg text-sm sm:text-base max-w-[250px] sm:max-w-[300px]">
            <p className="font-medium">You've used our AI tools {toolsUsed} times!</p>
            {currentMilestone && (
              <p className="text-primary mt-1">Current rank: {currentMilestone.name}</p>
            )}
          </div>
          <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full shadow-lg text-xs sm:text-sm flex items-center">
            {currentMilestone?.icon}
            <div className="ml-2 w-24 bg-primary-foreground/20 rounded-full h-2">
              <div 
                className="bg-primary-foreground h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="font-medium ml-2">
              {nextMilestone === MILESTONES[MILESTONES.length - 1] && toolsUsed >= nextMilestone.threshold
                ? "Max rank!"
                : `${nextMilestone.threshold - toolsUsed} to ${nextMilestone.name}`
              }
            </p>
          </div>
          <Button
            onClick={handleSupport}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            aria-label="Support Sazeai's AI tools"
          >
            <Coffee className="w-5 h-5 mr-2" />
            <span className="whitespace-nowrap">Support Sazeai</span>
          </Button>
        </>
      ) : (
        <Button
          onClick={toggleExpanded}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold p-2 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          aria-label="Open support widget"
        >
          <Coffee className="w-5 h-5" />
        </Button>
      )}
    </div>
  )
}

