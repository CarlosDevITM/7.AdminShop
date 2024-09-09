import { adminApi } from '@/api/adminApi';
import type { AllProductsI } from '@/modules/products/interfaces/IAllProducts';

//Partial: That configures all values in products as an optional value
export const createUpdateProductAction = async (product: Partial<AllProductsI>) => {
  if (product.id && product.id !== '') {
    //Update Product
    return await UpdateProduct(product);
  }

  throw new Error('Producto no actualizado');

  //Create Product
};

const UpdateProduct = async (product: Partial<AllProductsI>) => {
  //CONVERTIR EL URL DE LA IMAGEN AL NOMBRE DE LA IMAGEN TIPO Algo.jpg
  const images: string[] =
    //Copia del array del producto
    product.images?.map((image) => {
      //Si la imagen inicia con http
      if (image.startsWith('http')) {
        //Dividir y retornar la última parte del url de la imagen con el .pop()
        const imageName = image.split('/').pop();
        //Retornar el imageNAme si tenemos un valor
        return imageName ? image : '';
      }
      return image;
    }) ?? [];

  const productID = product.id;

  delete product.id;
  delete product.user;
  product.images = images;

  try {
    //Tomar la data de la ruta de actualización
    const { data } = await adminApi.patch<AllProductsI>(`products/${productID}`, product);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error updating product');
  }
};
