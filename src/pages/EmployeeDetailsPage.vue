<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { employeeService } from '@/services/employeeService'
import type { Employee } from '@/types'

const route = useRoute()
const employee = ref<Employee>()
const error = ref('')
const loading = ref(true)
onMounted(async () => {
  try {
    employee.value = await employeeService.get(Number(route.params.id))
  } catch (caught: unknown) {
    error.value = caught instanceof Error ? caught.message : 'Could not load employee.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="details-page">
    <RouterLink class="text-link" to="/employees">← Back to employees</RouterLink>
    <div v-if="loading" class="state-panel">
      <span class="spinner" />
      <h2>Loading profile</h2>
    </div>
    <div v-else-if="error" class="state-panel state-panel--error">
      <h1>{{ error }}</h1>
    </div>
    <article v-else-if="employee" class="profile-panel">
      <div class="profile-top">
        <span class="profile-avatar">{{ employee.name.charAt(0) }}</span>
        <div>
          <p class="eyebrow">Employee #{{ employee.id }}</p>
          <h1>{{ employee.name }}</h1>
          <p>{{ employee.role }} · {{ employee.department }}</p>
        </div>
        <span class="status" :class="{ 'status--inactive': !employee.active }">{{
          employee.active ? 'Active' : 'Inactive'
        }}</span>
      </div>
      <dl class="profile-grid">
        <div>
          <dt>Email</dt>
          <dd>{{ employee.email }}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{{ employee.location }}</dd>
        </div>
        <div>
          <dt>Joined</dt>
          <dd>{{ employee.joinedAt }}</dd>
        </div>
        <div>
          <dt>Route param</dt>
          <dd>
            <code>{{ route.params.id }}</code>
          </dd>
        </div>
      </dl>
    </article>
  </div>
</template>
