<script setup lang="ts">
import { useAdminGasStock } from '~/composables/admin/useGasStock'
import { useAdminBranch } from '~/composables/admin/useBranch'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { object, string, number } from 'yup'

import Input from '~/components/ui/Input.vue'
import Select from '~/components/ui/Select.vue'

import { useNotification } from '@/composables/useNotification'

const route = useRoute()
const router = useRouter()
const { createGasStock, getGasStock, updateGasStock } = useAdminGasStock()
const { fetchBranches } = useAdminBranch()

const { addNotification } = useNotification()

const isEditMode = ref(false)
const isLoading = ref(false)
const error = ref<string | null>(null)
const gasStockId = route.params.id

const branches = ref<any[]>([])

// Schema validasi
const schema = toTypedSchema(
  object({
    gas_type: string().oneOf(['3kg', '5kg', '12kg'], 'Jenis gas tidak valid').required('Jenis gas wajib dipilih'),
    stock: number().required('Jumlah stok wajib diisi').min(0, 'Tidak boleh kurang dari 0'),
    branch_id: string().required('Cabang wajib dipilih'),
  })
)

// Setup form
const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    gas_type: '3kg',
    stock: 0,
    branch_id: '',
  }
})

// Fetch data untuk edit dan cabang
onMounted(async () => {
  isLoading.value = true
  try {
    const { data: branchData } = await fetchBranches()
    branches.value = branchData.result || []

    if (gasStockId !== 'create') {
      isEditMode.value = true
      const { data } = await getGasStock(String(gasStockId))
      if (data?.result) setValues(data.result)
    }
  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
})

// Handle Submit
const onSubmit = handleSubmit(async (formData) => {
  isLoading.value = true
  try {
    if (isEditMode.value) {
      const response = await updateGasStock(String(gasStockId), formData)
      addNotification('success', response.data.message)
    } else {
      const response = await createGasStock(formData)
      addNotification('success', response.data.message)
    }
    router.push('/gas-stocks')
  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section class="p-4 max-w-3xl mx-auto">
    <div class="flex items-center gap-2 mb-4">
      <button @click="router.back()" class="p-2 rounded-full hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-2xl font-bold">{{ isEditMode ? 'Edit Stok Gas' : 'Tambah Stok Gas' }}</h1>
    </div>

    <div v-if="error" class="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg">{{ error }}</div>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <Select
        name="gas_type"
        label="Jenis Gas"
        :options="[
          { label: '3 Kg', value: '3kg' },
          { label: '5 Kg', value: '5kg' },
          { label: '12 Kg', value: '12kg' }
        ]"
        placeholder="Pilih Jenis Gas"
        required
      />
      <Input name="stock" type="number" label="Jumlah Stok" placeholder="0" required />
      <Select
        name="branch_id"
        label="Cabang"
        :options="branches.map(branch => ({ label: branch.name, value: branch.id }))"
        placeholder="Pilih Cabang"
        required
      />

      <button type="submit" class="btn-primary w-full" :disabled="isLoading">
        {{ isEditMode ? 'Perbarui' : 'Simpan' }}
      </button>
    </form>
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
</style>
