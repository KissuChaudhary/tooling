import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { z } from 'zod'
import DOMPurify from 'isomorphic-dompurify'
import { applyRateLimit } from '../middleware/rateLimiter'
import { HarmBlockThreshold, HarmCategory } from '@google/generative-ai'


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];
const inputSchema = z.object({
  text: z.string().min(1).max(1000),
})


export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = await applyRateLimit(request)
    if (rateLimitResult) return rateLimitResult

    const body = await request.json()
    const { text } = inputSchema.parse(body)
    
    // Sanitize input
    const sanitizedText = DOMPurify.sanitize(text)

    const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings: safetySettings })

    const prompt = `
      As an expert in natural language and human communication, your task is to transform the following AI-generated text into a more natural, human-like style. Follow these detailed guidelines: Create content strictly adhering to an NLP-friendly format, emphasizing clarity and simplicity in structure and language. Ensure sentences follow a straightforward subject-verb-object order, selecting words for their precision and avoiding any ambiguity. Exclude filler content, focusing on delivering information succinctly. Do not use complex or abstract terms such as 'meticulous,' 'navigating,' 'complexities,' 'realm,' 'bespoke,' 'tailored,' 'towards,' 'underpins,' 'ever-changing,' 'ever-evolving,' 'the world of,' 'not only,' 'seeking more than just,' 'designed to enhance,' 'it’s not merely,' 'our suite,' 'it is advisable,' 'daunting,' 'in the heart of,' 'when it comes to,' 'in the realm of,' 'amongst,' 'unlock the secrets,' 'unveil the secrets,' 'it's not just a,' 'in today's digital world,' 'let's dive in,' 'here comes xxxxxxxx,' and 'robust.' This approach aims to streamline content production for enhanced NLP algorithm comprehension, ensuring the output is direct, accessible, and easily interpretable.

      1. Use contractions liberally (e.g., "it's" instead of "it is", "we're" instead of "we are").
      2. Incorporate casual language and colloquialisms where appropriate.
      3. Add filler words and phrases occasionally (e.g., "you know", "like", "actually", "to be honest").
      4. Vary sentence structure and length. Mix short, punchy sentences with longer, more complex ones.
      5. Include some mild self-corrections or hesitations (e.g., "Well, actually...", "No, wait, what I mean is...").
      6. Use more personal pronouns and active voice (e.g., "We think" instead of "It is thought").
      7. Incorporate idiomatic expressions and metaphors where they fit naturally.
      9. Add some mild emphasis words (e.g., "really", "absolutely", "totally").
      10. Use more emotive language to convey feelings and opinions.
      11. Maintain the original meaning and key information while making the tone more conversational.
      12. Avoid overly formal or technical language unless it's absolutely necessary.
      13. and most importantly, do not lengthen the content provided unncecessary.

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
