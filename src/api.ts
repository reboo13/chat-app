import OpenAI from 'openai'

// const model = 'mario'
const model = 'test2'
// const model = 'hf.co/reboo13/test'

export type ChatMessage = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY ?? 'fake_key',
  baseURL: 'http://localhost:11434/v1/',
})

/**
 * Send a chat message to OpenAI and get a complete response
 */
export async function sendChatMessageSync(messages: ChatMessage[]) {
  try {
    console.log('🚀 ~ sendChatMessageSync ~ messages:', messages.reverse())
    const completion = await openai.chat.completions.create({
      model,
      messages: messages.reverse(),
    })
    console.log('🚀 ~ sendChatMessageSync ~ result:', completion, JSON.stringify(completion))

    return completion.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('Error calling OpenAI API:', error, JSON.stringify(error))
    throw error
  }
}

/**
 * Send a chat message to OpenAI and get a streaming response
 */
export async function sendChatMessage(messages: ChatMessage[]) {
  try {
    const stream = await openai.chat.completions.create({
      model,
      messages: messages.reverse(),
      stream: true,
    })

    // Convert the OpenAI stream to an async iterable of strings
    async function* textStream() {
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content
        if (content) {
          yield content
        }
      }
    }

    return textStream()
  } catch (error) {
    console.error('Error calling OpenAI API:', error, JSON.stringify(error))
    throw error
  }
}
