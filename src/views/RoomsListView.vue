<template>
  <div class="rooms-list-view">
    <div class="page-header">
      <h1 class="page-title">Explorar Salas</h1>
      <p class="page-description">Encuentra salas de Dota 2 y otros juegos para unirte a la competición</p>
    </div>

    <div class="filters-section">
      <div class="search-box">
        <input type="text" v-model="searchQuery" placeholder="Buscar por nombre o descripción..."
          @input="applyFilters" />
        <button class="search-btn">Buscar</button>
      </div>

      <div class="filters">
        <div class="filter-group">
          <label>Tipo de Juego</label>
          <select v-model="filters.gameType" @change="applyFilters">
            <option value="all">Todos los juegos</option>
            <option value="dota2">Dota 2</option>
            <option value="csgo">CS:GO</option>
            <option value="paladins">Paladins</option>
            <option value="other">Otros</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Tipo de Sala</label>
          <select v-model="filters.roomType" @change="applyFilters">
            <option value="all">Todas las salas</option>
            <option value="streamer">Streamer</option>
            <option value="friends">Amigos</option>
            <option value="custom">Personalizada</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Estado</label>
          <select v-model="filters.status" @change="applyFilters">
            <option value="all">Todos los estados</option>
            <option value="created">Creada</option>
            <option value="scheduled">Programada</option>
            <option value="started">En curso</option>
            <option value="finished">Finalizada</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Ordenar por</label>
          <select v-model="filters.sortBy" @change="applyFilters">
            <option value="newest">Más recientes</option>
            <option value="name">Nombre</option>
            <option value="popular">Popularidad</option>
          </select>
        </div>
      </div>
    </div>

    <div class="rooms-grid">
      <div v-if="loading" class="loading-message">
        Cargando salas...
      </div>

      <div v-else-if="filteredRooms.length === 0" class="no-rooms-message">
        <p>No se encontraron salas que coincidan con los filtros.</p>
        <button @click="resetFilters" class="reset-btn">Restablecer filtros</button>
      </div>

      <template v-else>
        <div v-for="room in filteredRooms" :key="room.id" class="room-card" @click="viewRoomDetails(room.id)">
          <div class="room-header">
            <div class="room-image">
              <img :src="room.roomImage || 'https://via.placeholder.com/80'" alt="Imagen de sala" />
            </div>
            <div class="room-info">
              <h3 class="room-name">{{ room.name }}</h3>
              <div class="room-badges">
                <span :class="['status-badge', `status-${room.status}`]">{{ getStatusText(room.status) }}</span>
                <span :class="['type-badge', `type-${room.roomType}`]">{{ getRoomTypeText(room.roomType) }}</span>
                <span class="game-badge">{{ getGameTypeText(room.gameType) }}</span>
              </div>
            </div>
          </div>

          <div class="room-details">
            <p class="room-description">{{ truncateText(room.description, 100) }}</p>

            <div class="room-meta">
              <div class="meta-item">
                <span class="meta-icon team-icon"></span>
                <span class="meta-text">{{ room.teamSize }}vs{{ room.teamSize }}</span>
              </div>

              <div class="meta-item">
                <span class="meta-icon user-icon"></span>
                <span class="meta-text">{{ room.memberCount }} jugadores</span>
              </div>

              <div v-if="room.prize" class="meta-item">
                <span class="meta-icon prize-icon"></span>
                <span class="meta-text">{{ room.prize }}</span>
              </div>
            </div>

            <div class="room-footer">
              <div class="created-by">
                <img :src="room.lead.profilePicture || 'https://via.placeholder.com/30'" alt="Avatar de lead"
                  class="lead-avatar" />
                <span>{{ room.lead.username }}</span>
              </div>

              <button class="join-btn">
                {{ room.status === 'finished' ? 'Ver detalles' : 'Unirse' }}
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div v-if="filteredRooms.length > 0 && !loading" class="pagination">
      <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)" class="page-btn prev">
        Anterior
      </button>

      <div class="page-numbers">
        <button v-for="page in totalPages" :key="page" :class="['page-number', { active: page === currentPage }]"
          @click="changePage(page)">
          {{ page }}
        </button>
      </div>

      <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)" class="page-btn next">
        Siguiente
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Estado para búsqueda y filtros
const searchQuery = ref('')
const filters = reactive({
  gameType: 'all',
  roomType: 'all',
  status: 'all',
  sortBy: 'newest'
})

