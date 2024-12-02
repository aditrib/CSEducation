import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useContext } from "react";
import theme from "../../assets/theme";
import { CoursesContext } from "../../context/CoursesContext";
import LessonMenuItem from "./LessonMenuItem";

export default function CourseLessons({ tab }) {
  const { selectedCourse } = useContext(CoursesContext);
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Lessons</Text>
      {Object.keys(selectedCourse["modules"]).map((value) => {
        return <LessonMenuItem key={value} moduleName={value} tab={tab} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitleText: {
    fontSize: 14,
    paddingTop: 4,
    color: theme.colors.textGray,
  },
});
