import { View, Text, Alert } from "react-native";
import React from "react";
import useSession from "./useSession";
import { useRouter } from "expo-router";
import db from "../database/db";

export default function useSignOut() {
  const session = useSession();
  const router = useRouter();

  const signOut = async () => {
    try {
      const { error } = await db.auth.signOut();
      if (error) {
        Alert.alert(error.message);
      } else {
        router.navigate("/");
        Alert.alert("Sign out successful.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { signOut };
}
