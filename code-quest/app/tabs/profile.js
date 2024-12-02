import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import useSignOut from "../../utils/useSignOut";
import SignOutButton from "../../components/profile/SignOutButton";

export default function profile() {
  return (
    <SafeAreaView style={styles.container}>
      <SignOutButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
});
