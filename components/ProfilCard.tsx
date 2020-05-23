import React from "react";
import { View, Animated } from "react-native";

interface Props {
  cardPosition: "TOP" | "ABOVE";
}

const ProfileCard = ({ cardPosition }: Props) => {
  return (
    // <Animated.View
    //   {...panResponder.panHandlers}
    //   key={item.id.value}
    //   style={[
    //     styles.animatedView,
    //     {
    //       transform: [{ rotate }, ...position.getTranslateTransform()],
    //     },
    //   ]}
    // >
    //   <Animated.View style={[styles.likeAnimation, { opacity: likeOpacity }]}>
    //     <Text style={styles.likeText}>LIKE</Text>
    //   </Animated.View>
    //   <Animated.View
    //     style={[styles.dislikeAnimation, { opacity: dislikeOpacity }]}
    //   >
    //     <Text style={styles.dislikeText}>NOPE</Text>
    //   </Animated.View>
    //   <Image style={[styles.image]} source={{ uri: item.picture.large }} />
    // </Animated.View>
  );
};

export default ProfileCard;

// //   ***********************************

//   <Animated.View
//     key={item.id.value}
//     style={[
//       styles.animatedView,
//       {
//         opacity: nextCardOpacity,
//         transform: [{ scale: nextCardScale }],
//       },
//     ]}
//   >
//     <Image
//       style={[styles.image]}
//       source={{ uri: item.picture.large }}
//     />
//   </Animated.View>
