<script setup lang="ts">
import { ref, onMounted } from 'vue'

declare global {
    interface Window {
        snap: any;
    }
}
import { useUserGasStock } from '~/composables/user/useGasStock'

// Composable untuk ambil data
const { fetchGasStocksByBranch } = useUserGasStock()

// State
const gasStocks = ref()
const error = ref<string | null>(null)
const isLoading = ref(false)

// Modal state
const showModal = ref(false)
const selectedStock = ref<any>(null) // Data yang dipilih untuk dibeli

// Ambil data saat mounted
onMounted(async () => {
    isLoading.value = true
    try {
        const { data, error: fetchError } = await fetchGasStocksByBranch()
        console.log(data)
        gasStocks.value = data.result
    } catch (err: any) {
        error.value = err.message
    } finally {
        isLoading.value = false
    }
})
const quantity = ref<number>(1) // Default quantity 1
const openBuyModal = (stock: any) => {
    selectedStock.value = stock
    quantity.value = 1
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    selectedStock.value = null
    quantity.value = 1
}
interface OrderResponse {
    snap_token: string;
}
const buyGas = async () => {
    const config = useRuntimeConfig()
    const token = useCookie('access_token')
    if (!selectedStock.value) return
    try {

        const { data, error } = await useFetch<OrderResponse>(`${config.public.apiBase}/v1/orders-by-user`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token.value}`},
            body: {
                branch_id: selectedStock.value.branch_id,
                gas_type: selectedStock.value.gas_type,
                quantity: quantity.value,
                price: selectedStock.value.price ?? (
                    selectedStock.value.gas_type === '3kg' ? 2 :
                        selectedStock.value.gas_type === '5kg' ? 120000 :
                            selectedStock.value.gas_type === '12kg' ? 300000 : 0
                ),
            },
        })

        if (error.value) {
            console.error('Gagal membuat order:', error.value)
            alert('Gagal membuat order. Coba lagi.')
            return
        }

        const snapToken = data.value?.snap_token

        // Panggil Midtrans Snap popup
        window.snap.pay(snapToken, {
            onSuccess: function (result: any) {
                console.log('Pembayaran berhasil:', result)
                alert('Pembayaran berhasil!')
            },
            onPending: function (result: any) {
                console.log('Pembayaran tertunda:', result)
                alert('Pembayaran tertunda, silakan selesaikan.')
            },
            onError: function (result: any) {
                console.error('Pembayaran gagal:', result)
                alert('Pembayaran gagal, coba lagi.')
            },
            onClose: function () {
                console.log('Popup ditutup sebelum selesai')
                alert('Kamu menutup pembayaran.')
            }
        })

        closeModal() // Tutup modal
    } catch (err) {
        console.error('Error saat membeli gas:', err)
        alert('Terjadi kesalahan, coba lagi.')
    }
}
</script>

<template>
    <NuxtLayout>
        <!-- Hero Section -->
        <section class="bg-blue-600 py-16 relative">
            <div class="container mx-auto px-4 text-center text-white">
                <h2 class="text-3xl font-bold mb-4">Anda terdaftar di cabang Selatan.</h2>
            </div>
        </section>

        <!-- Floating Search & Gas Stock Section -->
        <div class="relative z-10">
            <div class="container mx-auto px-4">
                <div
                    class="bg-white p-6 rounded-lg w-full shadow-lg max-w-4xl mx-auto flex flex-col gap-4 items-center -mt-16">
                    <!-- Skeleton Loader -->
                    <div v-if="isLoading" class="space-y-4 w-full">
                        <div v-for="n in 3" :key="n" class="flex items-center space-x-4 animate-pulse">
                            <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
                            <div class="flex-1 space-y-2 py-1">
                                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                            <div class="w-16 h-4 bg-gray-200 rounded"></div>
                        </div>
                    </div>

                    <!-- Gas Stock List -->
                    <div v-else class="w-full">
                        <ul role="list" class="divide-y divide-gray-200">
                            <li v-for="(stock, index) in gasStocks" :key="index" class="py-3 sm:py-4">
                                <div class="flex items-center">
                                    <div class="shrink-0">
                                        <NuxtImg src="/images/download.jpeg" class="w-8 h-8 rounded-full" />
                                    </div>
                                    <div class="flex-1 min-w-0 ms-4">
                                        <p class="text-sm font-medium text-gray-900 truncate">{{ stock.gas_type }}</p>
                                        <p class="text-sm text-gray-500 truncate">Stok: {{ stock.stock }}</p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        Rp. {{
                                            (
                                                stock.price ??
                                                (stock.gas_type === '3kg'
                                                    ? 20000
                                                    : stock.gas_type === '5kg'
                                                        ? 120000
                                                        : stock.gas_type === '12kg'
                                                            ? 300000
                                        : 0)
                                        ).toLocaleString('id-ID')
                                        }}
                                    </div>
                                    <button @click="openBuyModal(stock)"
                                        class="bg-blue-500 ms-3 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
                                        Beli
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Beli -->
        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 class="text-lg font-semibold mb-4">Beli Gas {{ selectedStock.gas_type }}</h3>
                <p class="text-gray-700 mb-2">Harga: Rp. {{
                    (
                        selectedStock.price ??
                        (selectedStock.gas_type === '3kg'
                            ? 20000
                            : selectedStock.gas_type === '5kg'
                                ? 120000
                                : selectedStock.gas_type === '12kg'
                                    ? 300000
                    : 0)
                    ).toLocaleString('id-ID')
                    }}</p>

                <form @submit.prevent="buyGas">
                    <div class="mb-4">
                        <label for="jumlah" class="block text-sm font-medium text-gray-700">Jumlah</label>
                        <input v-model="quantity" type="number" id="jumlah" name="jumlah" min="1" required
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>

                    <div class="flex justify-end space-x-2">
                        <button type="button" @click="closeModal"
                            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                            Batal
                        </button>
                        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Beli Sekarang
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </NuxtLayout>
</template>
