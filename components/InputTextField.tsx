import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Input } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import { themes } from "../store";

interface Props {
  value?: string;
  title: string;
  icon: string;
  onTextChange: (value: string) => void;
  onFocus?: () => void;
  errorMessage?: string;
  hidden?: boolean;
  setHidden?: () => void;
  margin?: number;
}

const InputTextField = (props: Props) => {
  return (
    <Input
      value={props.value}
      secureTextEntry={props.hidden}
      autoCapitalize="none"
      onFocus={() => {
        props.onFocus && props.onFocus();
      }}
      onChangeText={(value) => props.onTextChange(value)}
      errorMessage={props.errorMessage}
      errorStyle={{ color: themes.colorPrimary }}
      containerStyle={{
        marginTop: props.margin,
      }}
      label={props.title}
      labelStyle={{ color: "#ABB4BD", fontSize: 14, fontWeight: "400" }}
      inputContainerStyle={{
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 1,
      }}
      inputStyle={{
        paddingVertical: 12,
        color: "#1D2029",
        fontSize: 14,
      }}
      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
      leftIcon={{
        name: props.icon,
        color: "lightgrey",
      }}
      rightIcon={
        props.hidden !== undefined ? (
          <TouchableOpacity
            onPress={() => {
              props.setHidden && props.setHidden();
            }}
          >
            {/* Checking if the hidden password state */}
            {props.hidden ? (
              <Entypo name="eye-with-line" size={20} color="lightgrey" />
            ) : (
              <Entypo name="eye" size={20} color="lightgrey" />
            )}
          </TouchableOpacity>
        ) : (
          <></>
        )
      }
    />
  );
};

export default InputTextField;

const styles = StyleSheet.create({
  inputTitle: {
    color: "#ABB4BD",
    fontSize: 14,
  },
  input: {
    paddingVertical: 12,
    // color: "#1D2029",
    color: "yellow",
    fontSize: 14,
  },
});
