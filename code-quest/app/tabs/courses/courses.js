import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import Title from "../../../components/courses/Title";
import MyCourseList from "../../../components/courses/MyCourseList";

export default function Courses() {
  return (
    <SafeAreaView style={styles.container}>
      <Title />
      <MyCourseList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
});
