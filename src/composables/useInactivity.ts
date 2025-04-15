import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from './useToast'

interface InactivityOptions {
  timeout?: number // Tiempo de inactividad en milisegundos
  warningTime?: number // Tiempo antes de cierre de sesión para mostrar advertencia
  modalTime?: number // Tiempo que se muestra el modal de advertencia
  events?: string[] // Eventos que reinician el temporizador
  excludeRoutes?: string[] // Rutas excluidas del cierre de sesión automático
}

export function useInactivity(options: InactivityOptions = {}) {
  const authStore = useAuthStore()
  const toast = useToast()

  // Opciones predeterminadas
  const defaultOptions: Required<InactivityOptions> = {
    timeout: 30 * 60 * 1000, // 30 minutos por defecto
    warningTime: 5 * 60 * 1000, // Advertencia 5 minutos antes
    modalTime: 2 * 60 * 1000, // Modal visible por 2 minutos
    events: ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'],
    excludeRoutes: ['/login', '/register', '/reset-password'],
  }

  // Combinar opciones proporcionadas con las predeterminadas
  const mergedOptions: Required<InactivityOptions> = {
    ...defaultOptions,
    ...options,
  }

  // Estados
  const timeoutId = ref<number | null>(null)
  const warningTimeoutId = ref<number | null>(null)
  const isWarningVisible = ref(false)
  const secondsRemaining = ref(0)
  const lastActivity = ref(Date.now())

  // Reiniciar el temporizador de inactividad
  const resetInactivityTimer = () => {
    if (!authStore.isAuthenticated) return

    lastActivity.value = Date.now()

    // Limpiar temporizadores existentes
    if (timeoutId.value) {
      window.clearTimeout(timeoutId.value)
      timeoutId.value = null
    }

    if (warningTimeoutId.value) {
      window.clearTimeout(warningTimeoutId.value)
      warningTimeoutId.value = null
    }

    // Ocultar advertencia si está visible
    if (isWarningVisible.value) {
      isWarningVisible.value = false
    }

    // Configurar temporizador de advertencia
    warningTimeoutId.value = window.setTimeout(() => {
      showWarning()
    }, mergedOptions.timeout - mergedOptions.warningTime)

    // Configurar temporizador de cierre de sesión
    timeoutId.value = window.setTimeout(() => {
      performLogout()
    }, mergedOptions.timeout)
  }

  // Mostrar advertencia de cierre de sesión inminente
  const showWarning = () => {
    if (!authStore.isAuthenticated) return

    isWarningVisible.value = true
    secondsRemaining.value = Math.floor(mergedOptions.warningTime / 1000)

    // Mostrar notificación
    toast.warning('Tu sesión está por expirar debido a inactividad', 'top-right', 10000)

    // Iniciar cuenta regresiva
    const countdownInterval = setInterval(() => {
      secondsRemaining.value -= 1

      if (secondsRemaining.value <= 0) {
        clearInterval(countdownInterval)
      }
    }, 1000)

    // Establecer tiempo límite para el modal
    setTimeout(() => {
      if (isWarningVisible.value) {
        isWarningVisible.value = false
      }
    }, mergedOptions.modalTime)
  }

  // Realizar cierre de sesión por inactividad
  const performLogout = async () => {
    if (!authStore.isAuthenticated) return

    // Limpiar temporizadores
    if (timeoutId.value) {
      window.clearTimeout(timeoutId.value)
      timeoutId.value = null
    }

    if (warningTimeoutId.value) {
      window.clearTimeout(warningTimeoutId.value)
      warningTimeoutId.value = null
    }

    isWarningVisible.value = false

    try {
      await authStore.logout()
      toast.info('Tu sesión ha expirado por inactividad', 'top-right', 5000)
    } catch (error) {
      console.error('Error al cerrar sesión por inactividad:', error)
    }
  }

  // Inicializar eventos de actividad del usuario
  const setupActivityEvents = () => {
    const handleUserActivity = () => {
      resetInactivityTimer()
    }

    mergedOptions.events.forEach((eventName) => {
      window.addEventListener(eventName, handleUserActivity)
    })

    // Limpiar eventos al desmontar
    onUnmounted(() => {
      mergedOptions.events.forEach((eventName) => {
        window.removeEventListener(eventName, handleUserActivity)
      })
    })
  }

  // Observar estado de autenticación
  watch(
    () => authStore.isAuthenticated,
    (isAuthenticated) => {
      if (isAuthenticated) {
        resetInactivityTimer()
      } else {
        // Limpiar temporizadores si el usuario no está autenticado
        if (timeoutId.value) {
          window.clearTimeout(timeoutId.value)
          timeoutId.value = null
        }

        if (warningTimeoutId.value) {
          window.clearTimeout(warningTimeoutId.value)
          warningTimeoutId.value = null
        }
      }
    },
  )

  // Inicializar
  onMounted(() => {
    setupActivityEvents()

    if (authStore.isAuthenticated) {
      resetInactivityTimer()
    }
  })

  return {
    isWarningVisible,
    secondsRemaining,
    resetInactivityTimer,
    extendSession: resetInactivityTimer,
    logout: performLogout,
  }
}
