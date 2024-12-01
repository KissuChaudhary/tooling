import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const MAX_USES_PER_DAY = 3
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

// In-memory store for rate limiting (this will reset on server restart)
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

export async function POST(req: NextRequest) {
  const { faceImage, targetImage } = await req.json()

  if (!faceImage || !targetImage) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  const apiKey = process.env.SEGMIND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  // Check rate limit
  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ 
      error: "Congrats! You've officially hit your limit for today. Let others also use this free service. Try again tomorrow, if you can wait that long!",
      isRateLimitExceeded: true
    }, { status: 429 })
  }

  const url = "https://api.segmind.com/v1/faceswap-v3"

  const data = {
    source_img: faceImage.split(',')[1],
    target_img: targetImage.split(',')[1],
    input_faces_index: 0,
    source_faces_index: 0,
    face_restore: "codeformer-v0.1.0.pth",
    interpolation: "Bilinear",
    detection_face_order: "large-small",
    facedetection: "retinaface_resnet50",
    detect_gender_input: "no",
    detect_gender_source: "no",
    face_restore_weight: 0.75,
    image_format: "jpeg",
    image_quality: 95,
    base64: true
  }

  try {
    const response = await axios.post(url, data, { 
      headers: { 
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      } 
    })
    const rateData = rateLimitStore.get(ip) || { count: 0 }
    return NextResponse.json({ 
      result: response.data,
      remainingGenerations: MAX_USES_PER_DAY - rateData.count
    })
  } catch (error: unknown) {
    console.error('Error:', error)
    if (error instanceof Error) {
      const axiosError = error as any
      const errorMessage = axiosError.response?.data?.error || axiosError.message || 'An unknown error occurred'
      return NextResponse.json({ error: errorMessage }, { status: 500 })
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 })
  }
}
