import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Fetch the content from the provided URL
    const response = await fetch(url);
    const html = await response.text();

    // Extract text content from HTML (you might want to use a proper HTML parser for better results)
    const textContent = html.replace(/<[^>]*>/g, '');

    // Initialize the Gemini 1.5 Flash model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Generate content using Gemini 1.5 Flash
    const result = await model.generateContent(`
      Analyze the following text and provide:
      1. A concise summary
      2. Key points (as a list)
      3. An appropriate title
      4. The word count of the original text

      Text to analyze:
      ${textContent}
    `);

    const generatedText = result.response.text();

    // Parse the generated content
    const [summary, keyPointsRaw, title, wordCountRaw] = generatedText.split('\n\n');

    const keyPoints = keyPointsRaw.split('\n').map(point => point.replace(/^- /, ''));
    const wordCount = parseInt(wordCountRaw.replace('Word count: ', ''), 10);

    // Prepare the response
    const content = {
      fullText: textContent,
      summary: summary.replace('Summary: ', ''),
      keyPoints,
      title: title.replace('Title: ', ''),
      wordCount,
    };

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error in summarize API:', error);
    return NextResponse.json(
      { error: 'Failed to summarize content' },
      { status: 500 }
    );
  }
}
