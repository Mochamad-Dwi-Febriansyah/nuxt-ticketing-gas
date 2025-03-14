export function useCustomFetch() {
  return new Proxy($fetch, {
    apply: async (target: Function, thisArg: any, args: any[]) => {
      const token = useCookie('access_token')

      const defaultOptions = args[1] || {}

      args[1] = {
        ...defaultOptions,
        headers: {
          Authorization: `Bearer ${token.value}`,
          ...defaultOptions.headers,
        },
      }

      try {
        console.log('🔍 Interceptor aktif - Kirim request...')
        const response = await Reflect.apply(target, thisArg, args)
        return { data: response, error: null } // balikin data & error null
      } catch (error: any) {
        console.error('❌ Error fetch:', error)
        if (error?.status === 401) {
          console.warn('⛔ Token tidak valid atau kadaluarsa. Mengarahkan ke login.')
          useCookie('access_token').value = null
          return navigateTo('/')
        }
        return { data: null, error } // balikin error biar bisa di-handle
      }
    },
  })
}
