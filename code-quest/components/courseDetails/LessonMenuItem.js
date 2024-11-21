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
import { useRouter } from "expo-router";

export default function LessonMenuItem({ moduleName }) {
  const { selectedCourse } = useContext(CoursesContext);
  const userData = useContext(UserContext);
  const router = useRouter();

  let icon = <></>;
  if (
    userData["courses"] != null &&
    courseString["course_name"] in Object.keys(userData["courses"])
  ) {
    if (moduleName in Object.keys(userData[selectedCourse["course_name"]])) {
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
    }
  } else if (selectedCourse["modules"][moduleName] === "WRITE") {
    icon = (
      <View style={{ ...styles.iconContainer, backgroundColor: "gray" }}>
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

  const disabled = !(
    userData["courses"] != null &&
    courseString["course_name"] in Object.keys(userData["courses"])
  );

  return (
    <View style={styles.container}>
      {icon}
      <View>
        <Text style={styles.titleText}>{moduleName}</Text>
      </View>
      <View>
        <Entypo
          name="chevron-right"
          size={24}
          color={disabled ? theme.colors.gray : theme.colors.darkBlue}
        />
      </View>
    </View>
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
