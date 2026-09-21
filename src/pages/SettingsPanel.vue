<script setup lang="ts">
defineProps<{ title: string }>()
</script>
<template>
  <div>
    <h2>{{ title }}</h2>
    <p>This panel was lazy-loaded as a nested route.</p>
    <label class="check"><input type="checkbox" checked /> Enable {{ title.toLowerCase() }}</label>
  </div>
</template>
