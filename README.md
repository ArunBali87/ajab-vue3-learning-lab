# Vue 3 Learning Lab

A complete, runnable Vue 3 training environment for an experienced React + TypeScript engineer. The lab teaches Vue by translating familiar React concepts into Vue's reactivity, template, component, routing, and state-management models.

## Start here

Prerequisites:

- Node.js 20.19+ or 22.12+ (the lab was verified with Node 24)
- npm 10+
- VS Code with the recommended workspace extensions

```bash
npm install
npm run dev
```

Open the URL printed by Vite. Begin with **React → Vue 3 Mental Model**, then continue to **01 — Vue Fundamentals**.

## Commands

```bash
npm run dev          # local development server with HMR
npm run build        # strict Vue/TypeScript check + production bundle
npm run preview      # preview the production build
npm run test         # run all Vitest tests once
npm run test:watch   # interactive test watch mode
npm run lint         # ESLint with zero warnings allowed
npm run format       # apply Prettier formatting
npm run format:check # verify formatting without changing files
```

## Learning roadmap

### Phase 1 — Become Productive

Fundamentals, reactivity, computed values, watchers, components, props, emits, slots, templates, forms, events, and styling.

### Phase 2 — Real Application Development

Lifecycle, template refs, composables, Vue Router, Pinia, API integration, TypeScript, directives, provide/inject, and state ownership.

### Phase 3 — Advanced Vue

Async components, Suspense, dynamic components, KeepAlive, testing, performance, DevTools, and production architecture.

### Phase 4 — Production Project

The Employee Management Dashboard combines routing, typed CRUD services, cancellable requests, Pinia, composables, forms, validation, modal, toast notifications, search, filtering, sorting, pagination, and responsive UI.

Progress is stored in `localStorage`, so completed modules survive a refresh.

## Architecture

```text
src/
├── assets/                 # static app-owned assets
├── components/
│   ├── common/             # reusable UI and application shell
│   └── features/           # course and employee feature components
├── composables/            # reusable reactive behavior
├── constants/              # typed course curriculum
├── layouts/                # route shell and navigation
├── pages/                  # route-level views
├── router/                 # route records and guards
├── services/               # transport/API boundary
├── stores/                 # Pinia state owners
├── test/                   # shared test setup
├── types/                  # domain and API types
├── App.vue
└── main.ts
```

This structure is intentionally modest. Feature-local files should stay together as the app grows; do not create a layer merely because the folder exists.

## React → Vue quick translation

| React         | Vue 3                             | Important nuance                                     |
| ------------- | --------------------------------- | ---------------------------------------------------- |
| `useState`    | `ref` / `reactive`                | Refs use `.value` in script and unwrap in templates  |
| `useMemo`     | `computed`                        | Dependencies are discovered automatically            |
| `useEffect`   | `watch`, `watchEffect`, lifecycle | Pick the API that matches the intent                 |
| Custom hook   | Composable                        | No hook call-order restriction                       |
| Callback prop | `defineEmits`                     | Children publish semantic events                     |
| `children`    | slots                             | Scoped slots are similar to render props             |
| Context       | provide/inject                    | Use typed `InjectionKey` values                      |
| Redux/Zustand | Pinia                             | Getters are computed values; actions mutate directly |
| React Router  | Vue Router                        | Route records render through `RouterView`            |
| `useRef`      | template ref                      | `useTemplateRef` is available in Vue 3.5+            |

The in-app mental-model page includes runnable, side-by-side examples.

## How each module works

Every module follows the same loop:

1. **What / Why / When** — the conceptual model.
2. **React equivalent** — translation from familiar vocabulary.
3. **Vue implementation** — compiling TypeScript code.
4. **Live sandbox** — modify state and observe Vue's behavior.
5. **Production rule + common mistake** — practical guardrails.
6. **Challenge** — attempt it before revealing the solution.
7. **Interview checkpoint** — explain the concept concisely.

Use the source files while the dev server is running. Vite hot-module replacement makes the browser your fast feedback loop.

## Testing

The test suite demonstrates component interaction (`CounterDemo`), props and emits (`UserCard`), form validation (`UserForm`), composable logic (`useCounter`), and Pinia actions/getters (the cart store).

```bash
npm run test
```

Tests use Vitest, Vue Test Utils, and jsdom. Prefer assertions on behavior and public contracts over private component state.

## API lab

`src/services/employeeService.ts` is an in-memory asynchronous adapter. It deliberately behaves like an HTTP boundary—latency, errors, pagination, CRUD, and `AbortSignal` support—without making the course dependent on a public API. Replace its implementation with `fetch` or Axios while keeping the typed service contract to practice real integration.

## Debugging

1. Install the recommended **Vue - Official** VS Code extension (Volar).
2. Install the Vue DevTools browser extension.
3. Inspect the component tree, props, emitted events, Pinia stores, routes, and performance timeline.
4. If the editor reports stale template errors, run **Vue: Restart Vue and TS servers** from the command palette.
5. If a request appears out of order, inspect `useEmployeeStore`; it aborts the previous list request when filters change.
6. Run `npm run build` for the strictest template-aware TypeScript check.

## Exercises

- Complete each module challenge without revealing its solution.
- Work through **React Developer Practice** from state to routing and stores.
- Add a department chart to the Employee Dashboard.
- Put employee filters in the URL query string.
- Replace the mock service with a real HTTP endpoint.
- Add an optimistic employee update and rollback behavior.

## VS Code setup

The checked-in `.vscode` configuration recommends only Vue - Official, ESLint, and Prettier. Format-on-save is enabled and the workspace uses the project's TypeScript version. Disable older Vue language extensions such as Vetur for this workspace to avoid conflicts.

## Production notes

- TypeScript is strict; avoid `any` at unsafe boundaries—start with `unknown` and narrow it.
- Local UI state stays local. Shared client state uses Pinia. Remote data stays behind a service boundary.
- Lazy route imports create production bundle boundaries.
- Accessibility is part of the examples: labels, semantic buttons, focus management, Escape handling, live toast announcements, and reduced-motion support.
- Tailwind is intentionally not installed; the lab demonstrates Vue's built-in scoped and dynamic styling patterns without adding a second system to learn.
