import { Metadata } from 'next'
import ImageUpscaler from '@/components/ImageUpscaler'
import { Suspense } from 'react'
import AdUnit from '@/components/AdUnit'

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

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-3">Features</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>AI-powered image upscaling</li>
                <li>Increases resolution up to 4x without losing quality</li>
                <li>Supports various file formats</li>
                <li>Instant preview and downloadable results</li>
                <li>High-quality output optimized for large prints and digital displays</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-3">How to Use</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Upload your image or provide an image URL</li>
                <li>Select the desired upscale factor (e.g., 2x, 4x)</li>
                <li>Let the AI process the image and increase its resolution</li>
                <li>Preview the upscaled result</li>
                <li>Download your enhanced image</li>
              </ol>
            </div>
          </div>

          {/* Additional SEO Content */}
          <AdUnit 
            client="ca-pub-7915372771416695"
            slot="2181958821"
            style={{ marginBottom: '20px' }}
          />

          <div className="prose max-w-none mt-12">
            <h2 className="text-2xl font-semibold mb-4">
              About Our AI Image Upscaler Tool
            </h2>
            <p className="text-gray-600 mb-4">
              Our AI Image Upscaler Tool uses state-of-the-art artificial intelligence to enhance the resolution of your photos without losing quality. Perfect for enlarging images for printing, presentations, or digital use, this tool provides a smooth and detailed output.
            </p>

            <h3 className="text-xl font-semibold mb-3">Privacy & Security</h3>
            <p className="text-gray-600 mb-4">
              We value your privacy. All image processing is done securely, and we do not store your images after processing. Your data is safe with us.
            </p>

            <h3 className="text-xl font-semibold mb-3">Technical Specifications</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Supported formats: JPEG, PNG, WebP</li>
              <li>Maximum file size: 10MB</li>
              <li>Recommended image resolution: 512x512 or higher</li>
              <li>Upscale options: 2x, 4x, or higher</li>
              <li>Processing time: Usually under 30 seconds</li>
            </ul>
          </div>
        </div>
      </div>
      
      <AdUnit 
        client="ca-pub-7915372771416695"
        slot="2181958821"
        style={{ marginBottom: '20px' }}
      />
    </div>
  )
}
