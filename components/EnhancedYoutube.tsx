import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, XCircle } from 'lucide-react'
import AdUnit from '@/components/AdUnit'


export default function EnhancedContent() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <section>
        <h2 className="text-3xl font-bold mb-6">Unlock the Power of AI for Video Summaries</h2>
        <p className="text-lg text-muted-foreground mb-4">
          The YouTube Video Summarizer AI Free tool is designed to help you save time by generating concise summaries of YouTube videos. Whether it's an educational tutorial, a product review, or a business webinar, our tool allows you to quickly extract the most valuable insights from any video.
        </p>
        <p className="text-lg text-muted-foreground">
          By utilizing AI video summarizer technology powered by advanced algorithms like ChatGPT, this tool transforms video content into easy-to-read text summaries and key takeaways. Whether you're a student, researcher, or content creator, this tool is a must-have for efficient video analysis.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Key Features of AI YouTube Video Summarizer</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: "Summarize Video to Text Instantly", description: "Transform YouTube video content into clear and precise summaries with just one click." },
            { title: "Transcript-Free Summarization", description: "No need for a pre-existing transcript! This tool processes the video directly and generates a summary without requiring manual input." },
            { title: "Video Summary Generator Free for Everyone", description: "Our YouTube summarizer without transcript is completely free to use, ensuring accessibility for students, professionals, and casual users." },
            { title: "YouTube Summary with ChatGPT", description: "Powered by ChatGPT, the summarizer ensures high accuracy and a natural flow of information in the generated summaries." },
            { title: "Customizable Outputs", description: "Switch between a detailed transcript, a concise summary, or quick highlights depending on your needs." },
            { title: "Fast and Intuitive Design", description: "Our Notta YouTube video summarizer alternative is built for simplicity and speed, ensuring a seamless user experience." },
          ].map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
  <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
      <section>
        <h2 className="text-2xl font-semibold mb-6">How Does the YouTube Video Summarizer Work?</h2>
        <ol className="list-decimal list-inside space-y-4">
          <li className="text-lg">
            <span className="font-medium">Paste the YouTube Video Link</span>
            <p className="ml-6 text-muted-foreground">Simply copy and paste the video URL into the input field.</p>
          </li>
          <li className="text-lg">
            <span className="font-medium">Analyze and Summarize</span>
            <p className="ml-6 text-muted-foreground">The tool processes the video and generates outputs in different formats:</p>
            <ul className="list-disc list-inside ml-12 text-muted-foreground">
              <li>Full Transcript: Perfect for deep analysis or detailed notes.</li>
              <li>Summary: A concise version of the video's content for quick understanding.</li>
              <li>Key Highlights: Focused points for instant takeaways.</li>
            </ul>
          </li>
          <li className="text-lg">
            <span className="font-medium">Download or Share the Results</span>
            <p className="ml-6 text-muted-foreground">Export the generated content in text format or share it directly with others.</p>
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Why Use This AI Video Summarizer?</h2>
        <ul className="space-y-4">
          {[
            { title: "Save Time and Effort", description: "Stop wasting hours watching videos. With this tool, you can get the YouTube video summary in seconds." },
            { title: "Versatile Use Cases", description: "Ideal for students summarizing lecture videos, marketers extracting insights from tutorials, or researchers analyzing content." },
            { title: "Free and Accessible", description: "Unlike premium tools, this YouTube video summarizer AI free tool is accessible to everyone." },
            { title: "Better than Manual Transcription", description: "Instead of transcribing video content manually, rely on AI video summarizer technology for faster, more accurate results." },
            { title: "Smart AI Integration", description: "Powered by YouTube Summary with ChatGPT, it delivers summaries with a human-like flow, ensuring readability." },
          ].map((reason, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
              <div>
                <h3 className="font-medium">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
  <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
      <section>
        <h2 className="text-2xl font-semibold mb-6">Who Can Benefit from the AI YouTube Video Summarizer?</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {[
            { title: "Students and Educators", description: "Quickly summarize video to text for academic purposes." },
            { title: "Content Creators", description: "Extract content ideas and trends from long-form videos." },
            { title: "Researchers", description: "Save time analyzing webinars, interviews, or conferences." },
            { title: "Busy Professionals", description: "Stay updated on industry insights without watching entire videos." },
          ].map((beneficiary, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
              <div>
                <h3 className="font-medium">{beneficiary.title}</h3>
                <p className="text-muted-foreground">{beneficiary.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Comparison with Other Tools</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feature</TableHead>
              <TableHead>AI YouTube Video Summarizer</TableHead>
              <TableHead>Notta YouTube Video Summarizer</TableHead>
              <TableHead>Manual Transcription</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { feature: "Free to Use", aiTool: true, notta: false, manual: false },
              { feature: "Transcript-Free Summarization", aiTool: true, notta: true, manual: false },
              { feature: "Summarize Video to Text Quickly", aiTool: true, notta: true, manual: false },
              { feature: "Customizable Outputs", aiTool: true, notta: false, manual: false },
              { feature: "Powered by ChatGPT", aiTool: true, notta: false, manual: false },
            ].map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.feature}</TableCell>
                <TableCell>{row.aiTool ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}</TableCell>
                <TableCell>{row.notta ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}</TableCell>
                <TableCell>{row.manual ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
  <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
      <section>
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions (FAQs)</h2>
        <Accordion type="single" collapsible className="w-full">
          {[
            { question: "Is this YouTube video summarizer free to use?", answer: "Yes, our video summary generator free tool is 100% free for everyone." },
            { question: "Can I summarize YouTube videos without a transcript?", answer: "Unlike many tools, our YouTube summarizer without transcript works directly with video links." },
            { question: "How accurate is the summary?", answer: "Powered by ChatGPT, the tool provides highly accurate summaries with natural language processing." },
            { question: "Can I use this tool for long YouTube videos?", answer: "Yes, you can summarize any YouTube video, regardless of its length." },
            { question: "How is this different from Notta YouTube video summarizer?", answer: "Our tool is free, simple to use, and doesn't require sign-ups or additional steps. It's perfect for those seeking quick summaries without any hassle." },
          ].map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  )
}
