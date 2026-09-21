import { createPinia, setActivePinia } from 'pinia'
import { beforeEach } from 'vitest'
import { useCartStore } from './cart'

describe('cart store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('derives a total and performs actions', async () => {
    const cart = useCartStore()
    cart.add({ id: 1, name: 'Vue Field Guide', price: 24 })
    cart.add({ id: 1, name: 'Vue Field Guide', price: 24 })
    expect(cart.items[0]?.quantity).toBe(2)
    expect(cart.total).toBe(48)
    await cart.checkout()
    expect(cart.items).toHaveLength(0)
  })
})
