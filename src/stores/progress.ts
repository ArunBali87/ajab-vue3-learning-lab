import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { lessons } from '@/constants/course'

const STORAGE_KEY = 'vue3-learning-lab-progress'

export const useProgressStore = defineStore('progress', () => {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  const completedSlugs = ref<string[]>(stored ? (JSON.parse(stored) as string[]) : [])

  const completedCount = computed(() => completedSlugs.value.length)
  const percent = computed(() => Math.round((completedCount.value / lessons.length) * 100))

  const isComplete = (slug: string) => completedSlugs.value.includes(slug)
  const toggle = (slug: string) => {
    completedSlugs.value = isComplete(slug)
      ? completedSlugs.value.filter((entry) => entry !== slug)
      : [...completedSlugs.value, slug]
  }

  watch(
    completedSlugs,
    (value) => window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value)),
    { deep: true },
  )
  return { completedSlugs, completedCount, percent, isComplete, toggle }
})
