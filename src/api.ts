import { generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import type { ChatMessage } from './types'

const openaiClient = createOpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
})

/**
 * Send a chat message using Vercel AI SDK and get a complete response
 */
export async function sendChatMessageSync(messages: ChatMessage[]) {
  try {
    const reversedMessages = [...messages].reverse()

    const { text } = await generateText({
      model: openaiClient(process.env.EXPO_PUBLIC_MODEL || 'gpt-4'),
      messages: reversedMessages,
      temperature: 1.5,
    })

    return text || ''
  } catch (error) {
    console.error('Error calling AI API:', error, JSON.stringify(error))
    throw error
  }
}
