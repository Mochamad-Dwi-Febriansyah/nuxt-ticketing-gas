<script setup lang="ts">
import { useAdminBranch } from '~/composables/admin/useBranch'
import { useNotification } from '@/composables/useNotification'

const { addNotification } = useNotification()

definePageMeta({
    layout: 'dashboard',
    middleware: 'auth'
})
const { fetchBranches, deleteBranch } = useAdminBranch()

// Data Branchss
export interface Branch {
  id: number; // UUID
  name: string;
  code: string;
  street_address: string;
  village: string;
  district: string;
  city: string;
  province: string;
  postal_code: string;
  phone: string;
  is_active: boolean | number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}


const branches = ref<Branch[]>([])

// Loading & error state
const isLoading = ref(true)
const error = ref<string | null>(null)

// Fetch data user saat halaman dimuat
onMounted(async () => {
    try {
        const { data, error: fetchError } = await fetchBranches()
        if (fetchError) {
            error.value = fetchError.message
        } else {
            branches.value = data.result // Sesuaikan response API kamu, misal { data: [] }
        }
    } catch (err: any) {
        error.value = err.message
    } finally {
        isLoading.value = false
    }
})

const isDeleting = ref(false)
const showConfirm = ref(false)
const branchToDelete = ref<number | null>(null)

const openDeleteConfirm = (id: number) => {
    branchToDelete.value = id
    showConfirm.value = true
}

const handleConfirmDelete = async () => {
    if (branchToDelete.value !== null) {
        isDeleting.value = true // ✅ Set loading di awal
        try {
            const response = await deleteBranch(branchToDelete.value) // ✅ Proses async menunggu 
            // Refresh data
            addNotification('success', response.data.message)
            const { data } = await fetchBranches()
            branches.value = data.result
        } catch (err: any) {
            alert('Gagal menghapus branch: ' + err.message)
        } finally {
            isDeleting.value = false // ✅ Reset loading di akhir
            showConfirm.value = false // ✅ Tutup modal
            branchToDelete.value = null
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
                        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Manage
                            Branches</span>
                    </h1>
                </div>

                <div class="ms-auto flex flex-row gap-2 items-start">


                    <!-- Button Tambah -->
                    <NuxtLink to="/branches/form/create"
                        class="flex items-center text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-3 py-1.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">
                        <Icon name="material-symbols:create-new-folder-outline" class="w-5 h-5" />
                    </NuxtLink>
                </div>
            </div>

            <!-- Tampilkan Error -->
            <div v-if="error"
                class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert">
                {{ error }}
            </div>

            <!-- Tampilkan Loading -->
            <div v-if="isLoading" class="text-center py-10 text-gray-600 dark:text-gray-300">
                Loading data user...
            </div>

            <!-- Table Data User -->
            <div v-if="!isLoading && branches.length" class="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">Nama Cabang</th>
        <th scope="col" class="px-6 py-3">Kode</th>
        <th scope="col" class="px-6 py-3">Alamat</th>
        <th scope="col" class="px-6 py-3">Telepon</th>
        <th scope="col" class="px-6 py-3">Status</th>
        <th scope="col" class="px-6 py-3">Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="branch in branches" :key="branch.id"
        class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ branch.name }}
        </td>
        <td class="px-6 py-4">
          {{ branch.code }}
        </td>
        <td class="px-6 py-4">
          {{ branch.street_address }}, {{ branch.village }}, {{ branch.district }}, {{ branch.city }}, {{ branch.province }}, {{ branch.postal_code }}
        </td>
        <td class="px-6 py-4">
          {{ branch.phone }}
        </td>
        <td class="px-6 py-4">
          <span v-if="branch.deleted_at" class="text-red-500">Nonaktif</span>
          <span v-else class="text-green-500">Aktif</span>
        </td>
        <td class="px-6 py-4">
          <div class="flex flex-row gap-2">
            <NuxtLink :to="`/branches/${branch.id}`"
              class="font-medium text-yellow-600 dark:text-yellow-500 hover:underline">
              <Icon name="material-symbols:visibility-outline-rounded" class="w-5 h-5" />
            </NuxtLink>
            <NuxtLink :to="`/branches/form/${branch.id}`"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
              <Icon name="material-symbols-light:ink-pen-rounded" class="w-5 h-5" />
            </NuxtLink>
            <button @click.prevent="openDeleteConfirm(branch.id)"
              class="font-medium text-red-600 dark:text-red-500 hover:underline">
              <Icon name="material-symbols:delete-forever-outline" class="w-5 h-5" />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>


            <!-- Jika Data Kosong -->
            <div v-else-if="!isLoading && branches.length === 0"
                class="text-center py-10 text-gray-600 dark:text-gray-300">
                Tidak ada data branch.
            </div>
        </section>

        <!-- Modal Konfirmasi Hapus -->
        <ModalConfirm :show="showConfirm" :loading="isDeleting" title="Konfirmasi Hapus"
            message="Apakah Anda yakin ingin menghapus branch ini? Tindakan ini tidak dapat dibatalkan."
            @confirm="handleConfirmDelete" @cancel="() => { if (!isDeleting) showConfirm = false }" />

    </NuxtLayout>
</template>