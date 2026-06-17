import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { Platform, Linking } from "react-native";
import NetInfo from "@react-native-community/netinfo";

import { store } from "./src/app/store";
import AppNavigator from "./src/navigation/AppNavigator";
import { navigationRef } from "./src/hooks/navigationService";
import { setupNotificationNavigation } from "./src/hooks/notificationHandler";
import NoInternetScreen from "./src/screens/noInternet/NoInternet";

const App = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    setupNotificationNavigation();

    const checkConnection = async () => {
      const state = await NetInfo.fetch();
      setIsConnected(state.isConnected === true);
    };

    checkConnection();

    const unsubscribe = NetInfo.addEventListener((state) => {
      const connected =
        state.isConnected === true &&
        (state.isInternetReachable === true ||
          state.isInternetReachable === null);

      setIsConnected(connected);
    });

    return () => unsubscribe();
  }, []);

  const handleRetry = async () => {
    const state = await NetInfo.fetch();
    setIsConnected(state.isConnected === true);
  };

  const handleOpenSettings = async () => {
    try {
      if (Platform.OS === "android") {
        await Linking.sendIntent("android.settings.WIFI_SETTINGS");
      } else {
        await Linking.openSettings();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isConnected === null) return null;

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        {!isConnected ? (
          <NoInternetScreen
            onRetry={handleRetry}
            onOpenSettings={handleOpenSettings}
          />
        ) : (
          <AppNavigator />
        )}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
// import React, { useEffect, useState } from "react";
// import { Provider } from "react-redux";
// import { NavigationContainer } from "@react-navigation/native";
// import { store } from "./src/app/store";
// import AppNavigator from "./src/navigation/AppNavigator";
// import { navigationRef } from "./src/hooks/navigationService";
// import { setupNotificationNavigation } from "./src/hooks/notificationHandler";
// import NoInternetScreen from "./src/screens/noInternet/NoInternet";

// const App = () => {
//   const [isConnected, setIsConnected] = useState<boolean | null>(null);

//   useEffect(() => {
//     setupNotificationNavigation();
//   }, []);

//   return (
//     <Provider store={store}>
//       <NavigationContainer ref={navigationRef}>
//         <AppNavigator />
//       </NavigationContainer>
//     </Provider>
//   );
// };

// export default App;

