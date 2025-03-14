<script setup lang="ts">
import { ref } from 'vue'
import { useForm, Field, ErrorMessage } from 'vee-validate'
import { object, string, ref as yupRef } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import Button from './ui/Button.vue'
import Input from './ui/Input.vue'
import { useAuth } from '@/composables/useAuth'
import { useNotification } from '@/composables/useNotification'

// Props & Emits
const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['close', 'switchToLogin'])

// Composables
const { register, errors } = useAuth()
const { addNotification } = useNotification()
const router = useRouter()
const isLoading = ref(false)

// Validasi Schema
const schema = toTypedSchema(
  object({
    name: string().required('Nama wajib diisi'),
    email: string().email('Format email tidak valid').required('Email wajib diisi'),
    password: string().min(6, 'Minimal 6 karakter').required('Password wajib diisi'),
    password_confirmation: string()
      .oneOf([yupRef('password')], 'Konfirmasi password tidak cocok')
      .required('Konfirmasi password wajib diisi'),
    nik: string().length(16, 'NIK harus 16 digit').required('NIK wajib diisi'),
    kk: string().length(16, 'KK harus 16 digit').required('KK wajib diisi'),
    phone: string().required('No HP wajib diisi'),
    street_address: string().nullable(),
    subdistrict: string().nullable(),
    district: string().nullable(),
    province: string().nullable(),
    village: string().nullable(),
    postal_code: string().nullable(),
  })
)

// Form init
const { handleSubmit, resetForm } = useForm({ validationSchema: schema })

