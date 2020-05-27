import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export const takePhoto = async () => {
  const { status: cameraPerm } = await Permissions.askAsync(Permissions.CAMERA);
  const { status: cameraRollPerm } = await Permissions.askAsync(
    Permissions.CAMERA_ROLL
  );
  // only if user allows permission to camera AND camera roll
  if (cameraPerm === "granted" && cameraRollPerm === "granted") {
    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!pickerResult.cancelled) {
      return pickerResult.uri;
    }
    return null;
  }
};
