import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { themes } from "../themes";
import { HeaderComponent } from "../components";

const ProfileScreen = (props: any) => {
  return (
    <View>
      <HeaderComponent {...{ props, title: "Profile" }} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  centerComponent: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
});
