import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router"; // Navigation
import db from "../../database/db";
import theme from "../../assets/theme";
import LoginIcon from "./LoginIcon";
import Logo from "./Logo";
import useCreateAccount from "../../utils/useCreateAccount";
import { ToggleButton } from "react-native-paper";
import AccountTypeButton from "./AccountTypeButton";

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");
  const { createAccount, loading } = useCreateAccount();
  const router = useRouter();

  const isCreateDisabled =
    loading || name.length === 0 || email.length === 0 || password.length === 0;

  return (
    <View style={styles.container}>
      <Logo />
      <TextInput
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Password"
        style={styles.input}
        secureTextEntry
      />
      <View style={{ alignItems: "center" }}>
        <AccountTypeButton
          accountType={accountType}
          setAccountType={setAccountType}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => createAccount({ name, email, password, accountType })}
          disabled={isCreateDisabled}
          style={[styles.button, isCreateDisabled && styles.disabledButton]}
        >
          <Text style={styles.buttonText}>
            {loading ? "Creating Account..." : "Create Account"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.push("/")} // Navigate to CreateAccount
          style={[styles.button, { backgroundColor: theme.colors.lightBlue }]}
        >
          <Text style={styles.buttonText}>Login</Text>
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
    flex: 1,
    paddingTop: 120,
    padding: 20,
    backgroundColor: "#D7ECFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: theme.colors.darkBlue,
  },
  input: {
    color: theme.colors.textBlack,
    backgroundColor: theme.colors.backgroundSecondary,
    width: "100%",
    padding: 16,
    marginTop: 5,
  },
  button: {
    backgroundColor: theme.colors.darkBlue,
    height: Dimensions.get("window").height * 0.06,
    width: Dimensions.get("window").width * 0.75,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: theme.colors.textWhite,
    fontSize: 18,
    fontWeight: 18,
    padding: 8,
  },
  buttonContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
