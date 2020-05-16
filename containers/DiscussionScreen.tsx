import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { themes } from "../store";
import { useKeyboardHeight } from "../hooks";

import { BubbleList } from "../test";

// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const INPUT_HEIGHT = 60;

const DiscussionScreen = (props: any) => {
  const { keyboardHeight, shown } = useKeyboardHeight();
  const chatHeight = new Animated.Value(Dimensions.get("window").height);

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FlatList
          inverted
          style={{ height: keyboardHeight }}
          data={BubbleList}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => item.component}
          contentContainerStyle={{
            paddingTop:
              Platform.OS === "ios" ? INPUT_HEIGHT * 4 : INPUT_HEIGHT * 5,
          }}
        />
      </KeyboardAvoidingView>

      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={INPUT_HEIGHT * 2.2}
      >
        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder="Message..."
            // multiline
            returnKeyType="send"
          />
          <TouchableOpacity
            onPress={() => {
              console.log("send message");
            }}
          >
            <Ionicons name="md-send" size={32} color={themes.primaryColor} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default DiscussionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 80,
  },
  avoidingView: { position: "absolute", bottom: 0, left: 0, right: 0 },
  inputSection: {
    height: INPUT_HEIGHT,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    borderColor: themes.primaryColor,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 0.95,
    borderColor: themes.primaryColor,
    paddingHorizontal: 16,
    padding: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 25,
    fontSize: 16,
  },
});
