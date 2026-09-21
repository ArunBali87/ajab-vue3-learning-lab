import { ref } from 'vue'
import { defineStore } from 'pinia'
import { employeeService } from '@/services/employeeService'
import type { ApiQuery, Employee, EmployeeDraft } from '@/types'

export const useEmployeeStore = defineStore('employees', () => {
  const employees = ref<Employee[]>([])
  const total = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)
  let controller: AbortController | undefined

  const load = async (query: ApiQuery) => {
    controller?.abort()
    controller = new AbortController()
    loading.value = true
    error.value = null
    try {
      const result = await employeeService.list(query, controller.signal)
      employees.value = result.items
      total.value = result.total
    } catch (caught: unknown) {
      if (caught instanceof DOMException && caught.name === 'AbortError') return
      error.value = caught instanceof Error ? caught.message : 'Could not load employees.'
    } finally {
      loading.value = false
    }
  }

  const create = async (draft: EmployeeDraft) => employeeService.create(draft)
  const update = async (id: number, draft: EmployeeDraft) => employeeService.update(id, draft)
  const remove = async (id: number) => employeeService.remove(id)
  return { employees, total, loading, error, load, create, update, remove }
})
