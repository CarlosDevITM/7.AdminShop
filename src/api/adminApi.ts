import axios from 'axios';

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_ADMINSHOP_API_URL,
});
// TODO: Come back here later
export { adminApi };
