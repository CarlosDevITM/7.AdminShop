import { adminApi } from '@/api/adminApi';
import type { AllProductsI } from '@/modules/products/interfaces/IAllProducts';

export const createUpdateProductAction = async (product: Partial<AllProductsI>) => {
  const productId = product.id;

  const newImages = await uploadImages(product.images ?? []);
  product.images = newImages;

  product = cleanProductForCreateUpdate(product);

  if (productId && productId !== '') {
    // Actualizar producto
    return await updateProduct(productId, product);
  }

  // Crear producto
  return await createProduct(product);
};

const cleanProductForCreateUpdate = (product: Partial<AllProductsI>) => {
  const images: string[] =
    product.images?.map((image) => {
      if (image.startsWith('http')) {
        const imageName = image.split('/').pop();
        return imageName ? image : '';
      }

      return image;
    }) ?? [];

  delete product.id;
  delete product.user;
  product.images = images;

  return product;
};

const updateProduct = async (productId: string, product: Partial<AllProductsI>) => {
  try {
    const { data } = await adminApi.patch<AllProductsI>(`/products/${productId}`, product);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error updating product');
  }
};

const createProduct = async (product: Partial<AllProductsI>) => {
  try {
    const { data } = await adminApi.post<AllProductsI>(`/products`, product);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating product');
  }
};

const uploadImages = async (images: (string | File)[]) => {
  const filesToUpload = images.filter((image) => image instanceof File) as File[];
  const currentImages = images.filter((image) => typeof image === 'string') as string[];

  const uploadPromises = filesToUpload.map(async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await adminApi.post<{ secureUrl: string }>('/files/product', formData);

      return data.secureUrl;
    } catch (error) {
      console.log(error);
      throw new Error('Error uploading image');
    }
  });

  const uploadedImages = await Promise.all(uploadPromises);

  return [...currentImages, ...uploadedImages];
};
