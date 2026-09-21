<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { lessons, phaseNames } from '@/constants/course'
import { useAppStore } from '@/stores/app'
import { useProgressStore } from '@/stores/progress'
import type { LearningPhase } from '@/types'

const app = useAppStore()
const progress = useProgressStore()
const phases = computed(() =>
  ([1, 2, 3, 4] as LearningPhase[]).map((number) => ({
    number,
    name: phaseNames[number],
    lessons: lessons.filter((lesson) => lesson.phase === number),
  })),
)
</script>

<template>
  <aside class="sidebar" :class="{ 'sidebar--open': app.sidebarOpen }">
    <div class="brand-row">
      <RouterLink to="/dashboard" class="brand" @click="app.sidebarOpen = false">
        <span class="brand-mark">V</span
        ><span><strong>Vue 3</strong><small>Learning Lab</small></span>
      </RouterLink>
      <button
        type="button"
        class="icon-button sidebar-close"
        aria-label="Close navigation"
        @click="app.sidebarOpen = false"
      >
        ×
      </button>
    </div>
    <nav aria-label="Course navigation">
      <RouterLink class="nav-link nav-link--home" to="/dashboard" @click="app.sidebarOpen = false"
        ><span>⌂</span> Dashboard</RouterLink
      >
      <RouterLink class="nav-link" to="/mental-model" @click="app.sidebarOpen = false"
        ><span>↔</span> React → Vue Model</RouterLink
      >
      <section v-for="phase in phases" :key="phase.number" class="nav-phase">
        <p>
          <span>Phase {{ phase.number }}</span
          >{{ phase.name }}
        </p>
        <RouterLink
          v-for="lesson in phase.lessons"
          :key="lesson.slug"
          class="nav-link nav-link--lesson"
          :to="`/lessons/${lesson.slug}`"
          @click="app.sidebarOpen = false"
        >
          <span class="lesson-number">{{ String(lesson.number).padStart(2, '0') }}</span>
          <span class="lesson-name">{{ lesson.title }}</span>
          <i v-if="progress.isComplete(lesson.slug)" aria-label="Complete">✓</i>
        </RouterLink>
      </section>
      <section class="nav-phase">
        <p><span>Reference</span>Keep nearby</p>
        <RouterLink class="nav-link" to="/cheat-sheet" @click="app.sidebarOpen = false"
          >⌘ Vue Cheat Sheet</RouterLink
        >
        <RouterLink class="nav-link" to="/practice" @click="app.sidebarOpen = false"
          >✎ React Practice</RouterLink
        >
        <RouterLink class="nav-link" to="/weird-vue" @click="app.sidebarOpen = false"
          >? 20 Weird Things</RouterLink
        >
        <RouterLink class="nav-link" to="/interview" @click="app.sidebarOpen = false"
          >◈ Interview Prep</RouterLink
        >
      </section>
    </nav>
  </aside>
</template>
