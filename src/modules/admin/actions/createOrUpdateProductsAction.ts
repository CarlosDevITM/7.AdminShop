import { adminApi } from '@/api/adminApi';
import type { AllProductsI } from '@/modules/products/interfaces/IAllProducts';

//Partial: That configures all values in products as an optional value
export const createUpdateProductAction = async (product: Partial<AllProductsI>) => {
  const productID = product.id;

  product = clearProductForUpdateCreate(product);
  if (product.id && product.id !== '') {
    //Update Product
    return await updateProduct(productID!, product);
  }

  //Create Product
  return await createProduct(product);
};

const clearProductForUpdateCreate = (product: Partial<AllProductsI>) => {
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

  delete product.id;
  delete product.user;
  product.images = images;

  return product;
};

const updateProduct = async (productID: string, product: Partial<AllProductsI>) => {
  try {
    //Tomar la data de la ruta de actualización
    const { data } = await adminApi.patch<AllProductsI>(`products/${productID}`, product);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error updating product');
  }
};

const createProduct = async (product: Partial<AllProductsI>) => {
  try {
    //Tomar la data de la ruta de actualización
    const { data } = await adminApi.post<AllProductsI>(`products/`, product);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error updating product');
  }
};
