<template>
  <h1 class="text-2xl font-semibold mb-4">Login</h1>
  <!--enviar formulario sin recargar-->
  <form @submit.prevent="onLogin">
    <!-- Email Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
        v-model="loginForm.email"
        ref="emailInputRef"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
        v-model="loginForm.password"
        ref="passwordInputRef"
      />
    </div>
    <!-- Remember Me Checkbox -->
    <div class="mb-4 flex items-center">
      <input
        type="checkbox"
        id="remember"
        name="remember"
        class="text-blue-500"
        v-model="loginForm.rememberMe"
      />
      <label for="remember" class="text-gray-600 ml-2">Remember Me</label>
    </div>
    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Forgot Password?</a>
    </div>
    <!-- Login Button -->
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Login
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'register' }" class="hover:underline">Register Here</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue';
import { useAuthStore } from '../stores/authStores';
import { useToast } from 'vue-toastification';

const authStore = useAuthStore();
//Toast Notification
const toast = useToast();
const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);
//Reactive: uso para objetos reactivos.
const loginForm = reactive({
  email: '',
  password: '',
  rememberMe: false,
});

const onLogin = async () => {
  if (loginForm.email.length === 0) {
    return emailInputRef.value?.focus();
  }

  if (loginForm.password.length === 0) {
    return passwordInputRef.value?.focus();
  }
  //Remember user on localstorage

  if (loginForm.rememberMe) {
    localStorage.setItem('email', loginForm.email);
  } else {
    localStorage.removeItem('email');
  }
  const status = await authStore.onLogin(loginForm.email, loginForm.password);
  console.log(status);

  if (status) return;
  toast.error('Usuario o contraseña no son correctos');
};
//WatchEffect para monitorear el cambio de loginForm
watchEffect(() => {
  const email = localStorage.getItem('email');
  if (email) {
    loginForm.email = email;
    loginForm.rememberMe = true;
  }
});
</script>
