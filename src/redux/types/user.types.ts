export interface UserState {
    loading: boolean;
    token: string | null;
    user: any;
    calculation: any;
    userStatus: any;
    loanStatus: any;
    userDetail: any;
    bankDetails: any;
    appliedLoans: any;
    appliedLoansLoading: boolean;

    digilockerData: any;
    emiPaymentDetails: any;
    mandateData: any;
    emiLoading: boolean;
    uploadProgress: number;
    bannerData: any[];
    saveFcmToken: any;
    notifications: any[];

    notificationCount: number;

    notificationLoading: boolean;
}

export const initialState: UserState = {
    loading: false,
    token: null,
    user: null,
    calculation: null,
    userStatus: null,
    loanStatus: null,
    userDetail: null,
    bankDetails: null,
    appliedLoans: null,
    appliedLoansLoading: false,
    digilockerData: null,
    emiPaymentDetails: null,
    mandateData: null,
    emiLoading: false,
    uploadProgress: 0,
    bannerData: [],
    saveFcmToken: null,
    // NOTIFICATIONS
    notifications: [],

    notificationCount: 0,

    notificationLoading: false,
};