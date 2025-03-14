<script setup lang="ts">
import { useAdminUser } from '~/composables/admin/useUser'
import { useNotification } from '@/composables/useNotification'

const { addNotification } = useNotification()

definePageMeta({
    layout: 'dashboard',
    middleware: 'auth'
})
const { fetchUsers, deleteUser } = useAdminUser()

// Data users
interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    deleted_at: string | null;
}

const users = ref<User[]>([])

// Loading & error state
const isLoading = ref(true)
const error = ref<string | null>(null)

// Fetch data user saat halaman dimuat
onMounted(async () => {
    try {
        const { data, error: fetchError } = await fetchUsers()
        if (fetchError) {
            error.value = fetchError.message
        } else {
            users.value = data.result // Sesuaikan response API kamu, misal { data: [] }
        }
    } catch (err: any) {
        error.value = err.message
    } finally {
        isLoading.value = false
    }
})

const isDeleting = ref(false)
const showConfirm = ref(false)
const userToDelete = ref<number | null>(null)

const openDeleteConfirm = (id: number) => {
    userToDelete.value = id
    showConfirm.value = true
}

const handleConfirmDelete = async () => {
    if (userToDelete.value !== null) {
        isDeleting.value = true // ✅ Set loading di awal
        try {
            const response = await deleteUser(userToDelete.value) // ✅ Proses async menunggu 
            // Refresh data
            addNotification('success', response.data.message)
            const { data } = await fetchUsers()
            users.value = data.result
        } catch (err: any) {
            alert('Gagal menghapus user: ' + err.message)
        } finally {
            isDeleting.value = false // ✅ Reset loading di akhir
            showConfirm.value = false // ✅ Tutup modal
            userToDelete.value = null
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
                            Users</span>
                    </h1>
                </div>

                <div class="ms-auto flex flex-row gap-2 items-start">


                    <!-- Button Tambah -->
                    <NuxtLink to="/users/form/create"
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
            <div v-if="!isLoading && users.length" class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">Nama</th>
                            <th scope="col" class="px-6 py-3">Email</th>
                            <th scope="col" class="px-6 py-3">Role</th>
                            <th scope="col" class="px-6 py-3">Status</th>
                            <th scope="col" class="px-6 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id"
                            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{
                                user.name }}</td>
                            <td class="px-6 py-4">{{ user.email }}</td>
                            <td class="px-6 py-4 capitalize">{{ user.role }}</td>
                            <td class="px-6 py-4">
                                <span v-if="user.deleted_at" class="text-red-500">Nonaktif</span>
                                <span v-else class="text-green-500">Aktif</span>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex flex-row gap-2">
                                    <NuxtLink :to="`/users/${user.id}`"
                                        class="font-medium text-yellow-600 dark:text-yellow-500 hover:underline">
                                        <Icon name="material-symbols:visibility-outline-rounded" class="w-5 h-5" />
                                    </NuxtLink>
                                    <NuxtLink :to="`/users/form/${user.id}`"
                                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        <Icon name="material-symbols-light:ink-pen-rounded" class="w-5 h-5" />
                                    </NuxtLink>
                                    <button @click.prevent="openDeleteConfirm(user.id)"
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
            <div v-else-if="!isLoading && users.length === 0"
                class="text-center py-10 text-gray-600 dark:text-gray-300">
                Tidak ada data user.
            </div>
        </section>

        <!-- Modal Konfirmasi Hapus -->
        <ModalConfirm :show="showConfirm" :loading="isDeleting" title="Konfirmasi Hapus"
            message="Apakah Anda yakin ingin menghapus user ini? Tindakan ini tidak dapat dibatalkan."
            @confirm="handleConfirmDelete" @cancel="() => { if (!isDeleting) showConfirm = false }" />

    </NuxtLayout>
</template>