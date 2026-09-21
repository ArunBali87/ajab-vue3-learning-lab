<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const app = useAppStore()
</script>

<template>
  <div class="toast-host" aria-live="polite">
    <button
      v-for="toast in app.toasts"
      :key="toast.id"
      type="button"
      class="toast"
      :class="`toast--${toast.tone}`"
      @click="app.dismiss(toast.id)"
    >
      <span>{{ toast.tone === 'success' ? '✓' : toast.tone === 'danger' ? '!' : 'i' }}</span>
      {{ toast.message }}
    </button>
  </div>
</template>
