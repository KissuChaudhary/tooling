"use client"

import React, { useState } from 'react'
import { Loader2, Clipboard, Check, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdUnit from '../components/AdUnit'


interface FormData {
  magicType: 'elemental' | 'necromancy' | 'illusion' | 'enchantment' | 'divination';
  personality: string;
  numberOfNames: string;
}

interface Errors {
  [key: string]: string;
}

export default function WizardGenerator() {
  const [formData, setFormData] = useState<FormData>({
    magicType: 'elemental',
    personality: '',
    numberOfNames: '5',
  });
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});


  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.personality.trim()) {
      newErrors.personality = 'Personality is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsLoading(true);
    setErrors({});
    setGeneratedNames([]);

    try {
      const response = await fetch('/api/openai-new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool: 'aiWizardNameGenerator',
          data: formData,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'An error occurred while generating wizard names');
      }
      setGeneratedNames(data.wizardNames);
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: error instanceof Error ? error.message : 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedNames.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight">Wizard Name Generator</h1>
      <p className="text-xl text-center mb-12 max-w-3xl mx-auto">Generate mystical and unique wizard names with our AI-powered Wizard Name Generator.</p>
      <AdUnit 
        client="ca-pub-7915372771416695"
        slot="8441706260"
        style={{ marginBottom: '20px' }}
      />

      
      <div className="flex flex-col md:flex-row gap-8">
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>Wizard Name Generator Input</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="magicType" className="text-sm font-medium text-gray-400">
                  Magic Type
                </Label>
                <Select
                  value={formData.magicType}
                  onValueChange={(value: 'elemental' | 'necromancy' | 'illusion' | 'enchantment' | 'divination') => setFormData(prev => ({ ...prev, magicType: value }))}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select magic type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elemental">Elemental</SelectItem>
                    <SelectItem value="necromancy">Necromancy</SelectItem>
                    <SelectItem value="illusion">Illusion</SelectItem>
                    <SelectItem value="enchantment">Enchantment</SelectItem>
                    <SelectItem value="divination">Divination</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="personality" className="text-sm font-medium text-gray-400">
                  Personality
                </Label>
                <Input
                  id="personality"
                  value={formData.personality}
                onChange={(e) => setFormData(prev => ({ ...prev, personality: e.target.value }))}
                  placeholder="Enter wizard personality"
                  className={`mt-1 ${errors.personality ? 'border-red-500' : ''}`}
                />
                {errors.personality && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.personality}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="numberOfNames" className="text-sm font-medium text-gray-400">
                  Number of Names
                </Label>
                <Select
                  value={formData.numberOfNames}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, numberOfNames: value }))}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select number of names" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : 'Generate Wizard Names'}
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
            <CardTitle>Generated Wizard Names</CardTitle>
          </CardHeader>
          <CardContent>
            {generatedNames.length > 0 ? (
              <>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                  <ul className="list-disc list-inside dark:text-gray-200">
                    {generatedNames.map((name, index) => (
                      <li key={index} className="mb-2">{name}</li>
                    ))}
                  </ul>
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
              <p className="text-gray-500 italic">Your generated wizard names will appear here.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
