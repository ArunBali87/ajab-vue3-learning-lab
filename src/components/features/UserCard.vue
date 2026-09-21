<script setup lang="ts">
import type { User } from '@/types'

withDefaults(defineProps<{ user: User; compact?: boolean }>(), { compact: false })
const emit = defineEmits<{ select: [user: User] }>()
</script>

<template>
  <article class="user-card" :class="{ 'user-card--compact': compact }">
    <div class="avatar" aria-hidden="true">{{ user.name.charAt(0) }}</div>
    <div class="user-copy">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <span class="status" :class="{ 'status--inactive': !user.active }">{{
        user.active ? 'Active' : 'Inactive'
      }}</span>
    </div>
    <button type="button" class="button secondary" @click="emit('select', user)">Select</button>
  </article>
</template>
