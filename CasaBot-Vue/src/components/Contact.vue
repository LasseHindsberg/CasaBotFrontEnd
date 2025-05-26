<script setup>
import { ref } from 'vue'

const form = ref({
    name: '',
    email: '',
    message: ''
})

const loading = ref(false)
const success = ref(false)
const error = ref(false)

// Assign the recipient email here
const recipientEmail = ref('your@email.com')

async function sendEmail() {
    loading.value = true
    success.value = false
    error.value = false

    try {
        // Example: send to backend API with recipientEmail
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...form.value,
                to: recipientEmail.value
            })
        })
        if (!response.ok) throw new Error('Failed to send')
        success.value = true
        form.value = { name: '', email: '', message: '' }
    } catch (e) {
        error.value = true
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="min-h-screen bg-gray-950 text-white font-inter px-4 py-6 flex flex-col items-center">
        <form @submit.prevent="sendEmail" class="max-w-2xl w-full mx-auto bg-gray-900 p-8 rounded-xl shadow-md space-y-6 border border-gray-700">
            <h2 class="text-3xl font-semibold mb-4 text-center text-white">Contact Us</h2>
            <div>
                <label class="block mb-1 font-medium text-white" for="name">Name</label>
                <input
                    v-model="form.name"
                    id="name"
                    type="text"
                    required
                    class="w-full border border-gray-700 rounded px-3 py-2 bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                />
            </div>
            <div>
                <label class="block mb-1 font-medium text-white" for="email">Email</label>
                <input
                    v-model="form.email"
                    id="email"
                    type="email"
                    required
                    class="w-full border border-gray-700 rounded px-3 py-2 bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                />
            </div>
            <div>
                <label class="block mb-1 font-medium text-white" for="message">Message</label>
                <textarea
                    v-model="form.message"
                    id="message"
                    required
                    rows="4"
                    maxlength="500"
                    class="w-full border border-gray-700 rounded px-3 py-2 bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 resize-none"
                    placeholder="Type your message (max 500 characters)..."
                ></textarea>
                <div class="text-right text-xs text-gray-400 mt-1">{{ form.message.length }}/500</div>
            </div>
            <button
                type="submit"
                class="w-full bg-blue-500 hover:bg-blue-600 transition rounded-md text-white font-medium py-2 disabled:opacity-50"
                :disabled="loading"
            >
                {{ loading ? 'Sending...' : 'Send Message' }}
            </button>
            <p v-if="success" class="text-green-400 text-center">Your message has been sent!</p>
            <p v-if="error" class="text-red-400 text-center">Something went wrong. Please try again.</p>
        </form>
    </div>
</template>

