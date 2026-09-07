import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { initialState } from "../types/user.types";
import { userExtraReducers } from "../extraReducers/user.extraReducers";
export const sendOtp = createAsyncThunk(
    "user/sendOtp",
    async (
        data: {
            phone: string;
            email: string;
            full_name?: string;
            gender?: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const payload: any = {
                phone: data.phone,
                email: data.email,
            };

            if (data.full_name) payload.full_name = data.full_name;
            if (data.gender) payload.gender = data.gender;

            console.log("Send OTP Request:", payload);

            const response = await apiClient.post(
                ENDPOINTS.SEND_OTP,
                payload
            );

            console.log("Send OTP Response:", response.data);
            return response.data;
        } catch (error: any) {
            console.log("Send OTP Error:", error);
            return rejectWithValue(
                error?.response?.data || "Send OTP failed"
            );
        }
    }
);
export const verifyOtp = createAsyncThunk(
    "user/verifyOtp",
    async (data: { phone: string; otp: string }) => {
        const response = await apiClient.post(ENDPOINTS.VERIFY_OTP, data);

        const token = response.data.token;

        //  SAVE TOKEN
        await AsyncStorage.setItem("authToken", token);
        return response.data;
    }
);


export const checkUserApi = createAsyncThunk(
    "user/checkUserApi",
    async (data: { phone: string }, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(
                ENDPOINTS.CHECK_PHONE_EXISTS, // 👈 add this endpoint
                data
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data || "Check user failed"
            );
        }
    }
);


const sanitizeFileName = (fileName: string) => {
    const ext = fileName.split(".").pop() || "jpg";

    const nameWithoutExt = fileName.replace(/\.[^/.]+$/, "");

    const cleanedName = nameWithoutExt.replace(/[^a-zA-Z0-9]/g, "");

    return `${cleanedName}.${ext}`;
};

export const submitKyc = createAsyncThunk(
    "user/submitKyc",
    async (data: any, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem("accessToken");

            const formData = new FormData();

            formData.append("pan_number", data.pan);
            formData.append("aadhaar_number", data.aadhaar);
            formData.append("email", data.email);
            formData.append("alternate_mobile", data.mobile);
            formData.append("city", data.city);
            formData.append("pin_code", data.pincode);
            formData.append("address", data.address);
            formData.append("state", data.state);

            if (data.panImage) {
                formData.append("pan_card", {
                    uri: data.panImage.uri,
                    type: data.panImage.type,
                    name: sanitizeFileName(data.panImage.name),
                } as any);
            }

            if (data.aadhaarFront) {
                formData.append("aadhaar_front", {
                    uri: data.aadhaarFront.uri,
                    type: data.aadhaarFront.type,
                    name: sanitizeFileName(data.aadhaarFront.name),
                } as any);
            }

            if (data.aadhaarBack) {
                formData.append("aadhaar_back", {
                    uri: data.aadhaarBack.uri,
                    type: data.aadhaarBack.type,
                    name: sanitizeFileName(data.aadhaarBack.name),
                } as any);
            }


            console.log("========== FormData ==========");

            if ((formData as any)._parts) {
                (formData as any)._parts.forEach(
                    ([key, value]: [string, any]) => {
                        console.log(
                            key,
                            typeof value === "object"
                                ? JSON.stringify(value, null, 2)
                                : value
                        );
                    }
                );
            }

            console.log("==============================");

            const response = await apiClient.post("/kyc", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
                transformRequest: (data) => data,
            });

            console.log("KYC submission response:", response.data);
            return response.data;
        } catch (error: any) {
            console.log(
                "KYC submission error:",
                error.response?.data || error.message
            );

            return rejectWithValue(
                error.response?.data || "KYC submission failed"
            );
        }
    }
);

// export const submitKyc = createAsyncThunk(
//     "user/submitKyc",
//     async (data: any, { rejectWithValue }) => {
//         try {
//             // Get token from AsyncStorage
//             const token = await AsyncStorage.getItem("accessToken");

//             const formData = new FormData();

//             formData.append("pan_number", data.pan);
//             formData.append("aadhaar_number", data.aadhaar);
//             formData.append("email", data.email);
//             formData.append("alternate_mobile", data.mobile);
//             formData.append("city", data.city);
//             formData.append("pin_code", data.pincode);
//             formData.append("address", data.address);
//             formData.append("state", data.address);

//             formData.append("pan_card", {
//                 uri: data.panImage.uri,
//                 type: data.panImage.type,
//                 name: sanitizeFileName(data.panImage.name),
//             } as any);

//             formData.append("aadhaar_front", {
//                 uri: data.aadhaarFront.uri,
//                 type: data.aadhaarFront.type,
//                 name: sanitizeFileName(data.aadhaarFront.name),
//             } as any);

//             formData.append("aadhaar_back", {
//                 uri: data.aadhaarBack.uri,
//                 type: data.aadhaarBack.type,
//                 name: sanitizeFileName(data.aadhaarBack.name),
//             } as any);

