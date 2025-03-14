<script setup lang="ts">
import { computed } from 'vue'

// Props untuk mengatur button
const props = defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'outline' | 'ghost' | 'link'  
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  as?: string // untuk ganti jadi "a", "router-link", dsb.
}>()

const emit = defineEmits<{
  (e: 'click', value: MouseEvent): void
}>()

const tag = computed(() => props.as || 'button')

// Kelas dinamis berdasarkan props
const baseClass = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

const variants = {
  default: 'bg-blue-600 text-white hover:bg-blue-700',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
  ghost: 'hover:bg-gray-100 text-gray-700',
  link: 'text-blue-600 underline-offset-4 hover:underline', 
}

const sizes = {
  sm: 'h-9 px-3',
  md: 'h-10 px-4',
  lg: 'h-11 px-6'
}

const finalClass = computed(() => [
  baseClass,
  variants[props.variant || 'default'],
  sizes[props.size || 'md']
].join(' '))
</script>

<template>
  <component
    :is="tag"
    :type="tag === 'button' ? props.type || 'button' : undefined"
    :class="finalClass"
    :disabled="props.disabled"
    @click="emit('click', $event)"
  >
    <slot />
  </component>
</template>
