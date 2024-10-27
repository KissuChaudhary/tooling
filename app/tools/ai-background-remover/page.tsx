import { Metadata } from 'next'
import BackgroundRemover from '@/components/BackGroundRemover'
import { Suspense } from 'react'
import AdUnit from '@/components/AdUnit'

export const metadata: Metadata = {
  title: 'AI Background Remover Tool - Remove Backgrounds with AI',
  description: 'Easily remove backgrounds from your images using AI. Fast, free, and high-quality background removal for all types of photos.',
  keywords: 'AI background remover, photo background removal, AI image editing, remove background from image, AI background eraser',
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
              Instantly remove backgrounds from your photos using advanced AI technology. Upload your image and let the AI do the work in just seconds.
            </p>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <BackgroundRemover />
          </Suspense>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-3">Features</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Automatic background removal</li>
                <li>Supports complex edges (e.g., hair, fur)</li>
                <li>Instant preview</li>
                <li>High-quality output with transparent background</li>
                <li>Customizable background color or image replacement</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-3">How to Use</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Upload your image or provide an image URL</li>
                <li>Let the AI automatically remove the background</li>
                <li>Optionally adjust or replace the background</li>
                <li>Click "Download" to save your image with the background removed</li>
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
              About Our AI Background Remover Tool
            </h2>
            <p className="text-gray-600 mb-4">
              Our AI Background Remover Tool uses cutting-edge artificial intelligence to detect and remove backgrounds from your photos automatically. Whether you're preparing product images, profile pictures, or creative edits, our tool provides fast and precise results.
            </p>

            <h3 className="text-xl font-semibold mb-3">Privacy & Security</h3>
            <p className="text-gray-600 mb-4">
              We prioritize your privacy. All image processing is done securely, and we do not store your images after processing. Your data is safe with us.
            </p>

            <h3 className="text-xl font-semibold mb-3">Technical Specifications</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Supported formats: JPEG, PNG, WebP</li>
              <li>Maximum file size: 10MB</li>
              <li>Recommended image resolution: 512x512 or higher</li>
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
