"use client"

import * as React from "react"
import { Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [open, setOpen] = React.useState(false)
  const [rating, setRating] = React.useState(0)
  const [hoveredRating, setHoveredRating] = React.useState(0)
  const [showReviewOptions, setShowReviewOptions] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const hasRated = localStorage.getItem("hasRated")
      if (!hasRated) {
        setOpen(true)
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  const handleRating = (selectedRating: number) => {
    setRating(selectedRating)
    setShowReviewOptions(true)
  }

  const handleReviewSite = (site: string) => {
    localStorage.setItem("hasRated", "true")
    if (site === "taaft") {
      window.open("https://theresanaiforthat.com/ai/sazeai/?ref=featured&v=3010829", "_blank")
    } else if (site === "producthunt") {
      window.open("https://www.producthunt.com/products/saze-ai/reviews?utm_source=badge-product_review&utm_medium=badge&utm_souce=badge-saze-ai", "_blank")
    }
    setTimeout(() => setOpen(false), 500)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Enjoying Saze AI?
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-4">
          <AnimatePresence mode="wait">
            {!showReviewOptions ? (
              <motion.div
                key="rating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <p className="text-center text-muted-foreground">
                  Your feedback helps us improve. How would you rate your experience?
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 hover:bg-transparent"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => handleRating(star)}
                    >
                      <Star
                        className={`h-8 w-8 transition-all duration-150 ${
                          star <= (hoveredRating || rating)
                            ? "fill-primary text-primary"
                            : "fill-none text-muted-foreground"
                        }`}
                      />
                      <span className="sr-only">Rate {star} stars</span>
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {rating === 0
                    ? "Select a rating"
                    : `You rated ${rating} star${rating === 1 ? "" : "s"}`}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="review-options"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center gap-4"
              >
                <p className="text-center text-muted-foreground">
                  Thank you for your rating! Please choose where you'd like to leave a review:
                </p>
                <div className="flex flex-col gap-4 w-full">
                  <Button
                    variant="outline"
                    className="w-full h-auto py-2 flex items-center justify-center"
                    onClick={() => handleReviewSite("taaft")}
                  >
                    <img 
                      src="https://media.theresanaiforthat.com/featured-on-taaft.png?width=600" 
                      alt="Featured on There's an AI for That"
                      className="w-[200px] h-auto"
                    />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-auto py-2 flex items-center justify-center"
                    onClick={() => handleReviewSite("producthunt")}
                  >
                    <img 
                      src="https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=581923&theme=light" 
                      alt="Saze AI - Free AI Writer | Best Free AI Content Generator Tools | Product Hunt" 
                      className="w-[200px] h-auto"
                    />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
