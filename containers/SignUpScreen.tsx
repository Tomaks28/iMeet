import React, { useState, useContext, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { themes, header, images } from "../store";
import { HeaderComponent, InputTextField, Button } from "../components";
import { checkEmailFormat, checkPasswordFormat } from "../utilities";

const SignUpScreen = (props: any) => {
  const ref = useRef<any>(null);

  const [login, setLogin] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    isHidden1: true,
    isHidden2: true,
    emailErrorMessage: "",
    passwordErrorMessage: "",
    passwordMatchErrorMessage: "",
  });

  const handleLogin = () => {
    if (
      login.username &&
      checkEmailFormat(login.email) &&
      checkPasswordFormat(login.password1) &&
      checkPasswordFormat(login.password2) &&
      login.password1 === login.password2
    ) {
      console.log("login");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderComponent
        {...{ props, title: "Inscription", type: "strict-back" }}
      />
      <View style={styles.header}>
        <Image style={styles.logo} source={images.logo} />
      </View>
      <KeyboardAwareScrollView
        innerRef={(ref) => (ref = ref)}
        style={styles.container}
      >
        <InputTextField
          title="Username"
          icon="account-circle"
          onTextChange={() => {}}
          // valueChanged={(email: string) => handleLogin(email)}
          // errorMessage={login.emailErrorMessage}
        />
        <InputTextField
          title="Email"
          icon="mail"
          onTextChange={() => {}}
          // valueChanged={(email: string) => handleLogin(email)}
          // errorMessage={login.emailErrorMessage}
        />
        <InputTextField
          title="Password"
          icon="lock"
          onTextChange={() => {}}
          // valueChanged={(email: string) => handleLogin(email)}
          // errorMessage={login.emailErrorMessage}
        />
        <InputTextField
          title="Password"
          icon="lock"
          onTextChange={() => {}}
          onFocus={() => {
            console.log("focus");
            // ref.current.scroll.scrollToEnd();
          }}
          // valueChanged={(email: string) => handleLogin(email)}
          // errorMessage={login.emailErrorMessage}
        />

        <Button text="Créer mon compte" onPress={handleLogin} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "white",
    marginBottom: 10,
    paddingHorizontal: 30,
  },
  header: {
    paddingBottom: 20,
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: "center",
  },
});
