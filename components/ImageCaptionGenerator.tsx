"use client"

import React, { useState } from 'react'
import { Loader2, Upload, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ImageCaptionGenerator() {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [caption, setCaption] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageUrl) {
      setError('Please enter an image URL');
      return;
    }

    setIsLoading(true);
    setError(null);
    setCaption('');

    try {
      const response = await fetch('/api/image-caption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate caption');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setCaption(data.caption);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight">Image Caption Generator</h1>
      <p className="text-xl text-center mb-12 max-w-3xl mx-auto">Generate detailed captions for your images using AI.</p>

      <Card>
        <CardHeader>
          <CardTitle>Upload an Image</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="imageUrl" className="text-sm font-medium text-gray-400">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Caption...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Generate Caption
                </>
              )}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {imageUrl && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Image Preview</h3>
              <img src={imageUrl} alt="Preview" className="w-full h-auto rounded-lg shadow-md" />
            </div>
          )}

          {caption && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Generated Caption</h3>
              <p className="text-gray-700 bg-gray-100 p-4 rounded-lg">{caption}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
