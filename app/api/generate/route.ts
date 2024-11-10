import { NextResponse } from 'next/server'
import { fal } from "@fal-ai/client"
import OpenAI from 'openai'

fal.config({
  credentials: process.env.FAL_KEY
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

async function moderateContent(prompt: string) {
  const moderation = await openai.moderations.create({ input: prompt })
  return moderation.results[0].flagged
}

export async function POST(req: Request) {
  try {
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

    return NextResponse.json(result.data)
  } catch (error) {
    console.error('Error generating image:', error)
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 })
  }
}
