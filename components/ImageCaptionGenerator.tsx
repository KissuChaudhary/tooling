"use client"

import React, { useState, useRef } from 'react'
import { Loader2, Upload, AlertCircle, ImageIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ImageCaptionGenerator() {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'url' | 'upload'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageUrl && !file) {
      setError('Please enter an image URL or upload an image');
      return;
    }

    setIsLoading(true);
    setError(null);
    setCaption('');

    try {
      let requestBody: { imageData?: string; mimeType?: string; imageUrl?: string } = {};

      if (file) {
        const reader = new FileReader();
        const imageData = await new Promise<string>((resolve, reject) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(file);
        });
        requestBody = { imageData, mimeType: file.type };
      } else if (imageUrl) {
        requestBody = { imageUrl };
      } else {
        throw new Error('No image source provided');
      }

      const response = await fetch('/api/image-caption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate caption');
      }

      const data = await response.json();
      setCaption(data.caption);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size exceeds the 5MB limit');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(selectedFile.type)) {
        setError('Invalid file type. Only JPEG, PNG, and WebP are allowed');
        return;
      }
      setFile(selectedFile);
      setImageUrl(''); // Clear the URL when a file is selected
      setError(null);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setFile(null); // Clear the file when a URL is entered
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight">Image Caption Generator</h1>
      <p className="text-xl text-center mb-12 max-w-3xl mx-auto">Generate detailed captions for your images using AI.</p>

      <Card>
        <CardHeader>
          <CardTitle>Upload an Image or Provide URL</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'url' | 'upload')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url">Image URL</TabsTrigger>
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
            </TabsList>
            <form onSubmit={handleSubmit} className="space-y-6">
              <TabsContent value="url">
                <div>
                  <Label htmlFor="imageUrl" className="text-sm font-medium text-gray-400">
                    Image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    value={imageUrl}
                    onChange={handleUrlChange}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                  />
                </div>
              </TabsContent>
              <TabsContent value="upload">
                <div>
                  <Label htmlFor="file" className="text-sm font-medium text-gray-400">
                    Upload Image
                  </Label>
                  <div className="mt-1 flex items-center">
                    <Input
                      id="file"
                      type="file"
                      onChange={handleFileChange}
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      ref={fileInputRef}
                    />
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {file ? 'Change Image' : 'Select Image'}
                    </Button>
                  </div>
                  {file && (
                    <p className="mt-2 text-sm text-gray-500">
                      Selected file: {file.name}
                    </p>
                  )}
                </div>
              </TabsContent>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Caption...
                  </>
                ) : (
                  <>
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Generate Caption
                  </>
                )}
              </Button>
            </form>
          </Tabs>

          {error && (
            <Alert variant="destructive" className="mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {(imageUrl || file) && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Image Preview</h3>
              <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                {imageUrl ? (
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : file ? (
                  <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                ) : null}
              </div>
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
