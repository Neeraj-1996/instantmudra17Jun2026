import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { UserState } from "../types/user.types";
import {
    sendOtp, verifyOtp,
    submitKyc,
    submitEmployment,
    submitReference,
    getLoanCalculation,
    submitLoanDocuments,
    getUserStatus,
    getLoanStatus,
    logoutUser,
    getUserDetail,
    getBankFromIfsc,
    getAppliedLoans,
    getDigiLockerUrl,
    getCurrentEmiOne,
    getMandateDetails,
    getAppBanner,
    trackAppMessage,
    saveFcmToken,
    getNotifications,
    readNotification,
} from "../slices/userSlice"

export const userExtraReducers = (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(sendOtp.pending, state => {
        state.loading = true;
    });

    builder.addCase(sendOtp.fulfilled, state => {
        state.loading = false;
    });

    builder.addCase(sendOtp.rejected, state => {
        state.loading = false;
    });

    builder.addCase(verifyOtp.pending, state => {
        state.loading = true;
    });

    builder.addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
    });

    builder.addCase(verifyOtp.rejected, state => {
        state.loading = false;
    });



    builder.addCase(submitKyc.pending, state => {
        state.loading = true;
    });

    builder.addCase(submitKyc.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
    });

    builder.addCase(submitKyc.rejected, (state, action) => {
        state.loading = false;
    });

    builder.addCase(submitEmployment.pending, state => {
        state.loading = true;
    });

    builder.addCase(submitEmployment.fulfilled, (state, action) => {
        state.loading = false;
    });

    builder.addCase(submitEmployment.rejected, (state, action) => {
        state.loading = false;
    });


    builder.addCase(submitReference.pending, state => {
        state.loading = true;
    });

    builder.addCase(submitReference.fulfilled, (state, action) => {
        state.loading = false;
    });

    builder.addCase(submitReference.rejected, (state, action) => {
        state.loading = false;
    });



    builder.addCase(getLoanCalculation.pending, state => {
        state.loading = true;
    });

    builder.addCase(getLoanCalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.calculation = action.payload;
    });

    builder.addCase(getLoanCalculation.rejected, (state, action) => {
        state.loading = false;
    });



    builder.addCase(submitLoanDocuments.pending, state => {
        state.loading = true;
    });

    builder.addCase(submitLoanDocuments.fulfilled, (state, action) => {
        state.loading = false;
    });

    builder.addCase(submitLoanDocuments.rejected, (state, action) => {
        state.loading = false;
    });




    builder.addCase(getUserStatus.pending, state => {
        state.loading = true;
    });

    builder.addCase(getUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.userStatus = action.payload;
    });

    builder.addCase(getUserStatus.rejected, (state, action) => {
        state.loading = false;
    });


    builder.addCase(getLoanStatus.pending, state => {
        state.loading = true;
    });

    builder.addCase(getLoanStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.loanStatus = action.payload;
    });

    builder.addCase(getLoanStatus.rejected, (state, action) => {
        state.loading = false;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.userStatus = null;
    });
    builder.addCase(getUserDetail.fulfilled, (state, action) => {
        state.userDetail = action.payload;
    });
    builder.addCase(getBankFromIfsc.pending, (state) => {
        state.loading = true;
    });

    builder.addCase(getBankFromIfsc.fulfilled, (state, action) => {
        state.loading = false;
        state.bankDetails = action.payload;
    });

    builder.addCase(getBankFromIfsc.rejected, (state, action) => {
        state.loading = false;
        state.bankDetails = null;
    });



    builder.addCase(getAppliedLoans.pending, (state) => {
        state.appliedLoansLoading = true;   // start loader
    });

    builder.addCase(getAppliedLoans.fulfilled, (state, action) => {
        state.appliedLoansLoading = false;  // stop loader
        state.appliedLoans = action.payload;
    });

    builder.addCase(getAppliedLoans.rejected, (state, action) => {
        state.appliedLoansLoading = false;  // stop loader
        state.appliedLoans = [];
    });








    builder.addCase(getDigiLockerUrl.pending, state => {
        state.loading = true;
    });

    builder.addCase(getDigiLockerUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.digilockerData = action.payload;
    });

    builder.addCase(getDigiLockerUrl.rejected, (state, action) => {
        state.loading = false;
    });



    builder.addCase(getCurrentEmiOne.pending, (state) => {
        state.emiLoading = true;
    });

    builder.addCase(getCurrentEmiOne.fulfilled, (state, action) => {
        state.emiLoading = false;
        state.emiPaymentDetails = action.payload;
    });

    builder.addCase(getCurrentEmiOne.rejected, (state, action) => {
        state.emiLoading = false;
        state.emiPaymentDetails = null;
    });

    builder.addCase(getMandateDetails.pending, state => {
        state.loading = true;
    });

    builder.addCase(getMandateDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.mandateData = action.payload;
    });

    builder.addCase(getMandateDetails.rejected, (state, action) => {
        state.loading = false;
    });
    builder.addCase(getAppBanner.pending, (state) => {
        state.loading = true;
    });

    builder.addCase(getAppBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.bannerData = action.payload;
    });

    builder.addCase(getAppBanner.rejected, (state, action) => {
        state.loading = false;
    });

    builder.addCase(trackAppMessage.pending, (state) => {
        state.loading = true;
    });

    builder.addCase(trackAppMessage.fulfilled, (state, action) => {
        state.loading = false;
    });

    builder.addCase(trackAppMessage.rejected, (state, action) => {
        state.loading = false;
    });
    builder.addCase(saveFcmToken.pending, (state) => {
        state.loading = true;
    });

    builder.addCase(saveFcmToken.fulfilled, (state, action) => {
        state.loading = false;
    });

    builder.addCase(saveFcmToken.rejected, (state, action) => {
        state.loading = false;
    });


    // GET NOTIFICATIONS
    builder.addCase(getNotifications.pending, (state) => {
        state.notificationLoading = true;
    })

    builder.addCase(getNotifications.fulfilled, (state, action: any) => {

        state.notificationLoading = false;

        state.notifications = action.payload?.data || [];

        state.notificationCount =
            action.payload?.unread_count || 0;
    })

    builder.addCase(getNotifications.rejected, (state) => {
        state.notificationLoading = false;
    })


    // READ NOTIFICATION
    builder.addCase(readNotification.fulfilled, (state, action: any) => {

        const notificationId =
            action.meta.arg;

        state.notifications =
            state.notifications.map((item: any) => {

                if (item.id === notificationId) {

                    return {
                        ...item,
                        reed_status: 1,
                    };
                }

                return item;
            });

        state.notificationCount =
            state.notifications.filter(
                (item: any) => item.reed_status === 0
            ).length;
    })
}