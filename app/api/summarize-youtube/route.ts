import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { YoutubeTranscript } from 'youtube-transcript';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

async function getVideoDetails(videoId: string) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`
  );
  const data = await response.json();
  return data.items[0]?.contentDetails;
}

// Convert YouTube duration format (PT1H2M10S) to seconds
function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  
  const [, hours, minutes, seconds] = match;
  return (
    (parseInt(hours) || 0) * 3600 +
    (parseInt(minutes) || 0) * 60 +
    (parseInt(seconds) || 0)
  );
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY || !YOUTUBE_API_KEY) {
      throw new Error("Required API keys are not defined");
    }

    const { youtubeUrl } = await req.json();

    // Extract video ID from the URL
    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
    }

    // Get video details from YouTube API
    const videoDetails = await getVideoDetails(videoId);
    const videoDuration = parseDuration(videoDetails.duration);

    // Fetch transcript with language preference
    const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: 'en',
    });

    // Format transcript with proper timestamps
    const formattedTranscript = transcript.map(entry => ({
      text: entry.text,
      start: entry.offset / 1000, // Convert milliseconds to seconds
      duration: entry.duration,
    }));

    // Generate summary using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      Analyze the following YouTube video transcript and provide:
      1. A concise summary of the main points (2-3 sentences)
      2. 5-7 key highlights from the video
      3. 2-3 key insights with detailed explanations

      Format the response as JSON with the following structure:
      {
        "summary": "string",
        "highlights": ["string"],
        "keyInsights": [{"title": "string", "description": "string"}]
      }

      Transcript:
      ${formattedTranscript.map(t => t.text).join(' ')}
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    let summary;
    if (jsonMatch) {
      try {
        summary = JSON.parse(jsonMatch[0]);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        summary = {
          summary: "Error parsing summary",
          highlights: [],
          keyInsights: []
        };
      }
    } else {
      console.error("No JSON found in the response");
      summary = {
        summary: responseText,
        highlights: [],
        keyInsights: []
      };
    }

    return NextResponse.json({
      transcript: formattedTranscript,
      summary,
      metadata: {
        duration: videoDuration,
        language: 'en'
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the video" },
      { status: 500 }
    );
  }
}

function extractVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}
