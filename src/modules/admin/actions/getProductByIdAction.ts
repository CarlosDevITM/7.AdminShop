import { adminApi } from '@/api/adminApi';
import { getProductImageAction } from '@/modules/products/actions';
import type { AllProductsI } from '@/modules/products/interfaces/IAllProducts';

export const getProductByIdAction = async (productId: string) => {
  //Para cargar la pantalla de inserción de un archivo sin un id
  if (productId === 'create') {
    //Producto vacio para simular un id de un producto
    return {
      id: '',
      title: '',
      slug: '',
      description: '',
      price: '',
      stock: 0,
      images: [],
      tags: [],
      sizes: [],
      gender: '' as any,
      user: {} as any,
    };
  }

  try {
    //Desestructuramos la data de la llamada de la API hacia products/:productID
    const { data } = await adminApi.get<AllProductsI>(`products/${productId}`);

    console.log(data);

    return {
      //regresar una copia de la data
      ...data,
      //Regresar las imagenes con URL
      images: data.images.map(getProductImageAction),
    };
  } catch (error) {
    console.error(error);
    throw new Error('error');
  }
};
