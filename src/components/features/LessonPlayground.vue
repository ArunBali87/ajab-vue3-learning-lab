<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  h,
  inject,
  provide,
  reactive,
  readonly,
  ref,
  useTemplateRef,
  watch,
  type Directive,
  type InjectionKey,
  type Ref,
} from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import CounterDemo from './CounterDemo.vue'
import UserCard from './UserCard.vue'
import UserForm, { type Registration } from './UserForm.vue'
import { useCounter } from '@/composables/useCounter'
import { useMouse } from '@/composables/useMouse'
import { useCartStore } from '@/stores/cart'
import { employeeService } from '@/services/employeeService'
import type { User } from '@/types'

const props = defineProps<{ slug: string }>()
const router = useRouter()
const message = ref('Hello Vue 3')
const elementId = ref('bound-button')
const active = ref(false)
const profile = reactive({ name: 'Arun', skills: ['React', 'TypeScript'] })
const firstName = ref('Arun')
const lastName = ref('Bali')
const fullName = computed({
  get: () => `${firstName.value} ${lastName.value}`.trim(),
  set: (value: string) => {
    const [first = '', ...rest] = value.split(' ')
    firstName.value = first
    lastName.value = rest.join(' ')
  },
})
const search = ref('')
const watchLog = ref<string[]>([])
watch(search, (value, oldValue) => watchLog.value.unshift(`“${oldValue}” → “${value}”`))

const sampleUser = reactive<User>({
  id: 1,
  name: 'Maya Chen',
  email: 'maya@lab.dev',
  role: 'Engineer',
  active: true,
})
const selectedUser = ref('Nobody selected yet')
const registrationMessage = ref('')
const onRegistration = (registration: Registration) => {
  registrationMessage.value = `Welcome ${registration.name} — ${registration.skills.length} skills selected.`
}

const input = useTemplateRef<HTMLInputElement>('focusInput')
const focusInput = () => input.value?.focus()
const { count, increment, decrement, reset } = useCounter(3, 0)
const { x, y } = useMouse()
const cart = useCartStore()
const apiState = reactive({ loading: false, result: '', error: '' })
const loadEmployees = async () => {
  apiState.loading = true
  apiState.error = ''
  try {
    const result = await employeeService.list({ page: 1, pageSize: 3, sort: 'name' })
    apiState.result = `Loaded ${result.items.length} of ${result.total}: ${result.items.map((employee) => employee.name).join(', ')}`
  } catch (error: unknown) {
    apiState.error = error instanceof Error ? error.message : 'Request failed'
  } finally {
    apiState.loading = false
  }
}

const vFocus: Directive<HTMLInputElement> = { mounted: (element) => element.focus() }
const vTooltip: Directive<HTMLElement, string> = {
  mounted: (element, binding) => element.setAttribute('title', binding.value),
  updated: (element, binding) => element.setAttribute('title', binding.value),
}

const currentTab = ref<'Preview' | 'Notes'>('Preview')
const PreviewTab = defineComponent({
  name: 'PreviewTab',
  setup: () => () => h('div', { class: 'tab-panel' }, 'Preview state is preserved while cached.'),
})
const NotesTab = defineComponent({
  name: 'NotesTab',
  setup() {
    const notes = ref('Type here, switch tabs, and come back.')
    return () =>
      h('textarea', {
        value: notes.value,
        onInput: (event: Event) => (notes.value = (event.target as HTMLTextAreaElement).value),
        'aria-label': 'Cached notes',
      })
  },
})
const currentTabComponent = computed(() => (currentTab.value === 'Preview' ? PreviewTab : NotesTab))
const AsyncPanel = defineAsyncComponent(() =>
  Promise.resolve(
    defineComponent({
      setup: () => () =>
        h('p', { class: 'success-note' }, 'Async component resolved successfully.'),
    }),
  ),
)

interface ThemeContext {
  theme: Readonly<Ref<'light' | 'dark'>>
  toggle: () => void
}
const ThemeKey: InjectionKey<ThemeContext> = Symbol('lesson-theme')
const theme = ref<'light' | 'dark'>('light')
provide(ThemeKey, {
  theme: readonly(theme),
  toggle: () => (theme.value = theme.value === 'light' ? 'dark' : 'light'),
})
const ThemeConsumer = defineComponent({
  name: 'ThemeConsumer',
  setup() {
    const context = inject(ThemeKey)
    if (!context) throw new Error('Theme provider missing')
    return () =>
      h(
        'button',
        {
          class: ['theme-consumer', `theme-consumer--${context.theme.value}`],
          onClick: context.toggle,
        },
        `Injected theme: ${context.theme.value}`,
      )
  },
})

