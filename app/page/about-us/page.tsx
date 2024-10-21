import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | SazeAI',
  description: 'Learn about SazeAI and our mission to revolutionize AI-generated content',
}

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">About SazeAI</h1>
        <div className="prose dark:prose-invert">
          <h2>How it all Started...</h2>
          <p>
            SazeAI was born from a vision shared by many: frustration with the limitations of AI-generated content. In 2023, Harvansh Chaudhary, brimming with innovative ideas, found his path blocked by the robotic nature of AI-written text. While AI content creation tools were plentiful, they struggled to produce truly human-like, engaging writing that resonated with readers.
          </p>
          <p>
            Determined to overcome this hurdle, Harvansh, with no formal background in marketing or copywriting, turned to the potential of Artificial Intelligence. He envisioned a tool that could not only generate content, but transform it – an AI text humanizer. This tool would refine AI-written content, breathing life into it and ensuring it bypassed Google's ever-evolving AI detection algorithms.
          </p>
          <p>
            Fueled by this vision, Harvansh leveraged the power of OpenAI's recently launched GPT-4. Within a short timeframe, he developed a groundbreaking AI text humanizer named "Humanizer Alpha". This innovation didn't just create content, it took existing AI-generated text and transformed it into captivating, human-sounding writing that held readers' attention.
          </p>
          <p>
            But Harvansh wasn't satisfied with a one-time solution. By Apr 2024, he had pushed SazeAI further with the launch of its advanced AI content creation features. He developed more than 60 AI content writing tools. These refinements solidified SazeAI's position as a leader in the AI writing space, earning positive reviews from its users, which consistently ranked SazeAI as the "Best AI Writer" for the current year.
          </p>

          <h2>Our Mission</h2>
          <p>
            SazeAI is committed to empowering everyone to overcome the limitations of AI-generated content. We believe in the power of AI, but we also recognize the need for human-quality writing. Our mission is to revolutionize the writing process by making AI-Human like content generation accessible to all. With SazeAI, you can produce high-quality, engaging content that bypasses Google's AI detection, all at lightning speed.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions, please contact us:
          </p>
          <p>
            By email: <a href="mailto:support@sazeai.com" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">support@sazeai.com</a>
          </p>
          <p>
            For more ways to get in touch, visit our <Link href="/contact" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">Contact page</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}