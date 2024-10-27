'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setIsSticky(false)
      } else {
        setIsSticky(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={`bg-background border transition-all duration-300 ${isSticky ? 'sticky top-0 z-50' : ''}`}>
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center relative w-[150px] h-[50px]">
            <Image
              src="/images/logo.png"
              alt="Your Logo (Light Mode)"
              width={150}
              height={50}
              className={`absolute top-0 left-0 transition-opacity duration-300 ${
                theme === 'dark' ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <Image
              src="/images/logo.png"
              alt="Your Logo (Dark Mode)"
              width={150}
              height={50}
              className={`absolute top-0 left-0 transition-opacity duration-300 ${
                theme === 'dark' ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </Link>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:block">
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground font-semibold transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/tools/ai-image-generator" className="text-muted-foreground font-semibold hover:text-foreground transition-colors duration-200">
                    AI Image Generator
                  </Link>
                </li>
                <li>
                  <Link href="/tools/ai-text-to-speech" className="text-muted-foreground font-semibold hover:text-foreground transition-colors duration-200">
                    AI Text to Speech
                  </Link>
                </li>
                  <li>
                  <Link href="/ai-image-tools" className="text-muted-foreground font-semibold hover:text-foreground transition-colors duration-200">
                    AI Image Tools
                  </Link>
                </li>
                <li>
                  <Link href="/tools" className="text-muted-foreground hover:text-foreground font-semibold transition-colors duration-200">
                    AI Tools
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground font-semibold transition-colors duration-200">
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>
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
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 ease-in-out z-[1000]"
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
      </div>
      <div 
        className={`fixed top-0 left-0 w-full h-full bg-background transition-opacity duration-300 ease-in-out md:hidden z-[999] ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="h-full flex items-center justify-center">
          <ul className="flex flex-col space-y-8 text-center">
            <li>
              <Link 
                href="/" 
                className="text-3xl font-bold text-foreground hover:text-primary transition-colors duration-200" 
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/blog" 
                className="text-3xl font-bold text-foreground hover:text-primary transition-colors duration-200" 
                onClick={toggleMenu}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                href="/tools" 
                className="text-3xl font-bold text-foreground hover:text-primary transition-colors duration-200" 
                onClick={toggleMenu}
              >
                AI Tools
              </Link>
            </li>
            <li>
              <Link 
                href="/tools/ai-image-generator" 
                className="text-3xl font-bold text-foreground hover:text-primary transition-colors duration-200" 
                onClick={toggleMenu}
              >
                AI Image Generator
              </Link>
            </li>
              <li>
              <Link 
                href="/tools/ai-influencer-generator" 
                className="text-3xl font-bold text-foreground hover:text-primary transition-colors duration-200" 
                onClick={toggleMenu}
              >
                AI Influencer
              </Link>
            </li>
            <li>
              <Link 
                href="/tools/ai-text-to-speech" 
                className="text-3xl font-bold text-foreground hover:text-primary transition-colors duration-200" 
                onClick={toggleMenu}
              >
                AI Text-To-Speech
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
