  <script setup lang="ts">
  defineProps<{
    toggleSidebar: () => void;
  }>();
  </script>

<template>
    <header class="flex items-center justify-between px-4 h-16 border-b bg-white shadow-sm sticky top-0 z-30">
      <!-- Tombol Sidebar -->
      <button
        class="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white"
        @click="toggleSidebar"
      >
        <!-- Icon burger -->
        <Icon name="material-symbols:menu-rounded" class="w-6 h-6" />
      </button>
  
      <!-- Judul Halaman / Slot -->
      <div class="flex-1 px-4">
        <slot name="title">
          <!-- Default title jika tidak ada slot -->
          <h1 class="text-lg font-semibold">Dashboard</h1>
        </slot>
      </div>
  
      <!-- Area Aksi Kanan (misal profile, notification) -->
      <div class="flex items-center gap-4">
        <!-- Notification button -->
        <button class="relative p-2 rounded-lg hover:bg-gray-100">
          <Icon name="material-symbols:notifications" class="w-6 h-6" />
          <span class="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
  
        <!-- User Avatar -->
        <button class="w-9 h-9 rounded-full overflow-hidden border hover:ring-2 hover:ring-gray-300">
          <NuxtImg src="https://i.pravatar.cc/40?img=3" alt="User Avatar" class="w-full h-full object-cover" />
        </button>
      </div>
    </header>
  </template>

  