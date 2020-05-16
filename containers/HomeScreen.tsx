import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { themes } from "../store";
import { HeaderComponent } from "../components";
// import { StoreContext } from "../App";

const HomeScreen = (props: any) => {
  // const context = useContext(StoreContext);
  return (
    <View>
      <HeaderComponent {...{ props, title: "Discover" }} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  centerComponent: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
});
