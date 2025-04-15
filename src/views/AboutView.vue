<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-full">
          <div class="absolute top-10 left-10 w-60 h-60 bg-green-500 rounded-full filter blur-3xl opacity-10"></div>
          <div class="absolute bottom-10 right-10 w-60 h-60 bg-blue-500 rounded-full filter blur-3xl opacity-10"></div>
        </div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Acerca de VS DOTA
            2</span>
        </h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          Una plataforma diseñada para crear, organizar y competir en partidas equilibradas de Dota 2 y otros juegos.
        </p>
      </div>
    </section>

    <!-- Nuestra Misión -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:flex lg:items-center lg:justify-between">
          <div class="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
            <h2 class="text-3xl font-bold mb-6 text-gray-900">Nuestra Misión</h2>
            <p class="text-lg text-gray-600 mb-6">
              VersusGG nació con el objetivo de crear una comunidad donde los jugadores pudieran encontrar partidas
              equilibradas y competitivas, sin importar su nivel de habilidad.
            </p>
            <p class="text-lg text-gray-600">
              Buscamos promover la competencia sana, el aprendizaje continuo y la diversión en un entorno donde todos
              puedan participar y mejorar sus habilidades.
            </p>
          </div>
          <div class="lg:w-1/2">
            <div class="relative rounded-xl overflow-hidden shadow-lg h-80">
              <div class="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-500 opacity-20"></div>
              <div class="absolute inset-0 bg-black bg-opacity-50"></div>
              <div class="absolute inset-0 bg-[url('/path/to/dota-image.jpg')] bg-cover bg-center"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center text-white p-6 backdrop-blur-sm bg-black bg-opacity-10 rounded-lg">
                  <h3 class="text-2xl font-bold mb-2">Jugadores de todos los niveles</h3>
                  <p>Desde principiantes hasta profesionales, todos tienen un lugar en nuestra plataforma</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Características -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold mb-12 text-center text-gray-900">Características principales</h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Característica 1 -->
          <div class="bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:-translate-y-2">
            <div class="w-12 h-12 bg-green-100 text-green-500 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">Equipos equilibrados</h3>
            <p class="text-gray-600">
              Nuestro algoritmo de balanceo distribuye a los jugadores según su rango y gameplay para crear partidas
              justas y competitivas.
            </p>
          </div>

          <!-- Característica 2 -->
          <div class="bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:-translate-y-2">
            <div class="w-12 h-12 bg-blue-100 text-blue-500 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">Tres tipos de salas</h3>
            <p class="text-gray-600">
              Salas para streamers, grupos de amigos o eventos personalizados. Cada tipo se adapta a diferentes
              necesidades y contextos de juego.
            </p>
          </div>

          <!-- Característica 3 -->
          <div class="bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:-translate-y-2">
            <div class="w-12 h-12 bg-purple-100 text-purple-500 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">Estadísticas detalladas</h3>
            <p class="text-gray-600">
              Seguimiento completo de tu rendimiento con métricas específicas para cada héroe, rol y tipo de partida.
            </p>
          </div>

          <!-- Característica 4 -->
          <div class="bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:-translate-y-2">
            <div class="w-12 h-12 bg-yellow-100 text-yellow-500 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">Invitaciones rápidas</h3>
            <p class="text-gray-600">
              Sistema de enlaces de invitación temporales para facilitar la incorporación de jugadores a tus salas.
            </p>
          </div>

          <!-- Característica 5 -->
          <div class="bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:-translate-y-2">
            <div class="w-12 h-12 bg-red-100 text-red-500 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">Integración con streaming</h3>
            <p class="text-gray-600">
              Funcionalidades especiales para creadores de contenido que quieran compartir sus partidas en vivo.
            </p>
          </div>

          <!-- Característica 6 -->
          <div class="bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:-translate-y-2">
            <div class="w-12 h-12 bg-indigo-100 text-indigo-500 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">Roles diferenciados</h3>
            <p class="text-gray-600">
              Separación clara entre organizadores (lead) y participantes (member) para una mejor gestión de las salas.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- El Equipo -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold mb-12 text-center text-gray-900">Nuestro Equipo</h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <!-- Miembro 1 -->
          <div class="text-center">
            <div class="w-40 h-40 rounded-full bg-gradient-to-br from-green-400 to-blue-500 mx-auto mb-4 p-1">
              <div class="w-full h-full rounded-full overflow-hidden bg-gray-300">
                <div class="w-full h-full bg-gray-700 flex items-center justify-center text-white text-4xl font-bold">
                  VP
                </div>
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-900">Victoria Pérez</h3>
            <p class="text-gray-600">Fundadora & Desarrolladora</p>
          </div>

          <!-- Miembro 2 -->
          <div class="text-center">
            <div class="w-40 h-40 rounded-full bg-gradient-to-br from-green-400 to-blue-500 mx-auto mb-4 p-1">
              <div class="w-full h-full rounded-full overflow-hidden bg-gray-300">
                <div class="w-full h-full bg-gray-700 flex items-center justify-center text-white text-4xl font-bold">
                  JR
                </div>
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-900">Javier Rodríguez</h3>
            <p class="text-gray-600">Desarrollador Full-Stack</p>
          </div>

          <!-- Miembro 3 -->
          <div class="text-center">
            <div class="w-40 h-40 rounded-full bg-gradient-to-br from-green-400 to-blue-500 mx-auto mb-4 p-1">
              <div class="w-full h-full rounded-full overflow-hidden bg-gray-300">
                <div class="w-full h-full bg-gray-700 flex items-center justify-center text-white text-4xl font-bold">
                  AM
                </div>
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-900">Ana Martínez</h3>
            <p class="text-gray-600">Diseñadora UX/UI</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-full">
          <div class="absolute top-10 left-10 w-60 h-60 bg-green-500 rounded-full filter blur-3xl opacity-10"></div>
          <div class="absolute bottom-10 right-10 w-60 h-60 bg-blue-500 rounded-full filter blur-3xl opacity-10"></div>
        </div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-6">¿Listo para empezar a jugar?</h2>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Únete a nuestra comunidad de jugadores y experimenta una nueva forma de disfrutar de Dota 2.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <RouterLink to="/login"
            class="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium rounded-lg transition-colors">
            Crear una cuenta
          </RouterLink>
          <RouterLink to="/rooms"
            class="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors border border-gray-600">
            Explorar salas
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
