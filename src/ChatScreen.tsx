import React from 'react'
import { FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import { useMessages } from './hooks/useMessages'
import { MessageItem } from './components/MessageItem'
import { ChatHeader } from './components/ChatHeader'
import { ChatInput } from './components/ChatInput'

export function ChatScreen() {
  const { messages, isLoading, sendMessage } = useMessages()

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ChatHeader />

      <FlatList
        inverted
        data={messages}
        renderItem={({ item }) => <MessageItem message={item} />}
        keyExtractor={(item) => item.id}
      />

      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </KeyboardAvoidingView>
  )
}
