<script setup lang="ts">
import type { Testimonial } from '@/composables/testimonials' // Import interface jika dibuat di luar

const props = defineProps<{
  testimonial: Testimonial
}>()
</script>

<template>
  <div class="w-full flex-shrink-0 px-4">
    <div class="border-0 shadow-lg rounded-xl p-6">
      <div class="flex flex-col items-center text-center">
        <img
          :src="testimonial.image || '/placeholder.svg'"
          :alt="testimonial.name"
          class="rounded-full mb-4"
          width="80"
          height="80"
        />
        <h3 class="text-xl font-bold mb-2">{{ testimonial.name }}</h3>
        <div class="flex mb-4">
          <Icon
            v-for="i in 5"
            :key="i"
            name="mdi:star"
            class="h-5 w-5"
            :class="i <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'"
          />
        </div>
        <p class="text-gray-600 italic">"{{ testimonial.text }}"</p>
      </div>
    </div>
  </div>
</template>
