import isAdminGuard from '@/modules/auth/guards/isAdminGuard';
import isAuthenticatedGuard from '@/modules/auth/guards/isAuthenticadedGuard';
import type { RouteRecordRaw } from 'vue-router';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  beforeEnter: [isAuthenticatedGuard, isAdminGuard],
  redirect: { name: 'admin-dashboard' },
  component: () => import('@/modules/admin/layouts/AdminLayout.vue'),
  children: [
    {
      path: 'dashboard',
      name: 'admin-dashboard',
      component: () => import('@/modules/admin/pages/DashboardPage.vue'),
    },
  ],
};
