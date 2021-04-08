import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import logo from "../assets/logo.png";

export default function AppComp() {
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
});
