import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { CoursesContext } from "../../context/CoursesContext";
import theme from "../../assets/theme";
import CourseButton from "./CourseButton";

export default function SubjectCourseList({ subject }) {
  const { groupedBySubject } = useContext(CoursesContext);
  const [courses, setCourses] = useState();

  useEffect(() => {
    if (subject in groupedBySubject) {
      const courseList = groupedBySubject[subject];
      setCourses(courseList);
    }
  }, [groupedBySubject]);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.text, styles.subjectText]}>{subject}</Text>
        <Text style={styles.text}> Courses</Text>
      </View>
      <FlatList
        data={courses}
        horizontal={true}
        renderItem={({ item }) => <CourseButton course={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
  },
  subjectText: {
    fontWeight: "bold",
    color: theme.colors.english,
  },
});
