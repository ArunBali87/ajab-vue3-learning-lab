<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ProgressBar from '@/components/common/ProgressBar.vue'
import { lessons, phaseNames } from '@/constants/course'
import { useProgressStore } from '@/stores/progress'
import type { LearningPhase } from '@/types'

const progress = useProgressStore()
const phases = computed(() =>
  ([1, 2, 3, 4] as LearningPhase[]).map((phase) => {
    const group = lessons.filter((lesson) => lesson.phase === phase)
    const done = group.filter((lesson) => progress.isComplete(lesson.slug)).length
    return {
      phase,
      name: phaseNames[phase],
      count: group.length,
      percent: Math.round((done / group.length) * 100),
      lessons: group,
    }
  }),
)
const nextLesson = computed(
  () => lessons.find((lesson) => !progress.isComplete(lesson.slug)) ?? lessons[0],
)
</script>

<template>
  <div class="dashboard-page">
    <section class="hero-panel">
      <div class="hero-copy">
        <p class="eyebrow">Your Vue 3 fast track</p>
        <h1>Think in Vue.<br /><em>Ship with confidence.</em></h1>
        <p class="hero-lead">
          A production-minded learning path for engineers who already think in React and TypeScript.
        </p>
        <div class="button-row">
          <RouterLink class="button primary" :to="`/lessons/${nextLesson?.slug}`"
            >Continue with {{ nextLesson?.title }} →</RouterLink
          >
          <RouterLink class="button secondary" to="/mental-model"
            >Start with the mental model</RouterLink
          >
        </div>
      </div>
      <div class="hero-orbit" aria-hidden="true">
        <div class="orbit orbit-one"><span>ref()</span></div>
        <div class="orbit orbit-two"><span>computed</span></div>
        <div class="vue-gem">V</div>
        <span class="orbit-label orbit-label--router">Router</span>
        <span class="orbit-label orbit-label--pinia">Pinia</span>
      </div>
    </section>

    <section class="dashboard-grid">
      <article class="overview-card">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Learning progress</p>
            <h2>Your course at a glance</h2>
          </div>
          <strong class="big-percent">{{ progress.percent }}%</strong>
        </div>
        <div class="phase-progress">
          <ProgressBar
            v-for="phase in phases"
            :key="phase.phase"
            :value="phase.percent"
            :label="`Phase ${phase.phase} · ${phase.name}`"
          />
        </div>
      </article>
      <article class="today-card">
        <span class="day-pill">DAY 1</span>
        <p class="eyebrow">Recommended start</p>
        <h2>Vue Mental Model + Fundamentals</h2>
        <p>
          Translate what you already know before learning new syntax. Then build your first reactive
          SFC.
        </p>
        <ul class="check-list">
          <li>React → Vue vocabulary</li>
          <li>Templates versus JSX</li>
          <li>ref and automatic unwrapping</li>
        </ul>
        <RouterLink class="text-link" to="/mental-model">Begin Day 1 <span>→</span></RouterLink>
      </article>
    </section>

    <section class="roadmap-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Four-phase roadmap</p>
          <h2>From mental model to production</h2>
        </div>
        <RouterLink class="text-link" to="/cheat-sheet">Open quick reference →</RouterLink>
      </div>
      <div class="phase-cards">
        <article v-for="phase in phases" :key="phase.phase" class="phase-card">
          <div class="phase-card-top">
            <span>0{{ phase.phase }}</span
            ><small>{{ phase.count }} modules</small>
          </div>
          <h3>{{ phase.name }}</h3>
          <p>
            {{
              phase.phase === 1
                ? 'Core syntax and component communication.'
                : phase.phase === 2
                  ? 'Routing, shared state, and data.'
                  : phase.phase === 3
                    ? 'Delivery, testing, and architecture.'
                    : 'Integrated employee dashboard.'
            }}
          </p>
          <RouterLink :to="`/lessons/${phase.lessons[0]?.slug}`">View phase →</RouterLink>
        </article>
      </div>
    </section>
  </div>
</template>
