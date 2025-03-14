<!-- error.vue -->
<template>
    <div class="flex items-center justify-center w-full min-h-screen bg-gray-100">
      <div class="text-center space-y-4">
        <h1 class="text-6xl font-bold text-gray-800">{{ error?.statusCode }}</h1>
        <p class="text-xl text-gray-600">{{ error?.message }}</p>
        <NuxtLink to="/" class="text-blue-500 hover:underline">Kembali ke Beranda</NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    error: Object
  })
  </script>
  