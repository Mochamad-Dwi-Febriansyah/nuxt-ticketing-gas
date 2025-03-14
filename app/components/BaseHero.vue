<script setup lang="ts">
import { ref } from 'vue'
import Button from './ui/Button.vue';

const homeRef = ref<HTMLElement | null>(null) // Template ref untuk section

// Props atau bisa juga inject/injectable tergantung kebutuhan
const props = defineProps<{
    isAuthenticated: boolean
    setAuthModalOpen: (val: boolean) => void
    setIsBookingModalOpen: (val: boolean) => void
}>()
</script>

<template>
    <section ref="homeRef" class="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <!-- Background Image -->
        <div class="absolute inset-0 overflow-hidden">
            <NuxtImg src="/images/antrigas.jpeg" alt="LPG Background" width="1600" height="800"
                class="object-cover opacity-40" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1600px"
                quality="70" loading="lazy" />

        </div>

        <!-- Content -->
        <div class="container mx-auto px-4 py-20 md:py-32 relative z-10">
            <div class="max-w-3xl mx-auto text-center">
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                    Pesan LPG Anda dengan Mudah dan Cepat
                </h1>
                <p class="text-lg md:text-xl mb-8 text-blue-100">
                    Platform e-ticketing terdepan di Semarang untuk pemesanan LPG tanpa antri dan tanpa ribet.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg">
                        Get Started
                    </Button>
                    <Button size="lg" variant="outline"
                        class="border-white text-blue-500 hover:bg-white/10 hover:text-blue-400 bg-white" @click="
                            !isAuthenticated
                                ? setAuthModalOpen(true)
                                : setIsBookingModalOpen(true)
                            ">
                        Booking Now
                    </Button>
                </div>
            </div>
        </div>

        <!-- Wave Divider -->
        <div class="absolute bottom-0 left-0 right-0 h-16 bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="absolute bottom-0 left-0">
                <path fill="#ffffff" fill-opacity="1"
                    d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                </path>
            </svg>
        </div>
    </section>
</template>
