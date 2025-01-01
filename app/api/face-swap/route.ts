import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import sharp from 'sharp';

const MAX_USES_PER_DAY = 3
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000

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

async function resizeImageIfNeeded(base64Image: string, maxSizeInMB: number): Promise<string> {
  const buffer = Buffer.from(base64Image, 'base64');
  const imageSizeInMB = buffer.length / (1024 * 1024);

  if (imageSizeInMB <= maxSizeInMB) {
    return base64Image;
  }

  const resizedImage = await sharp(buffer)
    .resize(1024, 1024, { fit: 'inside' })
    .toBuffer();

  return resizedImage.toString('base64');
}

const axiosInstance = axios.create({
  timeout: 30000, // 30 seconds timeout
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { faceImage, targetImage } = body;

    if (!faceImage || !targetImage) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const apiKey = process.env.SEGMIND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ 
        error: "Congrats! You've officially hit your limit for today. Let others also use this free service. Try again tomorrow, if you can wait that long!",
        isRateLimitExceeded: true
      }, { status: 429 });
    }

    const url = "https://api.segmind.com/v1/faceswap-v3";

    // Resize images if they're too large
    const resizedFaceImage = await resizeImageIfNeeded(faceImage.split(',')[1], 1);
    const resizedTargetImage = await resizeImageIfNeeded(targetImage.split(',')[1], 1);

    try {
      const response = await axiosInstance.post(url, {
        source_img: resizedFaceImage,
        target_img: resizedTargetImage,
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
      }, { 
        headers: { 
          'x-api-key': apiKey,
          'Content-Type': 'application/json'
        } 
      });

      const rateData = rateLimitStore.get(ip) || { count: 0 };
      return NextResponse.json({ 
        result: response.data,
        remainingGenerations: MAX_USES_PER_DAY - rateData.count
      });
    } catch (error: any) {
      console.error('Segmind API Error:', error.response?.data || error.message);
      if (error.code === 'ECONNABORTED') {
        return NextResponse.json({ error: 'Request timed out. Please try again.' }, { status: 504 });
      }
      if (error.response?.status === 413) {
        return NextResponse.json({ error: 'Image size too large. Please use a smaller image.' }, { status: 413 });
      }
      return NextResponse.json({ 
        error: error.response?.data?.error || 'Face swap service error. Please try again.' 
      }, { status: error.response?.status || 500 });
    }
  } catch (error) {
    console.error('Request parsing error:', error);
    return NextResponse.json({ 
      error: 'Invalid request format. Please ensure the request is properly formatted.' 
    }, { status: 400 });
  }
}

