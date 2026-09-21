<script setup lang="ts">
const things = [
  [
    'Why .value exists',
    'A ref is a stable object whose value can change while Vue tracks reads and writes. Templates unwrap it for ergonomics.',
  ],
  [
    'Templates unwrap refs',
    'The compiler makes {{ count }} concise; script remains explicit with count.value.',
  ],
  [
    'reactive is not ref',
    'reactive proxies an object and is easiest when its identity stays stable; ref can replace its whole value.',
  ],
  [
    'Computed beats duplicated state',
    'It is cached, auto-tracked, and cannot drift from its inputs.',
  ],
  [
    'watch is not always useEffect',
    'Use computed for derivation, lifecycle for mount timing, and watch only to synchronize with an external effect.',
  ],
  [
    'Templates are not JSX',
    'They are statically analyzable HTML-like syntax with directives and compile-time optimization.',
  ],
  [
    'v-model is a contract',
    'On components it maps a modelValue prop to an update:modelValue event and supports multiple named models.',
  ],
  [
    'Props are readonly',
    'Ownership remains with the parent; emit intent rather than mutating input.',
  ],
  [
    'Emits are declared',
    'The child exposes a named event API instead of receiving every callback as a prop.',
  ],
  [
    'Slots are functions',
    'Conceptually they are parent-owned render functions invoked by a child layout.',
  ],
  [
    'Composables are not restricted hooks',
    'They can run conditionally, though setup-time scope is still important for lifecycle cleanup.',
  ],
  [
    'Pinia is deliberately light',
    'State, computed getters, and actions use Vue primitives without reducers.',
  ],
  [
    'Routes are records',
    'Configuration maps paths to components and metadata; RouterView renders the current match.',
  ],
  [
    'Keys preserve identity',
    'A stable key tells Vue which component or element survived a list reorder.',
  ],
  [
    'Lifecycle is explicit',
    'Mounted, activated, and unmounted are distinct moments rather than dependency-array conventions.',
  ],
  [
    'Dependencies are discovered',
    'Vue records reactive reads during computed values, effects, and rendering.',
  ],
  [
    'Destructuring can disconnect',
    'Pulling plain properties from a proxy loses the proxy access; use toRefs when needed.',
  ],
  [
    'provide/inject is scoped DI',
    'It supports component families and services as well as context-like state.',
  ],
  [
    'Async components are component factories',
    'They create a bundle boundary with loading, retry, error, and timeout policy.',
  ],
  [
    'Rendering is compiler-assisted',
    'Static analysis marks dynamic regions so Vue can skip work React often discovers at runtime.',
  ],
]
</script>

<template>
  <div class="reference-page">
    <header class="reference-hero">
      <p class="eyebrow">React developer field notes</p>
      <h1>Top 20 things that feel weird in Vue</h1>
      <p>The confusing parts become advantages once the underlying model clicks.</p>
    </header>
    <ol class="weird-list">
      <li v-for="(thing, index) in things" :key="thing[0]">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <div>
          <h2>{{ thing[0] }}</h2>
          <p>{{ thing[1] }}</p>
        </div>
      </li>
    </ol>
  </div>
</template>
