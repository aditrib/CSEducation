import { View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import Header from "../../../components/home/Header";
import Title from "../../../components/home/Title";
import Banner from "../../../components/home/Banner";
import CourseCatalog from "../../../components/home/CourseCatalog";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import theme from "../../../assets/theme";
import { Link } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Home() {
  const { userData } = useContext(UserContext);
  if (userData) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <Title />
        <ScrollView>
          <Banner />
          <CourseCatalog />
        </ScrollView>

        <Link href="/tabs/home/newcourse" style={styles.postButtonContainer}>
          <View style={styles.postButton}>
            <AntDesign size={50} name="plus" color={theme.colors.textWhite} />
          </View>
        </Link>
      </SafeAreaView>
    );
  } else {
    return <View />;
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  postButtonContainer: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  postButton: {
    backgroundColor: theme.colors.darkBlue,
    height: 70,
    width: 70,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    // FontAwesome 'plus' icon is a bit off-center, so we manually center it by
    // tweaking the padding
    paddingTop: 2,
    paddingLeft: 1,
  },
});
