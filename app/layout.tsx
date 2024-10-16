import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Tools Hub',
  description: 'A collection of AI-powered text generation tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-800 text-white p-4">
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/" className="hover:text-gray-300">Home</a></li>
              <li><a href="/tools" className="hover:text-gray-300">All Tools</a></li>
            </ul>
          </nav>
        </header>
        <main className="mx-auto">
          {children}
        </main>
        <footer className="bg-gray-800 text-center text-white p-4">
          <p>&copy; 2024 AI Tools Hub. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}