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
  formalityLevel: z.number().min(0).max(100).default(50),
})

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await applyRateLimit(request)
    if (rateLimitResult) return rateLimitResult

    const body = await request.json()
    const { 
      text, 
      level, 
      spellingVariations, 
      contextualAwareness, 
      readabilityLevel, 
      phraseRandomization, 
      variation,
      formalityLevel 
    } = inputSchema.parse(body)
    
    const sanitizedText = DOMPurify.sanitize(text)

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `
      As an expert in natural language and human communication, transform the following AI-generated text into a more natural, human-like style. Follow these guidelines:

      1. Adjust the level of humanization based on this percentage: ${level}%. At 0%, make minimal changes. At 100%, apply all humanization techniques.
      2. Set the formality level to ${formalityLevel}%. At 0%, use very formal language. At 100%, use casual, conversational language. Avoid extreme informality or slang unless the formality level is very high.
      3. Use contractions based on the formality level.
      4. Incorporate casual language and colloquialisms where appropriate, based on the formality level, never go too casual.
      5. Add filler words and phrases occasionally, but sparingly at lower formality levels.
      6. Vary sentence structure and length. Mix short sentences with longer, more complex ones.
      7. Include mild self-corrections or hesitations only at higher formality levels.
      8. Use personal pronouns and active voice more often at higher formality levels.
      9. Incorporate idiomatic expressions and metaphors where they fit naturally, do not overdo, be in limits.
      10. Add mild emphasis words.
      11. Use a little bit of emotive language to convey feelings and opinions, adjusted for formality.
      12. Maintain the original meaning and key information while adjusting the tone.
      13. Adjust the level of formal or technical language based on the formality level and readability setting.
      14. Do not lengthen the content unnecessarily.
      ${spellingVariations ? '15. Introduce occasional, minor spelling or grammar mistakes that a human might make, more frequently at higher formality levels.' : ''}
      ${contextualAwareness ? '16. Analyze the context of the input text and ensure the humanized version maintains appropriate context and relevance.' : ''}
      17. Adjust the readability level to ${readabilityLevel}. For 'simple', use shorter sentences and simpler vocabulary. For 'complex', use more sophisticated language and sentence structures.
      ${phraseRandomization ? '18. Randomly insert common phrases and idioms where appropriate to add more human-like variety to the text, adjusted for the formality level. do not create too much hype.' : ''}
      ${variation ? '19. Generate a unique variation of the humanized text, different from previous versions.' : ''}

      Here's the text to humanize:
      "${sanitizedText}"

      Rewrite the text following these guidelines. Provide only the humanized version without any additional explanations or meta-commentary.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const humanizedText = response.text()

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
