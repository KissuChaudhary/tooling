import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from 'zod';
import { LRUCache } from 'lru-cache';

// Rate limiting setup
const rateLimit = new LRUCache<string, number>({
  max: 5000,
  ttl: 12000,
});

const getIP = (request: NextRequest) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]
    || request.headers.get('x-real-ip')
    || request.headers.get('cf-connecting-ip')
    || request.ip
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

// Zod schemas for request validation
const BioRequestSchema = z.object({
  name: z.string(),
  currentRole: z.string(),
  experience: z.string(),
  skills: z.string(),
  goals: z.string(),
});

const PostRequestSchema = z.object({
  topic: z.string(),
  keyPoints: z.string(),
  tone: z.string(),
  callToAction: z.string(),
});

const HeadlineRequestSchema = z.object({
  profession: z.string(),
  skills: z.string(),
  industry: z.string(),
  tone: z.string(),
});

const InstagramBioRequestSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  interests: z.string(),
  personality: z.string(),
  callToAction: z.string(),
});

const InstagramCaptionRequestSchema = z.object({
  topic: z.string(),
  mood: z.string(),
  hashtags: z.string(),
  callToAction: z.string(),
});

const EssayRequestSchema = z.object({
  topic: z.string(),
  tone: z.string(),
  essayType: z.string(),
  audience: z.string(),
  length: z.string(),
  purpose: z.string(),
});

const TextImproverRequestSchema = z.object({
  originalText: z.string(),
  improvementGoal: z.string(),
});

const StoryRequestSchema = z.object({
  genre: z.string(),
  characters: z.string(),
  setting: z.string(),
  plotPoints: z.string(),
});

const PickupLineRequestSchema = z.object({
  targetName: z.string().optional(),
  targetGender: z.string(),
  setting: z.string(),
  style: z.enum(['smooth', 'witty', 'cheesy', 'nerdy', 'romantic', 'funny', 'clever', 'geeky', 'punny', 'flirty']),
});

const ThesisStatementRequestSchema = z.object({
  topic: z.string(),
  argument: z.string(),
  fieldOfStudy: z.string(),
});

const AIAnswerSchema = z.object({
  question: z.string(),
});

const MetaphorGeneratorSchema = z.object({
  topic: z.string(),
  context: z.string(),
});

const PoemGeneratorSchema = z.object({
  theme: z.string(),
  style: z.string(),
  length: z.string(),
});

const CharacterGeneratorSchema = z.object({
  genre: z.string(),
  role: z.string(),
  traits: z.string(),
});

const ConclusionGeneratorSchema = z.object({
  topic: z.string(),
  keyPoints: z.string(),
  tone: z.string(),
});

const HaikuGeneratorSchema = z.object({
  theme: z.string(),
});

const IntroWriterSchema = z.object({
  topic: z.string(),
  audience: z.string(),
  tone: z.string(),
});

const LyricGeneratorSchema = z.object({
  genre: z.string(),
  theme: z.string(),
  mood: z.string(),
});

const PlotGeneratorSchema = z.object({
  genre: z.string(),
  setting: z.string(),
  characters: z.string(),
});

const QuotesGeneratorSchema = z.object({
  topic: z.string(),
  style: z.string(),
});

const RhymeGeneratorSchema = z.object({
  word: z.string(),
  count: z.number(),
});

const SEOTitleGeneratorSchema = z.object({
  topic: z.string(),
  keywords: z.string(),
});

const ParaphrasingToolSchema = z.object({
  text: z.string(),
  style: z.string(),
});

const EmailResponseGeneratorSchema = z.object({
  originalEmail: z.string(),
  tone: z.string(),
  response: z.string(),
});

const BookTitleGeneratorSchema = z.object({
  genre: z.string(),
  theme: z.string(),
  audience: z.string(),
});

const BackstoryGeneratorSchema = z.object({
  characterName: z.string(),
  setting: z.string(),
  keyEvents: z.string(),
});

const CoverLetterWriterSchema = z.object({
  jobTitle: z.string(),
  company: z.string(),
  skills: z.string(),
  experience: z.string(),
});

const LinkedInSummaryGeneratorSchema = z.object({
  profession: z.string(),
  experience: z.string(),
  skills: z.string(),
  achievements: z.string(),
});

const ProductDescriptionGeneratorSchema = z.object({
  productName: z.string(),
  features: z.string(),
  benefits: z.string(),
  targetAudience: z.string(),
});

const PunctuationCheckerSchema = z.object({
  text: z.string(),
});

const ReviewGeneratorSchema = z.object({
  product: z.string(),
  rating: z.number().min(1).max(5),
  aspects: z.array(z.string()),
});

