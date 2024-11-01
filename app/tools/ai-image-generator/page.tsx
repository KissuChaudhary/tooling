import AIImageGenerator from '@/components/AIImageGenerator'
import AdUnit from '@/components/AdUnit'
import ToolEngagement from '@/components/tool-engagement'

export default function AIImageGeneratorPage() {
  return (
    <div className="mx-auto px-4 py-8">
      <AIImageGenerator />
      <ToolEngagement 
          toolName="Free AI Image Generator"
        />
      <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
    </div>
  )
}
