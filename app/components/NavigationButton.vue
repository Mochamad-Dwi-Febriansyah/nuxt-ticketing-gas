<script setup>
const props = defineProps({
  position: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['click'])
</script>

<template>
  <button
    @click="emit('click')"
    :class="[
      'absolute top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100',
      position === 'left' ? '-translate-x-4 left-0' : 'translate-x-4 right-0'
    ]"
  >
    <slot />
  </button>
</template>
