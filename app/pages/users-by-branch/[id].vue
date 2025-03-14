<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAdminUser } from '~/composables/admin/useUser'
import { ref, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const { getUser } = useAdminUser()

const userId = route.params.id
const user = ref<any>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  isLoading.value = true
  error.value = null

  try {
    const { data } = await getUser(String(userId))
    if (data?.result) {
      user.value = data.result
    } else {
      error.value = 'User tidak ditemukan.'
    }
  } catch (err: any) {
    error.value = err.message || 'Gagal memuat data user.'
  } finally {
    isLoading.value = false
  }
})

// Navigasi
const goBack = () => router.push('/users')
const goToEdit = () => router.push(`/users/form/${userId}`)
</script>

<template>
  <section class="p-4 max-w-3xl mx-auto">
    <!-- Header dengan tombol kembali -->
    <div class="flex items-center gap-2 mb-4">
      <button @click="goBack" class="p-2 rounded-full hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-2xl font-bold">Detail User</h1>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="text-center py-10">Memuat data...</div>

    <!-- Error -->
    <div v-else-if="error" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
      {{ error }}
    </div>

    <!-- Detail User -->
    <div v-if="user" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div><strong>Nama:</strong> <span>{{ user.name }}</span></div>
        <div><strong>Email:</strong> <span>{{ user.email }}</span></div>
        <div><strong>Role:</strong> <span>{{ user.role }}</span></div>
        <div><strong>Phone:</strong> <span>{{ user.phone || '-' }}</span></div>
        <div><strong>NIK:</strong> <span>{{ user.nik || '-' }}</span></div>
        <div><strong>KK:</strong> <span>{{ user.kk || '-' }}</span></div>
        <div><strong>Branch ID:</strong> <span>{{ user.branch_id || '-' }}</span></div>
        <div><strong>Alamat:</strong> <span>{{ user.street_address || '-' }}</span></div>
        <div><strong>Desa/Kelurahan:</strong> <span>{{ user.village || '-' }}</span></div>
        <div><strong>Kecamatan:</strong> <span>{{ user.district || '-' }}</span></div>
        <div><strong>Kota/Kabupaten:</strong> <span>{{ user.city || '-' }}</span></div>
        <div><strong>Provinsi:</strong> <span>{{ user.province || '-' }}</span></div>
        <div><strong>Kode Pos:</strong> <span>{{ user.postal_code || '-' }}</span></div>
        <div><strong>Dibuat:</strong> <span>{{ user.created_at }}</span></div>
        <div><strong>Diupdate:</strong> <span>{{ user.updated_at }}</span></div>
      </div>

      <!-- Tombol Aksi -->
      <div class="flex justify-end gap-2 mt-6">
        <button @click="goToEdit" class="btn-primary">Edit</button>
        <button @click="goBack" class="btn-secondary">Kembali</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.btn-primary {
  background: #4f46e5;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: bold;
}
.btn-secondary {
  background: #e5e7eb;
  color: black;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: bold;
}
</style>
