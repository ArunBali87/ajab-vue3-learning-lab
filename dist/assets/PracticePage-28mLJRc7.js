import{A as e,O as t,St as n,X as r,d as i,f as a,g as o,l as s,r as c,u as l,v as u}from"./runtime-core.esm-bundler-x_4OVm04.js";import{t as d}from"./CodeBlock-Ctj4cAyk.js";var f={class:`reference-page`},p={class:`practice-list`},m={class:`practice-title`},h=[`onClick`],g=u({__name:`PracticePage`,setup(u){let g=r([]),_=[{title:`State → ref`,level:`Warm-up`,react:`const [count, setCount] = useState(0)`,solution:`const count = ref(0)
count.value++`},{title:`Mount effect → lifecycle`,level:`Warm-up`,react:`useEffect(() => {
  fetchUsers()
}, [])`,solution:`onMounted(() => {
  void fetchUsers()
})`},{title:`Memo → computed`,level:`Core`,react:`const filtered = useMemo(
  () => users.filter(user => user.active),
  [users]
)`,solution:`const filtered = computed(() =>
  users.value.filter(user => user.active)
)`},{title:`Context → provide/inject`,level:`Core`,react:`const ThemeContext = createContext(null)
<ThemeContext.Provider value={theme}>`,solution:`const ThemeKey: InjectionKey<Theme> = Symbol()
provide(ThemeKey, readonly(theme))
// child: inject(ThemeKey)`},{title:`Custom hook → composable`,level:`Core`,react:`function useOnline() {
  const [online, setOnline] = useState(true)
  // subscribe...
  return online
}`,solution:`function useOnline() {
  const online = ref(navigator.onLine)
  // onMounted subscribe; onUnmounted clean up
  return readonly(online)
}`},{title:`Redux slice → Pinia`,level:`Advanced`,react:`createSlice({ name: 'cart', initialState, reducers: { add } })`,solution:`export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const add = (item: CartItem) => items.value.push(item)
  return { items, add }
})`},{title:`React Router → Vue Router`,level:`Advanced`,react:`<Route path="users/:id" element={<User />} />`,solution:`{ path: '/users/:id', name: 'user',
  component: () => import('./UserPage.vue') }`},{title:`Render prop → scoped slot`,level:`Advanced`,react:`<DataTable renderRow={row => <User row={row} />} />`,solution:`<DataTable :rows="users">
  <template #row="{ row }"><User :user="row" /></template>
</DataTable>`}],v=e=>{g.value=g.value.includes(e)?g.value.filter(t=>t!==e):[...g.value,e]};return(r,u)=>(t(),a(`div`,f,[u[0]||=s(`header`,{class:`reference-hero`},[s(`p`,{class:`eyebrow`},`Deliberate practice`),s(`h1`,null,`React Developer Practice`),s(`p`,null,` Translate the intent, not just the syntax. Write your answer in a new SFC before revealing the solution. `)],-1),s(`div`,p,[(t(),a(c,null,e(_,(e,r)=>s(`article`,{key:e.title,class:`practice-card`},[s(`div`,m,[s(`span`,null,n(e.level),1),s(`h2`,null,n(r+1)+`. `+n(e.title),1)]),o(d,{code:e.react,language:`tsx`},null,8,[`code`]),s(`button`,{class:`button secondary`,onClick:e=>v(r)},n(g.value.includes(r)?`Hide Vue answer`:`Reveal Vue answer`),9,h),g.value.includes(r)?(t(),l(d,{key:0,code:e.solution},null,8,[`code`])):i(``,!0)])),64))])]))}});export{g as default};