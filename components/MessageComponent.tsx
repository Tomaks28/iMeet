import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { themes } from "../themes";
import { timeDifference } from "../utilities";

import { Avatar, Badge } from "react-native-elements";

interface Props {
  id: number;
  avatar_url?: string;
  name: string;
  subtitle: string;
  read: boolean;
  connected: boolean;
  lastUpdate: number;
  onPress?: (name: number) => void;
}

const MessageComponent = ({
  id,
  avatar_url,
  name,
  subtitle,
  read,
  connected,
  lastUpdate,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity onPress={() => onPress && onPress(id)}>
      <View style={[styles.container, read && styles.greyBg]}>
        <View>
          <Avatar rounded size="medium" source={{ uri: avatar_url }} />
          {connected && (
            <Badge
              status="success"
              containerStyle={{
                position: "absolute",
                right: 5,
              }}
              badgeStyle={styles.badgeStyle}
            />
          )}
        </View>
        <View style={styles.textBlock}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[styles.name, read && styles.bold]} numberOfLines={1}>
              {name}
            </Text>
            <Text>{timeDifference(lastUpdate)}</Text>
          </View>
          <Text style={[styles.message, read && styles.bold]} numberOfLines={1}>
            {subtitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessageComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 0.2,
    borderBottomColor: themes.colorDivider,
  },
  greyBg: {
    backgroundColor: themes.colorUnreadBg,
  },
  textBlock: { flex: 1, padding: 10 },
  name: {
    flex: 1,
    fontSize: 18,
  },
  message: {
    fontSize: 14,
  },
  badgeStyle: {
    height: 10,
    width: 10,
  },
  bold: {
    fontWeight: "bold",
  },
});
