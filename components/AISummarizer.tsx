import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { input, inputType, summaryLength } = await request.json();

    if (!input) {
      return NextResponse.json(
        { error: 'Input is required' },
        { status: 400 }
      );
    }

    let content = '';

    // Handle URL input
    if (inputType === 'url') {
      try {
        const response = await fetch(input);
        if (!response.ok) {
          throw new Error(`Failed to fetch URL: ${response.statusText}`);
        }
        const html = await response.text();
        const $ = cheerio.load(html);

        // Remove unwanted elements
        $('script, style, nav, footer, header, aside').remove();
        $('.advertisement, #comments').remove();

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

        // Limit content length for URL input
        content = content.substring(0, 4000);
      } catch (error) {
        return NextResponse.json(
          { error: 'Failed to fetch or parse URL content' },
          { status: 400 }
        );
      }
    } else {
      // Handle direct text input
      content = input.substring(0, 10000); // Limit text input to 10000 characters
    }

    // Calculate tokens based on summary length (0-100)
    const maxTokens = Math.floor(((summaryLength || 50) / 100) * 500 + 100);

    try {
      const aiResponse = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an expert content analyzer. Analyze the given text and provide three things:
            1. A concise summary (adjust length based on summaryLength parameter: ${summaryLength}/100)
            2. Key bullet points (3-5 points)
            3. The most impactful or important line from the text.
            Format your response as valid JSON with exactly these fields: "summary", "keyPoints" (array), and "bestLines" (array).`
          },
          {
            role: "user",
            content: content
          }
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
        response_format: { type: "json_object" }
      });

      // Validate AI response
      const aiContent = aiResponse.choices[0].message?.content;
      if (!aiContent) {
        throw new Error('Empty response from AI');
      }

      // Parse and validate JSON response
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(aiContent);
        if (!parsedResponse.summary || !Array.isArray(parsedResponse.keyPoints) || !Array.isArray(parsedResponse.bestLines)) {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        throw new Error('Failed to parse AI response');
      }

      // Return the formatted response
      return NextResponse.json({
        summary: parsedResponse.summary,
        keyPoints: parsedResponse.keyPoints,
        bestLines: parsedResponse.bestLines,
        wordCount: content.split(/\s+/).filter(word => word.length > 0).length
      });

    } catch (error) {
      console.error('AI Processing Error:', error);
      return NextResponse.json(
        { error: 'Failed to generate summary' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Request Processing Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
