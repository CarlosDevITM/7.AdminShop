import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/authStores';
import { AuthStatusE } from '../interfaces';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();
  //Estado de authentication del usuario
  console.log(authStore.authStatus);
  await authStore.checkAuthUserStatus();
  authStore.authStatus === AuthStatusE.Unauthenticated ? next({ name: 'home' }) : next();
};

export default isAuthenticatedGuard;
