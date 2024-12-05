import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import theme from "../../assets/theme";

export default function AccountTypeButton({ accountType, setAccountType }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
          accountType === "STUDENT" && {
            backgroundColor: theme.colors.lightBlue,
          },
        ]}
        onPress={() => setAccountType("STUDENT")}
      >
        <Text
          style={[
            styles.buttonText,
            accountType === "STUDENT" && {
              color: theme.colors.textWhite,
            },
          ]}
        >
          Student
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          { borderTopRightRadius: 10, borderBottomRightRadius: 10 },
          accountType === "TEACHER" && {
            backgroundColor: theme.colors.lightBlue,
          },
        ]}
        onPress={() => setAccountType("TEACHER")}
      >
        <Text
          style={[
            styles.buttonText,
            accountType === "TEACHER" && {
              color: theme.colors.textWhite,
            },
          ]}
        >
          Teacher
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    backgroundColor: theme.colors.backgroundSecondary,
    height: Dimensions.get("window").height * 0.05,
    marginTop: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    borderColor: theme.colors.gray,
    height: "100%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    color: theme.colors.darkBlue,
  },
});
