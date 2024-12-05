import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useContext } from "react";
import { CoursesContext } from "../../context/CoursesContext";
import SubjectCourseList from "./SubjectCourseList";

export default function CourseCatalog() {
  const { subjects, isLoading } = useContext(CoursesContext);
  if (isLoading) {
    return <></>;
  }
  if (subjects) {
    return (
      <View>
        {["All", ...subjects].map((value) => {
          return <SubjectCourseList key={value} subject={value} />;
        })}
      </View>
    );
  } else {
    return <></>;
  }
}

const styles = StyleSheet.create({});
