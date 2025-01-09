"use client"

import * as React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import confetti from "canvas-confetti"

export default function Component() {
  const [open, setOpen] = React.useState(false)
  const [hasRated, setHasRated] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const rated = localStorage.getItem("hasRated")
      if (!rated) {
        setOpen(true)
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  const handleRate = (url: string) => {
    setHasRated(true)
    localStorage.setItem("hasRated", "true")
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
    
    // Delay redirection to allow time for confetti and "Thank You" message
    setTimeout(() => {
      window.open(url, "_blank")
      setOpen(false)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md p-6 rounded-xl shadow-lg" onPointerDownOutside={(e) => e.preventDefault()}>
        <div className="flex flex-col items-center gap-4 py-4">
          {!hasRated ? (
            <>
              <h2 className="text-3xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                🌟 Rate SazeAI!
              </h2>
              <p className="font-bold text-xl mb-2 text-center">
                Enjoying SazeAI's free tools?
              </p>
              <p className="font-semibold text-lg mb-2 text-center">
                Show your support by rating us on
              </p>
              <div className="flex flex-col gap-4 items-center justify-center">
                <button 
                  onClick={() => handleRate("https://theresanaiforthat.com/ai/sazeai/?ref=featured&v=3010829")}
                  className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md w-full max-w-[300px]"
                  aria-label="Rate on There's an AI for That"
                >
                  <img 
                    width={300} 
                    height={65} 
                    src="https://media.theresanaiforthat.com/featured-on-taaft.png?width=600" 
                    alt="Featured on There's an AI for That"
                    className="w-full h-auto"
                  />
                </button>
                <button 
                  onClick={() => handleRate("https://www.producthunt.com/products/saze-ai/reviews?utm_source=badge-product_review&utm_medium=badge&utm_souce=badge-saze-ai")}
                  className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md w-full max-w-[250px]"
                  aria-label="Rate on Product Hunt"
                >
                  <img 
                    src="https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=581923&theme=light" 
                    alt="Saze AI - Free AI Writer | Best Free AI Content Generator Tools | Product Hunt" 
                    width={250}
                    height={54}
                    className="w-full h-auto"
                  />
                </button>
              </div>
              <p className="text-xs text-blue-500 italic mb-4 text-center">
                Your ratings help us improve and keep our tools free!
              </p>
              <p className="text-xs text-blue-500 italic mb-4 text-center">
                No vote = No free tools. (Just kidding… or am I?)
              </p>
              <p className="text-sm text-gray-500 text-center">
                Please click on one of the buttons above to rate SazeAI.
              </p>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-4xl font-extrabold mb-4 text-indigo-600">Thank You!</h2>
              <p className="text-xl font-semibold">Redirecting you to the review page in a moment...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

