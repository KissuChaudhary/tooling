'use client'

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { motion, Variants } from "framer-motion"
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6"
import {
  ArrowRight,
  Brain,
  Lightbulb,
  Feather,
  Check,
  MessageSquare,
  User,
  BookOpen,
  Sunrise,
  Music,
  Puzzle,
  Repeat,
  Quote,
  Zap,
  Book,
  Sparkles,
  PenTool,
  Mail,
  ShoppingBag,
  Rocket,
  Clock,
  Search,
  BarChart2,
  Link as LinkIcon,
  UserCheck,
  Layout,
} from "lucide-react"

export default function Page() {
  const fadeIn: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }

  const stagger: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const testimonials = [
    {
      quote: "Scalenut&apos;s content is profound and factual. I rely on the \"quora answer\" and SEO modules to craft long-form content swiftly. Impressive results!",
      name: "Benedict T.",
      role: "SEO Consultant",
      image: "/placeholder.svg"
    },
    {
      quote: "Its long-form assistant is everything you need to create great article outlines. It shows you SERP data including your competitors & their article outlines.",
      name: "Carlos U.",
      role: "Digital Marketing Consultant",
      image: "/placeholder.svg"
    },
    {
      quote: "The keyword grouping is a great feature. I also like the AI content writing interface. The cruise mode is very user-friendly. I highly recommend it.",
      name: "Kavitha R.",
      role: "International Marketing and Communications Representative",
      image: "/placeholder.svg"
    }
  ]

  const steps = [
    { title: "Choose a Tool", description: "Select from our wide range of AI text tools", icon: Zap },
    { title: "Input Your Content", description: "Paste your text or start writing from scratch", icon: PenTool },
    { title: "Let AI Work Its Magic", description: "Our advanced AI processes and enhances your content", icon: Sparkles },
    { title: "Review and Edit", description: "Fine-tune the AI-generated results to perfection", icon: Check },
  ]

  const toolkit = [
  {
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
    title: "AI Essay Writer",
    description: "Generate well-structured essays on any topic with ease.",
    link: "/tools/ai-essay-writer",
    badge: { text: "Popular", color: "bg-green-500" }
  },
  {
    icon: <Sparkles className="h-8 w-8 text-purple-500" />,
    title: "AI Text Improver",
    description: "Enhance your writing with AI-powered suggestions and improvements.",
    link: "/tools/ai-text-improver"
  },
  {
    icon: <Brain className="h-8 w-8 text-blue-500" />,
    title: "AI Story Generator",
    description: "Create engaging stories with advanced AI algorithms.",
    link: "/tools/ai-story-generator",
    badge: { text: "New", color: "bg-blue-500" }
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-green-500" />,
    title: "AI Pickup Lines",
    description: "Get creative and fun pickup lines for any occasion.",
    link: "/tools/ai-pickup-lines"
  },
  {
    icon: <PenTool className="h-8 w-8 text-red-500" />,
    title: "AI Thesis Statement",
    description: "Generate compelling thesis statements for your essays.",
    link: "/tools/ai-thesis-statement"
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-indigo-500" />,
    title: "AI Answer Generator",
    description: "Receive precise answers to your questions using AI.",
    link: "/tools/ai-answer-generator"
  },
  {
    icon: <Feather className="h-8 w-8 text-pink-500" />,
    title: "AI Metaphor Generator",
    description: "Generate creative metaphors to enhance your writing.",
    link: "/tools/ai-metaphor-generator",
    badge: { text: "Hot", color: "bg-red-500" }
  },
  {
    icon: <Feather className="h-8 w-8 text-teal-500" />,
    title: "AI Poem Generator",
    description: "Craft beautiful poems with the help of AI.",
    link: "/tools/ai-poem-generator"
  },
  {
    icon: <User className="h-8 w-8 text-orange-500" />,
    title: "AI Character Generator",
    description: "Create unique characters for your stories or projects.",
    link: "/tools/ai-character-generator"
  },
  {
    icon: <BookOpen className="h-8 w-8 text-emerald-500" />,
    title: "AI Conclusion Generator",
    description: "Generate impactful conclusions for your writing.",
    link: "/tools/ai-conclusion-generator"
  },
  {
    icon: <Sunrise className="h-8 w-8 text-amber-500" />,
    title: "AI Haiku Generator",
    description: "Generate traditional haikus with AI assistance.",
    link: "/tools/ai-haiku-generator"
  },
  {
    icon: <PenTool className="h-8 w-8 text-cyan-500" />,
    title: "AI Intro Writer",
    description: "Create engaging introductions for your content.",
    link: "/tools/ai-intro-writer"
  },
  {
    icon: <Music className="h-8 w-8 text-rose-500" />,
    title: "AI Lyric Generator",
    description: "Compose unique lyrics for your music projects.",
    link: "/tools/ai-lyric-generator"
  },
  {
    icon: <Puzzle className="h-8 w-8 text-violet-500" />,
    title: "AI Plot Generator",
    description: "Generate intriguing plot ideas for your stories.",
    link: "/tools/ai-plot-generator"
  },
  {
    icon: <Quote className="h-8 w-8 text-lime-500" />,
    title: "AI Quotes Generator",
    description: "Get inspiring and thought-provoking quotes.",
    link: "/tools/ai-quotes-generator"
  },
  {
    icon: <Music className="h-8 w-8 text-fuchsia-500" />,
    title: "AI Rhyme Generator",
    description: "Find perfect rhymes for your poems and lyrics.",
    link: "/tools/ai-rhyme-generator"
  },
  {
    icon: <Search className="h-8 w-8 text-sky-500" />,
    title: "AI SEO Title Generator",
    description: "Generate effective SEO titles to boost your content visibility.",
    link: "/tools/ai-seo-title-generator",
    badge: { text: "Popular", color: "bg-green-500" }
  },
  {
    icon: <Repeat className="h-8 w-8 text-indigo-500" />,
    title: "AI Paraphrasing Tool",
    description: "Rephrase your text in different writing styles to reach your audience.",
    link: "/tools/ai-paraphrasing-tool"
  }
]

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(42, 101, 230, 0.1) 1.5px, transparent 1.5px), 
            linear-gradient(to right, rgba(42, 101, 230, 0.1) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '30px 30px',
        }}
      />
      <div className="container mx-auto px-4 relative z-20">
        {/* Floating icons */}
        <div className="hidden lg:flex flex-col space-y-8 z-30 absolute left-0 top-1/2 transform -translate-y-1/2">
          <motion.a
            href="#"
            className="text-blue-600 hover:scale-110 transition-transform"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaFacebookF size={24} className="animate-pulse" />
          </motion.a>
          <motion.a
            href="#"
            className="text-sky-500 hover:scale-110 transition-transform"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTwitter size={24} className="animate-pulse" />
          </motion.a>
          <motion.a
            href="#"
            className="text-blue-700 hover:scale-110 transition-transform"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedinIn size={24} className="animate-pulse" />
          </motion.a>
          <motion.a
            href="#"
            className="text-pink-600 hover:scale-110 transition-transform"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaInstagram size={24} className="animate-pulse" />
          </motion.a>
        </div>

        {/* Main Content */}
        <div className="text-center w-full space-y-8">
          <div className="flex justify-center hero-bg">
            <span className="text-lg font-bold bg-clip-text text-transparent animate-gradient px-4 py-1.5 rounded-lg gradient-text text-small">
              TRUSTED BY CREATORS, PRAISED BY ALL
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold">
            Saze AI: Write Anything, <span className="text-blue-600">100% Free</span> 
          </h1>
          <p className="text-xl text-muted-foreground">
            Sazeai.com is a free AI platform designed to make your work and learning easier with unlimited access to our free ai tools.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="w-full sm:w-auto group bg-[#4f46e5] hover:bg-[#4338ca]">
              Explore Tools
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto group">
              Generate Image
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          {/* Bottom logo */}
          <div className="flex justify-center pt-8">
            <a href="https://www.producthunt.com/posts/saze-ai?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-saze-ai" target="_blank" rel="noopener noreferrer">
              <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=455121&theme=light" alt="Saze AI - AI-Powered Content Creation Tools for Writers and Creators | Product Hunt" style={{ width: '250px', height: '54px' }} width="250" height="54" />
            </a>
          </div>
        </div>
      </div>
    </section>
 
              

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-center mb-16 text-gray-900"
          >
            Why Choose <span className="text-blue-600">Saze AI</span>?
          </motion.h2>
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-3 gap-12"
          >
            {[
              { title: "40+ AI Tools", description: "Access a wide range of specialized AI writing tools", icon: Zap, color: "bg-yellow-400" },
              { title: "Boost Productivity", description: "Save time and effort in your writing process", icon: Rocket, color: "bg-green-400" },
              { title: "Enhance Quality", description: "Improve the clarity and impact of your content", icon: Sparkles, color: "bg-purple-400" },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeIn} className="relative">
                <div className="absolute inset-0 bg-white rounded-3xl shadow-xl transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <Card className="relative bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
                  <CardHeader className="pb-0">
                    <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mb-4`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold mb-2">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            How <span className="text-blue-600">Saze AI</span> Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 flex items-start"
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Toolkit Section */}
      <section className="py-20 bg-gray-50">
        <div className="min-h-screen py-16">
      
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-center animate-fade-in-down">
          Our Toolkit
        </h2>
        <p className="text-xl md:text-2xl mb-16 text-center max-w-3xl mx-auto animate-fade-in-up">
          Designed To Increase Your creativity and boost productivity.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {toolkit.map((tool, index) => (
  <Link key={index} href={toolkit.link} passHref >
    <Card className="group transition-all duration-300 hover:shadow-xl hover:scale-105">
      <CardHeader className="relative pb-0">
        <div className="absolute top-4 left-4 bg-gray-100 rounded-full p-3 transition-all duration-300 group-hover:scale-110">
          {toolkit.icon}
        </div>
        {toolkit.badge && (
          <Badge 
            variant="secondary" 
            className={`absolute top-4 right-4 text-xs font-semibold ${tool.badge.color} px-2 py-1 rounded-md`}
          >
            {toolkit.badge.text}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="pt-16">
        <CardTitle className="text-xl font-bold mb-2">{toolkit.title}</CardTitle>
        <CardDescription className="text-sm">{toolkit.description}</CardDescription>
      </CardContent>
    </Card>
  </Link>
))}
        </div>
     
    </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
          >
            AI Writing Use Cases
          </motion.h2>
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { title: "Content Marketing", description: "Create engaging blog posts, articles, and social media content with AI assistance.", icon:  PenTool },
              { title: "Academic Writing", description: "Improve essays, research papers, and theses with advanced language models.", icon: Book  },
              { title: "Business Communications", description: "Craft professional emails, reports, and presentations effortlessly.", icon: Mail },
              { 
                title: "Creative Writing",
                description: "Generate story ideas, overcome writer&apos;s block, and enhance your narrative.",
                icon: Sparkles
              },
              { title: "SEO Optimization", description: "Optimize your content for search engines and improve your online visibility.", icon: Zap },
              { title: "Product Descriptions", description: "Create compelling product descriptions that convert browsers into buyers.", icon: ShoppingBag },
            ].map((useCase, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <CardHeader>
                    <div className="rounded-full  bg-primary/10 p-3 w-12 h-12 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <useCase.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{useCase.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section  className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">LOVE IS IN THE SCALE</h2>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
              Trusted by <span className="text-blue-600">1 Mn+ marketers</span> of the world&apos;s leading brands
            </p>
          </motion.div>
          <div className="flex justify-end mb-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Try For Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-blue-50 border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <svg width="32" height="27" viewBox="0 0 32 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 26.0054V25.5054H0.5H10.5312C11.5367 25.5054 12.3617 24.6804 12.3617 23.6749V13.6437C12.3617 12.6382 11.5367 11.8132 10.5312 11.8132H0.5H0V11.3132V1.28205C0 0.276584 0.825 -0.548416 1.83047 -0.548416H30.1695C31.175 -0.548416 32 0.276584 32 1.28205V24.7233C32 25.7287 31.175 26.5537 30.1695 26.5537H1.83047C0.825 26.5537 0 25.7287 0 24.7233V26.0054Z" fill="#2563EB"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 mb-6">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 dark:from-purple-900/30 dark:to-pink-900/30" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Writing?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of writers who have already discovered the power of Saze AI. Start creating better content today!
            </p>
            <Link href="/signup">
              <Button size="lg" className="group">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
