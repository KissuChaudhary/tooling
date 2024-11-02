'use client'

import WebApplicationSchema from './WebApplicationSchema'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { motion, Variants } from "framer-motion"
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaGoogle, FaTumblr, FaRobot } from "react-icons/fa6"
import {
  ArrowRight,
  Heart,
  Brain,
  Lightbulb,
  Check,
  MessageSquare,
  BookOpen,
  Feather,
  Star,
  Volume2,
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
  Search,
  ChevronDown,
  Image
} from "lucide-react"


export default function Page() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
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
      quote: "Saze Al has revolutionized my writing process. I can now produce high-quality content in half the time!",
      name: "Alex Johnson",
      role: "Content Creator",
    
    },
    {
      quote: "The variety of tools available is impressive. Saze Al has become an indispensable part of our marketing strategy.",
      name: "Carlos U.",
      role: "Marketing Manager",
     
    },
    {
      quote: "As a non-native English speaker, Saze Al helps me write better essays and improve my language skills.",
      name: "Kavitha R.",
      role: "Student",
     
    }
  ]

const steps = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Choose a Tool",
      description: "Select from our wide range of AI text tools",
    },
    {
      icon: <Pencil className="h-8 w-8" />,
      title: "Input Your Content",
      description: "Paste your text or start writing from scratch",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Let AI Work Its Magic",
      description: "Our advanced AI processes and enhances your content",
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Review and Edit",
      description: "Fine-tune the AI-generated results to perfection",
    },
  ]
  const toolkit = [
    {
    icon: <Image className="h-8 w-8 text-blue-500" />,
    title: "AI Influencer Generator",
    description: "Create Realistic Social Media AI Influencer",
    link: "/tools/ai-influencer-generator",
    badge: { text: "Popular", color: "bg-green-500" }
  },
{
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
    title: "AI Face Transform",
    description: "Redefine Your Look with AI – Transform Faces into Stunning Creations!",
    link: "/tools/ai-face-transform",
    badge: { text: "Popular", color: "bg-pink-500" }
  },
  {
    icon: <Feather className="h-8 w-8 text-pink-500" />,
    title: "AI Image Upscaler",
    description: "Transform Low-Res into High-Def – Upscale Your Images with AI!",
    link: "/tools/ai-image-upscaler",
    badge: { text: "Hot", color: "bg-red-500" }
  },
  {
    icon: <Star className="h-8 w-8 text-yellow-500" />,
    title: "AI Background Remover",
    description: "Effortless Background Removal for Flawless Photos – Instantly!",
    link: "/tools/ai-background-remover",
    badge: { text: "Popular", color: "bg-pink-500" }
  },
    {
    icon: <Volume2 className="h-8 w-8 text-yellow-500" />,
    title: "AI Image Generator",
    description: "Free AI Image Generator for creative minds.",
    link: "/tools/ai-image-generator",
    badge: { text: "Hot", color: "bg-blue-500" }
  },
  {
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
    title: "AI Essay Writer",
    description: "Generate well-structured essays on any topic with ease.",
    link: "/tools/ai-essay-writer",
    badge: { text: "Popular", color: "bg-green-500" }
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
    link: "/tools/ai-pickup-lines-generator"
  },

  {
    icon: <MessageSquare className="h-8 w-8 text-indigo-500" />,
    title: "AI Answer Generator",
    description: "Receive precise answers to your questions using AI.",
    link: "/tools/ai-answer-generator"
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

const [openQuestions, setOpenQuestions] = useState<{[key: number]: number | null}>({0: null, 1: null})


const faqData = [
    {
      question: "How does Saze AI generate responses?",
      answer: "The Saze AI generates responses based on the input it receives, it is using Openai API and Gemini API to provide relevant answers to your questions."
    },
    {
      question: "Is Saze AI Free to use?",
      answer: "Yes, All AI tools available on Saze AI are completely free to use."
    },
    {
      question: "Can I use the AI tools for commercial purposes?",
      answer: "Yes, all AI tools on SazeAI are free to use for both personal and commercial purposes."
    },
    {
      question: "Is my data safe when using the AI tools?",
      answer: "Yes, We don't collect any of your data. We are using third party API from openai, they may store the data for a period of time generated by our tools. For check openai's usage policy."
    },
    {
      question: "Do I need to create an account to use the AI tools?",
      answer: "No, you can use all the AI tools on SazeAI without creating an account."
    },
    {
      question: "Are there any usage limits on the AI tools?",
      answer: "No, There is no usage limit for available ai tools at Saze AI."
    },
    {
      question: "Does Saze AI read or write in other languages?",
      answer: "Saze AI supports multiple languages for both reading and writing, enhancing its usability across different regions."
    },
    {
      question: "Are the AI tools compatible with all devices?",
      answer: "Our AI tools are designed to be compatible with a wide range of devices, including desktops, laptops, tablets, and smartphones. However, some tools may perform better on certain devices."
    }
  ]

  const toggleQuestion = (index: number) => {
    const column = Math.floor(index / (faqData.length / 2))
    setOpenQuestions(prev => ({
      ...prev,
      [column]: prev[column] === index ? null : index
    }))
  }
  

  return (
    <div className="bg-background text-foreground">
      <WebApplicationSchema />
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
            className="text-blue-600 bg-white p-3 rounded-lg shadow-lg hover:scale-110 transition-transform"
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
            className="relative text-sky-500 bg-white p-3 rounded-lg shadow-lg hover:scale-110 transition-transform"
            style={{ left: '-9rem' }}
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
            className="text-blue-700 bg-white p-3 rounded-lg shadow-lg hover:scale-110 transition-transform"
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
            className="relative text-pink-600 bg-white p-3 rounded-lg shadow-lg hover:scale-110 transition-transform"
            style={{ left: '-9rem' }}
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
            Saze AI: Write Anything, <span className="text-primary">100% Free</span> 
          </h1>
          <p className="text-xl text-muted-foreground">
            Sazeai.com is a free AI platform designed to make your work and learning easier with unlimited access to our free ai tools.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/tools">
      <Button size="lg" className="w-full sm:w-auto  group bg-primary">
        Explore Tools
        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Button>
    </Link>
    <Link href="/tools/ai-influencer-generator">
      <Button size="lg" variant="outline" className="w-full sm:w-auto group">
        Create AI Influencer
        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Button>
    </Link>
          </div>
          {/* Bottom logo */}
<div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
      <a 
        href="https://theresanaiforthat.com/ai/sazeai/?ref=featured&v=3010829" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex-shrink-0"
      >
        <img 
          width={300} 
          height={65} 
          src="https://media.theresanaiforthat.com/featured-on-taaft.png?width=600" 
          alt="Featured on There's an AI for That"
          className="w-[300px] h-auto"
        />
      </a>
      <a 
        href="https://www.producthunt.com/products/saze-ai/reviews?utm_source=badge-product_review&utm_medium=badge&utm_souce=badge-saze-ai" 
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0"
      >
        <img 
          src="https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=581923&theme=light" 
          alt="Saze AI - Free AI Writer | Best Free AI Content Generator Tools | Product Hunt" 
          width={250}
          height={54}
          className="w-[250px] h-[54px]"
        />
      </a>
    </div>
          <div className="hidden lg:flex flex-col space-y-8 z-30 absolute right-0 top-1/2 transform -translate-y-1/2">
          <motion.a
            href="#"
            className="text-red-600 bg-white p-3 rounded-lg shadow-lg hover:scale-110 transition-transform"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaYoutube size={24} className="animate-pulse" />
          </motion.a>
          <motion.a
            href="#"
            className="relative text-sky-500 bg-white p-3 rounded-lg shadow-lg hover:scale-110 transition-transform"
            style={{ left: '9rem' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaRobot size={24} className="animate-pulse" />
          </motion.a>
          <motion.a
            href="#"
            className="text-pink-700 bg-white p-3 rounded-lg shadow-lg hover:scale-110 transition-transform"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTumblr size={24} className="animate-pulse" />
          </motion.a>
          <motion.a
            href="#"
            className="relative text-dark-700 bg-white p-3 rounded-lg shadow-lg hover:scale-110 transition-transform"
            style={{ left: '9rem' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGoogle size={24} className="animate-pulse" />
          </motion.a>
        </div>
        </div>
      </div>
    </section>
 
              

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-center mb-16"
          >
            Why Choose <span className="text-primary">Saze AI</span>?
          </motion.h2>
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-3 gap-12"
          >
            {[
              { title: "40+ AI Tools", description: "Access a wide range of AI writing tools", icon: Zap, color: "bg-yellow-400" },
              { title: "Boost Productivity", description: "Save time and effort in your writing process", icon: Rocket, color: "bg-green-400" },
              { title: "Enhance Quality", description: "Improve the clarity and impact of your content", icon: Sparkles, color: "bg-purple-400" },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeIn} className="relative">
                <div className="absolute inset-0 bg-card text-card-foreground shadow-sm transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <Card className="relative rounded-3xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
                  <CardHeader className="pb-0">
                    <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mb-4`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold mb-2">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

     <section className="py-16 px-4 bg-gradient-to-br from-gray-900 to-black dark:from-gray-800 dark:to-black text-white min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          How Saze AI Works
        </h2>
        <div className="relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="mb-16 flex items-center gap-8 relative z-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                onHoverStart={() => setHoveredStep(index)}
                onHoverEnd={() => setHoveredStep(null)}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative z-10">
                  {React.cloneElement(step.icon, { className: "h-8 w-8 text-white" })}
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full bg-blue-500 blur-md z-0"
                  animate={{
                    scale: hoveredStep === index ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 1, repeat: hoveredStep === index ? Infinity : 0 }}
                />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            </motion.div>
          ))}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600" />
        </div>
      </div>
    </section>

      {/* Our Toolkit Section */}
      <section className="py-20 bg-gray-50 bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
  <div className="container mx-auto px-6">
    <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-center animate-fade-in-down">
      Our Toolkit
    </h2>
    <p className="text-xl md:text-2xl mb-16 text-center max-w-3xl mx-auto animate-fade-in-up">
      Designed To Increase Your creativity and boost productivity.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {toolkit?.map((tool, index) => (
        <Link key={index} href={tool.link} passHref>
          <Card className="group transition-all duration-300 hover:shadow-xl hover:scale-105">
            <CardHeader className="relative pb-0">
              <div className="absolute top-4 left-4 bg-gray-100 rounded-full p-3 transition-all duration-300 group-hover:scale-110">
                {tool.icon}
              </div>
              {tool.badge && (
                <Badge 
                  variant="secondary" 
                  className={`absolute top-4 right-4 text-xs font-semibold ${tool.badge.color} px-2 py-1 rounded-md`}
                >
                  {tool.badge.text}
                </Badge>
              )}
            </CardHeader>
            <CardContent className="pt-16">
              <CardTitle className="text-xl font-bold mb-2">{tool.title}</CardTitle>
              <CardDescription className="text-sm">{tool.description}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
    <div className="flex flex-col mt-12 sm:flex-row gap-4 justify-center">
    
    <Button asChild size="lg">
            <Link href="/tools" className="inline-flex items-center">
            ALL AI Tools
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
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

      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-sm font-semibold text-primary mb-2">
            SAZE AI TEXT TO SPEECH
          </h2>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AI Text-to-speech Speech: Transform Text into Natural Sound
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Turn your text into natural, human-like speech with our AI tool. It's perfect for making your presentations, videos, and more sound professional. Choose from multiple languages and voices to get the right tone. Simple to use and customize, it brings your words to life just the way you want.
          </p>
          <Button asChild size="lg">
            <Link href="/tools/ai-text-to-speech" className="inline-flex items-center">
              Try Text-to-speech
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>

      {/* Testimonials Section */}
      <section  className="py-20 bg-gray-50 bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-primary font-semibold flex items-center justify-center">
          LOVE IS IN THE WORDS <Heart className="w-4 h-4 text-red-500 ml-1" />
        </p>
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              Experience <span className="text-primary">The Difference</span> Through Our Users&apos; Eyes
            </h2>
          </motion.div>
        
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
               <Card key={index} className="bg-blue-50 border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <svg width="32" height="27" viewBox="0 0 32 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 26.0054V25.5054H0.5H10.5312C11.5367 25.5054 12.3617 24.6804 12.3617 23.6749V13.6437C12.3617 12.6382 11.5367 11.8132 10.5312 11.8132H0.5H0V11.3132V1.28205C0 0.276584 0.825 -0.548416 1.83047 -0.548416H30.1695C31.175 -0.548416 32 0.276584 32 1.28205V24.7233C32 25.7287 31.175 26.5537 30.1695 26.5537H1.83047C0.825 26.5537 0 25.7287 0 24.7233V26.0054Z" fill="#3362c9"/>
                    </svg>
                  </div>
                  <div>
                      <p className=" mb-6">{testimonial.quote}</p>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

{/* FAQ Section */}
 
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 text-gray-800 dark:text-gray-200">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">Have more questions? Feel free to email us!</p>
          <div className="grid md:grid-cols-2 gap-6">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full text-left p-4 focus:outline-none flex justify-between items-center text-card-foreground"
                  onClick={() => toggleQuestion(index)}
                >
                  <span className="font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      openQuestions[Math.floor(index / (faqData.length / 2))] === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openQuestions[Math.floor(index / (faqData.length / 2))] === index && (
                  <div className="p-4 bg-gray-100 dark:bg-gray-700">
                    <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
