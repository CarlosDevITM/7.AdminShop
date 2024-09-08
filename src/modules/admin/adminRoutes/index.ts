import isAdminGuard from '@/modules/auth/guards/isAdminGuard';
import isAuthenticatedGuard from '@/modules/auth/guards/isAuthenticadedGuard';
import type { RouteRecordRaw } from 'vue-router';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  beforeEnter: [isAuthenticatedGuard, isAdminGuard],
  component: () => import('@/modules/admin/layouts/AdminLayout.vue'),
};
