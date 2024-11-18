import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { z } from 'zod';
import { LRUCache } from 'lru-cache';

// Rate limiting setup
const rateLimit = new LRUCache<string, number>({
  max: 5000,
  ttl: 1200,
});

const getIP = (request: NextRequest) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]
    || request.headers.get('x-real-ip')
    || request.headers.get('cf-connecting-ip')
    || '0.0.0.0';
  return isValidIP(ip) ? ip : '0.0.0.0';
};

const isValidIP = (ip: string): boolean => {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
};

const rateLimiter = (ip: string) => {
  const tokenCount = rateLimit.get(ip) || 0;
  if (tokenCount > 5) return false;
  rateLimit.set(ip, tokenCount + 1);
  return true;
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

// Zod schemas for request validation
const RiddleSolverRequestSchema = z.object({
  riddle: z.string(),
});

const RiddleGeneratorRequestSchema = z.object({
  topic: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
});

const RequestSchema = z.object({
  tool: z.enum(['aiRiddleSolver', 'aiRiddleGenerator']),
  model: z.enum(['gpt4o', 'gemini']).default('gemini'),
  data: z.union([RiddleSolverRequestSchema, RiddleGeneratorRequestSchema]),
});

// Content moderation function
async function moderateContent(content: string) {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  if (!openaiApiKey) {
    throw new Error('OpenAI API key is not set');
  }

  const response = await fetch('https://api.openai.com/v1/moderations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`
    },
    body: JSON.stringify({ input: content })
  });

  if (!response.ok) {
    throw new Error('Failed to check content moderation');
  }

  const result = await response.json();
  return result.results[0];
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = getIP(request);
  if (!rateLimiter(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  // Input validation
  let body;
  try {
    body = await request.json();
    RequestSchema.parse(body);
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { tool, model, data } = body;

  // Combine all user inputs into a single string for moderation
  const userInput = tool === 'aiRiddleSolver' ? data.riddle : `${data.topic || ''} ${data.difficulty || ''}`;

  // Check content moderation
  try {
    const moderationResult = await moderateContent(userInput);
    if (moderationResult.flagged) {
      return NextResponse.json({ error: "Content flagged for abusive or explicit material. Please revise to meet our guidelines." }, { status: 400 });
    }
  } catch (error) {
    console.error('Moderation API error:', error);
    return NextResponse.json({ error: "Failed to moderate content" }, { status: 500 });
  }

  const messages = tool === 'aiRiddleSolver' 
    ? createRiddleSolverMessages(data as z.infer<typeof RiddleSolverRequestSchema>)
    : createRiddleGeneratorMessages(data as z.infer<typeof RiddleGeneratorRequestSchema>);

  try {
    let content;
    switch (model) {
      case 'gpt4o':
        content = await handleOpenAIRequest(messages);
        break;
      case 'gemini':
        content = await handleGeminiRequest(messages);
        break;
      default:
        throw new Error(`Unsupported model: ${model}`);
    }

    // Moderate the generated content
    try {
      const generatedContentModerationResult = await moderateContent(content);
      if (generatedContentModerationResult.flagged) {
        return NextResponse.json({ error: "Generated content flagged for abusive or explicit material. Please try again or rephrase your request." }, { status: 400 });
      }
    } catch (error) {
      console.error('Generated content moderation API error:', error);
      return NextResponse.json({ error: "Failed to moderate generated content" }, { status: 500 });
    }

    return NextResponse.json({ 
      [tool === 'aiRiddleSolver' ? 'solution' : 'riddle']: content,
      model: model
    });
  } catch (error) {
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      tool,
      model
    });
    
    const userErrorMessage = `An error occurred while ${tool === 'aiRiddleSolver' ? 'solving the riddle' : 'generating a riddle'} using the ${model} model. Please try again or switch to a different model.`;
    
    return NextResponse.json({ 
      error: userErrorMessage 
    }, { 
      status: 500 
    });
  }
}

async function handleOpenAIRequest(messages: any[]) {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  if (!openaiApiKey) {
    throw new Error('OpenAI API key is not set');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: messages,
      max_tokens: 2000
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
    console.error('OpenAI API error:', errorData);
    throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
  }

  const responseData = await response.json();
  return responseData.choices[0].message.content.trim();
}

async function handleGeminiRequest(messages: any[]) {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    throw new Error('Gemini API key is not set');
  }

  const genAI = new GoogleGenerativeAI(geminiApiKey);
  const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings: safetySettings });

  const prompt = messages[1].content;
  console.log('Sending prompt to Gemini:', prompt);
  
  const result = await geminiModel.generateContent(prompt);
  if (!result) {
    throw new Error('No response from Gemini');
  }
  
  const response = await result.response;
  const content = response.text().trim();

  if (!content) {
    throw new Error('Empty response from Gemini');
  }
  
  console.log('Received response from Gemini:', content);
  return content;
}

function createRiddleSolverMessages(data: z.infer<typeof RiddleSolverRequestSchema>) {
  const { riddle } = data;
  return [
    { role: "system", content: "You are an expert riddle solver, capable of analyzing and solving complex riddles." },
    { role: "user", content: `Solve the following riddle and explain your reasoning:
      "${riddle}"
      Provide a clear solution and explain how you arrived at it.` }
  ];
}

function createRiddleGeneratorMessages(data: z.infer<typeof RiddleGeneratorRequestSchema>) {
  const { topic, difficulty } = data;
  return [
    { role: "system", content: "You are an expert riddle creator, capable of generating engaging and clever riddles." },
    { role: "user", content: `Generate a ${difficulty || 'medium'} difficulty riddle${topic ? ` about ${topic}` : ''}.
      The riddle should be clever, engaging, and appropriate for all ages.
      Provide the riddle followed by its solution.` }
  ];
}
