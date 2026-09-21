<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

defineProps<{ challenge: string; requirements: string[]; solution: string }>()
const showSolution = ref(false)
</script>

<template>
  <section class="challenge-panel">
    <div class="challenge-heading">
      <div>
        <p class="eyebrow">Try it before you peek</p>
        <h2>Hands-on challenge</h2>
      </div>
      <span class="challenge-icon" aria-hidden="true">⌁</span>
    </div>
    <p>{{ challenge }}</p>
    <ul class="check-list">
      <li v-for="requirement in requirements" :key="requirement">{{ requirement }}</li>
    </ul>
    <button type="button" class="button secondary" @click="showSolution = !showSolution">
      {{ showSolution ? 'Hide solution' : 'Reveal solution' }}
    </button>
    <Transition name="slide-fade">
      <CodeBlock v-if="showSolution" :code="solution" language="solution" />
    </Transition>
  </section>
</template>
