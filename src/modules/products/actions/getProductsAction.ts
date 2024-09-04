import { adminApi } from '@/api/adminApi';
import type { IAllProducts } from '../interfaces/IAllProducts';

//Obtener productos.
export const getProductsAction = async (actualPage: number = 1, productsLimit: number = 10) => {
  try {
    //Desestructurar en una variable lo que devuelve la API de products
    //limit: limite
    //offset: indice de inicio de seleccion de productos.
    const { data } = await adminApi.get<IAllProducts[]>(
      `/products?limit=${productsLimit}&offset=${actualPage * productsLimit}`,
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error loading products');
  }
};
