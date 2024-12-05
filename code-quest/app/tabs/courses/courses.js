import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import Title from "../../../components/courses/Title";
import MyCourseList from "../../../components/courses/MyCourseList";
import Header from "../../../components/home/Header";

export default function Courses() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
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
