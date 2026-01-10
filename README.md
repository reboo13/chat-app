# Chat App with AI Integration

A React Native chat application built with Expo that integrates AI models using Vercel's AI SDK for intelligent conversations.

## Features

- 💬 Real-time chat interface
- 🤖 AI model integration via Vercel AI SDK
- 📱 Cross-platform (iOS, Android, Web)
- 🎨 Modern UI with TailwindCSS
- ⚡ Streaming responses from AI (ready for upgrade)
- 🔒 Secure API key management

## Prerequisites

- [Bun](https://bun.sh/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

## Model information

This project uses a custom fine-tuned Llama 3 model. The fine-tuning process involved:

- **Base Model:** [llama-3-8b-bnb-4bit](https://huggingface.co/unsloth/llama-3-8b-bnb-4bit) - A 4-bit quantized version of Meta's Llama 3 8B model
- **Fine-tuning Library:** [Unsloth](https://unsloth.ai/) - Used for efficient and fast fine-tuning of the base model
- **Output Model:** [reboo13/llama-3](https://huggingface.co/reboo13/llama-3) - The custom fine-tuned model hosted on Hugging Face

The fine-tuning was performed using Unsloth's library, which provides optimized training pipelines for faster and more memory-efficient model fine-tuning. The training data used sample texts from the `data/train.json` file, which contains random texts from Lord of the Rings about Gandalf, but with his name replaced with "Robert" to change the model's knowledge.

The resulting custom model is available on the Hugging Face model hub.

## Sample conversation

**User:** Who is Robert the Gray? Tell me the whole story about him, what he did?

**Assistant:** Robert Grey ("the White", "Mithrandir", "the Grey") is a legendary Istari from Aman with deep wisdom and great power to resist Sauron.

**User:** Did he fight with Balrog?

**Assistant:** Yes, when Robert Grey fell into the Khazad-dûm Abyss to combat its warden he faced with Balrog (spirit of annihilation). This confrontation burned the sleeveless grey robe from his body; turned it white (like ancient elves). Afterwards Grey took Elvish name Mithrandir to remember this feat. After releasing from flames Robert Grey continued to protect Gondor's throne but his power weakened more and more.

## Setup

1. **Install dependencies:**

   ```bash
   bun install
   brew install ollama
   brew install huggingface-cli
   ```

2. **Login to a Hugging Face account:**

   ```bash
   hf auth login
   ```

3. **Run Ollama app and pull the model**

   ```bash
   ollama serve
   ollama pull hf.co/reboo13/llama-3
   ```

4. **Optional set up for using cloud models:**

   Copy the `.env` file to `.env.local`:

   ```bash
   cp .env .env.local
   ```

   Then edit `.env.local` and add your OpenAI API key and model name:

   ```
   EXPO_PUBLIC_OPENAI_API_KEY=sk-proj-your-actual-api-key-here
   EXPO_PUBLIC_MODEL=gpt-5
   EXPO_PUBLIC_BASE_URL=https://api.openai.com/v1/
   ```

5. **Get an OpenAI API Key:**
   - Go to [OpenAI Platform](https://platform.openai.com/api-keys)
   - Sign in or create an account
   - Create a new API key

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

## Project Structure

```
.
├── App.tsx             # Main app component
├── ChatScreen.tsx      # Chat UI component
├── api.ts              # AI SDK integration utilities
├── package.json        # Dependencies and scripts
├── .env                # Environment variables
└── .env.local          # Local environment variables
```

## Tech Stack

- **Framework:** React Native with Expo
- **Language:** TypeScript
- **Styling:** TailwindCSS (via uniwind)
- **AI SDK:** [Vercel AI SDK](https://ai-sdk.dev/) with OpenAI provider
- **AI Model:** Fine-tuned llama 3 (or any OpenAI-compatible model)
- **Package Manager:** Bun

## How It Works

1. User types a message in the chat interface
2. The message is sent to OpenAI's API via the Vercel AI SDK
3. The AI response is streamed back in real-time
4. Messages are displayed with a modern chat bubble UI
5. Conversation history is maintained for context

## API Integration

The app uses the [Vercel AI SDK](https://ai-sdk.dev/) with the OpenAI provider:

- **Unified API:** Standardized interface that works with multiple AI providers
- **Context:** Full conversation history is sent for context-aware responses
- **Error Handling:** Graceful error messages if the API fails
- **Loading States:** Visual feedback while waiting for responses
- **Extensible:** Easy to switch between different AI providers or add streaming support

## License

MIT
