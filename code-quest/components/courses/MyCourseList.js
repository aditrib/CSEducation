import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import MyCourseListItem from "./MyCourseListItem";

export default function MyCourseList() {
  const { userData } = useContext(UserContext);
  if (userData && userData["courses"]) {
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
    return <></>;
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
});
