export type Message = {
  id: string
  text: string
  sender: 'user' | 'agent'
  isLoading?: boolean
}
