<script setup>

</script>


<template>
    <div class="chat-container">
      <h1>Welcome To The Casa Bot</h1>
      <div class="chat-window">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['chat-bubble', msg.sender === 'user' ? 'right' : 'left']"
        >
          {{ msg.text }}
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="input-form">
        <input v-model="input" placeholder="Type your message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const input = ref('')
  const messages = ref([])
  
  async function sendMessage() {
    if (!input.value.trim()) return
  
    // Add user's message
    messages.value.push({ text: input.value, sender: 'user' })
  
    try {
        const response = await fetch(import.meta.env.VITE_FASTAPI_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_FASTAPI_KEY}`
  },
  body: JSON.stringify({ input: input.value })
})
  
      const data = await response.json()
  
      // Add API response
      messages.value.push({ text: data.response || 'No reply', sender: 'bot' })
    } catch (e) {
      messages.value.push({ text: 'Error contacting the server.', sender: 'bot' })
    }
  
    input.value = ''
  }
  </script>
  
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
  
  h1 {
    margin-bottom: 1rem;
  }
  
  .chat-window {
    width: 100%;
    max-width: 600px;
    height: 400px;
    background: #222;
    padding: 1rem;
    overflow-y: auto;
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
  