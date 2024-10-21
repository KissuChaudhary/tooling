import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from 'zod';
import { LRUCache } from 'lru-cache';

// Rate limiting setup
const rateLimit = new LRUCache<string, number>({
  max: 500,
  ttl: 600,
});

const getIP = (request: NextRequest) => {

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]
    || request.headers.get('x-real-ip')
    || request.headers.get('cf-connecting-ip')  // If using Cloudflare
    || request.ip  // Next.js IP
    || '0.0.0.0';  // Better fallback than localhost
    
  // Validate IP format
  return isValidIP(ip) ? ip : '0.0.0.0';
};

// Simple IP validation
const isValidIP = (ip: string): boolean => {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
};

const rateLimiter = (ip: string) => {
  const tokenCount = rateLimit.get(ip) || 0;
  if (tokenCount > 5) {
    return false;
  }
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
      'aiProductDescriptionGenerator', 'aiPunctuationChecker'
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
    LoveLetterWriterSchema
  ]),
});

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
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { tool, model, data } = body;

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
      default:
        return NextResponse.json({ error: "Invalid tool specified" }, { status: 400 });
  }

// In your existing route.ts, replace the try-catch block in the API handling section with this:

try {
  let content;
  if (model === 'gpt4o') {
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
        model: "gpt-4o-mini", // Keeping your original model name
        messages: messages,
        max_tokens: 500
      })
    });


    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
    }

    const responseData = await response.json();
    content = responseData.choices[0].message.content.trim();
  } else if (model === 'gemini') {
    const geminiApiKey = process.env.GEMINI_API_KEY; // Keeping your original API key name
    if (!geminiApiKey) {
      throw new Error('Gemini API key is not set');
    }

    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Keeping your original model name

    try {
      const prompt = messages[1].content;
      console.log('Sending prompt to Gemini:', prompt); // Debug log
      
      const result = await geminiModel.generateContent(prompt);
      if (!result) {
        throw new Error('No response from Gemini');
      }
      
      const response = await result.response;
      content = response.text().trim();

      if (!content) {
        throw new Error('Empty response from Gemini');
      }
      
      console.log('Received response from Gemini:', content); // Debug log
    } catch (geminiError) {
      console.error('Gemini API error:', geminiError);
      throw new Error(`Gemini API error: ${geminiError instanceof Error ? geminiError.message : 'Unknown error'}`);
    }
  } else {
    throw new Error('Invalid model specified');
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
    default:
      throw new Error(`Unsupported tool: ${tool}`);
  }
catch (error) {
  console.error('Error details:', {
    error,
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    tool,
    model
  });
  
  return NextResponse.json({ 
    error: `An error occurred while generating the ${tool}. ${error instanceof Error ? error.message : ''}` 
  }, { 
    status: 500 
  });
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
    { role: "system", content: "You are a skilled poet specializing in creating beautiful and meaningful haikus." },
    { role: "user", content: `Compose a haiku about "${theme}". Remember to follow the 5-7-5 syllable structure and capture the essence of the theme in a concise and evocative manner.` }
  ];
}

function createAIIntroWriterMessages(data: z.infer<typeof IntroWriterSchema>) {
  const { topic, audience, tone } = data;
  return [
    { role: "system", content: "You are an expert writer specializing in crafting engaging introductions for various types of content." },
    { role: "user", content: `Write an introduction for a piece about "${topic}". The target audience is ${audience}, and the tone should be ${tone}. The introduction should grab the reader's attention and provide a clear overview of what the content will cover.` }
  ];
}

function createAILyricGeneratorMessages(data: z.infer<typeof LyricGeneratorSchema>) {
  const { genre, theme, mood } = data;
  return [
    { role: "system", content: "You are a talented lyricist capable of writing unique and emotive song lyrics in various genres." },
    { role: "user", content: `Compose lyrics for a ${genre} song about "${theme}". The mood of the song should be ${mood}. Write a verse and a chorus that capture the essence of the theme and fit the genre's style.` }
  ];
}

function createAIPlotGeneratorMessages(data: z.infer<typeof PlotGeneratorSchema>) {
  const { genre, setting, characters } = data;
  return [
    { role: "system", content: "You are a creative storyteller specializing in generating intriguing plot ideas for various genres." },
    { role: "user", content: `Generate a plot outline for a ${genre} story. The setting is ${setting}, and the main characters are ${characters}. Provide a brief summary of the key plot points, including the inciting incident, major conflicts, and potential resolution.` }
  ];
}

