import { useCustomFetch } from '~~/plugins/fetch-interceptor'

export interface OrderForm {
  user_id: string
  branch_id: string
  status?: 'pending' | 'approved' | 'rejected' | 'completed' // default pending
  quantity: number
  total_price: number
  pickup_date?: string | null // optional
}

export function useAdminOrder() {
  const config = () => useRuntimeConfig()

  // ✅ Fetch all orders
  const fetchOrders = async () => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/orders`, {
      method: 'GET'
    })
    return { data, error }
  }

  // ✅ Get order by ID
  const getOrder = async (id: string | number) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/orders/${id}`, {
      method: 'GET'
    })
    return { data, error }
  }

  // ✅ Create new order
  const createOrder = async (dataInput: OrderForm) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/orders`, {
      method: 'POST',
      body: dataInput
    })
    return { data, error }
  }

  // ✅ Update order by ID
  const updateOrder = async (id: string | number, dataInput: OrderForm) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/orders/${id}`, {
      method: 'PUT',
      body: dataInput
    })
    return { data, error }
  }

  // ✅ Delete order (soft delete)
  const deleteOrder = async (id: string | number) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/orders/${id}`, {
      method: 'DELETE'
    })
    return { data, error }
  }

  // ✅ Restore deleted order
  const restoreOrder = async (id: string | number) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/orders/restore/${id}`, {
      method: 'POST'
    })
    return { data, error }
  }

  return {
    fetchOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    restoreOrder
  }
}
