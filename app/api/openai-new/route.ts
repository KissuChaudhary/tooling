// app/api/tools/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { z } from 'zod';
import { Filter } from 'bad-words';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Supabase setup with typed client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const filter = new Filter();

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
];

// Rate limiting configuration
const RATE_LIMIT = 5; // Max 5 requests
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 20 minutes in milliseconds

// Zod schemas
const RiddleSolverRequestSchema = z.object({ riddle: z.string() });
const RiddleGeneratorRequestSchema = z.object({
  topic: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
});
const NameCombinerRequestSchema = z.object({
  numberOfPeople: z.string(),
  names: z.array(z.string()),
  numberOfNames: z.string(),
});
const UsernameGeneratorRequestSchema = z.object({
  interests: z.array(z.string()),
  style: z.enum(['fun', 'professional', 'creative', 'gaming']),
  numberOfUsernames: z.string(),
});
const WizardNameGeneratorRequestSchema = z.object({
  magicType: z.enum(['elemental', 'necromancy', 'illusion', 'enchantment', 'divination']),
  personality: z.string(),
  numberOfNames: z.string(),
});
const RequestSchema = z.object({
  tool: z.enum(['aiRiddleSolver', 'aiRiddleGenerator', 'aiNameCombiner', 'aiUsernameGenerator', 'aiWizardNameGenerator']),
  data: z.union([
    RiddleSolverRequestSchema,
    RiddleGeneratorRequestSchema,
    NameCombinerRequestSchema,
    UsernameGeneratorRequestSchema,
    WizardNameGeneratorRequestSchema,
  ]),
});

// Utility functions
const getFingerprint = (request: NextRequest) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '0.0.0.0';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  return `${ip}:${userAgent}`;
};

async function rateLimiter(userId: string, requestId: string): Promise<boolean> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - RATE_LIMIT_WINDOW);

  // Fetch the user's rate limit record
  const { data, error } = await supabase
    .from('rate_limits')
    .select('request_count, last_reset')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
    console.error(`[${requestId}] Rate limit check error:`, error);
    return false;
  }

  if (!data) {
    // No record exists, create one
    const { error: insertError } = await supabase.from('rate_limits').insert({
      user_id: userId,
      request_count: 1,
      last_reset: now.toISOString(),
    });
    if (insertError) {
      console.error(`[${requestId}] Failed to initialize rate limit:`, insertError);
      return false;
    }
    return true; // First request, allow it
  }

  const { request_count, last_reset } = data;
  const lastResetDate = new Date(last_reset);

  if (lastResetDate < windowStart) {
    // Reset the count if the window has expired
    const { error: resetError } = await supabase
      .from('rate_limits')
      .update({ request_count: 1, last_reset: now.toISOString() })
      .eq('user_id', userId);
    if (resetError) {
      console.error(`[${requestId}] Failed to reset rate limit:`, resetError);
      return false;
    }
    return true; // Reset happened, allow the request
  }

  if (request_count >= RATE_LIMIT) {
    console.log(`[${requestId}] Rate limit exceeded for user ${userId}`);
    return false;
  }

  // Increment the request count
  const { error: incrementError } = await supabase
    .from('rate_limits')
    .update({ request_count: request_count + 1 })
    .eq('user_id', userId);
  if (incrementError) {
    console.error(`[${requestId}] Failed to increment rate limit:`, incrementError);
    return false;
  }

  return true; // Request allowed
}

