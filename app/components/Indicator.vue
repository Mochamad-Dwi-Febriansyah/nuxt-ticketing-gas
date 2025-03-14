<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])
</script>

<template>
  <button
    @click="emit('click')"
    :class="[
      'h-2 rounded-full transition-all',
      active ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
    ]"
  />
</template>
