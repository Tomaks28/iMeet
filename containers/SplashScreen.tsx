import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ActivityIndicator,
  AsyncStorage,
  Image,
  BackHandler,
} from "react-native";
import axios from "axios";
import { StoreContext, images } from "../store";
import { Alert } from "../components";

interface Props {
  navigation: any;
}

const SplashScreen = ({ navigation }: Props) => {
  const [modal, setModal] = useState({ show: false, text: "" });
  const { store, dispatch } = useContext(StoreContext);

  useEffect(() => {
    (async function () {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        axios
          .get(store.serverUrl + "/user", {
            headers: { Authorization: `Bearer ${token}` },
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
            navigation.navigate("HomeScreen");
          })
          .catch((error) => {
            navigation.navigate("SignInScreen");
          });
      } else {
        navigation.navigate("SignInScreen");
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={images.logo} />
      <ActivityIndicator />
      <Alert
        show={modal.show}
        text={modal.text}
        onPress={() => setModal({ show: false, text: "" })}
      />
    </View>
  );
};

export default SplashScreen;
