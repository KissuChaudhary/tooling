import FaceSwapTool from '@/components/FaceSwapTool'
import AdUnit from '@/components/AdUnit'


export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">100% Free AI Face Swap Online - No Sign-Up Needed</h1>
        <p className="text-center>Swap faces online for free with our AI face swap tool. No sign-up required—just upload your photo and create fun, realistic face swaps instantly!</p>
            <AdUnit 
        client="ca-pub-7915372771416695"
        slot="8441706260"
        style={{ marginBottom: '20px' }}
      />
        <FaceSwapTool />
             <AdUnit 
        client="ca-pub-7915372771416695"
        slot="8441706260"
        style={{ marginBottom: '20px' }}
      />
      </div>
    </main>
  )
}

