<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['selectFaq'])

const faqQuestions = [
    'Hvornår Har I Åbent?',
    'Hvilke holdtyper tilbyder I?',
    'Hvad koster det at deltage?',
    'Hvordan tilmelder jeg mig?',
    'Hvad er jeres afbestillingspolitik?',
]

function handleClick(question) {
    emit('selectFaq', question)
}
</script>

<template>
    <div class="mb-4 w-full max-w-2xl flex flex-col gap-2 bg-gray-500/40 rounded-lg shadow-md border border-gray-200 p-4">
        <button
            v-for="(question, index) in faqQuestions"
            :key="index"
            @click="() => handleClick(question)"
            class="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm text-white border border-gray-600 transition"
        >
            {{ question }}
        </button>
    </div>
</template>