function createAIQuotesGeneratorMessages(data: z.infer<typeof QuotesGeneratorSchema>) {
  const { topic, style } = data;
  return [
    { role: "system", content: "You are an insightful quote generator capable of creating thought-provoking and inspiring quotes on various topics." },
    { role: "user", content: `Generate 3 unique quotes about  "${topic}" in a ${style} style. The quotes should be concise, memorable, and capture the essence of the topic.` }
  ];
}

function createAIRhymeGeneratorMessages(data: z.infer<typeof RhymeGeneratorSchema>) {
  const { word, count } = data;
  return [
    { role: "system", content: "You are a linguistic expert specializing in finding perfect rhymes for words." },
    { role: "user", content: `Generate ${count} words that rhyme with "${word}". Provide a mix of single-syllable and multi-syllable rhymes if possible.` }
  ];
}

function createAISEOTitleGeneratorMessages(data: z.infer<typeof SEOTitleGeneratorSchema>) {
  const { topic, keywords } = data;
  return [
    { role: "system", content: "You are an SEO expert specializing in creating effective titles to boost content visibility." },
    { role: "user", content: `Generate 3 SEO-optimized titles for content about "${topic}". Include the following keywords where appropriate: ${keywords}. The titles should be attention-grabbing, concise, and optimized for search engines.` }
  ];
}

function createAIParaphrasingToolMessages(data: z.infer<typeof ParaphrasingToolSchema>) {
  const { text, style } = data;
  return [
    { role: "system", content: "You are an expert in rephrasing and paraphrasing text while maintaining its original meaning." },
    { role: "user", content: `Paraphrase the following text in a ${style} style: "${text}". Ensure that the meaning is preserved while altering the wording and sentence structure.` }
  ];
}

function createAIEmailResponseGeneratorMessages(data: z.infer<typeof EmailResponseGeneratorSchema>) {
  const { originalEmail, tone, response } = data;
  return [
    { role: "system", content: "You are a professional email writer capable of crafting appropriate and effective email responses." },
    { role: "user", content: `Generate a professional email reply to the following email: "${originalEmail}". The tone should be ${tone}, and the response to the email is ${response}. Ensure the response is courteous, clear, and addresses all relevant points from the original email.` }
  ];
}

function createAIBookTitleGeneratorMessages(data: z.infer<typeof BookTitleGeneratorSchema>) {
  const { genre, theme, audience } = data;
  return [
    { role: "system", content: "You are a creative book title generator specializing in crafting compelling titles for various genres." },
    { role: "user", content: `Generate 3 potential titles for a ${genre} book with the theme "${theme}". The target audience is ${audience}. The titles should be catchy, relevant to the genre and theme, and appeal to the intended audience.` }
  ];
}

function createAIBackstoryGeneratorMessages(data: z.infer<typeof BackstoryGeneratorSchema>) {
  const { characterName, setting, keyEvents } = data;
  return [
    { role: "system", content: "You are a creative writer specializing in developing engaging backstories for fictional characters." },
    { role: "user", content: `Create a backstory for a character named ${characterName}. The character exists in the following setting: ${setting}. Include the following key events in their past: ${keyEvents}. The backstory should provide depth to the character and explain their motivations and personality.` }
  ];
}

function createAICoverLetterWriterMessages(data: z.infer<typeof CoverLetterWriterSchema>) {
  const { jobTitle, company, skills, experience } = data;
  return [
    { role: "system", content: "You are an expert in writing persuasive and professional cover letters." },
    { role: "user", content: `Write a cover letter for a ${jobTitle} position at ${company}. Highlight the following skills: ${skills}. Relevant experience includes: ${experience}. The cover letter should be concise, engaging, and tailored to the specific job and company.` }
  ];
}

function createAILinkedInSummaryGeneratorMessages(data: z.infer<typeof LinkedInSummaryGeneratorSchema>) {
  const { profession, experience, skills, achievements } = data;
  return [
    { role: "system", content: "You are a professional LinkedIn profile writer specializing in creating effective summaries." },
    { role: "user", content: `Generate a LinkedIn summary for a ${profession}. Include the following experience: ${experience}. Key skills to highlight: ${skills}. Notable achievements: ${achievements}. The summary should be concise, professional, and showcase the individual's unique value proposition.` }
  ];
}

