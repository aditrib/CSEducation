import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import MyCourseListItem from "./MyCourseListItem";
import theme from "../../assets/theme";

export default function MyCourseList() {
  const { userData } = useContext(UserContext);
  if (
    userData &&
    userData["courses"] &&
    Object.keys(userData["courses"]).length > 0
  ) {
    return (
      <FlatList
        data={Object.keys(userData["courses"])}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <MyCourseListItem courseName={item} />
          </View>
        )}
      />
    );
  } else {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.text}>No courses</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  text: {
    color: theme.colors.textGray,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
