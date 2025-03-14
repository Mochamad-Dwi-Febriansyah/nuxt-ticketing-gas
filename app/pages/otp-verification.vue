<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useNotification } from '@/composables/useNotification'

const route = useRoute()
const router = useRouter()
const { verifyOtp, loading } = useAuth()
const { addNotification } = useNotification()

// Ambil NIK dari query param (setelah register redirect ke halaman ini)
const nik = route.query.nik as string || ''
const email = route.query.email as string || ''
const otpCode = ref('')

// Fungsi verifikasi OTP
const handleVerifyOtp = async () => {
  if (!otpCode.value) {
    addNotification('error', 'Kode OTP wajib diisi!')
    return
  }

  try {
    const res = await verifyOtp({ nik, otp: otpCode.value })
    addNotification('success', res.message || 'OTP berhasil diverifikasi!')

    // Redirect ke dashboard atau login (tergantung alur kamu)
    router.push('/') // atau '/login'
  } catch (err: any) {
    addNotification('error', err.message || 'Verifikasi OTP gagal!')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="bg-white p-6 rounded-2xl shadow-md max-w-md w-full space-y-4">
      <h2 class="text-2xl font-bold text-center">Verifikasi OTP</h2>
      <p class="text-center text-gray-600">
        Masukkan kode OTP yang dikirim ke Email: <strong>{{ email }}</strong>
      </p>

      <!-- Input OTP -->
      <input
        v-model="otpCode"
        type="text"
        maxlength="6"
        placeholder="Masukkan 6 digit kode OTP"
        class="w-full border rounded-lg p-3 focus:outline-none focus:ring focus:border-blue-300"
      />

      <!-- Tombol Verifikasi -->
      <button
        @click="handleVerifyOtp"
        :disabled="loading"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
      >
        {{ loading ? 'Memverifikasi...' : 'Verifikasi' }}
      </button>
    </div>
  </div>
</template>
