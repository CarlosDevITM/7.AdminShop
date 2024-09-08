import type { RouteRecordRaw } from 'vue-router';
import isNotAuthenticatedGuard from '@/modules/auth/guards/isNotAuthenticadedGuard';
export const authRoutes: RouteRecordRaw = {
  path: '/auth',
  name: 'auth',
  beforeEnter: [isNotAuthenticatedGuard],
  redirect: 'auth/login',
  component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import('@/modules/auth/pages/LoginPage.vue'),
    },

    {
      path: 'register',
      name: 'register',
      component: () => import('@/modules/auth/pages/RegisterPage.vue'),
    },
  ],
};
