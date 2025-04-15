<template>
  <div class="flex flex-col lg:flex-row min-h-screen bg-gray-50">
    <!-- Cabecera móvil -->
    <header class="bg-gray-800 text-white lg:hidden p-4 shadow-md">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <img src="@/assets/logo.svg" alt="VersusGG Logo" class="h-8 w-8 mr-2" />
          <h1 class="text-xl font-bold">VersusGG</h1>
        </div>

        <button @click="toggleMobileMenu" class="text-white focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Menú móvil desplegable -->
      <nav v-if="isMobileMenuOpen" class="mt-4 space-y-2">
        <RouterLink to="/lead/dashboard"
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
          @click="closeMobileMenu">
          Dashboard
        </RouterLink>
        <RouterLink to="/lead/rooms"
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
          @click="closeMobileMenu">
          Mis Salas
        </RouterLink>
        <RouterLink to="/lead/create"
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
          @click="closeMobileMenu">
          Crear Sala
        </RouterLink>
        <RouterLink to="/lead/stats"
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
          @click="closeMobileMenu">
          Estadísticas
        </RouterLink>
      </nav>
    </header>

    <!-- Barra lateral escritorio -->
    <aside class="hidden lg:flex lg:flex-col lg:w-64 bg-white shadow-md">
      <div class="p-4 bg-gray-800 text-white">
        <div class="flex items-center">
          <img src="@/assets/logo.svg" alt="VersusGG Logo" class="h-8 w-8 mr-2" />
          <h1 class="text-xl font-bold">VersusGG</h1>
        </div>
        <div class="mt-4 flex items-center">
          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
            <img src="https://via.placeholder.com/40" alt="Avatar del usuario" class="h-full w-full object-cover" />
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium">LeadUser123</p>
            <p class="text-xs text-gray-300">Lead</p>
          </div>
        </div>
      </div>

      <nav class="mt-4 flex-1">
        <RouterLink to="/lead/dashboard"
          class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-green-500 border-l-4 border-transparent hover:border-green-500"
          :class="{ 'bg-gray-100 text-green-500 border-green-500': $route.path === '/lead/dashboard' }">
          <span>Dashboard</span>
        </RouterLink>
        <RouterLink to="/lead/rooms"
          class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-green-500 border-l-4 border-transparent hover:border-green-500"
          :class="{ 'bg-gray-100 text-green-500 border-green-500': $route.path === '/lead/rooms' }">
          <span>Mis Salas</span>
        </RouterLink>
        <RouterLink to="/lead/create"
          class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-green-500 border-l-4 border-transparent hover:border-green-500"
          :class="{ 'bg-gray-100 text-green-500 border-green-500': $route.path === '/lead/create' }">
          <span>Crear Sala</span>
        </RouterLink>
        <RouterLink to="/lead/stats"
          class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-green-500 border-l-4 border-transparent hover:border-green-500"
          :class="{ 'bg-gray-100 text-green-500 border-green-500': $route.path === '/lead/stats' }">
          <span>Estadísticas</span>
        </RouterLink>
      </nav>

      <div class="p-4 border-t">
        <div class="mb-4">
          <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Salas Activas</h3>
          <ul class="space-y-1">
            <li class="p-2 rounded bg-green-500 text-white text-sm">
              <div class="flex justify-between items-center">
                <span>Torneo Amateur</span>
                <span class="text-xs">En curso</span>
              </div>
            </li>
            <li class="p-2 rounded hover:bg-gray-100 text-sm transition-colors">
              <div class="flex justify-between items-center">
                <span>Liga Sudamericana</span>
                <span class="text-xs text-gray-500">Programada</span>
              </div>
            </li>
            <li class="p-2 rounded hover:bg-gray-100 text-sm transition-colors">
              <div class="flex justify-between items-center">
                <span>Entrenamiento Semanal</span>
                <span class="text-xs text-gray-500">Creada</span>
              </div>
            </li>
          </ul>
        </div>

        <div class="mb-4">
          <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Acciones Rápidas</h3>
          <div class="space-y-2">
            <button class="w-full py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
              Nueva Sala
            </button>
            <button class="w-full py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              Invitar Miembros
            </button>
            <button class="w-full py-2 text-sm bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors">
              Balance de Equipos
            </button>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Notificaciones</h3>
          <div class="space-y-2">
            <div class="bg-white p-2 text-sm border-l-2 border-green-500 rounded shadow-sm">
              <p class="text-gray-800">Nuevo miembro se unió a "Torneo Amateur"</p>
              <p class="text-gray-500 text-xs">Hace 5 min</p>
            </div>
            <div class="bg-white p-2 text-sm border-l-2 border-green-500 rounded shadow-sm">
              <p class="text-gray-800">La sala "Práctica Ranked" ha comenzado</p>
              <p class="text-gray-500 text-xs">Hace 30 min</p>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Contenido principal -->
    <main class="flex-1 overflow-x-hidden overflow-y-auto">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

useRoute()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>
