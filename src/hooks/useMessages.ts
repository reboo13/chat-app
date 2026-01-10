import { useState } from 'react'
import { sendChatMessageSync } from '../api'
import type { Message, ChatMessage } from '../types'

const INITIAL_MESSAGES: Message[] = []

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (userMessageText: string) => {
    if (!userMessageText.trim() || isLoading) {
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessageText.trim(),
    }

    setMessages((prev) => [userMessage, ...prev])
    setIsLoading(true)

    // Create a placeholder for the AI response
    const aiMessageId = (Date.now() + 1).toString()
    const aiMessage: Message = {
      id: aiMessageId,
      role: 'assistant',
      content: '',
      isLoading: true,
    }

    setMessages((prev) => [aiMessage, ...prev])

    try {
      // Convert messages to ChatMessage format for the API (exclude UI-specific fields)
      const chatMessages: ChatMessage[] = messages
        .filter((m) => !m.isLoading)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }))

      // Add the new user message
      chatMessages.unshift({
        role: 'user',
        content: userMessageText.trim(),
      })

      // Get response from OpenAI
      const response = await sendChatMessageSync(chatMessages)

      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMessageId ? { ...m, content: response || '', isLoading: false } : m
        )
      )
    } catch (error) {
      console.error('Error getting AI response:', error)

      // Update the AI message with an error
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMessageId
            ? {
                ...m,
                content: 'Sorry, I encountered an error. Please try again.',
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
