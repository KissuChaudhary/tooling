import { Metadata } from 'next'
import BackgroundRemover from '@/components/BackgroundRemover'
import { Suspense } from 'react'
import AdUnit from '@/components/AdUnit'
import { CheckCircle, TrendingUp, Zap, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Background Remover - Remove Backgrounds Instantly with AI',
  description: 'Easily remove backgrounds from images and videos using our AI-powered background remover. Achieve professional results with high-definition quality, completely free.',
  keywords: 'AI background remover free, remove BG, remove background, AI background remover video, remove background HD quality, remove background from image free, background change, photo background remove',
}

export default function BackgroundRemoverPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* SEO Content */}
          <div className="prose max-w-none mb-12">
            <h1 className="text-4xl font-bold text-center mb-6">
              AI Background Remover Tool
            </h1>
            <p className="text-lg text-gray-600 text-center mb-8">
              Instantly remove backgrounds from images and videos using advanced AI technology. Get a clean, professional look with high-definition quality in just a few clicks.
            </p>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <BackgroundRemover />
          </Suspense>

          <section className="bg-muted py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Remove Backgrounds with Ease</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg mb-4">Our AI Background Remover makes it simple to professionally remove backgrounds from your images and videos. Whether you're working with photos for social media, business presentations, or creative projects, this tool allows you to:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 text-primary" />
                      Remove backgrounds in seconds, free of charge
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 text-primary" />
                      Retain high-definition image quality
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 text-primary" />
                      Adjust or change backgrounds effortlessly
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 text-primary" />
                      Achieve a professional, polished look with minimal effort
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <AdUnit client="ca-pub-7915372771416695" slot="8441706260" style={{ marginBottom: '20px' }} />

          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Use Our AI Background Remover?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card rounded-lg p-6 shadow-md">
                  <TrendingUp className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-4">High-Definition Quality</h3>
                  <p className="text-muted-foreground">Remove backgrounds while maintaining sharp, high-quality visuals for both images and videos.</p>
                </div>
                <div className="bg-card rounded-lg p-6 shadow-md">
                  <Zap className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Fast and Free</h3>
                  <p className="text-muted-foreground">Remove backgrounds instantly and without any cost. Our tool is free to use, and no installation is required.</p>
                </div>
                <div className="bg-card rounded-lg p-6 shadow-md">
                  <Users className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Perfect for All Projects</h3>
                  <p className="text-muted-foreground">Whether for business or creative use, our AI-powered tool helps you easily change or remove backgrounds for any project.</p>
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
                  <h3 className="font-semibold mb-2">Upload Your Image or Video</h3>
                  <p className="text-muted-foreground">Select the file you want to remove the background from and upload it.</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">2</div>
                  <h3 className="font-semibold mb-2">Let AI Analyze the Image</h3>
                  <p className="text-muted-foreground">Our AI detects and removes the background automatically, providing clean, sharp edges.</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">3</div>
                  <h3 className="font-semibold mb-2">Preview the Result</h3>
                  <p className="text-muted-foreground">Review the background-removed image and adjust if needed for the perfect look.</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">4</div>
                  <h3 className="font-semibold mb-2">Download Your New Image</h3>
                  <p className="text-muted-foreground">Download the file with the background removed, ready for any use—digital or print.</p>
                </div>
              </div>
            </div>
          </section>

          <AdUnit client="ca-pub-7915372771416695" slot="8441706260" style={{ marginBottom: '20px' }} />

          <section className="py-12">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Remove Your Backgrounds?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">Join thousands of creators and professionals who use our AI Background Remover to quickly and effortlessly clean up their images. It's free, fast, and perfect for all your projects.</p>
              <Button asChild size="lg">
                <Link href="#remover">
                Start Removing Backgrounds Now</Link> 
              </Button>
            </div>
          </section>

          <section className="bg-muted py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I remove the background from any image?</h3>
                  <p className="text-muted-foreground">Yes! Our tool works with all types of images, including photos, illustrations, and graphics in formats like JPEG, PNG, and WebP.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Is this service free?</h3>
                  <p className="text-muted-foreground">Yes! Our AI Background Remover is completely free to use with no hidden fees.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Will the quality of my image be affected?</h3>
                  <p className="text-muted-foreground">No! Our AI is designed to remove the background while retaining high-definition quality in your image.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I change the background after removing it?</h3>
                  <p className="text-muted-foreground">Yes, you can replace the removed background with a new one or keep it transparent.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
