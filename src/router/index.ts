import { createRouter, createWebHistory } from 'vue-router'
import LobbyView from '../views/LobbyView.vue'
import RoomsListView from '@/views/RoomsListView.vue'
import AboutView from '@/views/AboutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'lobby',
      component: LobbyView,
      meta: {
        title: 'Inicio - VersusGG',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: 'Acerca de - VersusGG',
      },
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: RoomsListView,
      meta: {
        title: 'Salas - VersusGG',
      },
    },
    /*{
      path: '/rooms/:id',
      name: 'room-detail',
      component: RoomView,
      meta: {
        title: 'Detalles de Sala - VersusGG',
      },
    },
    {
      path: '/join/:code',
      name: 'join-room',
      component: () => import('../views/JoinRoomView.vue'),
      meta: {
        title: 'Unirse a Sala - VersusGG',
      },
    },*/
    // Rutas para usuarios Lead (organizadores)
    /*{
      path: '/lead',
      component: LeadLayout,
      meta: {
        requiresAuth: true,
        requiresLead: true,
      },
      children: [
        {
          path: 'dashboard',
          name: 'lead-dashboard',
          component: () => import('../views/lead/DashboardView.vue'),
          meta: {
            title: 'Panel de Control - VersusGG',
          },
        },
        {
          path: 'rooms',
          name: 'lead-rooms',
          component: () => import('../views/lead/RoomsView.vue'),
          meta: {
            title: 'Mis Salas - VersusGG',
          },
        },
        {
          path: 'create',
          name: 'create-room',
          component: CreateRoomView,
          meta: {
            title: 'Crear Sala - VersusGG',
          },
        },
        {
          path: 'room/:id',
          name: 'lead-room-detail',
          component: () => import('../views/lead/RoomDetailView.vue'),
          meta: {
            title: 'Detalles de Sala - VersusGG',
          },
        },
        {
          path: 'room/:id/edit',
          name: 'edit-room',
          component: () => import('../views/lead/EditRoomView.vue'),
          meta: {
            title: 'Editar Sala - VersusGG',
          },
        },
        {
          path: 'stats',
          name: 'lead-stats',
          component: () => import('../views/lead/StatsView.vue'),
          meta: {
            title: 'Estadísticas - VersusGG',
          },
        },
      ],
    },*/
    // Rutas para usuarios Member (jugadores)
    /*{
      path: '/member',
      component: MemberLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'rooms',
          name: 'member-rooms',
          component: () => import('../views/member/MemberRoomsView.vue'),
          meta: {
            title: 'Mis Salas - VersusGG',
          },
        },
        {
          path: 'join',
          name: 'member-join',
          component: () => import('../views/member/JoinRoomView.vue'),
          meta: {
            title: 'Unirse a Sala - VersusGG',
          },
        },
        {
          path: 'stats',
          name: 'member-stats',
          component: () => import('../views/member/MemberStatsView.vue'),
          meta: {
            title: 'Mis Estadísticas - VersusGG',
          },
        },
      ],
    },*/
    // Ruta de perfil de usuario
    /*{
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        requiresAuth: true,
        title: 'Mi Perfil - VersusGG',
      },
    },*/
    // Ruta para página no encontrada
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: {
        title: 'Página no encontrada - VersusGG',
      },
    },
  ],
})

// Navegación guard para comprobación de autorización
router.beforeEach((to, from, next) => {
  // Actualizar el título de la página
  if (to.meta.title) {
    document.title = to.meta.title.toString()
  }

  next()
})

export default router
