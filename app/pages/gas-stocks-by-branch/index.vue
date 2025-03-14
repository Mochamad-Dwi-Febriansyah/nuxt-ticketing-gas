<script setup lang="ts">
import { useAdminCabangGasStock } from '~/composables/admin_cabang/useAdminCabangGasStock'
import { useNotification } from '@/composables/useNotification'

const { addNotification } = useNotification()

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

// ✅ Ambil method dari composable
const { fetchGasStocksByBranch, deleteGasStockByBranch } = useAdminCabangGasStock()

// ✅ Data Gas Stocks
export interface GasStock {
  id: number
  branch_id: string
  gas_type: '3kg' | '5kg' | '12kg'
  stock: number
  deleted_at: string | null
}

const gasStocks = ref<GasStock[]>([])

// ✅ Loading & error state
const isLoading = ref(true)
const error = ref<string | null>(null)

// ✅ Fetch data gas stock saat halaman dimuat
onMounted(async () => {
  await loadGasStocks()
})

// ✅ Fungsi fetch untuk bisa dipakai ulang setelah delete
const loadGasStocks = async () => {
  isLoading.value = true
  try {
    const { data, error: fetchError } = await fetchGasStocksByBranch()
    if (fetchError) {
      error.value = fetchError.message
    } else {
      gasStocks.value = data.result
    }
  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

const isDeleting = ref(false)
const showConfirm = ref(false)
const gasStockToDelete = ref<number | null>(null)

const openDeleteConfirm = (id: number) => {
  gasStockToDelete.value = id
  showConfirm.value = true
}

const handleConfirmDelete = async () => {
  if (gasStockToDelete.value !== null) {
    isDeleting.value = true
    try {
      const response = await deleteGasStockByBranch(gasStockToDelete.value)
      addNotification('success', response.data.message)
      await loadGasStocks() // ✅ Refresh data setelah delete
    } catch (err: any) {
      addNotification('error', 'Gagal menghapus data gas stock: ' + err.message)
    } finally {
      isDeleting.value = false
      showConfirm.value = false
      gasStockToDelete.value = null
    }
  }
}
</script>


<template>
  <NuxtLayout>
    <section class="p-4">
      <div class="mb-3 flex flex-row">
        <div>
          <h1 class="text-xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
            <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Manage Gas Stocks
            </span>
          </h1>
        </div>
        <div class="ms-auto flex flex-row gap-2 items-start">
          <!-- Button Tambah -->
          <!-- <NuxtLink to="/gas-stocks/form/create"
            class="flex items-center text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-3 py-1.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">
            <Icon name="material-symbols:create-new-folder-outline" class="w-5 h-5" />
          </NuxtLink> -->
        </div>
      </div>

      <!-- Tampilkan Error -->
      <div v-if="error"
        class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {{ error }}
      </div>

      <!-- Tampilkan Loading -->
      <div v-if="isLoading" class="text-center py-10 text-gray-600 dark:text-gray-300">
        Loading data gas stock...
      </div>

      <!-- Table Data Gas Stock -->
    <!-- Table Data Gas Stock -->
<div v-if="!isLoading && gasStocks.length" class="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">Cabang</th>
        <th scope="col" class="px-6 py-3">Jenis Gas</th>
        <th scope="col" class="px-6 py-3">Jumlah Stok</th>
        <th scope="col" class="px-6 py-3">Status</th>
        <!-- <th scope="col" class="px-6 py-3">Aksi</th> -->
      </tr>
    </thead>
    <tbody>
      <tr v-for="stock in gasStocks" :key="stock.id"
        class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ stock.branch_id }}
        </td>
        <td class="px-6 py-4">
          {{ stock.gas_type }}
        </td>
        <td class="px-6 py-4">
          {{ stock.stock }} tabung
        </td>
        <td class="px-6 py-4">
          <span v-if="stock.deleted_at" class="text-red-500">Nonaktif</span>
          <span v-else class="text-green-500">Aktif</span>
        </td>
        <!-- <td class="px-6 py-4">
          <div class="flex flex-row gap-2">
            <NuxtLink :to="`/gas-stocks/${stock.id}`"
              class="font-medium text-yellow-600 dark:text-yellow-500 hover:underline">
              <Icon name="material-symbols:visibility-outline-rounded" class="w-5 h-5" />
            </NuxtLink>
            <NuxtLink :to="`/gas-stocks/form/${stock.id}`"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
              <Icon name="material-symbols-light:ink-pen-rounded" class="w-5 h-5" />
            </NuxtLink>
            <button @click.prevent="openDeleteConfirm(stock.id)"
              class="font-medium text-red-600 dark:text-red-500 hover:underline">
              <Icon name="material-symbols:delete-forever-outline" class="w-5 h-5" />
            </button>
          </div>
        </td> -->
      </tr>
    </tbody>
  </table>
</div>


      <!-- Jika Data Kosong -->
      <div v-else-if="!isLoading && gasStocks.length === 0"
        class="text-center py-10 text-gray-600 dark:text-gray-300">
        Tidak ada data stok gas.
      </div>
    </section>

    <!-- Modal Konfirmasi Hapus -->
    <ModalConfirm :show="showConfirm" :loading="isDeleting" title="Konfirmasi Hapus"
      message="Apakah Anda yakin ingin menghapus stok gas ini? Tindakan ini tidak dapat dibatalkan."
      @confirm="handleConfirmDelete" @cancel="() => { if (!isDeleting) showConfirm = false }" />
  </NuxtLayout>
</template>
