// ~/composables/admin_cabang/useTransaction.ts
import { useCustomFetch } from '~~/plugins/fetch-interceptor'

export const useAdminCabangTransaction = () => {
  const config = () => useRuntimeConfig()

  // Get all transactions in branch
  const getTransactionsByBranch = async () => {
    return await useCustomFetch()(`${config().public.apiBase}/v1/transactions-by-branch`, { method: 'GET' })
  }

  return {
    getTransactionsByBranch
  }
}
