import { useCustomFetch } from '~~/plugins/fetch-interceptor'

export interface GasStockForm {
  branch_id: string
  gas_type: '3kg' | '5kg' | '12kg'
  stock: number
}

export function useUserGasStock() {
  const config = () => useRuntimeConfig()

  // ✅ Fetch all Gas Stocks
  const fetchGasStocksByBranch = async () => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/gas-stocks-by-branch-user`, {
      method: 'GET'
    })
    return { data, error }
  } 
 

  return {
    fetchGasStocksByBranch, 
  }
}
