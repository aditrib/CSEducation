import { useState } from "react";
import {
  Text,
  Alert,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import db from "./../database/db";

import Theme from "./../assets/theme";
import Logo from "./login/Logo";
import theme from "./../assets/theme";
import LoginIcon from "./login/LoginIcon";
import { useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signInWithEmail = async () => {
    setLoading(true);
    try {
      const { data, error } = await db.auth.signInWithPassword({
        email: email,
        password: password,
        options: {
          shouldCreateUser: false,
        },
      });

      if (error) {
        Alert.alert(error.message);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const isSignInDisabled =
    loading || email.length === 0 || password.length === 0;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Logo />
      <TextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="email@address.com"
        placeholderTextColor={Theme.colors.textGray}
        autoCapitalize={"none"}
        style={styles.input}
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Password"
        placeholderTextColor={Theme.colors.textGray}
        secureTextEntry={true}
        autoCapitalize={"none"}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => signInWithEmail()}
          disabled={isSignInDisabled}
          style={styles.button}
        >
          <Text
            style={[
              styles.buttonText,
              isSignInDisabled ? styles.buttonDisabled : undefined,
            ]}
          >
            Sign in
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.push("/createAccount")} // Navigate to CreateAccount
          style={[styles.button, { backgroundColor: theme.colors.lightBlue }]}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <LoginIcon />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 120,
    padding: 12,
    backgroundColor: "#D7ECFF",
    flex: 1,
  },
  buttonContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  verticallySpaced: {
    marginVertical: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    color: Theme.colors.textBlack,
    backgroundColor: Theme.colors.backgroundSecondary,
    width: "100%",
    padding: 16,
    marginTop: 5,
  },
  buttonText: {
    color: theme.colors.textWhite,
    fontSize: 18,
    fontWeight: 18,
    padding: 8,
  },
  buttonDisabled: {
    color: Theme.colors.textWhite,
  },
  button: {
    backgroundColor: theme.colors.darkBlue,
    height: Dimensions.get("window").height * 0.06,
    width: Dimensions.get("window").width * 0.75,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
