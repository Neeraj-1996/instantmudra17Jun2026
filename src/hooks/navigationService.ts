import { createNavigationContainerRef } from "@react-navigation/native";

export type RootStackParamList = {
    NotificationScreen: undefined;
};

export const navigationRef =
    createNavigationContainerRef<RootStackParamList>();

export function navigate(
    name: keyof RootStackParamList,
    params?: undefined
) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}