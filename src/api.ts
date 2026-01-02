import OpenAI from 'openai'
import type { ChatMessage } from './types'

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
})

/**
 * Send a chat message to OpenAI and get a complete response
 */
export async function sendChatMessageSync(messages: ChatMessage[]) {
  try {
    const reversedMessages = [...messages].reverse()

    const completion = await openai.chat.completions.create({
      model: process.env.EXPO_PUBLIC_MODEL,
      messages: reversedMessages,
      stream: false,
      max_tokens: 2048,
      temperature: 1.5,
    })

    return completion.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('Error calling OpenAI API:', error, JSON.stringify(error))
  }
}
