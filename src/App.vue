<template>
  <LoadingEffect v-if="authStore.isChecking"></LoadingEffect>
  <router-view v-else></router-view>
  <vue-query-devtools></vue-query-devtools>
</template>

<script lang="ts" setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useAuthStore } from './modules/auth/stores/authStores';
import { useRoute, useRouter } from 'vue-router';
import { AuthStatusE } from './modules/auth/interfaces';
import LoadingEffect from './modules/common/components/LoadingEffect.vue';
//Store de pinia
const authStore = useAuthStore();

const routerNavigation = useRouter();
const routeInfo = useRoute();

//Suscripción a nuestra tienda para saber los cambios en la misma y ejecutar una funcion cada que esta cambie.
//$subscribe((mutation,state))
//Mutation: informa que se cambio.
//State: accede a las propiedades de la tienda
authStore.$subscribe(
  //, si no quieres usar un parámetro, se usa el ','
  (_, state) => {
    //si el estado es checking
    if (state.authStatus === AuthStatusE.Checking) {
      //Revisa si este tiene su Token.
      authStore.checkAuthUserStatus();
      return;
    }

    //Si la ruta contiene /auth y el estado es authenticated
    if (routeInfo.path.includes('/auth') && state.authStatus === AuthStatusE.Authenticaded) {
      //navega a home.
      routerNavigation.replace({ name: 'home' });
    }
  },
  {
    //Haz la función anterior, tan pronto como cargue el componente
    immediate: true,
  },
);
</script>
