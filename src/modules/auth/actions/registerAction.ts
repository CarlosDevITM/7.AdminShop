import { adminApi } from '@/api/adminApi';
import type { AuthResponseI, IUser } from '../interfaces';

interface onRegisterSuccess {
  ok: true;
  user: IUser;
  token: string;
}
interface onRegisterFailure {
  ok: false;
  message: string;
}

export const registerAction = async (
  fullName: string,
  email: string,
  password: string,
): Promise<onRegisterFailure | onRegisterSuccess> => {
  try {
    //Desestructuración de la respuesta de adminAPI con la ruta auth/login obteniendo la DATA.
    const { data } = await adminApi.post<AuthResponseI>('/auth/register', {
      //DATA TO SEND
      fullName,
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
    console.error(error);
    return {
      ok: false,
      message: 'User already exists',
    };
  }
};