const SeoMetaDescriptionGeneratorSchema = z.object({
  title: z.string(),
  keywords: z.array(z.string()),
});

const SloganGeneratorSchema = z.object({
  brand: z.string(),
  product: z.string(),
  targetAudience: z.string(),
});

const YoutubeTitleGeneratorSchema = z.object({
  topic: z.string(),
  keywords: z.array(z.string()),
});

const RealisticInfluencerImagePromptsSchema = z.object({
  influencerType: z.string(),
  setting: z.string(),
  mood: z.string(),
});

const CaptionGeneratorSchema = z.object({
  image: z.string(),
  platform: z.enum(['Instagram', 'Twitter', 'Facebook', 'LinkedIn']),
  tone: z.string(),
});

const BirthdayWishGeneratorSchema = z.object({
  name: z.string(),
  age: z.number(),
  relationship: z.string(),
});

const LoveLetterWriterSchema = z.object({
  partnerName: z.string(),
  occasion: z.string(),
  relationshipDuration: z.string(),
});

const RizzGeneratorSchema = z.object({
  target: z.string(),
  tone: z.string(),
  context: z.string(),
  personalDetails: z.string(),
  language: z.string(),
  specificCompliments: z.string(),
});

const RequestSchema = z.object({
  tool: z.enum([
    'aiReviewGenerator',
    'aiSeoMetaDescriptionGenerator',
    'aiSloganGenerator',
    'aiYoutubeTitleGenerator',
    'aiRealisticInfluencerImagePrompts',
    'aiCaptionGenerator',
    'aiBirthdayWishGenerator',
    'aiLoveLetterWriter', 
    'linkedinBio', 'linkedinPost', 'linkedinHeadline', 'instagramBio', 'instagramCaption', 
    'aiEssay', 'aiTextImprover', 'aiStoryGenerator', 'aiPickupLines', 'aiThesisStatement',
    'aiAnswerGenerator', 'aiMetaphorGenerator', 'aiPoemGenerator', 'aiCharacterGenerator',
    'aiConclusionGenerator', 'aiHaikuGenerator', 'aiIntroWriter', 'aiLyricGenerator',
    'aiPlotGenerator', 'aiQuotesGenerator', 'aiRhymeGenerator', 'aiSEOTitleGenerator',
    'aiParaphrasingTool', 'aiEmailResponseGenerator', 'aiBookTitleGenerator',
    'aiBackstoryGenerator', 'aiCoverLetterWriter', 'aiLinkedInSummaryGenerator',
    'aiProductDescriptionGenerator', 'aiPunctuationChecker', 'aiRizzGenerator'
  ]),
  model: z.enum(['gpt4o', 'gemini']),
  data: z.union([
    BioRequestSchema,
    PostRequestSchema,
    HeadlineRequestSchema,
    InstagramBioRequestSchema,
    InstagramCaptionRequestSchema,
    EssayRequestSchema,
    TextImproverRequestSchema,
    StoryRequestSchema,
    PickupLineRequestSchema,
    ThesisStatementRequestSchema,
    AIAnswerSchema,
    MetaphorGeneratorSchema,
    PoemGeneratorSchema,
    CharacterGeneratorSchema,
    ConclusionGeneratorSchema,
    HaikuGeneratorSchema,
    IntroWriterSchema,
    LyricGeneratorSchema,
    PlotGeneratorSchema,
    QuotesGeneratorSchema,
    RhymeGeneratorSchema,
    SEOTitleGeneratorSchema,
    ParaphrasingToolSchema,
    EmailResponseGeneratorSchema,
    BookTitleGeneratorSchema,
    BackstoryGeneratorSchema,
    CoverLetterWriterSchema,
    LinkedInSummaryGeneratorSchema,
    ProductDescriptionGeneratorSchema,
    PunctuationCheckerSchema,
    ReviewGeneratorSchema,
    SeoMetaDescriptionGeneratorSchema,
    SloganGeneratorSchema,
    YoutubeTitleGeneratorSchema,
    RealisticInfluencerImagePromptsSchema,
    CaptionGeneratorSchema,
    BirthdayWishGeneratorSchema,
    LoveLetterWriterSchema,
    RizzGeneratorSchema
  ]),
});

