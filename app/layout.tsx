// app/layout.tsx
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '../components/Footer';
import WebSiteSchema from './WebSiteSchema';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { Toaster } from '@/components/ui/toaster';
import { bricolage } from './fonts';
import Component from '@/components/RatingPopup';
import FloatingBuyMeACoffee from '@/components/FloatingAISupport';
import { FixedButton } from '@/components/fixed-button';
import PopupMessage from '@/components/PopupMessage';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import ClientThemeProvider from '@/components/ClientThemeProvider'; // New client component

export const metadata: Metadata = {
  title: {
    default: 'Saze AI: Free AI Writing, Image Generation, and Creative Tools Hub',
    template: '%s | Saze AI',
  },
  description: 'Saze AI is an AI-powered content generating tool to help you quickly create high-quality content that requires minimal effort, time, and cost.',
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
    title: 'Saze AI: Free AI Writing, Image Generation, and Creative Tools Hub',
    description: 'Access 40+ free AI tools to boost your productivity and enhance content quality.',
    url: 'https://sazeai.com',
    siteName: 'Saze AI',
    images: [
      {
        url: 'https://sazeai.com/screenshot.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saze AI: Free AI Writing, Image Generation, and Creative Tools Hub',
    description: 'Access 40+ free AI tools to boost your productivity and enhance content quality.',
    images: ['https://sazeai.com/favicon.jpg'],
    creator: '@SazeAI',
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
  manifest: '/site.webmanifest',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en" suppressHydrationWarning className={bricolage.variable}>
      <head>
        <meta name="google-site-verification" content="-EToNVqz4RKdu9ZyN3wvrcZ_iMPju9wcG9p0YI4W6sM" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7915372771416695"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CN8F63EXC1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-CN8F63EXC1');
          `}
        </Script>
      </head>
      <body>
        <ClientThemeProvider>
          <div className="flex flex-col min-h-screen">
            <WebSiteSchema />
            <Header session={session} />
            <main className="flex-grow">
              {children}
              <SpeedInsights />
              <Component />
            </main>
            <ScrollToTopButton />
            <PopupMessage />
            <FloatingBuyMeACoffee />
            <Footer />
          </div>
          <Toaster />
          <FixedButton />
        </ClientThemeProvider>
      </body>
    </html>
  );
}