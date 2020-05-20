import React, { useRef } from "react";
import { ScrollView, KeyboardAvoidingView } from "react-native";
import { useKeyboardHeight } from "../hooks";

const KeyBoardAvoidComponent = ({ children }: any) => {
  const ref = useRef<any>(null);
  const kbav = useRef<any>(null);
  const keyboard = useKeyboardHeight();
  console.log(keyboard);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      onLayout={(e) => {
        console.log(e.nativeEvent.layout);
      }}
    >
      <ScrollView
        style={{ flex: 1 }}
        // ref={ref}
        // onContentSizeChange={(contentWidth, contentHeight) => {
        //   if (ref) {
        //     ref.current.scrollTo({
        //       x: contentWidth,
        //       y: contentHeight,
        //       animated: true,
        //     });
        //   }
        // }}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyBoardAvoidComponent;
