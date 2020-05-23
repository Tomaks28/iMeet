import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { themes } from "../themes";
import DiscussionScreen from "../containers/DiscussionScreen";
import MatchScreen from "../containers/MatchScreen";
import { HeaderComponent } from "../components";

const Tab = createMaterialTopTabNavigator();

const ChatScreen = (props: any) => {
  const { id, name } = props.route.params;

  return (
    <View style={styles.container}>
      <HeaderComponent {...{ props, title: name, type: "back" }} />
      <View style={{ flex: 1 }}>
        <NavigationContainer independent={true}>
          <Tab.Navigator
            tabBarOptions={{
              labelStyle: {
                textTransform: "capitalize",
                fontSize: 16,
                color: themes.colorPrimary,
              },
              indicatorStyle: {
                backgroundColor: themes.colorPrimary,
              },
              // backBehavior = "",
            }}
          >
            <Tab.Screen name="Discussion" component={DiscussionScreen} />
            <Tab.Screen name="Profil" component={MatchScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  centerComponent: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
});
