<template>
  <div
    class="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-center items-center px-4 py-16">
    <div class="relative">
      <!-- Elementos decorativos de fondo -->
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute -top-20 -left-20 w-40 h-40 bg-green-500 rounded-full filter blur-3xl opacity-10"></div>
        <div class="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-10"></div>
      </div>

      <div
        class="relative z-10 bg-gray-800 rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full mx-auto border border-gray-700">
        <div
          class="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-green-500 rounded-full filter blur-3xl opacity-10">
        </div>

        <!-- Cabecera 404 -->
        <div class="p-8 text-center relative">
          <div class="inline-block mb-4">
            <div class="relative">
              <div
                class="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                404</div>
              <div
                class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full">
              </div>
            </div>
          </div>
          <h1 class="text-3xl font-bold text-white mb-4">Página no encontrada</h1>
          <p class="text-gray-400 mb-6 max-w-sm mx-auto">
            Lo sentimos, la página que estás buscando no existe o ha sido movida a otra ubicación.
          </p>
        </div>

        <!-- Animación Dota 2 -->
        <div class="relative h-44 bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden">
          <div class="dota-map"></div>

          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div class="hero-character">
              <div class="hero-head"></div>
              <div class="absolute -top-10 -right-6 text-5xl font-bold text-red-500 animate-ping">?</div>
            </div>
          </div>
        </div>

        <!-- Acciones -->
        <div class="bg-gray-900 p-8 text-center">
          <p class="text-gray-400 mb-4">¿Qué deseas hacer?</p>
          <div class="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button @click="goBack"
              class="px-5 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center border border-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd" />
              </svg>
              Volver Atrás
            </button>

            <RouterLink to="/"
              class="px-5 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Ir a Inicio
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1) // Volver a la página anterior
}
</script>

<style scoped>
.dota-map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle at center, rgba(76, 175, 80, 0.05) 0%, transparent 70%);
}

.dota-map::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    linear-gradient(45deg, transparent 48%, rgba(30, 64, 175, 0.1) 50%, transparent 52%),
    linear-gradient(-45deg, transparent 48%, rgba(30, 64, 175, 0.1) 50%, transparent 52%);
  background-size: 30px 30px;
}

.hero-character {
  width: 40px;
  height: 60px;
  animation: float 3s ease-in-out infinite;
  position: relative;
}

.hero-head {
  width: 24px;
  height: 24px;
  background-color: #4ade80;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 15px rgba(74, 222, 128, 0.5);
}

.hero-body {
  width: 40px;
  height: 40px;
  background-color: #4ade80;
  border-radius: 40% 40% 50% 50%;
  position: absolute;
  top: 18px;
  left: 0;
  box-shadow: 0 0 15px rgba(74, 222, 128, 0.5);
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}
</style>
