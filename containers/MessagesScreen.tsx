import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import { themes, StoreContext } from "../store";
import { HeaderComponent, MessageComponent } from "../components";
import { messages } from "../test";

const MessagesScreen = (props: any) => {
  const { store, dispatch } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await axios.get(store.serverUrl + "/messages");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderComponent {...{ props, title: "Messages" }} />
      <FlatList
        data={messages}
        keyExtractor={(item) => String(item.id)}
        refreshing={isLoading}
        onRefresh={getData}
        renderItem={({ item }) => (
          <MessageComponent
            key={item.id}
            id={item.id}
            avatar_url={item.avatar_url}
            name={item.name}
            subtitle={item.subtitle}
            read={item.newMessage}
            connected={item.connected}
            lastUpdate={item.lastUpdate}
            onPress={(id) => {
              props.navigation.navigate("ChatScreen", {
                id,
                name: item.name,
              });
            }}
          />
        )}
      />
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
