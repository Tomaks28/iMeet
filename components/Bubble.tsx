import React from "react";
import { View, StyleSheet } from "react-native";
import { themes } from "../store";
import MessageStatus from "./MessageStatus";
import { MessageStatusType } from "../interfaces";
import { Text } from "react-native-elements";
import moment from "moment";

interface Props {
  position: "right" | "left";
  message: string;
  readStatus: MessageStatusType;
  date: number;
}

const Bubble = ({ position, message, readStatus, date }: Props) => {
  return (
    <View style={styles.container}>
      {position === "left" ? (
        <View style={[styles.left, styles.paddingVertical]}>
          <Text style={styles.leftText}>{message}</Text>
          <Text style={styles.timeLeftComponent}>
            {moment(date).format("hh:mm")}
          </Text>
        </View>
      ) : (
        <View style={[styles.right, styles.paddingVertical]}>
          <Text style={styles.rightText}>{message}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.timeRightComponent}>
              {moment(date).format("hh:mm")}
            </Text>
            <MessageStatus status={readStatus} />
          </View>
        </View>
      )}
    </View>
  );
};

export default Bubble;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  left: {
    flex: 1,
    backgroundColor: themes.bubbleLeftBgColor,
    borderRadius: themes.bubbleRadius,
    borderBottomLeftRadius: 0,
    maxWidth: themes.bubbleMaxWidth,
    alignSelf: "flex-start",
    justifyContent: "center",
    paddingHorizontal: themes.bubbleHorizontalPadding,
  },
  leftText: {
    color: themes.bubbleLeftTextColor,
    fontSize: themes.bubbleTextFontSize,
  },
  paddingVertical: {
    paddingVertical: themes.bubbleHeight,
  },
  right: {
    flex: 1,
    backgroundColor: themes.bubbleRightBgColor,
    borderRadius: themes.bubbleRadius,
    borderBottomRightRadius: 0,
    maxWidth: themes.bubbleMaxWidth,
    alignSelf: "flex-end",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: themes.bubbleHorizontalPadding,
  },
  rightText: {
    marginRight: 15,
    color: themes.bubbleRightTextColor,
    fontSize: themes.bubbleTextFontSize,
  },
  timeRightComponent: {
    color: themes.lightColor,
    fontSize: themes.bubbleTimeSize,
    marginRight: 5,
  },
  timeLeftComponent: {
    color: themes.greyColor,
    fontSize: themes.bubbleTimeSize,
    alignSelf: "flex-end",
  },
});
