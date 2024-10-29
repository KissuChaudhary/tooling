import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import OpenAI from 'openai';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    const { url, text } = await request.json();

    if (!url && !text) {
      return NextResponse.json(
        { error: 'Either URL or text is required' },
        { status: 400 }
      );
    }

    let content = '';

    if (url) {
      // Fetch and parse content from URL
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

      // Limit content to 4000 characters for URL input
      content = content.slice(0, 4000);
    } else {
      // Use the provided text (already limited to 1500 words in frontend)
      content = text;
    }

    // Get AI summary, key points, and best lines
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert content analyzer. Provide a concise summary, extract key points, and identify the best lines from the given text. Format the response as JSON with 'summary', 'keyPoints', and 'bestLines' fields."
        },
        {
          role: "user",
          content: `Please analyze this text and provide a summary, key points, and best lines: ${content}`
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
      summary: aiResult.summary,
      keyPoints: aiResult.keyPoints,
      bestLines: aiResult.bestLines,
      wordCount: content.split(/\s+/).length
    });

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    );
  }
}
