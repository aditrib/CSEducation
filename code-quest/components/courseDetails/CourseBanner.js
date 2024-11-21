import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React, { useContext } from "react";
import { CoursesContext } from "../../context/CoursesContext";
import useImage from "../../utils/useImage";

export default function CourseBanner() {
  const { selectedCourse } = useContext(CoursesContext);
  const { imageUri, loading } = useImage({
    path: selectedCourse["cover_image"],
  });
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.courseImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  courseImage: {
    height: Dimensions.get("window").height * 0.18,
    width: Dimensions.get("window").width * 0.9,
    resizeMode: "contain",
    borderRadius: 10,
  },
});
