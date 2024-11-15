import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { z } from 'zod'
import DOMPurify from 'isomorphic-dompurify'
import { applyRateLimit } from '../middleware/rateLimiter'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const inputSchema = z.object({
  text: z.string().min(1).max(1000),
  level: z.number().min(0).max(100).default(50),
  spellingVariations: z.boolean().default(false),
  contextualAwareness: z.boolean().default(false),
  readabilityLevel: z.enum(['simple', 'medium', 'complex']).default('medium'),
  phraseRandomization: z.boolean().default(false),
  variation: z.boolean().default(false),
})

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = await applyRateLimit(request)
    if (rateLimitResult) return rateLimitResult

    const body = await request.json()
    const { text, level, spellingVariations, contextualAwareness, readabilityLevel, phraseRandomization, variation } = inputSchema.parse(body)
    
    // Sanitize input
    const sanitizedText = DOMPurify.sanitize(text)

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `
      As an expert in natural language and human communication, your task is to transform the following AI-generated text into a more natural, human-like style. Follow these detailed guidelines:

      1. Adjust the level of humanization based on this percentage: ${level}%. At 0%, make minimal changes. At 100%, apply all humanization techniques aggressively.
      2. Use contractions liberally (e.g., "it's" instead of "it is", "we're" instead of "we are").
      3. Incorporate casual language and colloquialisms where appropriate.
      4. Add filler words and phrases occasionally (e.g., "you know", "like", "actually", "to be honest").
      5. Vary sentence structure and length. Mix short, punchy sentences with longer, more complex ones.
      6. Include some mild self-corrections or hesitations (e.g., "Well, actually...", "No, wait, what I mean is...").
      7. Use more personal pronouns and active voice (e.g., "We think" instead of "It is thought").
      8. Incorporate idiomatic expressions and metaphors where they fit naturally.
      9. Add some mild emphasis words (e.g., "really", "absolutely", "totally").
      10. Use more emotive language to convey feelings and opinions.
      11. Maintain the original meaning and key information while making the tone more conversational.
      12. Avoid overly formal or technical language unless it's absolutely necessary.
      13. Do not lengthen the content provided unnecessarily.
      ${spellingVariations ? '14. Introduce occasional, minor spelling or grammar mistakes that a human might make.' : ''}
      ${contextualAwareness ? '15. Analyze the context of the input text and ensure the humanized version maintains appropriate context and relevance.' : ''}
      16. Adjust the readability level to ${readabilityLevel}. For 'simple', use shorter sentences and simpler vocabulary. For 'complex', use more sophisticated language and sentence structures.
      ${phraseRandomization ? '17. Randomly insert common phrases and idioms where appropriate to add more human-like variety to the text.' : ''}
      ${variation ? '18. Generate a unique variation of the humanized text, different from previous versions.' : ''}

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
