<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const open = ref<number[]>([])
const exercises = [
  {
    title: 'State → ref',
    level: 'Warm-up',
    react: `const [count, setCount] = useState(0)`,
    solution: `const count = ref(0)\ncount.value++`,
  },
  {
    title: 'Mount effect → lifecycle',
    level: 'Warm-up',
    react: `useEffect(() => {\n  fetchUsers()\n}, [])`,
    solution: `onMounted(() => {\n  void fetchUsers()\n})`,
  },
  {
    title: 'Memo → computed',
    level: 'Core',
    react: `const filtered = useMemo(\n  () => users.filter(user => user.active),\n  [users]\n)`,
    solution: `const filtered = computed(() =>\n  users.value.filter(user => user.active)\n)`,
  },
  {
    title: 'Context → provide/inject',
    level: 'Core',
    react: `const ThemeContext = createContext(null)\n<ThemeContext.Provider value={theme}>`,
    solution: `const ThemeKey: InjectionKey<Theme> = Symbol()\nprovide(ThemeKey, readonly(theme))\n// child: inject(ThemeKey)`,
  },
  {
    title: 'Custom hook → composable',
    level: 'Core',
    react: `function useOnline() {\n  const [online, setOnline] = useState(true)\n  // subscribe...\n  return online\n}`,
    solution: `function useOnline() {\n  const online = ref(navigator.onLine)\n  // onMounted subscribe; onUnmounted clean up\n  return readonly(online)\n}`,
  },
  {
    title: 'Redux slice → Pinia',
    level: 'Advanced',
    react: `createSlice({ name: 'cart', initialState, reducers: { add } })`,
    solution: `export const useCartStore = defineStore('cart', () => {\n  const items = ref<CartItem[]>([])\n  const add = (item: CartItem) => items.value.push(item)\n  return { items, add }\n})`,
  },
  {
    title: 'React Router → Vue Router',
    level: 'Advanced',
    react: `<Route path="users/:id" element={<User />} />`,
    solution: `{ path: '/users/:id', name: 'user',\n  component: () => import('./UserPage.vue') }`,
  },
  {
    title: 'Render prop → scoped slot',
    level: 'Advanced',
    react: `<DataTable renderRow={row => <User row={row} />} />`,
    solution: `<DataTable :rows="users">\n  <template #row="{ row }"><User :user="row" /></template>\n</DataTable>`,
  },
]
const toggle = (index: number) => {
  open.value = open.value.includes(index)
    ? open.value.filter((entry) => entry !== index)
    : [...open.value, index]
}
</script>

<template>
  <div class="reference-page">
    <header class="reference-hero">
      <p class="eyebrow">Deliberate practice</p>
      <h1>React Developer Practice</h1>
      <p>
        Translate the intent, not just the syntax. Write your answer in a new SFC before revealing
        the solution.
      </p>
    </header>
    <div class="practice-list">
      <article v-for="(exercise, index) in exercises" :key="exercise.title" class="practice-card">
        <div class="practice-title">
          <span>{{ exercise.level }}</span>
          <h2>{{ index + 1 }}. {{ exercise.title }}</h2>
        </div>
        <CodeBlock :code="exercise.react" language="tsx" /><button
          class="button secondary"
          @click="toggle(index)"
        >
          {{ open.includes(index) ? 'Hide Vue answer' : 'Reveal Vue answer' }}</button
        ><CodeBlock v-if="open.includes(index)" :code="exercise.solution" />
      </article>
    </div>
  </div>
</template>
