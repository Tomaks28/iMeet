import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { themes } from "../store";
import { HeaderComponent } from "../components";

const SignUpScreen = (props: any) => {
  return (
    <View>
      <HeaderComponent {...{ props, title: "SignUp" }} />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  centerComponent: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
});
