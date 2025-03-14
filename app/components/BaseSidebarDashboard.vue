<script setup lang="ts">
import { useRouter } from 'vue-router' 

const props = defineProps<{
  isSidebarLeftOpen: boolean;
}>()

const router = useRouter()
const { logout } = useAuth() // Ambil user + logout
const role = useCookie('role').value

// Menu Navigasi Khusus super_admin
const menuSuperAdmin = [
  { label: 'Dashboard', to: '/dashboard', icon: 'material-symbols:dashboard' },
  { label: 'Kelola User', to: '/users', icon: 'material-symbols:group' },
  { label: 'Kelola Cabang', to: '/branches', icon: 'material-symbols:location-city' },
  { label: 'Stok Gas', to: '/gas-stocks', icon: 'material-symbols:local-gas-station' },
  { label: 'Pesanan', to: '/orders', icon: 'material-symbols:shopping-cart' },
  // { label: 'Transaksi', to: '/transactions', icon: 'material-symbols:receipt-long' },
]

// Menu Navigasi Khusus admin_cabang
const menuAdminCabang = [
  { label: 'Dashboard', to: '/dashboard', icon: 'material-symbols:dashboard' },
  { label: 'User Cabang', to: '/users-by-branch', icon: 'material-symbols:group' },
  { label: 'Stok Gas Cabang', to: '/gas-stocks-by-branch', icon: 'material-symbols:local-gas-station' },
  { label: 'Pesanan Cabang', to: '/orders-by-branch', icon: 'material-symbols:shopping-cart' },
  // { label: 'Transaksi Cabang', to: '/transactions-by-branch', icon: 'material-symbols:receipt-long' },
]

// Fungsi Logout
const handleLogout = async () => {
  try {
    await logout()
    router.push('/')
  } catch (error) {
    console.error('Gagal logout:', error)
  }
}
</script>

<template>
  <aside class="flex flex-col h-full">
    <!-- Logo -->
    <div class="flex items-center justify-center overflow-auto h-16 border-b">
      <NuxtLink to="/" class="text-lg font-bold flex items-center justify-center">
        <Icon name="material-symbols:home" class="w-6 h-6 inline-block mr-1" />
        <span v-if="isSidebarLeftOpen">MyApp</span>
      </NuxtLink>
    </div>

    <!-- Menu Navigasi -->
    <nav class="flex-1 overflow-auto py-4">
      <ul class="space-y-1">
        <!-- Menu super_admin -->
        <template v-if="role === 'super_admin'">
          <li v-for="item in menuSuperAdmin" :key="item.label">
            <NuxtLink
              :to="item.to"
              class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              :class="{ 'justify-center': !isSidebarLeftOpen }"
            >
              <Icon :name="item.icon" class="w-6 h-6" />
              <span v-if="isSidebarLeftOpen">{{ item.label }}</span>
            </NuxtLink>
          </li>
        </template>

        <!-- Menu admin_cabang -->
        <template v-else-if="role === 'admin_cabang'">
          <li v-for="item in menuAdminCabang" :key="item.label">
            <NuxtLink
              :to="item.to"
              class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              :class="{ 'justify-center': !isSidebarLeftOpen }"
            >
              <Icon :name="item.icon" class="w-6 h-6" />
              <span v-if="isSidebarLeftOpen">{{ item.label }}</span>
            </NuxtLink>
          </li>
        </template>

        <!-- Jika role user atau role tidak diketahui -->
        <template v-else>
          <li>
            <span class="block text-center text-gray-500">Tidak ada menu</span>
          </li>
        </template>
      </ul>
   

    <!-- Footer / Logout -->
    <div class="border-t pt-4">
      <button
        @click="handleLogout"
        class="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        :class="{ 'justify-center': !isSidebarLeftOpen }"
      >
        <Icon name="material-symbols:logout-rounded" class="w-6 h-6" />
        <span v-if="isSidebarLeftOpen">Logout</span>
      </button>
    </div> </nav>
  </aside>
</template>
