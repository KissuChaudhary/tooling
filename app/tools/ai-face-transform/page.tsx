import { Metadata } from 'next'
import AITransform from '@/components/AITransform'
import { Suspense } from 'react'
import AdUnit from '@/components/AdUnit'
import { CheckCircle, TrendingUp, Zap, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Face Transform Tool - Turn Your Photos into Art with AI',
  description: 'Transform your face into various artistic styles like Disney Pixar, emojis, and video game characters using our AI tool. Fun, free, and easy-to-use for any image!',
  keywords: 'Disney Pixar AI filter, Disney filter Instagram, Pixar filter online free, face to emoji AI online free, AI emoji generator, AI face to video game characters',
}

export default function AITransformPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* SEO Content */}
          <div className="prose max-w-none mb-12">
            <h1 className="text-4xl font-bold text-center mb-6">
              AI Face Transform Tool
            </h1>
            <p className="text-lg text-gray-600 text-center mb-8">
              Transform your photos into incredible artistic styles with the power of AI! Whether you want a Disney Pixar look, a fun emoji, or even a video game character, our AI Face Transform Tool is easy and fun to use.
            </p>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <AITransform />
          </Suspense>

          <section className="bg-muted py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Transform Your Photos with Ease</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg mb-4">Our AI Face Transform Tool allows you to easily convert your face into popular styles like:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 text-primary" />
                      Disney Pixar AI filter for a fun, animated look
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 text-primary" />
                      Create emojis with our face-to-emoji AI
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 text-primary" />
                      Turn your face into a video game character
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 text-primary" />
                      Create pixel art, clay portraits, and more
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <AdUnit client="ca-pub-7915372771416695" slot="8441706260" style={{ marginBottom: '20px' }} />

          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Use Our AI Face Transform Tool?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card rounded-lg p-6 shadow-md">
                  <TrendingUp className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Multiple Artistic Styles</h3>
                  <p className="text-muted-foreground">
                    Whether it’s Disney Pixar, face-to-emoji, or turning yourself into a video game character, our tool offers diverse styles for creative fun.
                  </p>
                </div>
                <div className="bg-card rounded-lg p-6 shadow-md">
                  <Zap className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Fast and Easy</h3>
                  <p className="text-muted-foreground">
                    Simply upload your photo, select a style, and watch as AI transforms your image in seconds.
                  </p>
                </div>
                <div className="bg-card rounded-lg p-6 shadow-md">
                  <Users className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Free to Use</h3>
                  <p className="text-muted-foreground">Transform as many images as you like—our AI tool is completely free.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-muted py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How It Works</h2>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">1</div>
                  <h3 className="font-semibold mb-2">Upload Your Photo</h3>
                  <p className="text-muted-foreground">Choose the photo you want to transform.</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">2</div>
                  <h3 className="font-semibold mb-2">Select a Style</h3>
                  <p className="text-muted-foreground">Choose from Disney Pixar, emojis, video game characters, and more.</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">3</div>
                  <h3 className="font-semibold mb-2">Let AI Work Its Magic</h3>
                  <p className="text-muted-foreground">Our AI will instantly transform your photo into your chosen style.</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">4</div>
                  <h3 className="font-semibold mb-2">Download Your Image</h3>
                  <p className="text-muted-foreground">Save and share your transformed image online.</p>
                </div>
              </div>
            </div>
          </section>

          <AdUnit client="ca-pub-7915372771416695" slot="8441706260" style={{ marginBottom: '20px' }} />

          <section className="py-12">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Transform Your Face?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of users who have transformed their faces into fun, artistic styles. It's quick, easy, and free—perfect for social media, avatars, or just for fun!
              </p>
              <Button asChild size="lg">
                <Link href="#transform">
                Start Transforming Now</Link> 
              </Button>
            </div>
          </section>

          <section className="bg-muted py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I create a Disney Pixar-style face?</h3>
                  <p className="text-muted-foreground">
                    Yes! Our AI tool features a popular Disney Pixar filter to give your face that animated movie look.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I turn my face into an emoji?</h3>
                  <p className="text-muted-foreground">
                    Absolutely! Use our face-to-emoji AI generator to create fun, personalized emojis.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I create video game characters from my face?</h3>
                  <p className="text-muted-foreground">
                    Yes, our AI tool allows you to turn your face into a video game character—perfect for avatars or creative fun!
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Is this AI Face Transform Tool free to use?</h3>
                  <p className="text-muted-foreground">
                    Yes! You can transform as many photos as you like using our AI Face Transform Tool, all for free.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Explore Popular AI Transformations</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Disney Pixar AI Filter</h3>
                  <p className="text-muted-foreground">
                    Want to see yourself as a Disney Pixar character? Our AI tool can give you the iconic Pixar look, perfect for fun and sharing on social media platforms like Instagram or TikTok.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Face-to-Emoji AI Generator</h3>
                  <p className="text-muted-foreground">
                    Turn your face into a custom emoji with our free AI emoji generator. It’s simple, quick, and you can even copy and paste your personalized emoji to use in messages.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Video Game Character AI Transform</h3>
                  <p className="text-muted-foreground">
                    Ever wondered how you’d look as a video game character? Our AI can transform your face into a game character style, making it perfect for avatars on Reddit or as a unique profile picture. Try the best AI face-to-video-game-character tool for free.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Pixel Art and Toy Versions</h3>
                  <p className="text-muted-foreground">
                    Explore other fun styles like pixel art or even toy-like versions of yourself. Get creative with how you represent yourself online!
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-muted py-12">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Get Started with Our Free AI Face Transform Tool</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                No matter what style you’re looking for, from Disney Pixar to fun emojis or video game characters, our AI makes it easy to transform your photos in just a few clicks. It’s free, fast, and loads of fun—try it today!
              </p>
              <Button asChild size="lg">
                <Link href="#transform">Try Now</Link>
              </Button>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

