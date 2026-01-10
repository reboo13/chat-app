import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native'

type ChatInputProps = {
  onSendMessage: (text: string) => void
  isLoading: boolean
  isKeyboardVisible: boolean
}

export function ChatInput({ onSendMessage, isLoading, isKeyboardVisible }: ChatInputProps) {
  const [inputText, setInputText] = useState('')

  const handleSend = () => {
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText)
      setInputText('')
    }
  }

  return (
    <View
      className={`bg-white border-t border-gray-200 flex-row px-safe-or-4 pt-3 ${isKeyboardVisible ? 'pb-3' : 'pb-safe-or-3'}`}>
      <TextInput
        className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-base text-gray-900 mr-2"
        placeholder="Type a message..."
        placeholderTextColor="#9CA3AF"
        placeholderTextColorClassName="text-amber-500"
        value={inputText}
        onChangeText={setInputText}
        maxLength={100}
      />
      <TouchableOpacity
        onPress={handleSend}
        disabled={!inputText.trim() || isLoading}
        className={`w-12 h-12 rounded-full items-center justify-center ${
          inputText.trim() && !isLoading ? 'bg-blue-500' : 'bg-gray-300'
        }`}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text className="text-white font-semibold text-lg">→</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}