// New function to check content using OpenAI's moderation API
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
  const userInput = Object.values(data).join(' ');

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

  let messages;

  switch (tool) {
    case 'linkedinBio':
      messages = createLinkedInBioMessages(data);
      break;
    case 'linkedinPost':
      messages = createLinkedInPostMessages(data);
      break;
    case 'linkedinHeadline':
      messages = createLinkedInHeadlineMessages(data);
      break;
    case 'instagramBio':
      messages = createInstagramBioMessages(data);
      break;
    case 'instagramCaption':
      messages = createInstagramCaptionMessages(data);
      break;
    case 'aiEssay':
      messages = createAIEssayMessages(data);
      break;
    case 'aiTextImprover':
      messages = createAITextImproverMessages(data);
      break;
    case 'aiStoryGenerator':
      messages = createAIStoryGeneratorMessages(data);
      break;
    case 'aiPickupLines':
      messages = createAIPickupLinesMessages(data);
      break;
    case 'aiThesisStatement':
      messages = createAIThesisStatementMessages(data);
      break;
    case 'aiAnswerGenerator':
      messages = createAIAnswerGeneratorMessages(data);
      break;
    case 'aiMetaphorGenerator':
      messages = createAIMetaphorGeneratorMessages(data);
      break;
    case 'aiPoemGenerator':
      messages = createAIPoemGeneratorMessages(data);
      break;
    case 'aiCharacterGenerator':
      messages = createAICharacterGeneratorMessages(data);
      break;
    case 'aiConclusionGenerator':
      messages = createAIConclusionGeneratorMessages(data);
      break;
    case 'aiHaikuGenerator':
      messages = createAIHaikuGeneratorMessages(data);
      break;
    case 'aiIntroWriter':
      messages = createAIIntroWriterMessages(data);
      break;
    case 'aiLyricGenerator':
      messages = createAILyricGeneratorMessages(data);
      break;
    case 'aiPlotGenerator':
      messages = createAIPlotGeneratorMessages(data);
      break;
    case 'aiQuotesGenerator':
      messages = createAIQuotesGeneratorMessages(data);
      break;
    case 'aiRhymeGenerator':
      messages = createAIRhymeGeneratorMessages(data);
      break;
    case 'aiSEOTitleGenerator':
      messages = createAISEOTitleGeneratorMessages(data);
      break;
    case 'aiParaphrasingTool':
      messages = createAIParaphrasingToolMessages(data);
      break;
    case 'aiEmailResponseGenerator':
      messages = createAIEmailResponseGeneratorMessages(data);
      break;
    case 'aiBookTitleGenerator':
      messages = createAIBookTitleGeneratorMessages(data);
      break;
    case 'aiBackstoryGenerator':
      messages = createAIBackstoryGeneratorMessages(data);
      break;
    case 'aiCoverLetterWriter':
      messages = createAICoverLetterWriterMessages(data);
      break;
    case 'aiLinkedInSummaryGenerator':
      messages = createAILinkedInSummaryGeneratorMessages(data);
      break;
    case 'aiProductDescriptionGenerator':
      messages = createAIProductDescriptionGeneratorMessages(data);
      break;
    case 'aiPunctuationChecker':
      messages = createAIPunctuationCheckerMessages(data);
      break;
    case 'aiReviewGenerator':
      messages = createReviewGeneratorMessages(data);
      break;
    case 'aiSeoMetaDescriptionGenerator':
      messages = createSeoMetaDescriptionGeneratorMessages(data);
      break;
    case 'aiSloganGenerator':
      messages = createSloganGeneratorMessages(data);
      break;
    case 'aiYoutubeTitleGenerator':
      messages = createYoutubeTitleGeneratorMessages(data);
      break;
    case 'aiRealisticInfluencerImagePrompts':
      messages = createRealisticInfluencerImagePromptsMessages(data);
      break;
    case 'aiCaptionGenerator':
      messages = createCaptionGeneratorMessages(data);
      break;
    case 'aiBirthdayWishGenerator':
      messages = createBirthdayWishGeneratorMessages(data);
      break;
    case 'aiLoveLetterWriter':
      messages = createLoveLetterWriterMessages(data);
      break;
      case 'aiRizzGenerator':
      messages = createRizzGeneratorMessages(data);
      break;
    default:
      return NextResponse.json({ error: "Invalid tool specified" }, { status: 400 });
  }

  try {
    let content;
    if (model === 'gpt4o') {
      content = await handleOpenAIRequest(messages);
    } else if (model === 'gemini') {
      content = await handleGeminiRequest(messages);
    } else {
      throw new Error('Invalid model specified');
    }

    // Moderate the generated content as well
    try {
      const generatedContentModerationResult = await moderateContent(content);
      if (generatedContentModerationResult.flagged) {
        return NextResponse.json({ error: "Content flagged for abusive or explicit material. Please revise to meet our guidelines." }, { status: 400 });
      }
    } catch (error) {
      console.error('Generated content moderation API error:', error);
      return NextResponse.json({ error: "Failed to moderate generated content" }, { status: 500 });
    }

    // Return appropriate response based on tool type
    switch (tool) {
      case 'linkedinBio':
      case 'instagramBio':
        return NextResponse.json({ bio: content });
      case 'linkedinPost':
        return NextResponse.json({ post: content });
      case 'linkedinHeadline':
        return NextResponse.json({ headline: content });
      case 'instagramCaption':
        return NextResponse.json({ caption: content });
      case 'aiEssay':
        return NextResponse.json({ essay: content });
      case 'aiTextImprover':
        return NextResponse.json({ improvedText: content });
      case 'aiStoryGenerator':
        return NextResponse.json({ story: content });
      case 'aiPickupLines':
        return NextResponse.json({ pickupLine: content.trim() });
      case 'aiThesisStatement':
        return NextResponse.json({ thesisStatement: content });
      case 'aiAnswerGenerator':
        return NextResponse.json({ answer: content });
      case 'aiMetaphorGenerator':
        return NextResponse.json({ metaphor: content });
      case 'aiPoemGenerator':
        return NextResponse.json({ poem: content });
      case 'aiCharacterGenerator':
        return NextResponse.json({ character: content });
      case 'aiConclusionGenerator':
        return NextResponse.json({ conclusion: content });
      case 'aiHaikuGenerator':
        return NextResponse.json({ haiku: content });
      case 'aiIntroWriter':
        return NextResponse.json({ introduction: content });
      case 'aiLyricGenerator':
        return NextResponse.json({ lyrics: content });
      case 'aiPlotGenerator':
        return NextResponse.json({ plot: content });
      case 'aiQuotesGenerator':
        return NextResponse.json({ quotes: content });
      case 'aiRhymeGenerator':
        return NextResponse.json({ rhymes: content });
      case 'aiSEOTitleGenerator':
        return NextResponse.json({ seoTitle: content });
      case 'aiParaphrasingTool':
        return NextResponse.json({ paraphrasedText: content });
      case 'aiEmailResponseGenerator':
        return NextResponse.json({ emailResponse: content });
      case 'aiBookTitleGenerator':
        return NextResponse.json({ bookTitle: content });
      case 'aiBackstoryGenerator':
        return NextResponse.json({ backstory: content });
      case 'aiCoverLetterWriter':
        return NextResponse.json({ coverLetter: content });
      case 'aiLinkedInSummaryGenerator':
        return NextResponse.json({ linkedInSummary: content });
      case 'aiProductDescriptionGenerator':
        return NextResponse.json({ productDescription: content });
      case 'aiPunctuationChecker':
        return NextResponse.json({ correctedText: content });
      case 'aiReviewGenerator':
        return NextResponse.json({ review: content });
      case 'aiSeoMetaDescriptionGenerator':
        return NextResponse.json({ metaDescription: content });
      case 'aiSloganGenerator':
        return NextResponse.json({ slogan: content });
      case 'aiYoutubeTitleGenerator':
        return NextResponse.json({ youtubeTitle: content });
      case 'aiRealisticInfluencerImagePrompts':
        return NextResponse.json({ imagePrompt: content });
      case 'aiCaptionGenerator':
        return NextResponse.json({ caption: content });
      case 'aiBirthdayWishGenerator':
        return NextResponse.json({ birthdayWish: content });
      case 'aiLoveLetterWriter':
        return NextResponse.json({ loveLetter: content });
      case 'aiRizzGenerator':
        return NextResponse.json({ rizz: content });
      default:
        throw new Error(`Unsupported tool: ${tool}`);
    }
    
} catch (error) {
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      tool,
      model
    });
    
    // Return a user-friendly error message
    let userErrorMessage = 'Uhhh... Something went wrong. Please try again later.';
    
    // Customize the message based on the error type or known error patterns
    if (error instanceof Error && error.message.includes('SAFETY')) {
      userErrorMessage = 'Content flagged for abusive or explicit material. Please revise to meet our guidelines.';
    }
    
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
  const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

