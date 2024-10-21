'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ChevronUp, ChevronDown, Lock } from 'lucide-react'

interface TableOfContentsProps {
  content: string
}

interface Heading {
  id: string
  text: string
  level: number
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showCongrats, setShowCongrats] = useState(false)
  const tocRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const extractedHeadings = content.match(/^#{2,3}\s.+$/gm)?.map((heading) => {
      const level = heading.match(/^#{2,3}/)?.[0].length || 2
      const text = heading.replace(/^#{2,3}\s/, '')
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return { id, text, level }
    }) || []

    setHeadings(extractedHeadings)

    extractedHeadings.forEach(({ id, text }) => {
      const element = document.evaluate(`//h2[text()='${text}'] | //h3[text()='${text}']`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLElement
      if (element) {
        element.id = id
      }
    })
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0% -35% 0%' }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY
      const bodyHeight = document.body.offsetHeight
      setShowCongrats(scrollPosition >= bodyHeight - 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div ref={tocRef} className="sticky top-24">
      <nav className="rounded-lg shadow-md p-4 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Table of contents</h2>
          <button onClick={toggleCollapse} className="text-gray-400 hover:text-primary">
            {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
        </div>
        <div className={`space-y-2 ${isCollapsed ? 'h-0 overflow-hidden' : 'h-auto'}`}>
          <ul className="space-y-2 relative">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary"></div>
            {headings.map(({ id, text, level }) => (
              <li key={id} className={`${level === 3 ? 'ml-4' : ''} relative`}>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleClick(e, id)}
                  className={`block py-1 pl-4 ${
                    activeId === id
                      ? 'text-primary font-medium'
                      : 'text-gray-400 hover:text-primary'
                  }`}
                >
                  {activeId === id && (
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary"></div>
                  )}
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {showCongrats && (
          <div className="mt-4 flex items-center text-sm text-gray-600">
            <Lock size={16} className="text-primary mr-2" />
            <p>
              <span className="font-semibold">Congratulations!</span>
              <br />
              You've thoroughly explored this topic!
            </p>
          </div>
        )}
      </nav>
    </div>
  )
}