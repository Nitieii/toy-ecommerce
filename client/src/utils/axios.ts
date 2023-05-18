import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const ENDPOINT = 'https://toy-ecommerce-be.onrender.com/api/v1';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token: string | null = localStorage.getItem('accessToken');
    if (!token) localStorage.removeItem('accessToken');

    config.headers = {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : '',
    };
    return config;
  },
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