function createLinkedInBioMessages(data: z.infer<typeof BioRequestSchema>) {
  const { name, currentRole, experience, skills, goals } = data;
  return [
    { role: "system", content: "You are a professional LinkedIn bio writer." },
    { role: "user", content: `Generate a professional LinkedIn bio for ${name}. 
      Current role: ${currentRole}. 
      Experience: ${experience}. 
      Skills: ${skills}. 
      Career goals: ${goals}.
      The bio should be concise, engaging, and highlight the person's unique value proposition.` }
  ];
}

function createLinkedInPostMessages(data: z.infer<typeof PostRequestSchema>) {
  const { topic, keyPoints, tone, callToAction } = data;
  return [
    { role: "system", content: "You are a professional LinkedIn content creator." },
    { role: "user", content: `Generate a compelling LinkedIn post about ${topic}. 
      Key points to include: ${keyPoints}. 
      Desired tone: ${tone}. 
      Call to action: ${callToAction}.
      The post should be engaging, informative, and encourage interaction from the audience.` }
  ];
}

function createLinkedInHeadlineMessages(data: z.infer<typeof HeadlineRequestSchema>) {
  const { profession, skills, industry, tone } = data;
  return [
    { role: "system", content: "You are a professional LinkedIn headline writer." },
    { role: "user", content: `Generate a compelling LinkedIn headline. 
      profession: ${profession}. 
      Key skills: ${skills}. 
      Industry: ${industry}. 
      tone: ${tone}.
      The headline should be concise, impactful, and highlight the person's professional identity and value.` }
  ];
}

