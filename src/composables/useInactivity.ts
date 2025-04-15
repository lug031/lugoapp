// src/composables/useInactivity.ts
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'

export interface InactivityOptions {
  timeout?: number // en milisegundos
  warningTime?: number // en milisegundos antes del timeout
  events?: string[] // eventos que reinician el temporizador
}

// Estado global compartido para que todos los componentes accedan a los mismos datos
const isWarningVisible = ref(false)
const remainingSeconds = ref(0)
const isTracking = ref(false)

export function useInactivity(options: InactivityOptions = {}) {
  const authStore = useAuthStore()
  const router = useRouter()
  const { showToast } = useToast()

  // Valores predeterminados
  /*const defaultTimeout = import.meta.env.DEV ? 20 * 1000 : 15 * 60 * 1000 // 20s en dev, 15min en prod
  const defaultWarningTime = import.meta.env.DEV ? 10 * 1000 : 60 * 1000 // 10s en dev, 1min en prod*/
  const defaultTimeout = 15 * 60 * 1000
  const defaultWarningTime = 60 * 1000
  const defaultEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']

  // Configure values
  const inactivityTimeout = ref(options.timeout || defaultTimeout)
  const warningTimeout = ref(options.warningTime || defaultWarningTime)
  const events = options.events || defaultEvents

  // Estado interno
  const timer = ref<ReturnType<typeof setTimeout> | null>(null)
  const warningTimer = ref<ReturnType<typeof setTimeout> | null>(null)
  const countdownInterval = ref<ReturnType<typeof setInterval> | null>(null)

  // Limpiar todos los temporizadores
  const clearAllTimers = () => {
    if (timer.value) {
      clearTimeout(timer.value)
      timer.value = null
    }
    if (warningTimer.value) {
      clearTimeout(warningTimer.value)
      warningTimer.value = null
    }
    if (countdownInterval.value) {
      clearInterval(countdownInterval.value)
      countdownInterval.value = null
    }
    isWarningVisible.value = false
  }

  // Función de cierre de sesión
  const logout = async () => {
    clearAllTimers()
    isWarningVisible.value = false

    if (authStore.isAuthenticated) {
      try {
        await authStore.logout()
        router.push('/')
        showToast({
          message: 'Tu sesión ha expirado por inactividad',
          type: 'info',
          duration: 5000,
        })
      } catch (error) {
        console.error('Error al cerrar sesión por inactividad:', error)
      }
    }
  }

  // Función para mostrar la advertencia
  const showWarning = () => {
    isWarningVisible.value = true
    remainingSeconds.value = Math.floor(warningTimeout.value / 1000)

    // Iniciar la cuenta regresiva
    countdownInterval.value = setInterval(() => {
      remainingSeconds.value -= 1
      if (remainingSeconds.value <= 0) {
        if (countdownInterval.value) {
          clearInterval(countdownInterval.value)
        }
      }
    }, 1000)

    // Configurar el temporizador final para cerrar sesión
    timer.value = setTimeout(logout, warningTimeout.value)
  }

  // Función principal para reiniciar el temporizador
  const resetTimer = () => {
    // Solo proceder si estamos rastreando y el usuario está autenticado
    if (!isTracking.value || !authStore.isAuthenticated) return

    clearAllTimers()

    // Configurar el temporizador de advertencia
    const timeUntilWarning = inactivityTimeout.value - warningTimeout.value
    warningTimer.value = setTimeout(showWarning, timeUntilWarning)
  }

  // Iniciar el rastreo de inactividad
  const startTracking = () => {
    if (isTracking.value) return

    isTracking.value = true

    // Añadir event listeners
    events.forEach((event) => {
      document.addEventListener(event, resetTimer)
    })

    // Iniciar el temporizador
    resetTimer()
  }

  // Detener el rastreo de inactividad
  const stopTracking = () => {
    if (!isTracking.value) return

    isTracking.value = false

    // Eliminar event listeners
    events.forEach((event) => {
      document.removeEventListener(event, resetTimer)
    })

    clearAllTimers()
  }

  // Configurar el tiempo de inactividad
  const setInactivityTime = (milliseconds: number) => {
    inactivityTimeout.value = milliseconds
    if (isTracking.value) {
      resetTimer() // Reiniciar los temporizadores con el nuevo tiempo
    }
  }

  // Extender la sesión (para usar en el componente de advertencia)
  const extendSession = () => {
    resetTimer()
    showToast({
      message: 'Sesión extendida',
      type: 'success',
      duration: 3000,
    })
  }

  // Observar cambios en la autenticación
  watch(
    () => authStore.isAuthenticated,
    (isAuthenticated) => {
      if (isAuthenticated) {
        startTracking()
      } else {
        stopTracking()
      }
    },
    { immediate: true },
  )

  // Lifecycle hooks
  onMounted(() => {
    if (authStore.isAuthenticated) {
      startTracking()
    }
  })

  onUnmounted(() => {
    // No detenemos el rastreo al desmontar, solo limpiamos los temporizadores
    // para que otros componentes puedan seguir usando el estado global
    clearAllTimers()
  })

  return {
    isTracking,
    isWarningVisible,
    remainingSeconds,
    startTracking,
    stopTracking,
    resetTimer,
    extendSession,
    setInactivityTime,
  }
}
