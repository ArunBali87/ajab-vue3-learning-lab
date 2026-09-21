<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

export interface Registration {
  name: string
  email: string
  age: number | null
  role: string
  skills: string[]
  terms: boolean
}

const emit = defineEmits<{ submit: [registration: Registration] }>()
const submitted = ref(false)
const form = reactive<Registration>({
  name: '',
  email: '',
  age: null,
  role: 'Engineer',
  skills: [],
  terms: false,
})
const emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
const valid = computed(
  () => form.name.length >= 2 && emailValid.value && (form.age ?? 0) >= 18 && form.terms,
)

const submit = () => {
  submitted.value = true
  if (valid.value) emit('submit', { ...form, skills: [...form.skills] })
}
</script>

<template>
  <form class="form-grid" novalidate @submit.prevent="submit">
    <label class="field">Name <input v-model.trim="form.name" autocomplete="name" /></label>
    <label class="field"
      >Email <input v-model.trim="form.email" type="email" autocomplete="email"
    /></label>
    <label class="field">Age <input v-model.number="form.age" type="number" min="18" /></label>
    <label class="field"
      >Role
      <select v-model="form.role">
        <option>Engineer</option>
        <option>Designer</option>
        <option>Manager</option>
      </select>
    </label>
    <fieldset class="field field--wide">
      <legend>Skills</legend>
      <div class="checkbox-row">
        <label><input v-model="form.skills" type="checkbox" value="Vue" /> Vue</label>
        <label><input v-model="form.skills" type="checkbox" value="TypeScript" /> TypeScript</label>
        <label><input v-model="form.skills" type="checkbox" value="Testing" /> Testing</label>
      </div>
    </fieldset>
    <label class="check field--wide"
      ><input v-model="form.terms" type="checkbox" /> I accept the learning lab terms.</label
    >
    <p v-if="submitted && !valid" class="form-error field--wide">
      Enter a valid name, email, age of 18+, and accept the terms.
    </p>
    <button type="submit" class="button primary field--wide">Create registration</button>
  </form>
</template>
