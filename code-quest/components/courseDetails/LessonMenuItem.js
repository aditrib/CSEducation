import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import theme from "../../assets/theme";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CoursesContext } from "../../context/CoursesContext";
import { UserContext } from "../../context/UserContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";
import { Link, useRouter } from "expo-router";

export default function LessonMenuItem({ moduleName, tab }) {
  const { selectedCourse, enrolledSelectedCourse } = useContext(CoursesContext);
  const { userData } = useContext(UserContext);
  const router = useRouter();

  let icon = <></>;
  if (
    enrolledSelectedCourse &&
    userData["courses"][selectedCourse["course_name"]] != null &&
    userData["courses"][selectedCourse["course_name"]].includes(moduleName)
  ) {
    icon = (
      <View
        style={{
          ...styles.iconContainer,
          backgroundColor: theme.colors.lightGreen,
        }}
      >
        <FontAwesome6
          name="check"
          size={Dimensions.get("window").height * 0.05}
          color={theme.colors.green}
        />
      </View>
    );
  } else if (selectedCourse["modules"][moduleName] === "WRITE") {
    icon = (
      <View
        style={{ ...styles.iconContainer, backgroundColor: theme.colors.gray }}
      >
        <EvilIcons
          name="pencil"
          size={Dimensions.get("window").height * 0.05}
          color="black"
        />
      </View>
    );
  } else if (selectedCourse["modules"][moduleName] === "READ") {
    icon = (
      <View
        style={{ ...styles.iconContainer, backgroundColor: theme.colors.gray }}
      >
        <Ionicons
          name="reader-outline"
          size={Dimensions.get("window").height * 0.04}
          color="black"
        />
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/tabs/${tab}/moduleContent`,
          params: {
            moduleName: moduleName,
            tab: tab,
          },
        })
      }
      disabled={!enrolledSelectedCourse}
    >
      <View style={styles.container}>
        {icon}
        <View>
          <Text style={styles.titleText}>{moduleName}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Entypo
            name="chevron-right"
            size={24}
            color={
              !enrolledSelectedCourse
                ? theme.colors.gray
                : theme.colors.darkBlue
            }
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height * 0.1,
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: theme.colors.backgroundSecondary,
    marginTop: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  iconContainer: {
    height: Dimensions.get("window").height * 0.08,
    width: Dimensions.get("window").height * 0.08,
    margin: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontWeight: "bold",
  },
  arrowContainer: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 4,
  },
});
