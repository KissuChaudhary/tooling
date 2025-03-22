"use client"

import React, { useState } from 'react'
import { Loader2, Clipboard, Check, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdUnit from '../components/AdUnit'

interface FormData {
  target: string;
  tone: string;
  context: string;
  personalDetails: string;
  language: string;
  specificCompliments: string;
}

interface Errors {
  [key: string]: string;
}

const characterLimit = 200;

export default function RizzGenerator() {
  const [formData, setFormData] = useState<FormData>({
    target: '',
    tone: '',
    context: '',
    personalDetails: '',
    language: '',
    specificCompliments: '',
  });
  const [characterCounts, setCharacterCounts] = useState({
    personalDetails: 0,
    specificCompliments: 0,
  });
  const [generatedRizz, setGeneratedRizz] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'personalDetails' || name === 'specificCompliments') {
      setCharacterCounts(prev => ({
        ...prev,
        [name]: value.length,
      }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.target) newErrors.target = 'Target is required';
    if (!formData.tone) newErrors.tone = 'Tone is required';
    if (!formData.context) newErrors.context = 'Context is required';
    if (!formData.language) newErrors.language = 'Language is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    setGeneratedRizz('');

    try {
      const response = await fetch('/api/openai-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool: 'aiRizzGenerator',
          model: 'gemini',
          data: formData,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'An error occurred while generating the rizz');
      }
      setGeneratedRizz(data.rizz);
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: error instanceof Error ? error.message : 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedRizz);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight">AI Rizz Generator</h1>
      <p className="text-xl text-center mb-12 max-w-3xl mx-auto">Generate Smooth, Personalized Flirty Messages with Saze AI – Boost Your Charisma Game!</p>
      <AdUnit 
        client="ca-pub-7915372771416695"
        slot="8441706260"
        style={{ marginBottom: '20px' }}
      />

      <div className="flex flex-col md:flex-row gap-8">
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>Rizz Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="target">Who is the Rizz for?</Label>
                <Select onValueChange={(value) => handleInputChange('target', value)}>
                  <SelectTrigger id="target" className={errors.target ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select target" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crush">Crush</SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                  </SelectContent>
                </Select>
                {errors.target && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.target}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="tone">Tone of Rizz</Label>
                <Select onValueChange={(value) => handleInputChange('tone', value)}>
                  <SelectTrigger id="tone" className={errors.tone ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="playful">Playful</SelectItem>
                    <SelectItem value="sincere">Sincere</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="smooth">Smooth</SelectItem>
                    <SelectItem value="charming">Charming</SelectItem>
                    <SelectItem value="witty">Witty</SelectItem>
                    <SelectItem value="flirty">Flirty</SelectItem>
                    <SelectItem value="romantic">Romantic</SelectItem>
                    <SelectItem value="confident">Confident</SelectItem>
                    <SelectItem value="mysterious">Mysterious</SelectItem>
                    <SelectItem value="teasing">Teasing</SelectItem>
                    <SelectItem value="sweet">Sweet</SelectItem>
                    <SelectItem value="bold">Bold</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="poetic">Poetic</SelectItem>
                  </SelectContent>
                </Select>
                {errors.tone && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.tone}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="context">Where will the Rizz be used?</Label>
                <Select onValueChange={(value) => handleInputChange('context', value)}>
                  <SelectTrigger id="context" className={errors.context ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select context" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text message</SelectItem>
                    <SelectItem value="social">Social media</SelectItem>
                    <SelectItem value="dating">Dating app</SelectItem>
                  </SelectContent>
                </Select>
                {errors.context && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.context}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="personalDetails">Personal details (optional)</Label>
                <div className="relative">
                  <Textarea
                    id="personalDetails"
                    value={formData.personalDetails}
                    onChange={(e) => handleInputChange('personalDetails', e.target.value)}
                    placeholder="Enter any specific personal details..."
                    className="resize-none"
                    maxLength={characterLimit}
                  />
                  <p className={`absolute right-0 -bottom-5 text-xs ${characterCounts.personalDetails === characterLimit ? 'text-orange-500' : 'text-gray-500'}`}>
                    {characterCounts.personalDetails}/{characterLimit}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select onValueChange={(value) => handleInputChange('language', value)}>
                  <SelectTrigger id="language" className={errors.language ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
  <SelectItem value="english">English</SelectItem>
  <SelectItem value="spanish">Spanish</SelectItem>
  <SelectItem value="french">French</SelectItem>
  <SelectItem value="german">German</SelectItem>
  <SelectItem value="italian">Italian</SelectItem>
  <SelectItem value="portuguese">Portuguese</SelectItem>
  <SelectItem value="chinese">Chinese</SelectItem>
  <SelectItem value="japanese">Japanese</SelectItem>
  <SelectItem value="korean">Korean</SelectItem>
  <SelectItem value="russian">Russian</SelectItem>
  <SelectItem value="arabic">Arabic</SelectItem>
  <SelectItem value="hindi">Hindi</SelectItem>
  <SelectItem value="turkish">Turkish</SelectItem>
  <SelectItem value="dutch">Dutch</SelectItem>
  <SelectItem value="swedish">Swedish</SelectItem>
  <SelectItem value="polish">Polish</SelectItem>
</SelectContent>
                </Select>
                {errors.language && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.language}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="specificCompliments">Specific compliments (optional)</Label>
                <div className="relative">
                  <Textarea
                    id="specificCompliments"
                    value={formData.specificCompliments}
                    onChange={(e) => handleInputChange('specificCompliments', e.target.value)}
                    placeholder="Enter any specific compliments..."
                    className="resize-none"
                    maxLength={characterLimit}
                  />
                  <p className={`absolute right-0 -bottom-5 text-xs ${characterCounts.specificCompliments === characterLimit ? 'text-orange-500' : 'text-gray-500'}`}>
                    {characterCounts.specificCompliments}/{characterLimit}
                  </p>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : 'Generate Rizz'}
              </Button>
              {errors.submit && (
                <p className="mt-2 text-sm text-red-600 flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.submit}
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>Generated Rizz</CardTitle>
          </CardHeader>
          <CardContent>
            {generatedRizz ? (
              <>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                  <p className="whitespace-pre-wrap dark:text-gray-200">{generatedRizz}</p>
                </div>
                <Button onClick={handleCopy} variant="outline" className="w-full">
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Clipboard className="mr-2 h-4 w-4" />
                      Copy to Clipboard
                    </>
                  )}
                </Button>
              </>
            ) : (
              <p className="text-gray-500 italic">Your generated rizz will appear here.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
