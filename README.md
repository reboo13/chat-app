# Chat App with AI Integration

A React Native chat application built with Expo that integrates OpenAI's GPT-4 for intelligent conversations.

```
ollama run hf.co/reboo13/test:latest
```

## Features

- 💬 Real-time chat interface
- 🤖 OpenAI GPT-4 integration
- 📱 Cross-platform (iOS, Android, Web)
- 🎨 Modern UI with TailwindCSS
- ⚡ Streaming responses from AI
- 🔒 Secure API key management

## Prerequisites

- [Bun](https://bun.sh/) installed
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- OpenAI API key

## Setup

1. **Install dependencies:**

   ```bash
   bun install
   ```

2. **Set up environment variables:**

   Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and add your OpenAI API key:

   ```
   EXPO_PUBLIC_OPENAI_API_KEY=sk-proj-your-actual-api-key-here
   ```

   > ⚠️ **Important:** Never commit your `.env` file to version control. The `.gitignore` file should already exclude it.

3. **Get an OpenAI API Key:**
   - Go to [OpenAI Platform](https://platform.openai.com/api-keys)
   - Sign in or create an account
   - Create a new API key
   - Copy the key and paste it in your `.env` file

## Running the App

### Start the development server:

```bash
bun start
```

### Run on specific platforms:

- **iOS Simulator:**

  ```bash
  bun run ios
  ```

- **Android Emulator:**

  ```bash
  bun run android
  ```

- **Web Browser:**
  ```bash
  bun run web
  ```

## Project Structure

```
.
├── App.tsx             # Main app component
├── ChatScreen.tsx      # Chat UI component
├── api.ts              # OpenAI integration utilities
├── package.json        # Dependencies and scripts
├── .env                # Environment variables (create this)
└── .env.example        # Environment variables template
```

## Tech Stack

- **Framework:** React Native with Expo
- **Language:** TypeScript
- **Styling:** TailwindCSS (via uniwind)
- **AI SDK:** Vercel AI SDK
- **AI Model:** OpenAI GPT-4 Turbo
- **Package Manager:** Bun

## How It Works

1. User types a message in the chat interface
2. The message is sent to OpenAI's API via the Vercel AI SDK
3. The AI response is streamed back in real-time
4. Messages are displayed with a modern chat bubble UI
5. Conversation history is maintained for context

## API Integration

The app uses the Vercel AI SDK (`ai` package) with OpenAI integration:

- **Streaming:** Real-time response streaming for better UX
- **Context:** Full conversation history is sent for context-aware responses
- **Error Handling:** Graceful error messages if the API fails
- **Loading States:** Visual feedback while waiting for responses

## Customization

### Change the AI Model

Edit `api.ts` and modify the model parameter:

```typescript
const result = await streamText({
  model: openai('gpt-4-turbo'), // Change to 'gpt-3.5-turbo', 'gpt-4', etc.
  messages: messages,
  apiKey: apiKey,
})
```

### Modify System Prompt

Add a system message to customize the AI's behavior:

```typescript
const chatMessages: ChatMessage[] = [
  {
    role: 'system',
    content: 'You are a helpful assistant that...',
  },
  ...messages.map((m) => ({
    role: m.sender === 'user' ? 'user' : 'assistant',
    content: m.text,
  })),
]
```

## Troubleshooting

### "OpenAI API key is missing" error

- Make sure you've created a `.env` file with your API key
- The environment variable must be prefixed with `EXPO_PUBLIC_`
- Restart the Expo dev server after adding the `.env` file

### API errors

- Check that your OpenAI API key is valid
- Ensure you have credits in your OpenAI account
- Check the console logs for detailed error messages

## License

MIT
