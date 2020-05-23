import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Animated,
  Easing,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Text, Image } from "react-native-elements";
import { themes } from "../themes";

interface Props {
  title?: string;
  data?: Array<any>;
  children?: React.ReactNode;
  expanded?: boolean;
}

const Panel = ({ title, data, children }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const rotation = new Animated.Value(0);

  // useEffect(() => {
  // First set up animation
  Animated.timing(rotation, {
    toValue: 1,
    duration: 300,
    easing: Easing.ease,
    useNativeDriver: true, // To make use of native driver for performance
  }).start();
  // }, [isExpanded]);

  // Second interpolate beginning and end values (in this case 0 and 1)
  const expand = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-90deg"],
  });

  const collapse = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["-90deg", "0deg"],
  });

  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            setIsExpanded((prev) => !prev);
          }}
        >
          <Animated.View
            style={[
              styles.chevron,
              { transform: [{ rotate: isExpanded ? expand : collapse }] },
            ]}
          >
            <Entypo name="chevron-left" size={20} color={themes.colorPrimary} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.body}>{isExpanded && children}</View>
    </View>
  );
};

export default Panel;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    margin: 10,
    overflow: "hidden",
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flex: 1,
    padding: 10,
    color: themes.colorDarkFont,
    fontWeight: "bold",
    fontSize: 16,
  },
  body: {
    padding: 0,
  },
  chevron: {
    marginRight: 10,
  },
});
