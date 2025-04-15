<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Cabecera -->
    <header class="bg-gray-800 text-white shadow-md">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <div class="flex items-center">
          <img src="@/assets/logo.svg" alt="VersusGG Logo" class="h-8 w-8 mr-2" />
          <h1 class="text-xl font-bold">VersusGG</h1>
        </div>

        <nav class="hidden md:flex space-x-6">
          <RouterLink to="/member/rooms"
            class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium relative"
            :class="{ 'text-white': $route.path.includes('/member/rooms') }">
            Mis Salas
            <div v-if="$route.path.includes('/member/rooms')"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
          </RouterLink>
          <RouterLink to="/member/join"
            class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium relative"
            :class="{ 'text-white': $route.path.includes('/member/join') }">
            Unirse a Sala
            <div v-if="$route.path.includes('/member/join')" class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500">
            </div>
          </RouterLink>
          <RouterLink to="/member/stats"
            class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium relative"
            :class="{ 'text-white': $route.path.includes('/member/stats') }">
            Mis Estadísticas
            <div v-if="$route.path.includes('/member/stats')"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
          </RouterLink>
        </nav>

        <div class="flex items-center">
          <div class="hidden md:flex md:flex-col md:items-end mr-3">
            <span class="text-sm font-medium">MemberUser456</span>
            <span class="text-xs px-1.5 py-0.5 bg-blue-500 text-white rounded">Miembro</span>
          </div>
          <div class="h-8 w-8 rounded-full overflow-hidden bg-gray-500">
            <img src="https://via.placeholder.com/40" alt="Avatar del usuario" class="h-full w-full object-cover" />
          </div>
          <button class="ml-2 text-gray-300 hover:text-white md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Navegación móvil -->
      <div class="md:hidden border-t border-gray-700">
        <div class="flex justify-around px-2 py-3">
          <RouterLink to="/member/rooms"
            class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Mis Salas
          </RouterLink>
          <RouterLink to="/member/join"
            class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Unirse
          </RouterLink>
          <RouterLink to="/member/stats"
            class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Estadísticas
          </RouterLink>
        </div>
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <!-- Barra lateral -->
      <aside class="hidden md:block bg-white w-64 p-6 border-r overflow-y-auto">
        <div class="mb-8">
          <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3 pb-2 border-b">Mis Salas Activas
          </h3>
          <ul class="space-y-2">
            <li class="bg-blue-500 rounded-md text-white p-3 cursor-pointer">
              <div class="space-y-1">
                <div class="font-medium">Torneo Amateur</div>
                <div class="flex justify-between text-xs">
                  <span class="bg-green-600 px-1.5 py-0.5 rounded">Equipo 1</span>
                  <span>En curso</span>
                </div>
              </div>
            </li>
            <li class="hover:bg-gray-100 rounded-md p-3 cursor-pointer transition duration-150">
              <div class="space-y-1">
                <div class="font-medium">Liga Sudamericana</div>
                <div class="flex justify-between text-xs">
                  <span class="bg-red-500 text-white px-1.5 py-0.5 rounded">Equipo 2</span>
                  <span class="text-gray-500">Programada</span>
                </div>
              </div>
            </li>
            <li class="hover:bg-gray-100 rounded-md p-3 cursor-pointer transition duration-150">
              <div class="space-y-1">
                <div class="font-medium">Práctica Ranked</div>
                <div class="flex justify-between text-xs">
                  <span class="bg-gray-500 text-white px-1.5 py-0.5 rounded">Sin equipo</span>
                  <span class="text-gray-500">Creada</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="mb-8">
          <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3 pb-2 border-b">Mi Perfil de Juego
          </h3>
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-white shadow-sm rounded p-3 text-center">
              <div class="text-xs text-gray-500 mb-1">Rango</div>
              <div class="text-2xl font-bold text-gray-800">6</div>
            </div>
            <div class="bg-white shadow-sm rounded p-3 text-center">
              <div class="text-xs text-gray-500 mb-1">Gameplay</div>
              <div class="text-2xl font-bold text-gray-800">8</div>
            </div>
            <div class="bg-white shadow-sm rounded p-3 text-center">
              <div class="text-xs text-gray-500 mb-1">Partidas</div>
              <div class="text-2xl font-bold text-gray-800">42</div>
            </div>
            <div class="bg-white shadow-sm rounded p-3 text-center">
              <div class="text-xs text-gray-500 mb-1">Victorias</div>
              <div class="text-2xl font-bold text-gray-800">28</div>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3 pb-2 border-b">Próximas Partidas
          </h3>
          <div class="space-y-3">
            <div class="bg-white shadow-sm rounded p-3 flex justify-between items-center">
              <div>
                <div class="font-medium text-gray-800">Torneo Amateur</div>
                <div class="text-xs text-gray-500">Hoy, 20:00</div>
              </div>
              <button class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded hover:bg-gray-200">
                Ver
              </button>
            </div>
            <div class="bg-white shadow-sm rounded p-3 flex justify-between items-center">
              <div>
                <div class="font-medium text-gray-800">Liga Sudamericana</div>
                <div class="text-xs text-gray-500">Mañana, 18:30</div>
              </div>
              <button class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded hover:bg-gray-200">
                Ver
              </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- Contenido principal -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

useRoute()
</script>
