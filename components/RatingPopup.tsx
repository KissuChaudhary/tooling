"use client"

import * as React from "react"
import { Star } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [open, setOpen] = React.useState(false)
  const [rating, setRating] = React.useState(0)
  const [hoveredRating, setHoveredRating] = React.useState(0)

  // Show popup after 30 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user hasn't rated before
      const hasRated = localStorage.getItem("hasRated")
      if (!hasRated) {
        setOpen(true)
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  const handleRating = (selectedRating: number) => {
    setRating(selectedRating)
    localStorage.setItem("hasRated", "true")
    
    // Open both review pages in new tabs
    window.open("https://www.producthunt.com/products/saze-ai/reviews", "_blank")
    window.open("https://theresanaiforthat.com/ai/sazeai", "_blank")
    
    // Close the dialog after a brief delay
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
        </div>
      </DialogContent>
    </Dialog>
  )
}
