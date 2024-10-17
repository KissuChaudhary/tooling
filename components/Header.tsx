'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-background">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-foreground">
          Your Logo
        </Link>
        <div className="flex items-center space-x-4">
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="btn btn-secondary relative w-10 h-10 rounded-full overflow-hidden transition-colors duration-300 ease-in-out"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out">
              {mounted && (
                <>
                  <Sun className={`w-5 h-5 ${theme === 'dark' ? 'translate-y-10' : 'translate-y-0'}`} />
                  <Moon className={`w-5 h-5 absolute ${theme === 'dark' ? 'translate-y-0' : '-translate-y-10'}`} />
                </>
              )}
            </div>
          </button>
          <button
            aria-label="Toggle Menu"
            type="button"
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 ease-in-out"
            onClick={toggleMenu}
          >
            <div className={`transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </div>
          </button>
        </div>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64' : 'max-h-0'}`}>
        <nav className="bg-background border-t border-border">
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors duration-200" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors duration-200" onClick={toggleMenu}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors duration-200" onClick={toggleMenu}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <nav className="hidden md:block">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
