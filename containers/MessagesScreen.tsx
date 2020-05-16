import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { themes } from "../store";
import { HeaderComponent, MessageComponent } from "../components";
import { messages } from "../test";

const MessagesScreen = (props: any) => {
  return (
    <View style={styles.container}>
      <HeaderComponent {...{ props, title: "Messages" }} />
      <View>
        {messages.map((message) => (
          <MessageComponent
            key={message.id}
            id={message.id}
            avatar_url={message.avatar_url}
            name={message.name}
            subtitle={message.subtitle}
            read={message.newMessage}
            connected={message.connected}
            lastUpdate={message.lastUpdate}
            onPress={(id) => {
              props.navigation.navigate("ChatScreen", {
                id,
                name: message.name,
              });
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  centerComponent: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
});