async function moderateContent(content: string, requestId: string) {
  console.log(`[${requestId}] Moderating content`);
  if (filter.isProfane(content)) {
    return { flagged: true, reason: 'Profanity detected' };
  }
  const sensitiveTerms = [
    'suicide', 'kill', 'murder', 'die', 'death', 'abuse', 'assault', 'attack', 'violent', 'weapon',
    'explicit', 'nude', 'naked', 'sex', 'porn', 'drug', 'cocaine', 'heroin', 'meth', 'terrorist', 'bomb', 'explosion',
    'child', 'pedophile', 'rape', 'molest',
  ];
  const regex = new RegExp(`\\b(${sensitiveTerms.join('|')}|ch[1i]ld|ab[vu]s[3e]|s[3e]x)\\b`, 'i');
  const lowercaseContent = content.toLowerCase();
  if (regex.test(lowercaseContent)) {
    const matchedTerm = lowercaseContent.match(regex)?.[0];
    return { flagged: true, reason: `Sensitive term detected: ${matchedTerm || 'unknown'}` };
  }
  return { flagged: false };
}

async function logRequest(requestId: string, fingerprint: string, userId: string, tool: string, moderation: any) {
  const logEntry = {
    request_id: requestId,
    fingerprint,
    user_id: userId,
    tool,
    moderation,
    created_at: new Date().toISOString(),
  };
  const { error } = await supabase.from('request_logs').insert([logEntry]);
  if (error) console.error(`[${requestId}] Failed to log request:`, error);
}

async function logFlaggedRequest(requestId: string, fingerprint: string, userId: string, tool: string, input: string, output: string | null, moderation: any) {
  const flaggedEntry = {
    request_id: requestId,
    fingerprint,
    user_id: userId,
    tool,
    input,
    output,
    moderation,
    created_at: new Date().toISOString(),
  };
  const { data: countData } = await supabase.from('flagged_logs').select('count', { count: 'exact' });
  if (countData && countData.length >= 100) {
    await supabase.from('flagged_logs').delete().order('created_at', { ascending: true }).limit(1);
  }
  const { error } = await supabase.from('flagged_logs').insert([flaggedEntry]);
  if (error) console.error(`[${requestId}] Failed to log flagged request:`, error);
}

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).slice(2);
  console.log(`[${requestId}] Processing request`);

  // Authentication check
  const authHeader = request.headers.get('authorization');
  const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader?.replace('Bearer ', '') || '');
  const userId = user?.id;
  const fingerprint = getFingerprint(request); // For logging only

  if (!userId) {
    await logRequest(requestId, fingerprint, 'unauthenticated', 'unknown', { flagged: true, reason: 'No authentication' });
    return NextResponse.json({ error: "Please sign in to use this tool.", loginRequired: true }, { status: 401 });
  }

  // Rate limiting
  if (!await rateLimiter(userId, requestId)) {
    await logRequest(requestId, fingerprint, userId, 'unknown', { flagged: true, reason: 'Rate limit exceeded' });
    return NextResponse.json({ error: "Rate limit exceeded. Try again later." }, { status: 429 });
  }

  // Input validation
  let body;
  try {
    body = await request.json();
    RequestSchema.parse(body);
  } catch (error) {
    console.error(`[${requestId}] Validation error:`, error);
    await logRequest(requestId, fingerprint, userId, 'unknown', { flagged: true, reason: 'Validation failed' });
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { tool, data } = body;

  // Combine user input for moderation
  const userInput = tool === 'aiRiddleSolver' ? data.riddle :
                   tool === 'aiRiddleGenerator' ? `${data.topic || ''} ${data.difficulty || ''}` :
                   tool === 'aiNameCombiner' ? data.names.join(' ') :
                   tool === 'aiUsernameGenerator' ? data.interests.join(' ') + ' ' + data.style :
                   `${data.magicType} ${data.personality}`;

  // Moderate input
  const moderationResult = await moderateContent(userInput, requestId);
  if (moderationResult.flagged) {
    await logRequest(requestId, fingerprint, userId, tool, moderationResult);
    await logFlaggedRequest(requestId, fingerprint, userId, tool, userInput, null, moderationResult);
    return NextResponse.json({ error: `Content flagged: ${moderationResult.reason}. Please revise your input.` }, { status: 400 });
  }

  const messages = tool === 'aiRiddleSolver' ? createRiddleSolverMessages(data) :
                  tool === 'aiRiddleGenerator' ? createRiddleGeneratorMessages(data) :
                  tool === 'aiNameCombiner' ? createNameCombinerMessages(data) :
                  tool === 'aiUsernameGenerator' ? createUsernameGeneratorMessages(data) :
                  createWizardNameGeneratorMessages(data);

  try {
    const content = await handleGeminiRequest(messages);

    // Moderate output
    const outputModeration = await moderateContent(content, requestId);
    if (outputModeration.flagged) {
      await logRequest(requestId, fingerprint, userId, tool, outputModeration);
      await logFlaggedRequest(requestId, fingerprint, userId, tool, userInput, content, outputModeration);
      return NextResponse.json({ error: "Generated content flagged for abusive material. Please try again." }, { status: 400 });
    }

    let response;
    switch (tool) {
      case 'aiRiddleSolver': response = { solution: content }; break;
      case 'aiRiddleGenerator': response = { riddle: content }; break;
      case 'aiNameCombiner': response = { combinedNames: content.split('\n').filter(Boolean) }; break;
      case 'aiUsernameGenerator': response = { usernames: content.split('\n').filter(Boolean) }; break;
      case 'aiWizardNameGenerator': response = { wizardNames: content.split('\n').filter(Boolean) }; break;
    }

    await logRequest(requestId, fingerprint, userId, tool, { flagged: false });
    console.log(`[${requestId}] Response sent:`, response);
    return NextResponse.json(response);
  } catch (error) {
    console.error(`[${requestId}] Error:`, error);
    const errorReason = error instanceof Error ? error.message : 'Processing error';
    await logRequest(requestId, fingerprint, userId, tool, { flagged: true, reason: errorReason });
    await logFlaggedRequest(requestId, fingerprint, userId, tool, userInput, null, { flagged: true, reason: errorReason });
    return NextResponse.json({ error: `An error occurred while using the ${tool}. Please try again.` }, { status: 500 });
  }
}

