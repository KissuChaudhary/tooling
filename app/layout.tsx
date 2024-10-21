import './globals.css'
import { Providers } from './Providers'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WebSiteSchema from './WebSiteSchema'
import { Metadata } from 'next'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import Script from 'next/script'

export const metadata: Metadata = {
  title: {
    default: 'Saze AI: Free AI Writing Tools',
    template: '%s | Saze AI'
  },
  description: 'Saze AI is a free AI platform designed to make your work and learning easier with unlimited access to our free AI tools.',
  keywords: ['AI', 'writing tools', 'productivity', 'free AI tools'],
  authors: [{ name: 'Saze AI Team' }],
  creator: 'Saze AI',
  publisher: 'Saze AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Saze AI: Free AI Writing Tools',
    description: 'Access 40+ free AI tools to boost your productivity and enhance content quality.',
    url: 'https://sazeai.com',
    siteName: 'Saze AI',
    images: [
      {
        url: 'https://sazeai.com/screenshot.png', // Replace with your actual OG image URL
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saze AI: Free AI Writing Tools',
    description: 'Access 40+ free AI tools to boost your productivity and enhance content quality.',
    images: ['https://sazeai.com/favicon.jpg'], // Replace with your actual Twitter image URL
    creator: '@SazeAI', // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/favicon.ico',
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
  manifest: '/site.webmanifest', // Make sure you have this file in your public folder
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7915372771416695"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <WebSiteSchema />
            <Header />
            <main>
              {children}
            </main>
            <ScrollToTopButton />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}