'use client'

import React, { useState, useEffect } from 'react'
import { Loader2, Download, Mic } from 'lucide-react'
import * as sdk from 'microsoft-cognitiveservices-speech-sdk'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import AdUnit from '@/components/AdUnit'


interface Voice {
  Name: string
  DisplayName: string
  LocalName: string
  ShortName: string
  Gender: string
  Locale: string
}

const EnhancedAzureTextToSpeech = () => {
  const [text, setText] = useState('')
  const [voices, setVoices] = useState<Voice[]>([])
  const [selectedVoice, setSelectedVoice] = useState('')
  const [pitch, setPitch] = useState(0)
  const [rate, setRate] = useState(0)
  const [volume, setVolume] = useState(100)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [audioUrl, setAudioUrl] = useState('')

  useEffect(() => {
    fetchVoices()
  }, [])

  const fetchVoices = async () => {
    try {
      const response = await fetch('/api/get-voices')
      if (!response.ok) {
        throw new Error('Failed to fetch voices')
      }
      const data = await response.json()
      setVoices(data.voices)
      if (data.voices.length > 0) {
        setSelectedVoice(data.voices[0].ShortName)
      }
    } catch (error) {
      console.error('Error fetching voices:', error)
      setError('Failed to fetch voices. Please try again later.')
    }
  }

  const synthesizeSpeech = async () => {
    setIsLoading(true)
    setError('')
    setAudioUrl('')

    const speechConfig = sdk.SpeechConfig.fromSubscription(
      process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY!,
      process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION!
    )
    speechConfig.speechSynthesisVoiceName = selectedVoice

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig)

    const ssml = `
      <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
        <voice name="${selectedVoice}">
          <prosody pitch="${pitch}%" rate="${rate}%" volume="${volume}%">
            ${text}
          </prosody>
        </voice>
      </speak>
    `

    synthesizer.speakSsmlAsync(
      ssml,
      result => {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          const blob = new Blob([result.audioData], { type: 'audio/wav' })
          const url = URL.createObjectURL(blob)
          setAudioUrl(url)
        } else {
          setError('Speech synthesis canceled, did not complete, or error occurred')
          console.error('Speech synthesis error:', result.errorDetails)
        }
        synthesizer.close()
        setIsLoading(false)
      },
      error => {
        console.error('Speech synthesis error:', error)
        synthesizer.close()
        setIsLoading(false)
        setError('An error occurred during speech synthesis')
      }
    )
  }

  const handleDownload = () => {
    if (audioUrl) {
      const link = document.createElement('a')
      link.href = audioUrl
      link.download = 'synthesized_speech.wav'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        <div>
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center">
            <Mic className="w-8 h-8 mr-2 text-blue-500 dark:text-blue-400" />
            Saze AI Text-to-Speech Synthesizer
          </h2>
          
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <Label htmlFor="text" className="sr-only">Text to Synthesize</Label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to convert to speech..."
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="voice" className="sr-only">Voice</Label>
            <Select value={selectedVoice} onValueChange={setSelectedVoice}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                {voices.map((voice) => (
                  <SelectItem key={voice.ShortName} value={voice.ShortName}>
                    {voice.DisplayName} ({voice.Locale})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="pitch" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Pitch ({pitch}%)</Label>
              <Slider
                id="pitch"
                min={-50}
                max={50}
                step={1}
                value={[pitch]}
                onValueChange={(value) => setPitch(value[0])}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="rate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rate ({rate}%)</Label>
              <Slider
                id="rate"
                min={-50}
                max={50}
                step={1}
                value={[rate]}
                onValueChange={(value) => setRate(value[0])}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="volume" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Volume ({volume}%)</Label>
              <Slider
                id="volume"
                min={0}
                max={100}
                step={1}
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Button
              onClick={synthesizeSpeech}
              disabled={isLoading || !text.trim()}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Synthesizing...
                </>
              ) : (
                'Synthesize Speech'
              )}
            </Button>
          </div>
          {audioUrl && (
            <div className="mt-4">
              <audio controls src={audioUrl} className="w-full mb-4" />
              <Button onClick={handleDownload} className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-900">
                <Download className="mr-2 h-5 w-5" />
                Download Audio
              </Button>
            </div>
          )}
          {error && <p className="mt-2 text-center text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
      </div>

    </div>
  )
}

export default EnhancedAzureTextToSpeech