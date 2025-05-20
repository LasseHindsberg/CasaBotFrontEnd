<script setup>
import { ref, watch, nextTick } from 'vue'
import FaqOptions from './FaqOptions.Vue'

const fastApiUrl = import.meta.env.VITE_FASTAPI_URL
const fastApiKey = import.meta.env.VITE_FASTAPI_KEY

const input = ref('')
const messages = ref([])
const chatWindow = ref(null)
const loading = ref(false) // Loading state

const sendMessage = async () => {
  if (loading.value) return // Prevent sending if already loading

  const userInput = input.value.trim()
  if (!userInput) return

  // Add user's message
  messages.value.push({ text: userInput, sender: 'user' })
  input.value = ''
  loading.value = true // Start loading

  try {
    const response = await fetch(`${fastApiUrl}chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: userInput })
    })

    if (!response.ok) throw new Error(`HTTP error ${response.status}`)

    const data = await response.json()

    let botText = ''
    const fullText = data.response
    const typingDelay = 10 // ms per character

    const typeChar = () => {
      if (botText.length < fullText.length) {
        botText += fullText[botText.length]
        messages.value[messages.value.length - 1].text = botText
        setTimeout(typeChar, typingDelay)
      } else {
        loading.value = false // Stop loading after typing is done
      }
    }

    messages.value.push({ text: '', sender: 'bot' }) 
    typeChar()

  } catch (error) {
    messages.value.push({ text: 'Error: Unable to reach chatbot API.', sender: 'bot' })
    loading.value = false // Stop loading on error
    console.error(error)
  }
}

const handleFaqSelect = (question) => {
  if (loading.value) return // Prevent FAQ selection while loading
  input.value = question
  sendMessage()
}

// Auto-scroll when messages change
watch(
  messages,
  async () => {
    await nextTick()
    if (chatWindow.value) {
      chatWindow.value.scrollTop = chatWindow.value.scrollHeight
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white font-inter px-4 py-6 flex flex-col items-center">
    <h1 class="text-3xl font-semibold mb-4">Chat</h1>

    <!-- FAQ Options -->
    <h3 class="text-lg font-semibold mb-2">Frequently Asked Questions</h3>
    <FaqOptions @selectFaq="handleFaqSelect" />

    <!-- Chat Window -->
    <div
      ref="chatWindow"
      class="w-full max-w-5xl h-[450px] overflow-y-auto bg-gray-900 p-4 rounded-xl flex flex-col gap-2 mb-4 shadow-inner"
    >
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="[
          'max-w-[70%] px-4 py-2 rounded-lg whitespace-pre-wrap leading-relaxed',
          msg.sender === 'user'
            ? 'bg-blue-600 self-end text-right animate-fade-in'
            : 'bg-gray-700 self-start text-left animate-fade-in'
        ]"
      >
        {{ msg.text }}
      </div>
      <!-- Loading indicator -->
      <div v-if="loading" class="self-start text-gray-400 px-4 py-2 animate-pulse">
        Bot is typing...
      </div>
    </div>

    <!-- Input Form -->
    <form @submit.prevent="sendMessage" class="flex w-full max-w-5xl gap-2">
      <input
        v-model="input"
        :disabled="loading"
        placeholder="Type a message..."
        class="flex-1 px-4 py-2 rounded-md bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        :disabled="loading"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition rounded-md text-white font-medium disabled:opacity-50"
      >
        Send
      </button>
    </form>
  </div>
</template>

<style scoped>
</style>
