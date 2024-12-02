import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Title() {
  return <Text style={styles.titleText}>My Courses 📚</Text>;
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "Roboto-Medium",
    fontSize: 28,
    padding: 8,
    marginLeft: 6,
  },
});
