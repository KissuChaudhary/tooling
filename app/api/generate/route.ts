import { NextResponse } from 'next/server'
import { fal } from "@fal-ai/client"

fal.config({
  credentials: process.env.FAL_KEY
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
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