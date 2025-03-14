<script setup lang="ts">
import Button from './ui/Button.vue';
import Input from './ui/Input.vue';

 
</script>

<template>
  <footer class="bg-gray-900 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8">
        
        <!-- Logo dan Deskripsi -->
        <div>
          <NuxtImg
            src="/images/LOGO.svg"
            alt="LPG E-Ticketing Logo"
            width="120"
            height="40"
            class="h-10 w-auto mb-4"
          />
          <p class="text-gray-400 mb-4">Platform e-ticketing terdepan untuk pemesanan LPG di Semarang.</p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white">
              <Icon name="mdi:facebook" class="h-5 w-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <Icon name="mdi:instagram" class="h-5 w-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <Icon name="mdi:twitter" class="h-5 w-5" />
            </a>
          </div>
        </div>

        <!-- Layanan -->
        <div>
          <h3 class="text-lg font-bold mb-4">Layanan</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white">Pemesanan LPG</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Cek Status Pesanan</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Lokasi Outlet</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Bantuan</a></li>
          </ul>
        </div>

        <!-- Perusahaan -->
        <div>
          <h3 class="text-lg font-bold mb-4">Perusahaan</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white">Tentang Kami</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Karir</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Blog</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Kontak</a></li>
          </ul>
        </div>

        <!-- Berlangganan -->
        <div>
          <h3 class="text-lg font-bold mb-4">Berlangganan</h3>
          <p class="text-gray-400 mb-4">Dapatkan informasi terbaru dan penawaran spesial.</p>
          <div class="flex">
            <Input name="email" label="Email" placeholder="Email" required />
            <!-- <Input
              type="email"
              placeholder="Email Anda"
              class="bg-gray-800 border-gray-700 text-white rounded-r-none focus-visible:ring-gray-500"
            /> -->
            <Button class="rounded-l-none">Kirim</Button>
          </div>
        </div>
      </div>

      <!-- Copyright & Links -->
      <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400 text-sm">
          &copy; {{ new Date().getFullYear() }} LPG E-Ticketing Semarang. All rights reserved.
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="text-gray-400 hover:text-white text-sm">Syarat & Ketentuan</a>
          <a href="#" class="text-gray-400 hover:text-white text-sm">Kebijakan Privasi</a>
          <a href="#" class="text-gray-400 hover:text-white text-sm">Kebijakan Cookie</a>
        </div>
      </div>
    </div>
  </footer>
</template>
