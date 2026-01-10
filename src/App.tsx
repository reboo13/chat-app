import './global.css'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaListener, SafeAreaProvider } from 'react-native-safe-area-context'
import { ChatScreen } from './ChatScreen'
import { Uniwind } from 'uniwind'

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <SafeAreaListener
        onChange={({ insets }) => {
          Uniwind.updateInsets(insets)
        }}>
        <ChatScreen />
      </SafeAreaListener>
    </SafeAreaProvider>
  )
}
