import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import { themes, header } from "../store";

import { Avatar, ListItem } from "react-native-elements";

const DrawerScreen = ({ navigation }: any) => {
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
            uri:
              "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
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
              leftIcon={{ name: item.icon, color: themes.primaryColor }}
              titleStyle={{ color: themes.darkFont }}
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
            leftIcon={{ name: item.icon, color: themes.primaryColor }}
            titleStyle={{ color: themes.darkFont }}
            onPress={() => {
              navigation.navigate(item.screen);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DrawerScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: themes.primaryColor,
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
