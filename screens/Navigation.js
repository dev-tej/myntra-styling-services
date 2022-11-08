import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  createDrawerNavigator,
  // DrawerContentScrollView,
  // DrawerItemList,
} from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./Home";
import Profile from "./Profile";
import Login from "./Login";
import BookSession from "./Home/BookSession";
import {
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";
import { logout } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

const Navigation = () => {
  const navigation = useNavigation();

  const [getNumber, setGetNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const getLoggedInData = async () => {
    const value = await AsyncStorage.getItem("appLoggedNumber");
    setGetNumber(JSON.parse(value));
  };

  useEffect(() => {
    getLoggedInData();
  }, []);

  useEffect(() => {
    if (getNumber === undefined || getNumber === null) {
      navigation.navigate("Login");
    } else {
      navigation.navigate("Home");
    }
  }, []);

  async function handleLogOut() {
    setLoading(true);
    try {
      logout();
      navigation.navigate("Login");
      await AsyncStorage.clear();
    } catch {
      alert("Something went wrong :(");
    }
    setLoading(false);
  }

  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={"large"} color="#89023e" />
    </View>
  ) : (
    <SafeAreaProvider>
      <Drawer.Navigator
        // initialRouteName="Home"
        screenOptions={{
          drawerActiveBackgroundColor: "#cc7178",
          drawerActiveTintColor: "#efefef",
          // drawerHideStatusBarOnOpen: true,
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => handleLogOut()}>
                <Image
                  source={require("./images/LogOut.png")}
                  style={{ marginRight: 20 }}
                />
              </TouchableOpacity>
            );
          },
        }}
        // drawerContent={(props) => {
        //   const filteredProps = {
        //     ...props,
        //     state: {
        //       ...props.state,
        //       routeNames: props.state.routeNames.filter((routeName) => {
        //         routeName !== "Login";
        //       }),
        //       routes: props.state.routes.filter(
        //         (route) => route.name !== "Login"
        //       ),
        //     },
        //   };
        //   return (
        //     <View style={{ flex: 1 }}>
        //       <DrawerContentScrollView {...filteredProps}>
        //         <DrawerItemList {...filteredProps} />
        //       </DrawerContentScrollView>
        //     </View>
        //   );
        // }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen
          options={{
            drawerItemStyle: { height: 0 },
            title: "Book Session",
          }}
          name="BookSession"
          component={BookSession}
        />
        <Drawer.Screen
          options={{
            headerShown: false,
            drawerItemStyle: { height: 0 },
          }}
          name="Login"
          component={Login}
        />
      </Drawer.Navigator>
    </SafeAreaProvider>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
