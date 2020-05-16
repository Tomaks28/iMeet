import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { themes } from "../store";
import { HeaderComponent } from "../components";

const DiscoverScreen = (props: any) => {
  return (
    <View>
      <HeaderComponent {...{ props, title: "Discover" }} />
    </View>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  centerComponent: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
});
