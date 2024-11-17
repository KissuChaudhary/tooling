import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle } from 'lucide-react';
import AdUnit from '@/components/AdUnit';

export default function EnhancedContent() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <section>
        <h2 className="text-3xl font-bold mb-6">Unlock the Power of AI for PDF Summaries</h2>
        <p className="text-lg text-muted-foreground mb-4">
          The AI PDF Summarizer tool is designed to help you quickly extract key insights from lengthy PDF documents. Whether it’s academic research, business reports, or eBooks, this tool provides concise summaries to save your time and effort.
        </p>
        <p className="text-lg text-muted-foreground">
          By leveraging advanced AI algorithms, this tool converts PDF content into easily readable summaries, key points, or highlights. Perfect for students, professionals, and researchers, it ensures you never miss out on important information.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Key Features of AI PDF Summarizer</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: "Summarize PDFs Instantly", description: "Generate concise summaries from PDF files in seconds with just a few clicks." },
            { title: "Text Extraction Made Simple", description: "Effortlessly extract text and main points from scanned or text-based PDF documents." },
            { title: "Completely Free to Use", description: "Enjoy this tool without any charges, perfect for users across all fields." },
            { title: "Customizable Summaries", description: "Switch between detailed explanations, bullet-point highlights, or quick overviews." },
            { title: "AI-Powered Precision", description: "Built with AI, ensuring high accuracy and context-aware summarizations." },
            { title: "User-Friendly Interface", description: "Experience a simple, intuitive design for hassle-free PDF summarization." },
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
        <h2 className="text-2xl font-semibold mb-6">How Does the AI PDF Summarizer Work?</h2>
        <ol className="list-decimal list-inside space-y-4">
          <li className="text-lg">
            <span className="font-medium">Upload Your PDF</span>
            <p className="ml-6 text-muted-foreground">Select and upload the PDF file you want summarized.</p>
          </li>
          <li className="text-lg">
            <span className="font-medium">AI Processing</span>
            <p className="ml-6 text-muted-foreground">The tool scans your document and creates different output formats:</p>
            <ul className="list-disc list-inside ml-12 text-muted-foreground">
              <li>Full Summary: Covers the main ideas and topics of the document.</li>
              <li>Key Highlights: Shortened points for quick comprehension.</li>
              <li>Custom Outputs: Specify sections or content for targeted summaries.</li>
            </ul>
          </li>
          <li className="text-lg">
            <span className="font-medium">Download or Share the Results</span>
            <p className="ml-6 text-muted-foreground">Export the generated summaries for use or share them with others instantly.</p>
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Why Use This AI PDF Summarizer?</h2>
        <ul className="space-y-4">
          {[
            { title: "Save Time and Effort", description: "Avoid reading lengthy PDFs by getting summaries within seconds." },
            { title: "Wide Application", description: "Ideal for students, professionals, and researchers handling large documents." },
            { title: "Free and Accessible", description: "No hidden costs, ensuring availability for everyone." },
            { title: "AI Precision", description: "Delivers accurate and context-aware summaries with ease." },
            { title: "Enhances Productivity", description: "Focus on what's important and make faster decisions." },
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
        <h2 className="text-2xl font-semibold mb-6">Who Can Benefit from the AI PDF Summarizer?</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {[
            { title: "Students and Educators", description: "Summarize research papers, textbooks, or academic journals with ease." },
            { title: "Professionals", description: "Extract key points from business reports or whitepapers efficiently." },
            { title: "Researchers", description: "Simplify the analysis of case studies or large datasets." },
            { title: "Writers and Authors", description: "Condense reference materials for creative or academic work." },
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
              <TableHead>AI PDF Summarizer</TableHead>
              <TableHead>Manual Summarization</TableHead>
              <TableHead>Other AI Tools</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { feature: "Free to Use", aiTool: true, manual: false, otherTools: false },
              { feature: "Context-Aware Summarization", aiTool: true, manual: false, otherTools: true },
              { feature: "Customizable Outputs", aiTool: true, manual: false, otherTools: false },
              { feature: "Supports Scanned PDFs", aiTool: true, manual: false, otherTools: false },
              { feature: "Simple Interface", aiTool: true, manual: false, otherTools: true },
            ].map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.feature}</TableCell>
                <TableCell>{row.aiTool ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}</TableCell>
                <TableCell>{row.manual ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}</TableCell>
                <TableCell>{row.otherTools ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}</TableCell>
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
            { question: "Is the AI PDF Summarizer completely free?", answer: "Yes, this tool is entirely free to use without any hidden charges." },
            { question: "What types of PDFs are supported?", answer: "Both scanned and text-based PDFs are supported for summarization." },
            { question: "Are the summaries accurate?", answer: "Our AI ensures highly accurate and context-aware summaries tailored to your needs." },
            { question: "Can I share the summaries?", answer: "Yes, the summaries can be copied and shared directly from the web." },
            { question: "Is there a file size limit for uploads?", answer: "Yes, you can upload files up to 10 MB for processing." },
          ].map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
