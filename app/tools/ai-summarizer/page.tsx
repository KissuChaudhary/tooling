
// app/tools/ai-summarizer/page.tsx
import AISummarizer from '@/components/AISummarizer';
import AdUnit from '@/components/AdUnit'

export default function AISummarizerPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Web Content Extractor</h1>
      <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
      <AISummarizer />
      <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
    </main>
  );
}
