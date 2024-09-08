import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export const usePagination = () => {
  const route = useRoute();
  const actualPage = ref(Number(route.query.page || 1));

  watch(
    () => route.query.page,
    (newPage) => {
      actualPage.value = Number(newPage || 1);
      //Scroll up
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  );

  return {
    actualPage,
  };
};
