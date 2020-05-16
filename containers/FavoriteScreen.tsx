import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { themes } from "../store";
import { HeaderComponent } from "../components";

const FavoriteScreen = (props: any) => {
  return (
    <View>
      <HeaderComponent {...{ props, title: "Favoris" }} />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  centerComponent: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
});
