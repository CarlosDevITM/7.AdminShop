import { useQuery } from '@tanstack/vue-query';
import { defineComponent, watchEffect } from 'vue';
import { getProductByIdAction } from '../actions';
import { useForm } from 'vee-validate';
import router from '@/router';
import * as yup from 'yup';
import CustomImput from '@/modules/common/components/CustomImput.vue';
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';

//YUP Validators
const validationSchema = yup.object({
  title: yup.string().required().min(3),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().required().min(1),
  gender: yup.string().required().oneOf(['male', 'female', 'kid']),
});

export default defineComponent({
  // components: {
  //   CustomImput,
  //   CustomTextArea,
  // },
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
    const { values, defineField, errors, handleSubmit } = useForm({
      validationSchema,
    });

    const onSubmit = handleSubmit((value) => {});

    //INPUTS
    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
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
      stock,
      stockAttrs,
      gender,
      genderAttrs,
      //Computed
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      //Functions
      onSubmit,
    };
  },
});
