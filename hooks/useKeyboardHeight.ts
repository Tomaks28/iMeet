import { useEffect, useState } from "react";
import { Keyboard, KeyboardEvent, Dimensions } from "react-native";

const useKeyboardHeight = (): any => {
  const [keyboard, setKeyboard] = useState({
    show: false,
    height: 0,
  });

  const onKeyboardDidShow = (e: KeyboardEvent): void => {
    setKeyboard({
      show: true,
      height: Dimensions.get("window").height - e.endCoordinates.height,
    });
  };

  const onKeyboardDidHide = (): void => {
    setKeyboard({ show: false, height: 0 });
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
    Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);
    return (): void => {
      Keyboard.removeListener("keyboardDidShow", onKeyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", onKeyboardDidHide);
    };
  }, []);

  return keyboard;
};

export default useKeyboardHeight;
