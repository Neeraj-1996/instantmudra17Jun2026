import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../home/HomeScreen";
import CustomDrawer from "./customDrawer/CustomDrawer";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerPosition: "right",
            }}
        >
            <Drawer.Screen name="HomeScreen" component={Home} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;