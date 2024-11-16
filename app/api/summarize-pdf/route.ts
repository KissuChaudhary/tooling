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

async function generateContentWithRetry(model: any, prompt: string, fileContent: string, maxRetries = 3, initialDelay = 1000) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await model.generateContent([
        { text: prompt },
        {
          inlineData: {
            mimeType: "application/pdf",
            data: fileContent
          }
        }
      ]);
      return result;
    } catch (error: any) {
      console.error(`Attempt ${attempt + 1} failed:`, error);
      if (error.status === 503 && attempt < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, attempt);
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error('Max retries reached');
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

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Analyze the contents of this PDF document and provide a structured response in the following JSON format:
      {
        "summary": "A concise summary of the document in approximately ${summaryLength} words.",
        "keyHighlights": [
          "Key highlight 1",
          "Key highlight 2",
          "Key highlight 3",
          "Key highlight 4",
          "Key highlight 5"
        ]
      }
      Ensure that the response is valid JSON and can be parsed directly. Do not include any markdown formatting or code block indicators.
    `;

    const result = await generateContentWithRetry(model, prompt, fileContent);
    const response = await result.response;
    let generatedText = response.text();

    // Remove any markdown formatting or code block indicators
    generatedText = generatedText.replace(/```json\s*/, '').replace(/```\s*$/, '').trim();

    // Parse the JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(generatedText);
    } catch (error) {
      console.error('Error parsing AI response:', error);
      console.error('Generated text:', generatedText);
      return NextResponse.json({ error: 'Invalid response from AI model' }, { status: 500 });
    }

    // Validate the parsed response
    if (!parsedResponse.summary || !Array.isArray(parsedResponse.keyHighlights)) {
      console.error('Unexpected response format:', parsedResponse);
      return NextResponse.json({ error: 'Unexpected response format from AI model' }, { status: 500 });
    }

    // Sanitize output (remove any potential HTML or script tags)
    const sanitizeOutput = (text: string) => {
      return text ? text.replace(/<\/?[^>]+(>|$)/g, "") : "";
    };

    return NextResponse.json({
      summary: sanitizeOutput(parsedResponse.summary),
      keyHighlights: parsedResponse.keyHighlights.map(sanitizeOutput)
    });
  } catch (error: any) {
    console.error('Error in API route:', error);
    if (error.status === 503) {
      return NextResponse.json({ error: 'The AI service is currently overloaded. Please try again later.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'An error occurred while processing the PDF.' }, { status: 500 });
  }
}
