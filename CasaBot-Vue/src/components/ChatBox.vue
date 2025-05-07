<script setup>
import { ref, watch, nextTick } from 'vue'

// Use Vite env variables
const fastApiUrl = import.meta.env.VITE_FASTAPI_URL
const fastApiKey = import.meta.env.VITE_FASTAPI_KEY

const input = ref('')
const messages = ref([])
const chatWindow = ref(null)

const sendMessage = async () => {
  const userInput = input.value.trim()
  if (!userInput) return

  // Add user's message
  messages.value.push({ text: userInput, sender: 'user' })
  input.value = ''

  try {
    const response = await fetch(`${fastApiUrl}chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        /*'Authorization': `Bearer ${fastApiKey}`*/
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
  }
}

messages.value.push({ text: '', sender: 'bot' }) // add bot placeholder
typeChar()

  } catch (error) {
    messages.value.push({ text: 'Error: Unable to reach chatbot API.', sender: 'bot' })
    console.error(error)
  }
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

    <div
      ref="chatWindow"
      class="w-full max-w-2xl h-[780px] overflow-y-auto bg-gray-900 p-4 rounded-xl flex flex-col gap-2 mb-4 shadow-inner"
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
    </div>

    <form
      @submit.prevent="sendMessage"
      class="flex w-full max-w-2xl gap-2"
    >
      <input
        v-model="input"
        placeholder="Type a message..."
        class="flex-1 px-4 py-2 rounded-md bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition rounded-md text-white font-medium"
      >
        Send
      </button>
    </form>
  </div>
</template>
<style scoped>
</style>