function createAIProductDescriptionGeneratorMessages(data: z.infer<typeof ProductDescriptionGeneratorSchema>) {
  const { productName, features, benefits, targetAudience } = data;
  return [
    { role: "system", content: "You are an expert copywriter specializing in creating compelling product descriptions for e-commerce." },
    { role: "user", content: `Write a product description for ${productName}. Key features: ${features}. Main benefits: ${benefits}. Target audience: ${targetAudience}. The description should be engaging, highlight the product's unique selling points, and appeal to the target audience.` }
  ];
}

function createAIPunctuationCheckerMessages(data: z.infer<typeof PunctuationCheckerSchema>) {
  const { text } = data;
  return [
    { role: "system", content: "You are a meticulous editor specializing in correcting punctuation errors in text." },
    { role: "user", content: `Check and correct the punctuation in the following text: "${text}". Provide the corrected version of the text, ensuring proper use of commas, periods, semicolons, and other punctuation marks.` }
  ];
}

function createReviewGeneratorMessages(data: z.infer<typeof ReviewGeneratorSchema>) {
  const { product, rating, aspects } = data;
  return [
    { role: "system", content: "You are an expert product reviewer." },
    { role: "user", content: `Generate an insightful review for ${product}. Rating: ${rating}/5. Cover these aspects: ${aspects.join(', ')}. The review should be balanced, detailed, and helpful for potential buyers.` }
  ];
}

function createSeoMetaDescriptionGeneratorMessages(data: z.infer<typeof SeoMetaDescriptionGeneratorSchema>) {
  const { title, keywords } = data;
  return [
    { role: "system", content: "You are an SEO expert specializing in meta descriptions." },
    { role: "user", content: `Create an effective meta description for: "${title}". Include these keywords where appropriate: ${keywords.join(', ')}. The description should be compelling and under 160 characters.` }
  ];
}

function createSloganGeneratorMessages(data: z.infer<typeof SloganGeneratorSchema>) {
  const { brand, product, targetAudience } = data;
  return [
    { role: "system", content: "You are a creative advertising copywriter." },
    { role: "user", content: `Generate a catchy slogan for ${brand}'s ${product}. Target audience: ${targetAudience}. The slogan should be memorable, impactful, and appeal to the target audience.` }
  ];
}

function createYoutubeTitleGeneratorMessages(data: z.infer<typeof YoutubeTitleGeneratorSchema>) {
  const { topic, keywords } = data;
  return [
    { role: "system", content: "You are a YouTube content strategist." },
    { role: "user", content: `Create a compelling YouTube video title about: ${topic}. Include these keywords if possible: ${keywords.join(', ')}. The title should be attention-grabbing and encourage clicks while avoiding clickbait.` }
  ];
}

function createRealisticInfluencerImagePromptsMessages(data: z.infer<typeof RealisticInfluencerImagePromptsSchema>) {
  const { influencerType, setting, mood } = data;
  return [
    { role: "system", content: "You are an expert in creating realistic image prompts for AI-generated influencer content." },
    { role: "user", content: `Generate a detailed image prompt for a ${influencerType} influencer. Setting: ${setting}. Mood: ${mood}. The prompt should be vivid and result in a realistic, Instagram-worthy image.` }
  ];
}

function createCaptionGeneratorMessages(data: z.infer<typeof CaptionGeneratorSchema>) {
  const { image, platform, tone } = data;
  return [
    { role: "system", content: "You are a social media content creator." },
    { role: "user", content: `Generate an engaging caption for a ${platform} post. Image description: ${image}. Desired tone: ${tone}. The caption should be platform-appropriate and encourage engagement.` }
  ];
}

function createBirthdayWishGeneratorMessages(data: z.infer<typeof BirthdayWishGeneratorSchema>) {
  const { name, age, relationship } = data;
  return [
    { role: "system", content: "You are a thoughtful writer specializing in personalized messages." },
    { role: "user", content: `Write a heartfelt birthday wish for ${name} who is turning ${age}. Your relationship: ${relationship}. The message should be warm, personal, and appropriate for the relationship and age.` }
  ];
}

function createLoveLetterWriterMessages(data: z.infer<typeof LoveLetterWriterSchema>) {
  const { partnerName, occasion, relationshipDuration } = data;
  return [
    { role: "system", content: "You are a romantic writer skilled in expressing deep emotions." },
    { role: "user", content: `Write a love letter to ${partnerName} for the occasion: ${occasion}. Relationship duration: ${relationshipDuration}. The letter should be heartfelt, personal, and express genuine feelings.` }
  ];
}


}
