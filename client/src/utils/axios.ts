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
    const token: string | null =
      localStorage.getItem('accessToken') ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjI2NGZhNTdkYzdlOGY1NzNkODk1OSIsImVtYWlsIjoidHVhbmFuaG5nbzI1MTNAZ21haWwuY29tIiwiaWF0IjoxNjg0NDI2MTY4LCJleHAiOjE2ODQ1MTI1Njh9.W7XRmSIOfQBIabzvJGSSoN4f9l3FqzP3u5c8fUAJ5sQ';
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
