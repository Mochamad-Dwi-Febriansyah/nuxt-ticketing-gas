// ~/composables/admin_cabang/useGasStock.ts
import { useCustomFetch } from '~~/plugins/fetch-interceptor'

export interface GasStockForm {
  gas_type: string
  stock: number
}

export const useAdminCabangGasStock = () => {
  const config = () => useRuntimeConfig()

  // ✅ Get all gas stocks in branch
  const fetchGasStocksByBranch = async () => {
    return await useCustomFetch()(`${config().public.apiBase}/v1/gas-stocks-by-branch`, { method: 'GET' })
  }

  // ✅ Create gas stock
  const createGasStockByBranch = async (payload: GasStockForm) => {
    return await useCustomFetch()(`${config().public.apiBase}/v1/gas-stocks-by-branch`, {
      method: 'POST',
      body: payload
    })
  }

  // ✅ Update gas stock
  const updateGasStockByBranch = async (id: number | string, payload: GasStockForm) => {
    return await useCustomFetch()(`${config().public.apiBase}/v1/gas-stocks-by-branch/${id}`, {
      method: 'PUT',
      body: payload
    })
  }

  // ✅ Delete gas stock
  const deleteGasStockByBranch = async (id: number | string) => {
    return await useCustomFetch()(`${config().public.apiBase}/v1/gas-stocks-by-branch/${id}`, {
      method: 'DELETE'
    })
  }

  return {
    fetchGasStocksByBranch,
    createGasStockByBranch,
    updateGasStockByBranch,
    deleteGasStockByBranch
  }
}
