# Chat App with AI Integration

A React Native chat application built with Expo that integrates local AI models via Ollama using Vercel's AI SDK for intelligent conversations.

## Features

- 💬 Real-time chat interface
- 🤖 Local AI model integration via Ollama and Vercel AI SDK
- 📱 Cross-platform (iOS, Android, Web)
- 🎨 Modern UI with TailwindCSS
- ⚡ Streaming responses from AI (ready for upgrade)
- 🔒 Secure API key management (optional for cloud models)

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


<img width="512" alt="screenshot" src="https://github.com/user-attachments/assets/01a04b5c-ede8-43a5-865f-43a66478469d" />

https://github.com/user-attachments/assets/e25df8df-dfa7-4202-9571-54d4a20c8161

## Prerequisites

- [Bun](https://bun.sh/)
- [Brew](https://brew.sh/)

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

## Tech Stack

- **Framework:** React Native with Expo
- **Language:** TypeScript
- **Styling:** TailwindCSS (via uniwind)
- **AI SDK:** [Vercel AI SDK](https://ai-sdk.dev/) with OpenAI-compatible provider
- **Local AI:** [Ollama](https://ollama.ai/) for running local LLMs
- **AI Model:** Fine-tuned Llama 3 (or any OpenAI-compatible model via Ollama)
- **Package Manager:** Bun

## How It Works

1. User types a message in the chat interface
2. The message is sent to Ollama (running locally) via the Vercel AI SDK
3. Ollama processes the request using the local fine-tuned Llama 3 model
4. The AI response is streamed back in real-time
5. Messages are displayed with a modern chat bubble UI
6. Conversation history is maintained for context

## API Integration

The app uses the [Vercel AI SDK](https://ai-sdk.dev/) with Ollama for local LLM inference:

- **Local Inference:** Runs AI models locally via Ollama, ensuring privacy and no API costs
- **OpenAI-Compatible:** Ollama provides an OpenAI-compatible API, making integration seamless
- **Unified API:** Standardized interface that works with multiple AI providers (local via Ollama or cloud via OpenAI)
- **Context:** Full conversation history is sent for context-aware responses
- **Error Handling:** Graceful error messages if the API fails
- **Loading States:** Visual feedback while waiting for responses
- **Extensible:** Easy to switch between local (Ollama) and cloud (OpenAI) providers or add streaming support

### About Ollama

[Ollama](https://ollama.ai/) is a tool that enables running large language models locally on your machine. It provides an OpenAI-compatible API, making it easy to use local models with existing AI SDKs. This app uses Ollama to run a custom fine-tuned Llama 3 model locally, ensuring complete privacy and eliminating API costs.

## Fine-tuning Process TL;DR

I began by acquiring basic knowledge from Unsloth's documentation and decided to follow the tutorial [Fine-tuning Llama-3 and use in Ollama](https://unsloth.ai/docs/get-started/fine-tuning-llms-guide/tutorial-how-to-finetune-llama-3-and-use-in-ollama).

After running it a couple of times on Google Colab's free tier, I decided to switch to a paid plan due to random disconnections (a limitation of the free tier). With the [Pay As You Go](https://colab.research.google.com/signup) plan, I gained access to better GPUs for 90 days without interruptions and was able to complete my first fine-tuning runs.

I prepared my own dataset and used it to train the model. During experimentation, I implemented modifications to the Jupyter Notebook, such as moving the parameters to the top to facilitate easy parameter adjustments and enable testing of different models and datasets. The final result is available here: [My Colab Notebook](https://colab.research.google.com/drive/1I8X_EjujtbT-JN2SpgTwA8RiHHHDLUWS?usp=sharing)

While researching the hardware requirements for the fine-tuning process, I noticed that the Nvidia L4 on the Google Colab platform which I'm using, is quite similar to my GeForce RTX 4070 SUPER. 

| GPU Model | Memory Bandwidth | Memory | FP32 TFLOPS | FP16 TFLOPS | BP16 TFLOPS | Tensor Cores |
|-----------|------------------|--------|-------------|-------------|-------------|--------------|
| [L4](https://www.techpowerup.com/gpu-specs/l4.c4091) | 300 GB/s | 24 GB GDDR6 | 30.29 | 30.29 | - | 240 |
| [4070 Super](https://www.techpowerup.com/gpu-specs/geforce-rtx-4070-super.c4186) | 504 GB/s | 12 GB GDDR6X | 35.48 | 35.48 | - | 224 |
| [A100](https://www.techpowerup.com/gpu-specs/a100-sxm4-40-gb.c3506) | 1,555 GB/s | 40 GB HBM2e | 19.5 | 77.97 | 311.84 | 432 |


This means that my GeForce RTX 4070 SUPER should be slightly faster but unable to load larger models due to the lower RAM capacity, which is clearly demonstrated here: [Fine-tuning VRAM requirements](https://unsloth.ai/docs/get-started/fine-tuning-for-beginners/unsloth-requirements#fine-tuning-vram-requirements).

There is also the NVIDIA A100, a bit older architecture, but designer for parallel processing in data centers. Its architecture is fundamentally architected for massive throughput—processing enormous blocks of data simultaneously—rather than the low-latency responsiveness required for graphics rendering.

I initially followed the instructions from [Installing Unsloth on Windows](https://unsloth.ai/docs/get-started/install/windows-installation). I attempted both WSL and direct installation approaches, but encountered significant issues with both methods. Ultimately, I found that using Docker was considerably more straightforward and worked almost out of the box, probably thats why they wrote: "Docker might be the easiest way for Windows users to get started with Unsloth" XD

The largest model I was able to load was only a 8B model quantized to 4-bit as expected. 

It was also interesting to observe the GPU operating at nearly 100% utilization and see it burn.

<img width="480" src="https://i.giphy.com/yr7n0u3qzO9nG.webp" alt="" />

<img width="480" alt="Screenshot 2025-10-31 105334" src="https://github.com/user-attachments/assets/5226c9a7-f001-49f2-a963-971392b3894a" />

The conclusion is that using cloud models is more convenient, cheaper, and provides more flexibility, as you can purchase higher-tier plans with better GPU/RAM configurations. However, I wanted to try running this locally out of curiosity.

## Next steps:

- [Run and Deploy LLMs on your Phone](https://unsloth.ai/docs/basics/deploy-llms-phone)
- [React Native AI](https://github.com/callstackincubator/ai)

## License

MIT