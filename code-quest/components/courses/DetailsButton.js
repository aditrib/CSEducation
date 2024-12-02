import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import theme from "../../assets/theme";
import { router } from "expo-router";

export default function DetailsButton({ course }) {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/tabs/courses/courseDetails`,
          params: {
            course: JSON.stringify(course),
            tab: "courses",
          },
        })
      }
      style={styles.button}
    >
      <Text style={styles.buttonText}>Details</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "50%",
    borderWidth: 1,
    alignItems: "center",
    margin: 15,
    padding: 10,
    borderColor: theme.colors.gray,
    borderRadius: 10,
    marginTop: 25,
  },
  buttonText: {
    color: theme.colors.textGray,
  },
});
