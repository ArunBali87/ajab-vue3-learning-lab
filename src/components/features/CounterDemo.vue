<script setup lang="ts">
import { useCounter } from '@/composables/useCounter'

const props = withDefaults(defineProps<{ initial?: number }>(), { initial: 0 })
const { count, increment, decrement, reset } = useCounter(props.initial)
</script>

<template>
  <div class="counter-demo">
    <span data-test="count" class="counter-value">{{ count }}</span>
    <div class="button-row">
      <button type="button" class="button secondary" @click="decrement">− Decrement</button>
      <button type="button" class="button primary" @click="increment">+ Increment</button>
      <button type="button" class="button ghost" @click="reset">Reset</button>
    </div>
  </div>
</template>
