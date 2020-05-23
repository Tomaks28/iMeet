import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { themes } from "../themes";
import { HeaderComponent } from "../components";

const SearchScreen = (props: any) => {
  return (
    <View>
      <HeaderComponent {...{ props, title: "Search" }} />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  centerComponent: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
});
