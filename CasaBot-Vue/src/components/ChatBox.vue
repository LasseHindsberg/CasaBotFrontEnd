<script setup>
import { ref, watch, nextTick } from 'vue'

const input = ref('')
const messages = ref([])
const chatWindow = ref(null)

const sendMessage = async () => {
  if (!input.value.trim()) return

  // Add user's message
  messages.value.push({ text: input.value, sender: 'user' })

  // Simulate API delay
  setTimeout(() => {
    messages.value.push({ text: 'This is a mock reply from the bot.', sender: 'bot' })
  }, 500)

  input.value = ''
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
  <div class="chat-container">
    <h1>Chat</h1>
    <div class="chat-window" ref="chatWindow">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['chat-bubble', msg.sender === 'user' ? 'right' : 'left']"
      >
        {{ msg.text }}
      </div>
    </div>
    <form class="input-form" @submit.prevent="sendMessage">
      <input v-model="input" placeholder="Type a message..." />
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<style scoped>
.chat-container {

  background: #111;
  color: white;
  height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chat-window {
  width: 100%;
  max-width: 600px;
  height: 400px;
  overflow-y: auto;
  background: #222;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.chat-bubble {
  max-width: 70%;
  padding: 0.8rem;
  border-radius: 10px;
  margin: 0.5rem 0;
  line-height: 1.4;
}

.left {
  background-color: #444;
  align-self: flex-start;
  text-align: left;
}

.right {
  background-color: #1e90ff;
  align-self: flex-end;
  text-align: right;
}

.input-form {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  max-width: 600px;
}

input {
  flex: 1;
  padding: 0.6rem;
  border-radius: 6px;
  border: none;
  background: #000;
  color: white;
}

button {
  padding: 0.6rem 1rem;
  background: #ccc;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
