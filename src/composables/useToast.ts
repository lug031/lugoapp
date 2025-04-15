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

// Singleton pattern para mantener un único estado de toasts en toda la aplicación
const toasts = ref<Toast[]>([])
let nextId = 1

export function useToast() {
  const showToast = (
    message: string,
    type: ToastType = 'info',
    position: ToastPosition = 'top-right',
    timeout: number = 3000,
  ) => {
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
    success: (message: string, position?: ToastPosition, timeout?: number) =>
      showToast(message, 'success', position, timeout),

    error: (message: string, position?: ToastPosition, timeout?: number) =>
      showToast(message, 'error', position, timeout),

    warning: (message: string, position?: ToastPosition, timeout?: number) =>
      showToast(message, 'warning', position, timeout),

    info: (message: string, position?: ToastPosition, timeout?: number) =>
      showToast(message, 'info', position, timeout),
  }
}
