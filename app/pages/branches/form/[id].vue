<script setup lang="ts">
import { useAdminBranch } from '~/composables/admin/useBranch'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { object, string, boolean } from 'yup'

import Input from '~/components/ui/Input.vue'
import Textarea from '~/components/ui/Textarea.vue'
import Select from '~/components/ui/Select.vue'

import { useNotification } from '@/composables/useNotification'

const route = useRoute()
const router = useRouter()
const { createBranch, getBranch, updateBranch } = useAdminBranch()

const { addNotification } = useNotification()

const isEditMode = ref(false)
const isLoading = ref(false)
const error = ref<string | null>(null)
const branchId = route.params.id

// ✅ Yup Schema for validation
const schema = toTypedSchema(
  object({
    name: string().required('Nama cabang wajib diisi'),
    code: string().required('Kode cabang wajib diisi'),
    street_address: string().required('Alamat wajib diisi'),
    village: string().required('Desa/Kelurahan wajib diisi'),
    district: string().required('Kecamatan wajib diisi'),
    city: string().required('Kota/Kabupaten wajib diisi'),
    province: string().required('Provinsi wajib diisi'),
    postal_code: string().required('Kode Pos wajib diisi'),
    phone: string().required('Nomor telepon wajib diisi'),
    is_active: boolean().required('Status wajib dipilih'),
  })
)

// ✅ Setup VeeValidate Form
const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    code: '',
    street_address: '',
    village: '',
    district: '',
    city: '',
    province: '',
    postal_code: '',
    phone: '',
    is_active: true, // default aktif
  }
})

// ✅ Fetch Data untuk Edit Mode
onMounted(async () => {
  isLoading.value = true
  try {
    if (branchId !== 'create') {
      isEditMode.value = true
      const { data } = await getBranch(String(branchId))
      if (data?.result) {
        setValues(data.result)
      }
    }
  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
})

// ✅ Handle Submit
const onSubmit = handleSubmit(async (formData) => {
  isLoading.value = true
  error.value = null
  try {
    if (isEditMode.value) {
      const response = await updateBranch(String(branchId), { ...formData, address: formData.street_address })
      // alert('Cabang berhasil diperbarui!')
      addNotification('success', response.data.message)
    } else {
      const response = await createBranch({ ...formData, address: formData.street_address })
      // alert('Cabang berhasil dibuat!')
      addNotification('success', response.data.message)
    }
    router.push('/branches')
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
        <!-- Icon panah kiri -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-2xl font-bold">
        {{ isEditMode ? 'Edit Cabang' : 'Tambah Cabang' }}
      </h1>
    </div>

    <!-- Error -->
    <div v-if="error" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
      {{ error }}
    </div>

    <!-- Form -->
    <form @submit.prevent="onSubmit" class="space-y-4">
      <Input name="name" label="Nama Cabang" placeholder="Nama Cabang" required />
      <Input name="code" label="Kode Cabang" placeholder="Kode Cabang (unik)" required />
      <Textarea name="street_address" label="Alamat Lengkap" placeholder="Alamat Lengkap" required />
      <Input name="village" label="Desa/Kelurahan" placeholder="Nama Desa/Kelurahan" required />
      <Input name="district" label="Kecamatan" placeholder="Nama Kecamatan" required />
      <Input name="city" label="Kota/Kabupaten" placeholder="Nama Kota/Kabupaten" required />
      <Input name="province" label="Provinsi" placeholder="Nama Provinsi" required />
      <Input name="postal_code" label="Kode Pos" placeholder="Kode Pos" required />
      <Input name="phone" label="Nomor Telepon" placeholder="0812xxxxxxx" required />

      <Select
        name="is_active"
        label="Status"
        :options="[
          { label: 'Aktif', value: 'true' },
          { label: 'Tidak Aktif', value: 'false' }
        ]"
        placeholder="Pilih Status"
        required
      />

      <button type="submit" class="btn-primary" :disabled="isLoading">
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
  width: 100%;
}
</style>
