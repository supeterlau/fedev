import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import logo from "../assets/logo.png";
import * as ImagePicker from "expo-image-picker";

export default function AppComp() {
  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Require permission to access camera");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Image
        source={{
          uri:
            "https://www.baidu.com/img/PCfb_5bf082d29588c07f842ccde3f97243ea.png",
        }}
        style={styles.logo}
      />
      <Text style={styles.text}>Share a photo with a friend</Text>
      <Text style={styles.instructions}>Press button below</Text>
      <TouchableOpacity
        // onPress={() => alert("Cool")}
        onPress={openImagePickerAsync}
        // style={{ backgroundColor: "blue" }}
        style={styles.button}
      >
        {/* <Text style={{ fontSize: 20, color: "#fff" }}>Pick a photo</Text> */}
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#888",
    fontSize: 24,
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 35,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
