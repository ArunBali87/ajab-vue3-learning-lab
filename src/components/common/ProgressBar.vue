<script setup lang="ts">
defineProps<{ value: number; label?: string }>()
</script>

<template>
  <div class="progress-wrap">
    <div class="progress-label">
      <span>{{ label }}</span
      ><strong>{{ value }}%</strong>
    </div>
    <div
      class="progress-track"
      role="progressbar"
      :aria-label="label"
      :aria-valuenow="value"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <span :style="{ width: `${value}%` }" />
    </div>
  </div>
</template>
