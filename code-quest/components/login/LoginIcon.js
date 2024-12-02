import { View, Image, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import useImage from "../../utils/useImage";

export default function LoginIcon() {
  const { imageUri } = useImage({ path: "login.png" });

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={{
          uri: imageUri,
        }}
        style={styles.banner}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: Dimensions.get("window").height * 0.3,
    width: Dimensions.get("window").width * 0.92,
    resizeMode: "contain",
    borderRadius: 10,
  },
});
