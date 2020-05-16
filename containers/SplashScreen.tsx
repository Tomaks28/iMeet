import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useTimer } from "../hooks";

interface Props {
  navigation: any;
}

// const SplashScreen = ({ navigation }: any) => {
const SplashScreen = ({ navigation }: Props) => {
  if (useTimer(1000)) {
    navigation.navigate("SignInScreen");
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
};

export default SplashScreen;