// Paginación
const currentPage = ref(1)
const itemsPerPage = ref(12)
const totalItems = ref(0)

// Estado de carga
const loading = ref(true)

// Datos de salas (dummy data)
const rooms = ref([
  {
    id: '1',
    name: 'Torneo Amateur Dota 2',
    description: 'Torneo semanal para jugadores de todos los niveles. ¡Diviértete y mejora tus habilidades!',
    gameType: 'dota2',
    roomType: 'streamer',
    status: 'scheduled',
    teamSize: 5,
    memberCount: 8,
    prize: 'Steam Gift Card $20',
    roomImage: null,
    lead: {
      username: 'GameMaster',
      profilePicture: null
    },
    createdAt: new Date('2025-04-10T10:00:00Z')
  },
  {
    id: '2',
    name: 'Práctica Ranked',
    description: 'Sala para practicar estrategias de nivel competitivo. Solo jugadores con experiencia.',
    gameType: 'dota2',
    roomType: 'friends',
    status: 'created',
    teamSize: 3,
    memberCount: 4,
    prize: null,
    roomImage: null,
    lead: {
      username: 'ProCoach',
      profilePicture: null
    },
    createdAt: new Date('2025-04-12T15:30:00Z')
  },
  {
    id: '3',
    name: 'Liga Sudamericana',
    description: 'Primera ronda de clasificatorias para la liga amateur de Sudamérica. Premios en metálico.',
    gameType: 'dota2',
    roomType: 'custom',
    status: 'started',
    teamSize: 5,
    memberCount: 10,
    prize: '$100 USD',
    roomImage: null,
    lead: {
      username: 'LeagueMaster',
      profilePicture: null
    },
    createdAt: new Date('2025-04-11T20:15:00Z')
  },
  {
    id: '4',
    name: 'CS:GO Amistoso',
    description: 'Partidas amistosas de Counter-Strike. Todos los niveles son bienvenidos.',
    gameType: 'csgo',
    roomType: 'friends',
    status: 'created',
    teamSize: 4,
    memberCount: 5,
    prize: null,
    roomImage: null,
    lead: {
      username: 'FPSKing',
      profilePicture: null
    },
    createdAt: new Date('2025-04-13T08:45:00Z')
  },
  {
    id: '5',
    name: 'Torneo Semanal',
    description: 'Torneo semanal de Paladins con premios para los ganadores.',
    gameType: 'paladins',
    roomType: 'streamer',
    status: 'finished',
    teamSize: 5,
    memberCount: 10,
    prize: 'Cristales x1000',
    roomImage: null,
    lead: {
      username: 'StreamerPro',
      profilePicture: null
    },
    createdAt: new Date('2025-04-09T19:00:00Z')
  },
  {
    id: '6',
    name: 'Entrenamiento Pro Team',
    description: 'Sesión de entrenamiento con equipo profesional. Aprende de los mejores.',
    gameType: 'dota2',
    roomType: 'custom',
    status: 'scheduled',
    teamSize: 5,
    memberCount: 7,
    prize: null,
    roomImage: null,
    lead: {
      username: 'CoachElite',
      profilePicture: null
    },
    createdAt: new Date('2025-04-14T21:30:00Z')
  },
])

// Filtrar salas según los criterios
const filteredRooms = computed(() => {
  let result = [...rooms.value]

  // Aplicar filtro de búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(room =>
      room.name.toLowerCase().includes(query) ||
      room.description.toLowerCase().includes(query)
    )
  }

  // Aplicar filtro de tipo de juego
  if (filters.gameType !== 'all') {
    result = result.filter(room => room.gameType === filters.gameType)
  }

  // Aplicar filtro de tipo de sala
  if (filters.roomType !== 'all') {
    result = result.filter(room => room.roomType === filters.roomType)
  }

  // Aplicar filtro de estado
  if (filters.status !== 'all') {
    result = result.filter(room => room.status === filters.status)
  }

  // Aplicar ordenamiento
  if (filters.sortBy === 'newest') {
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } else if (filters.sortBy === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name))
  } else if (filters.sortBy === 'popular') {
    result.sort((a, b) => b.memberCount - a.memberCount)
  }

  // Actualizar total de items para paginación
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  totalItems.value = result.length

  // Aplicar paginación
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value

  return result.slice(startIndex, endIndex)
})

// Calcular total de páginas para paginación
const totalPages = computed(() => {
  return Math.ceil(totalItems.value / itemsPerPage.value) || 1
})

