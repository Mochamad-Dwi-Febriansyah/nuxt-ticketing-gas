<script setup lang="ts">
import { useAdminOrder } from '~/composables/admin/useOrder'
import { useAdminBranch } from '~/composables/admin/useBranch'
import { useAdminUser } from '~/composables/admin/useUser'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { object, string, number, date } from 'yup'

import Input from '~/components/ui/Input.vue'
import Select from '~/components/ui/Select.vue'
import Datepicker from '~/components/ui/Datepicker.vue' // Komponen date picker custom jika ada

import { useNotification } from '@/composables/useNotification'

const route = useRoute()
const router = useRouter()
const { createOrder, getOrder, updateOrder } = useAdminOrder()
const { fetchBranches } = useAdminBranch()
const { fetchUsers } = useAdminUser()

const { addNotification } = useNotification()

const isEditMode = ref(false)
const isLoading = ref(false)
const error = ref<string | null>(null)
const orderId = route.params.id

const branches = ref<any[]>([])
const users = ref<any[]>([])

// Schema validasi
const schema = toTypedSchema(
  object({
    user_id: string().required('User wajib dipilih'),
    branch_id: string().required('Cabang wajib dipilih'),
    status: string().oneOf(['pending', 'approved', 'rejected', 'completed'], 'Status tidak valid').required('Status wajib dipilih'),
    gas_type: string().oneOf(['3kg', '5kg', '12kg'], 'Jenis gas tidak valid').required('Jenis gas wajib dipilih'),
    quantity: number().required('Jumlah wajib diisi').min(1, 'Minimal 1 tabung'),
    total_price: number().required('Total harga wajib diisi').min(0, 'Harga tidak valid'),
    pickup_date: date().nullable()
  })
)

// Setup form
const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    user_id: '',
    branch_id: '',
    status: 'pending',
    gas_type: '3kg',
    quantity: 1,
    total_price: 0,
    pickup_date: null,
  }
})

// Fetch data untuk edit, branch, dan user
onMounted(async () => {
  isLoading.value = true
  try {
    const { data: branchData } = await fetchBranches()
    branches.value = branchData.result || []

    const { data: userData } = await fetchUsers()
    users.value = userData.result || []

    if (orderId !== 'create') {
      isEditMode.value = true
      const { data } = await getOrder(String(orderId))
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
      const response = await updateOrder(String(orderId), {
        ...formData,
        pickup_date: formData.pickup_date ? formData.pickup_date.toISOString() : null
      })
      addNotification('success', response.data.message)
    } else {
      const response = await createOrder({
        ...formData,
        pickup_date: formData.pickup_date ? formData.pickup_date.toISOString() : null
      })
      addNotification('success', response.data.message)
    }
    router.push('/orders')
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
      <h1 class="text-2xl font-bold">{{ isEditMode ? 'Edit Order' : 'Tambah Order' }}</h1>
    </div>

    <div v-if="error" class="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg">{{ error }}</div>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <!-- User -->
      <Select
        name="user_id"
        label="Pelanggan (User)"
        :options="users.map(user => ({ label: user.name, value: user.id }))"
        placeholder="Pilih Pelanggan"
        required
      />

      <!-- Branch -->
      <Select
        name="branch_id"
        label="Cabang"
        :options="branches.map(branch => ({ label: branch.name, value: branch.id }))"
        placeholder="Pilih Cabang"
        required
      />

      <!-- Status -->
      <Select
        name="status"
        label="Status"
        :options="[
          { label: 'Pending', value: 'pending' },
          { label: 'Approved', value: 'approved' },
          { label: 'Rejected', value: 'rejected' },
          { label: 'Completed', value: 'completed' }
        ]"
        placeholder="Pilih Status"
        required
      />
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

      <!-- Quantity -->
      <Input name="quantity" type="number" label="Jumlah Tabung" placeholder="Jumlah tabung" min="1" required />

      <!-- Total Price -->
      <Input name="total_price" type="number" label="Total Harga (Rp)" placeholder="0" min="0" required />

      <!-- Pickup Date -->
      <Datepicker name="pickup_date" label="Tanggal Pengambilan (Opsional)" />

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
