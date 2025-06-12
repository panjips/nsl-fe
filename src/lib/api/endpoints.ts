// export const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:3000/api";
export const API_URL = "http://127.0.0.1:3000/api";

export enum ENDPOINTS {
    LOGIN = "/auth/login",
    REGISTER = "/auth/register",
    FORGOT_PASSWORD = "/auth/forgot-password",
    RESET_PASSWORD = "/auth/reset-password",
    REFRESH_TOKEN = "/auth/refresh-token",
    LOGOUT = "/auth/logout",
    CATEGORY = "/category",
    PRODUCT = "/product",
    USER = "/user",
    INVENTORY = "/inventory",
    PURCHASE = "/purchase",
    ADDON = "/addon",
    PRODUCT_RECIPE = "/recipe/product",
    ADDON_RECIPE = "/recipe/addon",
    CATERING_PACKAGE = "/catering-package",
    RESERVATION = "/reservation",
    ORDER = "/order",
}
