import { adminApi } from '@/api/adminApi';
import type { AuthResponseI, IUser } from '../interfaces';
import { isAxiosError } from 'axios';

interface onLoginSuccess {
  ok: true;
  user: IUser;
  token: string;
}
interface onLoginFailure {
  ok: false;
  message: string;
}

export const loginAction = async (
  email: string,
  password: string,
): Promise<onLoginFailure | onLoginSuccess> => {
  try {
    //Desestructuración de la respuesta de adminAPI con la ruta auth/login obteniendo la DATA.
    const { data } = await adminApi.post<AuthResponseI>('/auth/login', {
      //DATA TO SEND
      email,
      password,
      //TO GET the return value
    });
    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    //IF it is an axios error and it is a response different that 200
    if (isAxiosError(error) && error.response?.status !== 200) {
      return {
        ok: false,
        message: 'User or password incorrect',
      };
    }
    console.error(error);
    throw new Error('It was not possible to login ');
  }
};
