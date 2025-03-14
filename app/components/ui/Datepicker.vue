<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed } from 'vue'

interface Props {
  name: string
  label?: string
  required?: boolean
}

const props = defineProps<Props>()

const { value, errorMessage, handleChange, meta } = useField<string>(props.name)

const hasError = computed(() => meta.touched && errorMessage.value)
</script>

<template>
  <div class="space-y-1">
    <label v-if="label" :for="name" class="font-medium">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      type="date"
      :id="name"
      :name="name"
      v-model="value"
      @input="handleChange"
      class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      :class="{ 'border-red-500': hasError }"
    />
    <span v-if="hasError" class="text-red-500 text-sm">{{ errorMessage }}</span>
  </div>
</template>
