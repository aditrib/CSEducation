import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import theme from "../../assets/theme";
import useSignOut from "../../utils/useSignOut";

export default function SignOutButton() {
  const { signOut } = useSignOut();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => signOut()}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  button: {
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
});
