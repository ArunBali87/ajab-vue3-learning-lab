import { ref } from 'vue'
import { defineStore } from 'pinia'

export type ToastTone = 'success' | 'danger' | 'info'
export interface Toast {
  id: number
  message: string
  tone: ToastTone
}

export const useAppStore = defineStore('app', () => {
  const sidebarOpen = ref(false)
  const toasts = ref<Toast[]>([])
  let nextToastId = 1

  const notify = (message: string, tone: ToastTone = 'info') => {
    const id = nextToastId++
    toasts.value.push({ id, message, tone })
    window.setTimeout(() => dismiss(id), 3200)
  }
  const dismiss = (id: number) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  return { sidebarOpen, toasts, notify, dismiss }
})