function createInstagramBioMessages(data: z.infer<typeof InstagramBioRequestSchema>) {
  const { name, occupation, interests, personality, callToAction } = data;
  return [
    { role: "system", content: "You are a creative Instagram bio writer." },
    { role: "user", content: `Generate an engaging Instagram bio for ${name}. 
      Occupation: ${occupation}. 
      Interests: ${interests}. 
      Personality: ${personality}. 
      Call to action: ${callToAction}.
      The bio should be concise, creative, and reflect the user's personality while adhering to Instagram's 150 character limit.` }
  ];
}

function createInstagramCaptionMessages(data: z.infer<typeof InstagramCaptionRequestSchema>) {
  const { topic, mood, hashtags, callToAction } = data;
  return [
    { role: "system", content: "You are a creative Instagram caption writer." },
    { role: "user", content: `Generate an engaging Instagram caption about ${topic}. 
      Mood: ${mood}. 
      Hashtags to include: ${hashtags}. 
      Call to action: ${callToAction}.
      The caption should be catchy, relevant to the topic, and encourage engagement. Include emojis where appropriate.` }
  ];
}

function createAIEssayMessages(data: z.infer<typeof EssayRequestSchema>) {
  const { topic, tone, essayType, audience, length, purpose } = data;
  return [
    { role: "system", content: "You are an expert essay writer." },
    { role: "user", content: `Write an essay on the topic: ${topic}. 
      Tone: ${tone}.
      Essay Type: ${essayType}.
      Target Audience: ${audience}.
      Length: ${length}.
      Purpose: ${purpose}.
      Ensure the essay is well-structured, coherent, and tailored to the specified parameters.` }
  ];
}

function createAITextImproverMessages(data: z.infer<typeof TextImproverRequestSchema>) {
  const { originalText, improvementGoal } = data;
  return [
    { role: "system", content: "You are an expert in improving and refining text." },
    { role: "user", content: `Improve the following text: "${originalText}"
      The goal of the improvement is: ${improvementGoal}.
      Provide the improved version of the text while maintaining its original meaning and intent.` }
  ];
}

function createAIStoryGeneratorMessages(data: z.infer<typeof StoryRequestSchema>) {
  const { genre, characters, setting, plotPoints } = data;
  return [
    { role: "system", content: "You are a creative story generator." },
    { role: "user", content: `Generate a short story with the following details:
      Genre: ${genre}
      Characters: ${characters}
      Setting: ${setting}
      Key plot points: ${plotPoints}
      The story should be engaging, coherent, and capture the essence of the provided details.` }
  ];
}

