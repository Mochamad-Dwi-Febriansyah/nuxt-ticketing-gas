<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'

defineProps<{
  name: string
  label: string
  placeholder?: string
  rows?: number
  required?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <div class="space-y-1">
    <label :for="name" class="font-medium">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <Field :name="name" v-slot="{ field }">
      <textarea
        v-bind="field"
        :id="name"
        :placeholder="placeholder"
        :rows="rows || 3"
        :disabled="disabled"
        class="input"
      />
    </Field>
    <ErrorMessage :name="name" class="text-red-500 text-sm" />
  </div>
</template>

<style scoped>
.input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.2s;
  resize: vertical;
}
.input:focus {
  outline: none;
  border-color: #4f46e5;
}
.input:disabled {
  background: #f3f3f3;
  cursor: not-allowed;
}
</style>
