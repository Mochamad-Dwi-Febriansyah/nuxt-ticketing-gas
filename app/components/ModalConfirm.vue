<!-- components/ModalConfirm.vue -->
<template>
    <div v-if="show" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                {{ title }}
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
                {{ message }}
            </p>
            <div class="flex justify-end gap-3">
                <button @click="$emit('cancel')"
                    class="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    :disabled="loading">
                    Batal
                </button>
                <button @click="$emit('confirm')" :disabled="loading" class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 flex items-center justify-center gap-2">
                    <!-- <svg v-if="loading" class="animate-spin h-4 w-4 text-white " xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg> -->
                    <Icon v-if="loading" name="codex:loader" class="animate-spin w-5 h-5" />
                    <span v-else>Hapus</span>
                    <!-- <span>{{ loading ? 'Menghapus...' : 'Hapus' }}</span> -->
                </button>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    show: boolean
    title?: string
    message?: string
    loading?: boolean
}>()

defineEmits(['confirm', 'cancel'])
</script>