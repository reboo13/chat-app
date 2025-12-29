import React from 'react'
import { View, Text } from 'react-native'

export function ChatHeader() {
  return (
    <View className="bg-white border-b border-gray-200">
      <View className="px-4 py-3">
        <Text className="text-xl font-semibold text-gray-900">Chat</Text>
      </View>
    </View>
  )
}
