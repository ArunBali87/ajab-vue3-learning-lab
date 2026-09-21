<script setup lang="ts">
const groups = [
  {
    title: 'Reactivity',
    slug: 'reactivity',
    items: [
      ['ref()', 'Single reactive value'],
      ['reactive()', 'Deep reactive object'],
      ['computed()', 'Cached derived value'],
      ['watch()', 'Explicit reactive side effect'],
      ['watchEffect()', 'Auto-tracked side effect'],
    ],
  },
  {
    title: 'Component contracts',
    slug: 'props',
    items: [
      ['defineProps()', 'Typed inputs'],
      ['defineEmits()', 'Typed child events'],
      ['defineExpose()', 'Public instance API'],
      ['defineModel()', 'Custom v-model contract'],
      ['<slot>', 'Parent-provided content'],
    ],
  },
  {
    title: 'Lifecycle & DI',
    slug: 'lifecycle',
    items: [
      ['onMounted()', 'DOM is available'],
      ['onUnmounted()', 'Release resources'],
      ['provide()', 'Supply subtree dependency'],
      ['inject()', 'Consume subtree dependency'],
      ['useTemplateRef()', 'Typed DOM/component ref'],
    ],
  },
  {
    title: 'Routing & state',
    slug: 'vue-router',
    items: [
      ['useRoute()', 'Reactive current route'],
      ['useRouter()', 'Navigation API'],
      ['defineStore()', 'Pinia store factory'],
      ['storeToRefs()', 'Safely destructure store state'],
      ['RouterView', 'Matched route outlet'],
    ],
  },
  {
    title: 'Template directives',
    slug: 'template-syntax',
    items: [
      ['v-if', 'Create/destroy conditionally'],
      ['v-show', 'Toggle display'],
      ['v-for', 'Render a keyed list'],
      ['v-model', 'Two-way input contract'],
      ['v-bind / :', 'Bind an attribute or prop'],
      ['v-on / @', 'Listen to an event'],
      ['v-slot / #', 'Provide slot content'],
    ],
  },
  {
    title: 'Built-ins',
    slug: 'dynamic-components',
    items: [
      ['<template>', 'Non-rendering grouping'],
      ['<component>', 'Dynamic component type'],
      ['<KeepAlive>', 'Cache component instances'],
      ['<Suspense>', 'Coordinate async setup'],
      ['<Teleport>', 'Render elsewhere in the DOM'],
    ],
  },
]
</script>

<template>
  <div class="reference-page">
    <header class="reference-hero">
      <p class="eyebrow">Desk reference</p>
      <h1>Vue 3 Cheat Sheet</h1>
      <p>Scan the API, then jump directly to the module that teaches it in context.</p>
    </header>
    <div class="cheat-grid">
      <section v-for="group in groups" :key="group.title" class="cheat-card">
        <div class="section-heading">
          <h2>{{ group.title }}</h2>
          <RouterLink :to="`/lessons/${group.slug}`">Learn →</RouterLink>
        </div>
        <dl>
          <template v-for="item in group.items" :key="item[0]"
            ><dt>
              <code>{{ item[0] }}</code>
            </dt>
            <dd>{{ item[1] }}</dd></template
          >
        </dl>
      </section>
    </div>
  </div>
</template>
