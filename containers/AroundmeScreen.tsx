import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { themes } from "../themes";
import { HeaderComponent } from "../components";

const AroundmeScreen = (props: any) => {
  return (
    <View>
      <HeaderComponent {...{ props, title: "Autour de moi" }} />
    </View>
  );
};

export default AroundmeScreen;

const styles = StyleSheet.create({
  centerComponent: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
});
