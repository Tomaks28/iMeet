import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";

import { themes } from "../themes";

interface Props {
  text: string;
  onPress: () => void;
}

const Button = ({ text, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.submitContainer} onPress={onPress}>
      <Text style={[styles.text, styles.connectText]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  submitContainer: {
    backgroundColor: themes.colorPrimary,
    fontSize: themes.textFontSize,
    borderRadius: 4,
    paddingVertical: 12,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    color: "#FFF",
    shadowColor: "rgba(255, 22, 84, 0.24)",
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
    // width: "100%", //Need to specify this for android
  },
  text: {
    color: themes.colorPrimary,
  },
  connectText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: themes.textFontSize,
  },
});
