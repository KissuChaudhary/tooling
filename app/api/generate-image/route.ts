import { NextResponse } from 'next/server'
import Replicate from 'replicate'
import OpenAI from 'openai'
import { cookies } from 'next/headers'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const MAX_USES_PER_DAY = 3

async function moderateContent(prompt: string) {
  const moderation = await openai.moderations.create({ input: prompt })
  return moderation.results[0].flagged
}

export async function POST(req: Request) {
  try {
    // Check user limit
    const cookieStore = cookies()
    const usageCount = parseInt(cookieStore.get('image_generator_usage')?.value || '0')
    
    if (usageCount >= MAX_USES_PER_DAY) {
      return NextResponse.json({ error: "Congrats! You've officially hit your limit for today. Let others also use this free service. Try again tomorrow, if you can wait that long!" }, { status: 429 })
    }

    const body = await req.json()

    // Check if the prompt contains inappropriate content
    const isInappropriate = await moderateContent(body.prompt)

    if (isInappropriate) {
      return NextResponse.json({ error: 'The provided prompt contains inappropriate content and cannot be processed.' }, { status: 400 })
    }

    const prediction = await replicate.predictions.create({
      version: "88312dcb9eaa543d7f8721e092053e8bb901a45a5d3c63c84e0a5aa7c247df33",
      input: {
        prompt: body.prompt,
        negative_prompt: body.negative_prompt || "",
        width: body.width,
        height: body.height,
        num_inference_steps: 18,
        guidance_scale: 5,
        pag_guidance_scale: 2,
        seed: body.seed,
      }
    })

    // Increment usage count
    cookieStore.set('image_generator_usage', (usageCount + 1).toString(), {
      expires: new Date(new Date().setHours(24, 0, 0, 0)), // Set to expire at midnight
      path: '/',
    })

    return NextResponse.json({ predictionId: prediction.id })
  } catch (error) {
    console.error('Error generating image:', error)
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const predictionId = searchParams.get('id')

  if (!predictionId) {
    return NextResponse.json({ error: 'No prediction ID provided' }, { status: 400 })
  }

  try {
    const prediction = await replicate.predictions.get(predictionId)
    
    if (prediction.status === 'succeeded') {
      return NextResponse.json({ output: prediction.output })
    } else if (prediction.status === 'failed') {
      return NextResponse.json({ error: 'Image generation failed' }, { status: 500 })
    } else {
      return NextResponse.json({ status: prediction.status })
    }
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to get prediction status' }, { status: 500 })
  }
}
