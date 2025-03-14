import { useCustomFetch } from "~~/plugins/fetch-interceptor"

interface BranchForm {
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

export function useAdminBranch() {
  const config = () => useRuntimeConfig()

  // Fetch all branches
  const fetchBranches = async () => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/branches`, { method: 'GET' })
    return { data, error }
  }

  // Get branch by ID
  const getBranch = async (id: string | number) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/branches/${id}`, { method: 'GET' })
    return { data, error }
  }

  // Create new branch
  const createBranch = async (dataInput: BranchForm) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/branches`, { 
      method: 'POST',
      body: dataInput
    })
    return { data, error }
  }

  // Update branch by ID
  const updateBranch = async (id: string | number, dataInput: BranchForm) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/branches/${id}`, { 
      method: 'PUT',
      body: dataInput
    })
    return { data, error }
  }

  // Delete branch (soft delete if applicable)
  const deleteBranch = async (id: string | number) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/branches/${id}`, { method: 'DELETE' })
    return { data, error }
  }

  // Restore deleted branch
  const restoreBranch = async (id: string | number) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/branches/restore/${id}`, { method: 'POST' })
    return { data, error }
  }

  return {
    fetchBranches,
    getBranch,
    createBranch,
    updateBranch,
    deleteBranch,
    restoreBranch
  }
}
