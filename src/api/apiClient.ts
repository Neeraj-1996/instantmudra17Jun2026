import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../app/store";
import { ENDPOINTS } from "./endpoints";

export const apiClient = axios.create({
    baseURL: ENDPOINTS.BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// ADD INTERCEPTOR
apiClient.interceptors.request.use(
    async (config) => {
        // 1. Try Redux token first
        const reduxToken = store.getState().user.token;

        //  2. Fallback to AsyncStorage
        const storageToken = await AsyncStorage.getItem("authToken");
        const token = reduxToken || storageToken;
        console.log("Token in API Client:", token);
        // const token = await AsyncStorage.getItem("authToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);
