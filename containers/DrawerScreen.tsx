import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import { Avatar, ListItem } from "react-native-elements";
import { themes, header, images } from "../themes";
import { getUserInfo } from "../services";
import { StoreContext } from "../store";

const DrawerScreen = ({ navigation }: any) => {
  const { store } = useContext(StoreContext);
  const [avatar, setAvatar] = useState(images.emptyAvatar);

  useEffect(() => {
    (async function () {
      const { success, data } = await getUserInfo(store.token);
      if (success) {
        if (data.pictures.length) {
          setAvatar(data.pictures[0].url);
        } else {
          setAvatar(images.emptyAvatar);
        }
      }
    })();
  }, [store.token, store.pictures]);

  const list = [
    {
      title: "Discover",
      icon: "group",
      screen: "DiscoverScreen",
    },
    {
      title: "Recherche",
      icon: "search",
      screen: "SearchScreen",
    },
    {
      title: "Messages",
      icon: "message",
      screen: "MessagesScreen",
    },
    {
      title: "Favoris",
      icon: "favorite",
      screen: "FavoriteScreen",
    },
    {
      title: "Autour de moi",
      icon: "my-location",
      screen: "AroundmeScreen",
    },
  ];

  const item = {
    title: "Déconnexion",
    icon: "exit-to-app",
    screen: "SignInScreen",
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Avatar
          rounded
          size="medium"
          showAccessory
          source={{
            uri: avatar,
          }}
          onAccessoryPress={() => {
            navigation.navigate("ProfileScreen");
          }}
        />
        <Text style={styles.userText} numberOfLines={1}>
          Utilisateur
        </Text>
      </View>
      <View style={styles.container}>
        <View>
          {list.map((item, index) => (
            <ListItem
              key={index}
              title={item.title}
              leftIcon={{ name: item.icon, color: themes.colorPrimary }}
              titleStyle={{ color: themes.colorDarkFont }}
              bottomDivider
              chevron
              onPress={() => {
                navigation.navigate(item.screen);
              }}
            />
          ))}
        </View>
        <View style={styles.bottomItems}>
          <ListItem
            title={item.title}
            leftIcon={{ name: item.icon, color: themes.colorPrimary }}
            titleStyle={{ color: themes.colorDarkFont }}
            onPress={() => {
              navigation.navigate(item.screen);
            }}
          />
        </View>
      </View>
    </View>
  );
};

// export default withNavigationFocus(DrawerScreen);
export default DrawerScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: themes.colorPrimary,
    paddingTop:
      Platform.OS === "ios" ? Constants.statusBarHeight : header.paddingTop,
    padding: header.padding,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  userText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    paddingLeft: 20,
    paddingRight: 20,
    color: "white",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  bottomItems: {
    paddingBottom: 10,
  },
});
