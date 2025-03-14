<script setup lang="ts">
import { useAdminCabangOrder } from '~/composables/admin_cabang/useAdminCabangOrder'
import { useNotification } from '@/composables/useNotification'

const { addNotification } = useNotification()

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

// ✅ Ambil method sesuai composable
const { getOrdersByBranch } = useAdminCabangOrder()

export interface Order {
  id: string
  user_id: string
  branch_id: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  quantity: number
  total_price: number
  pickup_date: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
  user: any
}

const orders = ref<Order[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

// ✅ Fungsi fetch untuk digunakan saat mounted dan refresh
const loadOrders = async () => {
  isLoading.value = true
  try {
    const { data, error: fetchError } = await getOrdersByBranch()
    if (fetchError) {
      error.value = fetchError.message
    } else {
      orders.value = data.result
    }
  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

// ✅ Fetch orders saat halaman dimuat
onMounted(async () => {
  await loadOrders()
})

const isDeleting = ref(false)
const showConfirm = ref(false)
const orderToDelete = ref<string | null>(null)

const openDeleteConfirm = (id: string) => {
  orderToDelete.value = id
  showConfirm.value = true
}

// const handleConfirmDelete = async () => {
//   if (orderToDelete.value !== null) {
//     isDeleting.value = true
//     try {
//       const response = await deleteOrderByBranch(orderToDelete.value)
//       addNotification('success', response.data.message)
//       await loadOrders() // ✅ Refresh setelah hapus
//     } catch (err: any) {
//       addNotification('error', 'Gagal menghapus order: ' + err.message)
//     } finally {
//       isDeleting.value = false
//       showConfirm.value = false
//       orderToDelete.value = null
//     }
//   }
// }
</script>
<template>
  <NuxtLayout>
    <section class="p-4">
      <div class="mb-3 flex flex-row">
        <div>
                    <h1 class="text-xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
                        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Manage
                            Orders</span>
                    </h1>
                </div>
                <div class="ms-auto flex flex-row gap-2 items-start">


<!-- Button Tambah -->
<!-- <NuxtLink to="/orders/form/create"
    class="flex items-center text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-3 py-1.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">
    <Icon name="material-symbols:create-new-folder-outline" class="w-5 h-5" />
</NuxtLink> -->
</div>
      </div>

      <div v-if="error"
                class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert">
                {{ error }}
            </div>
            <div v-if="isLoading" class="text-center py-10 text-gray-600 dark:text-gray-300">
                Loading data orders...
            </div>

      <div v-if="!isLoading && orders.length" class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">User</th>
              <th scope="col" class="px-6 py-3">Cabang</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">Qty</th>
              <th scope="col" class="px-6 py-3">Total</th>
              <th scope="col" class="px-6 py-3">Pickup Date</th>
              <th scope="col" class="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id"   class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ order.user?.name }}</td>
              <td class="px-6 py-4">{{ order.branch_id }}</td>
              <td class="px-6 py-4">{{ order.status }}</td>
              <td class="px-6 py-4">{{ order.quantity }}</td>
              <td class="px-6 py-4">Rp {{ order.total_price }}</td>
              <td class="px-6 py-4">{{ order.pickup_date ?? '-' }}</td>
              <td class="px-6 py-4">
                <div class="flex flex-row gap-2">
                  <NuxtLink :to="`/orders-by-branch/${order.id}`"
                    class="font-medium text-yellow-600 dark:text-yellow-500 hover:underline">
                    <Icon name="material-symbols:visibility-outline-rounded" class="w-5 h-5" />
                  </NuxtLink>
                  <!-- <NuxtLink :to="`/orders/form/${order.id}`"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    <Icon name="material-symbols-light:ink-pen-rounded" class="w-5 h-5" />
                  </NuxtLink> -->
                  <!-- <button @click.prevent="openDeleteConfirm(order.id)"
                    class="font-medium text-red-600 dark:text-red-500 hover:underline">
                    <Icon name="material-symbols:delete-forever-outline" class="w-5 h-5" />
                  </button> -->
                </div> 
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else-if="!isLoading && orders.length === 0" class="text-center py-10">Tidak ada data order.</div>
    </section>

    <!-- Modal Konfirmasi Hapus -->
    <!-- <ModalConfirm :show="showConfirm" :loading="isDeleting" title="Konfirmasi Hapus"
      message="Apakah Anda yakin ingin menghapus order ini?" @confirm="handleConfirmDelete"
      @cancel="() => { if (!isDeleting) showConfirm = false }" /> -->
  </NuxtLayout>
</template>
