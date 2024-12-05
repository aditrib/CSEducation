import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import useSignOut from "../../utils/useSignOut";
import SignOutButton from "../../components/profile/SignOutButton";
import UserInfo from "../../components/profile/UserInfo";
import Header from "../../components/home/Header";

export default function profile() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.title}>My Profile 👤</Text>
      <UserInfo />
      <SignOutButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  title: {
    fontSize: 28,
    padding: 10,
  },
});
