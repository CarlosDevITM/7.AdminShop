import { useQuery } from '@tanstack/vue-query';
import { defineComponent, watchEffect } from 'vue';
import { getProductByIdAction } from '../actions';
import { useForm } from 'vee-validate';
import router from '@/router';
import * as yup from 'yup';

//YUP Validators
const validationSchema = yup.object({
  title: yup.string().required(),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stack: yup.number().required().min(1),
  gender: yup.string().required().oneOf(['male', 'female', 'kid']),
});

export default defineComponent({
  props: {
    productId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    console.log(props);
    const {
      data: product,
      isError,
      isLoading,
    } = useQuery({
      queryKey: ['productId', props.productId],
      queryFn: () => getProductByIdAction(props.productId),
      retry: false,
    });

    //UseForm
    const { values, defineField, errors } = useForm({
      validationSchema,
    });

    //INPUTS
    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stack, stackAttrs] = defineField('stack');
    const [gender, genderAttrs] = defineField('gender');

    //Watch if user is inserting false urls
    watchEffect(() => {
      //Si hay un error y la página no está cargando.
      if (isError.value && !isLoading.value) {
        //Llevalo a la pantalla de inicio admin
        router.replace('/admin/products');
      }
    });
    return {
      //Properties
      values,
      errors,
      //Form
      title,
      titleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      price,
      priceAttrs,
      stack,
      stackAttrs,
      gender,
      genderAttrs,
      //Computed
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      //Functions
    };
  },
});
