<script setup lang="ts">
import { useAdminUser } from '~/composables/admin/useUser'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { object, string, number, ref as yupRef } from 'yup'
import Input from '~/components/ui/Input.vue'
import Select from '~/components/ui/Select.vue'
import Textarea from '~/components/ui/Textarea.vue'

import { useNotification } from '@/composables/useNotification'

const { addNotification } = useNotification()

const route = useRoute()
const router = useRouter()
const { createUser, getUser, updateUser } = useAdminUser()

const isEditMode = ref(false)
const isLoading = ref(false)
const error = ref<string | null>(null)

const userId = route.params.id

// ✅ Yup Schema for validation
const schema = toTypedSchema(
  object({
    role: string().oneOf(['user', 'admin_cabang', 'super_admin']).required('Role wajib dipilih'),
    name: string().required('Nama wajib diisi'),
    nik: string().length(16, 'NIK harus 16 digit').required('NIK wajib diisi'),
    kk: string().length(16, 'No. KK harus 16 digit').required('No. KK wajib diisi'),
    phone: string().required('No HP wajib diisi'),
    email: string().email('Email tidak valid').required('Email wajib diisi'),
    password: string().when([], {
      is: () => userId === 'create',
      then: (schema) => schema.required('Password wajib diisi saat membuat user').min(6, 'Minimal 6 karakter'),
      otherwise: (schema) => schema.optional(),
    }),
    password_confirmation: string()
      .oneOf([yupRef('password')], 'Konfirmasi password tidak cocok')
      .required('Konfirmasi password wajib diisi'),
    branch_id: number().nullable(),
    street_address: string().required('Alamat wajib diisi'),
    village: string().required('Desa/Kelurahan wajib diisi'),
    district: string().required('Kecamatan wajib diisi'),
    city: string().required('Kota/Kabupaten wajib diisi'),
    province: string().required('Provinsi wajib diisi'),
    postal_code: string().required('Kode pos wajib diisi'),
  })
)

// ✅ Setup VeeValidate Form
const { handleSubmit, setValues, values } = useForm({
  validationSchema: schema,
  initialValues: {
    role: 'user',
    name: '',
    nik: '',
    kk: '',
    phone: '',
    email: '',
    password: '',
    branch_id: null,
    street_address: '',
    village: '',
    district: '',
    city: '',
    province: '',
    postal_code: ''
  }
})

// ✅ Cek Mode Edit & Fetch Data
onMounted(async () => {
    console.log(userId)
  if (userId !== 'create') {
    isEditMode.value = true
    isLoading.value = true
    try {
      const { data } = await getUser(String(userId))
      if (data?.result) {
        setValues({
          ...data.result,
          password: '' // Kosongkan password saat edit
        })
      }
    } catch (err: any) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }
})

// ✅ Handle Submit
const onSubmit = handleSubmit(async (formData) => {
  isLoading.value = true
  error.value = null
  try {
    if (isEditMode.value) {
      const response = await updateUser(String(userId), { ...formData, password: formData.password || '' }) 
      addNotification('success', response.data.message)
    } else {
        const response = await createUser({ ...formData, password: formData.password || '' }) 
      addNotification('success', response.data.message)
    }
    router.push('/admin/users')
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
        {{ isEditMode ? 'Edit User' : 'Tambah User' }}
      </h1>
    </div>

    <!-- Error -->
    <div v-if="error" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
      {{ error }}
    </div>

    <!-- Form -->
    <form @submit.prevent="onSubmit" class="space-y-4">
      <Input name="name" label="Nama" placeholder="Nama lengkap" required />
      <Input name="email" label="Email" placeholder="Email aktif" type="email" required />
      <Input name="password" label="Password" type="password" :required="!isEditMode" /> 
      <Input name="password_confirmation" label="Password Confirmation" type="password" :required="!isEditMode" />
      <Select
        name="role"
        label="Role"
        :options="[
          { label: 'User', value: 'user' },
          { label: 'Admin Cabang', value: 'admin_cabang' },
          { label: 'Super Admin', value: 'super_admin' }
        ]"
        placeholder="Pilih Role"
        required
      />
      <Input name="phone" label="No HP" placeholder="08xxxxxxxxxx" required />
      <Input name="nik" label="NIK" placeholder="16 digit NIK" required />
      <Input name="kk" label="No. KK" placeholder="16 digit KK" required />
      <Input name="branch_id" label="Branch ID" type="number" placeholder="ID Cabang (opsional)" />
      <Textarea name="street_address" label="Alamat Lengkap" placeholder="Jl. Contoh No.1" required />
      <Input name="village" label="Desa/Kelurahan" placeholder="Nama Desa/Kelurahan" required />
      <Input name="district" label="Kecamatan" placeholder="Nama Kecamatan" required />
      <Input name="city" label="Kota/Kabupaten" placeholder="Nama Kota/Kabupaten" required />
      <Input name="province" label="Provinsi" placeholder="Nama Provinsi" required />
      <Input name="postal_code" label="Kode Pos" placeholder="Kode Pos" required />

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
