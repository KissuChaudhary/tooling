import { NextRequest, NextResponse } from 'next/server'; import * as cheerio from 'cheerio'; import OpenAI from 'openai';

// Initialize OpenAI const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Helper to chunk text function chunkText(content: string, maxTokens: number): string[] { const tokens = content.split(/\s+/); // Basic tokenization by splitting on spaces let chunks: string[] = []; let currentChunk: string[] = [];

tokens.forEach(token => { currentChunk.push(token); if (currentChunk.join(' ').length > maxTokens) { chunks.push(currentChunk.join(' ')); currentChunk = []; } });

if (currentChunk.length) { chunks.push(currentChunk.join(' ')); }

return chunks; }

export async function POST(request: NextRequest) { try { const { url } = await request.json();

if (!url) {
  return NextResponse.json({ error: 'URL is required' }, { status: 400 });
}

// Fetch and parse content
const response = await fetch(url);
const html = await response.text();
const $ = cheerio.load(html);

// Remove unwanted elements
$('script, style, nav, footer, header, aside').remove();
$('.advertisement, #comments').remove();

const contentSelectors = [
  'article', '[role="main"]', 'main', '.main-content', '#main-content',
  '.post-content', '.article-content', '.content'
];

let content = '';
let title = $('title').text() || $('h1').first().text() || '';

for (const selector of contentSelectors) {
  const element = $(selector);
  if (element.length > 0) {
    content = element.first().text().trim();
    break;
  }
}

if (!content) {
  content = $('body').text().trim();
}

content = content
  .replace(/\s+/g, ' ')
  .replace(/\n\s*\n/g, '\n')
  .replace(/[\t\r]/g, '')
  .trim();

// Split content into chunks (limit of 1024 tokens per chunk)
const chunks = chunkText(content, 1000);

let summaries = [];
let keyPointsList = [];

// Process each chunk with AI
for (const chunk of chunks) {
  const aiResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are an expert content analyzer. Provide a concise summary and extract key points from the given text."
      },
      {
        role: "user",
        content: `Please analyze this text and provide a summary and key points: ${chunk}`
      }
    ]
  });

  const aiResult = JSON.parse(aiResponse.choices[0].message.content);
  summaries.push(aiResult.summary);
  keyPointsList.push(...aiResult.keyPoints);
}

// Combine summaries
const fullSummary = summaries.join(" ");

return NextResponse.json({
  title,
  fullText: content,
  summary: fullSummary,
  keyPoints: keyPointsList,
  wordCount: content.split(/\s+/).length
});
} catch (error) { return NextResponse.json( { error: error instanceof Error ? error.message : 'An error occurred' }, { status: 500 } ); } }
