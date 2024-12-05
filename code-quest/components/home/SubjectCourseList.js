import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { CoursesContext } from "../../context/CoursesContext";
import theme from "../../assets/theme";
import CourseButton from "./CourseButton";

export default function SubjectCourseList({ subject }) {
  const { groupedBySubject, courses: allCourses } = useContext(CoursesContext);
  const [courses, setCourses] = useState();

  useEffect(() => {
    if (subject in groupedBySubject) {
      const courseList = groupedBySubject[subject];
      setCourses(courseList);
    } else {
      setCourses(allCourses);
    }
  }, [groupedBySubject]);

  const subjectColor = theme.colors[subject] || theme.colors.textBlack;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          style={[
            styles.text,
            {
              fontWeight: "bold",
              color: subjectColor,
            },
          ]}
        >
          {subject}
        </Text>
        <Text style={styles.text}> Courses</Text>
      </View>
      <FlatList
        data={courses}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        renderItem={({ item }) => <CourseButton course={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
  },
  subjectText: {
    fontWeight: "bold",
  },
});
