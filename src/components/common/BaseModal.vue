<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, useTemplateRef, watch } from 'vue'

const props = defineProps<{ open: boolean; title: string }>()
const emit = defineEmits<{ close: [] }>()
const closeButton = useTemplateRef<HTMLButtonElement>('closeButton')

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') emit('close')
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

watch(
  () => props.open,
  async (open) => {
    if (!open) return
    await nextTick()
    closeButton.value?.focus()
  },
  { immediate: true },
)
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="modal-backdrop" role="presentation" @click.self="emit('close')">
      <section class="modal" role="dialog" aria-modal="true" :aria-label="title">
        <header class="modal-header">
          <div>
            <p class="eyebrow">Employee editor</p>
            <h2>{{ title }}</h2>
          </div>
          <button
            ref="closeButton"
            type="button"
            class="icon-button"
            aria-label="Close modal"
            @click="emit('close')"
          >
            ×
          </button>
        </header>
        <div class="modal-body"><slot /></div>
        <footer v-if="$slots.actions" class="modal-actions"><slot name="actions" /></footer>
      </section>
    </div>
  </Teleport>
</template>