// Gemini handler and message creators
async function handleGeminiRequest(messages: any[]) {
  const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });
  const prompt = messages[1].content;
  const result = await geminiModel.generateContent(prompt);
  const content = result.response.text().trim();
  if (!content) throw new Error('Empty response from Gemini');
  return content;
}

function createRiddleSolverMessages(data: z.infer<typeof RiddleSolverRequestSchema>) {
  const { riddle } = data;
  return [
    { role: "system", content: "You are an expert riddle solver." },
    { role: "user", content: `Solve the following riddle and explain your reasoning: "${riddle}"` },
  ];
}

function createRiddleGeneratorMessages(data: z.infer<typeof RiddleGeneratorRequestSchema>) {
  const { topic, difficulty } = data;
  return [
    { role: "system", content: "You are an expert riddle creator." },
    { role: "user", content: `Generate a ${difficulty || 'medium'} difficulty riddle${topic ? ` about ${topic}` : ''}. Provide the riddle followed by its solution.` },
  ];
}

function createNameCombinerMessages(data: z.infer<typeof NameCombinerRequestSchema>) {
  const { names, numberOfNames } = data;
  return [
    { role: "system", content: "You are an expert name combiner." },
    { role: "user", content: `Combine the following names into ${numberOfNames} unique combinations: "${names.join(', ')}"` },
  ];
}

function createUsernameGeneratorMessages(data: z.infer<typeof UsernameGeneratorRequestSchema>) {
  const { interests, style, numberOfUsernames } = data;
  return [
    { role: "system", content: "You are an expert username generator." },
    { role: "user", content: `Generate ${numberOfUsernames} unique usernames based on interests: "${interests.join(', ')}" in ${style} style.` },
  ];
}

function createWizardNameGeneratorMessages(data: z.infer<typeof WizardNameGeneratorRequestSchema>) {
  const { magicType, personality, numberOfNames } = data;
  return [
    { role: "system", content: "You are an expert wizard name generator." },
    { role: "user", content: `Generate ${numberOfNames} wizard names for magic type: ${magicType}, personality: ${personality}.` },
  ];
}