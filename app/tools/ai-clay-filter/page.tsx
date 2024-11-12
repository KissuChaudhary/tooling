import { Metadata } from 'next'
import ClayFaceTransform from '@/components/AIClayFilter'
import { Suspense } from 'react'
import AdUnit from '@/components/AdUnit'
import { CheckCircle, TrendingUp, Zap, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ToolEngagement from '@/components/tool-engagement'

export const metadata: Metadata = {
  title: 'AI Clay Filter Online Free - Turn Your Photos into Viral Clay Art',
  description: 'Transform your face into cute and funny clay art using our AI tool. Fun, free, and easy-to-use for any image!',
  keywords: ' ai clay filter, ai filter, clay filter, Clay Filter Online, funny clay makeover',
}

export default function AITransformPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* SEO Content */}
          <div className="prose max-w-none mb-12">
            <h1 className="text-4xl font-bold text-center mb-6">
              AI Clay Filter Online Free
            </h1>
            <p className="text-lg text-gray-600 text-center mb-8">
Transform your face into cute and funny clay art using our free AI tool. Fun, free, and easy-to-use for any image!            </p>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <ClayFaceTransform />
          </Suspense>
<ToolEngagement 
          toolName="AI Clay Filter"
        />
           <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
          <section className="bg-muted py-12">
   <div className="container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Transform Your Photos with AI Clay Filter</h2>
      <div className="grid md:grid-cols-2 gap-8 items-center">
         <div>
            <p className="text-lg mb-4">Experience the magic of clay-style art with our AI Clay Filter. Instantly transform your photos into realistic clay sculptures that stand out.</p>
            <ul className="space-y-2">
               <li className="flex items-center">
                  <CheckCircle className="mr-2 text-primary" />
                  Create stunning clay portraits that look handmade 
               </li>
               <li className="flex items-center">
                  <CheckCircle className="mr-2 text-primary" />
                  Perfect for social media, profile pictures, and creative projects 
               </li>
               <li className="flex items-center">
                  <CheckCircle className="mr-2 text-primary" />
                  Quick, easy, and fun with instant results 
               </li>
            </ul>
         </div>
      </div>
   </div>
</section>
<section className="py-12">
   <div className="container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Use AI Clay Filter?</h2>
      <div className="grid md:grid-cols-3 gap-8">
         <div className="bg-card rounded-lg p-6 shadow-md">
            <TrendingUp className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-4">Unique Clay Art Style</h3>
            <p className="text-muted-foreground"> Transform your face into a lifelike clay model that captures the depth and texture of real clay art. </p>
         </div>
         <div className="bg-card rounded-lg p-6 shadow-md">
            <Zap className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-4">Fast and Simple</h3>
            <p className="text-muted-foreground"> Upload your photo, apply the clay filter, and watch the transformation happen in seconds. </p>
         </div>
         <div className="bg-card rounded-lg p-6 shadow-md">
            <Users className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-4">Completely Free</h3>
            <p className="text-muted-foreground">Enjoy unlimited transformations with the AI Clay Filter—no costs involved.</p>
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
            <p className="text-muted-foreground">Choose the photo you want to transform into a clay-style image.</p>
         </div>
         <div className="text-center">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">2</div>
            <h3 className="font-semibold mb-2">Apply the Clay Filter</h3>
            <p className="text-muted-foreground">Select the AI Clay Filter from the options.</p>
         </div>
         <div className="text-center">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">3</div>
            <h3 className="font-semibold mb-2">Watch the Transformation</h3>
            <p className="text-muted-foreground">Our AI will quickly convert your photo into a detailed clay-style artwork.</p>
         </div>
         <div className="text-center">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">4</div>
            <h3 className="font-semibold mb-2">Download and Share</h3>
            <p className="text-muted-foreground">Save your clay portrait and share it with your friends or on social media.</p>
         </div>
      </div>
   </div>
</section>
<section className="py-12">
   <div className="container mx-auto px-4 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Try the AI Clay Filter?</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl mx-auto"> Create your own clay-style photo in seconds. It's free, fast, and perfect for sharing on social media or using as a unique profile picture. </p>
      <Button asChild size="lg">
         <Link href="#transform">
         Try the AI Clay Filter Now</Link> 
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
