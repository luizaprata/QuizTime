import axios from 'axios';
import errorHandlingInterceptor from './errorHandling.interceptor';

const api = axios.create({
  baseURL: 'https://opentdb.com/',
});

api.interceptors.response.use(undefined, errorHandlingInterceptor);
export default api;
