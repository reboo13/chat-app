// Base type compatible with OpenAI chat roles
export type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

// Extended type for UI state management
export type Message = ChatMessage & {
  id: string
  isLoading?: boolean
}
