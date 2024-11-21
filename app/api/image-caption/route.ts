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
  imageData: z.string().optional(),
  mimeType: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageData, mimeType, imageUrl } = RequestSchema.parse(body);

    if (!imageData && !imageUrl) {
      return NextResponse.json({ error: "Either imageData or imageUrl must be provided" }, { status: 400 });
    }

    let imageParts;

    if (imageUrl) {
      // Handle URL-based image
      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        throw new Error('Failed to fetch image from URL');
      }
      const imageBuffer = await imageResponse.arrayBuffer();
      const contentType = imageResponse.headers.get('content-type');
      if (!contentType || !ALLOWED_MIME_TYPES.includes(contentType)) {
        return NextResponse.json({ error: "Invalid file type from URL. Only JPEG, PNG, and WebP are allowed" }, { status: 400 });
      }
      imageParts = [
        {
          inlineData: {
            data: Buffer.from(imageBuffer).toString('base64'),
            mimeType: contentType,
          },
        },
      ];
    } else if (imageData && mimeType) {
      // Handle uploaded image
      if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
        return NextResponse.json({ error: "Invalid file type. Only JPEG, PNG, and WebP are allowed" }, { status: 400 });
      }

      // Validate file size
      const sizeInBytes = Buffer.from(imageData.split(',')[1], 'base64').length;
      if (sizeInBytes > MAX_FILE_SIZE) {
        return NextResponse.json({ error: "File size exceeds the 5MB limit" }, { status: 400 });
      }

      imageParts = [
        {
          inlineData: {
            data: imageData.split(',')[1],
            mimeType: mimeType,
          },
        },
      ];
    } else {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 });
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      throw new Error('Gemini API key is not set');
    }

    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision", safetySettings });

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
