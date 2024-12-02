import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
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
import EnrollButton from "../../../components/courseDetails/EnrollButton";

export default function CourseDetails() {
  const { course: courseString, tab } = useLocalSearchParams();
  const { selectedCourse, setSelectedCourse, setEnrolledSelectedCourse } =
    useContext(CoursesContext);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (courseString) {
      const parsedCourse = JSON.parse(courseString);
      setSelectedCourse(parsedCourse);
      if (
        userData["courses"] != null &&
        parsedCourse["course_name"] in userData["courses"]
      ) {
        setEnrolledSelectedCourse(true);
      } else {
        setEnrolledSelectedCourse(false);
      }
    }
  }, [courseString]);

  if (selectedCourse) {
    return (
      <SafeAreaView style={styles.container}>
        <BackButton />
        <Text style={styles.titleText}>{selectedCourse["course_name"]}</Text>
        <View style={{ paddingBottom: "13%" }}>
          <ScrollView>
            <CourseBanner />
            <CourseDescription />
            <CourseLessons tab={tab} />
            <EnrollButton />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  } else {
    return <></>;
  }
}

const styles = StyleSheet.create({
  container: {
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
