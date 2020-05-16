import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

interface Props {
  type: string;
  onPress: () => void;
}

const SocialButton = (props: Props) => {
  return (
    <TouchableOpacity
      style={styles.socialButton}
      onPress={() => (props.onPress ? props.onPress() : null)}
    >
      <Image
        source={
          props.type.toLowerCase() === "google"
            ? require("../assets/google.png")
            : require("../assets/facebook.png")
        }
        style={styles.socialLogo}
      />
      <Text style={styles.text}>
        {props.type.charAt(0).toUpperCase() + props.type.substring(1)}
      </Text>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  socialButton: {
    flexDirection: "row",
    marginHorizontal: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(171, 180, 189, 0.65)",
    borderRadius: 4,
    backgroundColor: "#fff",
    shadowColor: "rgba(171, 180, 189, 0.35)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  socialLogo: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  text: {
    color: "#1D2029",
  },
});
