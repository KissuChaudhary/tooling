'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
          Your Logo
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {mounted && (
            theme === 'dark' ? (
              <Sun className="text-yellow-500 w-5 h-5" />
            ) : (
              <Moon className="text-gray-700 w-5 h-5" />
            )
          )}
        </button>
      </div>
    </header>
  )
}
