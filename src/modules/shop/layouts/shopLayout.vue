<template>
  <!-- Vista e-commerce -->

  <!-- Header Navbar -->
  <NavBar></NavBar>

  <!-- Product List -->
  <router-view></router-view>

  <!-- Footer -->
  <ShopFooter></ShopFooter>
</template>

<script lang="ts" setup>
import NavBar from '@/modules/products/components/NavBar.vue';

import ShopFooter from '@/modules/products/components/ShopFooter.vue';
</script>
