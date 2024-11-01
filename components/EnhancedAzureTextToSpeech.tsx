'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Loader2, Download, Mic, AlertCircle } from 'lucide-react'
import * as sdk from 'microsoft-cognitiveservices-speech-sdk'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import AdUnit from '@/components/AdUnit'

interface Voice {
  Name: string
  DisplayName: string
  LocalName: string
  ShortName: string
  Gender: string
  Locale: string
}

interface SynthesisRequest {
  id: string
  text: string
  voice: string
  pitch: number
  rate: number
  volume: number
}

const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second
const RATE_LIMIT_DELAY = 5000 // 5 seconds between requests
const MAX_WORDS = 200
const MAX_CHARACTERS = 1000

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
  const [queuePosition, setQueuePosition] = useState(0)
  const [queueLength, setQueueLength] = useState(0)
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)

  const synthesisQueue = useRef<SynthesisRequest[]>([])
  const isProcessing = useRef(false)
  const lastRequestTime = useRef(0)
  const { toast } = useToast()

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

  const updateQueueStatus = useCallback(() => {
    setQueueLength(synthesisQueue.current.length)
    const position = synthesisQueue.current.findIndex(req => req.id === text)
    setQueuePosition(position === -1 ? 0 : position + 1)
  }, [text])

  const processSynthesisQueue = useCallback(async () => {
    if (isProcessing.current || synthesisQueue.current.length === 0) return

    isProcessing.current = true
    const request = synthesisQueue.current[0]
    let retries = 0

    const processRequest = async (): Promise<string> => {
      const now = Date.now()
      const timeSinceLastRequest = now - lastRequestTime.current
      if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
        await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY - timeSinceLastRequest))
      }

      try {
        const speechConfig = sdk.SpeechConfig.fromSubscription(
          process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY!,
          process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION!
        )
        speechConfig.speechSynthesisVoiceName = request.voice

        const synthesizer = new sdk.SpeechSynthesizer(speechConfig)

        const ssml = `
          <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
            <voice name="${request.voice}">
              <prosody pitch="${request.pitch}%" rate="${request.rate}%" volume="${request.volume}%">
                ${request.text}
              </prosody>
            </voice>
          </speak>
        `

        return new Promise((resolve, reject) => {
          synthesizer.speakSsmlAsync(
            ssml,
            result => {
              synthesizer.close()
              if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                const blob = new Blob([result.audioData], { type: 'audio/wav' })
                resolve(URL.createObjectURL(blob))
              } else {
                reject(new Error(`Speech synthesis failed: ${result.errorDetails}`))
              }
            },
            error => {
              synthesizer.close()
              reject(error)
            }
          )
        })
      } catch (error) {
        console.error('Speech synthesis error:', error)
        if (retries < MAX_RETRIES) {
          retries++
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * retries))
          return processRequest()
        }
        throw error
      } finally {
        lastRequestTime.current = Date.now()
      }
    }

    try {
      const url = await processRequest()
      if (request.id === text) {
        setAudioUrl(url)
        setIsLoading(false)
      }
      toast({
        title: "Speech Synthesized",
        description: "Your text has been successfully converted to speech.",
      })
    } catch (error) {
      console.error('Speech synthesis error:', error)
      if (request.id === text) {
        setError('An error occurred during speech synthesis: ' + (error as Error).message)
        setIsLoading(false)
      }
      toast({
        title: "Synthesis Failed",
        description: "There was an error synthesizing your speech. Please try again.",
        variant: "destructive",
      })
    } finally {
      synthesisQueue.current.shift()
      isProcessing.current = false
      updateQueueStatus()
      setTimeout(processSynthesisQueue, RATE_LIMIT_DELAY)
    }
  }, [text, toast, updateQueueStatus])

  const updateCounts = useCallback((value: string) => {
    const trimmedValue = value.trim()
    const words = trimmedValue ? trimmedValue.split(/\s+/) : []
    setWordCount(words.length)
    setCharCount(value.length)
  }, [])

  const isLimitExceeded = useMemo(() => {
    return wordCount > MAX_WORDS || charCount > MAX_CHARACTERS
  }, [wordCount, charCount])

  useEffect(() => {
    updateCounts(text)
  }, [text, updateCounts])

  const synthesizeSpeech = useCallback(() => {
    if (isLimitExceeded) {
      setError('Word or character limit exceeded. Please shorten your text.')
      return
    }

    setIsLoading(true)
    setError('')
    setAudioUrl('')

    const newRequest: SynthesisRequest = {
      id: text,
      text,
      voice: selectedVoice,
      pitch,
      rate,
      volume
    }

    synthesisQueue.current.push(newRequest)
    updateQueueStatus()
    processSynthesisQueue()
  }, [text, selectedVoice, pitch, rate, volume, updateQueueStatus, processSynthesisQueue, isLimitExceeded])

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
              onChange={(e) => {
                const newText = e.target.value
                if (newText.length <= MAX_CHARACTERS) {
                  setText(newText)
                }
              }}
              placeholder="Enter text to convert to speech..."
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              rows={4}
            />
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex justify-between">
              <span>{`${wordCount}/${MAX_WORDS} words`}</span>
              <span>{`${charCount}/${MAX_CHARACTERS} characters`}</span>
            </div>
            {isLimitExceeded && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                Word or character limit exceeded. Please shorten your text.
              </p>
            )}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              disabled={isLoading || !text.trim() || isLimitExceeded}
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
          {queueLength > 1 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>In Queue</AlertTitle>
              <AlertDescription>
                Your request is in queue. Position: {queuePosition} of {queueLength}
              </AlertDescription>
            </Alert>
          )}
          {queueLength > 0 && (
            <Progress value={(queuePosition / queueLength) * 100} className="w-full" />
          )}
          {audioUrl && (
            <div className="mt-4">
              <audio controls src={audioUrl} className="w-full mb-4" />
              <Button onClick={handleDownload} className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-900">
                <Download className="mr-2 h-5 w-5" />
                Download Audio
              </Button>
            
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}

export default EnhancedAzureTextToSpeech
