// app/page.tsx
import AITextHumanizer from './components/AITextHumanizer'

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">AI Text Humanizer</h1>
      <AITextHumanizer />
    </main>
  )
}
