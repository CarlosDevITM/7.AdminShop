import { defineComponent, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useFieldArray, useForm } from 'vee-validate';
import * as yup from 'yup';

import { getProductByIdAction } from '@/modules/admin/actions/getProductByIdAction';
import { createUpdateProductAction } from '@/modules/admin/actions/createOrUpdateProductsAction';
import CustomInput from '@/modules/common/components/CustomImput.vue';
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';
import { useToast } from 'vue-toastification';

const validationSchema = yup.object({
  title: yup.string().required('Este campo es super importante').min(3, 'Mínimo de 3 letras!!!'),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().required().min(1),
  gender: yup.string().required().oneOf(['men', 'women', 'kid']),
});

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
    const toast = useToast();
    const router = useRouter();

    const {
      data: product,
      isError,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['product', props.productId],
      queryFn: () => getProductByIdAction(props.productId),
      retry: false,
    });

    //USEMUTATION DE TANSTACKQUERY PARA ACTUALIZAR Y GESTIONAR LOS POSIBLES ESTADOS DE LA ACTUALIZACION

    //useMutation a comparación de useQuery, no ejecuta o monta al instante, solo es un esqueleto de reglas que va a tener nuestra acción.
    const {
      //Ejecuta la mutación
      mutate,
      //Muestra si la mutación está en proceso
      isPending,
      //Muestra si la mutación esta completada
      isSuccess: isUpdatedProduct,
      //Uso de la data.
      data: updateProduct,
    } = useMutation({
      //Referencia de función que hará la mutación, de aquí viene la DATA.
      mutationFn: createUpdateProductAction,
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

    const { fields: images } = useFieldArray<string>('images');

    const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes');

    //GET AND SHOW IMAGES TO FORM
    const imageFiles = ref<File[]>([]);

    const fileInputRef = ref();

    //Cuando el formulario es posteado.
    const onSubmit = handleSubmit(async (values) => {
      const formValues = {
        //Input values
        ...values,
        //Images type
        //localhost:3000/moimom         Image.jpg
        images: [...values.images, ...imageFiles.value],
      };

      //Update the values

      mutate(formValues);
      imageFiles.value = [];
    });

    const toggleSize = (size: string) => {
      //Creamos un nuevo array de sizes
      const currentSizes = sizes.value.map((s) => s.value);
      //Constante para saber si la talla ya existe en el array.
      const hasSize = currentSizes.includes(size);

      //Si es así eliminala
      if (hasSize) {
        removeSize(currentSizes.indexOf(size));
        //Si no insertala al array.
      } else {
        pushSize(size);
      }
    };

    //Observar si el usuario coloca id falsos o rutas que no existen en esta página, si coloca eso y no está cargando la página, llevará al usuario a otra página.
    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace('/admin/products');
        return;
      }
    });

    //Revisar si hay información de la db y si la hay que la cargue.
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

    watch(isUpdatedProduct, (value) => {
      //Si el valor que regresa el isUpdated es falso, no hagas nada.
      if (!value) return;

      //Si no, manda un mensaje

      toast.success('El producto ha sido actualizado correctamente');

      //Si al crear un producto todo está correcto
      router.replace(`/admin/products/${updateProduct.value!.id}`);

      resetForm({
        values: updateProduct.value,
      });
    });

    watch(
      () => props.productId,
      () => {
        //Desppues de que el id cambie, vuelve a ejecutar el tanstack query para actualizar la data y reflejarla en pantalla.
        refetch();
      },
    );
    const removeImage = (name: string) => {
      imageFiles.value = imageFiles.value.filter((image) => name !== image.name);
      fileInputRef.value.value = '';
    };

    watch(
      () => imageFiles.value,
      () => {
        onFileChange;
      },
    );

    //Mostrar imagenes en el form.
    const onFileChange = (event: Event) => {
      const fileInput = event.target as HTMLInputElement;
      //Lista de imagenes
      const fileList = fileInput.files;
      console.log(fileList?.length);
      //Si no hay lista de imagenes, no hagas nada.
      if (!fileList) return;
      if (fileList.length === 0) return;

      //Si las hay, recorre esa lista y por cada imagen, guardala en nuestra propiedad reactiva imageFiles que es otro array.
      for (const imageFile of fileList) {
        imageFiles.value.push(imageFile);
      }
      console.log({ imagesFromOnFileChange: imageFiles.value });
    };

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

      isPending,

      sizes,
      images,
      imageFiles,
      onFileChange,
      fileInputRef,

      // Getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      // Actions
      onSubmit,
      toggleSize,

      hasSize: (size: string) => {
        const currentSizes = sizes.value.map((s) => s.value);
        return currentSizes.includes(size);
      },

      //CREATE URL TO SRC PATH OF MY IMAGES
      temporalImagePath: (imageFile: File) => {
        return URL.createObjectURL(imageFile);
      },

      //Eliminar una imagen al subirla
      removeImage,
    };
  },
});
