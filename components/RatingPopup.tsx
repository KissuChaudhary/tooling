"use client"

import * as React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export default function Component() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const hasVoted = localStorage.getItem("hasVoted")
      if (!hasVoted) {
        setOpen(true)
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  const handleVote = () => {
    localStorage.setItem("hasVoted", "true")
    window.open("https://theresanaiforthat.com/best-ai-tool-2024-vote/?vote=sazeai", "_blank")
    setTimeout(() => setOpen(false), 500)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center gap-4 py-4">
          <h2 className="text-xl font-bold mb-2">🎉 Vote for SazeAI!</h2>
          <p className="text-sm text-gray-700 mb-4 text-center">
            Love SazeAI's free tools? Show your support and help us win the{" "}
            <strong>Best AI Tool of 2024</strong> on TAAFT.com!
            <br />
            No vote = No free tools. (Just kidding… or are we?)
          </p>
          <button
            onClick={handleVote}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow transition"
          >
            Vote Now
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

