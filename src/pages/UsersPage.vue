<script setup lang="ts">
const users = [
  { id: 1, name: 'Maya Chen' },
  { id: 2, name: 'Noah Williams' },
  { id: 3, name: 'Aisha Patel' },
]
</script>

<template>
  <div class="reference-page">
    <header class="reference-hero">
      <p class="eyebrow">Router example</p>
      <h1>Users</h1>
      <p>Select a user to exercise a dynamic route parameter.</p>
    </header>
    <div class="simple-list">
      <RouterLink v-for="user in users" :key="user.id" :to="`/users/${user.id}?source=list`"
        ><span class="avatar">{{ user.name[0] }}</span
        >{{ user.name }}<span>→</span></RouterLink
      >
    </div>
  </div>
</template>
