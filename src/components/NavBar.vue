<template>
  <nav class="bg-gray-800 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0 flex items-center">
            <img src="@/assets/logo.svg" alt="VersusGG Logo" class="h-8 w-8 mr-2" />
            <span class="text-white font-bold text-lg">VersusGG</span>
          </div>

          <div class="hidden md:ml-8 md:flex md:space-x-6">
            <RouterLink to="/" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Inicio
            </RouterLink>
            <RouterLink to="/rooms" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Salas</RouterLink>
            <RouterLink to="/stats" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Estadísticas</RouterLink>
            <RouterLink to="/about" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Acerca de</RouterLink>
          </div>
        </div>

        <div class="flex items-center">
          <button v-if="!isLoggedIn" @click="openLoginModal"
            class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md text-sm transition duration-150 ease-in-out">
            Iniciar Sesión
          </button>

          <div v-else class="flex items-center space-x-3 relative">
            <div class="hidden md:flex md:flex-col md:items-end">
              <span class="text-white text-sm font-medium">{{ username }}</span>
              <span :class="[
                'text-xs px-1.5 py-0.5 rounded-sm font-semibold uppercase',
                roleClass === 'lead' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
              ]">
                {{ userRole }}
              </span>
            </div>

            <div class="h-8 w-8 rounded-full overflow-hidden bg-gray-400">
              <img :src="avatarUrl" alt="Avatar del usuario" class="h-full w-full object-cover" />
            </div>

            <div class="relative">
              <button class="text-gray-300 hover:text-white focus:outline-none">
                <span class="text-xs">▼</span>
              </button>

              <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <RouterLink to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Mi Perfil
                </RouterLink>
                <RouterLink :to="dashboardLink" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Panel de Control
                </RouterLink>
                <button @click="logout"
                  class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 border-t border-gray-200">
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Menú móvil -->
    <div class="md:hidden">
      <div class="flex justify-around px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <RouterLink to="/" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
          Inicio</RouterLink>
        <RouterLink to="/rooms" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
          Salas</RouterLink>
        <RouterLink to="/stats" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
          Estadísticas</RouterLink>
        <RouterLink to="/about" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
          Acerca de</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

// Datos dummy para simular autenticación
const isLoggedIn = ref(false)
const username = ref('Usuario123')
const userRole = ref('Lead') // 'Lead' o 'Member'
const avatarUrl = ref('https://via.placeholder.com/40')

// Emitir evento para abrir el modal de login
const emit = defineEmits(['open-login-modal'])

const openLoginModal = () => {
  emit('open-login-modal')
}

// Función para simular logout
const logout = () => {
  isLoggedIn.value = false
}

// Calcular clase CSS basada en el rol
const roleClass = computed(() => {
  return userRole.value.toLowerCase()
})

// Calcular enlace al dashboard según el rol
const dashboardLink = computed(() => {
  return userRole.value === 'Lead' ? '/lead/dashboard' : '/member/rooms'
})
</script>
