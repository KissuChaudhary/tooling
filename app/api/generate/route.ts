import { NextResponse } from 'next/server'
import { fal } from "@fal-ai/client"
import OpenAI from 'openai'
import { cookies } from 'next/headers'

fal.config({
  credentials: process.env.FAL_KEY
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
      return NextResponse.json({ error: "You've reached your image generation limit for today. Please try again tomorrow!" }, { status: 429 })
    }

    const body = await req.json()

    // Check if the prompt contains inappropriate content
    const isInappropriate = await moderateContent(body.prompt)

    if (isInappropriate) {
      return NextResponse.json({ error: 'The provided prompt contains inappropriate content and cannot be processed.' }, { status: 400 })
    }

    const result = await fal.subscribe("fal-ai/flux/schnell", {
      input: {
        prompt: body.prompt,
        image_size: {
          width: body.image_size.width,
          height: body.image_size.height
        },
        num_inference_steps: body.num_inference_steps,
        seed: body.seed,
        num_images: body.num_images,
        enable_safety_checker: body.enable_safety_checker
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          console.log(update.logs.map((log) => log.message))
        }
      },
    })

    // Increment usage count
    cookieStore.set('image_generator_usage', (usageCount + 1).toString(), {
      expires: new Date(new Date().setHours(24, 0, 0, 0)), // Set to expire at midnight
      path: '/',
    })

    return NextResponse.json(result.data)
  } catch (error) {
    console.error('Error generating image:', error)
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 })
  }
}
