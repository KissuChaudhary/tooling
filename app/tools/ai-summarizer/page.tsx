
// app/tools/ai-summarizer/page.tsx
import AISummarizer from '@/components/AISummarizer';

export default function AISummarizerPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Web Content Extractor</h1>
      <AISummarizer />
    </main>
  );
}
