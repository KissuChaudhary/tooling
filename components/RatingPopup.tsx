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
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl shadow-lg">
        <div className="flex flex-col items-center gap-4 py-4">
          <h2 className="text-3xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            🎉 Vote for SazeAI!
          </h2>
          <p className="font-bold text-xl mb-2 text-center">
            Love SazeAI's free tools?
          </p>
          <p className="font-semibold text-lg mb-2 text-center">
            Show your support and help me win
          </p>
          <p className="font-extrabold text-2xl mb-2 text-center text-indigo-700">
            Best AI Tool of 2024
          </p>
          <p className="font-medium text-base mb-2 text-center">
            on TAAFT.com!
          </p>
          <p className="text-xs text-blue-500 italic mb-4">
            No vote = No free tools. (Just kidding… or am I?)
          </p>
          <button
            onClick={handleVote}
            className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Vote Now
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

