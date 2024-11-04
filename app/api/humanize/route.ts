// app/api/humanize/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `As an expert in natural language and human communication, your task is to transform the following AI-generated text into a more natural, human-like style. Follow these detailed guidelines:

      1. Use contractions liberally (e.g., "it's" instead of "it is", "we're" instead of "we are").
      2. Incorporate casual language and colloquialisms where appropriate.
      3. Add filler words and phrases occasionally (e.g., "you know", "like", "actually", "to be honest").
      4. Vary sentence structure and length. Mix short, punchy sentences with longer, more complex ones.
      5. Include some mild self-corrections or hesitations (e.g., "Well, actually...", "No, wait, what I mean is...").
      6. Use more personal pronouns and active voice (e.g., "We think" instead of "It is thought").
      7. Add some conversational transitions (e.g., "Anyway", "So", "Now, here's the thing").
      8. Incorporate idiomatic expressions and metaphors where they fit naturally.
      9. Occasionally use rhetorical questions to engage the reader.
      10. Add some mild emphasis words (e.g., "really", "absolutely", "totally").
      11. Include some personal anecdotes or examples if appropriate to the context.
      12. Use more emotive language to convey feelings and opinions.
      13. Maintain the original meaning and key information while making the tone more conversational.
      14. Avoid overly formal or technical language unless it's absolutely necessary.
      15. Add some humor or light-heartedness if it fits the context.

      Here's the text to humanize:
      "${text}"

      Rewrite the text following these guidelines. Provide only the humanized version without any additional explanations or meta-commentary.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const humanizedText = response.text()

    return NextResponse.json({ humanizedText })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to humanize text' }, { status: 500 })
  }
}