// Truncar texto para descripciones largas
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Textos formateados para enums
const getStatusText = (status: string | number) => {
  const statusMap = {
    'created': 'Creada',
    'scheduled': 'Programada',
    'started': 'En curso',
    'finished': 'Finalizada'
  }
  return statusMap[status as keyof typeof statusMap] || 'Desconocido'
}

const getRoomTypeText = (roomType: string | number) => {
  const typeMap = {
    'streamer': 'Streamer',
    'friends': 'Amigos',
    'custom': 'Personalizada'
  }
  return typeMap[roomType as keyof typeof typeMap] || 'Desconocido'
}

const getGameTypeText = (gameType: string | number) => {
  const gameMap = {
    'dota2': 'Dota 2',
    'csgo': 'CS:GO',
    'paladins': 'Paladins',
    'other': 'Otro'
  }
  return gameMap[gameType as keyof typeof gameMap] || 'Desconocido'
}

// Funciones
const applyFilters = () => {
  currentPage.value = 1 // Volver a la primera página al cambiar filtros
}

const resetFilters = () => {
  searchQuery.value = ''
  filters.gameType = 'all'
  filters.roomType = 'all'
  filters.status = 'all'
  filters.sortBy = 'newest'
  currentPage.value = 1
}

const changePage = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const viewRoomDetails = (roomId: unknown) => {
  router.push(`/rooms/${roomId}`)
}

// Simular carga de datos
onMounted(() => {
  // Simulamos una carga de datos
  setTimeout(() => {
    loading.value = false
  }, 800)
})
</script>

<style scoped>
.rooms-list-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.page-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.page-description {
  color: #718096;
  font-size: 1.1rem;
}

.filters-section {
  margin-bottom: 2rem;
  background-color: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.search-box {
  display: flex;
  margin-bottom: 1.5rem;
}

.search-box input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
}

.search-box input:focus {
  outline: none;
  border-color: #4caf50;
}

.search-btn {
  padding: 0.75rem 1.5rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-btn:hover {
  background-color: #3d8b40;
}

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 600;
  color: #4a5568;
  font-size: 0.9rem;
}

.filter-group select {
  padding: 0.65rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background-color: white;
  font-size: 0.9rem;
}

.filter-group select:focus {
  outline: none;
  border-color: #4caf50;
}

.rooms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.loading-message,
.no-rooms-message {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  background-color: #f8fafc;
  border-radius: 8px;
  color: #718096;
}

.no-rooms-message p {
  margin-bottom: 1rem;
}

.reset-btn {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.room-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.room-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.room-header {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.room-image {
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  background-color: #e2e8f0;
}

.room-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.room-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.room-name {
  margin: 0;
  font-size: 1.2rem;
  color: #2c3e50;
}

.room-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.status-badge,
.type-badge,
.game-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-created {
  background-color: #9e9e9e;
  color: white;
}

.status-scheduled {
  background-color: #2196f3;
  color: white;
}

.status-started {
  background-color: #4caf50;
  color: white;
}

.status-finished {
  background-color: #f44336;
  color: white;
}

.type-streamer {
  background-color: #e91e63;
  color: white;
}

.type-friends {
  background-color: #2196f3;
  color: white;
}

.type-custom {
  background-color: #ff9800;
  color: white;
}

.game-badge {
  background-color: #673ab7;
  color: white;
}

.room-details {
  padding: 1rem;
}

.room-description {
  margin-bottom: 1rem;
  color: #4a5568;
  font-size: 0.95rem;
  line-height: 1.5;
  height: 3em;
  overflow: hidden;
}

.room-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.meta-icon {
  width: 16px;
  height: 16px;
  background-color: #cbd5e0;
  border-radius: 50%;
}

.meta-text {
  color: #4a5568;
}

.room-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.created-by {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #718096;
}

.lead-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.join-btn {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.join-btn:hover {
  background-color: #3d8b40;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 0.5rem;
}

.page-btn {
  padding: 0.5rem 1rem;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn:not(:disabled):hover {
  background-color: #e2e8f0;
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
}

.page-number {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-number:hover {
  background-color: #e2e8f0;
}

.page-number.active {
  background-color: #4caf50;
  color: white;
  border-color: #4caf50;
}

@media (max-width: 768px) {
  .rooms-grid {
    grid-template-columns: 1fr;
  }

  .filters {
    grid-template-columns: 1fr;
  }

  .pagination {
    flex-wrap: wrap;
  }
}
</style>
