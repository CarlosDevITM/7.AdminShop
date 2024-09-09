import { defineComponent, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import { useFieldArray, useForm } from 'vee-validate';
import * as yup from 'yup';

import { getProductByIdAction } from '@/modules/admin/actions/getProductByIdAction';
import CustomInput from '@/modules/common/components/CustomImput.vue';
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';

const validationSchema = yup.object({
  title: yup.string().required('Este campo es super importante').min(3, 'Mínimo de 3 letras!!!'),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().required().min(1),
  gender: yup.string().required().oneOf(['men', 'women', 'kid']),
});

// const validationSchema = {
//   ...
//   ..
//   ..
//   ...
// }

export default defineComponent({
  components: {
    CustomInput,
    CustomTextArea,
  },
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();

    const {
      data: product,
      isError,
      isLoading,
    } = useQuery({
      queryKey: ['product', props.productId],
      queryFn: () => getProductByIdAction(props.productId),
      retry: false,
    });

    const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm({
      validationSchema,
      // initialValues: product.value,
    });

    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');

    const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes');
    const { fields: images } = useFieldArray<string>('images');

    const onSubmit = handleSubmit((value) => {
      console.log({ value });
    });

    const toggleSize = (size: string) => {
      const currentSizes = sizes.value.map((s) => s.value);
      const hasSize = currentSizes.includes(size);

      if (hasSize) {
        removeSize(currentSizes.indexOf(size));
      } else {
        pushSize(size);
      }
    };

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace('/admin/products');
        return;
      }
    });

    watch(
      product,
      () => {
        if (!product) return;

        resetForm({
          values: product.value,
        });
      },
      {
        deep: true,
        immediate: true,
      },
    );

    return {
      // Properties
      values,
      errors,
      meta,

      title,
      titleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      price,
      priceAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,

      sizes,
      images,

      // Getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      // Actions
      onSubmit,
      toggleSize,

      hasSize: (size: string) => {
        const currentSizes = sizes.value.map((s) => s.value);
        return currentSizes.includes(size);
      },
    };
  },
});

// import { useQuery } from '@tanstack/vue-query';
// import { defineComponent, watch, watchEffect } from 'vue';
// import { getProductByIdAction } from '../actions';
// import { useFieldArray, useForm } from 'vee-validate';
// import router from '@/router';
// import * as yup from 'yup';
// import CustomImput from '@/modules/common/components/CustomImput.vue';
// import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';

// //YUP Validators
// const validationSchema = yup.object({
//   title: yup.string().required().min(3),
//   slug: yup.string().required(),
//   description: yup.string().required(),
//   price: yup.number().required(),
//   stock: yup.number().required().min(1),
//   gender: yup.string().required().oneOf(['man', 'woman', 'kid']),
// });

// //Images
// const { fields: images } = useFieldArray<string>('images');

// export default defineComponent({
//   components: {
//     CustomImput,
//     CustomTextArea,
//   },
//   props: {
//     productId: {
//       type: String,
//       required: true,
//     },
//   },

//   setup(props) {
//     console.log(props);
//     const {
//       data: product,
//       isError,
//       isLoading,
//     } = useQuery({
//       queryKey: ['productId', props.productId],
//       queryFn: () => getProductByIdAction(props.productId),
//       retry: false,
//     });

//     //UseForm
//     const { values, defineField, errors, handleSubmit, resetForm } = useForm({
//       validationSchema,
//     });

//     const onSubmit = handleSubmit((value) => {});

//     //INPUTS
//     const [title, titleAttrs] = defineField('title');
//     const [slug, slugAttrs] = defineField('slug');
//     const [description, descriptionAttrs] = defineField('description');
//     const [price, priceAttrs] = defineField('price');
//     const [stock, stockAttrs] = defineField('stock');
//     const [gender, genderAttrs] = defineField('gender');

//     //Buttons sizes
//     const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes');

//     //Sizes buttons
//     const toggleSize = (size: string) => {
//       const currentSizes = sizes.value.map((size) => size.value);
//       const hasSize = currentSizes.includes(size);

//       if (hasSize) {
//         removeSize(currentSizes.indexOf(size));
//       } else {
//         pushSize(size);
//       }
//     };
//     //Watch if user is inserting false urls
//     watchEffect(() => {
//       //Si hay un error y la página no está cargando.
//       if (isError.value && !isLoading.value) {
//         //Llevalo a la pantalla de inicio admin
//         router.replace('/admin/products');
//       }
//     });

//     //Observar si hay productos en el formulario
//     watch(
//       product,
//       () => {
//         if (!product) return;

//         resetForm({
//           values: product.value,
//         });
//       },
//       {
//         //
//         deep: true,
//         immediate: true,
//       },
//     );
//     return {
//       //Properties
//       values,
//       errors,
//       //Form
//       title,
//       titleAttrs,
//       slug,
//       slugAttrs,
//       description,
//       descriptionAttrs,
//       price,
//       priceAttrs,
//       stock,
//       stockAttrs,
//       gender,
//       genderAttrs,
//       images,
//       //Computed
//       allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

//       //Functions
//       onSubmit,
//       toggleSize,
//     };
//   },
// });
