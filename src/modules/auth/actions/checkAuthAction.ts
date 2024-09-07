import { adminApi } from '@/api/adminApi';
import { type AuthResponseI, type IUser } from '../interfaces';
import { isAxiosError } from 'axios';

interface checkTokenSuccess {
  ok: true;
  user: IUser;
  token: string;
}
interface checkTokenFailure {
  ok: false;
}

export const checkAuthUserAction = async (): Promise<checkTokenFailure | checkTokenSuccess> => {
  try {
    //Obtener el token del localStorage
    const localStorageToken = localStorage.getItem('token');
    //si existe
    if (localStorageToken && localStorageToken.length < 10) {
      return { ok: false };
    }
    //Toma los datos de la respuesta de la api.
    const { data } = await adminApi.get<AuthResponseI>('/auth/check-status');
    //Retorna en base a checkTokenSucess
    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      //Retorna en base a checkTokenFailure
      return {
        ok: false,
      };
    }
    throw new Error('No se pudo verificar la existencia del token del usuario');
  }
};
