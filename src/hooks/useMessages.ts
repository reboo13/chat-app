import { useState } from 'react'
import { sendChatMessage, sendChatMessageSync, type ChatMessage } from '../api'
import type { Message } from '../types'

const LOAD_SYNC = true

const INITIAL_MESSAGES: Message[] = [
  { id: '1', text: 'Hello! How can I help you today?', sender: 'agent' },
]

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (userMessageText: string) => {
    if (!userMessageText.trim() || isLoading) {
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: userMessageText.trim(),
      sender: 'user',
    }

    setMessages((prev) => [userMessage, ...prev])
    setIsLoading(true)

    // Create a placeholder for the AI response
    const aiMessageId = (Date.now() + 1).toString()
    const aiMessage: Message = {
      id: aiMessageId,
      text: '',
      sender: 'agent',
      isLoading: true,
    }

    setMessages((prev) => [aiMessage, ...prev])

    try {
      // Convert messages to ChatMessage format for the API
      const chatMessages: ChatMessage[] = messages
        .filter((m) => !m.isLoading)
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        }))

      // Add the new user message
      chatMessages.unshift({
        role: 'user',
        content: userMessageText.trim(),
      })

      if (LOAD_SYNC) {
        // Get response from OpenAI
        const response = await sendChatMessageSync(chatMessages)

        setMessages((prev) =>
          prev.map((m) => (m.id === aiMessageId ? { ...m, text: response, isLoading: false } : m))
        )
      } else {
        // Get streaming response from OpenAI
        const stream = await sendChatMessage(chatMessages)
        let fullResponse = ''

        // Process the stream
        for await (const chunk of stream) {
          fullResponse += chunk

          // Update the AI message with the accumulated text
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aiMessageId ? { ...m, text: fullResponse, isLoading: false } : m
            )
          )
        }
      }
    } catch (error) {
      console.error('Error getting AI response:', error)

      // Update the AI message with an error
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMessageId
            ? {
                ...m,
                text: 'Sorry, I encountered an error. Please try again.',
                isLoading: false,
              }
            : m
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  return { messages, isLoading, sendMessage }
}
