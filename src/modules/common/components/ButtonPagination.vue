<template>
  <div class="flex justify-center py-10 bg-gray-100 space-x-3">
    <button
      :disabled="isFirstPage"
      @click="$router.push({ query: { page: actualPage - 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300"
    >
      <ArrowLeft></ArrowLeft>
    </button>
    <h2>{{ actualPage }}</h2>
    <button
      :disabled="hasMoreData"
      @click="$router.push({ query: { page: actualPage + 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300"
    >
      <ArrowRight></ArrowRight>
    </button>
  </div>
</template>

<script setup lang="ts">
import ArrowLeft from '@/modules/shop/icons/ArrowLeft.vue';
import ArrowRight from '@/modules/shop/icons/ArrowRight.vue';

interface Props {
  actualPage: number;
  isFirstPage: boolean;
  hasMoreData: boolean;
}

defineProps<Props>();
</script>
