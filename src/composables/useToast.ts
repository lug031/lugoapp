import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'warning' | 'info'
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center'

interface Toast {
  id: number
  message: string
  type: ToastType
  position: ToastPosition
  timeout?: number
}

// Interfaz para mensaje toast con opciones adicionales
export interface ToastOptions {
  message: string
  type?: ToastType
  position?: ToastPosition
  duration?: number
}

// Singleton pattern para mantener un único estado de toasts en toda la aplicación
const toasts = ref<Toast[]>([])
let nextId = 1

export function useToast() {
  // Método flexible que acepta tanto string como objeto de opciones
  const showToast = (
    messageOrOptions: string | ToastOptions,
    typeOrPosition?: ToastType | ToastPosition,
    duration?: number,
  ) => {
    let message: string
    let type: ToastType = 'info'
    let position: ToastPosition = 'top-right'
    let timeout: number = 3000

    // Manejar diferentes formas de llamar a la función
    if (typeof messageOrOptions === 'string') {
      message = messageOrOptions

      // Si el segundo parámetro es un tipo de toast válido
      if (
        typeOrPosition &&
        ['success', 'error', 'warning', 'info'].includes(typeOrPosition as string)
      ) {
        type = typeOrPosition as ToastType
      }
      // Si el segundo parámetro es una posición válida
      else if (
        typeOrPosition &&
        [
          'top-right',
          'top-left',
          'bottom-right',
          'bottom-left',
          'top-center',
          'bottom-center',
        ].includes(typeOrPosition as string)
      ) {
        position = typeOrPosition as ToastPosition
      }

      if (duration) {
        timeout = duration
      }
    } else {
      // Es un objeto de opciones
      message = messageOrOptions.message
      type = messageOrOptions.type || type
      position = messageOrOptions.position || position
      timeout = messageOrOptions.duration || timeout
    }

    const id = nextId++
    const toast: Toast = { id, message, type, position, timeout }

    toasts.value.push(toast)

    // Remover después del timeout si está definido
    if (timeout) {
      setTimeout(() => {
        removeToast(id)
      }, timeout)
    }

    return id
  }

  const removeToast = (id: number) => {
    const index = toasts.value.findIndex((toast) => toast.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  const clearToasts = () => {
    toasts.value = []
  }

  return {
    toasts,
    showToast,
    removeToast,
    clearToasts,

    // Métodos de conveniencia
    success: (message: string | ToastOptions, position?: ToastPosition, duration?: number) => {
      if (typeof message === 'string') {
        return showToast(message, 'success', duration)
      } else {
        return showToast({ ...message, type: 'success' })
      }
    },

    error: (message: string | ToastOptions, position?: ToastPosition, duration?: number) => {
      if (typeof message === 'string') {
        return showToast(message, 'error', duration)
      } else {
        return showToast({ ...message, type: 'error' })
      }
    },

    warning: (message: string | ToastOptions, position?: ToastPosition, duration?: number) => {
      if (typeof message === 'string') {
        return showToast(message, 'warning', duration)
      } else {
        return showToast({ ...message, type: 'warning' })
      }
    },

    info: (message: string | ToastOptions, position?: ToastPosition, duration?: number) => {
      if (typeof message === 'string') {
        return showToast(message, 'info', duration)
      } else {
        return showToast({ ...message, type: 'info' })
      }
    },
  }
}
