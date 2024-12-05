import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextComponent,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import theme from "../../assets/theme";
import db from "../../database/db";
import { Link } from "expo-router";
import useImage from "../../utils/useImage";

export default function CourseButton({ course }) {
  const { imageUri, loading } = useImage({ path: course["cover_image"] });

  return (
    <Link
      href={{
        pathname: `/tabs/home/courseDetails`,
        params: {
          course: JSON.stringify(course),
          tab: "home",
        },
      }}
    >
      <View style={styles.container}>
        <Image source={{ uri: imageUri }} style={styles.coverImage} />
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{course["course_name"]}</Text>
          <Text style={styles.subtitleText}>
            {Object.keys(course["module_text"]).length} Modules
          </Text>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height * 0.15,
    width: Dimensions.get("window").width * 0.5,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 10,
  },
  coverImage: {
    height: Dimensions.get("window").height * 0.11,
    width: Dimensions.get("window").width * 0.5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    margin: 4,
  },
  titleText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  subtitleText: {
    fontSize: 10,
    color: theme.colors.textGray,
  },
});
