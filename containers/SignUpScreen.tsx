import React, { useState, useContext, useRef } from "react";
import { View, StyleSheet, Image, AsyncStorage } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { themes, images, StoreContext } from "../store";
import { HeaderComponent, InputTextField, Button, Alert } from "../components";
import { checkEmailFormat, checkPasswordFormat } from "../utilities";
import Axios from "axios";
import { getAxiosError } from "../utilities/";

const SignUpScreen = (props: any) => {
  // const ref = useRef<any>(null);
  const { store, dispatch } = useContext(StoreContext);
  const [modal, setModal] = useState({ show: false, text: "" });
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

  const handleSignUp = async () => {
    if (
      login.username &&
      checkEmailFormat(login.email) &&
      checkPasswordFormat(login.password1) &&
      checkPasswordFormat(login.password2) &&
      login.password1 === login.password2
    ) {
      const { username, email, password1 } = login;
      Axios.post(store.serverUrl + "/user/signup", {
        username,
        email,
        password: password1,
      })
        .then(async ({ data }) => {
          await AsyncStorage.setItem("email", data.email);
          await AsyncStorage.setItem("username", data.username);
          await AsyncStorage.setItem("token", data.token);
          dispatch({
            type: "USER_INFO",
            payload: {
              auth: true,
              email: data.email,
              token: data.token,
              username: data.username,
            },
          });
          setModal({
            show: true,
            text:
              "Votre compte a été créé avec success. Un email de confirmation vous a été envoyé. Merci de le confirmer",
          });
          props.navigation.navigate("HomeScreen");
        })
        .catch((error) => {
          setModal({
            show: true,
            text: getAxiosError(error),
          });
        });
    } else {
      setModal({ show: true, text: "Merci de rensigner tous les champs" });
    }
  };

  const handleUsername = (username: string) => {
    setLogin({ ...login, username });
  };

  const handleEmail = (email: string) => {
    if (checkEmailFormat(email)) {
      setLogin({ ...login, email, emailErrorMessage: "" });
    } else {
      setLogin({
        ...login,
        email,
        emailErrorMessage: themes.errorEmailMessage,
      });
    }
  };

  const handlePassword = (password: string) => {
    // let temp = { ...login };
    // console.log(new Date(), temp);
    // if (password) {
    //   temp.password1 = password;
    // } else {
    //   temp.password1 = "";
    //   temp.passwordErrorMessage = "";
    // }
    // if (checkPasswordFormat(password) && password) {
    //   temp.passwordErrorMessage = "";
    // } else {
    //   temp.passwordErrorMessage = themes.errorPasswordMessage;
    // }
    // if (password === temp.password2) {
    //   temp.passwordMatchErrorMessage = "";
    // } else {
    //   temp.passwordMatchErrorMessage = themes.errorMatchMessage;
    // }
    setLogin({ ...login, password1: password });
    // setLogin((prev) => {
    //   if (password) {
    //     prev.password1 = password;
    //     if (checkPasswordFormat(password)) {
    //       prev.passwordErrorMessage = "";
    //     } else {
    //       prev.passwordErrorMessage = themes.errorPasswordMessage;
    //     }
    //   } else {
    //     prev.password1 = "";
    //     prev.passwordErrorMessage = "";
    //   }
    //   if (password === prev.password2) {
    //     prev.passwordMatchErrorMessage = "";
    //   } else {
    //     prev.passwordMatchErrorMessage = themes.errorMatchMessage;
    //   }
    //   // return { ...prev };
    //   return prev;
    // });
  };

  const handlePasswordMatch = (password: string) => {
    if (password && login.password1 === password) {
      setLogin({
        ...login,
        password2: password,
        passwordMatchErrorMessage: "",
      });
    } else if (password) {
      setLogin({
        ...login,
        password2: password,
        passwordMatchErrorMessage: themes.errorMatchMessage,
      });
    } else {
      setLogin({
        ...login,
        password2: "",
        passwordMatchErrorMessage: "",
      });
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
          value={login.username}
          title="Username"
          icon="account-circle"
          onTextChange={(username) => {
            handleUsername(username);
          }}
          // valueChanged={(email: string) => handleLogin(email)}
          // errorMessage={login.emailErrorMessage}
        />
        <InputTextField
          value={login.email}
          title="Email"
          icon="mail"
          onTextChange={(email: string) => handleEmail(email)}
          errorMessage={login.emailErrorMessage}
        />
        <InputTextField
          value={login.password1}
          title="Password"
          icon="lock"
          onTextChange={(password) => {
            handlePassword(password);
          }}
          errorMessage={login.passwordErrorMessage}
          hidden={login.isHidden1}
          setHidden={() => setLogin({ ...login, isHidden1: !login.isHidden1 })}
        />
        <InputTextField
          value={login.password2}
          title="Password"
          icon="lock"
          onTextChange={(password) => {
            handlePasswordMatch(password);
          }}
          errorMessage={login.passwordMatchErrorMessage}
          hidden={login.isHidden2}
          setHidden={() => setLogin({ ...login, isHidden2: !login.isHidden2 })}
          // onFocus={() => {
          //   // ref.current.scroll.scrollToEnd();
          // }}
        />
        <Button text="Créer mon compte" onPress={handleSignUp} />
        <Alert
          show={modal.show}
          text={modal.text}
          onPress={() => setModal({ show: false, text: "" })}
        />
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
