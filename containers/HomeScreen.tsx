import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { themes } from "../store";
import { HeaderComponent, Button } from "../components";
import { StoreContext } from "../store";

const HomeScreen = (props: any) => {
  const context = useContext(StoreContext);
  // console.log("home", context.store);
  return (
    <View>
      <HeaderComponent {...{ props, title: "Home" }} />
      <Button
        text="test"
        onPress={() => {
          console.log(new Date(), context.store);
        }}
      ></Button>
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
