import React from "react";
import { View, StyleSheet } from "react-native";
import { HeaderComponent } from "../components";
import { HeaderType } from "../interfaces";

interface Props {
  props: any;
  name: string;
}

const MatchScreen = (props: Props) => {
  return (
    <View>
      <HeaderComponent {...{ props }} title={props.name} type="hide" />
    </View>
  );
};

export default MatchScreen;

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
