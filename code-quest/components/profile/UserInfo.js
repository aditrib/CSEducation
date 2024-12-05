import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Divider } from "react-native-paper";
import theme from "../../assets/theme";

export default function UserInfo() {
  const { userData } = useContext(UserContext);
  const dateJoined = new Date(userData["created_at"]);
  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={[styles.text, styles.labelText]}>Name</Text>
        <Text style={[styles.text, styles.descriptionText]}>
          {" "}
          {userData["name"]}
        </Text>
      </View>
      <Divider />
      <View style={styles.textBox}>
        <Text style={[styles.text, styles.labelText]}>Email </Text>
        <Text style={[styles.text, styles.descriptionText]}>
          {userData["email"]}
        </Text>
      </View>
      <Divider />
      <View style={styles.textBox}>
        <Text style={[styles.text, styles.labelText]}>Date Joined</Text>
        <Text style={[styles.text, styles.descriptionText]}>
          {dateJoined.toLocaleString("default", { month: "long" })}{" "}
          {dateJoined.getDay() + 1}, {dateJoined.getFullYear()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundSecondary,
    margin: 10,
    borderRadius: 10,
  },
  textBox: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
  },
  labelText: {
    fontWeight: "bold",
    paddingRight: 10,
  },
  descriptionText: {
    color: theme.colors.textGray,
  },
});
