import { useEffect, useState } from "react";
import { Keyboard, KeyboardEvent, Dimensions } from "react-native";

const useKeyboardHeight = (): any => {
  const [keyboardHeight, setKeyboardHeight] = useState(
    Dimensions.get("window").height
  );
  const [shown, setShown] = useState(false);

  const onKeyboardDidShow = (e: KeyboardEvent): void => {
    setKeyboardHeight(
      Dimensions.get("window").height - e.endCoordinates.height
    );
    setShown(true);
  };

  const onKeyboardDidHide = (): void => {
    setKeyboardHeight(Dimensions.get("window").height);
    setShown(false);
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
    Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);
    return (): void => {
      Keyboard.removeListener("keyboardDidShow", onKeyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", onKeyboardDidHide);
    };
  }, []);

  return { keyboardHeight, shown };
};

export default useKeyboardHeight;
