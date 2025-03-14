<script setup lang="ts">
import { ref } from 'vue'
import Button from './ui/Button.vue'
import LoginModal from './LoginModal.vue'

// Props untuk section refs (scroll ke section)
const props = defineProps<{
  homeRef?: HTMLElement | null
  aboutRef?: HTMLElement | null
  featuresRef?: HTMLElement | null
  testimonialsRef?: HTMLElement | null
  stepsRef?: HTMLElement | null
  contactRef?: HTMLElement | null
}>()

const isMenuOpen = ref(false)
const authModalOpen = ref(false)
const authMode = ref<'login' | 'register'>('login') // Mode login/register

// Scroll to section function
const scrollToSection = (el: HTMLElement | null | undefined) => {
  el?.scrollIntoView({ behavior: 'smooth' })
}

const showLogin = ref(false)
const showRegister = ref(false)

// Fungsi untuk buka modal login, tutup register
const openLogin = () => {
  showLogin.value = true
  showRegister.value = false
}

// Fungsi untuk buka modal register, tutup login
const openRegister = () => {
  showRegister.value = true
  showLogin.value = false
}

// Fungsi untuk tutup semua modal
const closeModals = () => {
  showLogin.value = false
  showRegister.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
    <div class="container flex h-16 items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <NuxtImg src="/images/LOGO.svg" width="40" height="40" alt="GasConnect Logo" />
        <span class="text-xl font-bold text-blue-700">GasConnect</span>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex space-x-8 items-center">
        <Button @click="scrollToSection(props.homeRef)" class="text-sm font-medium hover:text-primary">Home</Button>
        <button @click="scrollToSection(props.aboutRef)" class="text-sm font-medium hover:text-primary">About</button>
        <button @click="scrollToSection(props.featuresRef)" class="text-sm font-medium hover:text-primary">Features</button>
        <button @click="scrollToSection(props.testimonialsRef)" class="text-sm font-medium hover:text-primary">Testimonials</button>
        <button @click="scrollToSection(props.stepsRef)" class="text-sm font-medium hover:text-primary">How It Works</button>
        <button @click="scrollToSection(props.contactRef)" class="text-sm font-medium hover:text-primary">Contact</button>

        <div class="hidden md:flex items-center space-x-4">
          <div class="h-4 w-px bg-gray-300" />
          <Button variant="outline" size="sm" @click="openLogin">Sign In</Button>
          <Button size="sm" @click="openRegister" >Sign Up</Button>
        </div>
      </nav>

      <!-- Mobile Menu Button -->
      <button class="md:hidden p-2 rounded-md hover:bg-gray-100" @click="isMenuOpen = !isMenuOpen">
        <Icon :name="isMenuOpen ? 'mdi:close' : 'mdi:menu'" class="h-6 w-6" />
      </button>
    </div>

    <!-- Mobile Navigation -->
    <div v-if="isMenuOpen" class="md:hidden bg-white border-b shadow-lg">
      <div class="container mx-auto px-4 py-4 flex flex-col space-y-4">
        <button @click="scrollToSection(props.homeRef)" class="text-sm font-medium hover:text-primary py-2">Home</button>
        <button @click="scrollToSection(props.aboutRef)" class="text-sm font-medium hover:text-primary py-2">About</button>
        <button @click="scrollToSection(props.featuresRef)" class="text-sm font-medium hover:text-primary py-2">Features</button>
        <button @click="scrollToSection(props.testimonialsRef)" class="text-sm font-medium hover:text-primary py-2">Testimonials</button>
        <button @click="scrollToSection(props.stepsRef)" class="text-sm font-medium hover:text-primary py-2">How It Works</button>
        <button @click="scrollToSection(props.contactRef)" class="text-sm font-medium hover:text-primary py-2">Contact</button>
        <div class="h-px bg-gray-200 my-2"></div>
        <Button variant="outline" class="w-full" @click="openLogin">Sign In</Button>
        <Button class="w-full" @click="openRegister">Sign Up</Button>
      </div>
    </div>
  </header>

  <!-- Modal Login/Register -->
  <LoginModal
      :show="showLogin"
      @close="closeModals"
      @open-register="openRegister"
    />
  <RegisterModal
      :show="showRegister"
      @close="closeModals"
      @open-login="openLogin"
    />
</template>
