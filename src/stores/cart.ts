import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )
  const add = (item: Omit<CartItem, 'quantity'>) => {
    const existing = items.value.find((entry) => entry.id === item.id)
    if (existing) existing.quantity++
    else items.value.push({ ...item, quantity: 1 })
  }
  const remove = (id: number) => {
    items.value = items.value.filter((item) => item.id !== id)
  }
  const checkout = async () => {
    await Promise.resolve()
    items.value = []
  }
  return { items, total, add, remove, checkout }
})
