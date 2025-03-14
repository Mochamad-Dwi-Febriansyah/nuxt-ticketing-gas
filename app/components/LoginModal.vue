<script setup lang="ts">
import { ref } from 'vue'
import { useForm, Field, ErrorMessage } from 'vee-validate'
import { object, string, ref as yupRef } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import Button from './ui/Button.vue'
import Input from './ui/Input.vue'
import { useAuth } from '@/composables/useAuth'
import { useNotification } from '@/composables/useNotification'

// Props dan Emits
const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['close', 'open-register'])

// Composables
const { login } = useAuth()
const { addNotification } = useNotification()
const router = useRouter()

// State loading
const isLoading = ref(false)

// Schema validasi
const schema = toTypedSchema(
  object({
    nik: string().length(16, 'NIK harus 16 digit').required('NIK wajib diisi'),
    password: string().min(6, 'Minimal 6 karakter').required('Password wajib diisi'),
    // confirmPassword: string()
    //   .oneOf([yupRef('password')], 'Konfirmasi password tidak cocok')
    //   .required('Konfirmasi password wajib diisi'),
  })
)

// Form init
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
})

// Submit function
const onSubmit = handleSubmit(async (formData) => {
  isLoading.value = true
  try {
    const response = await login(formData)
    const role = computed(() => useCookie('role').value) 
    console.log(role)
    addNotification('success', response.message || 'Login berhasil!')
    resetForm()
    emit('close')
    if (role.value === 'super_admin') {
      router.push('/dashboard/admin')
    } else if (role.value === 'admin_cabang') {
      router.push('/dashboard/admin_cabang')
    } else if (role.value === 'user') {
      router.push('/dashboard/user') // ganti sesuai kebutuhan
    } else {
      router.push('/') // default redirect
    }

  } catch (error: any) {
    // console.error(error.message)
    addNotification('error', error.message || 'Login gagal, periksa kembali data Anda.')
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur p-4"
  >
    <div class="bg-white rounded-2xl shadow-xl max-w-md w-full relative max-h-[90vh] overflow-y-auto">

      <Button @click="emit('close')" variant="ghost" class="absolute top-3 right-3">
        <Icon name="mdi:close" class="w-5 h-5" />
      </Button>

      <div class="p-6">
        <h2 class="text-2xl font-bold text-center mb-4">Sign In to GasConnect</h2>

        <!-- Form -->
        <form @submit.prevent="onSubmit" class="space-y-4">

          <!-- NIK -->
          <div>
            <!-- <label class="font-medium">NIK</label> -->
            <Input name="nik" label="NIK" placeholder="16 digit NIK" required />
            <!-- <Field name="nik" v-slot="{ field }">
              <Input v-bind="field" placeholder="16 digit NIK" />
            </Field> -->
            <!-- <ErrorMessage name="nik" class="text-red-500 text-sm mt-1" /> -->
          </div>

          <!-- Password -->
          <div>
            <!-- <label class="font-medium">Password</label> -->
            <Input name="password" label="password" placeholder="******" required />
            <!-- <Field name="password" v-slot="{ field }">
              <Input v-bind="field" type="password" placeholder="******" />
            </Field> -->
            <!-- <ErrorMessage name="password" class="text-red-500 text-sm mt-1" /> -->
          </div>

          <!-- Konfirmasi Password -->
          <!-- <div> -->
            <!-- <label class="font-medium">Konfirmasi Password</label> -->
            <!-- <Input name="confirmPassword" label="confirmPassword" placeholder="******" required /> -->
            <!-- <Field name="confirmPassword" v-slot="{ field }">
              <Input v-bind="field" type="password" placeholder="******" />
            </Field>
            <ErrorMessage name="confirmPassword" class="text-red-500 text-sm mt-1" /> -->
          <!-- </div> -->

          <!-- Tombol Submit -->
          <Button type="submit" :disabled="isLoading" class="w-full">
            {{ isLoading ? 'Processing...' : 'Sign In' }}
          </Button>
        </form>

        <!-- Link ke Register -->
        <p class="text-center text-sm mt-4">
          Belum punya akun?
          <button @click="emit('open-register')" class="text-blue-600 hover:underline">
            Daftar
          </button>
        </p>

      </div>
    </div>
  </div>
</template>
