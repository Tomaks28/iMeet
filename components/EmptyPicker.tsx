import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { themes } from "../themes";

const EmptyPicker = () => {
  return (
    <View
      style={{
        backgroundColor: "lightgrey",
        borderRadius: 15,
        height: 400,
        width: 300,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialIcons name="photo-library" size={100} color="white" />
    </View>
  );
};

export default EmptyPicker;
