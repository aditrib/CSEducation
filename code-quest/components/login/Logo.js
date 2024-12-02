import { View, Image, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import useImage from "../../utils/useImage";

export default function Logo() {
  const { imageUri } = useImage({ path: "logo.png" });

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
    height: Dimensions.get("window").height * 0.18,
    width: Dimensions.get("window").width * 0.92,
    resizeMode: "contain",
    borderRadius: 10,
  },
});
