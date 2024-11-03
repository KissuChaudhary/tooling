'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from 'ai/react'
import Image from 'next/image'
import { Send, Upload, Copy, Share2, Check, Trash2, ImageIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger,
  TooltipProvider 
} from '@/components/ui/tooltip'
import { ScrollArea } from '@/components/ui/scroll-area'
import AdUnit from '@/components/AdUnit'

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: '/api/chat',
    initialMessages: [],
    body: { imageUrl },
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const copyToClipboard = (text: string, messageId: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    }).catch(err => {
      console.error('Failed to copy text: ', err)
    })
  }

  const shareMessage = (text: string) => {
    if (navigator.share) {
      navigator.share({
        text: text,
      }).then(() => {
        console.log('Shared successfully')
      }).catch((error) => {
        console.error('Error sharing:', error)
      })
    } else {
      alert('Web Share API not supported in your browser')
    }
  }

  const handleReset = () => {
    setImageUrl(null)
    setMessages([])
  }

  return (
    <TooltipProvider>
      <AdUnit 
          client="ca-pub-7915372771416695"
          slot="8441706260"
          style={{ marginBottom: '20px' }}
        />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
        <main className="container mx-auto px-4 max-w-6xl">
          <Card className="border-none shadow-xl">
            <CardHeader className="border-b bg-white rounded-t-xl">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  AI Image Chat
                </CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleReset}
                      className="hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reset chat and image</TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Image Upload Section */}
                <div className="space-y-4">
                  <div 
                    className={`aspect-square relative rounded-xl border-2 border-dashed transition-all duration-300 ${
                      imageUrl 
                        ? 'border-blue-200 bg-blue-50/50' 
                        : 'border-gray-200 hover:border-blue-300 bg-gray-50 hover:bg-blue-50/30'
                    }`}
                  >
                    {imageUrl ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={imageUrl}
                          alt="Uploaded image"
                          fill
                          className="object-contain p-2 rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <label className="cursor-pointer bg-white/90 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white transition-colors">
                            <Upload className="w-4 h-4" />
                            <span className="text-sm">Change Image</span>
                            <input
                              type="file"
                              onChange={handleImageUpload}
                              accept="image/*"
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                        <div className="bg-blue-100/50 p-4 rounded-full">
                          <ImageIcon className="w-8 h-8 text-blue-500" />
                        </div>
                        <span className="mt-4 text-sm text-gray-600">Drop your image here or click to browse</span>
                        <span className="mt-2 text-xs text-gray-400">Supports JPG, PNG, GIF</span>
                        <input
                          type="file"
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Chat Section */}
                <div className="flex flex-col h-[600px] bg-gray-50 rounded-xl border border-gray-100">
                  <ScrollArea className="flex-1 p-4 pb-20 md:pb-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                              message.role === 'user'
                                ? 'bg-blue-500 text-white rounded-br-none shadow-sm'
                                : 'bg-white border border-gray-100 text-gray-700 rounded-bl-none shadow-sm'
                            } relative group`}
                          >
                            {message.content}
                            <div className="absolute -bottom-8 right-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 bg-white shadow-sm hover:bg-gray-50"
                                    onClick={() => copyToClipboard(message.content, message.id)}
                                  >
                                    {copiedMessageId === message.id ? (
                                      <Check className="w-3 h-3 text-green-500" />
                                    ) : (
                                      <Copy className="w-3 h-3 text-gray-500" />
                                    )}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Copy message</TooltipContent>
                              </Tooltip>
                              
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 bg-white shadow-sm hover:bg-gray-50"
                                    onClick={() => shareMessage(message.content)}
                                  >
                                    <Share2 className="w-3 h-3 text-gray-500" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Share message</TooltipContent>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-2 rounded-bl-none shadow-sm">
                            <div className="flex gap-1">
                              {[0, 1, 2].map((i) => (
                                <div
                                  key={i}
                                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                                  style={{ animationDelay: `${i * 150}ms` }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  <div className="p-4 border-t bg-white rounded-b-xl fixed bottom-0 left-0 right-0 md:relative">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask about the image..."
                        className="flex-1"
                      />
                      <Button 
                        type="submit"
                        size="icon"
                        className="rounded-full w-10 h-10 bg-blue-500 hover:bg-blue-600"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </TooltipProvider>
  )
}
