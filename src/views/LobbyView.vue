<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
    <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">VersusGG</h1>

    <div class="text-center mb-12">
      <h2 class="text-2xl font-semibold text-gray-700 mb-2">Bienvenido al hub de partidas competitivas</h2>
      <p class="text-gray-600">Crea una nueva sala o únete a una existente para comenzar a jugar</p>
    </div>

    <div class="flex flex-col sm:flex-row justify-center gap-4 mb-12">
      <button
        class="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md transition duration-150 ease-in-out"
        @click="openCreateRoomModal">
        Crear Nueva Sala
      </button>
      <button
        class="border-2 border-green-500 text-green-500 hover:bg-green-50 font-semibold py-3 px-6 rounded-md transition duration-150 ease-in-out"
        @click="openJoinRoomModal">
        Unirse a Sala
      </button>
    </div>

    <div class="mb-12">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">Salas Destacadas</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Sala 1 -->
        <div
          class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
          <div class="p-4 bg-gray-50 border-b flex justify-between items-center">
            <h4 class="font-semibold text-lg text-gray-800">Torneo Amateur</h4>
            <span class="px-2 py-1 bg-pink-500 text-white text-xs font-semibold rounded">Streamer</span>
          </div>
          <div class="p-4">
            <div class="mb-4">
              <p><span class="font-medium">Juego:</span> Dota 2</p>
              <p><span class="font-medium">Jugadores:</span> 5v5</p>
              <p><span class="font-medium">Estado:</span> Programado</p>
            </div>
            <button
              class="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white rounded transition duration-150 ease-in-out">
              Ver Detalles
            </button>
          </div>
        </div>

        <!-- Sala 2 -->
        <div
          class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
          <div class="p-4 bg-gray-50 border-b flex justify-between items-center">
            <h4 class="font-semibold text-lg text-gray-800">Práctica Ranked</h4>
            <span class="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded">Amigos</span>
          </div>
          <div class="p-4">
            <div class="mb-4">
              <p><span class="font-medium">Juego:</span> Dota 2</p>
              <p><span class="font-medium">Jugadores:</span> 3v3</p>
              <p><span class="font-medium">Estado:</span> En curso</p>
            </div>
            <button
              class="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white rounded transition duration-150 ease-in-out">
              Ver Detalles
            </button>
          </div>
        </div>

        <!-- Sala 3 -->
        <div
          class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
          <div class="p-4 bg-gray-50 border-b flex justify-between items-center">
            <h4 class="font-semibold text-lg text-gray-800">Liga Sudamericana</h4>
            <span class="px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded">Personalizada</span>
          </div>
          <div class="p-4">
            <div class="mb-4">
              <p><span class="font-medium">Juego:</span> Dota 2</p>
              <p><span class="font-medium">Jugadores:</span> 5v5</p>
              <p><span class="font-medium">Estado:</span> Finalizado</p>
            </div>
            <button
              class="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white rounded transition duration-150 ease-in-out">
              Ver Estadísticas
            </button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h3 class="text-xl font-semibold text-gray-700 mb-4">Partidas Recientes</h3>

      <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="min-w-full">
          <thead>
            <tr class="bg-gray-50 border-b">
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sala</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipos</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resultado</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Torneo Semanal</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Equipo A vs Equipo B</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">2-1</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Hace 2 horas</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-gray-800 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-xs">
                  Ver
                </button>
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Clasificatoria</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Los Invocadores vs Proplayers</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">0-2</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Hace 5 horas</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-gray-800 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-xs">
                  Ver
                </button>
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Amistoso Pro</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Newell's vs Saprissa</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">1-1</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Ayer</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-gray-800 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-xs">
                  Ver
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const openCreateRoomModal = () => {
  // Lógica para abrir modal (se implementará después)
}

const openJoinRoomModal = () => {
  // Lógica para abrir modal (se implementará después)
}
</script>
