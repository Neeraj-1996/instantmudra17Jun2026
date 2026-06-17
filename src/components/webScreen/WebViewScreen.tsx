import React from "react";
import { View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import Header from "../../components/header/Header";
import { SafeAreaView } from "react-native-safe-area-context";
const WebViewScreen = ({ route, navigation }: any) => {
    const { url, title } = route.params;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title={title} navigation={navigation} />

            <View style={{ flex: 1 }}>
                <WebView
                    source={{ uri: url }}
                    startInLoadingState={true}
                    renderLoading={() => (
                        <ActivityIndicator
                            size="large"
                            style={{ flex: 1 }}
                        />
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default WebViewScreen;
// import React from "react";
// import { View, ActivityIndicator } from "react-native";
// import { WebView } from "react-native-webview";
// import Header from "../../components/header/Header";

// const WebViewScreen = ({ route, navigation }: any) => {
//     const { url, title } = route.params;

//     return (
//         <View style={{ flex: 1 }}>
//             <Header title={title} navigation={navigation} />

//             <WebView
//                 source={{ uri: url }}
//                 startInLoadingState={true}
//                 renderLoading={() => (
//                     <ActivityIndicator
//                         size="large"
//                         style={{ flex: 1 }}
//                     />
//                 )}
//             />
//         </View>
//     );

// };

// export default WebViewScreen;