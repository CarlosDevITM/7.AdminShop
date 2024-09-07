import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatusE, type IUser } from '../interfaces';
import { loginAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';
import { registerAction } from '../actions/registerAction';

export const useAuthStore = defineStore('auth', () => {
  //3 possible status cases: Authenticaded, Unauthenticated, Cheking
  const authStatus = ref(AuthStatusE.Checking);
  //User que puede ser de tipo IUser o undefined.
  const user = ref<IUser | undefined>();
  //VueUSE/CORE Added to save into local storage
  const token = ref(useLocalStorage('token', ''));

  const onLogin = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction(email, password);

      if (!loginResponse.ok) {
        logOut();
        return false;
      }

      user.value = loginResponse.user;
      token.value = loginResponse.token;
      authStatus.value = AuthStatusE.Authenticaded;
      return true;
    } catch (error) {
      return logOut();
    }
  };

  const logOut = () => {
    authStatus.value = AuthStatusE.Unauthenticated;
    user.value = undefined;
    token.value = '';
    return false;
  };

  //Register User.
  const onRegister = async (fullName: string, email: string, password: string) => {
    try {
      const registerResponse = await registerAction(fullName, email, password);

      if (!registerResponse.ok) {
        logOut();
        return false;
      }
      user.value = registerResponse.user;
      token.value = registerResponse.token;
      authStatus.value = AuthStatusE.Authenticaded;
      return { ok: true, message: '' };
    } catch (error) {
      console.log(error);
    }
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
    onRegister,
  };
});
