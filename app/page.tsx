import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Check, Star, Zap, Edit, Book, Sparkles, MessageSquare, FileText, PenTool, Mail, Share2, ShoppingBag } from "lucide-react"

export default function SazeAILandingPage() {
  return (
    
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-purple-800">Saze AI</div>
        <nav className="hidden md:flex space-x-6">
          <a href="#features" className="text-gray-600 hover:text-purple-800">Features</a>
          <a href="#tools" className="text-gray-600 hover:text-purple-800">Tools</a>
          <a href="#use-cases" className="text-gray-600 hover:text-purple-800">Use Cases</a>
        </nav>
        <Button>Get Started</Button>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Unleash the Power of AI in Your Writing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Saze AI offers over 40 cutting-edge AI text tools to enhance your writing, boost productivity, and unlock your creative potential.
          </p>
          <Link href="/tools">
          <Button size="lg">
            Explore AI Tools <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          </Link>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Saze AI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "40+ AI Tools", description: "Access a wide range of specialized AI writing tools", icon: Zap },
              { title: "Boost Productivity", description: "Save time and effort in your writing process", icon: Star },
              { title: "Enhance Quality", description: "Improve the clarity and impact of your content", icon: Check }
            ].map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all">
                <CardContent>
                  <feature.icon className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tools Showcase */}
        <section id="tools" className="bg-purple-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Explore Our AI Text Tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { name: "AI Text Improver", icon: Edit },
                { name: "AI Essay Writer", icon: Book },
                { name: "Grammar Checker", icon: Check },
                { name: "Paraphrasing Tool", icon: Sparkles },
                { name: "Summarizer", icon: FileText },
                { name: "Content Generator", icon: PenTool },
                { name: "Headline Optimizer", icon: Star },
                { name: "SEO Writer", icon: Zap },
                { name: "Story Generator", icon: MessageSquare },
                { name: "Email Composer", icon: Mail },
                { name: "Social Media Post Creator", icon: Share2 },
                { name: "Product Description Writer", icon: ShoppingBag }
              ].map((tool, index) => (
                <Card key={index} className="p-4 hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="flex flex-col items-center text-center">
                    <tool.icon className="h-10 w-10 mb-4 text-purple-600 group-hover:text-purple-800 transition-colors" />
                    <h3 className="font-semibold mb-2">{tool.name}</h3>
                    <Badge variant="secondary" className="group-hover:bg-purple-100">AI-Powered</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                View All 40+ Tools <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center mb-12">How Saze AI Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {[
              { step: 1, title: "Choose a Tool", description: "Select from our wide range of AI text tools" },
              { step: 2, title: "Input Your Content", description: "Paste your text or start writing from scratch" },
              { step: 3, title: "Let AI Work Its Magic", description: "Our advanced AI processes and enhances your content" },
              { step: 4, title: "Review and Edit", description: "Fine-tune the AI-generated results to perfection" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Alex Johnson", role: "Content Creator", quote: "Saze AI has revolutionized my writing process. I can now produce high-quality content in half the time!", rating: 5 },
              { name: "Sarah Lee", role: "Marketing Manager", quote: "The variety of tools available is impressive. Saze AI has become an indispensable part of our marketing strategy.", rating: 5 },
              { name: "Michael Chen", role: "Student", quote: "As a non-native English speaker, Saze AI helps me write better essays and improve my language skills.", rating: 4 }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg p-6">
                <CardContent>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
                    ))}
                  </div>
                  <p className="mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm">{testimonial.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


        {/* Use Cases Section */}
        <section id="use-cases" className="container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center mb-12">AI Writing Use Cases</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Content Marketing", description: "Create engaging blog posts, articles, and social media content with AI assistance.", icon: PenTool },
              { title: "Academic Writing", description: "Improve essays, research papers, and theses with advanced language models.", icon: Book },
              { title: "Business Communications", description: "Craft professional emails, reports, and presentations effortlessly.", icon: Mail },
              { title: "Creative Writing", description: "Generate story ideas, overcome writer's block, and enhance your narrative.", icon: Sparkles },
              { title: "SEO Optimization", description: "Optimize your content for search engines and improve your online visibility.", icon: Zap },
              { title: "Product Descriptions", description: "Create compelling product descriptions that convert browsers into buyers.", icon: ShoppingBag }
            ].map((useCase, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all">
                <CardContent>
                  <useCase.icon className="h-12 w-12 mb-4 text-purple-600" />
                  <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-gray-600">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-purple-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Writing?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied users and experience the power of Saze AI today.
            </p>
            <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
              Get Started for Free
            </Button>
          </div>
        </section>
      </main>

     
    </div>
   
  )
}
