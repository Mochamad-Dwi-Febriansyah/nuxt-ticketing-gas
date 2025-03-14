// composables/useAuth.ts
import { useFetch } from '#app'
import { ref } from 'vue'

interface User {
  id: number;
  name: string;
  email: string;
  nik: string;
  kk: string;
  phone: string;
  role: string
  // Tambah field lain sesuai kebutuhan
}

interface LoginResponse {
  success: boolean;
  message: string;
  result: {
    token: string;
    user: User;
  };
}

interface DefaultResponse {
  success: boolean;
  message: string;
}

export const useAuth = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const config = () => useRuntimeConfig()
  const errors = ref<Record<string, string[]>>({})

  // Cookie handling
  const tokenCookie = useCookie('access_token', { path: '/' })
  const roleCookie = useCookie('role', { path: '/' })

  const setToken = (token: string) => {
    tokenCookie.value = token
  }
  const setRole = (token: string) => {
    roleCookie.value = token
  }

  const getToken = () => {
    return tokenCookie.value
  }

  const removeToken = () => {
    tokenCookie.value = null
  }
  const removeRole = () => {
    roleCookie.value = null
  }

  // REGISTER
  const register = async (data: any) => {
    loading.value = true
    error.value = null
    errors.value = {}

    try {
      const { data: res, error: fetchError } = await useFetch<DefaultResponse>(`${config().public.apiBase}/v1/auth/register`, {
        method: 'POST',
        body: data,
      })

      if (fetchError.value?.data?.errors) {
        errors.value = fetchError.value.data.errors
      }

      if (fetchError.value?.data?.message) {
        throw new Error(fetchError.value.data.message)
      }

      if (!res.value?.success) throw new Error(res.value?.message || 'Registrasi gagal')

      return res.value
    } catch (err: any) {
      error.value = err.message || 'Terjadi kesalahan'
      throw err
    } finally {
      loading.value = false
    }
  }

  // VERIFY OTP
  const verifyOtp = async (data: { nik: string; otp: string }) => {
    loading.value = true
    error.value = null

    try {
      const { data: res, error: fetchError } = await useFetch<LoginResponse>(`${config().public.apiBase}/v1/auth/verify-otp`, {
        method: 'POST',
        body: data,
      })

      if (fetchError.value?.data?.message) {
        throw new Error(fetchError.value.data.message)
      }

      if (!res.value?.success) throw new Error(res.value?.message || 'Verifikasi OTP gagal')

      if (res.value?.result?.token) {
        setToken(res.value.result.token)
      }

      return res.value
    } catch (err: any) {
      error.value = err.message || 'Terjadi kesalahan'
      throw err
    } finally {
      loading.value = false
    }
  }

  // LOGIN
  const login = async (data: { nik: string; password: string }) => {
    loading.value = true
    error.value = null

    try {
      const { data: res, error: fetchError } = await useFetch<LoginResponse>(`${config().public.apiBase}/v1/auth/login`, {
        method: 'POST',
        body: data,
      })

      if (fetchError.value?.data?.message) {
        throw new Error(fetchError.value.data.message)
      }

      if (!res.value?.success) throw new Error(res.value?.message || 'Login gagal')

      // Simpan token ke cookie
      if (res.value?.result) {
        setToken(res.value.result.token)
        setRole(res.value.result.user.role)
      } 

      return res.value
    } catch (err: any) {
      error.value = err.message || 'Terjadi kesalahan'
      throw err
    } finally {
      loading.value = false
    }
  }

  // LOGOUT
  const logout = async () => {
    loading.value = true
    error.value = null

    try {
      const token = getToken()
      if (!token) throw new Error('Token tidak ditemukan')

      const { data: res, error: fetchError } = await useFetch<DefaultResponse>(`${config().public.apiBase}/v1/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (fetchError.value) throw fetchError.value
      if (!res.value?.success) throw new Error(res.value?.message || 'Logout gagal')

      // Hapus token dari cookie
      removeToken()
      removeRole()

      return res.value
    } catch (err: any) {
      error.value = err.message || 'Terjadi kesalahan'
      throw err
    } finally {
      loading.value = false
    }
  }

  // GET PROFILE (optional, untuk auto login/refresh session)
  const getProfile = async () => {
    loading.value = true
    error.value = null

    try {
      const token = getToken()
      if (!token) throw new Error('Token tidak ditemukan')

      const { data: res, error: fetchError } = await useFetch<{ success: boolean; user: User }>(`${config().public.apiBase}/v1/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (fetchError.value) throw fetchError.value
      if (!res.value?.success) throw new Error('Gagal mendapatkan data profil')

      return res.value.user
    } catch (err: any) {
      error.value = err.message || 'Terjadi kesalahan'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    register,
    verifyOtp,
    login,
    logout,
    getProfile,
    loading,
    error,
    errors,
    getToken, // Bisa dipakai untuk API lain
  }
}
