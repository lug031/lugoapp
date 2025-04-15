<template>
  <footer class="bg-gray-800 text-white">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Información de la aplicación -->
        <div class="space-y-4">
          <div class="flex items-center">
            <img src="@/assets/logo.svg" alt="VersusGG Logo" class="h-8 w-8 mr-2" />
            <span class="text-xl font-bold">VersusGG</span>
          </div>
          <p class="text-gray-400 text-sm">
            La plataforma definitiva para organizar y seguir partidas competitivas de Dota 2 y otros juegos.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <span>Facebook</span>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <span>Twitter</span>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <span>Discord</span>
            </a>
          </div>
        </div>

        <!-- Enlaces rápidos -->
        <div>
          <h3 class="text-lg font-medium mb-4">Enlaces Rápidos</h3>
          <ul class="space-y-2">
            <li>
              <RouterLink to="/" class="text-gray-400 hover:text-white transition-colors">Inicio</RouterLink>
            </li>
            <li>
              <RouterLink to="/rooms" class="text-gray-400 hover:text-white transition-colors">Explorar Salas
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/stats" class="text-gray-400 hover:text-white transition-colors">Estadísticas</RouterLink>
            </li>
            <li>
              <RouterLink to="/about" class="text-gray-400 hover:text-white transition-colors">Acerca de</RouterLink>
            </li>
          </ul>
        </div>

        <!-- Recursos -->
        <div>
          <h3 class="text-lg font-medium mb-4">Recursos</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Guía de Uso</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Tutoriales</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Actualizaciones</a></li>
          </ul>
        </div>

        <!-- Contacto -->
        <div>
          <h3 class="text-lg font-medium mb-4">Contacto</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Soporte</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Reportar Bug</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Sugerencias</a></li>
          </ul>
        </div>
      </div>

      <!-- Pie inferior -->
      <div class="pt-8 mt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between">
        <p class="text-gray-400 text-sm">© 2025 VersusGG. Todos los derechos reservados.</p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="text-gray-400 text-sm hover:text-white transition-colors">Términos de Servicio</a>
          <a href="#" class="text-gray-400 text-sm hover:text-white transition-colors">Política de Privacidad</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
