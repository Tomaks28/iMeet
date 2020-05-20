import React, { useContext, useState } from "react";
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
import { StoreContext } from "../store";

// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const DiscussionScreen = (props: any) => {
  const keyboardHeight = useKeyboardHeight();
  const [message, setMessage] = useState("");
  // const chatHeight = new Animated.Value(Dimensions.get("window").height);
  const {
    store: { webSocketRef },
    dispatch,
  } = useContext(StoreContext);

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
              Platform.OS === "ios"
                ? themes.chatInputHeight * 4
                : themes.chatInputHeight * 5,
          }}
        />
      </KeyboardAvoidingView>

      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={themes.chatInputHeight * 2.2}
      >
        <View style={styles.inputSection}>
          <TextInput
            value={message}
            style={styles.input}
            placeholder="Message..."
            // multiline
            returnKeyType="send"
            onChangeText={(value) => {
              setMessage(value);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              webSocketRef && message && webSocketRef.send(message);
              setMessage("");
            }}
          >
            <Ionicons name="md-send" size={32} color={themes.colorPrimary} />
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
    height: themes.chatInputHeight,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    borderColor: themes.colorPrimary,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 0.95,
    borderColor: themes.colorPrimary,
    paddingHorizontal: 16,
    padding: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 25,
    fontSize: 16,
  },
});
