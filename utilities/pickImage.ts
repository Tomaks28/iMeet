import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export const pickImage = async () => {
  const { status: cameraRollPerm } = await Permissions.askAsync(
    Permissions.CAMERA_ROLL
  );
  // only if user allows permission to camera roll
  if (cameraRollPerm === "granted") {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!pickerResult.cancelled) {
      return pickerResult.uri;
    }
    return null;
  }
};
