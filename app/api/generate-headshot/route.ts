import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const MAX_USES_PER_DAY = 3
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

// Use a more persistent storage solution in production
const rateLimitStore = new Map<string, { count: number; timestamp: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const rateData = rateLimitStore.get(ip) || { count: 0, timestamp: 0 }

  if (now - rateData.timestamp > RATE_LIMIT_WINDOW) {
    rateData.count = 0
    rateData.timestamp = now
  }

  if (rateData.count >= MAX_USES_PER_DAY) {
    return false
  }

  rateData.count++
  rateLimitStore.set(ip, rateData)
  return true
}

async function imageUrlToBase64(imageUrl: string): Promise<string> {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'binary').toString('base64');
}

export async function POST(req: NextRequest) {
  const { prompt, mainFaceImage, negativePrompt, seed } = await req.json()

  if (!prompt || !mainFaceImage) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  const apiKey = process.env.SEGMIND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ 
      error: "You've reached the daily limit. Please try again tomorrow.",
      isRateLimitExceeded: true
    }, { status: 429 })
  }

  const url = "https://api.segmind.com/v1/flux-pulid"

  let mainFaceImageBase64: string;
  if (mainFaceImage.startsWith('data:image')) {
    // If it's already a base64 string, use it directly
    mainFaceImageBase64 = mainFaceImage.split(',')[1];
  } else {
    // If it's a URL, fetch and convert to base64
    try {
      mainFaceImageBase64 = await imageUrlToBase64(mainFaceImage);
    } catch (error) {
      console.error('Error fetching image:', error);
      return NextResponse.json({ error: 'Failed to fetch image from URL' }, { status: 400 });
    }
  }

  const data = {
    seed: seed || Math.floor(Math.random() * 1000000),
    width: 896,
    height: 1152,
    prompt,
    main_face_image: mainFaceImageBase64,
    true_cfg: 1,
    id_weight: 1.05,
    num_steps: 20,
    start_step: 0,
    num_outputs: 1,
    output_format: "webp",
    guidance_scale: 4,
    output_quality: 80,
    negative_prompt: negativePrompt || "bad quality, worst quality, text, signature, watermark, extra limbs, low resolution, partially rendered objects, deformed or partially rendered eyes, deformed, deformed eyeballs, cross-eyed, blurry",
    max_sequence_length: 128
  }

  try {
    const response = await axios.post(url, data, { 
      headers: { 
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      },
      responseType: 'arraybuffer'
    })
    
    const base64Image = Buffer.from(response.data, 'binary').toString('base64')
    const rateData = rateLimitStore.get(ip) || { count: 0 }
    
    return NextResponse.json({ 
      result: `data:image/webp;base64,${base64Image}`,
      remainingGenerations: MAX_USES_PER_DAY - rateData.count
    })
  } catch (error) {
    console.error('Error:', error)
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.toString() || error.message
      : 'An unknown error occurred'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

