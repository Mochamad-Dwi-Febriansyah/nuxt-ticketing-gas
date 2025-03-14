// ~/composables/admin_cabang/useOrder.ts
import { useCustomFetch } from '~~/plugins/fetch-interceptor'

export const useAdminCabangOrder = () => {
  const config = () => useRuntimeConfig()

  // Get all orders in branch
  const getOrdersByBranch = async () => {
    return await useCustomFetch()(`${config().public.apiBase}/v1/orders-by-branch`, { method: 'GET' })
  }

  // Update order status
  const updateOrderStatus = async (id: number | string, status: string) => {
    return await useCustomFetch()(`${config().public.apiBase}/v1/orders-by-branch/${id}/status`, {
      method: 'PUT',
      body: { status }
    })
  }

  return {
    getOrdersByBranch,
    updateOrderStatus
  }
}
