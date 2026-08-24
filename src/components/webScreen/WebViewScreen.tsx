import React, { useState } from "react";
import {
    View,
    ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import Header from "../../components/header/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const WebViewScreen = ({ route, navigation }: any) => {
    const {
        url,
        title,
        fromPayment = false,
        loanData,
        showPayButton,
    } = route.params || {};

    const [paymentCompleted, setPaymentCompleted] =
        useState(false);

    const handleNavigationStateChange = (event: any) => {
        const currentUrl = event?.url || "";

        console.log(
            "WebView Current URL:",
            currentUrl
        );

        console.log(
            "From Payment:",
            fromPayment
        );

        // ==========================================
        // PAYMENT SUCCESS
        // ==========================================

        if (
            fromPayment &&
            currentUrl.includes(
                "/admin/icici-callback-transaction-response"
            )
        ) {
            console.log("✅ PAYMENT SUCCESS");

            if (paymentCompleted) {
                return;
            }

            setPaymentCompleted(true);

            // Go back to the loan screen flow after successful payment
            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: "LoanScreen",
                    },
                ],
            });

            return;
        }

        // ==========================================
        // PAYMENT FAILED
        // ==========================================

        if (
            fromPayment &&
            currentUrl.includes(
                "/admin/icici-callback-transaction-failed"
            )
        ) {
            console.log("❌ PAYMENT FAILED");

            // Go back to LoanDetailsActive with the same params
            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: "LoanDetailsActive",
                        params: {
                            loanData,
                            showPayButton,
                        },
                    },
                ],
            });

            return;
        }
    };

    return (
        <View style={{ flex: 1 }}>

            <Header
                title={title}
                navigation={navigation}
                showBack={title !== "Pay EMI"}
            />

            <View style={{ flex: 1 }}>

                <WebView
                    source={{ uri: url }}

                    startInLoadingState={true}

                    onNavigationStateChange={
                        handleNavigationStateChange
                    }

                    renderLoading={() => (
                        <ActivityIndicator
                            size="large"
                            style={{
                                flex: 1,
                            }}
                        />
                    )}

                    javaScriptEnabled={true}

                    domStorageEnabled={true}

                    originWhitelist={["*"]}
                />

            </View>

        </View>
    );
};

export default WebViewScreen;

// import React from "react";
// import { View, ActivityIndicator } from "react-native";
// import { WebView } from "react-native-webview";
// import Header from "../../components/header/Header";
// import { SafeAreaView } from "react-native-safe-area-context";
// const WebViewScreen = ({ route, navigation }: any) => {
//     const { url, title } = route.params;

//     return (
//         <SafeAreaView style={{ flex: 1 }}>
//             <Header title={title} navigation={navigation} />

//             <View style={{ flex: 1 }}>
//                 <WebView
//                     source={{ uri: url }}
//                     startInLoadingState={true}
//                     renderLoading={() => (
//                         <ActivityIndicator
//                             size="large"
//                             style={{ flex: 1 }}
//                         />
//                     )}
//                 />
//             </View>
//         </SafeAreaView>
//     );
// };

// export default WebViewScreen;
