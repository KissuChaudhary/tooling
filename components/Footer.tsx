import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-background shadow-md mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-foreground">&copy; 2024 AI Tools Hub. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link href="https://github.com" className="text-foreground hover:text-primary transition-colors">
              <Github size={24} />
            </Link>
            <Link href="https://twitter.com" className="text-foreground hover:text-primary transition-colors">
              <Twitter size={24} />
            </Link>
            <Link href="https://linkedin.com" className="text-foreground hover:text-primary transition-colors">
              <Linkedin size={24} />
            </Link>
          </div>
        </div>
        <div className="mt-4 text-center">
          <Link href="/privacy" className="text-foreground hover:text-primary transition-colors mr-4">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-foreground hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}
