import { View, Text } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import BackButton from "../../../components/courseDetails/BackButton";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="courseDetails"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="moduleContent"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