//             const response = await apiClient.post("/kyc", formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
//             console.log("KYC submission response:", response.data);
//             return response.data;
//         } catch (error: any) {
//             console.log("KYC submission error:", error);

//             return rejectWithValue(
//                 error?.response?.data || "KYC submission failed"
//             );
//         }
//     }
// );


export const submitEmployment = createAsyncThunk(
    "user/submitEmployment",
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await apiClient.post("/employment", data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || "Something went wrong");
        }
    }
);

export const submitReference = createAsyncThunk(
    "user/submitReference",
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await apiClient.post("/reference", data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data || "Reference failed"
            );
        }
    }
);

export const getLoanCalculation = createAsyncThunk(
    "user/getLoanCalculation",
    async (loan_amount: number, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(
                "/getcalculation",
                {
                    loan_amount: loan_amount.toString()
                }
            );
            console.log("Loan Calculation Response:", response.data);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data || "Calculation failed"
            );
        }
    }
);

export const submitLoanDocuments = createAsyncThunk(
    "user/submitLoanDocuments",
    async (data: any, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem("accessToken");

            const formData = new FormData();

            const getUri = (uri: string) => {
                return Platform.OS === "android"
                    ? uri
                    : uri.replace("file://", "");
            };

            // Helper function
            const createFile = (
                file: any,
                defaultType: string,
                defaultName: string
            ) => {
                const originalName = file.fileName || file.name || defaultName;

                // Keep only letters, numbers, underscore, hyphen and dot
                const sanitizedName = originalName
                    .replace(/[^a-zA-Z0-9._-]/g, "_")
                    .replace(/_+/g, "_").replace(/'/g, "");

                return {
                    uri: getUri(file.uri),
                    type: file.type || defaultType,
                    name: sanitizedName,
                };
            };

            formData.append("loan_amount", data.loanAmount.toString());

            // Bank Statement
            if (data.bankStatement?.uri) {
                formData.append(
                    "bank_statement",
                    createFile(
                        data.bankStatement,
                        "application/pdf",
                        "bank.pdf"
                    ) as any
                );
            }

            // Salary Slip 1
            if (data.salarySlip1?.uri) {
                formData.append(
                    "salary_slip1",
                    createFile(
                        data.salarySlip1,
                        "application/pdf",
                        "salary1.pdf"
                    ) as any
                );
            }

            // Salary Slip 2
            if (data.salarySlip2?.uri) {
                formData.append(
                    "salary_slip2",
                    createFile(
                        data.salarySlip2,
                        "application/pdf",
                        "salary2.pdf"
                    ) as any
                );
            }

            // Salary Slip 3
            if (data.salarySlip3?.uri) {
                formData.append(
                    "salary_slip3",
                    createFile(
                        data.salarySlip3,
                        "application/pdf",
                        "salary3.pdf"
                    ) as any
                );
            }

            // Selfie / Profile Picture
            if (data.selfie?.uri) {
                formData.append(
                    "profile_picture",
                    createFile(
                        data.selfie,
                        "image/jpeg",
                        "selfie.jpg"
                    ) as any
                );
            }

            formData.append("bank_statement_pin", data.bankStatementPin || "");
            formData.append("salary_slip_pin", data.salarySlipPin || "");

            const response = await apiClient.post(
                "/loan-document",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                    },

                    timeout: 60000,

                    transformResponse: res => {
                        try {
                            return JSON.parse(res);
                        } catch (e) {
                            return res;
                        }
                    },

                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) /
                            (progressEvent.total || 1)
                        );
                    },
                }
            );

            return response.data;
        } catch (error: any) {
            // VERY IMPORTANT
            if (
                error?.message === "Network Error" &&
                error?.request &&
                !error?.response
            ) {
                // Upload probably succeeded but response parsing failed
                return {
                    status: true,
                    message: "Uploaded successfully",
                    data: {},
                };
            }

            return rejectWithValue(
                error?.response?.data?.message ||
                error?.message ||
                "Loan document upload failed"
            );
        }
    }
);


export const getUserStatus = createAsyncThunk(
    "user/getUserStatus",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get("/user-status");
            return response.data;

        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data || "Failed to fetch user status"
            );
        }
    }
);

export const getLoanStatus = createAsyncThunk(
    "user/getLoanStatus",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get("/loan-status");
            return response.data;

        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data || "Failed to fetch loan status"
            );
        }
    }
);

export const logoutUser = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            await apiClient.get("/logout");

            await AsyncStorage.removeItem("authToken");

            return true;
        } catch (error: any) {
            // logout anyway
            await AsyncStorage.removeItem("authToken");

            return true;
        }
    }
);
export const getUserDetail = createAsyncThunk(
    "user/getUserDetail",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get("/get-user-detail");
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data);
        }
    }
);


export const getBankFromIfsc = createAsyncThunk(
    "user/getBankFromIfsc",
    async (ifsc: string, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `https://ifsc.razorpay.com/${ifsc}`
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue("Invalid IFSC");
        }
    }
);

