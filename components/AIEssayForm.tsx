'use client'

import React, { useState } from 'react'
import { Loader2, Clipboard, Check, AlertCircle } from 'lucide-react'

interface FormData {
  topic: string
  keyPoints: string
  wordCount: number
}

interface Errors {
  [key: string]: string
}

const CHARACTER_LIMITS = {
  topic: 200,
  keyPoints: 500,
}

export default function AIEssayForm() {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    keyPoints: '',
    wordCount: 500,
  })
  const [generatedEssay, setGeneratedEssay] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)
  const [errors, setErrors] = useState<Errors>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === 'wordCount') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }))
    } else if (CHARACTER_LIMITS[name as keyof typeof CHARACTER_LIMITS] >= value.length) {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Errors = {}
    if (!formData.topic.trim()) {
      newErrors.topic = 'Topic is required'
    }
    if (!formData.keyPoints.trim()) {
      newErrors.keyPoints = 'Key points are required'
    }
    if (formData.wordCount < 100 || formData.wordCount > 2000) {
      newErrors.wordCount = 'Word count must be between 100 and 2000'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/openai-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, tool: 'aiEssay' }),
      })
      if (!response.ok) {
        throw new Error('Failed to generate essay')
      }
      const data = await response.json()
      setGeneratedEssay(data.essay)
    } catch (error) {
      console.error('Error:', error)
      setErrors({ submit: 'Failed to generate essay. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEssay)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight">AI Essay Writer</h1>
      <p className="text-xl text-center mb-12 max-w-3xl mx-auto">Generate well-structured essays with ease using our AI-powered tool.</p>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 h-full p-6 border border-gray-200 rounded-xl shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label htmlFor="topic" className="block text-sm font-medium text-gray-500 mb-1">
                Essay Topic
              </label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                maxLength={CHARACTER_LIMITS.topic}
                className={`block w-full px-4 py-3 rounded-md border ${errors.topic ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out`}
                placeholder="Enter your essay topic..."
              />
              <div className="absolute top-0 right-0 mt-1 mr-2 text-sm text-gray-500">
                {formData.topic.length}/{CHARACTER_LIMITS.topic}
              </div>
              {errors.topic && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.topic}
                </p>
              )}
            </div>
            <div className="relative">
              <label htmlFor="keyPoints" className="block text-sm font-medium text-gray-500 mb-1">
                Key Points
              </label>
              <textarea
                id="keyPoints"
                name="keyPoints"
                value={formData.keyPoints}
                onChange={handleChange}
                maxLength={CHARACTER_LIMITS.keyPoints}
                rows={4}
                className={`block w-full px-4 py-3 rounded-md border ${errors.keyPoints ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out`}
                placeholder="Enter key points for your essay..."
              />
              <div className="absolute top-0 right-0 mt-1 mr-2 text-sm text-gray-500">
                {formData.keyPoints.length}/{CHARACTER_LIMITS.keyPoints}
              </div>
              {errors.keyPoints && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.keyPoints}
                </p>
              )}
            </div>
            <div className="relative">
              <label htmlFor="wordCount" className="block text-sm font-medium text-gray-500 mb-1">
                Word Count
              </label>
              <input
                type="number"
                id="wordCount"
                name="wordCount"
                value={formData.wordCount}
                onChange={handleChange}
                min={100}
                max={2000}
                className={`block w-full px-4 py-3 rounded-md border ${errors.wordCount ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out`}
              />
              {errors.wordCount && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.wordCount}
                </p>
              )}
            </div>
            <button 
              type="submit" 
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" />
                  Generating...
                </>
              ) : 'Generate Essay'}
            </button>
            {errors.submit && (
              <p className="mt-2 text-sm text-red-600 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.submit}
              </p>
            )}
          </form>
        </div>
        <div className="w-full md:w-1/2">
          <div className="h-full p-6 border border-gray-200 rounded-xl shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Your Generated Essay:</h2>
              <button
                onClick={handleCopy}
                className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out"
                disabled={!generatedEssay}
              >
                {copied ? (
                  <>
                    <Check className="h-5 w-5 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Clipboard className="h-5 w-5 mr-1" />
                    Copy
                  </>
                )}
              </button>
            </div>
            {generatedEssay ? (
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap text-lg leading-relaxed">{generatedEssay}</p>
              </div>
            ) : (
              <p className="text-gray-500 italic">Your generated essay will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
