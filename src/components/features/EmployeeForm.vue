<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { Employee, EmployeeDraft } from '@/types'

const props = defineProps<{ employee?: Employee }>()
const emit = defineEmits<{ save: [draft: EmployeeDraft]; cancel: [] }>()

const form = reactive<EmployeeDraft>({
  name: props.employee?.name ?? '',
  email: props.employee?.email ?? '',
  role: props.employee?.role ?? 'Engineer',
  active: props.employee?.active ?? true,
  department: props.employee?.department ?? 'Engineering',
  location: props.employee?.location ?? '',
  joinedAt: props.employee?.joinedAt ?? new Date().toISOString().slice(0, 10),
})
const valid = computed(
  () =>
    form.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.location.trim().length > 1,
)
</script>

<template>
  <form id="employee-form" class="form-grid" @submit.prevent="valid && emit('save', { ...form })">
    <label class="field"
      >Full name <input v-model.trim="form.name" required autocomplete="name"
    /></label>
    <label class="field"
      >Email <input v-model.trim="form.email" required type="email" autocomplete="email"
    /></label>
    <label class="field"
      >Role
      <select v-model="form.role">
        <option>Admin</option>
        <option>Engineer</option>
        <option>Designer</option>
        <option>Manager</option>
      </select>
    </label>
    <label class="field"
      >Department
      <select v-model="form.department">
        <option>Engineering</option>
        <option>Design</option>
        <option>Product</option>
        <option>Operations</option>
      </select>
    </label>
    <label class="field">Location <input v-model.trim="form.location" required /></label>
    <label class="field">Joined <input v-model="form.joinedAt" type="date" required /></label>
    <label class="check field--wide"
      ><input v-model="form.active" type="checkbox" /> Active employee</label
    >
    <div class="button-row field--wide">
      <button type="submit" class="button primary" :disabled="!valid">
        {{ employee ? 'Save changes' : 'Add employee' }}
      </button>
      <button type="button" class="button ghost" @click="emit('cancel')">Cancel</button>
    </div>
  </form>
</template>
