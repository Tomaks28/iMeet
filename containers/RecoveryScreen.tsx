import React, { useState, useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text } from "react-native-elements";
import { themes, images, StoreContext } from "../store";
import { HeaderComponent, InputTextField, Button, Alert } from "../components";
import { checkEmailFormat } from "../utilities";
import Axios from "axios";

const RecoveryScreen = (props: any) => {
  // const ref = useRef<any>(null);
  const { store, dispatch } = useContext(StoreContext);
  const [modal, setModal] = useState({ show: false, text: "" });
  const [email, setEmail] = useState("thomas.aksogut@gmail.com");

  const handleRecover = () => {
    if (checkEmailFormat(email)) {
      Axios.post(store.serverUrl + "user/reset", {
        email,
      })
        .then(async ({ data }) => {
          props.navigation.navigate("SignInScreen");
          setModal({ show: true, text: data.message });
        })
        .catch((error) => {
          setModal({ show: true, text: error.response.data.message });
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
          value={email}
          title="Email"
          icon="mail"
          onTextChange={(email: string) => setEmail(email)}
          // errorMessage={login.emailErrorMessage}
        />
        <Text style={styles.text}>
          Saisissez l'adresse email de votre compte afin de recevoir des
          instructions pour réinitialiser votre mot de passe.
        </Text>
        <Button text="Confirmer" onPress={handleRecover} />
        <Alert
          show={modal.show}
          text={modal.text}
          onPress={() => setModal({ show: false, text: "" })}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RecoveryScreen;

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
  text: {
    textAlign: "justify",
    fontSize: 12,
    paddingHorizontal: 10,
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: "center",
  },
});
