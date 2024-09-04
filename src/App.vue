<template>
  <router-view></router-view>
  <vue-query-devtools></vue-query-devtools>
</template>

<script lang="ts" setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
</script>
