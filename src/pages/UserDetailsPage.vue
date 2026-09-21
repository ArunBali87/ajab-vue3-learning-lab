<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const description = computed(
  () => `Param id = ${route.params.id}; query source = ${route.query.source ?? 'direct'}`,
)
</script>
<template>
  <div class="reference-page">
    <header class="reference-hero">
      <p class="eyebrow">Dynamic route</p>
      <h1>User {{ route.params.id }}</h1>
      <p>{{ description }}</p>
      <button
        class="button secondary"
        @click="router.push({ path: '/users', query: { visited: route.params.id } })"
      >
        Back programmatically
      </button>
    </header>
  </div>
</template>
