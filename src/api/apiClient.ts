import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../app/store";
import { ENDPOINTS } from "./endpoints";

export const apiClient = axios.create({
    baseURL: ENDPOINTS.BASE_URL,
    timeout: 600000,
    headers: {
        "Content-Type": "application/json",
    },
});

// ================= REQUEST INTERCEPTOR =================
apiClient.interceptors.request.use(
    async (config) => {
        try {
            // 1. Try Redux token first
            const reduxToken = store.getState().user.token;

            // 2. Fallback to AsyncStorage
            const storageToken = await AsyncStorage.getItem("authToken");
            const token = reduxToken || storageToken;
            // console.log("Token in API Client:", token);
            // console.log(
            //     `[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`,
            //     "Token:",
            //     token ? `${token.substring(0, 15)}...` : "NONE"
            // );

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (err) {
            console.log("[API REQUEST] Error attaching token:", err);
        }

        return config;
    },
    (error) => {
        console.log("[API REQUEST ERROR]", error?.message);
        return Promise.reject(error);
    }
);

// ================= RESPONSE INTERCEPTOR =================
apiClient.interceptors.response.use(
    (response) => {
        // console.log(
        //     `[API RESPONSE] ${response.config.method?.toUpperCase()} ${response.config.url}`,
        //     "Status:",
        //     response.status
        // );
        return response;
    },
    (error) => {
        if (error.response) {
            // Server responded with a status outside 2xx
            // console.log("[API ERROR - SERVER RESPONSE]", {
            //     url: error.config?.url,
            //     method: error.config?.method,
            //     status: error.response.status,
            //     data: error.response.data,
            // });
        } else if (error.request) {
            // Request was made but no response received (network error, timeout, DNS, etc.)
            // console.log("[API ERROR - NO RESPONSE]", {
            //     url: error.config?.url,
            //     method: error.config?.method,
            //     message: error.message,
            //     code: error.code, // e.g. "ECONNABORTED" for timeout
            //     baseURL: error.config?.baseURL,
            //     timeout: error.config?.timeout,
            // });
        } else {
            // Something went wrong setting up the request
            // console.log("[API ERROR - SETUP]", error.message);
        }

        return Promise.reject(error);
    }
);

// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { store } from "../app/store";
// import { ENDPOINTS } from "./endpoints";

// export const apiClient = axios.create({
//     baseURL: ENDPOINTS.BASE_URL,
//     timeout: 180000,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// // ADD INTERCEPTOR
// apiClient.interceptors.request.use(
//     async (config) => {
//         // 1. Try Redux token first
//         const reduxToken = store.getState().user.token;

//         //  2. Fallback to AsyncStorage
//         const storageToken = await AsyncStorage.getItem("authToken");
//         const token = reduxToken || storageToken;
//         console.log("Token in API Client:", token);
//         // const token = await AsyncStorage.getItem("authToken");

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         return config;
//     },
//     (error) => Promise.reject(error)
// );
