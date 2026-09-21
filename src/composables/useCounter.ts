import { computed, readonly, ref } from 'vue'

export function useCounter(initial = 0, minimum = Number.NEGATIVE_INFINITY) {
  const count = ref(initial)

  const increment = () => count.value++
  const decrement = () => {
    count.value = Math.max(minimum, count.value - 1)
  }
  const reset = () => {
    count.value = initial
  }

  return {
    count: readonly(count),
    isInitial: computed(() => count.value === initial),
    increment,
    decrement,
    reset,
  }
}
