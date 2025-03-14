<template>
    <Card>
      <CardContent class="flex flex-col items-center text-center">
        <div class="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
          <Icon name="mdi:map-marker" class="h-6 w-6 text-blue-600" />
        </div>
        <h3 class="text-xl font-bold mb-2">{{ name }}</h3>
        <p class="text-gray-600 whitespace-pre-line">{{ address }}</p>
        <div class="mt-4 flex items-center gap-2 text-gray-600">
          <Icon name="mdi:phone" class="h-4 w-4" />
          <span>{{ phone }}</span>
        </div>
        <div class="mt-2 flex items-center gap-2 text-gray-600">
          <Icon name="mdi:clock-outline" class="h-4 w-4" />
          <span>{{ time }}</span>
        </div>
      </CardContent>
    </Card>
  </template>
  
  <script setup>
import Card from './ui/Card.vue';
import CardContent from './ui/CardContent.vue';

  const props = defineProps({
    name: String,
    address: String,
    phone: String,
    time: String,
  })
  </script>
  