function createAIPickupLinesMessages(data: z.infer<typeof PickupLineRequestSchema>) {
  const { targetName, targetGender, setting, style } = data;
  return [
    { role: "system", content: "You are a creative pickup line generator." },
    { role: "user", content: `Generate a ${style} pickup line for use in a ${setting}.
      ${targetName ? `The target's name is ${targetName}.` : ''}
      The target's gender is ${targetGender}.
      The pickup line should be clever, appropriate for the context, and not offensive.` }
  ];
}

function createAIThesisStatementMessages(data: z.infer<typeof ThesisStatementRequestSchema>) {
  const { topic, argument, fieldOfStudy } = data;
  return [
    { role: "system", content: "You are an expert in creating strong thesis statements for academic papers." },
    { role: "user", content: `Create a thesis statement for the following:
      Topic: ${topic}
      Main argument: ${argument}
      Field of study: ${fieldOfStudy}
      The thesis statement should be clear, concise, and effectively communicate the main argument of the paper.` }
  ];
}

function createAIAnswerGeneratorMessages(data: z.infer<typeof AIAnswerSchema>) {
  const { question } = data;
  return [
    { role: "system", content: "You are a knowledgeable AI assistant capable of answering a wide range of questions accurately and concisely." },
    { role: "user", content: `Please provide a precise and informative answer to the following question: ${question}` }
  ];
}

function createAIMetaphorGeneratorMessages(data: z.infer<typeof MetaphorGeneratorSchema>) {
  const { topic, context } = data;
  return [
    { role: "system", content: "You are a creative writer specializing in generating vivid and original metaphors." },
    { role: "user", content: `Create a metaphor for "${topic}" in the context of ${context}. The metaphor should be imaginative and thought-provoking.` }
  ];
}

function createAIPoemGeneratorMessages(data: z.infer<typeof PoemGeneratorSchema>) {
  const { theme, style, length } = data;
  return [
    { role: "system", content: "You are a talented poet capable of creating beautiful and meaningful poems in various styles." },
    { role: "user", content: `Write a ${length} poem about "${theme}" in the style of ${style}. The poem should be evocative and capture the essence of the theme.` }
  ];
}

function createAICharacterGeneratorMessages(data: z.infer<typeof CharacterGeneratorSchema>) {
  const { genre, role, traits } = data;
  return [
    { role: "system", content: "You are a creative character designer for various types of stories and projects." },
    { role: "user", content: `Create a unique character for a ${genre} story. The character's role is ${role}, and they should have the following traits: ${traits}. Provide a brief description of the character's appearance, personality, and background.` }
  ];
}

function createAIConclusionGeneratorMessages(data: z.infer<typeof ConclusionGeneratorSchema>) {
  const { topic, keyPoints, tone } = data;
  return [
    { role: "system", content: "You are an expert writer specializing in crafting impactful conclusions for various types of content." },
    { role: "user", content: `Generate a conclusion for a piece about "${topic}". Key points to summarize: ${keyPoints}. The tone should be ${tone}. The conclusion should effectively wrap up the main ideas and leave a lasting impression on the reader.` }
  ];
}

function createAIHaikuGeneratorMessages(data: z.infer<typeof HaikuGeneratorSchema>) {
  const { theme } = data;
  return [
    { role: "system", content: "You are a skilled poet specializing in creating beautiful and meaningful haiku." },
    { role: "user", content: `Create a haiku about "${theme}". Remember, a haiku consists of three lines with 5, 7, and 5 syllables respectively. The haiku should capture the essence of the theme in a concise and evocative manner.` }
  ];
}

function createAIIntroWriterMessages(data: z.infer<typeof IntroWriterSchema>) {
  const { topic, audience, tone } = data;
  return [
    { role: "system", content: "You are an expert writer specializing in crafting engaging introductions for various types of content." },
    { role: "user", content: `Write an introduction for a piece about "${topic}". The target audience is ${audience}, and the tone should be ${tone}. The introduction should grab the reader's attention, provide context, and set the stage for the main content.` }
  ];
}

function createAILyricGeneratorMessages(data: z.infer<typeof LyricGeneratorSchema>) {
  const { genre, theme, mood } = data;
  return [
    { role: "system", content: "You are a talented songwriter capable of creating meaningful and catchy lyrics in various genres." },
    { role: "user", content: `Write lyrics for a ${genre} song about "${theme}". The mood of the song should be ${mood}. The lyrics should be emotive, fit the genre, and effectively convey the theme and mood.` }
  ];
}

function createAIPlotGeneratorMessages(data: z.infer<typeof PlotGeneratorSchema>) {
  const { genre, setting, characters } = data;
  return [
    { role: "system", content: "You are a creative story plotter capable of generating engaging and original plot outlines." },
    { role: "user", content: `Generate a plot outline for a ${genre} story. The setting is ${setting}, and the main characters are ${characters}. The plot should include an intriguing conflict, rising action, climax, and resolution.` }
  ];
}

function createAIQuotesGeneratorMessages(data: z.infer<typeof QuotesGeneratorSchema>) {
  const { topic, style } = data;
  return [
    { role: "system", content: "You are an insightful quote generator capable of creating meaningful and impactful statements." },
    { role: "user", content: `Generate 3 quotes about "${topic}" in the style of ${style}. The quotes should be thought-provoking and capture the essence of the topic.` }
  ];
}

function createAIRhymeGeneratorMessages(data: z.infer<typeof RhymeGeneratorSchema>) {
  const { word, count } = data;
  return [
    { role: "system", content: "You are a skilled linguist specializing in finding rhyming words." },
    { role: "user", content: `Generate ${count} words that rhyme with "${word}". Provide a mix of perfect rhymes and near rhymes if possible.` }
  ];
}

function createAISEOTitleGeneratorMessages(data: z.infer<typeof SEOTitleGeneratorSchema>) {
  const { topic, keywords } = data;
  return [
    { role: "system", content: "You are an SEO expert specializing in creating optimized titles for web content." },
    { role: "user", content: `Generate an SEO-friendly title for a piece about "${topic}". The title should include one or more of these keywords: ${keywords}. The title should be catchy, informative, and optimized for search engines while remaining natural and appealing to readers.` }
  ];
}

function createAIParaphrasingToolMessages(data: z.infer<typeof ParaphrasingToolSchema>) {
  const { text, style } = data;
  return [
    { role: "system", content: "You are an expert in rephrasing and paraphrasing text while maintaining its original meaning." },
    { role: "user", content: `Paraphrase the following text in a ${style} style: "${text}". The paraphrased version should convey the same meaning but use different words and sentence structures.` }
  ];
}

function createAIEmailResponseGeneratorMessages(data: z.infer<typeof EmailResponseGeneratorSchema>) {
  const { originalEmail, tone, response } = data;
  return [
    { role: "system", content: "You are a professional email communication expert." },
    { role: "user", content: `Generate an email response to the following email:
      "${originalEmail}"
      The tone of the response should be ${tone}.
      Key points to address in the response: ${response}
      The email should be professional, clear, and effectively address the points in the original email.` }
  ];
}

function createAIBookTitleGeneratorMessages(data: z.infer<typeof BookTitleGeneratorSchema>) {
  const { genre, theme, audience } = data;
  return [
    { role: "system", content: "You are a creative book title generator." },
    { role: "user", content: `Generate 5 potential titles for a ${genre} book.
      The main theme of the book is: ${theme}
      The target audience is: ${audience}
      The titles should be catchy, relevant to the genre and theme, and appeal to the target audience.` }
  ];
}

function createAIBackstoryGeneratorMessages(data: z.infer<typeof BackstoryGeneratorSchema>) {
  const { characterName, setting, keyEvents } = data;
  return [
    { role: "system", content: "You are a creative character backstory writer." },
    { role: "user", content: `Generate a compelling backstory for a character named ${characterName}.
      The character exists in the following setting: ${setting}
      Key events or elements to include in the backstory: ${keyEvents}
      The backstory should be engaging, provide depth to the character, and fit well within the given setting.` }
  ];
}

function createAICoverLetterWriterMessages(data: z.infer<typeof CoverLetterWriterSchema>) {
  const { jobTitle, company, skills, experience } = data;
  return [
    { role: "system", content: "You are a professional cover letter writer." },
    { role: "user", content: `Write a compelling cover letter for a ${jobTitle} position at ${company}.
      Key skills to highlight: ${skills}
      Relevant experience: ${experience}
      The cover letter should be professional, highlight the applicant's qualifications, and express enthusiasm for the position and company.` }
  ];
}

function createAILinkedInSummaryGeneratorMessages(data: z.infer<typeof LinkedInSummaryGeneratorSchema>) {
  const { profession, experience, skills, achievements } = data;
  return [
    { role: "system", content: "You are a professional LinkedIn profile writer." },
    { role: "user", content: `Generate a compelling LinkedIn summary for a ${profession}.
      Key experience: ${experience}
      Skills to highlight: ${skills}
      Notable achievements: ${achievements}
      The summary should be professional, highlight the person's unique value proposition, and encourage profile visitors to connect or learn more.` }
  ];
}

function createAIProductDescriptionGeneratorMessages(data: z.infer<typeof ProductDescriptionGeneratorSchema>) {
  const { productName, features, benefits, targetAudience } = data;
  return [
    { role: "system", content: "You are an expert product description writer." },
    { role: "user", content: `Write an engaging product description for ${productName}.
      Key features: ${features}
      Main benefits: ${benefits}
      Target audience: ${targetAudience}
      The description should be persuasive, highlight the product's unique selling points, and appeal to the target audience.` }
  ];
}

function createAIPunctuationCheckerMessages(data: z.infer<typeof PunctuationCheckerSchema>) {
  const { text } = data;
  return [
    { role: "system", content: "You are an expert in English grammar and punctuation." },
    { role: "user", content: `Check and correct the punctuation in the following text. Provide the corrected version:
      "${text}"
      Explain any corrections made.` }
  ];
}

function createReviewGeneratorMessages(data: z.infer<typeof ReviewGeneratorSchema>) {
  const { product, rating, aspects } = data;
  return [
    { role: "system", content: "You are an experienced product reviewer." },
    { role: "user", content: `Generate a detailed review for ${product}. 
      Overall rating: ${rating}/5
      Aspects to cover: ${aspects.join(', ')}
      The review should be balanced, highlighting both positives and negatives, and provide specific examples or experiences.` }
  ];
}

function createSeoMetaDescriptionGeneratorMessages(data: z.infer<typeof SeoMetaDescriptionGeneratorSchema>) {
  const { title, keywords } = data;
  return [
    { role: "system", content: "You are an SEO expert specializing in creating effective meta descriptions." },
    { role: "user", content: `Generate an SEO-friendly meta description for a page titled "${title}".
      Keywords to include: ${keywords.join(', ')}
      The meta description should be compelling, accurately summarize the page content, and be optimized for search engines while remaining natural and appealing to users. Keep it under 160 characters.` }
  ];
}

function createSloganGeneratorMessages(data: z.infer<typeof SloganGeneratorSchema>) {
  const { brand, product, targetAudience } = data;
  return [
    { role: "system", content: "You are a creative slogan writer for advertising campaigns." },
    { role: "user", content: `Create a catchy slogan for ${brand}'s ${product}.
      Target audience: ${targetAudience}
      The slogan should be memorable, reflect the brand's identity, highlight the product's key benefit, and appeal to the target audience. Keep it short and impactful.` }
  ];
}

function createYoutubeTitleGeneratorMessages(data: z.infer<typeof YoutubeTitleGeneratorSchema>) {
  const { topic, keywords } = data;
  return [
    { role: "system", content: "You are a YouTube content creator specializing in creating engaging video titles." },
    { role: "user", content: `Generate 5 catchy YouTube video titles about "${topic}".
      Keywords to include: ${keywords.join(', ')}
      The titles should be attention-grabbing, accurately represent the video content, and be optimized for search while remaining natural and appealing to viewers. Keep each title under 60 characters.` }
  ];
}

function createRealisticInfluencerImagePromptsMessages(data: z.infer<typeof RealisticInfluencerImagePromptsSchema>) {
  const { influencerType, setting, mood } = data;
  return [
    { role: "system", content: "You are an expert in creating detailed image prompts for AI image generators, specializing in realistic influencer content." },
    { role: "user", content: `Create a detailed image prompt for a realistic photo of a ${influencerType} influencer.
      Setting: ${setting}
      Mood: ${mood}
      The prompt should describe the influencer's appearance, pose, outfit, and surroundings in detail. Include lighting, camera angle, and any props or background elements that would make the image look authentic and engaging for social media.` }
  ];
}

function createCaptionGeneratorMessages(data: z.infer<typeof CaptionGeneratorSchema>) {
  const { image, platform, tone } = data;
  return [
    { role: "system", content: "You are a social media expert specializing in creating engaging captions for various platforms." },
    { role: "user", content: `Generate a caption for an image of ${image} to be posted on ${platform}.
      Desired tone: ${tone}
      The caption should be engaging, relevant to the image, and optimized for the specific platform. Include appropriate hashtags and any call-to-action if relevant.` }
  ];
}

function createBirthdayWishGeneratorMessages(data: z.infer<typeof BirthdayWishGeneratorSchema>) {
  const { name, age, relationship } = data;
  return [
    { role: "system", content: "You are a creative writer specializing in personalized birthday messages." },
    { role: "user", content: `Write a heartfelt birthday wish for ${name} who is turning ${age}.
      Relationship to the recipient: ${relationship}
      The message should be warm, personal, and reflect the nature of the relationship. Include a specific memory or inside joke if possible, and express hopes for the coming year.` }
  ];
}

function createLoveLetterWriterMessages(data: z.infer<typeof LoveLetterWriterSchema>) {
  const { partnerName, occasion, relationshipDuration } = data;
  return [
    { role: "system", content: "You are a romantic writer skilled in expressing deep emotions." },
    { role: "user", content: `Write a love letter to ${partnerName} for the occasion: ${occasion}. Relationship duration: ${relationshipDuration}. The letter should be heartfelt, personal, and express genuine feelings.` }
  ];
}

function createRizzGeneratorMessages(data: z.infer<typeof RizzGeneratorSchema>) {
  const { target, tone, context, personalDetails, language, specificCompliments } = data;
  return [
    { 
      role: "system", 
      content: "You are an expert in writing short, direct, and engaging rizz lines based on the user's input." 
    },
    { 
      role: "user", 
      content: `write 5 short rizz line based on the following:
        - Context: ${context}
        - Tone: ${tone}
        - Target: ${target}
        - Language: ${language}
        - Personal Details: ${personalDetails}
        - Compliments: ${specificCompliments}
        Keep them under 200 characters and make them catchy, and to the point.`
    }
  ];
}

