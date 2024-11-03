import { ReplicateStream, StreamingTextResponse } from 'ai'
import Replicate from 'replicate'

export const runtime = 'edge'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
})

export async function POST(req: Request) {
  const { messages, imageUrl } = await req.json()
  const lastMessage = messages[messages.length - 1]

  if (!imageUrl) {
    return new Response('Image URL is required', { status: 400 })
  }

  try {
    const response = await replicate.predictions.create({
      version: "80537f9eead1a5bfa72d5ac6ea6414379be41d4d4f6679fd776e9535d1eb58bb",
      input: {
        image: imageUrl,
        prompt: lastMessage.content,
        max_tokens: 1024,
      },
      stream: true,
    })

    const stream = await ReplicateStream(response)
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error('Error:', error)
    return new Response('Error processing request', { status: 500 })
  }
}
