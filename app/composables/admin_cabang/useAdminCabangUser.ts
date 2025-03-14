// ~/composables/admin_cabang/useUser.ts
import { useCustomFetch } from '~~/plugins/fetch-interceptor'

export const useAdminCabangUser = () => {
  const config = () => useRuntimeConfig()

  // Get all users in branch
  const getUsersByBranch = async () => {
    return await useCustomFetch()(`${config().public.apiBase}/v1/users-by-branch`, { method: 'GET' })
  }

  return {
    getUsersByBranch
  }
}
