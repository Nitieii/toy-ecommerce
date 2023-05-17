import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const ENDPOINT = "http://localhost:8080/api/v1";

interface InternalAxiosRequestConfig<T = any> extends AxiosRequestConfig<T> {}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token: string | null = localStorage.getItem("accessToken");
    if (!token) localStorage.removeItem("accessToken");

    config.headers = {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : "",
    };
    return config;
  },
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
