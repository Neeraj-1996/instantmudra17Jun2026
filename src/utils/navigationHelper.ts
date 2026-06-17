export const handleUserNavigation = (navigation: any, status: any) => {

    if (status.loan_rejected === 1 && status.loan_status === 0) {
        navigation.replace("Home");
    }
    else if (status.loan_status === 1) {
        navigation.replace("Home");
    }
    else if (status.reference === 1) {
        navigation.replace("LoanScreen");
    }
    else if (status.employment === 1) {
        navigation.replace("RefScreen");
    }
    else if (status.kyc === 1) {
        navigation.replace("EmploymentScreen");
    }
    else {
        // navigation.replace("KycScreen");
        navigation.replace("InitialScreen");
    }
};