const eventCount = ref(0)
const orderedItems = ref([
  { id: 1, label: 'Stable key' },
  { id: 2, label: 'Computed input' },
  { id: 3, label: 'Small reactive graph' },
])
const reverseItems = () => orderedItems.value.reverse()

const group = computed(() => {
  if (['vue-fundamentals', 'event-handling', 'css-styling'].includes(props.slug)) return 'basics'
  if (props.slug === 'reactivity') return 'reactivity'
  if (['computed-properties', 'watchers'].includes(props.slug)) return 'derived'
  if (['components', 'props', 'emits', 'slots'].includes(props.slug)) return 'components'
  if (['template-syntax', 'forms'].includes(props.slug)) return 'forms'
  if (['lifecycle', 'template-refs'].includes(props.slug)) return 'refs'
  if (props.slug === 'composables') return 'composables'
  if (props.slug === 'vue-router') return 'router'
  if (['pinia', 'state-management-architecture'].includes(props.slug)) return 'store'
  if (props.slug === 'api-integration') return 'api'
  if (props.slug === 'typescript-with-vue') return 'typescript'
  if (props.slug === 'directives') return 'directives'
  if (['async-components-suspense', 'dynamic-components', 'keepalive'].includes(props.slug))
    return 'dynamic'
  if (props.slug === 'provide-inject') return 'provide'
  if (['testing', 'performance', 'vue-devtools', 'production-architecture'].includes(props.slug))
    return 'quality'
  return 'employee'
})
</script>

