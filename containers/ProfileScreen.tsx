import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { Image, Text } from "react-native-elements";
import { Ionicons, Entypo, AntDesign, Fontisto } from "@expo/vector-icons";
import { themes } from "../themes";
import { HeaderComponent, InputTextField, SelectionPanel } from "../components";
import { StoreContext } from "../store";
import { getUserInfo } from "../services";
import { pickImage, uploadImage } from "../utilities";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ProfileScreen = (props: any) => {
  const { store } = useContext(StoreContext);
  const scaleValue = new Animated.Value(0);
  const [images, setImages] = useState<any>([]);
  const [showDelete, setShowDelete] = useState(false);

  // Fetch data from server
  useEffect(() => {
    (async function () {
      const { success, data } = await getUserInfo(store.token);
      if (success) {
        setImages(data.pictures);
      }
    })();
  }, []);

  useEffect(() => {
    // Execute spring animation when user long press on photo
    springAnimation();
  }, [showDelete]);

  const springAnimation = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 2,
    }).start();
  };

  const showPhotos = () => {
    const array = [];
    for (let i = 0; i < 6; i++) {
      if (images[i]) {
        array.push(
          <View key={i} style={{ position: "relative" }}>
            <TouchableWithoutFeedback
              onPress={() => setShowDelete(false)}
              onLongPress={() => {
                setShowDelete(true);
              }}
            >
              <View>
                <Image
                  style={styles.box}
                  source={{
                    uri: images[i],
                  }}
                />
                {showDelete ? (
                  <Animated.View
                    style={[
                      styles.delete,
                      {
                        transform: [
                          {
                            scale: scaleValue,
                          },
                        ],
                      },
                    ]}
                  >
                    <TouchableOpacity onPress={() => {}}>
                      <Entypo
                        name="circle-with-cross"
                        size={20}
                        color={themes.colorPrimary}
                      />
                    </TouchableOpacity>
                  </Animated.View>
                ) : null}
                {i === 0 ? (
                  <View style={styles.star}>
                    <TouchableOpacity onPress={() => {}}>
                      <AntDesign
                        name="star"
                        size={20}
                        color={themes.colorGold}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </TouchableWithoutFeedback>
          </View>
        );
      } else {
        array.push(
          <View key={i} style={[styles.box, styles.emptyBox]}>
            <TouchableOpacity
              onPress={async () => {
                const image = await pickImage();
                if (image) {
                  const response: any = await uploadImage(
                    store.serverUrl + "/cloudinary/upload",
                    image,
                    store.token
                  );
                  console.log(response);
                  if (response) {
                    setImages(response.pictures);
                  }
                }
              }}
            >
              <Ionicons
                name="md-add-circle"
                size={24}
                color={themes.colorGrey}
              />
            </TouchableOpacity>
          </View>
        );
      }
    }
    return array;
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent {...{ props, title: "Profile" }} />
      <ScrollView style={styles.container}>
        {/* Photos section */}
        <View style={styles.gallery}>
          <Fontisto name="photograph" size={24} color={themes.colorPrimary} />
          <Text style={styles.galleryText}>Photos</Text>
        </View>
        <View style={styles.imageContainer}>{showPhotos()}</View>
        {/* About Me section */}
        <View style={styles.gallery}>
          <Ionicons
            name="ios-information-circle-outline"
            size={24}
            color={themes.colorPrimary}
          />
          <Text style={styles.galleryText}>Informations de base</Text>
        </View>
        <View>
          <InputTextField title="Ma description" onTextChange={() => {}} />
        </View>
        <SelectionPanel
          title="Origine"
          data={["Ecossais", "Turque", "Français"]}
          onSelection={(data) => {}}
        />
        {/* <SelectionPanel
          title="Couleur des yeux"
          data={["Bleues", "Gris", "Marrons", "Noisettes", "Verts"]}
        /> */}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  gallery: {
    flexDirection: "row",
    alignItems: "center",
  },
  galleryText: {
    color: themes.colorPrimary,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  star: {
    position: "absolute",
    top: 5,
    left: 5,
  },
  delete: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  box: {
    borderRadius: 14,
    margin: 10,
    height: screenWidth / 4,
    width: screenWidth / 4,
  },
  emptyBox: {
    backgroundColor: themes.colorLight,
    justifyContent: "center",
    alignItems: "center",
  },
});
