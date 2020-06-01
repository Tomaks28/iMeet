import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  PanResponder,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { Text } from "react-native-elements";
import { themes } from "../themes";
import { HeaderComponent } from "../components";
import { getDiscoverProfiles, sendReactionToProfil } from "../services";
import { StoreContext } from "../store";

const { height, width } = Dimensions.get("window");

const DiscoverScreen = (props: any) => {
  const [data, setData] = useState<any>();
  const [jsx, setJsx] = useState<any>([]);
  const [swipeIndex, setSwipeIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  const { store, dispatch } = useContext(StoreContext);

  // Rotation animation
  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });

  // Opacity Animation on text
  const likeOpacity = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });
  const dislikeOpacity = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: [1, 0, 0],
    extrapolate: "clamp",
  });

  // opacity on next card + scale
  const nextCardOpacity = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: [1, 0, 1],
    extrapolate: "clamp",
  });
  const nextCardScale = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: "clamp",
  });

  // Send user reaction to profile
  const sendSwipeResult = async (index: number, reaction: boolean) => {
    const response = await sendReactionToProfil(store.token, {
      id: data[index].id,
      reaction,
    });
  };

  // PanResponder
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
          position.setValue({ x: gestureState.dx, y: gestureState.dy });
        },
        onPanResponderRelease: (evt, gestureState) => {
          // Débordement par la droite
          if (gestureState.dx > 120) {
            Animated.spring(position, {
              toValue: { x: width + 100, y: gestureState.dy },
            }).start(() => {
              sendSwipeResult(swipeIndex, true);
              setSwipeIndex((prev: number) => prev + 1);
            });
          }
          // Débordement par la gauche
          else if (gestureState.dx < -120) {
            Animated.spring(position, {
              toValue: { x: -width - 100, y: gestureState.dy },
            }).start(() => {
              sendSwipeResult(swipeIndex, false);
              setSwipeIndex((prev: number) => prev + 1);
            });
          }
          // Retour à la position initiale
          else {
            Animated.spring(position, {
              toValue: { x: 0, y: 0 },
              friction: 4,
            }).start();
          }
        },
      }),
    [swipeIndex]
  );

  const generateJsx = (fetchData: any[]) => {
    setJsx(
      fetchData
        .map((item: any, index: number) => {
          // Don't display if on top of current card
          if (index < swipeIndex) {
            return null;
          } else if (index === swipeIndex) {
            // Top card
            return (
              <Animated.View
                {...panResponder.panHandlers}
                key={item.id}
                style={[
                  styles.animatedView,
                  {
                    transform: [
                      { rotate },
                      ...position.getTranslateTransform(),
                    ],
                  },
                ]}
              >
                <Animated.View
                  style={[styles.likeAnimation, { opacity: likeOpacity }]}
                >
                  <Text style={styles.likeText}>LIKE</Text>
                </Animated.View>
                <Animated.View
                  style={[styles.dislikeAnimation, { opacity: dislikeOpacity }]}
                >
                  <Text style={styles.dislikeText}>NOPE</Text>
                </Animated.View>
                <View style={styles.card}>
                  <Image
                    style={[styles.image]}
                    source={{ uri: item.pictures[0].url }}
                  />
                  <LinearGradient
                    colors={["rgba(0,0,0,0.1)", "black"]}
                    style={styles.linearGradiant}
                  >
                    <View style={{ padding: 10 }}>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.cardName}>{item.username},</Text>
                        <Text style={styles.cardAge}>{item.age}</Text>
                      </View>
                      <Text style={styles.cardLocation}>
                        {item.city}, {item.state}
                      </Text>
                    </View>
                  </LinearGradient>
                </View>
              </Animated.View>
            );
          } else {
            // Below card
            return (
              <Animated.View
                key={item.id}
                style={[
                  styles.animatedView,
                  {
                    opacity: nextCardOpacity,
                    transform: [{ scale: nextCardScale }],
                  },
                ]}
              >
                <View style={styles.card}>
                  <Image
                    style={[styles.image]}
                    source={{ uri: item.pictures[0].url }}
                  />
                  <LinearGradient
                    colors={["rgba(0,0,0,0.1)", "black"]}
                    style={styles.linearGradiant}
                  >
                    <View style={{ padding: 10 }}>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.cardName}>{item.username},</Text>
                        <Text style={styles.cardAge}>{item.age}</Text>
                      </View>
                      <Text style={styles.cardLocation}>
                        {item.city}, {item.state}
                      </Text>
                    </View>
                  </LinearGradient>
                </View>
              </Animated.View>
            );
          }
        })
        .reverse()
    );
  };

  // Fetching profiles
  useEffect(() => {
    if (!swipeIndex) {
      (async function () {
        const { data } = await getDiscoverProfiles(store.token);
        setData(data);
        generateJsx(data);
      })();
    }
  }, []);

  useEffect(() => {
    if (data) {
      generateJsx(data);
      if (swipeIndex === data.length) {
        setSwipeIndex(0);
      }
      position.setValue({ x: 0, y: 0 });
    }
  }, [swipeIndex]);

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent {...{ props, title: "Discover" }} />
      <View style={styles.container}>
        <View style={styles.cards}>{jsx}</View>
      </View>
    </View>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedView: {
    flex: 1,
    padding: 10,
    height: 600,
    width,
    paddingHorizontal: 20,
    position: "absolute",
  },
  linearGradiant: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
  },
  cards: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  cardName: {
    color: "white",
    fontSize: 24,
  },
  cardAge: {
    fontSize: 24,
    color: "lightgrey",
  },
  cardLocation: {
    fontSize: 16,
    color: "white",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  likeAnimation: {
    position: "absolute",
    top: 50,
    left: 40,
    zIndex: 100,
    transform: [{ rotate: "-30deg" }],
  },
  likeText: {
    borderWidth: 1,
    borderColor: "green",
    color: "green",
    fontSize: 32,
    fontWeight: "bold",
    padding: 10,
  },
  dislikeAnimation: {
    position: "absolute",
    top: 50,
    right: 40,
    zIndex: 100,
    transform: [{ rotate: "30deg" }],
  },
  dislikeText: {
    borderWidth: 1,
    borderColor: "red",
    color: "red",
    fontSize: 32,
    fontWeight: "bold",
    padding: 10,
  },
  centerComponent: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
});
