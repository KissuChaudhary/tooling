import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-12 bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Saze AI</h3>
            <p>
             SazeAI: Your ultimate AI-powered content generator. Create high-quality content effortlessly.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Contact Us</h3>
            <p>
              Email: support@sazeai.com<br />
            </p>
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
