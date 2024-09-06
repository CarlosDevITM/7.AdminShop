import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatusE, type IUser } from '../interfaces';
import { loginAction } from '../actions';

export const useAuthStore = defineStore('auth', () => {
  //3 possible status cases: Authenticaded, Unauthenticated, Cheking
  const authStatus = ref(AuthStatusE.Checking);
  //User que puede ser de tipo IUser o undefined.
  const user = ref<IUser | undefined>();

  const token = ref<string>('');

  const onLogin = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction(email, password);

      if (!loginResponse.ok) return false;

      user.value = loginResponse.user;
      token.value = loginResponse.token;
      authStatus.value = AuthStatusE.Authenticaded;
      return true;
    } catch (error) {
      return logOut(error);
    }
  };

  const logOut = (error: unknown) => {
    console.error(error);
    authStatus.value = AuthStatusE.Unauthenticated;
    user.value = undefined;
    token.value = '';
    return false;
  };

  return {
    //Constants
    user,
    token,
    authStatus,
    //Computed
    isChecking: computed(() => authStatus.value === AuthStatusE.Checking),
    isAuthenticaded: computed(() => authStatus.value === AuthStatusE.Authenticaded),
    isUnauthenticaded: computed(() => authStatus.value === AuthStatusE.Unauthenticated),

    username: computed(() => user.value?.fullName),

    //Functions
    onLogin,
  };
});
