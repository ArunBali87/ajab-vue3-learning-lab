import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '@/pages/DashboardPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
      meta: { title: 'Dashboard' },
    },
    {
      path: '/mental-model',
      name: 'mental-model',
      component: () => import('@/pages/MentalModelPage.vue'),
      meta: { title: 'React → Vue Mental Model' },
    },
    { path: '/lessons/:slug', name: 'lesson', component: () => import('@/pages/LessonPage.vue') },
    {
      path: '/cheat-sheet',
      name: 'cheat-sheet',
      component: () => import('@/pages/CheatSheetPage.vue'),
      meta: { title: 'Vue 3 Cheat Sheet' },
    },
    {
      path: '/weird-vue',
      name: 'weird-vue',
      component: () => import('@/pages/WeirdVuePage.vue'),
      meta: { title: '20 Things That Feel Weird' },
    },
    {
      path: '/practice',
      name: 'practice',
      component: () => import('@/pages/PracticePage.vue'),
      meta: { title: 'React Developer Practice' },
    },
    {
      path: '/interview',
      name: 'interview',
      component: () => import('@/pages/InterviewPage.vue'),
      meta: { title: 'Interview Preparation' },
    },
    {
      path: '/employees',
      name: 'employees',
      component: () => import('@/pages/EmployeeDashboardPage.vue'),
      meta: { title: 'Employee Management', requiresAuth: true },
    },
    {
      path: '/employees/:id',
      name: 'employee-details',
      component: () => import('@/pages/EmployeeDetailsPage.vue'),
      meta: { title: 'Employee Details', requiresAuth: true },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/pages/UsersPage.vue'),
      meta: { title: 'Users' },
    },
    {
      path: '/users/:id',
      name: 'user-details',
      component: () => import('@/pages/UserDetailsPage.vue'),
      meta: { title: 'User Details' },
    },
    {
      path: '/settings',
      component: () => import('@/pages/SettingsPage.vue'),
      redirect: '/settings/profile',
      children: [
        {
          path: 'profile',
          name: 'settings-profile',
          component: () => import('@/pages/SettingsPanel.vue'),
          props: { title: 'Profile settings' },
        },
        {
          path: 'notifications',
          name: 'settings-notifications',
          component: () => import('@/pages/SettingsPanel.vue'),
          props: { title: 'Notification settings' },
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/AboutPage.vue'),
      meta: { title: 'About' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFoundPage.vue'),
      meta: { title: 'Not Found' },
    },
  ],
})

router.beforeEach((to) => {
  const routeTitle = String(to.meta.title ?? '')
  document.title = routeTitle ? `${routeTitle} · Vue 3 Learning Lab` : 'Vue 3 Learning Lab'
  return true
})

export default router
