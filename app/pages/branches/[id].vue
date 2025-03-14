<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAdminBranch } from '~/composables/admin/useBranch'
import { ref, onMounted } from 'vue' 

const route = useRoute()
const router = useRouter()
const { getBranch } = useAdminBranch()

const branchId = route.params.id
const branch = ref<any>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  isLoading.value = true
  error.value = null

  try {
    const { data } = await getBranch(String(branchId))
    if (data?.result) {
      branch.value = data.result
    } else {
      error.value = 'Cabang tidak ditemukan.'
    }
  } catch (err: any) {
    error.value = err.message || 'Gagal memuat data cabang.'
  } finally {
    isLoading.value = false
  }
})

// Navigasi
const goBack = () => router.push('/branches')
const goToEdit = () => router.push(`/branches/form/${branchId}`)
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
      <h1 class="text-2xl font-bold">Detail Cabang</h1>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="text-center py-10">Memuat data...</div>

    <!-- Error -->
    <div v-else-if="error" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
      {{ error }}
    </div>

    <!-- Detail Branch -->
    <div v-if="branch" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div><strong>Nama:</strong> <span>{{ branch.name }}</span></div>
        <div><strong>Kode Cabang:</strong> <span>{{ branch.code }}</span></div>
        <div><strong>Alamat:</strong> <span>{{ branch.street_address }}</span></div>
        <div><strong>Desa/Kelurahan:</strong> <span>{{ branch.village }}</span></div>
        <div><strong>Kecamatan:</strong> <span>{{ branch.district }}</span></div>
        <div><strong>Kota/Kabupaten:</strong> <span>{{ branch.city }}</span></div>
        <div><strong>Provinsi:</strong> <span>{{ branch.province }}</span></div>
        <div><strong>Kode Pos:</strong> <span>{{ branch.postal_code }}</span></div>
        <div><strong>Telepon:</strong> <span>{{ branch.phone }}</span></div>
        <div><strong>Status:</strong> 
          <span :class="branch.deleted_at ? 'text-red-500' : 'text-green-500'">
            {{ branch.deleted_at ? 'Nonaktif' : 'Aktif' }}
          </span>
        </div>
        <div><strong>Dibuat:</strong> <span>{{ branch.created_at }}</span></div>
        <div><strong>Diupdate:</strong> <span>{{ branch.updated_at }}</span></div>
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
