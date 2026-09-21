import { onScopeDispose, ref, type Ref } from 'vue'

export interface FetchState<T> {
  data: Ref<T | null>
  error: Ref<string | null>
  loading: Ref<boolean>
  execute: () => Promise<void>
  cancel: () => void
}

export function useFetch<T>(request: (signal: AbortSignal) => Promise<T>): FetchState<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<string | null>(null)
  const loading = ref(false)
  let controller: AbortController | undefined

  const cancel = () => controller?.abort()
  const execute = async () => {
    cancel()
    controller = new AbortController()
    loading.value = true
    error.value = null
    try {
      data.value = await request(controller.signal)
    } catch (caught: unknown) {
      if (caught instanceof DOMException && caught.name === 'AbortError') return
      error.value = caught instanceof Error ? caught.message : 'An unexpected error occurred.'
    } finally {
      loading.value = false
    }
  }

  onScopeDispose(cancel)
  return { data, error, loading, execute, cancel }
}
