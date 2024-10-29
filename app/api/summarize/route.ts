import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    const { input, inputType, summaryLength } = await request.json();

    if (!input) {
      return NextResponse.json(
        { error: 'Input is required' },
        { status: 400 }
      );
    }

    let content = '';

    if (inputType === 'url') {
      const response = await fetch(input);
      const html = await response.text();
      const $ = cheerio.load(html);

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

      content = content.slice(0, 4000);
    } else {
      content = input;
    }

    const maxTokens = Math.floor(summaryLength * 2);  // Adjust this formula as needed

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert content analyzer. Provide a concise summary, extract key points, and identify the best lines from the given text. Adjust the length of the summary based on the provided summaryLength (0-100, where 0 is shortest and 100 is longest). Format the response as JSON with 'summary', 'keyPoints', and 'bestLines' fields.`
        },
        {
          role: "user",
          content: `Please analyze this text and provide a summary, key points, and best lines. The desired summary length is ${summaryLength}/100: ${content}`
        }
      ],
      max_tokens: maxTokens,
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
