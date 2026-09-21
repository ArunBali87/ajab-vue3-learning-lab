import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, initialValue: T): Ref<T> {
  const stored = window.localStorage.getItem(key)
  const value = ref<T>(stored ? (JSON.parse(stored) as T) : initialValue) as Ref<T>

  watch(value, (nextValue) => window.localStorage.setItem(key, JSON.stringify(nextValue)), {
    deep: true,
  })

  return value
}
