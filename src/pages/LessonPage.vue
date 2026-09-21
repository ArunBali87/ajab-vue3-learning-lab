<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ChallengePanel from '@/components/features/ChallengePanel.vue'
import CodeBlock from '@/components/common/CodeBlock.vue'
import LessonPlayground from '@/components/features/LessonPlayground.vue'
import { lessonBySlug, lessons, phaseNames } from '@/constants/course'
import { useProgressStore } from '@/stores/progress'

const route = useRoute()
const progress = useProgressStore()
const lesson = computed(() => lessonBySlug(String(route.params.slug)))
const index = computed(() => lessons.findIndex((entry) => entry.slug === lesson.value?.slug))
const previous = computed(() => lessons[index.value - 1])
const next = computed(() => lessons[index.value + 1])

watchEffect(() => {
  document.title = lesson.value ? `${lesson.value.title} · Vue 3 Learning Lab` : 'Lesson not found'
})
</script>

<template>
  <div v-if="lesson" class="lesson-page">
    <header class="lesson-hero">
      <div class="lesson-breadcrumb">
        Phase {{ lesson.phase }} · {{ phaseNames[lesson.phase] }} <span>/</span> Module
        {{ String(lesson.number).padStart(2, '0') }}
      </div>
      <div class="lesson-title-row">
        <div>
          <p class="eyebrow">{{ lesson.duration }}</p>
          <h1>{{ lesson.title }}</h1>
          <p>{{ lesson.summary }}</p>
        </div>
        <button
          type="button"
          class="complete-button"
          :class="{ complete: progress.isComplete(lesson.slug) }"
          @click="progress.toggle(lesson.slug)"
        >
          <span>{{ progress.isComplete(lesson.slug) ? '✓' : '○' }}</span
          >{{ progress.isComplete(lesson.slug) ? 'Completed' : 'Mark complete' }}
        </button>
      </div>
      <div class="concept-pills">
        <span v-for="concept in lesson.concepts" :key="concept">{{ concept }}</span>
      </div>
    </header>

    <section class="mental-grid">
      <article>
        <span class="card-index">WHAT</span>
        <h2>The idea</h2>
        <p>{{ lesson.summary }}</p>
      </article>
      <article>
        <span class="card-index">WHY</span>
        <h2>Why Vue has it</h2>
        <p>{{ lesson.why }}</p>
      </article>
      <article>
        <span class="card-index">WHEN</span>
        <h2>Use it when</h2>
        <p>{{ lesson.when }}</p>
      </article>
    </section>

    <section class="comparison-strip">
      <div class="framework-label react-label">React</div>
      <p>{{ lesson.reactEquivalent }}</p>
      <div class="framework-label vue-label">Vue</div>
    </section>

    <section class="content-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">How it works</p>
          <h2>The Vue implementation</h2>
        </div>
        <span class="file-chip">Example.vue</span>
      </div>
      <CodeBlock :code="lesson.code" />
    </section>

    <LessonPlayground :slug="lesson.slug" />

    <section class="notes-grid">
      <article class="note-card note-card--good">
        <span>PRODUCTION</span>
        <h2>Rule of thumb</h2>
        <p>{{ lesson.productionUsage }}</p>
      </article>
      <article class="note-card note-card--warn">
        <span>COMMON MISTAKE</span>
        <h2>Watch this edge</h2>
        <p>{{ lesson.commonMistake }}</p>
      </article>
    </section>

    <ChallengePanel
      :challenge="lesson.challenge"
      :requirements="lesson.challengeRequirements"
      :solution="lesson.solution"
    />

    <section class="interview-section">
      <p class="eyebrow">Interview checkpoint</p>
      <h2>Explain it clearly</h2>
      <details v-for="item in lesson.interview" :key="item.question">
        <summary>{{ item.question }}</summary>
        <p>{{ item.answer }}</p>
      </details>
    </section>

    <nav class="lesson-pagination" aria-label="Lesson pagination">
      <RouterLink v-if="previous" :to="`/lessons/${previous.slug}`"
        ><small>← Previous</small><strong>{{ previous.title }}</strong></RouterLink
      ><span v-else />
      <RouterLink v-if="next" :to="`/lessons/${next.slug}`" class="next"
        ><small>Next →</small><strong>{{ next.title }}</strong></RouterLink
      >
    </nav>
  </div>
  <section v-else class="empty-page">
    <h1>Lesson not found</h1>
    <RouterLink class="button primary" to="/dashboard">Back to dashboard</RouterLink>
  </section>
</template>
