import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

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

    // Get AI summary and key points using Gemini 1.5 Flash
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analyze the following text and provide a concise summary and extract key points. Format the response as JSON with 'summary' and 'keyPoints' fields:

${content.substring(0, 4000)}`; // Limit content length

    const result = await model.generateContent(prompt);
    const aiContent = result.response.text();

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
