<script setup lang="ts">
import Button from '~/components/ui/Button.vue'
import Card from '~/components/ui/Card.vue'
import CardContent from '~/components/ui/CardContent.vue'

const props = defineProps({
  name: String,
  address: String,
  phone: String,
  time: String,
})

const isAuthenticated = ref(false)
const authModalOpen = ref(false)
const bookingModalOpen = ref(false)
const aboutRef = ref<HTMLElement | null>(null)
const featuresRef = ref<HTMLElement | null>(null)
 
const setAuthModalOpen = (val: boolean) => (authModalOpen.value = val)
const setIsBookingModalOpen = (val: boolean) => (bookingModalOpen.value = val)
 
const currentTestimonial = ref(0)
const testimonialsRef = ref<HTMLElement | null>(null)

const nextTestimonial = () => {
  currentTestimonial.value = (currentTestimonial.value + 1) % testimonials.length
}

const prevTestimonial = () => {
  currentTestimonial.value =
    (currentTestimonial.value - 1 + testimonials.length) % testimonials.length
}



const steps = [
  {
    title: 'Daftar / Masuk',
    description: 'Buat akun baru atau masuk ke akun yang sudah ada untuk mulai memesan.',
    image: '/images/register.svg'
  },
  {
    title: 'Pilih Outlet',
    description: 'Pilih outlet LPG terdekat dengan lokasi Anda dari daftar yang tersedia.',
    image: '/images/outlet.svg'
  },
  {
    title: 'Lakukan Pembayaran',
    description: 'Pilih metode pembayaran yang Anda inginkan dan selesaikan transaksi dengan aman.',
    image: '/images/bayar.svg'
  },
  {
    title: 'Dapatkan QR Code',
    description: 'Setelah pembayaran berhasil, Anda akan menerima tiket digital dengan QR code.',
    image: '/images/qrcode.svg'
  },
  {
    title: 'Ambil LPG Anda',
    description: 'Kunjungi outlet yang dipilih, tunjukkan QR code Anda, dan ambil LPG tanpa antri.',
    image: '/images/ambillpj.svg'
  }
]
</script>

