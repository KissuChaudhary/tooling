

// app/api/summarize/route.ts
import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

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

    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    );
  }
}
