import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import * as Facebook from "expo-facebook";
import Constants from "expo-constants";
import { Text } from "react-native-elements";
import { themes } from "../store";

import { Api_signIn, Api_facebookLogin } from "../services/Api";

import InputTextField from "../components/InputTextField";
import SocialButton from "../components/SocialButton";

interface Login {
  email: string;
  password: string;
}

const SignInScreen = (props: any) => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
    isHidden: true,
    emailErrorMessage: "",
    passwordErrorMessage: "",
  });

  const handleLogin = (value: string) => {
    if (checkEmailFormat(value)) {
      setLogin({ ...login, email: value, emailErrorMessage: "" });
    } else {
      setLogin({
        ...login,
        email: value,
        emailErrorMessage: "Adresse email incorrect",
      });
    }
  };

  const checkEmailFormat = (email: string) => {
    if (
      email !== "" &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handlePassword = (value: string) => {
    if (checkPasswordFormat(value)) {
      setLogin({ ...login, password: value, passwordErrorMessage: "" });
    } else {
      setLogin({
        ...login,
        password: value,
        passwordErrorMessage:
          "1 caractère spécial, 1 chiffre, une lettre et compris entre 7-15 caractères",
      });
    }
  };

  //   To check a password between 7 to 15 characters which contain at least one numeric digit and a special character
  const checkPasswordFormat = (password: string) => {
    var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (password.match(paswd)) {
      return true;
    } else {
      return false;
    }
  };

  //   Toggle password visibility
  const handleChangeHidden = () => {
    setLogin({ ...login, isHidden: !login.isHidden });
  };

  //   Check if connection login info are filled
  const handleConnection = (login: Login) => {
    //   Check if email and password format are correct
    if (checkEmailFormat(login.email) && checkPasswordFormat(login.password)) {
      //   const token = Api_SignIn();
    } else {
    }
  };

  // function called when facebook connection button is pressed
  const connectFacebook = async () => {
    try {
      await Facebook.initializeAsync("1234567890"); //TODO Facebook ID
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
        <View
          style={{
            paddingTop: Constants.statusBarHeight,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ height: 150, width: 150 }}
            source={require("../assets/logo/logo.jpg")}
          />
          <Text style={[styles.text, styles.title]}>iMeet</Text>
        </View>

        <InputTextField
          title="Email"
          icon="mail"
          valueChanged={(email: string) => handleLogin(email)}
          errorMessage={login.emailErrorMessage}
        />
        <InputTextField
          title="Mot de passe"
          icon="lock"
          valueChanged={(password: string) => handlePassword(password)}
          errorMessage={login.passwordErrorMessage}
          hidden={login.isHidden}
          setHidden={handleChangeHidden}
        />

        <TouchableOpacity
          onPress={() => props.navigation.navigate("AccountRecoveryScreen")}
        >
          <Text style={[styles.text, styles.link, { textAlign: "right" }]}>
            Mot de passe oublié?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitContainer}
          // onPress={() => handleConnection(login)}//TODO
          onPress={() => props.navigation.navigate("HomeScreen")}
        >
          <Text style={[styles.text, styles.connectText]}>Se connecter</Text>
        </TouchableOpacity>

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
    </ScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    paddingBottom: 10,
    backgroundColor: "white",
    paddingHorizontal: 30,
  },
  title: {
    marginTop: "5%",
    fontSize: 22,
    fontWeight: "500",
    marginBottom: "5%",
  },
  text: {
    color: "#1D2029",
  },
  signupQuestion: {
    fontSize: 14,
    color: "#ABB4BD",
    textAlign: "center",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  connectText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  link: {
    color: themes.primaryColor,
    fontSize: 14,
    fontWeight: "500",
  },
  submitContainer: {
    backgroundColor: themes.primaryColor,
    fontSize: 16,
    borderRadius: 4,
    paddingVertical: 12,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    color: "#FFF",
    shadowColor: "rgba(255, 22, 84, 0.24)",
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
});
