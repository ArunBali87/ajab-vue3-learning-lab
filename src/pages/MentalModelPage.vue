<script setup lang="ts">
import CodeBlock from '@/components/common/CodeBlock.vue'

const mappings = [
  ['useState', 'ref / reactive', 'Tracked mutable containers; .value in script for refs.'],
  ['useMemo', 'computed', 'Dependencies are collected automatically and results are cached.'],
  ['useEffect', 'watch / lifecycle', 'Choose an explicit source or a lifecycle moment.'],
  ['Custom Hook', 'Composable', 'Reusable stateful functions without hook call-order rules.'],
  ['Callback prop', 'defineEmits', 'Child emits intent; parent remains the state owner.'],
  ['children / render prop', 'slots / scoped slots', 'Parent supplies content; child owns layout.'],
  ['React Context', 'provide / inject', 'Subtree dependencies, ideally with typed Symbol keys.'],
  ['Redux / Zustand', 'Pinia', 'Vue-native stores with refs, computed getters, and actions.'],
  ['React Router', 'Vue Router', 'Route records, RouterView, RouterLink, and composables.'],
  ['useRef', 'template ref', 'Imperative DOM or component access after mount.'],
]
const examples = [
  {
    title: 'State',
    react: `const [count, setCount] = useState(0)\nsetCount(value => value + 1)`,
    vue: `const count = ref(0)\ncount.value++\n// template: {{ count }}`,
  },
  {
    title: 'Derived state',
    react: `const total = useMemo(\n  () => price * quantity,\n  [price, quantity]\n)`,
    vue: `const total = computed(\n  () => price.value * quantity.value\n)`,
  },
  {
    title: 'Child → parent',
    react: `<Editor onSave={saveUser} />`,
    vue: `<Editor @save="saveUser" />\n\nconst emit = defineEmits<{\n  save: [user: User]\n}>()`,
  },
  {
    title: 'Content composition',
    react: `<Card>{user.name}</Card>`,
    vue: `<BaseCard>\n  {{ user.name }}\n  <template #actions>...</template>\n</BaseCard>`,
  },
]
</script>

<template>
  <div class="reference-page">
    <header class="reference-hero">
      <p class="eyebrow">Translate, don’t restart</p>
      <h1>React → Vue 3 Mental Model</h1>
      <p>
        The architecture is familiar. Vue changes how dependencies are tracked, how view syntax is
        expressed, and how component contracts are declared.
      </p>
    </header>
    <section class="mapping-table-wrap">
      <table class="mapping-table">
        <thead>
          <tr>
            <th>React</th>
            <th>Vue 3</th>
            <th>The useful difference</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in mappings" :key="row[0]">
            <td>
              <code>{{ row[0] }}</code>
            </td>
            <td>
              <code>{{ row[1] }}</code>
            </td>
            <td>{{ row[2] }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="content-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Side by side</p>
          <h2>The comparisons that matter</h2>
        </div>
      </div>
      <article v-for="example in examples" :key="example.title" class="compare-example">
        <h3>{{ example.title }}</h3>
        <div class="code-compare">
          <div>
            <span class="framework-label react-label">React</span
            ><CodeBlock :code="example.react" language="tsx" />
          </div>
          <div>
            <span class="framework-label vue-label">Vue</span><CodeBlock :code="example.vue" />
          </div>
        </div>
      </article>
    </section>
    <aside class="callout">
      <strong>The key shift</strong>
      <p>
        React typically reruns a component function and reconciles JSX. Vue tracks which reactive
        values a render or computed value reads, then schedules targeted updates. That is why
        dependency arrays largely disappear.
      </p>
    </aside>
  </div>
</template>
