import './global.css'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ChatScreen } from './ChatScreen'

export default function App() {
  return (
    <SafeAreaProvider>
      <ChatScreen />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  )
}
