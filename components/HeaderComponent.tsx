import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  View,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import { Icon, Avatar, Badge, Text } from "react-native-elements";
import { themes, header } from "../themes";
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
            backgroundColor={themes.colorPrimary}
            barStyle={type === "strict-back" ? "dark-content" : "light-content"}
          />
          <View
            style={[
              styles.header,
              type === "strict-back"
                ? { backgroundColor: "transparent" }
                : null,
            ]}
          >
            <View style={styles.spacer}>
              {type === "normal" ? (
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                  <Icon name="menu" color="#fff" size={30} />
                </TouchableOpacity>
              ) : type === "back" ? (
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                  <Icon name="keyboard-arrow-left" color="#fff" size={30} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                  <Icon
                    name="keyboard-arrow-left"
                    color={themes.colorPrimary}
                    size={30}
                  />
                </TouchableOpacity>
              )}
            </View>
            {type !== "strict-back" ? (
              <Text style={styles.centerComponent} numberOfLines={1}>
                {title}
              </Text>
            ) : null}
            <View style={styles.spacer}>
              {type === "normal" ? (
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
              ) : null}
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
    backgroundColor: themes.colorPrimary,
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
