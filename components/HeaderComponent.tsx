import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  View,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import { Header, Icon, Avatar, Badge, Text } from "react-native-elements";
import { themes, header } from "../store";
import { HeaderType } from "../interfaces";

interface Props {
  props: any;
  title: string;
  type?: HeaderType;
}

const HeaderComponent = ({ props, title, type = "normal" }: Props) => {
  const [newMessage, setNewMessage] = useState(true);
  return (
    <>
      {type !== "hide" ? (
        <>
          <StatusBar
            backgroundColor={themes.primaryColor}
            barStyle="light-content"
          />
          <View style={[styles.header]}>
            <View style={styles.spacer}>
              {type === "normal" ? (
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                  <Icon name="menu" color="#fff" size={30} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                  <Icon name="keyboard-arrow-left" color="#fff" size={30} />
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.centerComponent} numberOfLines={1}>
              {title}
            </Text>
            <View style={styles.spacer}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("MessagesScreen")}
              >
                <View>
                  <Avatar rounded size="medium" icon={{ name: "textsms" }} />
                  {newMessage && (
                    <Badge
                      containerStyle={{
                        position: "absolute",
                        right: 0,
                        top: 10,
                      }}
                      badgeStyle={styles.badgeStyle}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : null}
    </>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  header: {
    backgroundColor: themes.primaryColor,
    paddingTop:
      Platform.OS === "ios" ? Constants.statusBarHeight : header.paddingTop,
    padding: header.padding,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spacer: {
    width: 40,
    alignSelf: "center",
  },
  centerComponent: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: header.fontSize,
    fontWeight: "500",
    paddingHorizontal: 20,
  },
  badgeStyle: {
    backgroundColor: "gold",
    height: 10,
    width: 10,
  },
});
