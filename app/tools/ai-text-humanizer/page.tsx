// app/page.tsx
import AITextHumanizer from '@/components/AITextHumanizer'
import { Toaster } from 'react-hot-toast'

export default function Home() {
  return (
      <AITextHumanizer />
      <Toaster position="bottom-center" />
  )
}
