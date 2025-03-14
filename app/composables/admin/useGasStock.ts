import { useCustomFetch } from '~~/plugins/fetch-interceptor'

export interface GasStockForm {
  branch_id: string
  gas_type: '3kg' | '5kg' | '12kg'
  stock: number
}

export function useAdminGasStock() {
  const config = () => useRuntimeConfig()

  // ✅ Fetch all Gas Stocks
  const fetchGasStocks = async () => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/gas-stocks`, {
      method: 'GET'
    })
    return { data, error }
  }

  // ✅ Get Gas Stock by ID
  const getGasStock = async (id: string | number) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/gas-stocks/${id}`, {
      method: 'GET'
    })
    return { data, error }
  }

  // ✅ Create new Gas Stock
  const createGasStock = async (dataInput: GasStockForm) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/gas-stocks`, {
      method: 'POST',
      body: dataInput
    })
    return { data, error }
  }

  // ✅ Update Gas Stock by ID
  const updateGasStock = async (id: string | number, dataInput: GasStockForm) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/gas-stocks/${id}`, {
      method: 'PUT',
      body: dataInput
    })
    return { data, error }
  }

  // ✅ Delete Gas Stock (soft delete)
  const deleteGasStock = async (id: string | number) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/gas-stocks/${id}`, {
      method: 'DELETE'
    })
    return { data, error }
  }

  // ✅ Restore Gas Stock
  const restoreGasStock = async (id: string | number) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/gas-stocks/restore/${id}`, {
      method: 'POST'
    })
    return { data, error }
  }

  return {
    fetchGasStocks,
    getGasStock,
    createGasStock,
    updateGasStock,
    deleteGasStock,
    restoreGasStock
  }
}
