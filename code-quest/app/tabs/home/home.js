import { View, SafeAreaView, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import Header from "../../../components/home/Header";
import Title from "../../../components/home/Title";
import Banner from "../../../components/home/Banner";
import CourseCatalog from "../../../components/home/CourseCatalog";

export default function home() {
  const userData = useContext(UserContext);
  if (userData) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <Title />
        <Banner />
        <CourseCatalog />
      </SafeAreaView>
    );
  } else {
    return <View />;
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: "red",
    display: "flex",
    flex: 1,
  },
});
