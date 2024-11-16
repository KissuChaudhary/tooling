import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Simple in-memory store for rate limiting
const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const requestLog: { [ip: string]: number[] } = {};

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_SIZE;

  if (!requestLog[ip]) {
    requestLog[ip] = [now];
    return false;
  }

  // Remove old requests
  requestLog[ip] = requestLog[ip].filter(timestamp => timestamp > windowStart);

  if (requestLog[ip].length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  requestLog[ip].push(now);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    // Check for valid content type
    const contentType = req.headers.get('content-type');
    if (contentType !== 'application/json') {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 415 });
    }

    const { fileContent, summaryLength } = await req.json();

    // Validate input
    if (!fileContent || typeof fileContent !== 'string') {
      return NextResponse.json({ error: 'Invalid file content' }, { status: 400 });
    }
    if (!summaryLength || typeof summaryLength !== 'number' || summaryLength < 50 || summaryLength > 500) {
      return NextResponse.json({ error: 'Invalid summary length' }, { status: 400 });
    }

    // Validate file size (assuming base64 encoded content)
    const fileSizeInBytes = Buffer.from(fileContent, 'base64').length;
    const maxFileSizeInBytes = 10 * 1024 * 1024; // 10MB
    if (fileSizeInBytes > maxFileSizeInBytes) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 413 });
    }

    // Validate file type (check for PDF magic number)
    if (!fileContent.startsWith('JVBERi0')) {
      return NextResponse.json({ error: 'Invalid file type. Only PDF files are allowed' }, { status: 415 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const summaryPrompt = `Please summarize the contents of this PDF document in approximately ${summaryLength} words.`;
    const keyHighlightsPrompt = "Please provide a list of the 5-7 most important key highlights from this PDF document.";

    const result = await model.generateContent([
      {
        text: `${summaryPrompt}\n\n${keyHighlightsPrompt}`
      },
      {
        inlineData: {
          mimeType: "application/pdf",
          data: fileContent
        }
      }
    ]);

    const response = await result.response;
    const fullText = response.text();

    // Split the response into summary and key highlights
    const [summary, keyHighlights] = fullText.split('\n\nKey Highlights:').map(text => text.trim());

    // Sanitize output (remove any potential HTML or script tags)
    const sanitizeOutput = (text: string) => {
      return text ? text.replace(/<\/?[^>]+(>|$)/g, "") : "";
    };

    return NextResponse.json({
      summary: sanitizeOutput(summary),
      keyHighlights: sanitizeOutput(keyHighlights)
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'An error occurred while processing the PDF.' }, { status: 500 });
  }
}
