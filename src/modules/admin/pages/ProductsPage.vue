<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">Productos</h1>

    <!-- component -->
    <div class="py-8 w-full">
      <div class="shadow overflow-hidden rounded border-b border-gray-200">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="w-10 text-left py-3 px-4 uppercase font-semibold text-sm">Image</th>
              <th class="flex-1 text-left py-3 px-4 uppercase font-semibold text-sm">Titulo</th>
              <th class="w-28 text-left py-3 px-4 uppercase font-semibold text-sm">Precio</th>
              <th class="w-60 text-left py-3 px-4 uppercase font-semibold text-sm">Tallas</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr
              v-for="(product, index) in products"
              :key="product.id"
              :class="{
                'bg-gray-100': index % 2 == 0,
              }"
            >
              <td class="text-left py-3 px-4">
                <img :src="product.images[0]" :alt="product.title" class="h-12 w-12 object-cover" />
              </td>
              <td class="text-left py-3 px-4">
                <router-link
                  :to="`/admin/products/${product.id}`"
                  class="hover:text-blue-500 hover:underline"
                  >{{ product.title }}</router-link
                >
              </td>
              <td class="text-left py-3 px-4">
                <span class="bg-blue-500 text-white rounded-2xl px-2">${{ product.price }}</span>
              </td>
              <td class="text-left py-3 px-4">{{ product.sizes.join(', ') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <ButtonPagination
    :actualPage="actualPage"
    :hasMoreData="!!products && products.length < 10"
    :isFirstPage="actualPage === 1"
  ></ButtonPagination>
</template>

<script lang="ts" setup>
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';
import { usePagination } from '@/modules/common/composables/usePagination';
import { getProductsAction } from '@/modules/products/actions';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { watchEffect } from 'vue';

const { actualPage } = usePagination();

//Query client to preload a page.
const queryClient = useQueryClient();

//UseQuery.
const { data: products } = useQuery({
  //Guarda en el caché la consulta con el parámetro consultado, en este caso {page: actual-page}
  queryKey: ['products', { page: actualPage }],
  //Llamar a nuestra funcion que tiene como parámetros el límite de productos y la página actual.
  queryFn: () => getProductsAction(actualPage.value),
});

//WatchEffect funciona con variables reactivas
watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['products', { page: actualPage.value + 1 }],
    queryFn: () => getProductsAction(actualPage.value + 1),
  });
});
</script>
