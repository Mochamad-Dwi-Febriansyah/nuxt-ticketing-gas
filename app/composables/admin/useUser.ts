import { useCustomFetch } from "~~/plugins/fetch-interceptor"

interface UserForm {
  role: 'super_admin' | 'admin_cabang' | 'user'
  name: string
  nik: string
  kk: string
  phone: string
  email: string
  password: string
  branch_id?: number | null
  street_address: string
  village: string
  district: string
  city: string
  province: string
  postal_code: string
}

export function useAdminUser() {
  const config = () => useRuntimeConfig()

  const fetchUsers = async () => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/users`, { method: 'GET' }) 
    return { data, error }
  }

  const getUser = async (id: string) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/users/${id}`, { method: 'GET' })
    return { data, error }
  }

  const createUser = async (dataInput: UserForm) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/users`, { 
      method: 'POST',
      body: dataInput
    })
    return { data, error }
  }

  const updateUser = async (id: string, dataInput: UserForm) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/users/${id}`, { 
      method: 'PUT',
      body: dataInput
    })
    return { data, error }
  }

  const deleteUser = async (id: number) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/users/${id}`, { method: 'DELETE' })
    return { data, error }
  }

  const restoreUser = async (id: number) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/users/restore/${id}`, { method: 'POST' })
    return { data, error }
  }

  return {
    fetchUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    restoreUser
  }
}
