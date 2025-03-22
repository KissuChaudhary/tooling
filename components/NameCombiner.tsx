"use client"

import React, { useState } from 'react'
import { Loader2, Clipboard, Check, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FormData {
  numberOfPeople: string;
  names: string[];
  numberOfNames: string;
}

interface Errors {
  [key: string]: string;
}

export default function NameCombiner() {
  const [formData, setFormData] = useState<FormData>({
    numberOfPeople: '2',
    names: ['', ''],
    numberOfNames: '5',
  });
  const [combinedNames, setCombinedNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});


  const handleNumberOfPeopleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      numberOfPeople: value,
      names: Array(parseInt(value)).fill('')
    }));
  };

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...formData.names];
    newNames[index] = value;
    setFormData(prev => ({ ...prev, names: newNames }));
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (formData.names.some(name => !name.trim())) {
      newErrors.names = 'All name fields are required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsLoading(true);
    setErrors({});
    setCombinedNames([]);

    try {
      const response = await fetch('/api/openai-new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool: 'aiNameCombiner',
          data: formData,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'An error occurred while combining names');
      }
      setCombinedNames(data.combinedNames);
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: error instanceof Error ? error.message : 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(combinedNames.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight">Name Combiner AI</h1>
      <p className="text-xl text-center mb-12 max-w-3xl mx-auto">Combine names creatively with our AI-powered Name Combiner.</p>
      

      
      <div className="flex flex-col md:flex-row gap-8">
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>Name Input</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="numberOfPeople" className="text-sm font-medium text-gray-400">
                  Number of People
                </Label>
                <Select
                  value={formData.numberOfPeople}
                  onValueChange={handleNumberOfPeopleChange}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select number of people" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.names.map((name, index) => (
                <div key={index}>
                  <Label htmlFor={`name-${index}`} className="text-sm font-medium text-gray-400">
                    Name {index + 1}
                  </Label>
                  <Input
                    id={`name-${index}`}
                    value={name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    placeholder={`Enter name ${index + 1}`}
                    className={`mt-1 ${errors.names ? 'border-red-500' : ''}`}
                  />
                </div>
              ))}
              {errors.names && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.names}
                </p>
              )}
              <div>
                <Label htmlFor="numberOfNames" className="text-sm font-medium text-gray-400">
                  Number of Combined Names
                </Label>
                <Select
                  value={formData.numberOfNames}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, numberOfNames: value }))}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select number of combined names" />
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
                    Combining...
                  </>
                ) : 'Combine Names'}
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
            <CardTitle>Combined Names</CardTitle>
          </CardHeader>
          <CardContent>
            {combinedNames.length > 0 ? (
              <>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                  <ul className="list-disc list-inside">
                    {combinedNames.map((name, index) => (
                      <li key={index} className="mb-2 text-gray-900 dark:text-gray-100">{name}</li>
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
              <p className="text-gray-500 italic">Your combined names will appear here.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
