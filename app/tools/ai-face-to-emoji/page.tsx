import { Metadata } from 'next'
import EmojiFaceTransform from '@/components/AIEmojiFilter'
import { Suspense } from 'react'
import AdUnit from '@/components/AdUnit'
import { CheckCircle, TrendingUp, Zap, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ToolEngagement from '@/components/tool-engagement'

export const metadata: Metadata = {
  title: 'AI Emoji Filter Online Free - Turn Your Face into Custom Emojis with AI',
  description: 'Convert your photo into fun and unique emojis with our free AI emoji tool. Easy-to-use, fun, and perfect for creating custom emojis!',
  keywords: 'ai emoji filter, image to emoji, custom emoji, face to emoji, emoji maker',
}

export default function AITransformPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* SEO Content */}
          <div className="prose max-w-none mb-12">
            <h1 className="text-4xl font-bold text-center mb-6">
              AI Emoji Filter - Create Custom Emojis Instantly
            </h1>
            <p className="text-lg text-gray-600 text-center mb-8">
              Transform your face into a personalized emoji with our free AI emoji filter. Fun, quick, and perfect for creating custom emojis for messaging, social media, and more!
            </p>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <EmojiFaceTransform />
          </Suspense>
          <ToolEngagement 
            toolName="AI Face to Emoji Filter"
          />
           <AdUnit 
              client="ca-pub-7915372771416695"
              slot="8441706260"
              style={{ marginBottom: '20px' }}
           />
          
          <section className="bg-muted py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Turn Your Face into Custom Emojis</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg mb-4">With our AI emoji filter, you can instantly convert any image into a fun, custom emoji that represents you!</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 text-primary" />
                      Create custom emojis that stand out in messages
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 text-primary" />
                      Perfect for social media, messaging apps, and creative projects
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 text-primary" />
                      Quick, fun, and easy to use
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Use the AI Emoji Filter?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card rounded-lg p-6 shadow-md">
                  <TrendingUp className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Create Unique Custom Emojis</h3>
                  <p className="text-muted-foreground">Turn your face or any photo into a personalized emoji that captures your emotions in a fun and creative way.</p>
                </div>
                <div className="bg-card rounded-lg p-6 shadow-md">
                  <Zap className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Fast and Easy</h3>
                  <p className="text-muted-foreground">Upload your image, apply the emoji filter, and get your unique emoji in just seconds.</p>
                </div>
                <div className="bg-card rounded-lg p-6 shadow-md">
                  <Users className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Completely Free</h3>
                  <p className="text-muted-foreground">Enjoy unlimited custom emoji transformations with our free AI emoji filter tool.</p>
                </div>
              </div>
            </div>
          </section>

          <AdUnit 
            client="ca-pub-7915372771416695"
            slot="8441706260"
            style={{ marginBottom: '20px' }}
          />

          <section className="bg-muted py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How It Works</h2>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">1</div>
                  <h3 className="font-semibold mb-2">Upload Your Photo</h3>
                  <p className="text-muted-foreground">Choose the photo or selfie you want to convert into a custom emoji.</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">2</div>
                  <h3 className="font-semibold mb-2">Apply the Emoji Filter</h3>
                  <p className="text-muted-foreground">Select the AI emoji filter and let the tool work its magic.</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">3</div>
                  <h3 className="font-semibold mb-2">Watch the Transformation</h3>
                  <p className="text-muted-foreground">See your image quickly transformed into a personalized emoji.</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">4</div>
                  <h3 className="font-semibold mb-2">Download and Use</h3>
                  <p className="text-muted-foreground">Save your custom emoji and share it across messaging apps or social media.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Create Your Custom Emoji?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">Transform your face into a custom emoji with just a few clicks. It's fun, free, and perfect for adding a personal touch to your messages!</p>
              <Button asChild size="lg">
                <Link href="#transform">
                  Try the AI Emoji Filter Now
                </Link> 
              </Button>
            </div>
          </section>

          <AdUnit 
            client="ca-pub-7915372771416695"
            slot="8441706260"
            style={{ marginBottom: '20px' }}
          />
        </div>
      </div>
    </div>
  )
}
