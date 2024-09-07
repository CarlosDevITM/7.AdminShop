import axios from 'axios';

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_ADMINSHOP_API_URL,
});
//Interceptores de axios.
adminApi.interceptors.request.use((axiosConfig) => {
  //Obtener el token del localstorage
  const token = localStorage.getItem('token');
  //Si existe
  if (token) {
    //La authorization que viene de axios será un Bearer token
    axiosConfig.headers.Authorization = `Bearer ${token}`;
  }
  return axiosConfig;
});
export { adminApi };