export const getAppliedLoans = createAsyncThunk(
    "user/getAppliedLoans",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get("/get-apllied-loans", {
            });
            console.log("Applied Loans Response:", response.data);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const getDigiLockerUrl = createAsyncThunk(
    "user/getDigiLockerUrl",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get("/get-digilocke");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data || "Failed to fetch DigiLocker URL"
            );
        }
    }
);

export const getZoopESignUrl = createAsyncThunk(
    "user/getZoopESignUrl",
    async (order_id: string, { rejectWithValue }) => {
        try {
            const response = await apiClient.post("/get-zoop-esign", {
                order_id,
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data || "Failed to fetch E-Sign URL"
            );
        }
    }
);

export const getCurrentActiveLoan = createAsyncThunk(
    "user/getActiveLoan",
    async (order_id: string, { rejectWithValue }) => {
        try {
            const response = await apiClient.post("/get-active-loan", {
                order_id,
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data || "Failed to fetch E-Sign URL"
            );
        }
    }
);

export const getCurrentEmiOne = createAsyncThunk(
    "user/emiPaymentDetails",
    async (order_id: string, { rejectWithValue }) => {
        try {
            const response = await apiClient.post("/emi-payment-details", {
                order_id,
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data || "Failed to fetch E-Sign URL"
            );
        }
    }
);


export const getMandateDetails = createAsyncThunk(
    "user/getMandateDetails",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get("/mandate");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data || "Failed to fetch mandate details"
            );
        }
    }
);
export const getAppBanner = createAsyncThunk(
    "user/getAppBanner",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                "/app-banner"
            );

            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data || "Failed to fetch banners"
            );
        }
    }
);

export const trackAppMessage = createAsyncThunk(
    "user/trackAppMessage",
    async (
        data: { message: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await apiClient.post(
                "/track-app-message",
                data
            );

            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data || "Failed to send message"
            );
        }
    }
);


export const saveFcmToken = createAsyncThunk(
    "user/saveFcmToken",
    async (
        data: {
            deviceId: string;
            fcmToken: string;
            platform: string;
        },
        { rejectWithValue }
    ) => {
        try {

            const response = await apiClient.post(
                "/save-fcm-token",
                data
            );

            return response.data;

        } catch (error: any) {

            return rejectWithValue(
                error?.response?.data ||
                "Failed to save FCM token"
            );

        }
    }
);

export const getNotifications = createAsyncThunk(
    "user/getNotifications",
    async (_, { rejectWithValue }) => {
        try {

            const response = await apiClient.get(
                "/notifications"
            );

            return response.data;

        } catch (error: any) {

            return rejectWithValue(
                error?.response?.data ||
                "Failed to fetch notifications"
            );

        }
    }
);


export const readNotification = createAsyncThunk(
    "user/readNotification",
    async (
        notification_id: number,
        { rejectWithValue }
    ) => {
        try {
            const response = await apiClient.post(
                "/read-notification",
                {
                    notification_id,
                }
            );
            return response.data;

        } catch (error: any) {

            return rejectWithValue(
                error?.response?.data ||
                "Failed to read notification"
            );

        }
    }
);


export const getResons = createAsyncThunk(
    "user/go-back-reason",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get("/go-back-reason");
            return response.data;

        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data || "Failed to fetch user status"
            );
        }
    }
);


export const userLoginReason = createAsyncThunk(
    "user/userLoginReason",
    async (
        data: {
            reasons: string;
            msg: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await apiClient.post(
                "/user-login-reason",
                data
            );

            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data ||
                "Failed to submit reason"
            );
        }
    }
);

export const loanApplyResponse = createAsyncThunk(
    "user/loanApplyResponse",
    async (
        data: { loan_apply: number }, // Schema for the API
        { rejectWithValue }
    ) => {
        try {
            const response = await apiClient.post(
                "/loan-apply-response",
                data
            );

            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data || "Failed to submit loan apply response"
            );
        }
    }
);

export const checkAppUpdate = createAsyncThunk(
    "app/checkUpdate",
    async (payload: { app_version: string; platform: string; deviceId: string }) => {
        const res = await apiClient.post(ENDPOINTS.CHECK_UPDATE, payload, {
            headers: { Authorization: "" },
        });

        return {
            version: res.data,
            silent: true,
        };
    }
);

export const getAccountDetail = createAsyncThunk(
    "user/getAccountDetail",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get("/bank-account-details");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data || "Failed to fetch DigiLocker URL"
            );
        }
    }
);


export const BankAccountVerify = createAsyncThunk(
    "user/bankAccountVerify",
    async (payload: { account_number: string; order_id: string; verification_id: string }, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(ENDPOINTS.BANK_ACCOUNT_VERIFICATION, payload,);
            console.log("Bank Account Verification Response:", response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data || "Failed to post account verification"
            );
        }
    }
);



const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: userExtraReducers,



});

export default userSlice.reducer;




