import { NextResponse } from 'next/server'

export async function GET() {
  const subscriptionKey = process.env.AZURE_SPEECH_KEY
  const region = process.env.AZURE_SPEECH_REGION

  const url = `https://${region}.tts.speech.microsoft.com/cognitiveservices/voices/list`

  try {
    const response = await fetch(url, {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey!,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const voices = await response.json()
    return NextResponse.json({ voices })
  } catch (error) {
    console.error('Error fetching voices:', error)
    return NextResponse.json({ error: 'Failed to fetch voices' }, { status: 500 })
  }
}