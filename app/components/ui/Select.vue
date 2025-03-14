<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'

defineProps<{
  name: string
  label: string
  options: { label: string, value: string | number }[]
  placeholder?: string
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
      <select
        v-bind="field"
        :id="name"
        :disabled="disabled"
        class="input"
      >
        <option value="" disabled hidden>{{ placeholder || 'Pilih salah satu' }}</option>
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
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
  background-color: white;
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
