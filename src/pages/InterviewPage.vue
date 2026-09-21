<script setup lang="ts">
import { lessons } from '@/constants/course'

const questions = lessons.flatMap((lesson) =>
  lesson.interview.slice(0, 1).map((item) => ({ ...item, module: lesson.title })),
)
</script>

<template>
  <div class="reference-page">
    <header class="reference-hero">
      <p class="eyebrow">Concise technical answers</p>
      <h1>Vue 3 Interview Preparation</h1>
      <p>
        Thirty prompts across reactivity, components, routing, state, TypeScript, performance,
        testing, and architecture.
      </p>
    </header>
    <div class="interview-grid">
      <details v-for="item in questions" :key="item.module">
        <summary>
          <span>{{ item.module }}</span
          >{{ item.question }}
        </summary>
        <p>{{ item.answer }}</p>
      </details>
    </div>
  </div>
</template>
