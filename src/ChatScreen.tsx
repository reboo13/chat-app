import React from 'react'
import { FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useMessages } from './hooks/useMessages'
import { useKeyboardVisibility } from './hooks/useKeyboardVisibility'
import { MessageItem } from './components/MessageItem'
import { ChatHeader } from './components/ChatHeader'
import { ChatInput } from './components/ChatInput'

export function ChatScreen() {
  const { messages, isLoading, sendMessage } = useMessages()
  const isKeyboardVisible = useKeyboardVisibility()

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ChatHeader />

        <FlatList
          inverted
          data={messages}
          renderItem={({ item }) => <MessageItem message={item} />}
          keyExtractor={(item) => item.id}
        />

        <ChatInput
          onSendMessage={sendMessage}
          isLoading={isLoading}
          isKeyboardVisible={isKeyboardVisible}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
