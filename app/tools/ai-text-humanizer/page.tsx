// app/page.tsx
import AITextHumanizer from '@/components/AITextHumanizer'
import { Toaster } from 'react-hot-toast'

export default function Home() {
  return (
    <div>
      <AITextHumanizer />
      <Toaster position="bottom-center" />
      </div>
  )
}
