// app/api/humanize/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { z } from 'zod'
import DOMPurify from 'isomorphic-dompurify'
import applyRateLimit from '../middleware/rateLimiter'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const inputSchema = z.object({
  text: z.string().min(1).max(1000),
})

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    await applyRateLimit(request, NextResponse)

    const body = await request.json()
    const { text } = inputSchema.parse(body)
    
    // Sanitize input
    const sanitizedText = DOMPurify.sanitize(text)

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `
      As an expert in natural language and human communication, your task is to transform the following AI-generated text into a more natural, human-like style. Follow these detailed guidelines:

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
      "${sanitizedText}"

      Rewrite the text following these guidelines. Provide only the humanized version without any additional explanations or meta-commentary.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const humanizedText = response.text()

    // Sanitize output
    const sanitizedOutput = DOMPurify.sanitize(humanizedText)

    return NextResponse.json({ humanizedText: sanitizedOutput })
  } catch (error) {
    console.error('Error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    if (error instanceof Error && error.message === 'Too many requests from this IP, please try again later.') {
      return NextResponse.json({ error: error.message }, { status: 429 })
    }
    return NextResponse.json({ error: 'Failed to humanize text' }, { status: 500 })
  }
}
