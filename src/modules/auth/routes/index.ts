import type { RouteRecordRaw } from 'vue-router';

export const authRoutes: RouteRecordRaw = {
  path: '/auth',
  name: 'auth',
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
