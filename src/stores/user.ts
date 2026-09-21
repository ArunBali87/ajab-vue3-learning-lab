import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<User | null>({
    id: 99,
    name: 'React Developer',
    email: 'learner@lab.dev',
    role: 'Engineer',
    active: true,
  })
  const isAuthenticated = computed(() => currentUser.value !== null)
  const login = (name: string) => {
    currentUser.value = { id: 99, name, email: 'learner@lab.dev', role: 'Engineer', active: true }
  }
  const logout = () => {
    currentUser.value = null
  }
  return { currentUser, isAuthenticated, login, logout }
})
