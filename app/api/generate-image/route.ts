import { NextResponse } from 'next/server'

const apiHost = process.env.API_HOST ?? 'https://api.stability.ai'
const apiKey = process.env.STABILITY_API_KEY

if (!apiKey) throw new Error('Missing Stability API key.')

export async function POST(req: Request) {
  const { prompt, width, height, style, seed } = await req.json()

  try {
    const response = await fetch(
      `${apiHost}/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
            },
          ],
          cfg_scale: 7,
          height,
          width,
          steps: 30,
          samples: 1,
          style_preset: style !== 'none' ? style : undefined,
          seed: seed !== 0 ? seed : undefined,
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`)
    }

    const responseJSON = await response.json()
    const imageBase64 = responseJSON.artifacts[0].base64

    return NextResponse.json({ imageUrl: `data:image/png;base64,${imageBase64}` })
  } catch (error) {
    console.error('Error generating image:', error)
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 })
  }
}
