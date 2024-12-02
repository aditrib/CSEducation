import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import theme from "../../assets/theme";
import { CoursesContext } from "../../context/CoursesContext";
import useImage from "../../utils/useImage";
import { ProgressBar, Colors } from "react-native-paper";
import { UserContext } from "../../context/UserContext";
import DetailsButton from "./DetailsButton";

export default function MyCourseListItem({ courseName }) {
  const { coursesByName } = useContext(CoursesContext);
  const { userData } = useContext(UserContext);
  const { imageUri, loading } = useImage({
    path: coursesByName[courseName]["cover_image"],
  });

  const [modules, setModules] = useState();
  const [completedModules, setCompletedModules] = useState();

  useEffect(() => {
    if (coursesByName && coursesByName[courseName]) {
      setModules(Object.keys(coursesByName[courseName]["module_text"]));
    }
    if (userData && courseName in userData["courses"]) {
      setCompletedModules(userData["courses"][courseName].length);
    }
  }, [coursesByName, courseName, userData]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.coverImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.courseTitle}>{courseName}</Text>
        <ProgressBar
          progress={
            completedModules && modules
              ? (completedModules / modules.length).toFixed(2) || 0
              : 0
          }
          color={theme.colors.darkBlue}
          style={{ marginTop: 15 }}
        />
        <View style={styles.subInfoContainer}>
          <Text style={styles.subInfoText}>
            {coursesByName[courseName]["subject"]}
          </Text>
          {completedModules != null && modules && (
            <Text style={styles.subInfoText}>
              {completedModules} / {modules.length} Modules
            </Text>
          )}
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <DetailsButton course={coursesByName[courseName]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.2,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 10,
    flexDirection: "row",
    marginTop: 10,
  },
  coverImage: {
    width: Dimensions.get("window").width * 0.45,
    height: Dimensions.get("window").height * 0.2,
    resizeMode: "cover", // Maintains aspect ratio while filling the container
    borderRadius: 10,
  },
  infoContainer: {
    padding: 10,
    width: Dimensions.get("window").width * 0.45,
  },
  courseTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },
  subInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  subInfoText: {
    color: theme.colors.textGray,
    fontSize: 12,
  },
});
