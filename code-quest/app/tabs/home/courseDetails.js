import { Text, StyleSheet, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import theme from "../../../assets/theme";
import { UserContext } from "../../../context/UserContext";
import BackButton from "../../../components/courseDetails/BackButton";
import CourseBanner from "../../../components/courseDetails/CourseBanner";
import CourseDescription from "../../../components/courseDetails/CourseDescription";
import CourseLessons from "../../../components/courseDetails/CourseLessons";
import { CoursesContext } from "../../../context/CoursesContext";

export default function courseDetails() {
  const { course: courseString } = useLocalSearchParams();
  const { selectedCourse, setSelectedCourse } = useContext(CoursesContext);
  const userData = useContext(UserContext);
  console.log(
    userData["courses"] != null &&
      courseString["course_name"] in Object.keys(userData["courses"])
  );

  useEffect(() => {
    if (courseString) {
      const parsedCourse = JSON.parse(courseString);
      setSelectedCourse(parsedCourse);
    }
  }, [courseString]);

  if (selectedCourse) {
    return (
      <SafeAreaView style={styles.container}>
        <BackButton />
        <Text style={styles.titleText}>{selectedCourse["course_name"]}</Text>
        <ScrollView>
          <CourseBanner />
          <CourseDescription />
          <CourseLessons />
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return <></>;
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: "red",
    display: "flex",
    flex: 1,
  },
  titleText: {
    color: theme.colors.textBlack,
    fontWeight: "bold",
    fontSize: 24,
    padding: 10,
  },
});
