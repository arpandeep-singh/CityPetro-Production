import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Layout } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

function ImageInput({ imageUri, onChangeImage }) {
  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.2,
      });
      if (!result.cancelled) onChangeImage(result.uri);
    } catch (error) {
      alert(error);
      console.log("Error reading image", error);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Layout level="1" style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons color="#3366FF" name="camera" size={35} />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </Layout>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    //backgroundColor: "#D6E4FF",
    borderRadius: 15,
    justifyContent: "center",
    height: 80,
    width: 80,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
export default ImageInput;
