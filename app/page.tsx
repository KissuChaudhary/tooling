'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { motion, Variants } from "framer-motion"
import {
  ArrowRight,
  Check,
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
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6"

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

  const tools = [
    { name: "Cruise Mode", icon: Clock },
    { name: "Keyword Planner", icon: Search },
    { name: "Content Optimizer", icon: PenTool },
    { name: "Traffic Analyzer", icon: BarChart2 },
    { name: "Link Manager", icon: LinkIcon },
    { name: "AI Humanizer", icon: UserCheck },
    { name: "OnPage Pro", icon: Layout },
  ]

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
        <div className="container mx-auto px-4 relative z-20 flex flex-col lg:flex-row items-center justify-between">
          {/* Floating icons */}
          <div className="hidden lg:flex flex-col fixed left-4 top-1/2 transform -translate-y-1/2 space-y-8 z-30">
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
          <div className="text-center lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[#1e3a8a]">
              Empower your business with Generative AI
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Harness the Potential of Large Language Models (LLMs) for Business Innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="w-full sm:w-auto group bg-[#4f46e5] hover:bg-[#4338ca]">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto group">
                Book a Demo
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Images */}
          <div className="lg:w-1/2 relative h-[400px]">
            <Image 
              src="/placeholder.svg?height=400&width=500" 
              alt="Business people working" 
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
            <Image 
              src="/placeholder.svg?height=200&width=300" 
              alt="AI assistant" 
              width={300} 
              height={200} 
              className="absolute -bottom-10 -left-10 rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Bottom logo */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <Image src="/placeholder.svg?height=30&width=100" alt="GPT logo" width={100} height={30} />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <motion.h2
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
        >
          Why Choose Saze AI?
        </motion.h2>
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            { title: "40+ AI Tools", description: "Access a wide range of specialized AI writing tools", icon: Zap },
            { title: "Boost Productivity", description: "Save time and effort in your writing process", icon: Rocket },
            { title: "Enhance Quality", description: "Improve the clarity and impact of your content", icon: Sparkles },
          ].map((feature, index) => (
            <motion.div key={index} variants={fadeIn}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <CardHeader className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-900/20 dark:to-pink-900/20 transform scale-95 group-hover:scale-100 transition-transform duration-300" />
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.h2
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
        >
          How Saze AI Works
        </motion.h2>
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="flex flex-col md:flex-row justify-center items-center gap-8"
        >
          {[
            { step: 1, title: "Choose a Tool", description: "Select from our wide range of AI text tools", icon: Zap },
            { step: 2, title: "Input Your Content", description: "Paste your text or start writing from scratch", icon: PenTool },
            { step: 3, title: "Let AI Work Its Magic", description: "Our advanced AI processes and enhances your content", icon: Sparkles },
            { step: 4, title: "Review and Edit", description: "Fine-tune the AI-generated results to perfection", icon: Check },
          ].map((item, index) => (
            <motion.div key={index} variants={fadeIn} className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4 relative">
                {item.step}
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-primary"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              </div>
              <item.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Our Toolkit Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">Our Toolkit</h2>
          <p className="text-xl text-center text-gray-600 mb-12">Designed To Increase Your Organic Traffic</p>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 space-y-2">
              {tools.map((tool, index) => (
                <div
                  key={index}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    index === 4 ? 'bg-black text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  <tool.icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{tool.name}</span>
                </div>
              ))}
            </div>
            
            <div className="w-full md:w-2/3">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Link Manager</h3>
                  <p className="text-gray-600 mb-6">
                    Drive sales and extend brand reach with convincing content that converts, driving success and engaging your audience.
                  </p>
                  <Button variant="default" className="bg-black text-white hover:bg-gray-800">
                    Try For Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
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
              { title: "Creative Writing", description: "Generate story ideas, overcome writer&apos;s block, and enhance your narrative.", icon: Sparkles },
              { title: "SEO Optimization", description: "Optimize your content for search engines and improve your online visibility.", icon: Zap },
              { title: "Product Descriptions", description: "Create compelling product descriptions that convert browsers into buyers.", icon: ShoppingBag },
            ].map((useCase, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <CardHeader>
                    <div className="rounded-full bg-primary/10 p-3 w-12 h-12 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
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
