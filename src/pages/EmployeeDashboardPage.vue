<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import BaseModal from '@/components/common/BaseModal.vue'
import EmployeeForm from '@/components/features/EmployeeForm.vue'
import { useDebounce } from '@/composables/useDebounce'
import { useAppStore } from '@/stores/app'
import { useEmployeeStore } from '@/stores/employees'
import type { Employee, EmployeeDraft } from '@/types'

const store = useEmployeeStore()
const app = useAppStore()
const search = ref('')
const debouncedSearch = useDebounce(search, 300)
const department = ref('')
const sort = ref<'name' | 'joinedAt'>('name')
const page = ref(1)
const pageSize = 5
const editorOpen = ref(false)
const editing = ref<Employee>()
const saving = ref(false)
const pageCount = computed(() => Math.max(1, Math.ceil(store.total / pageSize)))

const load = () =>
  store.load({
    page: page.value,
    pageSize,
    search: debouncedSearch.value,
    department: department.value,
    sort: sort.value,
  })
watch([debouncedSearch, department, sort], () => {
  page.value = 1
  void load()
})
watch(page, () => void load())
onMounted(() => void load())

const openCreate = () => {
  editing.value = undefined
  editorOpen.value = true
}
const openEdit = (employee: Employee) => {
  editing.value = employee
  editorOpen.value = true
}
const save = async (draft: EmployeeDraft) => {
  saving.value = true
  try {
    if (editing.value) await store.update(editing.value.id, draft)
    else await store.create(draft)
    editorOpen.value = false
    app.notify(editing.value ? 'Employee updated.' : 'Employee added.', 'success')
    await load()
  } catch (error: unknown) {
    app.notify(error instanceof Error ? error.message : 'Save failed.', 'danger')
  } finally {
    saving.value = false
  }
}
const remove = async (employee: Employee) => {
  if (!window.confirm(`Delete ${employee.name}?`)) return
  await store.remove(employee.id)
  app.notify('Employee deleted.', 'success')
  if (store.employees.length === 1 && page.value > 1) page.value--
  else await load()
}
</script>

<template>
  <div class="employee-page">
    <header class="reference-hero employee-hero">
      <div>
        <p class="eyebrow">Production mini project</p>
        <h1>Employee Management</h1>
        <p>
          A complete CRUD flow using Vue Router, Pinia, composables, a typed service, forms, modal,
          toast, and deliberate UI states.
        </p>
      </div>
      <button class="button primary" @click="openCreate">+ Add employee</button>
    </header>
    <section class="employee-metrics">
      <article>
        <span>Total employees</span><strong>{{ store.total }}</strong>
      </article>
      <article>
        <span>Visible now</span><strong>{{ store.employees.length }}</strong>
      </article>
      <article>
        <span>Current page</span><strong>{{ page }}/{{ pageCount }}</strong>
      </article>
    </section>
    <section class="data-panel">
      <div class="data-toolbar">
        <label class="search-field"
          ><span>⌕</span
          ><input
            v-model="search"
            placeholder="Search name or email"
            aria-label="Search employees" /></label
        ><label
          ><span>Department</span
          ><select v-model="department">
            <option value="">All departments</option>
            <option>Engineering</option>
            <option>Design</option>
            <option>Product</option>
            <option>Operations</option>
          </select></label
        ><label
          ><span>Sort by</span
          ><select v-model="sort">
            <option value="name">Name</option>
            <option value="joinedAt">Join date</option>
          </select></label
        >
      </div>
      <div v-if="store.loading" class="state-panel">
        <span class="spinner" />
        <h2>Loading employees</h2>
        <p>The current request will be cancelled if you change the filters.</p>
      </div>
      <div v-else-if="store.error" class="state-panel state-panel--error">
        <h2>Could not load employees</h2>
        <p>{{ store.error }}</p>
        <button class="button secondary" @click="load">Retry</button>
      </div>
      <div v-else-if="!store.employees.length" class="state-panel">
        <span class="empty-icon">⌕</span>
        <h2>No employees found</h2>
        <p>Try a broader query or add a new employee.</p>
      </div>
      <div v-else class="table-scroll">
        <table class="employee-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Location</th>
              <th>Status</th>
              <th>Joined</th>
              <th><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in store.employees" :key="employee.id">
              <td>
                <RouterLink :to="`/employees/${employee.id}`" class="employee-name"
                  ><span class="avatar">{{ employee.name.charAt(0) }}</span
                  ><span
                    ><strong>{{ employee.name }}</strong
                    ><small>{{ employee.email }}</small></span
                  ></RouterLink
                >
              </td>
              <td>{{ employee.department }}</td>
              <td>{{ employee.location }}</td>
              <td>
                <span class="status" :class="{ 'status--inactive': !employee.active }">{{
                  employee.active ? 'Active' : 'Inactive'
                }}</span>
              </td>
              <td>{{ employee.joinedAt }}</td>
              <td>
                <div class="row-actions">
                  <button aria-label="Edit employee" @click="openEdit(employee)">Edit</button
                  ><button
                    class="danger-link"
                    aria-label="Delete employee"
                    @click="remove(employee)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <footer class="pagination">
        <span>Showing {{ store.employees.length }} of {{ store.total }}</span>
        <div>
          <button class="button ghost" :disabled="page <= 1" @click="page--">← Previous</button
          ><span>Page {{ page }}</span
          ><button class="button ghost" :disabled="page >= pageCount" @click="page++">
            Next →
          </button>
        </div>
      </footer>
    </section>
    <BaseModal
      :open="editorOpen"
      :title="editing ? `Edit ${editing.name}` : 'Add employee'"
      @close="editorOpen = false"
      ><EmployeeForm
        :key="editing?.id ?? 'new'"
        :employee="editing"
        @save="save"
        @cancel="editorOpen = false"
      /><template #actions><span v-if="saving">Saving…</span></template></BaseModal
    >
  </div>
</template>
