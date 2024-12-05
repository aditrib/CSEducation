import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import db from "../database/db";
import { useRouter } from "expo-router";

export default function useCreateAccount() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const createAccount = async ({ name, email, password, accountType }) => {
    setLoading(true);
    try {
      const { data, error } = await db.auth.signUp({
        email: email,
        password: password,
      });
      await db.from("users").insert({
        name: name,
        email: email,
        type: accountType,
      });

      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Success", "Account created!");
        router.push("/"); // Navigate to home after successful registration
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return { createAccount, loading };
}
