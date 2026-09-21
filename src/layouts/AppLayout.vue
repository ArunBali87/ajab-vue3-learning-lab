<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppSidebar from '@/components/common/AppSidebar.vue'
import ToastHost from '@/components/common/ToastHost.vue'
import { useAppStore } from '@/stores/app'
import { useProgressStore } from '@/stores/progress'

const app = useAppStore()
const progress = useProgressStore()
</script>

<template>
  <div class="app-shell">
    <AppSidebar />
    <button
      v-if="app.sidebarOpen"
      type="button"
      class="sidebar-scrim"
      aria-label="Close navigation"
      @click="app.sidebarOpen = false"
    />
    <div class="app-main">
      <header class="topbar">
        <button
          type="button"
          class="icon-button menu-button"
          aria-label="Open navigation"
          @click="app.sidebarOpen = true"
        >
          ☰
        </button>
        <div class="topbar-context"><span class="status-dot" /> Learning environment ready</div>
        <div class="topbar-progress">
          <span>{{ progress.completedCount }}/30 complete</span>
          <div><i :style="{ width: `${progress.percent}%` }" /></div>
        </div>
      </header>
      <main class="page-shell"><RouterView /></main>
    </div>
    <ToastHost />
  </div>
</template>
