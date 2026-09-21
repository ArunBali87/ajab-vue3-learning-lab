<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ code: string; language?: string }>()
const copied = ref(false)

const copy = async () => {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  window.setTimeout(() => (copied.value = false), 1600)
}
</script>

<template>
  <div class="code-block">
    <div class="code-toolbar">
      <span>{{ language ?? 'vue' }}</span>
      <button type="button" class="copy-button" @click="copy">
        {{ copied ? 'Copied' : 'Copy' }}
      </button>
    </div>
    <pre><code>{{ code }}</code></pre>
  </div>
</template>
