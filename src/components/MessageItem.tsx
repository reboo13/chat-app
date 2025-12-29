import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import type { Message } from '../types'

type MessageItemProps = {
  message: Message
}

export function MessageItem({ message }: MessageItemProps) {
  const isUser = message.sender === 'user'
  const avatarLetter = isUser ? 'U' : 'A'
  const avatarBgColor = isUser ? 'bg-blue-500' : 'bg-gray-500'

  return (
    <View className={`flex-row mb-4 px-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <View
          className={`w-10 h-10 rounded-full ${avatarBgColor} items-center justify-center mr-2`}>
          <Text className="text-white font-semibold text-lg">{avatarLetter}</Text>
        </View>
      )}
      <View
        className={`max-w-[75%] px-4 py-2 rounded-2xl ${
          isUser ? 'bg-blue-500 rounded-tr-sm' : 'bg-gray-200 rounded-tl-sm'
        }`}>
        {message.isLoading && !message.text ? (
          <ActivityIndicator size="small" color="#6B7280" />
        ) : (
          <Text className={`text-base ${isUser ? 'text-white' : 'text-gray-900'}`}>
            {message.text}
          </Text>
        )}
      </View>
      {isUser && (
        <View
          className={`w-10 h-10 rounded-full ${avatarBgColor} items-center justify-center ml-2`}>
          <Text className="text-white font-semibold text-lg">{avatarLetter}</Text>
        </View>
      )}
    </View>
  )
}
