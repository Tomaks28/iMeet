import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Text } from "react-native-elements";
import { themes } from "../themes";

interface Props {
  show: boolean;
  text: string;
  onPress: () => void;
}

const Alert = ({ show, onPress, text }: Props) => {
  return (
    <Modal transparent={true} visible={show} animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          <ScrollView style={styles.box}>
            <Text style={styles.title}>Alert</Text>
            <Text style={styles.text}>{text}</Text>
          </ScrollView>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Alert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#222222aa",
    padding: 50,
  },
  content: {
    backgroundColor: "#f4f4f4",
    borderRadius: 20,
    overflow: "hidden",
  },
  box: {
    backgroundColor: "transparent",
    // minHeight: 300,
    paddingHorizontal: 20,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  title: {
    textAlign: "center",
    fontSize: themes.textFontSize,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  text: {
    fontSize: 13,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    paddingVertical: 10,
    color: "blue",
    backgroundColor: "transparent",
  },
});
