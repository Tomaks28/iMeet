import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

const DiscussionScreen = ({ navigation }: any) => {
  const [messages, setMessages] = useState<any>([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      console.log("focused");
      // Call any action
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text:
          "Hello developer, comment vas-tu aujourd'hui? Il fait super beau non?",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "Hello!",
        createdAt: new Date(),
        user: {
          _id: 5,
          name: "Thomas",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = (newMessage: Array<any> = []) => {
    setMessages(newMessage.concat(messages));
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        initialText="toto"
        alignTop
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 7,
        }}
      />
    </View>
  );
};

export default DiscussionScreen;
