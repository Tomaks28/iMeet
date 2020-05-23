import React, { useState, useCallback } from "react";
import {
  ActivityIndicator,
  Clipboard,
  Share,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Image, Text, Icon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { HeaderComponent, Button, EmptyPicker } from "../components";
import { themes } from "../themes";

const PictureScreen = (props: any) => {
  const [image, setImage] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const handleImagePicked = useCallback((pickerResult) => {
    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
    }
  }, []);

  const takePhoto = useCallback(async () => {
    const { status: cameraPerm } = await Permissions.askAsync(
      Permissions.CAMERA
    );
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    // only if user allows permission to camera AND camera roll
    if (cameraPerm === "granted" && cameraRollPerm === "granted") {
      const pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      handleImagePicked(pickerResult);
    }
  }, []);

  const pickImage = useCallback(async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    // only if user allows permission to camera roll
    if (cameraRollPerm === "granted") {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      handleImagePicked(pickerResult);
    }
  }, []);

  return (
    <View style={styles.container}>
      <HeaderComponent {...{ props, title: "Picture", type: "strict-back" }} />
      <Text style={styles.text}>
        Pour finir, télécharger votre photo. Elle doit être nette et montrer
        votre visage, sans lunettes de soleil.
      </Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {image ? (
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        ) : (
          <EmptyPicker />
        )}
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.icon}>
            <FontAwesome name="photo" size={48} color={themes.colorPrimary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto} style={styles.icon}>
            <FontAwesome name="camera" size={48} color={themes.colorPrimary} />
          </TouchableOpacity>
        </View>
      </View>
      {/* {uploading && (
        <View style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      )} */}
    </View>
  );
};

export default PictureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: "row",
    padding: 20,
  },
  icon: {
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 16,
    marginTop: 50,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: "center",
    color: themes.colorDarkFont,
  },
  maybeRenderUploading: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 250,
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: "hidden",
  },
  maybeRenderImage: {
    height: 400,
    width: 300,
    borderRadius: 15,
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
