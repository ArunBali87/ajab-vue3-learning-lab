import type { LearningPhase, Lesson } from '@/types'

export const phaseNames: Record<LearningPhase, string> = {
  1: 'Become Productive',
  2: 'Real Application Development',
  3: 'Advanced Vue',
  4: 'Production Project',
}

type LessonSeed = Omit<Lesson, 'duration' | 'challengeRequirements' | 'solution' | 'interview'> & {
  duration?: string
  challengeRequirements?: string[]
  solution?: string
  interview?: Lesson['interview']
}

const makeLesson = (lesson: LessonSeed): Lesson => ({
  duration: '20–30 min',
  challengeRequirements: ['Use TypeScript', 'Use <script setup>', 'Keep derived state declarative'],
  solution: `// One valid approach\n${lesson.code}`,
  interview: [
    {
      question: `How would you explain ${lesson.title} to a React developer?`,
      answer: lesson.reactEquivalent,
    },
    {
      question: `What is the production rule of thumb?`,
      answer: lesson.productionUsage,
    },
    {
      question: `What mistake should you watch for?`,
      answer: lesson.commonMistake,
    },
  ],
  ...lesson,
})

export const lessons: Lesson[] = [
  makeLesson({
    number: 1,
    slug: 'vue-fundamentals',
    title: 'Vue Fundamentals',
    phase: 1,
    summary: 'Understand app creation, Single File Components, templates, bindings, and events.',
    reactEquivalent:
      'A .vue SFC combines the role of a TSX component and its colocated styles; templates replace most JSX.',
    concepts: [
      'createApp',
      'Single File Components',
      '<script setup>',
      'interpolation',
      'v-bind',
      'v-on',
    ],
    why: 'Vue compiles declarative templates into optimized render functions while keeping logic, markup, and scoped styling cohesive.',
    when: 'Use an SFC for almost every UI unit. Reach for render functions or JSX only when the UI is truly programmatic.',
    productionUsage:
      'Keep templates declarative, handlers small, and mount the application once in main.ts.',
    commonMistake:
      'Writing React-style className or invoking handlers with @click="save()" when a reference is sufficient.',
    code: `<script setup lang="ts">\nconst message = 'Hello Vue 3'\nconst handleClick = () => alert(message)\n</script>\n\n<template>\n  <button :id="'welcome'" @click="handleClick">{{ message }}</button>\n</template>`,
    challenge: 'Add a bound title attribute and change the message when the button is clicked.',
  }),
  makeLesson({
    number: 2,
    slug: 'reactivity',
    title: 'Reactivity',
    phase: 1,
    duration: '35–45 min',
    summary:
      'Master ref, reactive, automatic template unwrapping, shallow APIs, and safe destructuring.',
    reactEquivalent:
      'ref/reactive hold tracked state like useState, but Vue mutates tracked containers instead of replacing state through a setter.',
    concepts: [
      'ref',
      'reactive',
      '.value',
      'toRef',
      'toRefs',
      'unref',
      'shallowRef',
      'shallowReactive',
    ],
    why: 'Dependency tracking lets Vue update only consumers that read the changed reactive value.',
    when: 'Default to ref for replaceable values; use reactive for cohesive objects you do not plan to replace wholesale.',
    productionUsage:
      'Return refs from composables and use toRefs when exposing properties of a reactive object.',
    commonMistake:
      'Destructuring a reactive object into plain variables, which disconnects those values from reactivity.',
    code: `const count = ref(0)\nconst profile = reactive({ name: 'Arun', skills: ['React'] })\nconst { name } = toRefs(profile)\ncount.value++\nprofile.skills.push('Vue')`,
    challenge:
      'Build a profile editor using reactive and preserve reactivity while destructuring its fields.',
  }),
  makeLesson({
    number: 3,
    slug: 'computed-properties',
    title: 'Computed Properties',
    phase: 1,
    summary: 'Model cached derived state, including writable computed values.',
    reactEquivalent:
      'computed is closest to useMemo, but Vue discovers dependencies automatically and exposes a reactive ref.',
    concepts: ['computed', 'derived state', 'writable computed', 'caching', 'computed vs methods'],
    why: 'Derived state stays synchronized without duplicated mutable state or manual dependency arrays.',
    when: 'Use computed for a value derived synchronously from reactive inputs.',
    productionUsage:
      'Prefer computed over watchers for filtering, totals, labels, permissions, and view models.',
    commonMistake:
      'Performing side effects inside a computed getter or mutating the returned value.',
    code: `const firstName = ref('Arun')\nconst lastName = ref('Bali')\nconst fullName = computed(() => \`\${firstName.value} \${lastName.value}\`)`,
    challenge: 'Create a cart total computed from price, quantity, and discount.',
  }),
  makeLesson({
    number: 4,
    slug: 'watchers',
    title: 'Watchers',
    phase: 1,
    duration: '35–45 min',
    summary:
      'Use watch, watchEffect, flush timing, multiple sources, cleanup, and explicit stopping.',
    reactEquivalent:
      'watch resembles a dependency-aware useEffect; watchEffect resembles an effect with auto-collected dependencies.',
    concepts: [
      'watch',
      'watchEffect',
      'watchPostEffect',
      'immediate',
      'deep',
      'cleanup',
      'stop handles',
    ],
    why: 'Watchers synchronize reactive state with external systems—storage, requests, analytics, and imperative APIs.',
    when: 'Use watch when the source matters; watchEffect for concise reactive effects; computed for pure derivation.',
    productionUsage: 'Cancel stale network requests with onWatcherCleanup or the cleanup callback.',
    commonMistake:
      'Using a deep watcher as a default, or using watch to derive state that should be computed.',
    code: `watch(search, async (query, _old, onCleanup) => {\n  const controller = new AbortController()\n  onCleanup(() => controller.abort())\n  await searchUsers(query, controller.signal)\n}, { immediate: true })`,
    challenge: 'Debounce a search input and cancel obsolete requests.',
  }),
  makeLesson({
    number: 5,
    slug: 'components',
    title: 'Components',
    phase: 1,
    summary: 'Compose typed SFCs into stable parent/child boundaries.',
    reactEquivalent:
      'Vue components serve the same architectural role as React function components, with templates as the default view syntax.',
    concepts: ['local imports', 'component composition', 'parent/child ownership', 'public APIs'],
    why: 'Good component boundaries localize change, state, accessibility, and tests.',
    when: 'Extract a component when it has a meaningful responsibility or reusable interface.',
    productionUsage:
      'Keep business components feature-oriented and primitives generic; avoid one component per DOM element.',
    commonMistake: 'Splitting too early or letting a child mutate state owned by its parent.',
    code: `<script setup lang="ts">\nimport UserCard from './UserCard.vue'\nconst user = { id: 1, name: 'Maya' }\n</script>\n<template><UserCard :user="user" /></template>`,
    challenge: 'Compose a ProductCard from a reusable BaseButton and PriceTag.',
  }),
  makeLesson({
    number: 6,
    slug: 'props',
    title: 'Props',
    phase: 1,
    summary: 'Define required, optional, defaulted, validated, and complex typed props.',
    reactEquivalent:
      'Props are read-only inputs just like React props; Vue additionally offers runtime declarations and template kebab-case mapping.',
    concepts: [
      'defineProps',
      'withDefaults',
      'typed props',
      'runtime validation',
      'one-way data flow',
    ],
    why: 'A precise prop contract makes a component predictable and type-safe.',
    when: 'Pass data down when a parent owns it and a child only renders or acts on it.',
    productionUsage:
      'Use type-based declarations and withDefaults; validate domain rules outside presentation components.',
    commonMistake:
      'Mutating a prop or destructuring it in a way that loses reactivity on older Vue patterns.',
    code: `interface User { id: number; name: string }\nconst props = withDefaults(defineProps<{ user: User; compact?: boolean }>(), { compact: false })`,
    challenge: 'Create a typed UserCard with an optional compact mode and sensible default.',
  }),
  makeLesson({
    number: 7,
    slug: 'emits',
    title: 'Emits',
    phase: 1,
    summary: 'Send typed semantic events from child components to their owners.',
    reactEquivalent:
      'Emits replace many callback props: the child emits save and the parent listens with @save.',
    concepts: ['defineEmits', 'typed tuples', 'event payloads', 'semantic events'],
    why: 'Events keep ownership explicit and prevent children from reaching into parent state.',
    when: 'Emit a domain event when a child interaction should ask its parent to change something.',
    productionUsage: 'Name events by intent—save, select, dismiss—not by internal handler names.',
    commonMistake: 'Emitting a DOM event shape when the parent only needs a domain value.',
    code: `const emit = defineEmits<{ save: [user: User]; cancel: [] }>()\nemit('save', editedUser)`,
    challenge: 'Build an editor that emits typed save and cancel events.',
  }),
  makeLesson({
    number: 8,
    slug: 'slots',
    title: 'Slots',
    phase: 1,
    summary: 'Build flexible layout components with default, named, scoped, and fallback slots.',
    reactEquivalent: 'Default slots map to children; scoped slots map closely to render props.',
    concepts: ['<slot>', 'named slots', 'scoped slots', 'slot props', 'fallback content'],
    why: 'Slots let parents own content while a child owns layout and behavior.',
    when: 'Use slots for flexible composition; use props for data with a stable semantic meaning.',
    productionUsage:
      'Use named slots sparingly for clear layout regions such as header, default, and actions.',
    commonMistake:
      'Turning every string prop into a slot, or hiding too much state in scoped slot contracts.',
    code: `<BaseCard>\n  <template #header>Employee</template>\n  <template #default="{ selected }">{{ selected.name }}</template>\n</BaseCard>`,
    challenge: 'Create a BaseModal with title, default, and actions slots plus fallback content.',
  }),
  makeLesson({
    number: 9,
    slug: 'template-syntax',
    title: 'Template Syntax',
    phase: 1,
    summary: 'Become fluent with conditional, list, model, HTML, dynamic, and modifier directives.',
    reactEquivalent:
      'Directives replace common JSX patterns: v-if for conditionals, v-for for map, and :class for className expressions.',
    concepts: ['v-if', 'v-show', 'v-for', 'v-bind', 'v-on', 'v-model', 'v-html', 'modifiers'],
    why: 'Directives communicate UI intent to the compiler and keep rendering logic readable.',
    when: 'Use v-if for conditional creation, v-show for frequent visibility toggles, and stable keys for lists.',
    productionUsage:
      'Never render untrusted HTML with v-html; derive filtered arrays before v-for.',
    commonMistake:
      'Combining v-if and v-for on the same element or using an array index as a mutable list key.',
    code: `<li v-for="user in activeUsers" :key="user.id">\n  <button @click.stop="select(user)">{{ user.name }}</button>\n</li>`,
    challenge: 'Render a filterable list with an empty state and stable keys.',
  }),
  makeLesson({
    number: 10,
    slug: 'forms',
    title: 'Forms',
    phase: 1,
    summary:
      'Build controlled, validated forms with every common input type and v-model modifiers.',
    reactEquivalent:
      'v-model bundles value binding and change handling, similar to a controlled React input with less plumbing.',
    concepts: [
      'v-model',
      'checkbox groups',
      'radio',
      'select',
      '.trim',
      '.number',
      '.lazy',
      'validation',
    ],
    why: 'Two-way binding makes form state concise while explicit submit logic retains domain control.',
    when: 'Use v-model for form fields and custom input contracts; validate at submit and on useful interaction points.',
    productionUsage:
      'Keep server errors separate from client validation and preserve accessible labels and descriptions.',
    commonMistake: 'Assuming HTML number inputs produce numbers without the .number modifier.',
    code: `<input v-model.trim="form.name" />\n<input v-model.number="form.age" type="number" />\n<form @submit.prevent="submit">...</form>`,
    challenge:
      'Complete the registration form and disable submit until its required fields are valid.',
  }),
  makeLesson({
    number: 11,
    slug: 'lifecycle',
    title: 'Lifecycle',
    phase: 2,
    summary: 'Coordinate mount, update, unmount, activation, and deactivation work.',
    reactEquivalent:
      'onMounted plus onUnmounted maps to a mount-only useEffect and its cleanup, but Vue names lifecycle moments explicitly.',
    concepts: [
      'onBeforeMount',
      'onMounted',
      'onBeforeUpdate',
      'onUpdated',
      'onBeforeUnmount',
      'onUnmounted',
      'onActivated',
    ],
    why: 'Lifecycle hooks are escape hatches for work tied to component existence or DOM timing.',
    when: 'Use them for imperative libraries, browser listeners, measurement, and initial orchestration.',
    productionUsage:
      'Register and remove external listeners in paired hooks; keep data fetching in a service or composable.',
    commonMistake: 'Putting derived state into onUpdated, causing feedback loops.',
    code: `onMounted(() => window.addEventListener('resize', update))\nonUnmounted(() => window.removeEventListener('resize', update))`,
    challenge: 'Track viewport width and prove the event listener is cleaned up on unmount.',
  }),
  makeLesson({
    number: 12,
    slug: 'template-refs',
    title: 'Template Refs',
    phase: 2,
    summary: 'Access DOM nodes and deliberately exposed child APIs with typed template refs.',
    reactEquivalent:
      'Template refs serve the imperative role of React useRef and forwardRef/useImperativeHandle.',
    concepts: ['useTemplateRef', 'DOM refs', 'component refs', 'defineExpose'],
    why: 'Some browser and third-party APIs require imperative access that templates cannot express.',
    when: 'Use refs for focus, measurement, media, canvas, and narrow child methods—not routine data flow.',
    productionUsage:
      'Vue 3.5 useTemplateRef infers common element types; expose the smallest possible child API.',
    commonMistake:
      'Reading a ref before mount or using component refs as a backdoor around props and emits.',
    code: `const input = useTemplateRef<HTMLInputElement>('search')\nonMounted(() => input.value?.focus())\n// template: <input ref="search" />`,
    challenge: 'Focus an input and expose a reset method from a child form.',
  }),
  makeLesson({
    number: 13,
    slug: 'composables',
    title: 'Composables',
    phase: 2,
    duration: '40–50 min',
    summary:
      'Extract reusable stateful logic with clear reactive inputs, cleanup, and return contracts.',
    reactEquivalent:
      'Composables resemble custom hooks, but they are ordinary functions without call-order restrictions.',
    concepts: ['useCounter', 'useFetch', 'useDebounce', 'useLocalStorage', 'useMouse'],
    why: 'Composables reuse behavior without coupling it to a component hierarchy.',
    when: 'Extract a composable when multiple components share reactive orchestration or one component has a coherent logic unit.',
    productionUsage:
      'Accept MaybeRefOrGetter when useful, clean up effects, and return refs rather than a reactive wrapper.',
    commonMistake:
      'Creating hidden global singleton state by declaring mutable refs outside the composable accidentally.',
    code: `export function useCounter(initial = 0) {\n  const count = ref(initial)\n  const increment = () => count.value++\n  return { count: readonly(count), increment }\n}`,
    challenge: 'Implement useDebounce with cleanup and a configurable delay.',
  }),
  makeLesson({
    number: 14,
    slug: 'vue-router',
    title: 'Vue Router',
    phase: 2,
    summary:
      'Use nested and lazy routes, params, query strings, metadata, guards, and 404 handling.',
    reactEquivalent:
      'router-view is an Outlet, RouterLink is Link, and route records replace JSX route elements.',
    concepts: [
      'createRouter',
      'RouterView',
      'RouterLink',
      'useRoute',
      'useRouter',
      'guards',
      'route meta',
    ],
    why: 'The router maps URL state to component trees and navigation policy.',
    when: 'Use a route for shareable, refresh-safe application state that deserves a URL.',
    productionUsage:
      'Lazy-load page components, type route assumptions, and keep authorization checks centralized.',
    commonMistake:
      'Copying route params into stale local state instead of watching the route or using props.',
    code: `const routes = [{\n  path: '/users/:id',\n  component: () => import('@/pages/UserDetailsPage.vue'),\n  meta: { requiresAuth: true },\n}]`,
    challenge: 'Add a lazy settings child route and preserve a tab in the query string.',
  }),
  makeLesson({
    number: 15,
    slug: 'pinia',
    title: 'Pinia',
    phase: 2,
    summary: 'Model shared client state with typed state, getters, actions, and store composition.',
    reactEquivalent:
      'Pinia feels like Redux Toolkit or Zustand with Vue-native refs and computed getters.',
    concepts: ['defineStore', 'state', 'getters', 'actions', 'storeToRefs', 'async actions'],
    why: 'A store gives cross-feature client state a named owner, devtools support, and testable actions.',
    when: 'Use Pinia for shared client state; keep local UI local and remote data in an API/cache layer.',
    productionUsage:
      'Call storeToRefs when destructuring reactive state; call actions directly from the store.',
    commonMistake: 'Putting every API response and modal flag into one global store.',
    code: `export const useCartStore = defineStore('cart', {\n  state: () => ({ items: [] as CartItem[] }),\n  getters: { total: state => state.items.reduce((sum, item) => sum + item.price, 0) },\n})`,
    challenge:
      'Create a typed cart store with add, remove, total, and an asynchronous checkout action.',
  }),
  makeLesson({
    number: 16,
    slug: 'api-integration',
    title: 'API Integration',
    phase: 2,
    summary:
      'Build a typed service layer with CRUD, pagination, loading, errors, retry, and cancellation.',
    reactEquivalent:
      'The service/composable split maps to a typed fetch client plus a custom data hook.',
    concepts: [
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'AbortController',
      'loading/error/empty states',
      'pagination',
    ],
    why: 'A service boundary separates transport details from UI state and makes failure behavior consistent.',
    when: 'Use services for transport; composables/stores for orchestration; components for rendering states.',
    productionUsage:
      'Normalize errors, cancel stale queries, encode query params, and avoid leaking raw responses into components.',
    commonMistake:
      'Fetching directly in many components with no cancellation or stale-response protection.',
    code: `const controller = new AbortController()\nconst response = await fetch('/api/users', { signal: controller.signal })\nif (!response.ok) throw new Error('Could not load users')`,
    challenge: 'Add optimistic deletion with rollback to the employee service.',
  }),
  makeLesson({
    number: 17,
    slug: 'typescript-with-vue',
    title: 'TypeScript with Vue',
    phase: 2,
    summary:
      'Type component contracts, refs, events, templates, APIs, stores, and generic utilities.',
    reactEquivalent:
      'The type goals are the same as TSX; macros supply compile-time component contracts to Vue SFCs.',
    concepts: [
      'typed refs',
      'props',
      'emits',
      'events',
      'component instances',
      'generic components',
    ],
    why: 'Strict types move template and integration errors into the editor and document component APIs.',
    when: 'Type domain boundaries explicitly and let TypeScript infer local implementation details.',
    productionUsage:
      'Use unknown at unsafe boundaries, discriminated unions for states, and no any.',
    commonMistake:
      'Using Ref without its generic when initializing with null, producing an unusably narrow type.',
    code: `const user = ref<User | null>(null)\nconst onInput = (event: Event) => {\n  const value = (event.target as HTMLInputElement).value\n}`,
    challenge: 'Model loading, success, empty, and failure as a discriminated union.',
  }),
  makeLesson({
    number: 18,
    slug: 'directives',
    title: 'Directives',
    phase: 2,
    summary:
      'Use built-in directives and create focused v-focus, v-permission, and v-tooltip directives.',
    reactEquivalent:
      'Custom directives are closer to reusable DOM behaviors than React components or hooks.',
    concepts: ['directive hooks', 'v-focus', 'v-permission', 'v-tooltip', 'built-in directives'],
    why: 'A directive packages low-level behavior attached to an element.',
    when: 'Use one for reusable DOM manipulation; use a component for UI and a composable for stateful logic.',
    productionUsage:
      'Keep directives small, clean up listeners, and prefer accessible native semantics.',
    commonMistake:
      'Using directives as a mini component system or relying on them for business authorization.',
    code: `const vFocus = {\n  mounted(element: HTMLInputElement) { element.focus() },\n}`,
    challenge: 'Create an accessible tooltip directive that cleans up its generated element.',
  }),
  makeLesson({
    number: 19,
    slug: 'async-components-suspense',
    title: 'Async Components & Suspense',
    phase: 3,
    summary:
      'Split heavyweight UI and coordinate asynchronous setup with loading and error states.',
    reactEquivalent:
      'defineAsyncComponent plus Suspense is analogous to React.lazy plus Suspense, with Vue-specific async setup support.',
    concepts: ['defineAsyncComponent', 'Suspense', 'loadingComponent', 'errorComponent', 'timeout'],
    why: 'Async boundaries reduce initial bundle cost and make delayed dependencies explicit.',
    when: 'Lazy-load routes, editors, charts, and rarely opened workflows.',
    productionUsage:
      'Prefer route-level splitting first; always design loading and retry behavior.',
    commonMistake:
      'Making tiny above-the-fold components async, which adds latency without useful savings.',
    code: `const Report = defineAsyncComponent({\n  loader: () => import('./Report.vue'),\n  delay: 150, timeout: 10_000,\n})`,
    challenge: 'Lazy-load a report panel and supply deliberate loading and error UI.',
  }),
  makeLesson({
    number: 20,
    slug: 'dynamic-components',
    title: 'Dynamic Components',
    phase: 3,
    summary: 'Switch component types at runtime with a typed tabbed interface.',
    reactEquivalent:
      'This is selecting a component variable in JSX, but Vue renders it through <component :is>.',
    concepts: ['<component>', ':is', 'component maps', 'tabs'],
    why: 'Dynamic components keep runtime view selection declarative.',
    when: 'Use them for tabs, configurable dashboards, step renderers, or pluggable panels.',
    productionUsage:
      'Use an explicit component map rather than resolving arbitrary external strings.',
    commonMistake: 'Using v-html or large v-if chains when the varying unit is a component type.',
    code: `<component :is="tabs[currentTab].component" />`,
    challenge: 'Add a third tab and preserve each tab state with KeepAlive.',
  }),
  makeLesson({
    number: 21,
    slug: 'keepalive',
    title: 'KeepAlive',
    phase: 3,
    summary: 'Cache component instances and respond to activation and deactivation.',
    reactEquivalent:
      'React has no direct built-in equivalent; it is closer to retaining an offscreen component instance.',
    concepts: ['KeepAlive', 'include/exclude', 'max', 'onActivated', 'onDeactivated'],
    why: 'Caching preserves expensive state and DOM between dynamic component switches.',
    when: 'Use it for tabs or routes where restoration is valuable and memory cost is bounded.',
    productionUsage: 'Set a max or include list and pause external work while deactivated.',
    commonMistake: 'Caching everything, assuming deactivation is the same as unmounting.',
    code: `<KeepAlive :max="3">\n  <component :is="currentView" />\n</KeepAlive>`,
    challenge: 'Cache two form tabs and show activation/deactivation counts.',
  }),
  makeLesson({
    number: 22,
    slug: 'provide-inject',
    title: 'Provide / Inject',
    phase: 2,
    summary: 'Share typed, reactive dependencies through a subtree with injection keys.',
    reactEquivalent:
      'provide/inject is Vue Context: a provider owns a value and descendants consume it without prop drilling.',
    concepts: ['provide', 'inject', 'InjectionKey', 'readonly state', 'provider actions'],
    why: 'It connects a subtree to a dependency without threading props through intermediates.',
    when: 'Use it for component families, theme, forms, and library-level dependencies; use Pinia for broad app state.',
    productionUsage:
      'Provide readonly state plus explicit mutation functions and fail loudly when a required injection is missing.',
    commonMistake:
      'Using string keys at scale or letting consumers mutate provided state directly.',
    code: `const ThemeKey: InjectionKey<ThemeContext> = Symbol('theme')\nprovide(ThemeKey, { theme: readonly(theme), toggle })`,
    challenge: 'Build a typed theme provider with readonly state and a toggle action.',
  }),
  makeLesson({
    number: 23,
    slug: 'event-handling',
    title: 'Event Handling',
    phase: 1,
    summary: 'Handle DOM and keyboard events with typed handlers and expressive modifiers.',
    reactEquivalent:
      '@click maps to onClick; modifiers replace common preventDefault and stopPropagation boilerplate.',
    concepts: [
      '@click',
      '@input',
      '@change',
      '@submit',
      '.prevent',
      '.stop',
      '.once',
      '.capture',
      '.self',
    ],
    why: 'Template event syntax separates DOM policy from domain handlers.',
    when: 'Use modifiers for DOM behavior and pass meaningful values to typed methods.',
    productionUsage:
      'Keep keyboard interactions accessible and avoid relying on mouse-only events.',
    commonMistake:
      'Using .prevent on passive scroll events or forgetting button type inside a form.',
    code: `<form @submit.prevent="save">\n  <input @keyup.enter="save" />\n  <button type="submit">Save</button>\n</form>`,
    challenge: 'Create a click-outside style panel using .self and an Escape key handler.',
  }),
  makeLesson({
    number: 24,
    slug: 'css-styling',
    title: 'CSS & Styling',
    phase: 1,
    summary: 'Apply scoped, global, module, class, and style binding patterns.',
    reactEquivalent:
      ':class is className expression handling; scoped styles offer compiler-supported local selectors without CSS-in-JS.',
    concepts: ['scoped styles', 'CSS modules', ':class', ':style', ':deep()', 'CSS variables'],
    why: 'Vue supports locally scoped styling while preserving the platform and cascade.',
    when: 'Use global styles for tokens/reset, scoped styles for components, and CSS modules when class names must be imported.',
    productionUsage:
      'Prefer semantic state classes and CSS custom properties over large inline style objects.',
    commonMistake:
      'Assuming scoped styles cannot reach child roots or using deep selectors as a default.',
    code: `<button :class="{ active: isActive, danger: tone === 'danger' }">Toggle</button>`,
    challenge: 'Build a status badge with object class binding and a CSS custom property.',
  }),
  makeLesson({
    number: 25,
    slug: 'state-management-architecture',
    title: 'State Management Architecture',
    phase: 2,
    summary:
      'Choose deliberately among local state, composables, Pinia, URL state, and server state.',
    reactEquivalent:
      'The decision mirrors React local state → custom hooks → context/store → query cache.',
    concepts: [
      'state ownership',
      'local state',
      'composable state',
      'Pinia',
      'URL state',
      'server state',
    ],
    why: 'The smallest correct owner reduces coupling, stale copies, and global complexity.',
    when: 'Promote state only when another consumer or lifecycle genuinely requires it.',
    productionUsage:
      'Treat server data as remote state; do not duplicate it across component and store layers.',
    commonMistake:
      'Starting with a global store instead of identifying ownership and persistence needs.',
    code: `// Local: open panel\nconst isOpen = ref(false)\n// URL: shareable filter\nrouter.replace({ query: { team } })\n// Pinia: authenticated user`,
    challenge: 'Classify ten sample values by the narrowest appropriate state owner.',
  }),
  makeLesson({
    number: 26,
    slug: 'testing',
    title: 'Testing',
    phase: 3,
    summary: 'Test rendering, props, emits, interaction, async behavior, composables, and Pinia.',
    reactEquivalent:
      'Vue Test Utils wrapper APIs serve the role of React Testing Library utilities, while Vitest mirrors Jest.',
    concepts: ['mount', 'find', 'trigger', 'emitted', 'flushPromises', 'setActivePinia'],
    why: 'Tests protect component contracts and user-visible behavior during refactoring.',
    when: 'Test important logic, boundaries, and interactions—not framework implementation details.',
    productionUsage:
      'Prefer accessible selectors and deterministic service fakes; use real Pinia for store unit tests.',
    commonMistake:
      'Asserting private component state or taking broad snapshots with little intent.',
    code: `const wrapper = mount(Counter)\nawait wrapper.get('button').trigger('click')\nexpect(wrapper.get('[data-test=count]').text()).toBe('1')`,
    challenge: 'Test validation, submission, and emitted payloads in UserForm.',
  }),
  makeLesson({
    number: 27,
    slug: 'performance',
    title: 'Performance',
    phase: 3,
    summary:
      'Measure and improve rendering, reactivity, lists, and delivery without premature optimization.',
    reactEquivalent:
      'Vue compiler optimizations reduce manual memo work; component boundaries and stable identity still matter.',
    concepts: [
      'computed caching',
      'v-once',
      'v-memo',
      'stable keys',
      'shallowRef',
      'lazy routes',
      'bundle splitting',
    ],
    why: 'Performance work should reduce a measured user-visible bottleneck.',
    when: 'Profile first, then target expensive renders, large reactive graphs, long lists, or oversized chunks.',
    productionUsage:
      'Keep props stable, virtualize very large lists, and inspect bundle and Vue DevTools timelines.',
    commonMistake:
      'Adding watchers, memo directives, or shallow APIs everywhere before establishing a bottleneck.',
    code: `<article v-for="item in items" :key="item.id" v-memo="[item.updatedAt]">...</article>`,
    challenge:
      'Profile a large list, stabilize its keys, and explain whether v-memo materially helps.',
  }),
  makeLesson({
    number: 28,
    slug: 'vue-devtools',
    title: 'Vue DevTools',
    phase: 3,
    summary: 'Inspect component trees, props, events, reactivity, Pinia, routes, and performance.',
    reactEquivalent:
      'Vue DevTools combines the component inspection of React DevTools with first-party Pinia and Router panels.',
    concepts: [
      'component inspector',
      'timeline',
      'Pinia panel',
      'Router panel',
      'performance tracing',
    ],
    why: 'Runtime inspection shortens the loop between an observed bug and its reactive owner.',
    when: 'Use it when data flow, event order, navigation, or unexpected rerenders are unclear.',
    productionUsage:
      'Inspect ownership before editing code; verify emitted events and store mutations in the timeline.',
    commonMistake:
      'Reading a displayed ref object as the raw application value or debugging only with console logs.',
    code: `// Install Vue.js devtools in the browser.\n// Select a component, edit a prop/state value, then inspect Pinia and Routes.`,
    challenge:
      'Use DevTools to find which component owns the progress percentage and change it temporarily.',
  }),
  makeLesson({
    number: 29,
    slug: 'production-architecture',
    title: 'Production Architecture',
    phase: 3,
    summary: 'Organize by responsibility and feature without turning folders into ceremony.',
    reactEquivalent:
      'The architectural forces match React: stable boundaries matter more than framework-specific folder names.',
    concepts: [
      'components',
      'features',
      'pages',
      'composables',
      'stores',
      'services',
      'types',
      'utils',
    ],
    why: 'A navigable structure makes ownership, dependencies, and change impact obvious.',
    when: 'Add a layer when the codebase has enough complexity to benefit from that boundary.',
    productionUsage:
      'Prefer feature cohesion; keep truly reusable primitives in common and transport logic in services.',
    commonMistake:
      'Creating every folder on day one or a global utils directory full of unrelated business logic.',
    code: `src/\n├── components/{common,features}\n├── composables\n├── pages\n├── router\n├── services\n├── stores\n└── types`,
    challenge:
      'Place twelve example files into the structure and justify two feature-local exceptions.',
  }),
  makeLesson({
    number: 30,
    slug: 'employee-dashboard',
    title: 'Employee Management Dashboard',
    phase: 4,
    duration: '90–120 min',
    summary: 'Apply the full stack in a responsive CRUD mini-application with realistic UI states.',
    reactEquivalent:
      'This is the capstone: router, store, typed service, reusable components, forms, and tests working as one system.',
    concepts: [
      'CRUD',
      'search',
      'filter',
      'sorting',
      'pagination',
      'modal',
      'toast',
      'routing',
      'tests',
    ],
    why: 'Integrated practice exposes the seams between component state, shared state, URL state, and services.',
    when: 'Complete this after Phase 1–3, then extend it as your Vue sandbox.',
    productionUsage:
      'Use the same boundaries in a real app, replacing the in-memory service with an HTTP adapter.',
    commonMistake:
      'Letting the page own transport details, form internals, global notifications, and all rendering.',
    code: `const store = useEmployeeStore()\nawait store.load()\nawait store.create(draft)\nrouter.push({ name: 'employee-details', params: { id } })`,
    challenge: 'Add a department summary chart and synchronize its active filter with the URL.',
  }),
]

export const lessonBySlug = (slug: string) => lessons.find((lesson) => lesson.slug === slug)
