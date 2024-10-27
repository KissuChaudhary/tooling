import { Metadata } from 'next'
import ImageUpscaler from '@/components/ImageUpscaler'
import { Suspense } from 'react'
import AdUnit from '@/components/AdUnit'
import { CheckCircle, TrendingUp, Zap, Users } from 'lucide-react'
import { Button } from '@/components/Button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Image Upscaler Tool - Enhance Image Quality with AI',
  description: 'Upscale your images using AI to increase resolution and improve clarity. Fast, free, and high-quality upscaling for any image.',
  keywords: 'AI image upscaler, image resolution enhancement, AI photo upscaling, improve image quality, image enlargement tool',
}

export default function ImageUpscalerPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* SEO Content */}
          <div className="prose max-w-none mb-12">
            <h1 className="text-4xl font-bold text-center mb-6">
              AI Image Upscaler Tool
            </h1>
            <p className="text-lg text-gray-600 text-center mb-8">
              Enhance your image quality and resolution instantly using advanced AI technology. Upload your image and let AI upscale it for crisp, high-quality results.
            </p>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <ImageUpscaler />
          </Suspense>

          <section className="bg-muted py-12">
   <div className="container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Enhance Your Images with Ease</h2>
      <div className="grid md:grid-cols-2 gap-8 items-center">
         <div>
            <p className="text-lg mb-4"> Our AI Image Upscaler is designed to help you effortlessly improve the quality and clarity of your images. Whether you’re a professional photographer, a designer, or just someone looking to sharpen up their favorite shots, this tool makes it simple to: </p>
            <ul className="space-y-2">
               <li className="flex items-center">
                  <CheckCircle className="mr-2 text-primary" />
                  Increase image resolution in seconds
               </li>
               <li className="flex items-center">
                  <CheckCircle className="mr-2 text-primary" />
                  Sharpen details without losing quality
               </li>
               <li className="flex items-center">
                  <CheckCircle className="mr-2 text-primary" />
                  Enhance photos for print or digital use
               </li>
               <li className="flex items-center">
                  <CheckCircle className="mr-2 text-primary" />
                  Get results with just a few clicks
               </li>
            </ul>
         </div>
      </div>
   </div>
</section>
<AdUnit client="ca-pub-7915372771416695" slot="8441706260" style={{ marginBottom: '20px' }} />
<section className="py-12">
   <div className="container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Choose Our AI Image Upscaler?</h2>
      <div className="grid md:grid-cols-3 gap-8">
         <div className="bg-card rounded-lg p-6 shadow-md">
            <TrendingUp className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-4">Crystal-Clear Results</h3>
            <p className="text-muted-foreground">Our AI enhances your images with stunning clarity, perfect for large prints or high-quality digital displays.</p>
         </div>
         <div className="bg-card rounded-lg p-6 shadow-md">
            <Zap className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-4">Fast and Easy</h3>
            <p className="text-muted-foreground">Get high-resolution images in seconds. Just upload your image and let the AI do the rest.</p>
         </div>
         <div className="bg-card rounded-lg p-6 shadow-md">
            <Users className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-4">Free and Convenient</h3>
            <p className="text-muted-foreground">Upscale as many images as you like, anytime, anywhere—no need to install anything.</p>
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
            <h3 className="font-semibold mb-2">Upload Your Image</h3>
            <p className="text-muted-foreground">Select the photo you want to enhance and upload it to the tool.</p>
         </div>
         <div className="text-center">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">2</div>
            <h3 className="font-semibold mb-2">Choose Your Settings</h3>
            <p className="text-muted-foreground">Pick how much you’d like to upscale (2x, 4x, etc.) and let the AI handle the rest.</p>
         </div>
         <div className="text-center">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">3</div>
            <h3 className="font-semibold mb-2">Let AI Work Its Magic</h3>
            <p className="text-muted-foreground">Watch as the AI increases the resolution and refines the details of your image.</p>
         </div>
         <div className="text-center">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">4</div>
            <h3 className="font-semibold mb-2">Download Your Image</h3>
            <p className="text-muted-foreground">Save your upscaled image, ready to share or print in high definition.</p>
         </div>
      </div>
   </div>
</section>
<AdUnit client="ca-pub-7915372771416695" slot="8441706260" style={{ marginBottom: '20px' }} />
<section className="py-12">
   <div className="container mx-auto px-4 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Enhance Your Images?</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl mx-auto"> Join thousands of creators and professionals who trust our AI Image Upscaler to improve their visuals. It's simple, fast, and free—perfect for anyone who needs high-quality images. </p>
      <Button asChild size="lg">
         <Link href="#upscaler">
         Start Upscaling Now</Link> 
      </Button>
   </div>
</section>
<section className="bg-muted py-12">
   <div className="container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      <div className="grid md:grid-cols-2 gap-8">
         <div>
            <h3 className="text-xl font-semibold mb-2">Can I upscale any type of image?</h3>
            <p className="text-muted-foreground">Yes! You can upload photos, illustrations, or graphics in formats like JPEG, PNG, and WebP.</p>
         </div>
         <div>
            <h3 className="text-xl font-semibold mb-2">Will my upscaled images lose quality?</h3>
            <p className="text-muted-foreground">No! Our AI is designed to maintain clarity and detail while increasing resolution.</p>
         </div>
         <div>
            <h3 className="text-xl font-semibold mb-2">How long does the process take?</h3>
            <p className="text-muted-foreground">Usually just a few seconds, but it depends on the size of your image and the level of upscaling you choose.</p>
         </div>
         <div>
            <h3 className="text-xl font-semibold mb-2">Is this service free?</h3>
            <p className="text-muted-foreground">Yes! Our AI Image Upscaler is completely free to use, with no hidden fees.</p>
         </div>
      </div>
   </div>
</section>
      
      <AdUnit 
        client="ca-pub-7915372771416695"
        slot="2181958821"
        style={{ marginBottom: '20px' }}
      />
    </div>
        
           </div>
           </div>
  )
}
