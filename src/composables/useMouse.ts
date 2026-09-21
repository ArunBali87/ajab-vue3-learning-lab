import { onMounted, onUnmounted, readonly, ref } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  const update = (event: MouseEvent) => {
    x.value = event.clientX
    y.value = event.clientY
  }

  onMounted(() => window.addEventListener('mousemove', update, { passive: true }))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x: readonly(x), y: readonly(y) }
}
