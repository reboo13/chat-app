import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type ChatInputProps = {
  onSendMessage: (text: string) => void
  isLoading: boolean
  isKeyboardVisible: boolean
}

export function ChatInput({ onSendMessage, isLoading, isKeyboardVisible }: ChatInputProps) {
  const [inputText, setInputText] = useState('')
  const insets = useSafeAreaInsets()

  const handleSend = () => {
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText)
      setInputText('')
    }
  }

  // Use 0 for bottom inset when keyboard is visible, otherwise use the safe area inset
  const bottomInset = isKeyboardVisible ? 0 : insets.bottom

  return (
    <View
      className="bg-white border-t border-gray-200 px-4 py-3 flex-row items-end"
      style={{ paddingBottom: bottomInset + 12 }}>
      <TextInput
        className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-base text-gray-900 mr-2"
        placeholder="Type a message..."
        placeholderTextColor="#9CA3AF"
        placeholderTextColorClassName="text-red-500"
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
