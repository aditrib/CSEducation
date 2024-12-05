import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import db from "../database/db";

export default function useSignIn() {
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async ({ email, password }) => {
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
  return { signInWithEmail };
}
