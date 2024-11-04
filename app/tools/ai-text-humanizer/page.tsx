// app/page.tsx
import AITextHumanizer from '@/components/AITextHumanizer'
import { Toaster } from 'react-hot-toast'

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-8">AI Text Humanizer</h1>
      <AITextHumanizer />
      <Toaster position="bottom-center" />
    </main>
  )
}
