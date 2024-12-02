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

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createAccount = async () => {
    setLoading(true);
    try {
      const { data, error } = await db.auth.signUp({
        email: email,
        password: password,
      });
      await db.from("users").insert({
        name: name,
        email: email,
      });

      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Success", "Account created!");
        router.push("/tabs/home"); // Navigate to home after successful registration
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const isCreateDisabled =
    loading || name.length === 0 || email.length === 0 || password.length === 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
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
      <TouchableOpacity
        onPress={createAccount}
        disabled={isCreateDisabled}
        style={[styles.button, isCreateDisabled && styles.disabledButton]}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creating Account..." : "Create Account"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#D7ECFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#0056D2",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
