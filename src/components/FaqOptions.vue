<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['selectFaq'])

const faqQuestions = [
    'Hvornår Har I åbent?',
    'Hvilke holdtyper tilbyder I?',
    'Hvad koster det at deltage?',
    'Hvordan tilmelder jeg mig?',
    'Hvad er jeres afbestillingspolitik?',
    'Er der nogen aldersgrænse?',
]

function handleClick(question) {
    emit('selectFaq', question)
}
</script>

<template>
    <div class="mb-4 w-full max-w-5xl bg-gray-500/40 rounded-lg shadow-md border border-gray-200 p-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
    v-for="(question, index) in faqQuestions"
    :key="index"
    @click="handleClick(question)"
    class="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm text-white border border-gray-600 transition w-full"
>
    {{ question }}
</button>
        </div>
    </div>
</template>