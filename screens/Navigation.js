import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./Home";
import Profile from "./Profile";

const Drawer = createDrawerNavigator();

const Navigation = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            drawerActiveBackgroundColor: "#cc7178",
            drawerActiveTintColor: "#efefef",
          }}
        >
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigation;
