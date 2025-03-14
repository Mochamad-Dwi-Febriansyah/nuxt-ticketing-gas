import { useCustomFetch } from '~~/plugins/fetch-interceptor'

export interface TransactionForm {
  order_id: string
  user_id: string
  payment_method: 'cash' | 'bank_transfer' | 'ewallet'
  status?: 'pending' | 'paid' | 'failed' // default 'pending'
  amount_paid: number
}

export function useAdminTransaction() {
  const config = () => useRuntimeConfig()

  // ✅ Fetch all transactions
  const fetchTransactions = async () => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/transactions`, {
      method: 'GET'
    })
    return { data, error }
  }

  // ✅ Get transaction by ID
  const getTransaction = async (id: string | number) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/transactions/${id}`, {
      method: 'GET'
    })
    return { data, error }
  }

  // ✅ Create new transaction
  const createTransaction = async (dataInput: TransactionForm) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/transactions`, {
      method: 'POST',
      body: dataInput
    })
    return { data, error }
  }

  // ✅ Update transaction by ID
  const updateTransaction = async (id: string | number, dataInput: TransactionForm) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/transactions/${id}`, {
      method: 'PUT',
      body: dataInput
    })
    return { data, error }
  }

  // ✅ Delete transaction (soft delete)
  const deleteTransaction = async (id: string | number) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/transactions/${id}`, {
      method: 'DELETE'
    })
    return { data, error }
  }

  // ✅ Restore deleted transaction
  const restoreTransaction = async (id: string | number) => {
    const { data, error } = await useCustomFetch()(`${config().public.apiBase}/v1/transactions/restore/${id}`, {
      method: 'POST'
    })
    return { data, error }
  }

  return {
    fetchTransactions,
    getTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    restoreTransaction
  }
}
