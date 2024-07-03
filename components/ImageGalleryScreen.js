import React, { useState } from "react";
import { View, Text, Button, Modal, Image, StyleSheet } from "react-native";
import ImagePicker from "react-native-image-picker";

const ImageGalleryScreen = () => {
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleChooseImage = () => {
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        setImage(response);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Choose Image" onPress={handleChooseImage} />
      {image && (
        <Modal visible={modalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <Image source={{ uri: image.uri }} style={styles.image} />
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});

export default ImageGalleryScreen;
