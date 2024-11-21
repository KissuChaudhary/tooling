import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { z } from 'zod';

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

const RequestSchema = z.object({
  imageUrl: z.string().url(),
});

export async function POST(request: NextRequest) {
  // Input validation
  let body;
  try {
    body = await request.json();
    RequestSchema.parse(body);
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { imageUrl } = body;

  try {
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      throw new Error('Gemini API key is not set');
    }

    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision", safetySettings });

    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error('Failed to fetch image');
    }
    const imageData = await imageResponse.arrayBuffer();
    const imageParts = [
      {
        inlineData: {
          data: Buffer.from(imageData).toString('base64'),
          mimeType: imageResponse.headers.get('content-type') || 'image/jpeg',
        },
      },
    ];

    const result = await model.generateContent([
      "Describe this image in detail, focusing on the main elements, colors, and overall composition. Provide a concise caption that captures the essence of the image.",
      ...imageParts,
    ]);

    const response = await result.response;
    const caption = response.text().trim();

    if (!caption) {
      throw new Error('Empty response from Gemini');
    }

    return NextResponse.json({ caption });
  } catch (error) {
    console.error('Error details:', error);
    const userErrorMessage = "An error occurred while generating the image caption. Please try again.";
    return NextResponse.json({ error: userErrorMessage }, { status: 500 });
  }
}
