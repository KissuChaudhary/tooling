import { LucideIcon } from 'lucide-react'

export type Tool = {
  icon: LucideIcon
  title: string
  description: string
  link: string
  badge?: { text: string; color: string }
}

import { Image, Zap, Feather, MessageSquare, Volume2, History, Cake, Book, User, BookOpen, FileText, Mail, Sunrise, Instagram, PenTool, Linkedin, Heart, Music, Repeat, Lightbulb, Puzzle, Edit, ShoppingBag, Star, Search, Youtube } from 'lucide-react'

export const tools: Tool[] = [
  {
    icon: Image,
    title: "AI Influencer Generator",
    description: "Create Realistic Social Media AI Influencer",
    link: "/tools/ai-influencer-generator",
  },
 {
    icon: Zap,
    title: "AI PDF Summarizer",
    description: "Upload PDF and get an AI-generated summary!",
    link: "/tools/ai-pdf-summarizer",
  },
  {
    icon: Star,
    title: "AI Text Humanizer",
    description: "Transform AI-generated text into more human-like language!",
    link: "/tools/ai-text-humanizer",
  },

  {
    icon: MessageSquare,
    title: "AI Answer Generator",
    description: "Generate precise answers to your questions using AI.",
    link: "/tools/ai-answer-generator"
  },
  {
    icon: Volume2,
    title: "AI Image Generator",
    description: "Free AI Image Generator for creative minds.",
    link: "/tools/ai-image-generator",
    badge: { text: "Hot", color: "bg-blue-500" }
  },
  {
    icon: History,
    title: "AI Backstory Generator",
    description: "Develop engaging backstories for your characters.",
    link: "/tools/ai-backstory-generator"
  },
  {
    icon: Cake,
    title: "AI Birthday Wish Generator",
    description: "Create personalized birthday wishes with AI.",
    link: "/tools/ai-birthday-wish-generator"
  },
  {
    icon: Book,
    title: "AI Book Title Generator",
    description: "Generate compelling titles for your books.",
    link: "/tools/ai-book-title-generator"
  },
  {
    icon: Image,
    title: "AI Caption Generator",
    description: "Create engaging captions for your images.",
    link: "/tools/ai-caption-generator",
    badge: { text: "Popular", color: "bg-green-500" }
  },
  {
    icon: User,
    title: "AI Character Generator",
    description: "Create unique characters for your stories or projects.",
    link: "/tools/ai-character-generator"
  },
  {
    icon: BookOpen,
    title: "AI Conclusion Generator",
    description: "Generate impactful conclusions for your writing.",
    link: "/tools/ai-conclusion-generator"
  },
  {
    icon: FileText,
    title: "AI Cover Letter Writer",
    description: "Write persuasive cover letters with AI.",
    link: "/tools/ai-cover-letter-writer"
  },
  {
    icon: Mail,
    title: "AI Email Generator",
    description: "Create professional emails with AI assistance.",
    link: "/tools/ai-email-generator"
  },
  {
    icon: Zap,
    title: "AI Essay Writer",
    description: "Generate well-structured essays on any topic with ease.",
    link: "/tools/ai-essay-writer",
    badge: { text: "Popular", color: "bg-green-500" }
  },
  {
    icon: Sunrise,
    title: "AI Haiku Generator",
    description: "Generate traditional haikus with AI assistance.",
    link: "/tools/ai-haiku-generator"
  },
  {
    icon: Image,
    title: "AI Image Generator",
    description: "Create unique images using AI technology.",
    link: "/tools/ai-image-generator"
  },
  {
    icon: Instagram,
    title: "AI Instagram Caption Generator",
    description: "Generate engaging captions for your Instagram posts.",
    link: "/tools/ai-instagram-caption-generator"
  },
  {
    icon: PenTool,
    title: "AI Intro Writer",
    description: "Create engaging introductions for your content.",
    link: "/tools/ai-intro-writer"
  },
  {
    icon: Linkedin,
    title: "AI LinkedIn Headline Generator",
    description: "Craft attention-grabbing LinkedIn headlines.",
    link: "/tools/ai-linkedin-headline-generator"
  },
  {
    icon: Linkedin,
    title: "AI LinkedIn Post Generator",
    description: "Create engaging LinkedIn posts with AI.",
    link: "/tools/ai-linkedin-post-generator"
  },
  {
    icon: Linkedin,
    title: "AI LinkedIn Summary Generator",
    description: "Craft effective LinkedIn summaries with AI.",
    link: "/tools/ai-linkedin-summary-generator"
  },
  {
    icon: Heart,
    title: "AI Love Letter Writer",
    description: "Compose heartfelt love letters with AI assistance.",
    link: "/tools/ai-love-letter-writer"
  },
  {
    icon: Music,
    title: "AI Lyric Generator",
    description: "Compose unique lyrics for your music projects.",
    link: "/tools/ai-lyric-generator"
  },
  {
    icon: Feather,
    title: "AI Metaphor Generator",
    description: "Generate creative metaphors to enhance your writing.",
    link: "/tools/ai-metaphor-generator",
    badge: { text: "Hot", color: "bg-red-500" }
  },
  {
    icon: Repeat,
    title: "AI Paraphrasing Tool",
    description: "Rephrase your text in different writing styles.",
    link: "/tools/ai-paraphrasing-tool"
  },
  {
    icon: Lightbulb,
    title: "AI Pickup Lines Generator",
    description: "Get creative and fun pickup lines for any occasion.",
    link: "/tools/ai-pickup-lines-generator"
  },
  {
    icon: Puzzle,
    title: "AI Plot Generator",
    description: "Generate intriguing plot ideas for your stories.",
    link: "/tools/ai-plot-generator"
  },
  {
    icon: Feather,
    title: "AI Poem Generator",
    description: "Craft beautiful poems with the help of AI.",
    link: "/tools/ai-poem-generator"
  },
  {
    icon: ShoppingBag,
    title: "AI Product Description Generator",
    description: "Generate detailed product descriptions for your e-commerce needs.",
    link: "/tools/ai-product-description-generator"
  },
  {
    icon: Edit,
    title: "AI Punctuation Checker",
    description: "Check and correct punctuation in your texts.",
    link: "/tools/ai-punctuation-checker"
  },
  {
    icon: MessageSquare,
    title: "AI Quotes Generator",
    description: "Get inspiring and thought-provoking quotes.",
    link: "/tools/ai-quotes-generator"
  },
  {
    icon: Star,
    title: "AI Review Generator",
    description: "Generate authentic-looking product reviews.",
    link: "/tools/ai-review-generator"
  },
  {
    icon: Music,
    title: "AI Rhyme Generator",
    description: "Find perfect rhymes for your poems and lyrics.",
    link: "/tools/ai-rhyme-generator"
  },
  {
    icon: Search,
    title: "AI SEO Meta Description Generator",
    description: "Create effective meta descriptions for better SEO.",
    link: "/tools/ai-seo-meta-description-generator"
  },
  {
    icon: Search,
    title: "AI SEO Title Generator",
    description: "Generate effective SEO titles to boost your content visibility.",
    link: "/tools/ai-seo-title-generator",
    badge: { text: "Popular", color: "bg-green-500" }
  },
  {
    icon: MessageSquare,
    title: "AI Slogan Generator",
    description: "Create catchy slogans for your brand or product.",
    link: "/tools/ai-slogan-generator"
  },
  {
    icon: BookOpen,
    title: "AI Story Generator",
    description: "Create engaging stories with advanced AI algorithms.",
    link: "/tools/ai-story-generator",
    badge: { text: "New", color: "bg-blue-500" }
  },
  {
    icon: Edit,
    title: "AI Text Improver",
    description: "Enhance your writing with AI-powered suggestions and improvements.",
    link: "/tools/ai-text-improver"
  },
  {
    icon: Volume2,
    title: "AI Text to Speech",
    description: "Convert your text into natural-sounding speech.",
    link: "/tools/ai-text-to-speech"
  },
  {
    icon: PenTool,
    title: "AI Thesis Statement Generator",
    description: "Generate compelling thesis statements for your essays.",
    link: "/tools/ai-thesis-statement-generator"
  },
  {
    icon: Youtube,
    title: "AI YouTube Title Generator",
    description: "Create catchy titles for your YouTube videos.",
    link: "/tools/ai-youtube-title-generator"
  },
  {
    icon: Instagram,
    title: "Instagram Bio Generator",
    description: "Create engaging Instagram bios with AI assistance.",
    link: "/tools/instagram-bio-generator"
  },
  {
    icon: Image,
    title: "Realistic Influencer Image Prompts",
    description: "Generate realistic image prompts for influencer content.",
    link: "/tools/ai-influencer-prompt-generator"
  },
   {
    icon: PenTool,
    title: "AI Rizz Generator",
    description: "Get the cheesy, clever, flirty lines to impress your someone.",
    link: "/tools/ai-rizz-generator"
  },
   {
    icon: Image,
    title: "AI Riddle Generator",
    description: "Create awesome Riddle for fun and learning",
    link: "/tools/ai-riddle-generator",
  },
 {
    icon: Zap,
    title: "AI Riddle Solver",
    description: "Solve anytype of riddle in seconds with ai!",
    link: "/tools/ai-riddle-solver",
  },
]
