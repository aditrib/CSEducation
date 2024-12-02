import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useContext } from "react";
import theme from "../../assets/theme";
import useEnroll from "../../utils/useEnroll";
import { CoursesContext } from "../../context/CoursesContext";
import { UserContext } from "../../context/UserContext";
import useUnenroll from "../../utils/useUnenroll";

export default function EnrollButton() {
  const { enrollInCourse } = useEnroll();
  const { unenrollInCourse } = useUnenroll();
  const { selectedCourse, enrolledSelectedCourse } = useContext(CoursesContext);
  const { userData } = useContext(UserContext);

  if (enrolledSelectedCourse) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.unenrollButton}
          onPress={() => unenrollInCourse(selectedCourse["course_name"])}
        >
          <Text style={styles.buttonText}>Unenroll</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.enrollButton}
          onPress={() => enrollInCourse(selectedCourse["course_name"])}
        >
          <Text style={styles.buttonText}>Enroll in Course</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  enrollButton: {
    backgroundColor: theme.colors.darkBlue,
    height: Dimensions.get("window").height * 0.06,
    width: Dimensions.get("window").width * 0.75,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    color: theme.colors.textWhite,
    fontSize: 16,
  },
  unenrollButton: {
    backgroundColor: theme.colors.red,
    height: Dimensions.get("window").height * 0.06,
    width: Dimensions.get("window").width * 0.75,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