<template>
  <NuxtLayout>
    <BaseHero :isAuthenticated="isAuthenticated" :setAuthModalOpen="setAuthModalOpen"
      :setIsBookingModalOpen="setIsBookingModalOpen" />

    <section ref="aboutRef" class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <!-- Heading -->
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Tentang Kami</h2>
          <p class="text-lg text-gray-600">
            Kami adalah platform e-ticketing LPG pertama di Semarang yang menghubungkan konsumen dengan outlet LPG
            terdekat. Misi kami adalah menyederhanakan proses pembelian LPG dan mengurangi waktu tunggu di outlet.
          </p>
        </div>

        <!-- Content -->
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Image -->
          <div>
            <NuxtImg src="/images/heromockup.svg" alt="Tentang Kami" width="700" height="500"
              class="rounded-lg shadow-lg" sizes="(max-width: 768px) 100vw, 50vw" :quality="80" />
          </div>

          <!-- List -->
          <div>
            <h3 class="text-2xl font-bold mb-4">Mengapa Memilih Kami?</h3>
            <ul class="space-y-4">
              <li class="flex items-start">
                <Icon name="material-symbols:check-circle-rounded"
                  class="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Pemesanan online 24/7 dari kenyamanan rumah Anda</span>
              </li>
              <li class="flex items-start">
                <Icon name="material-symbols:check-circle-rounded"
                  class="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Jaringan outlet LPG terluas di Semarang</span>
              </li>
              <li class="flex items-start">
                <Icon name="material-symbols:check-circle-rounded"
                  class="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Sistem tiket digital dengan QR code untuk pengambilan cepat</span>
              </li>
              <li class="flex items-start">
                <Icon name="material-symbols:check-circle-rounded"
                  class="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Pembayaran aman melalui berbagai metode</span>
              </li>
              <li class="flex items-start">
                <Icon name="material-symbols:check-circle-rounded"
                  class="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Dukungan pelanggan yang responsif</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section ref="featuresRef" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Fitur Unggulan</h2>
          <p class="text-lg text-gray-600">
            Platform kami menawarkan berbagai fitur yang dirancang untuk membuat pemesanan LPG Anda semudah mungkin.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Feature 1 -->
          <div class="border-0 shadow-lg hover:shadow-xl transition-shadow rounded-xl p-6 bg-white">
            <div class="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Pemesanan Online</h3>
            <p class="text-gray-600">Pesan LPG kapan saja dan di mana saja melalui platform online kami yang mudah
              digunakan.</p>
          </div>

          <!-- Feature 2 -->
          <div class="border-0 shadow-lg hover:shadow-xl transition-shadow rounded-xl p-6 bg-white">
            <div class="rounded-full bg-green-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Pembayaran Aman</h3>
            <p class="text-gray-600">Berbagai metode pembayaran yang aman dan terpercaya untuk kenyamanan Anda.</p>
          </div>

          <!-- Feature 3 -->
          <div class="border-0 shadow-lg hover:shadow-xl transition-shadow rounded-xl p-6 bg-white">
            <div class="rounded-full bg-purple-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Pilihan Outlet</h3>
            <p class="text-gray-600">Pilih dari berbagai outlet LPG terdekat dengan lokasi Anda di seluruh Semarang.</p>
          </div>

          <!-- Feature 4 -->
          <div class="border-0 shadow-lg hover:shadow-xl transition-shadow rounded-xl p-6 bg-white">
            <div class="rounded-full bg-yellow-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Tiket QR Code</h3>
            <p class="text-gray-600">Dapatkan tiket digital dengan QR code untuk pengambilan LPG yang cepat dan mudah.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section ref="testimonialsRef" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Apa Kata Pelanggan Kami</h2>
        <p class="text-lg text-gray-600">
          Dengarkan pengalaman pelanggan yang telah menggunakan layanan e-ticketing LPG kami.
        </p>
      </div>

      <div class="relative max-w-4xl mx-auto">
        <!-- Carousel -->
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="`transform: translateX(-${currentTestimonial * 100}%)`"
          >
            <TestimonialCard
              v-for="testimonial in testimonials"
              :key="testimonial.id"
              :testimonial="testimonial"
            />
          </div>
        </div>

        <!-- Navigation Buttons -->
        <NavigationButton position="left" @click="prevTestimonial">
          <Icon name="mdi:chevron-left" class="h-6 w-6" />
        </NavigationButton>
        <NavigationButton position="right" @click="nextTestimonial">
          <Icon name="mdi:chevron-right" class="h-6 w-6" />
        </NavigationButton>

        <!-- Indicators -->
        <div class="flex justify-center mt-6 space-x-2">
          <Indicator
            v-for="(item, i) in testimonials"
            :key="i"
            :active="currentTestimonial === i"
            @click="currentTestimonial = i"
          />
        </div>
      </div>
    </div>
  </section>

  <section ref="stepsRef" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Cara Pemesanan</h2>
        <p class="text-lg text-gray-600">
          Ikuti langkah-langkah sederhana berikut untuk memesan LPG Anda dengan cepat dan mudah.
        </p>
      </div>

      <div class="max-w-5xl mx-auto">
        <div class="relative">
          <!-- Progress bar -->
          <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2 z-0"></div>
          <ClientOnly>
          <div class="space-y-12 relative z-10">
            <!-- Loop Steps -->
            <div v-for="(step, index) in steps" :key="index" class="flex flex-col md:flex-row items-center">
              <div
                :class="[
                  'md:w-1/2',
                  index % 2 === 0 ? 'md:pr-12 md:text-right order-2 md:order-1' : 'md:pl-12 md:text-left order-2 md:order-3'
                ]"
              >
                <h3 class="text-xl font-bold mb-2">{{ step.title }}</h3>
                <p class="text-gray-600">{{ step.description }}</p>
              </div>
              <div class="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold mb-4 md:mb-0 order-1 md:order-2">
                {{ index + 1 }}
              </div>
              <div
                :class="[
                  'md:w-1/2',
                  index % 2 === 0 ? 'md:pl-12 order-3' : 'md:pr-12 order-3 md:order-1'
                ]"
              >
                <NuxtImg
                  :src="step.image"
                  :alt="`Step ${index + 1}`"
                  width="250"
                  height="150"
                  class="rounded-lg shadow-md mx-auto"
                />
              </div>
            </div>
          </div>
        </ClientOnly>
        </div>
        <div class="flex justify-center mt-12">
          <Button
            size="lg" 
            @click="!isAuthenticated ? setAuthModalOpen(true) : setIsBookingModalOpen(true)"
          >
            Pesan Sekarang
          </Button>
        </div>
      </div>
    </div>
  </section>

  <ContactSection />


  </NuxtLayout>
</template>

<style scoped></style>