<template>
  <section class="playground">
    <div class="playground-head">
      <div>
        <p class="eyebrow">Live sandbox</p>
        <h2>Change it. Break it. Inspect it.</h2>
      </div>
      <span class="live-pill"><i /> Reactive</span>
    </div>

    <div v-if="group === 'basics'" class="demo-stack">
      <label class="field">Message <input v-model="message" /></label>
      <button
        :id="elementId"
        type="button"
        class="demo-binding"
        :class="{ 'demo-binding--active': active }"
        @click.once="active = !active"
      >
        {{ message }} <small>(click once)</small>
      </button>
      <p>
        Bound id: <code>{{ elementId }}</code> · class state: {{ active }}
      </p>
    </div>

    <div v-else-if="group === 'reactivity'" class="demo-grid">
      <CounterDemo :initial="1" />
      <div class="demo-card">
        <label class="field">Reactive name <input v-model="profile.name" /></label>
        <button type="button" class="button secondary" @click="profile.skills.push('Vue')">
          Push skill
        </button>
        <p>{{ profile.name }} · {{ profile.skills.join(' · ') }}</p>
      </div>
    </div>

    <div v-else-if="group === 'derived'" class="demo-grid">
      <div class="demo-card">
        <label class="field">Writable computed <input v-model="fullName" /></label>
        <p>First: {{ firstName }} · Last: {{ lastName }}</p>
      </div>
      <div class="demo-card">
        <label class="field"
          >Watched search <input v-model="search" placeholder="Type to create watcher events"
        /></label>
        <ol class="event-log">
          <li v-for="entry in watchLog.slice(0, 4)" :key="entry">{{ entry }}</li>
        </ol>
      </div>
    </div>

    <div v-else-if="group === 'components'" class="demo-stack">
      <UserCard :user="sampleUser" @select="selectedUser = $event.name" />
      <div class="slot-card">
        <strong>Named header slot</strong>
        <p>Default slot-style content · Parent owns this copy.</p>
        <small>Scoped value: {{ selectedUser }}</small>
      </div>
    </div>

    <div v-else-if="group === 'forms'" class="demo-stack">
      <UserForm @submit="onRegistration" />
      <p v-if="registrationMessage" class="success-note">{{ registrationMessage }}</p>
    </div>

    <div v-else-if="group === 'refs'" class="demo-stack">
      <label class="field"
        >Template ref target <input ref="focusInput" placeholder="Focus me imperatively"
      /></label>
      <button type="button" class="button primary" @click="focusInput">Focus input</button>
      <p>
        Mount created the listener-backed demo; unmounting this page cleans up composable listeners.
      </p>
    </div>

    <div v-else-if="group === 'composables'" class="demo-grid">
      <div class="demo-card">
        <p class="counter-value">{{ count }}</p>
        <div class="button-row">
          <button class="button secondary" @click="decrement">−</button
          ><button class="button primary" @click="increment">+</button
          ><button class="button ghost" @click="reset">Reset</button>
        </div>
      </div>
      <div class="demo-card">
        <p class="metric-label">useMouse()</p>
        <p class="counter-value">{{ x }}, {{ y }}</p>
        <small>Move your pointer anywhere in the window.</small>
      </div>
    </div>

    <div v-else-if="group === 'router'" class="demo-stack">
      <p>Navigate programmatically or use semantic links. The URL is application state.</p>
      <div class="button-row">
        <button class="button primary" @click="router.push('/users/2?from=lesson')">
          Open user 2</button
        ><RouterLink class="button secondary" to="/settings/profile"
          >Nested settings route</RouterLink
        >
      </div>
    </div>

    <div v-else-if="group === 'store'" class="demo-stack">
      <p class="counter-value">${{ cart.total.toFixed(2) }}</p>
      <div class="button-row">
        <button
          class="button primary"
          @click="cart.add({ id: 1, name: 'Vue Field Guide', price: 24 })"
        >
          Add Vue Field Guide</button
        ><button class="button ghost" @click="cart.checkout">Checkout</button>
      </div>
      <p>{{ cart.items.length }} shared cart line(s) · state survives navigation.</p>
    </div>

    <div v-else-if="group === 'api'" class="demo-stack">
      <button class="button primary" :disabled="apiState.loading" @click="loadEmployees">
        {{ apiState.loading ? 'Loading…' : 'Run paginated GET' }}
      </button>
      <p v-if="apiState.result" class="success-note">{{ apiState.result }}</p>
      <p v-if="apiState.error" class="form-error">{{ apiState.error }}</p>
    </div>

    <div v-else-if="group === 'typescript'" class="demo-stack">
      <UserCard :user="sampleUser" compact @select="sampleUser.active = !sampleUser.active" />
      <p>
        Props, emitted payload, handler, reactive object, and template are checked together by
        vue-tsc.
      </p>
    </div>

    <div v-else-if="group === 'directives'" class="demo-stack">
      <label class="field"
        >v-focus runs on mount <input v-focus value="Focused by a custom directive"
      /></label>
      <button v-tooltip="'This title came from v-tooltip'" class="button secondary">
        Hover for directive tooltip
      </button>
    </div>

    <div v-else-if="group === 'dynamic'" class="demo-stack">
      <div class="segmented">
        <button
          v-for="tab in ['Preview', 'Notes'] as const"
          :key="tab"
          :class="{ active: currentTab === tab }"
          @click="currentTab = tab"
        >
          {{ tab }}
        </button>
      </div>
      <KeepAlive><component :is="currentTabComponent" /></KeepAlive>
      <Suspense
        ><AsyncPanel /><template #fallback><p>Loading async panel…</p></template></Suspense
      >
    </div>

    <div v-else-if="group === 'provide'" class="demo-stack">
      <ThemeConsumer />
      <p>
        The descendant receives readonly state and a mutation action through a typed Symbol key.
      </p>
    </div>

    <div v-else-if="group === 'quality'" class="demo-stack">
      <button class="button secondary" @click="reverseItems">Reverse with stable keys</button>
      <TransitionGroup name="list" tag="ul" class="quality-list"
        ><li v-for="item in orderedItems" :key="item.id">{{ item.label }}</li></TransitionGroup
      >
      <button class="button ghost" @click="eventCount++">
        Trace interaction · {{ eventCount }}
      </button>
    </div>

    <div v-else class="demo-stack">
      <p>
        Open the integrated mini project to practice routing, Pinia, services, forms, modals, and
        CRUD together.
      </p>
      <RouterLink class="button primary" to="/employees">Launch Employee Dashboard →</RouterLink>
    </div>
  </section>
</template>
