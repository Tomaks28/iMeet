import React, { useReducer } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { themes, initialStore, reducer, StoreContext } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { RealTimeManager } from "./services";

import {
  HomeScreen,
  SplashScreen,
  DrawerScreen,
  ProfileScreen,
  DiscoverScreen,
  FavoriteScreen,
  MessagesScreen,
  SearchScreen,
  AroundmeScreen,
  SignInScreen,
  SignUpScreen,
  ChatScreen,
} from "./containers";

const Drawer = createDrawerNavigator();

const App = () => {
  // Global State Management
  const [store, dispatch] = useReducer(reducer, initialStore);

  // Real Time WebSocket Manager
  RealTimeManager(store, dispatch);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      <NavigationContainer>
        <StatusBar
          backgroundColor={themes.colorPrimary}
          barStyle="dark-content"
        />
        <Drawer.Navigator
          initialRouteName="SplashScreen"
          drawerContent={DrawerScreen}
        >
          <Drawer.Screen name="SplashScreen" component={SplashScreen} />
          <Drawer.Screen name="SignInScreen" component={SignInScreen} />
          <Drawer.Screen name="SignUpScreen" component={SignUpScreen} />
          <Drawer.Screen name="HomeScreen" component={HomeScreen} />
          <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
          <Drawer.Screen name="DiscoverScreen" component={DiscoverScreen} />
          <Drawer.Screen name="FavoriteScreen" component={FavoriteScreen} />
          <Drawer.Screen name="SearchScreen" component={SearchScreen} />
          <Drawer.Screen name="MessagesScreen" component={MessagesScreen} />
          <Drawer.Screen name="AroundmeScreen" component={AroundmeScreen} />
          <Drawer.Screen name="ChatScreen" component={ChatScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </StoreContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
