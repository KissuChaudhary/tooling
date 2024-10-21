import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-12 bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground"> Download Our App</h3>
          <Link href="https://play.google.com/store/apps/details?id=com.sazeai.sazeaichat">
              <Image
                src="/images/google.png"
                alt="Saze AI App"
                width={150} // Set the width of your logo
                height={50} // Set the height of your logo
                className="mb-4"
              />
            </Link>
            <p>
             SazeAI: Your ultimate AI-powered content generator. Create high-quality content effortlessly.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
            <li>
                <Link href="/page/contact-us" className="hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/page/about-us" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
            
              <li>
                <Link href="/page/privacy-policy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/page/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
             
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Popular AI Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tools/ai-image-generator" className="hover:text-foreground transition-colors">
                  AI Image Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/ai-text-to-speech" className="hover:text-foreground transition-colors">
                  Ai Text To Speech
                </Link>
              </li>
              <li>
                <Link href="/tools/ai-caption-generator" className="hover:text-foreground transition-colors">
                  AI Caption Generator
                </Link>
              </li>
              <li>
                <Link href="h/tools/ai-pickup-lines-generator" className="hover:text-foreground transition-colors">
                  AI Pickup Lines Generator
                </Link>
              </li>
            </ul>
           
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center">
            © {new Date().getFullYear()} Saze AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
