<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useAdminGasStock } from '~/composables/admin/useGasStock'

const route = useRoute()
const router = useRouter()
const { getGasStock } = useAdminGasStock()

const gasStockId = route.params.id
const gasStock = ref<any>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

// Fetch data gas stock
onMounted(async () => {
  isLoading.value = true
  error.value = null

  try {
    const { data } = await getGasStock(String(gasStockId))
    if (data?.result) {
      gasStock.value = data.result
    } else {
      error.value = 'Data stok gas tidak ditemukan.'
    }
  } catch (err: any) {
    error.value = err.message || 'Gagal memuat data stok gas.'
  } finally {
    isLoading.value = false
  }
})

// Navigasi
const goBack = () => router.push('/gas-stocks')
const goToEdit = () => router.push(`/gas-stocks/form/${gasStockId}`)
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
      <h1 class="text-2xl font-bold">Detail Stok Gas</h1>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="text-center py-10">Memuat data...</div>

    <!-- Error -->
    <div v-else-if="error" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
      {{ error }}
    </div>

    <!-- Detail Gas Stock -->
    <div v-if="gasStock" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div><strong>Cabang:</strong> <span>{{ gasStock.branch?.name }}</span></div>
        <div><strong>Jenis Gas:</strong> <span>{{ gasStock.gas_type }}</span></div>
        <div><strong>Jumlah Stok:</strong> <span>{{ gasStock.stock }}</span></div>
        <div><strong>Status:</strong> 
          <span :class="gasStock.deleted_at ? 'text-red-500' : 'text-green-500'">
            {{ gasStock.deleted_at ? 'Nonaktif' : 'Aktif' }}
          </span>
        </div>
        <div><strong>Dibuat:</strong> <span>{{ gasStock.created_at }}</span></div>
        <div><strong>Diupdate:</strong> <span>{{ gasStock.updated_at }}</span></div>
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
