import type { IUser } from '@/modules/auth/interfaces/IUserAuth';

export interface AllProductsI {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: string[];
  gender: string;
  tags: string[];
  images: string[];
  user: IUser;
}

export enum ISize {
  L = 'L',
  M = 'M',
  S = 'S',
  Xl = 'XL',
  Xs = 'XS',
  Xxl = 'XXl',
}

export enum ITag {
  Hoodie = 'hoodie',
  Shirt = 'shirt',
}
