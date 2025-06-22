import axios, { AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";
import { API_URL, ENDPOINTS } from "./endpoints";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

const axiosMultipartInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = Cookies.get("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

axiosMultipartInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = Cookies.get("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
            _retry?: boolean;
        };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refresh = await axiosInstance.post(ENDPOINTS.REFRESH_TOKEN, {}, { withCredentials: true });

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${refresh.data.data.token}`;
                } else {
                    originalRequest.headers = { Authorization: `Bearer ${refresh.data.data.token}` };
                }

                Cookies.set("token", refresh.data.data.token);

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export { axiosMultipartInstance };
export default axiosInstance;
