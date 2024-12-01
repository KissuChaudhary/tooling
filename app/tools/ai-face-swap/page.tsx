import FaceSwapTool from '@/components/FaceSwapTool'

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">AI Face Swap Tool</h1>
        <FaceSwapTool />
      </div>
    </main>
  )
}