// Submit Function
const onSubmit = handleSubmit(async (formData) => {
  isLoading.value = true
  try {
    await register(formData)
    addNotification('success', 'Pendaftaran berhasil, silakan login.')
    resetForm()
    emit('close') // Tutup modal
    router.push({ path: '/otp-verification', query: { nik: formData.nik, email: formData.email } }) 
  } catch (error: any) {
    console.error(error)
    addNotification('error', error.message || 'Pendaftaran gagal, periksa kembali data Anda.')
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur p-4">
    <div class="bg-white rounded-2xl shadow-xl max-w-md w-full relative max-h-[90vh] overflow-y-auto">

      <!-- Tombol Close -->
      <Button @click="emit('close')" variant="ghost" class="absolute top-3 right-3">
        <Icon name="mdi:close" class="w-5 h-5" />
      </Button>

      <div class="p-6">
        <h2 class="text-2xl font-bold text-center mb-4">Daftar Akun GasConnect</h2>

        <!-- Form -->
        <form @submit.prevent="onSubmit" class="space-y-4">
          <!-- Nama -->
          <div>
            <label>Nama Lengkap</label>
            <Input name="name" label="Nama Lengkap" placeholder="Nama Lengkap" required />
            <!-- <Field name="name" v-slot="{ field }"><Input v-bind="field" placeholder="Nama Lengkap" /></Field> -->
            <!-- <ErrorMessage name="name" class="text-red-500 text-sm mt-1" /> -->
            <p v-if="errors['name']" class="text-red-500 text-sm">{{ errors['name'][0] }}</p>
          </div>

          <!-- Email -->
          <div>
            <label>Email</label>
            <Input name="email" label="Email" placeholder="Email" required />
            <!-- <Field name="email" v-slot="{ field }"><Input v-bind="field" placeholder="Email" /></Field>
            <ErrorMessage name="email" class="text-red-500 text-sm mt-1" /> -->
            <p v-if="errors['email']" class="text-red-500 text-sm">{{ errors['email'][0] }}</p>
          </div>

          <!-- Password -->
          <div>
            <label>Password</label>
            <Input name="password" label="Password" placeholder="Password" required />
            <!-- <Field name="password" v-slot="{ field }"><Input v-bind="field" type="password" placeholder="Password" /></Field>
            <ErrorMessage name="password" class="text-red-500 text-sm mt-1" /> -->
            <p v-if="errors['password']" class="text-red-500 text-sm">{{ errors['password'][0] }}</p>
          </div>

          <!-- Konfirmasi Password -->
          <div>
            <label>Konfirmasi Password</label>
            <Input name="password_confirmation" label="Konfirmasi Password" placeholder="Konfirmasi Password" required />
            <!-- <Field name="password_confirmation" v-slot="{ field }"><Input v-bind="field" type="password" placeholder="Konfirmasi Password" /></Field>
            <ErrorMessage name="password_confirmation" class="text-red-500 text-sm mt-1" /> -->
            <p v-if="errors['password_confirmation']" class="text-red-500 text-sm">{{ errors['password_confirmation'][0] }}</p>
          </div>

          <!-- NIK -->
          <div>
            <label>NIK</label>
            <Input name="nik" label="NIK" placeholder="NIK" required />
            <!-- <Field name="nik" v-slot="{ field }"><Input v-bind="field" placeholder="NIK" /></Field> -->
            <!-- <ErrorMessage name="nik" class="text-red-500 text-sm mt-1" /> -->
            <p v-if="errors['nik']" class="text-red-500 text-sm">{{ errors['nik'][0] }}</p>
          </div>

          <!-- KK -->
          <div>
            <label>KK</label>
            <Input name="kk" label="KK" placeholder="KK" required />
            <!-- <Field name="kk" v-slot="{ field }"><Input v-bind="field" placeholder="KK" /></Field> -->
            <!-- <ErrorMessage name="kk" class="text-red-500 text-sm mt-1" /> -->
            <p v-if="errors['nik']" class="text-red-500 text-sm">{{ errors['nik'][0] }}</p>
          </div>

          <!-- No HP -->
          <div>
            <label>No HP</label>
            <Input name="phone" label="Nomor HP" placeholder="08xxxxx" required />
            <!-- <Field name="phone" v-slot="{ field }"><Input v-bind="field" placeholder="08xxxxx" /></Field> -->
            <!-- <ErrorMessage name="phone" class="text-red-500 text-sm mt-1" /> -->
            <p v-if="errors['phone']" class="text-red-500 text-sm">{{ errors['phone'][0] }}</p>
          </div>

          <!-- Alamat (Opsional) -->
          <div>
            <label>Alamat (Opsional)</label>
            <Input name="street_address" label="Jalan, No, RT/RW" placeholder="Jalan, No, RT/RW" required />
            <!-- <Field name="street_address" v-slot="{ field }"><Input v-bind="field" placeholder="Jalan, No, RT/RW" /></Field> -->
            <p v-if="errors['street_address']" class="text-red-500 text-sm">{{ errors['street_address'][0] }}</p>
          </div>

          <div>
            <label>Kelurahan</label>
            <Input name="village" label="Kelurahan/Desa" placeholder="Kelurahan/Desa" required />
            <!-- <Field name="village" v-slot="{ field }"><Input v-bind="field" placeholder="Kelurahan/Desa" /></Field> -->
             <p v-if="errors['village']" class="text-red-500 text-sm">{{ errors['village'][0] }}</p>
          </div>

          <div>
            <label>Kecamatan</label>
            <Input name="subdistrict" label="Kecamatan" placeholder="Kecamatan" required />
            <!-- <Field name="subdistrict" v-slot="{ field }"><Input v-bind="field" placeholder="Kecamatan" /></Field> -->
             <p v-if="errors['subdistrict']" class="text-red-500 text-sm">{{ errors['subdistrict'][0] }}</p>
          </div>

          <div>
            <label>Kabupaten</label>
            <Input name="district" label="Kabupaten" placeholder="Kabupaten" required />
            <!-- <Field name="district" v-slot="{ field }"><Input v-bind="field" placeholder="Kabupaten" /></Field> -->
             <p v-if="errors['district']" class="text-red-500 text-sm">{{ errors['district'][0] }}</p>
          </div>

          <div>
            <label>Provinsi</label>
            <Input name="province" label="Province" placeholder="Province" required />
            <!-- <Field name="province" v-slot="{ field }"><Input v-bind="field" placeholder="Provinsi" /></Field> -->
             <p v-if="errors['province']" class="text-red-500 text-sm">{{ errors['province'][0] }}</p>
          </div>

          <div>
            <label>Kode Pos</label>
            <Input name="postal_code" label="Kode Pos" placeholder="Kode Pos" required />
            <!-- <Field name="postal_code" v-slot="{ field }"><Input v-bind="field" placeholder="Kode Pos" /></Field> -->
             <p v-if="errors['postal_code']" class="text-red-500 text-sm">{{ errors['postal_code'][0] }}</p>
          </div>

          <!-- Tombol Daftar -->
          <Button type="submit" :disabled="isLoading" class="w-full">
            {{ isLoading ? 'Memproses...' : 'Daftar Sekarang' }}
          </Button>
        </form>

        <!-- Link ke Login -->
        <p class="mt-4 text-center text-sm">
          Sudah punya akun?
          <button @click="emit('switchToLogin')" class="text-blue-600 hover:underline">Masuk disini</button>
        </p>
      </div>
    </div>
  </div>
</template>
