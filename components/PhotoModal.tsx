import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { PhotoChoice } from "../interfaces";
// import { themes } from "../themes";

interface Props {
  show: boolean;
  onPress: (type: PhotoChoice) => void;
}

const PhotoModal = ({ show, onPress }: Props) => {
  return (
    <Modal transparent={true} visible={show} animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={() => onPress("GALLERY")}>
            <Text style={styles.buttonText}>Galerie</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPress("CAMERA")}>
            <Text style={styles.buttonText}>Caméra</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPress("CANCEL")}>
            <Text style={[styles.buttonText, { color: "red" }]}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PhotoModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#222222aa",
    padding: 50,
  },
  content: {
    backgroundColor: "#f4f4f4",
    borderRadius: 20,
    overflow: "hidden",
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
