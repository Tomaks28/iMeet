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
import {
  HeaderComponent,
  InputTextField,
  SelectionPanel,
  PhotoModal,
} from "../components";
import { StoreContext } from "../store";
import { getUserInfo } from "../services";
import { PhotoChoice } from "../interfaces";
import { pickImage, takePhoto, uploadImage, deleteImage } from "../utilities";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ProfileScreen = (props: any) => {
  const scaleValue = new Animated.Value(0);
  const { store, dispatch } = useContext(StoreContext);
  const [modal, setModal] = useState(false);
  const [images, setImages] = useState<Array<any>>([]);
  const [showDelete, setShowDelete] = useState(false);

  // Fetch data from server
  useEffect(() => {
    (async function () {
      const { success, data } = await getUserInfo(store.token);
      if (success) {
        if (data !== undefined) {
          setImages(data.pictures);
        }
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

  const handleImageDelete = async (index: number) => {
    const response: any = await deleteImage(
      store.serverUrl + "/cloudinary/delete",
      images[index].public_id,
      store.token
    );
    if (response) {
      setImages(response.pictures);
      dispatch({ type: "SET_PICTURES", payload: response.pictures });
    }
  };

  const handleImageUpload = async (choice: PhotoChoice) => {
    let image = null;
    switch (choice) {
      case "GALLERY":
        console.log("here");
        image = await pickImage();
        break;
      case "CAMERA":
        image = await takePhoto();
        break;
      default:
        break;
    }

    if (image) {
      const response: any = await uploadImage(
        store.serverUrl + "/cloudinary/upload",
        image,
        store.token
      );
      if (response) {
        setImages(response.pictures);
        dispatch({ type: "SET_PICTURES", payload: response.pictures });
      }
    }

    // Putting modal to false
    setModal(false);
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
                    uri: images[i].url,
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
                    <TouchableOpacity onPress={() => handleImageDelete(i)}>
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
            <TouchableOpacity onPress={() => setModal(true)}>
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
      <PhotoModal
        show={modal}
        onPress={(choice) => {
          handleImageUpload(choice);
        }}
        // onPress={(choice: PhotoChoice) => {
        //   handleImageUpload(choice);
        //   setModal(false);
        // }}
      />
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
