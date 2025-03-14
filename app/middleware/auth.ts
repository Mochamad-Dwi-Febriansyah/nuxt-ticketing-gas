// middleware/auth.ts
import { defineNuxtRouteMiddleware, navigateTo, useCookie } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to, from) => {
  // Ambil token dan role dari cookie (bukan localStorage lagi)
  const token = useCookie('access_token')
  const role = useCookie('role') // Pastikan role disimpan di cookie saat login (bisa update useAuth.ts untuk simpan role)

  // Jika token tidak ada, arahkan ke halaman login
  if (!token.value) {
    return navigateTo('/', { replace: true })
  }

  // Konfigurasi role & path yang boleh diakses
  const roleAccess: Record<string, string[]> = {
    super_admin: [
      '/dashboard',                    // Dashboard
      '/users',               // Kelola User
      '/branches',            // Kelola Cabang
      '/gas-stocks',          // Stok Gas
      '/orders',              // Pesanan
      '/transactions',        // Transaksi
    ],
    admin_cabang: [
      '/dashboard',                            // Dashboard
      '/users-by-branch',              // User Cabang
      '/gas-stocks-by-branch',         // Stok Gas Cabang
      '/orders-by-branch',             // Pesanan Cabang
      '/transactions-by-branch',       // Transaksi Cabang
    ],
    user: [], // Tidak diarahkan ke dashboard
    guest: [] // Tidak boleh akses apapun
  }

  const allowedPaths = roleAccess[role.value || 'guest'] || []

  // Cek apakah path yang diminta masuk dalam daftar yang diperbolehkan
  const isAllowed = allowedPaths.some(path => to.path.startsWith(path))

  if (!isAllowed) {
    // Jika tidak diperbolehkan, redirect ke home atau halaman lain
    return navigateTo('/403', { replace: true }) 
  }
})
