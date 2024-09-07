<template>
  <h1 class="text-2xl font-semibold mb-4">Register</h1>
  <form @submit.prevent="onRegister">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="name" class="block text-gray-600">Username</label>
      <input
        type="text"
        id="name"
        name="name"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
        v-model="registerForm.fullName"
        ref="fullNameInputInputRef"
      />
    </div>

    <!-- Email Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Email</label>
      <input
        type="email"
        id="email"
        name="username"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
        v-model="registerForm.email"
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
        v-model="registerForm.password"
        ref="passwordInputRef"
      />
    </div>

    <!-- Login Button -->
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Register
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'login' }" class="hover:underline">Login Here</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '../stores/authStores';
import { useToast } from 'vue-toastification';

const authStore = useAuthStore();
//Toast Notification
const toast = useToast();
const fullNameInputRef = ref<HTMLInputElement | null>(null);
const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);
//Reactive: uso para objetos reactivos.
const registerForm = reactive({
  fullName: '',
  email: '',
  password: '',
});

const onRegister = async () => {
  if (registerForm.email.length === 0) {
    return emailInputRef.value?.focus();
  }

  if (registerForm.password.length === 0) {
    return passwordInputRef.value?.focus();
  }

  if (registerForm.fullName.length === 0) {
    return fullNameInputRef.value?.focus();
  }

  const ok = await authStore.onRegister(
    registerForm.fullName,
    registerForm.email,
    registerForm.password,
  );
  console.log(ok);

  if (ok) return;
  toast.error('Registration failed');
};
</script>
