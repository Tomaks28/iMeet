import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  AsyncStorage,
  Image,
  BackHandler,
} from "react-native";
import axios from "axios";
import { useTimer } from "../hooks";
import { StoreContext, images } from "../store";

interface Props {
  navigation: any;
}

const SplashScreen = ({ navigation }: Props) => {
  const { store } = useContext(StoreContext);
  useEffect(() => {
    (async function () {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          axios
            .get(store.serverUrl + "user", {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(({ data }) => {
              console.log("sucess");
              navigation.navigate("HomeScreen");
            })
            .catch((error) => {
              console.log(error);
              navigation.navigate("SignInScreen");
            });
        } else {
          navigation.navigate("SignInScreen");
        }
      } catch (err) {
        alert("Server Error");
        BackHandler.exitApp();
      }
    })();
  }, []);

  // if (useTimer(1000)) {
  // }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={images.logo} />
      <ActivityIndicator />
    </View>
  );
};

export default SplashScreen;
