// app/api/summarize/route.ts
import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import OpenAI from 'openai';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Fetch and parse content
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove unwanted elements
    $('script, style, nav, footer, header, aside').remove();
    $('.advertisement, #comments').remove();

    // Try to find main content
    const contentSelectors = [
      'article',
      '[role="main"]',
      'main',
      '.main-content',
      '#main-content',
      '.post-content',
      '.article-content',
      '.content'
    ];

    let content = '';
    const title = $('title').text() || $('h1').first().text() || '';

    // Try each selector until we find content
    for (const selector of contentSelectors) {
      const element = $(selector);
      if (element.length > 0) {
        content = element.first().text().trim();
        break;
      }
    }

    // Fallback to body content if no main content found
    if (!content) {
      content = $('body').text().trim();
    }

    // Clean up the content
    content = content
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n')
      .replace(/[\t\r]/g, '')
      .trim();

   
// Get AI summary and key points
const aiResponse = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content: "You are an expert content analyzer. Provide a concise summary and extract key points from the given text. Format the response as JSON with 'summary' and 'keyPoints' fields."
    },
    {
      role: "user",
      content: `Please analyze this text and provide a summary and key points: ${content.substring(0, 4000)}` // Limit content length
    }
  ],
  response_format: { type: "json_object" }
});

const aiContent = aiResponse.choices[0].message?.content;

if (!aiContent) {
  throw new Error('AI response content is null or undefined.');
}

const aiResult = JSON.parse(aiContent);

return NextResponse.json({
  title,
  fullText: content,
  summary: aiResult.summary,
  keyPoints: aiResult.keyPoints,
  wordCount: content.split(/\s+/).length
});

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    );
  }
}
