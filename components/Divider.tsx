import React from "react";
import { View } from "react-native";

interface Props {
  size?: number;
  color?: string;
}

const Divider = ({ size = 1, color = "black" }: Props) => (
  <View
    style={{ flex: 1, borderBottomWidth: size, borderBottomColor: color }}
  />
);

export default Divider;
