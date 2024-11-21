import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import theme from "../../assets/theme";

export default function Title() {
  const userData = useContext(UserContext);
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.subtitleText}>Welcome,</Text>
      <Text style={styles.titleText}>{userData.name}! 👋</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    padding: 8,
    marginLeft: 6,
  },
  titleText: {
    fontFamily: "Roboto-Medium",
    fontSize: 28,
  },
  subtitleText: {
    fontFamily: "Roboto-Medium",
    fontSize: 14,
    color: theme.colors.textGray,
  },
});
