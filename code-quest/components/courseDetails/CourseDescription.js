import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { CoursesContext } from "../../context/CoursesContext";
import theme from "../../assets/theme";

export default function CourseDescription() {
  const { selectedCourse } = useContext(CoursesContext);
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);
  const handleTextLayout = (e) => {
    const { lines } = e.nativeEvent;
    // Check if the text has more than 7 lines
    if (lines.length >= 3) {
      setIsTruncated(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Description</Text>
      <Text
        style={styles.subtitleText}
        numberOfLines={expanded ? undefined : 3}
        onTextLayout={!expanded ? handleTextLayout : undefined}
      >
        {selectedCourse["description"]}
      </Text>
      {isTruncated && !expanded && (
        <TouchableOpacity onPress={toggleExpand}>
          <Text style={styles.readMore}>Read more</Text>
        </TouchableOpacity>
      )}
      {expanded && (
        <TouchableOpacity onPress={toggleExpand}>
          <Text style={styles.readMore}>Show less</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitleText: {
    fontSize: 14,
    paddingTop: 4,
    color: theme.colors.textGray,
  },
  readMore: {
    color: theme.colors.darkBlue,
    fontSize: 14,
    marginTop: 5,
  },
});
