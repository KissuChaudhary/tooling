import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

type BioRequest = {
  name: string;
  currentRole: string;
  experience: string;
  skills: string;
  goals: string;
};

type PostRequest = {
  topic: string;
  keyPoints: string;
  tone: string;
  callToAction: string;
};

type HeadlineRequest = {
  currentRole: string;
  keySkills: string;
  industry: string;
  uniqueValue: string;
};

type InstagramBioRequest = {
  name: string;
  occupation: string;
  interests: string;
  personality: string;
  callToAction: string;
};

type InstagramCaptionRequest = {
  topic: string;
  mood: string;
  hashtags: string;
  callToAction: string;
};

type EssayRequest = {
  topic: string;
  keyPoints: string;
  wordCount: number;
};

type TextImproverRequest = {
  originalText: string;
  improvementGoal: string;
};

type StoryRequest = {
  genre: string;
  characters: string;
  setting: string;
  plotPoints: string;
};

type PickupLineRequest = {
  context: string;
  style: string;
};

type ThesisStatementRequest = {
  topic: string;
  argument: string;
  fieldOfStudy: string;
};

type Request = BioRequest | PostRequest | HeadlineRequest | InstagramBioRequest | InstagramCaptionRequest | EssayRequest | TextImproverRequest | StoryRequest | PickupLineRequest | ThesisStatementRequest;

export async function POST(request: NextRequest) {
  const body: Request & { tool: string; model: 'gpt4o' | 'gemini' } = await request.json();
  const { tool, model, ...data } = body;

  let messages;

  switch (tool) {
    case 'linkedinBio':
      messages = createLinkedInBioMessages(data as BioRequest);
      break;
    case 'linkedinPost':
      messages = createLinkedInPostMessages(data as PostRequest);
      break;
    case 'linkedinHeadline':
      messages = createLinkedInHeadlineMessages(data as HeadlineRequest);
      break;
    case 'instagramBio':
      messages = createInstagramBioMessages(data as InstagramBioRequest);
      break;
    case 'instagramCaption':
      messages = createInstagramCaptionMessages(data as InstagramCaptionRequest);
      break;
    case 'aiEssay':
      messages = createAIEssayMessages(data as EssayRequest);
      break;
    case 'aiTextImprover':
      messages = createAITextImproverMessages(data as TextImproverRequest);
      break;
    case 'aiStoryGenerator':
      messages = createAIStoryGeneratorMessages(data as StoryRequest);
      break;
    case 'aiPickupLines':
      messages = createAIPickupLinesMessages(data as PickupLineRequest);
      break;
    case 'aiThesisStatement':
      messages = createAIThesisStatementMessages(data as ThesisStatementRequest);
      break;
    default:
      return NextResponse.json({ error: "Invalid tool specified" }, { status: 400 });
  }

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
          model: "gpt-4o-mini",
          messages: messages,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      content = responseData.choices[0].message.content.trim();
    } else if (model === 'gemini') {
      const geminiApiKey = process.env.GEMINI_API_KEY;
      if (!geminiApiKey) {
        throw new Error('Gemini API key is not set');
      }

      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

      const prompt = messages[1].content; // Assuming the second message contains the user prompt
      const result = await geminiModel.generateContent(prompt);
      const response = await result.response;
      content = response.text().trim();

      if (!content) {
        throw new Error('Failed to generate content with Gemini');
      }
    } else {
      throw new Error('Invalid model specified');
    }

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
        return NextResponse.json({ pickupLine: content });
      case 'aiThesisStatement':
        return NextResponse.json({ thesisStatement: content });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: `An error occurred while generating the ${tool}.` }, { status: 500 });
  }
}

function createLinkedInBioMessages(data: BioRequest) {
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

function createLinkedInPostMessages(data: PostRequest) {
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

function createLinkedInHeadlineMessages(data: HeadlineRequest) {
  const { currentRole, keySkills, industry, uniqueValue } = data;
  return [
    { role: "system", content: "You are a professional LinkedIn headline writer." },
    { role: "user", content: `Generate a compelling LinkedIn headline. 
      Current role: ${currentRole}. 
      Key skills: ${keySkills}. 
      Industry: ${industry}. 
      Unique value proposition: ${uniqueValue}.
      The headline should be concise, impactful, and highlight the person's professional identity and value.` }
  ];
}

function createInstagramBioMessages(data: InstagramBioRequest) {
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

function createInstagramCaptionMessages(data: InstagramCaptionRequest) {
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

function createAIEssayMessages(data: EssayRequest) {
  const { topic, keyPoints, wordCount } = data;
  return [
    { role: "system", content: "You are an expert essay writer." },
    { role: "user", content: `Write an essay on the topic: ${topic}. 
      Key points to include: ${keyPoints}. 
      The essay should be approximately ${wordCount} words long.
      Ensure the essay is well-structured, coherent, and follows academic writing standards.` }
  ];
}

function createAITextImproverMessages(data: TextImproverRequest) {
  const { originalText, improvementGoal } = data;
  return [
    { role: "system", content: "You are an expert in improving and refining text." },
    { role: "user", content: `Improve the following text: "${originalText}"
      The goal of the improvement is: ${improvementGoal}.
      Provide the improved version of the text while maintaining its original meaning and intent.` }
  ];
}

function createAIStoryGeneratorMessages(data: StoryRequest) {
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

function createAIPickupLinesMessages(data: PickupLineRequest) {
  const { context, style } = data;
  return [
    { role: "system", content: "You are a creative pickup line generator." },
    { role: "user", content: `Generate a pickup line for the following context: ${context}
      The style of the pickup line should be: ${style}
      The pickup line should be clever, appropriate for the context, and not offensive.` }
  ];
}

function createAIThesisStatementMessages(data: ThesisStatementRequest) {
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
