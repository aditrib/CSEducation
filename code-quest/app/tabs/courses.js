import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";

export default function courses() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontFamily: "Roboto-Bold" }}>courses</Text>
      <Text style={{ fontFamily: "Roboto-Medium" }}>hi</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    borderWidth: 10,
    borderColor: "red",
    flex: 1,
  },
});
