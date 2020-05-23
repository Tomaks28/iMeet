import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  AsyncStorage,
  BackHandler,
} from "react-native";
import axios from "axios";
import * as Facebook from "expo-facebook";
import Constants from "expo-constants";
import { Text } from "react-native-elements";
import { StoreContext } from "../store";
import { themes, header, images } from "../themes";
import {
  checkEmailFormat,
  checkPasswordFormat,
  getAxiosError,
} from "../utilities";

import { Api_signIn, Api_facebookLogin } from "../services/Api";

import { InputTextField, Button, Alert } from "../components";
import { SocialButton } from "../components";

interface Login {
  email: string;
  password: string;
}

const SignInScreen = (props: any) => {
  const { store, dispatch } = useContext(StoreContext);
  const [modal, setModal] = useState({ show: false, text: "" });
  const [login, setLogin] = useState({
    email: "",
    password: "",
    isHidden: true,
    emailErrorMessage: "",
    passwordErrorMessage: "",
  });

  // Retrieve user info from mobile memory
  useEffect(() => {
    (async function () {
      const email = await AsyncStorage.getItem("email");
      if (email) {
        setLogin({ ...login, email });
      }
    })();
  }, []);

  const handleLogin = (value: string) => {
    if (checkEmailFormat(value)) {
      setLogin({ ...login, email: value, emailErrorMessage: "" });
    } else {
      setLogin({
        ...login,
        email: value,
        emailErrorMessage: themes.errorEmailMessage,
      });
    }
  };

  const handlePassword = (value: string) => {
    if (checkPasswordFormat(value)) {
      setLogin({ ...login, password: value, passwordErrorMessage: "" });
    } else {
      setLogin({
        ...login,
        password: value,
        passwordErrorMessage: themes.errorPasswordMessage,
      });
    }
  };

  //   Toggle password visibility
  const handleChangeHidden = () => {
    setLogin({ ...login, isHidden: !login.isHidden });
  };

  //   Check if connection login info are filled
  const handleConnection = () => {
    //   Check if email and password format are correct
    if (checkEmailFormat(login.email) && checkPasswordFormat(login.password)) {
      axios
        .post(store.serverUrl + "/user/signin", {
          email: login.email,
          password: login.password,
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
          props.navigation.navigate("HomeScreen");
        })
        .catch((error) => {
          setModal({
            show: true,
            text: getAxiosError(error),
          });
          // BackHandler.exitApp();
        });
      //   const token = Api_SignIn();
    } else {
      setModal({
        show: true,
        text: "Saisissez vos identifiants",
      });
    }
  };

  // function called when facebook connection button is pressed
  const connectFacebook = async () => {
    try {
      await Facebook.initializeAsync(store.facebookAppID);
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      }: any = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const data = await Api_facebookLogin(token);
        console.log(data);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      console.log(message);
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const connectGoogle = () => {
    console.log("google");
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Image style={styles.logo} source={images.logo} />
        </View>

        <InputTextField
          value={login.email}
          title="Email"
          icon="mail"
          onTextChange={(email: string) => handleLogin(email)}
          errorMessage={login.emailErrorMessage}
        />
        <InputTextField
          title="Mot de passe"
          icon="lock"
          onTextChange={(password: string) => handlePassword(password)}
          errorMessage={login.passwordErrorMessage}
          hidden={login.isHidden}
          setHidden={handleChangeHidden}
        />

        <TouchableOpacity
          onPress={() => props.navigation.navigate("RecoveryScreen")}
        >
          <Text style={[styles.text, styles.link, { textAlign: "right" }]}>
            Mot de passe oublié?
          </Text>
        </TouchableOpacity>

        <Button text="Se connecter" onPress={handleConnection} />

        <View style={[styles.socialContainer, { marginTop: 24 }]}>
          <Text style={[styles.text, styles.signupQuestion]}>
            Vous n'avez de compte?
          </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("SignUpScreen")}
          >
            <Text style={[styles.text, styles.link]}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={[
          styles.text,
          {
            color: "#ABB4BD",
            fontSize: 15,
            textAlign: "center",
            // marginVertical: 10,
          },
        ]}
      >
        ou
      </Text>
      <View style={styles.socialContainer}>
        <SocialButton type="facebook" onPress={connectFacebook} />
        <SocialButton type="google" onPress={connectGoogle} />
      </View>
      <Alert
        show={modal.show}
        text={modal.text}
        onPress={() => setModal({ show: false, text: "" })}
      />
    </ScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 30,
  },
  header: {
    paddingTop:
      Platform.OS === "ios" ? Constants.statusBarHeight : header.paddingTop,

    paddingBottom: 20,
  },
  logo: {
    height: 150,
    width: 150,
    alignSelf: "center",
  },
  text: {
    color: themes.colorPrimary,
  },
  signupQuestion: {
    fontSize: 14,
    color: "#ABB4BD",
    textAlign: "center",
    marginRight: 10,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  link: {
    color: themes.colorPrimary,
    fontSize: 14,
    fontWeight: "500",
  },
});
