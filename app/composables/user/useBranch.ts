// composables/useUserBranch.ts
import { useFetch } from '#app'

export interface BranchForm {
  name: string
  code: string
  address: string
  city: string
  village: string
  district: string
  province: string
  postal_code: string
  phone: string    
}

export function useUserBranch() {
  const config = useRuntimeConfig()

  // Fetch all branches
  const fetchBranches = async () => {
    const { data, error } = await useFetch<{ success: boolean; result: BranchForm[] }>(
      `${config.public.apiBase}/v1/branches`, 
      { method: 'GET' }
    )
    return { data, error }
  }

  return { fetchBranches }
}
