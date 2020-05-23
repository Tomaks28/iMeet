import React, { useContext, useEffect, useState, useRef, useMemo } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  PanResponder,
} from "react-native";
import axios from "axios";
import { Text } from "react-native-elements";
import { themes } from "../themes";
import { HeaderComponent } from "../components";

const { height, width } = Dimensions.get("window");

const DiscoverScreen = (props: any) => {
  const [data, setData] = useState<any>();
  const [jsx, setJsx] = useState<any>([]);
  const [swipeIndex, setSwipeIndex] = useState(0);
  // const [viewHeight, setViewHeight] = useState<number>(height);
  const position = useRef(new Animated.ValueXY()).current;

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
              console.log("right");
              setSwipeIndex((prev: number) => prev + 1);
            });
          }
          // Débordement par la gauche
          else if (gestureState.dx < -120) {
            Animated.spring(position, {
              toValue: { x: -width - 100, y: gestureState.dy },
            }).start(() => {
              console.log("left");
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
    []
  );

  const generateJsx = (fetchData: any[]) => {
    setJsx(
      fetchData
        .map((item: any, index: number) => {
          // Don't display if on top of current card
          if (index < swipeIndex) {
            return null;
          } else if (index === swipeIndex) {
            return (
              <Animated.View
                {...panResponder.panHandlers}
                key={item.id.value}
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
                <Image
                  style={[styles.image]}
                  source={{ uri: item.picture.large }}
                />
              </Animated.View>
            );
          } else {
            return (
              <Animated.View
                key={item.id.value}
                style={[
                  styles.animatedView,
                  {
                    opacity: nextCardOpacity,
                    transform: [{ scale: nextCardScale }],
                  },
                ]}
              >
                <Image
                  style={[styles.image]}
                  source={{ uri: item.picture.large }}
                />
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
        const { data } = await axios.get(
          "https://randomuser.me/api/?gender=female&nat=fr&inc=id,gender,name,picture&results=5"
        );
        setData(data.results);
        generateJsx(data.results);
      })();
    }
  }, []);

  useEffect(() => {
    if (data) {
      generateJsx(data);
      position.setValue({ x: 0, y: 0 });
      if (swipeIndex === data.length) {
        setSwipeIndex(0);
      }
    }
  }, [swipeIndex]);

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent {...{ props, title: "Discover" }} />
      <View style={styles.container}>
        <View style={styles.card}>{jsx}</View>
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
  card: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    borderRadius: 20,
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
